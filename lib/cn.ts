// lib/utils.ts (or wherever you keep your utility functions)

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...classes: ClassValue[]) {
    return twMerge(clsx(...classes));
}