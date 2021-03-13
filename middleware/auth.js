const jwt = require("jsonwebtoken");
const asyncHandler = require("../utils/async");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User.js");

//protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // else if (req.cookies.token) {
  //     token = req.cookies.token;
  // }

  //check if token exist
  if (!token) {
    return next(new ErrorResponse("Not authorized to acces this route", 401));
  }
  try {
    //verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id);

    next();
  } catch (error) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }
});

