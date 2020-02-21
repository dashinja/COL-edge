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

apiRouter.route('/city/:cityname').get(async (req, res) => {
    const city = await db.costOfLiving.findOne({
        where: {
            city: req.params.cityname,
        },
    })

    res.send(city)
})

apiRouter
    .route('/user/answers')
    .post(async (req, res, next) => {
        let addUserChoice = {
            majorChoice: req.body.major,
            cityChoice: req.body.cost,
        }
        const key = req.user.username ? 'username' : 'localUsername'
        const value = req.user.username || req.user.localUsername

        const user = await db.user.findOne({
            where: {
                [key]: value,
            },
        })

        if (user) {
            await db.user.update(addUserChoice, {
                where: {
                    [key]: value,
                },
            })
            res.json('/profile')
        }
    })
    .catch(err => console.log(err))

apiRouter.route('/note').post(async (req, res) => {
    const key = req.user.username ? 'username' : 'localUsername'
    const value = req.user.username || req.user.localUsername

    const noteInfo = {
        [key]: value,
        note: req.body.note,
    }

    if (!req.user) {
        return
    }

    else {
        const user = await db.user.findOne({
            where: {
                [key]: value,
            },
        })

        if (user) {
            await db.note
                .create(noteInfo)
                .then(note => { })
                .catch(e => console.log(e))
        }
    }
})

apiRouter.route('/chat').post(async (req, res) => {

    const newMessage = await db.chat.create(req.body)

    res.send(newMessage)

})

apiRouter
    .route('/testimony/:dest')
    .post(async (req, res) => {
        const username = req.user.username || req.user.localUsername
        const testimony = {
            username,
            testimonial: req.body.testimony,
        }
        req.user.picture ? (testimony.image = req.user.picture) : null
        if (req.params.dest === 'index') {
            const testimony = await db.indexTestimonial
                .findOne({
                    where: {
                        username: req.body.username,
                    },
                })

            if (testimony) {
                return
            } else {
                const newIndexTestimony = await db.indexTestimonial.create(req.body)

                const newInfo = {
                    onIndexPage: true,
                }

                const testimonial = await db.testimonial
                    .update(newInfo, {
                        where: {
                            username: req.body.username,
                        },
                    })

                res.send(newInfo)
            }
        }
        else if (req.params.dest === 'user') {
            const newTestimony = await db.testimonial.create(testimony)

            res.send(newTestimony)
        }
    })
    .delete(async (req, res) => {
        if (req.params.dest === 'index') {
            await db.indexTestimonial
                .destroy({
                    where: {
                        username: req.body.username,
                    },
                })

            res.send('¡Lo hicimos!')
        }
    })
    .patch(async (req, res) => {
        if (req.params.dest === 'user') {
            const newInfo = {
                onIndexPage: req.body.onIndexPage,
            }
            const updated = await db.testimonial
                .update(newInfo, {
                    where: {
                        username: req.body.username,
                    },
                })

            res.send(updated)
        }
    })

module.exports = apiRouter
