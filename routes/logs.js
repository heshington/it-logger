const express = require('express');
const router = express.Router();

const Log = require('../models/Logs');

// @route   GET /logs
// @desc    get list of logs
// @acess   Public
router.get('/', async (req, res) => {
  try {
    let logs = await Log.find().sort({
      date: -1,
    });
    console.log(logs);
    if (req.query.q) {
      const search_term = req.query.q.toLowerCase();
      if (search_term) {
        logs = logs.filter((log) => {
          return (
            log.tech.toLowerCase().includes(search_term) ||
            log.message.toLowerCase().includes(search_term)
          );
        });
      }
    }

    res.json(logs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /logs
// @desc    create a new log
// @acess   Public

router.post('/', async (req, res) => {
  try {
    const { message, attention, tech } = req.body;

    newLog = new Log({
      message,
      attention,
      //date: req.params.date,
      tech,
      //tech_id: req.tech.id,
    });

    await newLog.save();
    res.json(newLog);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT /logs
// @desc    Update a log
// @acess   Public

router.put('/:id', async (req, res) => {
  const { message, attention, tech } = req.body;

  // Build log object
  const logFields = {};
  logFields.message = message;
  logFields.attention = attention;
  logFields.tech = tech;

  try {
    let log = await Log.findById(req.params.id);
    if (!log) return res.status(404).json({ msg: 'Log not found' });

    log = await Log.findByIdAndUpdate(
      req.params.id,
      { $set: logFields },
      { new: true }
    );
    res.json(log);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /logs/:id
// @desc    Delete a log
// @acess   Public

router.delete('/:id', async (req, res) => {
  try {
    const log = await Log.findById(req.params.id);
    console.log(log);
    if (!log) return res.status(404).json({ msg: 'Log not found' });

    await Log.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Log removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
