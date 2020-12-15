export default class UnauthorizedAccessError extends Error {
    constructor(message: string) {
        super(message);

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, UnauthorizedAccessError.prototype);
    }
}