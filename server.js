const express  = require('express');
const app      = express();
const https    = require('https');
const axios    = require('axios');
const mongoose = require('mongoose');
const News     = require('./models/hackernews.js');
const pug      = require('pug');
const moment   = require('moment');
const bodyParser = require('body-parser');
const path = require('path');
let config = require('./config.js');

const mongoPath = 'mongodb://'+ config.getParam('MONGODB_HOST') +':'+ config.getParam('MONGODB_PORT') + '/'+ config.getParam('DB_NAME');

mongoose.connect(mongoPath , function(err, res) {
   if(err) {
     console.log('ERROR: connecting to Database. ' + err);
   }
   else {
   	axios.get('https://hn.algolia.com/api/v1/search_by_date?query=nodejs').then(function(response){
   		for (let i = 0; i < response.data.hits.length; i++) {
   			let n = News(response.data.hits[i]);
   			
   		
			n.save(function (err, res){
				if(err){
				}
			});
   			
   			
   		}
   	})
   }

});

app.set('view engine', 'pug')
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use("/public", express.static(__dirname + "/public")); // Frontend App
app.locals.moment = require('moment');


app.get('/', function (req, res) {
	News.find({}, function (err, result){
    	let docs = [];
    	for (var i = result.length - 1; i >= 0; i--) {
      		if((result[i].story_title === null && result[i].title === null) || result[i].erased){
      		} else {
        		docs.push(result[i])
      		}
    	}
    	res.render('index', { newsList: docs })
  	}) 
})

app.post('/delete', function(req, res){
	let id = req.body.story_id;

  	News.findOne({story_id: id}, function(err, doc){
    	if(err){
      		res.json({'status': 'NOK', 'message': 'No item with this id'})
    	} else {
      
      		if(doc === null){
        		res.json({'status': 'NOK', 'message': 'No item with this id'})
      		} else {
         		doc.erased = true;

         		doc.save(function (err, result){
	           		if(err){
	             		res.json({'status': 'NOK', 'message': 'Erase failed'})
	           		} else {
	             		res.json({'status': 'OK', 'message': null})
	           		}
         		});
      		} 
    	}  
  	})
});


app.listen(3000, function() {
  console.log('listening on 3000')
})
