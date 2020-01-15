module.exports = {
    EndWith: (req, res, next) => {
        res.endWithSuccess = (code = 200, data ) => {
            res.status(code).json({ data });
        }

        res.endWithError = (code = 400, error ) => {
            res.status(code).json({ error });
        }

        next();
    }
};
