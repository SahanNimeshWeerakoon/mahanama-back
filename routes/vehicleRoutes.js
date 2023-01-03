const express = require('express');
const auth = require("../middleware/auth");
const Model = require('../models/VehicleModel');

const router = express.Router();

router.get('/getAll', async (req, res) => {
    try {
        const data = await Model.find();
        return res.json(data);
    } catch (err) {
        return res.status(500).json({err});
    }
});

router.post('/add', auth, async (req, res) => {
    const {vehNo, make, trimEdition, model, mfc_year, reg_year, fuel, km, condition, bodyType, engine, transmission, country, prevOwners, price, negotiable, img} = req.body;
    let data = new Model({
        vehNo,
        make,
        trimEdition,
        model,
        mfc_year,
        reg_year,
        fuel,
        km,
        condition,
        bodyType,
        engine,
        transmission,
        country,
        prevOwners,
        price,
        negotiable,
        img
    });
    try {
        const dataToSave = await data.save();
        return res.status(200).json(dataToSave)
    } catch (err) {
        return res.status(500).json({ err });
    }
});

router.put('/update/:id', auth, async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };
        const result = await Model.findByIdAndUpdate(
            id, updatedData, options
        )
        return res.json(result)
    }
    catch (error) {
        return res.status(400).json(error)
    }
})

router.delete('/delete/:id', auth, async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id);
        return res.json(data);
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router;