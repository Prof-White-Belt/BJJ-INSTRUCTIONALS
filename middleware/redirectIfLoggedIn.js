function redirectIfLoggedIn(req, res, next) {
    if (req.session.user) {
      return res.redirect("/home");
    }
    next();
  }
  
  export default redirectIfLoggedIn;
  