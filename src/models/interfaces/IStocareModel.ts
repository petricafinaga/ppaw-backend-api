export interface IStocareModel<T> {
  get(value: number): Promise<T | null>;

  getAll(): Promise<T[]>;

  add(value: T): Promise<boolean>;

  update(value: T): Promise<boolean>;

  delete(value: number): Promise<boolean>;
}
