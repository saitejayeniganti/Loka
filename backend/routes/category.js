const express = require('express');
const router = express.Router();

const Category = require('../model/category')

router.post(
    '/',
    async (req, res) => {
        try {
            const name = req.body.name;

            if (!name) {
                return res
                    .status(400)
                    .json({ error: 'You must enter name.' });
            }

            const foundCategory = await Category.findOne({ name });

            if (foundCategory) {
                return res.status(400).json({ error: 'This category name is already in use.' });
            }

            const category = new Category({
                name,
            });

            const savedCategory = await category.save();

            res.status(200).json({
                success: true,
                message: `Category has been created successfully!`,
                category: savedCategory
            });
        } catch (error) {
            console.log(error);
            return res.status(400).json({
                error: 'Your request could not be processed. Please try again.'
            });
        }
    }
);

router.get(
    '/',
    async (req, res) => {
        try {
            allCategories = await Category.find({})

            res.status(200).json({
                success: true,
                message: `All categories have been fetched successfully!`,
                allCategories
            });
        } catch (error) {
            console.log(error);
            res.status(400).json({
                error: 'Your request could not be processed. Please try again.'
            });
        }
    }
);

module.exports = router;