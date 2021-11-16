import jwt from 'jsonwebtoken'
import catchAsync from '../utils/catchAsync.js'
import User from '../models/userModel.js'
import AppError from '../utils/appError.js'

const signToken = id => {
    jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    },
    (err, token) => {
      if (err) throw err;
      console.log(token);
    });
};
  
const createSendToken = (user, statusCode, res, next) => {

    jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    },
    (err, token) => {
      if (err)
      {
        return next(err);
      }

      const options = {
        expires: new Date(
          Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
        ),
        httpOnly: true,
      };
    
      if (process.env.NODE_ENV === 'production') {
        options.secure = true;
      }
  
      // Remove password from output
      user.password = undefined;
    
      res.status(statusCode).cookie('token', token, options).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token,
        role: user.role
      });
    });
};


// @desc      Login user
// @route     POST /api/auth/login
// @access    Public

const loginUser= catchAsync(async(req,res,next)=>{

    const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }
  // 2) Check if user exists && password is correct
  const user = await User.findOne({ email });


  if (!user || !(await user.matchPassword(password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // 3) If everything ok, send token to client
  createSendToken(user, 200, res);
})


// @desc      Register user
// @route     POST /api/auth/register
// @access    Public

const registerUser = catchAsync (async(req, res,next) => {
  const { name, email, password, role, field } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    return next(new AppError('User already exists',400))
  }

  const user = await User.create({
    name,
    email,
    password,
    role,
    field
  })

  if (user) {
    res.status(201).send("user registered successfully")
  } else {
    return next(new AppError('Please provide correct detail',400))
  }
})


export{
  registerUser,
  loginUser
}