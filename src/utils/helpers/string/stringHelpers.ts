export const toSnakeCase = (text: string): string => {
  return text
    .replace(/([A-Z])/g, (match) => `_${match.toLowerCase()}`)
    .replace(/^_/, "");
};
export const toCamelCase = (text: string): string => {
  return text
    .replace(/_([a-z])/g, (match) => match[1].toUpperCase())
    .replace(/^_/, "");
};
