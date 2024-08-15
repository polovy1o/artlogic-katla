class RequestedResourceNotFoundError extends Error {
    constructor() {
        super()
        this.message = "Not found"
        this.status = 404
    }
}

export default RequestedResourceNotFoundError