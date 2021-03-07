const Region = require('../models/model.js')

const getAreaByName = async (req, res) => {
    const {area} = req.body
    const {direction} = req.query
    const region = await Region.findOne({area})
    const years = region[direction].map(year => new Date(year.date).getFullYear())
    const alls = region[direction].map(all => Math.ceil(all.all))
    res.json({years, alls})
}

const getAll = async (req, res) => {  
    const data = await Region.find({})
    const names = data.map(item => item.area)
    res.json(names)
} 

const getAreaForTable = async (req, res) => {
    const {area, targetMarket} = req.body
    const region = await Region.findOne({area})
    const direction = region[targetMarket]
    res.json({direction})
}

const patchDataFromTable = async (req, res) => {
    const {
        region, 
        targetMarket,
        itemDate,
        itemAll,
        itemCis,
        itemOtherCountries,
        itemEurope,
        itemEUcountries,
        itemAsia,
        itemAfrica,
        itemUsa,
        itemOceania
    } = req.body
     
   const area = await Region.findOne({area:region})
   const target = area[targetMarket].find(item => new Date(item.date).getFullYear() == new Date(itemDate).getFullYear())
   target.date = itemDate
   target.all = itemAll
   target.cis = itemCis
   target.other_countries = itemOtherCountries
   target.europe = itemEurope
   target.eu_countries = itemEUcountries
   target.asia = itemAsia
   target.africa = itemAfrica
   target.usa = itemUsa 
   target.oceania = itemOceania

   await area.save()

   res.json({message: 'Region data was updated'})
}

module.exports = {getAreaByName, getAll, getAreaForTable, patchDataFromTable}