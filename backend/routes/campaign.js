const express = require('express');
const router = express.Router();
const mailchimp = require("@mailchimp/mailchimp_marketing");

mailchimp.setConfig({
  apiKey: "9e20cfa2f9528a562c5d2f70cc5fc9c6-us14",
  server: "us14",
})
async function callPing() {
  const response = await mailchimp.ping.get();
  console.log(response);
}

callPing();

router.post('/audience/create', async (req, res) => {
  const { name, company, address, city, state, zip, country, from_name, from_email, subject, language } = req.body

  const footerContactInfo = { company, address1: address, city, state, zip, country }

  const campaignDefaults = { from_name, from_email, subject, language }
  try {
    const audience = await mailchimp.lists.createList({
      name: name,
      contact: footerContactInfo,
      permission_reminder: "*|LIST:DESCRIPTION|*",
      email_type_option: true,
      campaign_defaults: campaignDefaults
    })

    res.send(audience.id)
    // created audience id 008065ef6c
  }
  catch (err) {
    res.status(400).send(err)
  }
});

router.post('/audience/add/member', async (req, res) => {
  const { listId, firstname, lastname, email, tag } = req.body
  try {
    const response = await mailchimp.lists.addListMember(listId, {
      email_address: email,
      status: 'subscribed',
      email_type: 'html',
      merge_fields: {
        FNAME: firstname,
        LNAME: lastname
      },
       tags: [tag]
    })
    res.send(response)
  }
  catch (err) {
    res.status(400).send(err)
  }
})


module.exports = router;
