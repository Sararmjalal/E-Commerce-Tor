import express from "express";

import UserController from './controller'

const router = express.Router();


router.post('/sign-up-one', UserController.signup_stepOne)

router.post('/sign-up-two', UserController.signup_stepTwo)

// router.get('/', AdminController.home)

// router.post('/create', AdminController.createAdmin)

// router.post('/login-step-one', AdminController.loginStepOne)

// router.post('/login-step-two', AdminController.loginStepTwo)

export default router;