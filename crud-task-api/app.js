const express = require('express');

const app = express();

const mongoose = require('./database/mongoose');

const TaskList = require('./database/models/taskList');
const Task = require('./database/models/task');

/* 

CORS - Cross Origin Request Security 

*/

//Middle ware
//Allow cros origin
app.use(
    (request, response, next) => {
        response.setHeader('Access-Control-Allow-Origin', '*');
        response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        // response.setHeader('Access-Control-Allow_Headers', 'X-Requested-With, Content-type, Accept');
        response.setHeader('Access-Control-Allow-Headers', 'Content-type');
        next();
    }
);
app.use(express.json()); //bodyParser


//Routes or Rest API Endpoints Or RESTFul webservices Endpoints

/* 

TaskList - Create, Update, ReadTaskListbyId, ReadAllTaskList, Delete

TaskModel - Create, Update, ReadTaskById, ReadAllTask, Delete

*/

// Routes Or API Endpoints for TaskList model
// Get All task lists
// http://localhost:3000/tasklists => [{TaskList}, {TaskList}]

app.get('/tasklists', (req, res) => {
    TaskList.find({})
        .then((lists) => {
            res.status(200);
            res.send(lists);
        })
        .catch((error) => { console.log(error) })
});

// Endpoint to get particular task from taskLists
app.get('/tasklists/:tasklistId', (req, res) => {
    let tasklistId = req.params.tasklistId;
    TaskList.find({ _id: tasklistId })
        .then((taskList) => {
            res.status(200);
            res.send(taskList);
        })
        .catch((error) => { console.log(error) })
});

//Create
app.post('/tasklists', (req, res) => {
    // console.log('Hello this is create request');
    console.log(req.body);
    let taskListObj = {
        'title': req.body.title
    };
    TaskList(taskListObj).save()
        .then((lists) => {
            res.status(201);
            res.send(lists);
        })
        .catch((err) => {
            console.log(err)
        })
});

//update the parricular list value in list and put is full update of the object

app.put('/tasklists/:tasklistId', (req, res) => {
    TaskList.findOneAndUpdate({ _id: req.params.tasklistId }, { $set: req.body })
        .then((taskList) => {
            res.status(200);
            res.send(taskList);
        })
        .catch((error) => { console.log(error) })
});

// Patch is partital update of one field of an object

app.patch('/tasklists/:tasklistId', (req, res) => {
    TaskList.findOneAndUpdate({ _id: req.params.tasklistId }, { $set: req.body })
        .then((taskList) => {
            res.status(200);
            res.send(taskList);
        })
        .catch((error) => { console.log(error) })
});

//Delete a tasklist by ID
// app.delete('/tasklists/:tasklistId', (req, res) => {
//     TaskList.findByIdAndDelete({ _id: req.params.tasklistId })
//         .then((taskList) => {
//             res.status(200);
//             res.send(taskList);
//         })
//         .catch((error) => { console.log(error) })
// });

// CRUD operation for task , a task should always belong to a tasklist
// Get all tasks for 1 task list, http://localhost:3000/tasklists/:tasklistId/tasks

app.get('/tasklists/:tasklistId/tasks', (req, res)=>{
    Task.find({_taskListId: req.params.tasklistId})
    .then((taskLists)=>{
        res.status(200);
        res.send(taskLists)
    })
    .catch((err)=>{console.log(err)});
})


//Create a task inside a particular task list
app.post('/tasklists/:tasklistId/tasks', (req, res) => {
    // console.log('Hello this is create request');
    console.log(req.body);
    let taskObj = {
        'title': req.body.title,
        '_taskListId': req.params.tasklistId
    };
    Task(taskObj).save()
        .then((tasks) => {
            res.status(201);
            res.send(tasks);
        })
        .catch((err) => {
            console.log(err);
        })
});

// Get one task inside one task list
app.get('/tasklists/:tasklistId/tasks/:taskId', (req, res)=>{
    Task.findOne({_taskListId: req.params.tasklistId, _id: req.params.taskId})
    .then((taskLists)=>{
        res.status(200);
        res.send(taskLists)
    })
    .catch((err)=>{console.log(err)});
});

//Update one task belonging to one task list
app.patch('/tasklists/:tasklistId/tasks/:taskId', (req, res) => {
    Task.findOneAndUpdate({ _taskListId: req.params.tasklistId, _id: req.params.taskId }, { $set: req.body })
        .then((task) => {
            res.status(200);
            res.send(task);
        })
        .catch((error) => { console.log(error) })
});

//Delete one task belonging to one task list
app.delete('/tasklists/:tasklistId/tasks/:taskId', (req, res) => {
    Task.findOneAndDelete({ _taskListId: req.params.tasklistId, _id: req.params.taskId })
        .then((task) => {
            res.status(204);
            res.send(task);
        })
        .catch((error) => { console.log(error) })
});

//Delete a tasklist by ID
app.delete('/tasklists/:tasklistId', (req, res) => {

    //Delete all tasks within a tasklists if that tasklist is deleted

    const deleteAllContainingtask = (taskList)=>{
        Task.deleteMany({_taskListId: req.params.tasklistId}).
        then(()=>{
            return taskList;
        })
        .catch((err)=>{console.log(err)})
    }

    const responseTaskList = TaskList.findByIdAndDelete(req.params.tasklistId)
        .then((taskList) => {
            deleteAllContainingtask(taskList);
        })
        .catch((error) => { console.log(error) })

    res.status(204).send(responseTaskList);
});



// http://localhost:3000/tasklists/:tasklistId/tasks/:taskId


app.listen(3000, () => {
    console.log("Server started at 3000");
});