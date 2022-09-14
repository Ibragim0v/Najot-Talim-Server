const {
  verify,
  JsonWebTokenError,
  TokenExpiredError,
} = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

module.exports = (req, res, next) => {
  const { access_token } = req.headers;

  verify(access_token, SECRET_KEY, (err, decode) => {
    if (err instanceof JsonWebTokenError) {
      return res.sendStatus(400);
    }

    if (err instanceof TokenExpiredError) {
      return res.sendStatus(400);
    }

    req.verifiedID = decode.id;

    next();
  });
};
