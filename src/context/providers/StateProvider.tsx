import React, { createContext, useContext, useRef, useCallback } from 'react';
import type {
    StateContextType,
    StateProviderProps,
    Atom,
    AtomState
} from '../types';
import { ErrorReportingService } from '../../services/ErrorReportingService';
import { MonitoringService } from '../../services/MonitoringService';

const StateContext = createContext<StateContextType | null>(null);

export function StateProvider({
    children,
    enablePersistence = true,
    enableLogging = true,
    enableValidation = true
}: StateProviderProps): () => void {
    const atomStatesRef = useRef<Map<string, AtomState<any>>>(new Map());

    const getAtomState = useCallback(<T,>(atom: Atom<T>): AtomState<T> => {
        let state = atomStatesRef.current.get(atom.key) as AtomState<T>;

        if (!state) {
            state = {
                value: atom.default,
                subscribers: new Set(),
                effects: atom.effects || []
            };
            atomStatesRef.current.set(atom.key, state);

            // Run onInit effects
            state.effects.forEach(effect => {
                if (effect.onInit) {
                    try {
                        const initialValue = effect.onInit(atom.default);
                        if (initialValue !== undefined) {
                            state.value = initialValue;
                        }
                    } catch (error) {
                        ErrorReportingService.captureError(error);
                    }
                }
            });
        }

        return state;
    }, []);

    const getAtom = useCallback(<T,>(atom: Atom<T>): T => {
        const state = getAtomState(atom);

        // Run onGet effects
        state.effects.forEach(effect => {
            if (effect.onGet) {
                try {
                    effect.onGet(state.value);
                } catch (error) {
                    ErrorReportingService.captureError(error);
                }
            }
        });

        return state.value;
    }, [getAtomState]);

    const setAtom = useCallback(<T,>(atom: Atom<T>, newValue: T): void => {
        const state = getAtomState(atom);
        const oldValue = state.value;

        try {
            // Run validation if enabled
            if (enableValidation && atom.validate && !atom.validate(newValue)) {
                throw new Error(`Invalid value for atom: ${atom.key}`);
            }

            // Run onSet effects
            let finalValue = newValue;
            state.effects.forEach(effect => {
                if (effect.onSet) {
                    try {
                        const effectResult = effect.onSet(finalValue, oldValue);
                        if (effectResult !== undefined) {
                            finalValue = effectResult;
                        }
                    } catch (error) {
                        ErrorReportingService.captureError(error);
                    }
                }
            });

            // Update state and notify subscribers
            state.value = finalValue;
            state.subscribers.forEach(callback => callback());

            // Track state change
            MonitoringService.trackMetric('state_update', 1, ['state', atom.key]);
        } catch (error) {
            ErrorReportingService.captureError(error);
        }
    }, [getAtomState, enableValidation]);

    const subscribe = useCallback(<T,>(
        atom: Atom<T>,
        callback: () => void
    ): (() => void) => {
        const state = getAtomState(atom);
        state.subscribers.add(callback);
        return () => {
            state.subscribers.delete(callback);
        };
    }, [getAtomState]);

    const value = {
        getAtom,
        setAtom,
        subscribe
    };

    return (
        <StateContext.Provider value={value}>
            {children}
        </StateContext.Provider>
    );
}

export function useStateContext(): void {
    const context = useContext(StateContext);
    if (!context) {
        throw new Error('useStateContext must be used within a StateProvider');
    }
    return context;
}
