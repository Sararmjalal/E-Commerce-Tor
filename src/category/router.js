
import express from "express";

import CategoryController from './controller'
import adminAuth from "lib/utils/adminAuth";
const router = express.Router();

router.post('/create',adminAuth, CategoryController.createCategory)

router.get('/', CategoryController.getCategories)

export default router;