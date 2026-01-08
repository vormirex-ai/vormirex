/**
 * Base class for all custom API errors.
 * This allows us to easily identify our custom errors and ensures
 * they all have a status code.
 */
export class ApiError extends Error {
  public readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

/**
 * Represents a 400 Bad Request error.
 * Used when the client sends invalid data, such as a malformed token.
 */
export class BadRequestError extends ApiError {
  constructor(message = 'Bad Request') {
    super(message, 400);
  }
}

/**
 * Represents a 401 Unauthorized error.
 * Used for authentication failures, like invalid credentials or unverified email.
 */
export class UnauthorizedError extends ApiError {
  constructor(message = 'Unauthorized') {
    super(message, 401);
  }
}

/**
 * Represents a 409 Conflict error.
 * Used when an attempt to create a resource fails because it already exists.
 */
export class ConflictError extends ApiError {
  constructor(message = 'Conflict') {
    super(message, 409);
  }
}

/**
 * Represents a 403 Forbidden error.
 * Used when an authenticated user does not have the necessary permissions
 * to access a resource.
 */
export class ForbiddenError extends ApiError {
  constructor(message = 'You do not have permission to perform this action.') {
    super(message, 403);
  }
}

/**
 * Represents a 404 Not Found error.
 * Used when a requested resource could not be found.
 */
export class NotFoundError extends ApiError {
  constructor(message = 'Resource not found') {
    super(message, 404);
  }
}
