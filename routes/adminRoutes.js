const express = require('express')
const adminRouter = express.Router()
const db = require('../models')

adminRouter.route('/').get(async (req, res) => {
  if (!req.user.admin) {
    res.redirect('/profile')
  } else {
    const key = req.user.username ? 'username' : 'localUsername'
    const value = req.user.username || req.user.localUsername

    const user = await db.user.findOne({
      where: {
        [key]: value,
      },
    })

    const testimonials = await db.testimonial.findAll({})
    const indexTestimonials = await db.indexTestimonial.findAll({})

    res.render('admin', {
      user: user.dataValues,
      testimonials: testimonials,
      indexTestimonials: indexTestimonials,
    })
  }
})

module.exports = adminRouter
