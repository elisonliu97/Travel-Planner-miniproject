const router = require('express').Router();
const { Traveller, Trip } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const travellerData = await Traveller.findAll();
        res.status(200).json(travellerData);
    } catch (err) {
        res.status(500).json(err);
    }

})

router.get('/:id', async (req, res) => {
    try {
        const travellerData = await Traveller.findByPk(req.params.id ,{
            include: [{ model: Trip }],
        })
        if (!travellerData){
            res.status(404).json({ message: 'No traveller found with this id'});
            return;
        } else {
            res.status(200).json(travellerData);
        }
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;