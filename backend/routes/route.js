require('dotenv').config()
const express = require('express')
const router = express.Router()
const { client } = require('../database/dbConnection')
const{ObjectId} =require('mongodb')

const getCollection = () => {
    const collection = client.db('indisecure').collection('todos')
    return collection
}
//GET    /todo
router.get('/todo', async (req, res) => {
    try {
        const collection = getCollection()
        const todos = await collection.find({}).toArray()
        res.status(200).json(todos)
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})
//POST   /todo
router.post('/todo', async (req, res) => {
    try {
        const collection = getCollection();  
        let{task}=req.body          
        let newToDo = await collection.insertOne({task,status:false});
        res.status(201).json({ task, status:false,_id: newToDo.insertedId });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//PUT   /todo/:id
router.put('/todo/:id', async (req, res) => {
    try {
    const collection = getCollection();
    const _id= new ObjectId(req.params.id)
    const updated =req.body
    const updatedOne= await collection.updateOne({_id},{$set:updated})
    res.status(200).json(updatedOne)
    } catch (error) {
         console.error(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
   
})
//DELETE  /todo/:id
router.delete('/todo/:id', async (req, res) => {
    try {
    const collection = getCollection();
    const _id= new ObjectId(req.params.id)
    const deletedOne=await collection.deleteOne({_id})
    res.status(200).json(deletedOne)
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    
})
module.exports = router