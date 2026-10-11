// Helper functions to safely access localStorage (only in browser)

export const getLocalStorageItem = <T>(key: string, fallback?: T) => {
  if (typeof window === "undefined" || !window.localStorage) {
    return fallback ?? null;
  }

  try {
    const item = window.localStorage.getItem(key);
    if (!item) return fallback ?? null;

    return JSON.parse(item) as T;
  } catch {
    return fallback ?? null;
  }
};

export const setLocalStorageItem = (key: string, value: unknown) => {
  if (typeof window !== "undefined" && window.localStorage) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
};
export const removeLocalStorageItem = (key: string) => {
  if (typeof window !== "undefined" && window.localStorage) {
    window.localStorage.removeItem(key);
  }
};

export const putLocalStorageItem = (key: string, value: unknown) => {
  if (typeof window !== "undefined" && window.localStorage) {
    const existing = window.localStorage.getItem(key);
    let arr: unknown[] = [];
    if (existing) {
      try {
        arr = JSON.parse(existing);
        if (!Array.isArray(arr)) arr = [];
      } catch {
        arr = [];
      }
    }
    arr.push(value);
    window.localStorage.setItem(key, JSON.stringify(arr));
  }
};

export const getLocalStorageSet = (key: string): Set<string> => {
  if (typeof window === "undefined" || !window.localStorage) {
    return new Set();
  }

  try {
    const storedValue = localStorage.getItem(key);

    if (!storedValue) {
      return new Set();
    }

    const parsed = JSON.parse(storedValue);

    return Array.isArray(parsed) ? new Set(parsed) : new Set();
  } catch {
    localStorage.removeItem(key);

    return new Set();
  }
};

export const setLocalStorageSet = (key: string, value: Set<string>) => {
  if (typeof window === "undefined" || !window.localStorage) {
    return;
  }

  localStorage.setItem(key, JSON.stringify([...value]));
};
