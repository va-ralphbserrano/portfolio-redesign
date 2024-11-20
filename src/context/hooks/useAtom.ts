import { useCallback, useEffect, useState } from 'react';
import type { Atom } from '../types';
import { useStateContext } from '../providers/StateProvider';

export function useAtom<T>(atom: Atom<T>): [T, (value: T) => void] {
  const { getAtom, setAtom, subscribe } = useStateContext();
  const [value, setValue] = useState(() => getAtom(atom));

  useEffect(() => {
    return subscribe(atom, () => {
      setValue(getAtom(atom));
    });
  }, [atom, getAtom, subscribe]);

  const updateValue = useCallback(
    (newValue: T) => {
      setAtom(atom, newValue);
    },
    [atom, setAtom]
  );

  return [value, updateValue];
}
