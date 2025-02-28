export class EmptyFieldError extends Error {
    constructor(message: string, readonly fields: Set<string>) {
        super(message);
        this.name = 'EmptyFieldError';
        Object.setPrototypeOf(this, EmptyFieldError.prototype);
    }
}

export class NotFoundError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'NotFoundError';
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}