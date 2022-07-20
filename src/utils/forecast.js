const request = require('request');
const forecast = (lat,lon,callback)=>{
    const url = "http://api.weatherstack.com/current?access_key=40968e88e2166e6f5bd0798c3ca948b6&query="+lat+","+lon;
    request({url:url,json:true},(err,res)=>{
        if(err){
            callback('wrong',undefined);
        }else if(res.body.error){
            callback(res.body.error.info,undefined);
        }else{
            callback(undefined,`${res.body.current.weather_descriptions[0]} .it is currently ${res.body.current.temperature} but it fells liks ${res.body.current.feelslike}`)
        }
    })
}

module.exports = forecast;