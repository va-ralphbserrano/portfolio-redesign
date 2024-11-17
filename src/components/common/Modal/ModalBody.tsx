import React from 'react';
import { ModalBodyProps } from './types';

export const ModalBody: React.FC<ModalBodyProps> = ({ children }) => (
  <div className="px-6 py-4">{children}</div>
);
