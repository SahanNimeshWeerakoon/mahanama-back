const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
        vehNo: {
            required: true,
            type: String
        },
        make: {
            required: true,
            type: String
        },
        trimEdition: {
            required: true,
            type: String
        },
        model: {
            required: true,
            type: String
        },
        mfc_year: {
            required: true,
            type: String
        },
        reg_year: {
            required: true,
            type: String
        },
        fuel: {
            required: true,
            type: String
        },
        km: {
            required: true,
            type: String
        },
        condition: {
            required: true,
            type: String
        },
        bodyType: {
            required: true,
            type: String
        },
        engine: {
            required: true,
            type: String
        },
        transmission: {
            required: true,
            type: String
        },
        country: {
            required: true,
            type: String
        },
        prevOwners: {
            required: true,
            type: String
        },
        price: {
            required: true,
            type: String
        },
        negotiable: {
            required: true,
            type: String
        },
        img: {
            required: true,
            type: Array
        },
        createdAt: {
            type: Date,
            default: Date.now()
        }
});

module.exports = mongoose.model('Vehicle', Schema);