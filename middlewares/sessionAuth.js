const requireLogin = (req, res, next) => {
    if (req.session && req.session.user) {
      next();
    } else {
      res.redirect('/users/login')
    }
  };
  
  module.exports = { requireLogin };