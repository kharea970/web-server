const request = require('request');
const geocode = (address,callback)=>{
    const geocodeurl = "http://www.mapquestapi.com/geocoding/v1/address?key=kuOzP1iH7ShzYD0Qed4hSkueTdcgmNXW&location="+address;
    request({url:geocodeurl,json:true},(error,res)=>{
   if(error){
        callback('unable to connect to location services');
   } else if(res.body.info.statuscode==400){
        callback('unable to find location find other location');
   } else {
    callback(undefined,{
            lat : res.body.results[0].locations[0].latLng.lat,
            lng : res.body.results[0].locations[0].latLng.lng
    });
   }
})
}
module.exports = geocode;