let express = require('express')
let db = require('../models')
let router = express.Router()

// POST /projects - create a new project
router.post('/', (req, res) => {
  console.log('you hit the route...');
  db.project.create({
    name: req.body.name,
    githubLink: req.body.githubLink,
    deployLink: req.body.deployedLink,
    description: req.body.description
  })
  .then((project) => {
    db.category.findOrCreate({
      where: {
        name: req.body.category
      }
    }).spread(function (category, created) {
      project.addCategory(category).then( function(){
        res.redirect('/')
      })
    })
  })
  .catch((error) => {
    res.status(400).render('main/404')
  })
})

// GET /projects/new - display form for creating a new project
router.get('/new', (req, res) => {
  res.render('projects/new')
})

// GET /projects/:id - display a specific project
router.get('/:id', (req, res) => {
  db.project.findOne({
    where: { id: req.params.id },
    include: [db.category]
  })
  .then((project) => {
    if (!project) throw Error()
    res.render('projects/show', { project: project })
  })
  .catch((error) => {
    res.status(400).render('main/404')
  })
})



//GET /categories - show all the categories that exist











//GET /categories/:id - show a specific category and all the projects with that category













module.exports = router
