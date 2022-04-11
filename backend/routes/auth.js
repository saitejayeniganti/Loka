const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const passport = require('passport');

const keys = require('../config/keys');

const { secret, tokenLife } = keys.jwt;

const auth = require('../middleware/auth');

// Bring in Models & Helpers
const User = require('../model/user');
// user get api
router.get('/',()=>{
    console.log("Get Request");
})


// user register api
router.post('/register', async (req, res) => {
    try {
        const { email, firstName, lastName, password } = req.body;

        if (!email) {
            return res
                .status(400)
                .json({ error: 'You must enter an email address.' });
        }

        if (!firstName || !lastName) {
            return res.status(400).json({ error: 'You must enter your full name.' });
        }

        if (!password) {
            return res.status(400).json({ error: 'You must enter a password.' });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res
                .status(400)
                .json({ error: 'That email address is already in use.' });
        }

        // let subscribed = false;
        // if (isSubscribed) {
        //     const result = await mailchimp.subscribeToNewsletter(email);
        //
        //     if (result.status === 'subscribed') {
        //         subscribed = true;
        //     }
        // }

        const user = new User({
            email,
            password,
            firstName,
            lastName
        });

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);

        user.password = hash;
        const registeredUser = await user.save();

        const payload = {
            id: registeredUser.id
        };

        // await mailgun.sendEmail(
        //     registeredUser.email,
        //     'signup',
        //     null,
        //     registeredUser
        // );

        const token = jwt.sign(payload, secret, { expiresIn: tokenLife });

        res.status(200).json({
            success: true,
            //subscribed,
            token: `Bearer ${token}`,
            user: {
                id: registeredUser.id,
                firstName: registeredUser.firstName,
                lastName: registeredUser.lastName,
                email: registeredUser.email,
                role: registeredUser.role
            }
        });
    } catch (error) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
});

module.exports = router;