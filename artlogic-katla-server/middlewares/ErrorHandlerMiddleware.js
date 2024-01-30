
function ErrorHandlerMiddleware(err, req, res, next) {
    return res.status(err.status || 500).json({
        message: err.message || 'Невідома помилка на сервері',
        details: process.env.NODE_ENV === 'production' ? undefined : err.details
    })
}

export default ErrorHandlerMiddleware