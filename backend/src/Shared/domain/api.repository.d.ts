export default interface IApiRepository<T> {
  findAll(parameters?: object): Promise<T[] | null>;
}
