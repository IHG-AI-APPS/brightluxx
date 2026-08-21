const STORAGE_KEY = 'brightluxx_compare_products';
const MAX_PRODUCTS = 3;

export const getComparedCodes = () => {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]').slice(0, MAX_PRODUCTS); } catch { return []; }
};

export const saveComparedCodes = (codes) => {
  const next = [...new Set(codes)].slice(0, MAX_PRODUCTS);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent('brightluxx-compare-change', { detail: next }));
  return next;
};

export const toggleComparedCode = (code) => {
  const selected = getComparedCodes();
  if (selected.includes(code)) return { codes: saveComparedCodes(selected.filter((item) => item !== code)), status: 'removed' };
  if (selected.length >= MAX_PRODUCTS) return { codes: selected, status: 'max' };
  return { codes: saveComparedCodes([...selected, code]), status: 'added' };
};

export const clearComparedCodes = () => saveComparedCodes([]);
export { MAX_PRODUCTS };