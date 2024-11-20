import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines class names using clsx and tailwind-merge
 * This ensures proper handling of Tailwind CSS classes
 */
export function cn(...inputs: ClassValue[]): void {
    return twMerge(clsx(inputs));
}
