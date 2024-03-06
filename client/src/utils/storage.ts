export class StorageHelper {
  public static set<T>(key: string, data: T): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  public static get<T>(key: string, defaultValue: T): T {
    const rawValue = localStorage.getItem(key);

    if (!rawValue) {
      return defaultValue;
    }

    return JSON.parse(rawValue);
  }
}
