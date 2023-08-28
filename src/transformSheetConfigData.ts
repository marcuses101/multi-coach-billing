import type { StandardSheetConfig } from "./defs";

function isUndefinedOrEmptyString(input: any): boolean {
  if (typeof input === "undefined") return true;
  if (typeof input === "string" && input.length === 0) return true;
  return false;
}

function convertRowToType<T extends Record<string, any>>(
  row: any[],
  keys: (keyof T)[]
): T | null {
  const initialReduce = { isValid: false, map: new Map<keyof T, any>() };
  const itemMap: typeof initialReduce = row.reduce(
    (acc: typeof initialReduce, rowItem, index) => {
      const key = keys[index];
      if (!isUndefinedOrEmptyString(rowItem)) {
        acc.isValid = true;
      }
      if (!acc.map.has(key)) {
        acc.map.set(key, rowItem);
        return acc;
      }
      const currentValue = acc.map.get(key);
      if (Array.isArray(currentValue)) {
        currentValue.push(rowItem);
        acc.map.set(key, currentValue);
        return acc;
      }
      const valueArray = [acc.map.get(key), rowItem];
      acc.map.set(key, valueArray);
      return acc;
    },
    initialReduce
  );
  if (!itemMap.isValid) return null;
  return Object.fromEntries(itemMap.map) as T;
}

export function transformSheetConfigData<T extends Record<string, any>>(
  data: any[][],
  config: StandardSheetConfig<T>
): T[] {
  const keys = config.columnConfigurations.map((entry) => entry.field);
  const items: T[] = data.reduce((acc, row) => {
    const item = convertRowToType(row, keys);
    if (item) {
      acc.push(item);
    }
    return acc;
  }, [] as T[]);
  return items;
}
