const errorHandler = (err, req, res, next) => {
    err.status ? res.status(err.status).json({error: err.message}):
    res.status(500).json({error: err.message});
};
export default errorHandler;