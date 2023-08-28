import type { StandardSheetConfig } from "../defs";

export function tansformSheetConfigData<T extends Record<string, any>>(
  data: any[][],
  config: StandardSheetConfig<T>
) {
  const keys = config.columnConfigurations.map((entry) => entry.field);
  const items: T[] = data.map((row) => {
    const itemMap: Map<keyof T, any> = row.reduce((map, rowItem, index) => {
      const key = keys[index];
      if (!map.has(key)) {
        map.set(key, rowItem);
        return map;
      }
      const currentValue = map.get(key);
      if (Array.isArray(currentValue)) {
        currentValue.push(rowItem);
        map.set(key, currentValue);
        return map;
      }
      const valueArray = [map.get(key), rowItem];
      map.set(key, valueArray);
      return map;
    }, new Map());
    return Object.fromEntries(itemMap) as T;
  });
  return items;
}
