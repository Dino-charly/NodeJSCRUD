const express = require('express');
const router = express.Router();

const Task = require('../models/task.js');

router.get('/', async(req, res) =>{
    const tasks = await Task.find();
    console.log(tasks);
    res.render('index.ejs', {
        tasks
    });
});
router.post('/add', async (req, res) =>{
    const task = new Task(req.body);
    await task.save();
    res.redirect('/');
});

router.get('/hecho/:id', async (req, res) =>{

    const { id } = req.params;
    const task = await Task.findById(id);
    task.status = !task.status;
    await task.save();
    res.redirect('/');

});

router.get('/edit/:id', async (req, res) =>{
    const { id } = req.params;
    const task = await Task.findById(id);
    res.render('edit.ejs', {
        task
    });
});

router.post('/edit/:id', async (req, res)=> {
    const { id } = req.params;
    await Task.update({_id: id}, req.body);
    res.redirect('/')
});

router.get('/delate/:id', async (req, res) => {
    const { id } = req.params;
    await Task.remove({ _id: id});
    res.redirect('/');
});
module.exports = router;

