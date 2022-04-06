const MongoClient = require('mongodb').MongoClient;

const Student_Management_db = "mongodb://127.0.0.1:27017/student_management_db";
var mongodb;

async function connect(callback) {
    await MongoClient.connect(Student_Management_db, { useUnifiedTopology: true }, async function (err, client) {
        mongodb = await client.db();
        if (mongodb)
            callback();
        else
            console.log("MongoDB Not Connected !");
    });
}

function get() {
    return mongodb;
}

function close() {
    mongodb.close();

}

module.exports = {
    connect,
    get, close
};