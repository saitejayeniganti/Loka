const express = require('express');
const router = express.Router();

const Brand = require('../model/brand')

router.post(
    '/create',
    async (req, res) => {
        try {
            const name = req.body.name;
            const image = req.body.image;
            const description = req.body.description;

            if (!description || !name) {
                return res
                    .status(400)
                    .json({ error: 'You must enter description & name.' });
            }

            const foundBrand = await Brand.findOne({ name });

            if (foundBrand) {
                return res.status(400).json({ error: 'This brand name is already in use.' });
            }

            const brand = new Brand({
                name,
                image,
                description,
            });

            const savedBrand = await brand.save();

            res.status(200).json({
                success: true,
                message: `Brand has been created successfully!`,
                brand: savedBrand
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
            allBrands = await Brand.find({})

            res.status(200).json({
                success: true,
                message: `All brands have been fetched successfully!`,
                allBrands
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