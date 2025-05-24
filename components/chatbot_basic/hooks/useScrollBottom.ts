/**
 * useScrollBottom Hook
 * Scrolls to the bottom of a ref when dependencies change (e.g., new messages).
 * Usage: useScrollBottom(ref, [deps])
 */
'use client';
import { useEffect } from 'react';

export function useScrollBottom(ref: React.RefObject<HTMLElement | null>, deps: any[] = []) {
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, deps);
}
