const router = require('express').Router();
const { Location, Traveller, Trip } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const tripData = await Trip.create(req.body);
        res.status(200).json(tripData);
    } catch (err) {
        res.status(400).json(err)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const tripData = await Trip.destroy({
            where: {
                id: req.params.id,
            }
        });
        if (!tripData){
            res.status(404).json({ message: "No trip found with that id" });
            return;
        } else {
            res.status(200).json({ message: "Trip deleted" });
        }
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router;