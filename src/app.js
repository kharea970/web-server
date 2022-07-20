const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const app = express();

// app.get('',(req,res)=>{
//     res.send('hello express');
// })
//setup static derectory to serve
app.use(express.static(path.join(__dirname,'../public')));
//setup handlebars engine and views location
app.set('views', path.join(__dirname,'../templates/views'));
app.set('view engine','hbs')
hbs.registerPartials(path.join(__dirname,'../templates/partials'));



app.get('',(req,res)=>{
    res.render('index',{
        title:'weather app',
        name:'ashish'
    
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'about me',
        name:'ashish'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        message:'loreum ipsem',
        title:'help',
        name:'ashish'
    })
})

app.get('/about',(req,res)=>{
    res.send('<h1> About Page </h1>');
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'address must be provided'
        })
    }
    geocode(req.query.address,(err,data)=>{
        if(err){
            return res.send({
                error:'wrong address name'
            })
        }
        forecast(data.lat,data.lng,(err,forecastdata)=>{

            console.log('error',err);
            console.log('data',forecastdata);
            res.send({
                location:req.query.address,
                weather:forecastdata
            });
        })
    })

})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'u must provide a search term'
        })
    }
    console.log(req.query.search);
    res.send({
        products:[]
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'ashish',
        errormessage:'help article not found '
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'ashish',
        errormessage:'page not found'
    })
})

app.listen(3000,()=>{
    console.log('server is up on port 3000');
})