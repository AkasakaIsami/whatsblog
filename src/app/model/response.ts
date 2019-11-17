export class Response<T> {
    code: string;
    error: Error;
    data: T;
}
