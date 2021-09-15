const express = require('express');
const router = express.Router();
const Tech = require('../models/Techs');
// @route   GET /techs
// @desc    get list of techs
// @acess   Public
router.get('/', async (req, res) => {
  try {
    const techs = await Tech.find();
    res.json(techs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/', async (req, res) => {
  try {
    const { firstName, lastName } = req.body;
    newTech = new Tech({
      firstName,
      lastName,
    });
    await newTech.save();
    res.json(newTech);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /techs/:id
// @desc    Delete a tech
// @acess   Public

router.delete('/:id', async (req, res) => {
  try {
    const tech = await Tech.findById(req.params.id);
    if (!tech) return res.status(404).json({ msg: 'Tech not found' });

    await Tech.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Tech removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
