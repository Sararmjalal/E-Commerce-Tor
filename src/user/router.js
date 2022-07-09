import express from "express";

const router = express.Router();

router.get('/', AdminController.home)

router.post('/create', AdminController.createAdmin)

router.post('/login-step-one', AdminController.loginStepOne)

router.post('/login-step-two', AdminController.loginStepTwo)

router.get('/test', adminAuth, AdminController.test)

export default router;
