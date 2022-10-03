const router = require('express').Router()

router
.get('/')
.get('/:id')
.post('/')
.put('/:id')
.delete('/:id')
.get('/search')

module.exports = router