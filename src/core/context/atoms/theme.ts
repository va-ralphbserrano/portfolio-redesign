import type { Atom } from '../types';
import { Theme } from '../types';
import { createPersistenceEffect } from '../middleware/persistence';
import { createValidationEffect } from '../middleware/validation';
import { createLoggerEffect } from '../middleware/logger';

const validateTheme = (theme: Theme): boolean => {
  return theme === 'light' || theme === 'dark';
};

export const themeAtom: Atom<Theme> = {
  key: 'theme',
  default: 'light',
  effects: [
    createPersistenceEffect('theme'),
    createValidationEffect(validateTheme, 'Invalid theme value'),
    createLoggerEffect()
  ],
  validate: validateTheme
};
