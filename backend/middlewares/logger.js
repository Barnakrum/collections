const logger = function () {
    return function (req, res, next) {
        console.log(req.method + " | " + req.path + " | " + JSON.stringify(req.body) + " | " + req.cookies.session);

        next();
    };
};

module.exports = logger;
