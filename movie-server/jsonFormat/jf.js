function jsonFormat (statusNum,data) {
	if(statusNum<=0){
		var json = {
			status:statusNum,
			err:data
		}
	}else{
		var json = {
			status:statusNum,
			datas:data
		}
	}
return json;
}

module.exports = jsonFormat;
