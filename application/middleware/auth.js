module.exports = {

    /**
     * @param    {Express.Request}   req
     * @param    {Express.Response}  res
     * @param    {Express.Response.NextFunction} next
     */
    isLoggedIn: (req, res, next) => {
        if (req.session?.user) {
            return next();
        }
        req.flash("error", "You must be logged in.");
        req.session.save(() => {
            if (err) { next(err); }
            res.redirect("/login");
        });
    }

};
