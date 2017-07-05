var express = require('express');
var router = express.Router();
var DB = require('../db/DBhelper.js');
var uuidv1  = require('uuid/v1');
var jsonFormat = require('../jsonFormat/jf.js');
var md5 = require('md5');


function checkLogin(req,res,next){
	if(req.body.token){
		db_usertoken = new DB.DBhelper('user_token');
		db_usertoken.selectWhere((result)=>{
			if(result.length){
				//console.log(result);
				req.body.uid = result[0].uid;
				next();
			}else
				res.json(jsonFormat(-102,'token not find, user may not login or token is undefined'));
		},'token = "'+req.body.token+'"');
	}else{
		res.json(jsonFormat(-700,'the token is required'));
	}
}



router.post('/postComment',checkLogin);
//router.post('/userInfo',checkLogin);
/* GET home page. */
router.post('/regist', (req,res) => {

	console.log(req.body);
	var db = new DB.DBhelper('user');

	var userData = req.body;
	db.selectWhere((result)=>{
		if(!result.length){
			console.log(result);
			userData.password = md5(userData.password);
			db.add(userData,(result)=>{
				if(result){
					var token = uuidv1();
					db.getMaxUserId((result)=>{
						console.log(result[0]['max(uid)']);
						var tokensave = {
							uid:result[0]['max(uid)'],
							token:token
						};
						var tokensaver = new DB.DBhelper('user_token');
						tokensaver.add(tokensave,(results)=>{
							if(results){
								res.json(jsonFormat(1,tokensave));
							}
						});
					});
				}
			});
		}else{
			res.json(jsonFormat(0,'email is already registed'));
		}
		
	},' email = "'+userData.email+'"');

});


router.post('/login',(req,res)=>{
	if(req.body.email&&req.body.password){
		var db = new DB.DBhelper('user');
		db.selectWhere((result)=>{
			if(result.length){
				var db_usertoken = new DB.DBhelper('user_token');
				db_usertoken.selectWhere((rs)=>{
					if(rs.length){
						rs[0]['userinfo']=result[0];
						res.json(jsonFormat(2,rs[0]))
					}else{
						var newTokenData = {
							uid:result[0].uid,
							token:uuidv1()
							}
						db_usertoken.add(newTokenData,(rs)=>{
							if(rs){
								newTokenData['userinfo']=result[0];
								res.json(jsonFormat(1,newTokenData));
							}
						})						
						}
				},'uid = '+result[0].uid);

			}else{
				res.json(jsonFormat(-102,'password or username error '));
			}
		},'email = "'+req.body.email+'" and password = "'+md5(req.body.password)+'"');

	}else{
		console.log(req.body);
		res.json(jsonFormat(-100,'no data catched or params are illegal '));
	}
});

router.post('/logout',(req,res)=>{
	if(req.body.uid){
		var db_usertoken = new DB.DBhelper('user_token');
		db_usertoken.selectWhere((rs)=>{
			if(rs.length){
				db_usertoken.delete('uid = '+rs[0].uid,(rs)=>{
					if(rs){
						res.json(jsonFormat(1,{token_delete:true}));
					}else{
						res.json(jsonFormat(-201,'token delete error'));
					}
				});
			}else{
				res.json(jsonFormat(-101,'uid not find, user maybe is already logout '));
			}
		},'uid ='+req.body.uid)
	}else{
		res.json(jsonFormat(-100,'no data catched or datas is illegal '));
	}

});

router.get('/userInfo',(req,res)=>{
	if(req.query.uid){
		var db_user_info = new DB.DBhelper('user');
		db_user_info.selectWhere((result)=>{
			if(result.length)
				res.json(jsonFormat(1,result))
			else
				res.json(jsonFormat(-101,'user not find'))
		},'uid = ' + req.query.uid,'nickname,email,tumb_src,sex,sign');
	}else{
		res.json(jsonFormat(-100,'no data catched or params are illegal '));
	}
});

router.get('/userComment',(req,res)=>{
	if(req.query.uid){
		var db_user_comment = new DB.DBhelper('movie_comment');
		db_user_comment.selectWhere((result)=>{
			if(result.length)
				res.json(jsonFormat(1,result))
			else
				res.json(jsonFormat(-101,'comment not find'))
		},'uid = ' + req.query.uid);
	}else{
		res.json(jsonFormat(-100,'no data catched or params are illegal '));
	}
});

router.post('/postComment',(req,res)=>{
	console.log(req.body)
	if(req.body.vid&&req.body.comment){
		var db_user_comment = new DB.DBhelper('movie_comment');
		var commentData=[];
		commentData.uid = req.body.uid;
		commentData.vid = req.body.vid;
		commentData.comment = req.body.comment;
		commentData.time = Date();
		db_user_comment.add(commentData,(result)=>{
			if(result){
				res.json(jsonFormat(1,{save:true}));
			}else{
				res.json(jsonFormat(-202,'database save error'))
			}
		}) 
	}else{
		res.json(jsonFormat(-100,'no data catched or params are illegal '));
	}
});


module.exports = router;