"use strict";

var express = require('express')
var seneca  = require('seneca')

var si = seneca({log:'print'})

si.use( 'config', {object:require('./config.mine.js')} )
si.use( require('./lib/nodezoo') )

si.act({role:'config',cmd:'get',base:'nodezoo'}, function(err,config){
  if( err ) throw err;
  start_express(config)
})


function start_express(config) {
  var app = express()

  app.use(express.cookieParser())
  app.use(express.query())
  app.use(express.bodyParser())
  app.use(express.methodOverride())
  app.use(express.json())
  app.use(express.static(__dirname+'/site/public'))
  //app.use(express.session({ secret: 'waterford' }))


  app.use( si.service() )

  app.listen( config.web.port )
}

