
import express from "express";
import Category from './model'

const router = express.Router();

router.post('/create', async (req,res) => {
  try {

    const thisCategory = await Category.create({ ...req.body });

    return res.status(201).json({
      msg: "successfully created this category",
      _id: thisCategory._id,
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
})

router.get('/', async(req, res) => {
  try {
    return res.json(await Category.findAll())
  } catch (error) {
    return res.status(500).json({ msg: error.message });

  }
})

export default router;