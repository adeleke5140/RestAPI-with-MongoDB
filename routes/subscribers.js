const express = require("express")
const Router = express.Router()

const Subscriber = require("../models/subscriber")

//we need routes for the following
//Getting all subscribers
//Creating one subscribers
//updating one subscriber
//deleting one subscriber

Router.get("/", async (req, res) => {
  try {
    const subscribers = await Subscriber.find()
    res.json(subscribers)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

Router.get("/:id", getSubscriber, (req, res) => {
  res.send(res.subscriber)
})

//read about HTTP routes
//201 is for sending a succeful post request
Router.post("/", async (req, res) => {
  const subscriber = new Subscriber({
    name: req.body.name,
    subscriberToChannel: req.body.subscriberToChannel
  })

  try {
    const newSubscriber = await subscriber.save()
    res.status(201).json(newSubscriber)
  } catch (err) {
    //400 when user gives you bad data
    res.status(400).json({ message: err.message })
  }
})

Router.patch("/:id", getSubscriber, async (req, res) => {
  if (req.body.name !== null) {
    res.subscriber.name = req.body.name
  }
  if (req.body.subscriberToChannel !== null) {
    res.subscriber.subscriberToChannel = req.body.subscriberToChannel
  }

  try {
    const updatedSubscriber = await res.subscriber.save()
    res.json(updatedSubscriber)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

Router.delete("/:id", getSubscriber, async (req, res) => {
  try {
    await res.subscriber.remove()
    res.json({ message: "Deleted subscriber" })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

//getSubscriber middleware
async function getSubscriber(req, res, next) {
  const { id } = req.params
  let subscriber
  try {
    subscriber = await Subscriber.findById(id)
    if (subscriber === null) {
      return res.status(404).json({ message: "Cannot find subscriber" })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.subscriber = subscriber
  next()
}

module.exports = Router
