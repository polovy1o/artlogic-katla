class RequestedResourceHasConflictError extends Error {
    constructor() {
        super()
        this.status = 409
    }
}

export default RequestedResourceHasConflictError