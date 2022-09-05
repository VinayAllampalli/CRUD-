const express = require("express");
const router = express.Router();
const client = require('../connections/db')

// ---------------------post the data------------------------//

router.post('/users', async (req, res) => {
    console.log("-------->")
    try {
        const user = req.body;
        const insertQuery = `insert into users(id, firstname, lastname, location) 
                       values(${user.id}, '${user.firstname}', '${user.lastname}', '${user.location}')`
        console.log("----+", insertQuery)
        await client.query(insertQuery, (err, result) => {
            if (!err) {
                res.send('Insertion was successful')
            }
            else { console.log(err.message) }
        })
    }
    catch (err) {
        res.send(err)
    }
    client.end;
});

// -----------get all user data-----------//

router.get('/getUsers', async (req, res) => {
    console.log("get users data apis triggered");
    try {
        client.query(`Select * from users`, (err, result) => {
            if (!err) {
                res.send(result.rows);
            }
            else {
                res.send(err.message)
            }
        });
        client.end;

    }
    catch (err) {
        res.send(err)
    }
})

// ------------------- get user by id -------------------//
router.get('/GetUsers/:id', (req, res) => {
    console.log("Get user data by ID api is triggried");
    try {
        client.query(`Select * from users where id=${req.params.id}`, (err, result) => {
            if (!err) {
                res.send(result.rows);
            }
            else {
                res.send(err.message)
            }
        });
    }
    catch (err) {
        res.send(err);
    }
    client.end;
})


// -----------Update user details-----------//

router.put('/update/:id', (req, res) => {
    console.log("Update Api is triggred")
    try {
        let user = req.body;
        let updateQuery = `update users set firstname = '${user.firstname}',lastname ='${user.lastname}', location='${user.location}' where id=${user.id}`
        client.query(updateQuery, (err, result) => {
            if (!err) {
                res.send('update query succesfully');
            }
            else {
                res.send(err.message);
            }
        })


    }
    catch (err) {
        res.send(err);
    }
    client.end;
})

// ---------------Delete user---------------------//

router.delete("/RemoveUser/:id", async(req,res)=>{
    console.log("delete api is triggred")
    try{
        const deleteQuery = `delete from users where id = ${req.params.id}`
        client.query(deleteQuery,(err,result)=>{
            if(!err){
                res.send("Deleted Successfully")
            }
            else{
                res.send(err.message)
            }
        })
    }
    catch(err){
        res.send(err)

    }
    client.end;
})
module.exports = router;