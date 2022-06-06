var express = require('express');
var router = express.Router();
var db = require('../db/db');
const bcrypt = require('bcrypt');

/* GET all cars from the database */
router.get('/getAllCars' ,function (req, res, next) {
    let sql = "select * from cars"
    db.query(sql, function (err, data, fields) {
        if (err) throw err;
        res.json(data);
    });
});

// for creating new car entries in database
router.post('/cu/addCar', function (req, res, next) {
    console.log("Adding New Car to List")
    let data = {
        category: req.body.category,
        model: req.body.model,
        color: req.body.color,
        make: req.body.make,
        regno: req.body.regno,
    };

    db.query('INSERT INTO cars SET ?', data, function (err, result) {
        if (err) throw err;

        res.json(result);
    });
});

// for deleting car entries in database
router.delete('/delete/:id', function (req, res) {
    console.log("delete ", req.params.id)

    let sql = "DELETE FROM cars WHERE id = ?"
    let values = [req.params.id]
    db.query(sql, values, function (err, data, fields) {
        if (err) throw err;
        res.send("delete")
    });
})

// for updating car entries in database
router.post('/cu/update/:id', function (req, res, next) {
    console.log("Updating Car", req.params.id)
    let data = {
        category: req.body.category,
        model: req.body.model,
        color: req.body.color,
        make: req.body.make,
        regno: req.body.regno,
    };

    db.query('UPDATE cars SET ? WHERE id = ?', [data, req.params.id], function (err, result) {
        if (err) throw err;
        res.send("update")
    });
});

module.exports = router;