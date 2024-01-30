class RequestedResourceNotFoundError extends Error {
    constructor() {
        super()
        this.status = 404
    }
}

export default RequestedResourceNotFoundError