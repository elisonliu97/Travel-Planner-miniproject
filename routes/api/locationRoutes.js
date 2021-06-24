const router = require('express').Router();
const { Location, Trip, Traveller } = require('../../models');

// GET ALL
router.get('/', async (req, res) => {
    try {
        const locationData = await Location.findAll();
        res.status(200).json(locationData);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const locationData = await Location.findByPk(req.params.id, {
            include: [{ model: Traveller }],
        })
        if (!locationData){
            res.status(404).json({ message: 'No location found with that id' });
            return;
        } else {
            res.status(200).json(locationData);
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const locationData = await Location.create(req.body);
        res.status(200).json(locationData);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const locationData = await Location.destroy({
            where: {
                id: req.params.id,
            }
        });

        if (!locationData){
            res.status(404).json({ message: 'No location found with that id' })
            return;
        } else {
            res.status(200).json({ message: 'Location Deleted' });
        }
    } catch (err) {
        res.status(500).json(err);
    }
});
module.exports = router;