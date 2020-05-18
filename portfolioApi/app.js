require('dotenv').config();
const api_key = process.env.API_KEY;
const domain = process.env.DOMAIN;
const express = require('express');
const bodyParser = require('body-parser');
const cors    = require('cors');
const mailgun = require('mailgun-js')({apiKey: api_key, domain:domain});
const app = express();




app.use(bodyParser.json());


app.use(cors());

app.use((req,res,next) =>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST,PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

app.get('/api', (req, res, next) => {
    res.send('API Status: Running')
});

app.post('/api/email', (req, res, next)=>{

    const data = {
        from: 'dpds@orange.fr',
        to: req.body.email,
        subject: 'Nouveau',
        text: req.body.message
    };
    
    mailgun.messages().send(data, function (error, body){
        if (error) {
            console.log(error);
            
        }
        console.log(body);
        
    });
    mailgun.messages().send(data)
       .then(result =>{
    
           res.status(200).json({
               success: true
           });
        })
        .catch(err =>{
            console.log('error: ', err);
        
            res.status(401).json({
                success: false  
            });
            
        })
});

    

const port = process.env.PORT || 3030;
app.listen(port, '0.0.0.0');