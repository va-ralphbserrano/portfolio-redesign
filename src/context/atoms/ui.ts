import type { Atom } from '../types';
import type { UIState } from '../types';
import { createPersistenceEffect } from '../middleware/persistence';
import { createLoggerEffect } from '../middleware/logger';

const initialUIState: UIState = {
  menuOpen: false,
  sidebarOpen: false,
  modalOpen: false,
  activeModal: null,
  toasts: []
};

export const uiAtom: Atom<UIState> = {
  key: 'ui',
  default: initialUIState,
  effects: [
    createPersistenceEffect('ui'),
    createLoggerEffect()
  ]
};
