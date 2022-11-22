const express = require('express');
const router = express.Router();
const mailchimp = require("@mailchimp/mailchimp_marketing");
const { sendMail } = require("../utils/mail");

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
  const listId = '008065ef6c';
  console.log(" bodyxx", req.body);
  const { firstname, lastname, email } = req.body
  try {
    const response = await mailchimp.lists.addListMember(listId, {
      email_address: email,
      status: 'subscribed',
      email_type: 'html',
      merge_fields: {
        FNAME: firstname,
        LNAME: lastname
      },
      // tags: [tag]
    })
    // res.send(response)
    sendMail({
      to: email,
      subject: 'Newsletter Subscription',
      text: `Hi ${firstname}! \n\n` +
        `You are receiving this email because you subscribed to our newsletter. \n\n` +
        `If you did not request this change, please contact us immediately.`
    });
    res.status(200).json({
      success: true,
      message: 'You have successfully subscribed to the newsletter!'
    });
  }
  catch (err) {
    res.status(400).send(err)
  }
})

router.post('/campaign/send', async (req, res) => {

  const { campaignId } = req.body;
  // const { ListId, SegmentId, tempalteId, subjectLine, previewText, campaignTitle, fromName, replyTo } = req.body

  // const createCampaign = async () => {
  //     try {
  //         const campaign = await mailchimp.campaigns.create({
  //             type: "regular",
  //             recipients: {
  //                 segment_opts: {
  //                     saved_segment_id: SegmentId,
  //                     match: 'any'
  //                 },
  //                 list_id: ListId
  //             },
  //             settings: {
  //                 subject_line: subjectLine,
  //                 preview_text: previewText,
  //                 title: campaignTitle,
  //                 template_id: tempalteId,
  //                 from_name: fromName,
  //                 reply_to: replyTo,
  //                 to_name: "*|FNAME|*",
  //                 auto_footer: true,
  //                 inline_css: true,

  //             }
  //         })
  //         return campaign.id
  //     }
  //     catch (err) {
  //         res.status(400).send(err)
  //     }
  // }

  // const sendCampaign = async (campaignId) => {
  try {
    await mailchimp.campaigns.send(campaignId)
    // res.redirect("success.html")
    res.status(200).json({
      success: true,
      message: 'Campaign Sent successfully!'
    });
  }
  catch (err) {
    res.status(400).send(err)
  }
  // }

  // const campaignId = await createCampaign()
  // sendCampaign(campaignId)
})

module.exports = router;
