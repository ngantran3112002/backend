const notFound = (req, res, next) => {
    const err = new Error(`Not found  - ${req.orginalUrl}`)
    res.status(404);
    next(err)
}


const errHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: err.stack;
    })
}


export {notFound,errHandler}