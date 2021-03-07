const {Router} = require('express')
const Region = require('../models/model')
const {getAreaByName, getAll, getAreaForTable, patchDataFromTable} = require('../controllers/controler.js')
const router = Router()

router.post('/map', async (req, res) => {
    const {year, direction} = req.query
    const {id} = req.body
    const region = await Region.findOne({map_id: id}, err => {
        if (err) {
            res.status(404).json('Not found')
        }  
    }) 
    const obj = region[direction].find(item => +year === new Date(item.date).getFullYear())
    res.status(200).json({obj})  
}) 


router.post('/region/info', getAreaByName)
router.get('/regions/name', getAll)
router.post('/region/table', getAreaForTable)
router.patch('/region/table', patchDataFromTable)

module.exports = router   