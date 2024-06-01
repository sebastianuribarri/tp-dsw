export default interface IApiRepository<T> {
  findAll(parameters?: unknown): Promise<T[] | null>;
}
