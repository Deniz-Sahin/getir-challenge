const express = require("express");
const Record = require("./models/record");
const router = express.Router();

router.post("/records", async (req, res) => {
    var code = "0";
    var msg = "success";
    var recods = [];

    //Check if required fields are missing
    if(!req.body.startDate || !req.body.endDate || !req.body.minCount || !req.body.maxCount)
    {
        code = 1;
        msg = "Missing Fields!";
    }

    try
    {
        //Aggragate function for MongoDb for selecting and query data.Used aggragate instead of find to be able to sum counts
        records = await Record.aggregate(
            [
                {"$match":{"createdAt": { "$gt": new Date(req.body.startDate), "$lt": new Date(req.body.endDate) }}},
                {"$match":{"$expr":{"$gt":[{"$sum":"$counts"}, req.body.minCount]}}},
                {"$match":{"$expr":{"$lt":[{"$sum":"$counts"}, req.body.maxCount]}}},
                {"$addFields":{"totalCount":{"$sum":"$counts"}}},
                {"$unset": [ "counts","value","_id"]}
            ]
        )

    }
    catch(e)
    {
        code = 2;
        msg = e.message;
    }

    //Write and send response
    res.send({
        "code":code,
        "msg":msg,
        "records":records
    });
    
  });

  module.exports = router;