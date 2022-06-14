const express=require('express')
const http=require('http')
const createError=require('http-errors')

const app=express()
//const router=express.Router()
const cors=require('cors')
var indexRouter=require('./routes/index')

const server=http.createServer(app)
const port=normalizePort(process.env.PORT||'3000')
function normalizePort(val){
	var port=parseInt(val,10)
	if(isNaN(port)){
		return val
	}
	if(port>=0){
		return port
	}
	return false;
}

app.set('views','./views')
app.set('view engine','pug')
app.set('port',port)

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

/*
router.get('/',function(req,res,next){
	res.json({name:'Hello Wrld'})
})*/

//app.use(cors())
app.use(express.static('./public'))
app.use('/',indexRouter)
app.use(function(req,res,next){
	next(createError(404))
})
app.use(function(err,req,res,next){
	res.locals.message=err.message
	res.locals.error=req.app.get('env')==='development'?err:{}
	res.status(err.status||500).end()
})

server.listen(port)
server.on('error',onError)
server.on('listening',onListening)
function onError(error){
	if (error.syscall !== 'listen') {
		throw error
	}

	var bind = typeof port === 'string'
		? 'Pipe ' + port
		: 'Port ' + port

	// handle specific listen errors with friendly messages
	switch (error.code) {
		case 'EACCES':
			console.error(bind + ' requires elevated privileges')
			process.exit(1)
			break;
		case 'EADDRINUSE':
			console.error(bind + ' is already in use')
			process.exit(1)
			break
		default:
			throw error
	}
}
function onListening() {
	var addr = server.address()
	var bind = typeof addr === 'string'
		? 'pipe ' + addr
		: 'port ' + addr.port
	console.log('Listening on',bind)
}
