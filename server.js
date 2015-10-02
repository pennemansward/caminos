var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('caminos',['menuList','chapterList','dictionary']);
var bodyparser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyparser.json());

app.get('/menuList', function(req, res){
	db.menuList.find(function (err, docs){
		res.json(docs);
	});
});

app.get('/chapterList', function(req, res){
	db.chapterList.find(function (err, docs){
		res.json(docs);
	});
});

app.get('/dictionary', function(req, res){
	db.dictionary.find(function (err, docs){
		res.json(docs);
	});
});

/**** manager ****/
app.post('/dictionary', function(req, res){
	db.dictionary.insert(req.body, function(err, doc) {
		res.json(doc);
	});
});

app.delete('/dictionary/:id', function(req,res){
	var id = req.params.id;
	db.dictionary.remove({_id: mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc);
	});
})

app.get('/dictionary/:id', function(req,res){
	var id = req.params.id;
	db.dictionary.findOne({_id: mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc);
	});
})

app.put('/dictionary/:id', function(req,res){
	var id = req.params.id;

	db.dictionary.findAndModify({query: {_id: mongojs.ObjectId(id)},
		update: {$set: {
					espagnol: req.body.espagnol, 
					dutch: req.body.dutch
				}},
		new: true}, function(err, doc){
			res.json(doc);
	});
})

app.listen(1337);
console.log('server running on port 1337')