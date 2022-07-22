import express from "express";

import UserController from './controller'

const router = express.Router();

router.post('/sign-up-one', UserController.signup_stepOne)

router.post('/sign-up-two', UserController.signup_stepTwo)

router.post('/login-one', UserController.login_stepOne)

router.post('/login-two', UserController.login_stepTwo)

router.post('/me', UserController.me)

<<<<<<< HEAD
router.post('/edit', UserController.userEdit)

// router.get('/', AdminController.home)

// router.post('/create', AdminController.createAdmin)

// router.post('/login-step-one', AdminController.loginStepOne)

// router.post('/login-step-two', AdminController.loginStepTwo)
=======
router.post('/edit', (req, res, next) => {
  
})
>>>>>>> 3de68f6b6d2a8d7b2bc5e7336b0420d35a90d79c

export default router;