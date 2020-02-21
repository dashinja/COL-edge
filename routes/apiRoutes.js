const express = require('express')
const apiRouter = express.Router()
const db = require('../models')

apiRouter.route('/user').get(async (req, res) => {
  const key = req.user.username ? 'username' : 'localUsername'
  const value = req.user.username || req.user.localUsername

  const user = await db.user.findOne({
    where: {
      [key]: value,
    },
  })

  res.send(user)
})

apiRouter.route('/cities').get(async (req, res) => {
  const cities = await db.costOfLiving.findAll({})
  res.send({ cities: cities.map(c => c.city) })
})

apiRouter.route('/city/:cityname').get((req, res) => {
  db.costOfLiving
    .findOne({
      where: {
        city: req.params.cityname,
      },
    })
    .then(city => {
      res.send(city)
    })
})

apiRouter.route('/user/answers').post((req, res, next) => {
  let addUserChoice = {
    majorChoice: req.body.major,
    cityChoice: req.body.cost,
  }
  const key = req.user.username ? 'username' : 'localUsername'
  const value = req.user.username || req.user.localUsername

  db.user
    .findOne({
      where: {
        [key]: value,
      },
    })
    .then(user => {
      if (user) {
        db.user.update(addUserChoice, {
          where: {
            [key]: value,
          },
        })
        res.json('/profile')
      }
    })
    .catch(err => console.log(err))
})

apiRouter.route('/note').post((req, res) => {
  const key = req.user.username ? 'username' : 'localUsername'
  const value = req.user.username || req.user.localUsername

  const noteInfo = {
    [key]: value,
    note: req.body.note,
  }
  if (!req.user) {
    return
  } else {
    db.user
      .findOne({
        where: {
          [key]: value,
        },
      })
      .then(user => {
        if (user) {
          db.note
            .create(noteInfo)
            .then(note => {})
            .catch(e => console.log(e))
        }
      })
  }
})

apiRouter.route('/chat').post((req, res) => {
  db.chat.create(req.body).then(newMessage => {
    res.send(newMessage)
  })
})

apiRouter
  .route('/testimony/:dest')
  .post((req, res) => {
    const username = req.user.username || req.user.localUsername
    const testimony = {
      username,
      testimonial: req.body.testimony,
    }
    req.user.picture ? (testimony.image = req.user.picture) : null
    if (req.params.dest === 'index') {
      db.indexTestimonial
        .findOne({
          where: {
            username: req.body.username,
          },
        })
        .then(testimony => {
          if (testimony) {
            return
          } else {
            db.indexTestimonial.create(req.body).then(newIndexTestimony => {
              const newInfo = {
                onIndexPage: true,
              }
              db.testimonial
                .update(newInfo, {
                  where: {
                    username: req.body.username,
                  },
                })
                .then(testimonial => {
                  res.send(newInfo)
                })
            })
          }
        })
    } else if (req.params.dest === 'user') {
      db.testimonial.create(testimony).then(newTestimony => {
        res.send(newTestimony)
      })
    }
  })
  .delete((req, res) => {
    if (req.params.dest === 'index') {
      db.indexTestimonial
        .destroy({
          where: {
            username: req.body.username,
          },
        })
        .then(removed => {
          res.send('¡Lo hicimos!')
        })
    }
  })
  .patch((req, res) => {
    if (req.params.dest === 'user') {
      const newInfo = {
        onIndexPage: req.body.onIndexPage,
      }
      db.testimonial
        .update(newInfo, {
          where: {
            username: req.body.username,
          },
        })
        .then(updated => {
          res.send(updated)
        })
    }
  })

module.exports = apiRouter
