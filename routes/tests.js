const router = require('express').Router();
const Test = require('../db/models/test');
const Student = require('../db/models/student');

router.get('/', async (req, res, next) => {
  try{
    const tests = await Test.findAll();
    res.status(200).json(tests);
  } catch(err) { next(err) }
})

router.get('/:id', async (req, res, next) => {
  try {
    const test = await Test.findById(req.params.id);
    res.status(200).json(test);
  } catch(err) { next(err) }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const test = await Test.findById(req.params.id);
    if (!test) return res.sendStatus(404);
    await test.destroy();
    res.sendStatus(204)
  } catch(err) { next(err) }
})

router.post('/student/:studentId', async (req, res, next) => {
  try{
    const student = await Student.findById(req.params.studentId);
    if (!student) return res.sendStatus(404);
    const test = await student.createTest(req.body);
    res.status(201).json(test)
  } catch(err) { next(err) }
})

module.exports = router;
