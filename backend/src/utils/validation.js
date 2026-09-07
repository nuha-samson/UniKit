export const normalizeText = (value) => {
  if (typeof value !== "string") return "";
  return value.trim();
};

export const normalizeEmail = (email) => normalizeText(email).toLowerCase();

export const toSafeInt = (value, fallback = 0) => {
  const parsed = Number.parseInt(value, 10);
  if (Number.isNaN(parsed)) return fallback;
  return parsed;
};

export const clampNumber = (value, min, max, fallback = min) => {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(max, Math.max(min, parsed));
};

export const isValidObjectId = (id) => /^[a-fA-F0-9]{24}$/.test(id);

export const isValidDate = (value) => {
  if (!value) return false;
  const date = new Date(value);
  return !Number.isNaN(date.getTime());
};
