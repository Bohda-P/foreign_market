const {Router} = require('express')
const Region = require('../models/model')
const {getAreaByName, getAll, getAreaForTable, patchDataFromTable} = require('../controllers/controler.js')
const router = Router()

router.post('/map', async (req, res) => {
    // const array = [[1,1,1,1,1], [1,1,1,1,1]]
    // const result = array.reduce((r, a) => a.map((b, i) => (r[i] || 0) + b), [])
    // console.log(result)
    const {direction} = req.query
    const {id, selectedValues} = req.body
    const region = await Region.findOne({map_id: id}, err => {
        if (err) {
            res.status(404).json('Not found')
        }  
    })

    const obj = region[direction].filter(item => {
        let reg 
        selectedValues.forEach(year => {
          if (+year == new Date(item.date).getFullYear()) {
            reg = item
          } 
        })  
        return reg
    })
  
    res.status(200).json({obj})  
}) 


router.post('/region/info', getAreaByName)
router.get('/regions/name', getAll)
router.post('/region/table', getAreaForTable)
router.patch('/region/table', patchDataFromTable)

module.exports = router   