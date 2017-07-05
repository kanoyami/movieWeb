var express = require('express');
var router = express.Router();
var DB = require('../db/DBhelper.js');
var uuidv1  = require('uuid/v1');
var jsonFormat = require('../jsonFormat/jf.js');
var md5 = require('md5');


router.get('/movieList',(req,res)=>{
	if(req.query.vid){
	var db_movie_info = new DB.DBhelper('video_src');
	db_movie_info.selectWhere((result)=>{
		if(!result.length){
			res.json(jsonFormat(-101,'no movies data catched'));
		}else
		res.json(jsonFormat(1,result));
	},'vid ='+req.query.vid);
	}else{
	var db_movie_info = new DB.DBhelper('video_src');
	db_movie_info.selectWhere((result)=>{
		if(!result.length){
			res.json(jsonFormat(-101,'no movies data catched'));
		}else
		res.json(jsonFormat(1,result));
	});
}});


router.get('/movieComment',(req,res)=>{
	console.log(req.query);
	if(req.query.vid){
	var db_movie_comment = new DB.DBhelper('movie_comment');
	db_movie_comment.selectWhere((result)=>{
		if(!result.length){
			res.json(jsonFormat(-101,'no movies data catched'));
		}else
		res.json(jsonFormat(1,result));
	},'vid = '+req.query.vid);
}else{
	res.json(jsonFormat(-100,'no data catched or params are illegal '));
}
});


router.get('/movieAdv',(req,res)=>{
	var db_movie_adv = new DB.DBhelper('adv_src');
	db_movie_adv.selectWhere((result)=>{
		if(!result.length){
			res.json(jsonFormat(-101,'no adv data catched'));
		}else{
		var num = Math.floor( (Math.random()*result.length));
		res.json(jsonFormat(1,result[num]));
	}
	});

});



router.get('/moviePoint',(req,res)=>{
	console.log(req.query);
	if(req.query.vid){
	var db_movie_point = new DB.DBhelper('movie_point');
	db_movie_point.selectWhere((result)=>{
		if(!result.length){
			res.json(jsonFormat(-101,'no movies data catched'));
		}else{
			var point = 0;
			for(var i = 0 ; i<result.length ; i++)
				point += result[i].point;
			point = parseFloat(point/result.length);
			res.json(jsonFormat(1,{points:point}))
		}
	},'vid = '+req.query.vid);
}else{
	res.json(jsonFormat(-100,'no data catched or params are illegal '));
}
});


router.post('/pullDownGetMovieList',(req,res)=>{
	if(req.body.vid){
		var db_movie_info = new DB.DBhelper('video_src');
		db_movie_info.selectWhere((result)=>{
		if(!result.length){
			res.json(jsonFormat(-101,'no movies data catched'));
		}else
			if(result[result.length-1].vid == req.body.vid)
				res.json(jsonFormat(200,{newist:true}));
			else{
	
				for (var i =  0; i < result.length; i++) {
					if(result[i].vid==req.body.vid)
						break;
				};
				var newData = result.slice(i+1,result.length)
				res.json(jsonFormat(1,newData));
	 		}
	});
	}else{
		res.json(jsonFormat(-100,'no data catched or params are illegal '));

}});



module.exports = router;