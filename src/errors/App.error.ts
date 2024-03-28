export class AppError extends Error {
  statusCode(statusCode: any) {
    throw new Error("Method not implemented.");
  }
  public status: number;

  constructor(message: string, status: number = 400) {
    super(message);
    this.status = status;
  }
}
