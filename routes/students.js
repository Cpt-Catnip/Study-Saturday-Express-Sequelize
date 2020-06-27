const router = require('express').Router();
const Student = require('../db/models/student')

router.get('/', async (req, res, next) => {
  try{
    const data = await Student.findAll();
    res.send(data)
  } catch(err) { next(err) }
})

router.post('/', async (req, res, next) => {
  try {
    const data = await Student.create(req.body);
    res.status(201).json(data);
  } catch(err) { next(err) }
})

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const student = await Student.findById(id)
    if(!student) {
      res.sendStatus(404)
    } else {
      res.status(200).send(student);
    }
  } catch(err) { next(err) }
})

router.put('/:id', async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);
    Object.keys(req.body)
      .forEach(field => student[field] = req.body[field]);
    await student.save()
    res.status(200).json(student)
  } catch(err) { next(err) }
})

router.delete('/:id', async (req, res, next) => {
  try{
    let student = await Student.findById(req.params.id);
    await student.destroy();
    res.sendStatus(204)
  } catch(err) { next(err) }
})

module.exports = router;
