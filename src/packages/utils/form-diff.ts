/**
 * What changed between the values a form started with and the ones it submitted, ready for a
 * PATCH: unchanged fields are left out, and an emptied field in `clearable` becomes `null`
 * (the backend's "clear this").
 */
export const changedFields = (
  initial: Record<string, unknown>,
  submitted: Record<string, unknown>,
  clearable: readonly string[] = [],
): Record<string, unknown> => {
  const changes: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(submitted)) {
    const isClearable = clearable.includes(key);
    const next = isClearable && value === "" ? null : value;
    const before = isClearable ? initial[key] || null : initial[key];
    if (next !== before) changes[key] = next;
  }

  return changes;
};
