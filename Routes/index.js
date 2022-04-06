const express = require('express');
const router = express.Router();
const mongo = require('../mongo');

router.post('/add', async (req, res) => {//query to add student
    console.log(req.body);
    let db1 = mongo.get().collection("user_table")
    let new_id = 1;
    let max = await db1.find().sort({ _id: -1 }).limit(1).toArray()
    if (max.length !== 0) new_id = parseInt(max[0]._id) + 1;
    let json = {
        "_id": parseInt(new_id),
        "first_name": req.body.first_name,
        "last_name": req.body.last_name,
        "email": req.body.email,
        "dob": parseInt(req.body.dob),
        "education": req.body.education,
        "location": req.body.location,
        "details": req.body.details
    }
    let insert = await db1.insertOne(json);
    if (insert.acknowledged) {
        res.json({ status: 1 });
    }
    else {
        res.json({ status: 0 });
    }
});

router.post('/student_data', async (req, res) => {//query to display student details
    let db1 = mongo.get().collection("user_table")
    let data = await db1.find({}).toArray()
    console.log(data)

    if (data.length > 0) {
        res.json({ "Status": 1, data: data });
    }
    else {
        res.json({ "Status": 0 });
    }
});

router.post('/update', async (req, res) => {//query to updaye student details
    let db1 = mongo.get().collection("user_table")
    let json = {
        "first_name": req.body.first_name,
        "last_name": req.body.last_name,
        "email": req.body.email,
        "dob": parseInt(req.body.dob),
        "education": req.body.education,
        "location": req.body.location,
        "details:": req.body.details
    }
    const query = { "_id": parseInt(req.body._id) };
    const update = { $set: json };
    const options = { upsert: true };
    let update_data = await db1.updateOne(query, update, options);
    if (update_data.acknowledged) {
        res.json({ status: 1 });
    }
    else {
        res.json({ status: 0 });
    }
});

router.post('/search_name', async (req, res) => {//query to search student
    console.log(req.body)
    let db1 = mongo.get().collection("user_table")
    let data = await db1.find({ first_name: req.body.name }).toArray()
    if (data.length > 0) {
        res.json({ "Status": 1, data: data });
    }
    else {
        res.json({ "Status": 0 });
    }
});

router.post('/delete', async (req, res) => {//delete student details
    let db1 = mongo.get().collection("user_table")
    let del = db1.deleteOne({ "_id": req.body._id._id })

    let data = await db1.find().toArray()
    res.json({ status: 1, "data": data });
});

module.exports = router;