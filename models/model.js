const {Schema, model} = require('mongoose')

const region = new Schema({
    area: String,
    map_id: String,
    import: [{ 
      date: Date,
      all: String, 
      cis: String,
      other_countries: String,
      europe: String,
      eu_countries: String,
      asia: String,
      africa: String,
      usa: String,
      oceania: String
      }],
      export: [{
        date: Date,
        all: String, 
        cis: String,
        other_countries: String,
        europe: String,
        eu_countries: String,
        asia: String,
        africa: String,
        usa: String,
        oceania: String
        }]
})


module.exports = model('Region', region, "regions") 