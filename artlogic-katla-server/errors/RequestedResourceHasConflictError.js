class RequestedResourceHasConflictError extends Error {
    constructor() {
        super()
        this.message = "Conflict"
        this.status = 409
    }
}

export default RequestedResourceHasConflictError