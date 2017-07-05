var express = require('express');
var router = express.Router();
var md5 = require('md5');
var DBhelper = require('../db/DBhelper.js');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var fs = require('fs');
//user access control
router.get('/logout',cheak_login);
router.get('/repasswd',cheak_login);
router.get('/movies/add',cheak_login);
router.get('/Movies/list',cheak_login);
router.get('/Movies/advList',cheak_login);
router.get('/Movies/advadd',cheak_login);
router.get('/Movies/movieEdit',cheak_login);
router.post('/repasswd',cheak_login);
router.post('/movies/advadd',cheak_login);
router.post('/movies/add',cheak_login);

function cheak_login (req,res,next) {
	if(!req.session.logged_in){
		res.render("admin/Public/error",{
    				message: "access denied",
        			error: "530"
    			})
	}else
	next();
}

/* GET home page. */
router.get('/', (req, res) => {
	if(!req.session.logged_in){
		res.redirect('/admin/login');
	}else{
		res.render('admin/Index/index', { title: 'Express' });
	}
  
});

// Admin Login Control
router.get('/login', (req, res) => {
	console.log(req.url);
    res.render('admin/Public/login', { title: 'Express' });
}).post('/login', (req, res) =>{
    var admin = new DBhelper.DBhelper("admin");
    admin.selectWhere((result)=> {
    	//console.log(typeof(result[0]));
    	if(result.length){
    		if(result[0].password==md5(req.body.password)){
    			req.session.logged_in = true;
    			res.redirect("./");
    		}else{
    			res.render("admin/Public/error",{
    				message: "password error",
        			error: "530"
    			})
    			//console.log(md5(req.body.password)+"\n"+result[0].password);
    		}
    	}else{
    		res.render("admin/Public/error",{
    				message: "not find username ",
        			error: "530"
    			})
    	}
    	
    },"username = '"+req.body.username+"'");
});

router.get('/logout',(req,res)=>{
	req.session.logged_in=false;
	res.redirect('/admin/login');
});


//-------------------------------------------------Admin password edit----------------------------------------------------
router.get('/repasswd',(req,res)=>{
	res.render('admin/Public/passwd');
}).post('/repasswd',(req,res)=>{
	var admin_check = new DBhelper.DBhelper("admin");
	admin_check.selectWhere((result)=>{
		//console.log(result);
		//console.log(req.body.password);
		if(result[0].password==md5(req.body.password)){
				var passwords = [];
				passwords['password']=md5(req.body.repassword);

				admin_check.save(passwords,"id = 1",(result)=>{
					if(result){
						res.render("admin/Public/error",{
    					message: "changed password success",
        				error: "400"
    					});
					}else{
						res.render("admin/Public/error",{
    					message: "unkonwn error",
        				error: "500"
    					});	
					}
				});	
    		}else{
    			res.render("admin/Public/error",{
    				message: "password error",
        			error: "530"
    			});
    		}
		});
	});


//----------------------------------------------------The Router Of Professor Info Control-----------------------
router.get("/movies/add",(req,res)=>{
	res.render('admin/Movies/add');
}).post("/movies/add",multipartMiddleware,(req,res)=>{
	//var professor_upload = new DBhelper.DBhelper("professor");
    console.log(req.files);
	var datasave = req.body;
	var uploadedPath_tumb = req.files['tumb_src']['path'];
	var temp = uploadedPath_tumb.split("/");
	var localAddress = "";
	for(var i = 0;i<temp.length-1;i++){
		localAddress+=temp[i]+"/";	
	}

	var dstPath_tumb = localAddress+"pages/pic_upload/"+uploadedPath_tumb.split("/")[temp.length-1];
	datasave['tumb_src']="/pic_upload/"+uploadedPath_tumb.split("/")[temp.length-1];


	//console.log(req.files['img_src']['path']);
	//console.log(dstPath);


    var uploadedPath_video = req.files['src']['path'];
    temp = uploadedPath_video.split("/");
    localAddress = "";
    for(var i = 0;i<temp.length-1;i++){
        localAddress+=temp[i]+"/";  
    }

    var dstPath_video = localAddress+"pages/video_upload/"+uploadedPath_video.split("/")[temp.length-1];
    datasave['src']="/video_upload/"+uploadedPath_video.split("/")[temp.length-1];


    //console.log(req.files['img_src']['path']);
    //console.log(dstPath);




	fs.rename(uploadedPath_tumb, dstPath_tumb , (err) => {
        if(err){
        //console.log(dstPath);
          res.render("admin/Public/error",{
    					message: "save error",
        				error: "500"+err
    					});
        } else {

        fs.rename(uploadedPath_video, dstPath_video, (err)=>{
                 if(err){
        //console.log(dstPath);
          res.render("admin/Public/error",{
                        message: "save error",
                        error: "500"+err
                        });
        } else {

          console.log('rename ok');
          var professor_upload = new DBhelper.DBhelper("video_src");
          professor_upload.add(datasave,(result)=>{
            if(result){
                res.redirect('/admin/Movies/list');
            }else{
                res.render("admin/Public/error",{
                        message: "save error",
                        error: "500"
                        });
            }
          });

        }

            })       

        }
    });

	//console.log(uploadedPath_tumb);
	//console.log(req.files['img_src']['path'].split("/")[2]);
});

//------------------------------------------------------------------------------------------------------------------------------------------
router.get("/movies/movieEdit",(req,res)=>{
    if(parseInt(req.query.vid)){
        var data = new DBhelper.DBhelper('video_src');
        data.selectWhere((rs)=>{
            res.render('admin/Movies/movieEdit',{datapack:rs[0]});
        },'vid = '+req.query.vid);
    }
    
}).post("/movies/movieEdit",multipartMiddleware,(req,res)=>{
    //var professor_upload = new DBhelper.DBhelper("professor");
    console.log(req.files);
    var datasave = req.body;
    var uploadedPath_tumb = req.files['tumb_src']['path'];
    var temp = uploadedPath_tumb.split("/");
    var localAddress = "";
    for(var i = 0;i<temp.length-1;i++){
        localAddress+=temp[i]+"/";  
    }

    var dstPath_tumb = localAddress+"pages/pic_upload/"+uploadedPath_tumb.split("/")[temp.length-1];
    datasave['tumb_src']="/pic_upload/"+uploadedPath_tumb.split("/")[temp.length-1];


    //console.log(req.files['img_src']['path']);
    //console.log(dstPath);


    var uploadedPath_video = req.files['src']['path'];
    temp = uploadedPath_video.split("/");
    localAddress = "";
    for(var i = 0;i<temp.length-1;i++){
        localAddress+=temp[i]+"/";  
    }

    var dstPath_video = localAddress+"pages/video_upload/"+uploadedPath_video.split("/")[temp.length-1];
    datasave['src']="/video_upload/"+uploadedPath_video.split("/")[temp.length-1];


    //console.log(req.files['img_src']['path']);
    //console.log(dstPath);




    fs.rename(uploadedPath_tumb, dstPath_tumb , (err) => {
        if(err){
        //console.log(dstPath);
          res.render("admin/Public/error",{
                        message: "save error",
                        error: "500"+err
                        });
        } else {

        fs.rename(uploadedPath_video, dstPath_video, (err)=>{
                 if(err){
        //console.log(dstPath);
          res.render("admin/Public/error",{
                        message: "save error",
                        error: "500"+err
                        });
        } else {

          console.log('rename ok');
          var professor_upload = new DBhelper.DBhelper("video_src");
          professor_upload.save(datasave,'vid = '+req.body.vid,(result)=>{
            if(result){
                res.redirect('/admin/Movies/list');
            }else{
                res.render("admin/Public/error",{
                        message: "save error",
                        error: "500"
                        });
            }
          });

        }

            })       

        }
    });

    //console.log(uploadedPath_tumb);
    //console.log(req.files['img_src']['path'].split("/")[2]);
});
//----------------------------------------------------------------------------------------------------------------------------



router.get("/Movies/list",(req,res)=>{
	var professor = new DBhelper.DBhelper("video_src");
	professor.selectWhere((result)=>{
		res.render('admin/Movies/list',{datapack:result});
	});
}).post("/Movies/list/delete",(req,res)=>{
		var dataDelete = new DBhelper.DBhelper("video_src");
		dataDelete.delete('vid = '+req.body.id,(result)=>{
			if(result)
			res.redirect("/admin/Movies/list")
			else{
				res.render("admin/Public/error",{
    					message: "delete error",
        				error: "500"
    					});
			}
		});
});


router.get("/Movies/advList",(req,res)=>{
    var professor = new DBhelper.DBhelper("adv_src");
    professor.selectWhere((result)=>{
        res.render('admin/Movies/advList',{datapack:result});
    });
}).post("/Movies/advList/delete",(req,res)=>{
        var dataDelete = new DBhelper.DBhelper("adv_src");
        dataDelete.delete('adv_id = '+req.body.id,(result)=>{
            if(result)
            res.redirect("/admin/Movies/advList")
            else{
                res.render("admin/Public/error",{
                        message: "delete error",
                        error: "500"
                        });
            }
        });
});

router.get("/Movies/userList",cheak_login,(req,res)=>{
    var professor = new DBhelper.DBhelper("user");
    professor.selectWhere((result)=>{
        res.render('admin/Movies/userList',{datapack:result});
    });
}).post("/Movies/userList/delete",cheak_login,(req,res)=>{
        var dataDelete = new DBhelper.DBhelper("user");
        dataDelete.delete('uid = '+req.body.id,(result)=>{
            if(result)
            res.redirect("/admin/Movies/userList")
            else{
                res.render("admin/Public/error",{
                        message: "delete error",
                        error: "500"
                        });
            }
        });
});
	

router.get("/Movies/advadd",(req,res)=>{
    res.render('admin/Movies/advadd');
}).post("/Movies/advadd",multipartMiddleware,(req,res)=>{
    //var professor_upload = new DBhelper.DBhelper("professor");
    var datasave = req.body;
    var uploadedPath = req.files['src']['path'];
    var temp = uploadedPath.split("/");
    var localAddress = "";
    for(var i = 0;i<temp.length-1;i++){
        localAddress+=temp[i]+"/";  
    }

    var dstPath = localAddress+"pages/adv_upload/"+uploadedPath.split("/")[temp.length-1];
    datasave['src']="/adv_upload/"+uploadedPath.split("/")[temp.length-1];

    //console.log(req.files['src']['path']);
    //console.log(dstPath);

    fs.rename(uploadedPath, dstPath, (err) => {
        if(err){
        console.log(dstPath);
          res.render("admin/Public/error",{
                        message: "save error",
                        error: "500"+err
                        });
        } else {
          console.log('rename ok');
          var professor_upload = new DBhelper.DBhelper("adv_src");
          professor_upload.add(datasave,(result)=>{
            if(result){
                res.redirect('/admin/Movies/userList');
            }else{
                res.render("admin/Public/error",{
                        message: "save error",
                        error: "500"
                        });
            }
          });

        }
    });

    //console.log(uploadedPath);
    //console.log(req.files['img_src']['path'].split("/")[2]);
});


//------------------------------------------------------------------------------------------------------------------
module.exports = router;