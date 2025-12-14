import { useState, useCallback } from 'react';

export function useClipboard() {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  }, []);

  const read = useCallback(async () => {
    try {
      return await navigator.clipboard.readText();
    } catch (error) {
      console.error('Failed to read clipboard:', error);
      return '';
    }
  }, []);

  return {
    copied,
    copy,
    read,
  };
} 