const fspro=require('fs/promises')
exports.home_get=async function(req,res){
	try{
		var data=await fspro.readFile('./indata.txt')
		var msg=String(data)
		res.render('home',{title:'Smart Agri',data:msg})
	}
	catch(e){
		console.log(e)
		next(e)
	}
}
exports.data_get=async function(req,res,next){
	try{
		var data=await fspro.readFile('./indata.txt')
		var msg=String(data)
		res.json({data:msg})
	}
	catch(e){
		console.log(e)
		next(e)
	}
}
exports.data_post=async function(req,res,next){
	try{
		var fd=await fspro.writeFile('./outdata.txt',
		req.body.data)
		return res.json({data:"got it"})
	}
	catch(e){
		console.log(e)
		next(e)
	}
}
exports.mois_get=async function(req,res,next){
	try{
		var dat=await fspro.readFile('./outdata.txt')
		var data=String(dat)
		return res.json({data:data})
	}
	catch(e){
		console.log(e)
		next(e)
	}
}
exports.mois_post=async function(req,res,next){
	try{
		var fd=await fspro.writeFile('./indata.txt',
		req.body.data)
		console.log('got it',req.body.data)
		return res.json({data:"got it"})
	}
	catch(e){
		console.log(e)
		next(e)
	}
}
