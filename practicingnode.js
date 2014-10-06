//ex.1
console.log("HELLO WORLD");

//ex2
var result = 0;

for (var i = 2; i < process.argv.length; i++){
	result += Number(process.argv[i]);
}

console.log(result);

//ex3

var fs = require('fs');
var buff = fs.readFileSync(process.argv[2]).toString();
console.log(buff.split('\n').length - 1);

//ex4
var fs = require('fs');
var file = process.argv[2];

fs.readFile(file, function(err, contents) {
	var lines = contents.toString().split('\n').length - 1;
	console.log(lines);
});

//ex5
var fs = require('fs');
var path = require('path');

fs.readdir(process.argv[2], function (err, list){
	list.forEach(function(file){
		if (path.extname(file) === '.' + process.argv[3]){
			console.log(file);
		}
	    
    });
});

//ex6
var filterFn = require('./solution_filter.js');
var dir = process.argv[2];
var filterStr = process.argv[3];

filterFn(dir, filterStr, function (err, list) {
  if (err) {
    return console.error('There was an error:', err);
  }
  list.forEach(function (file) {
    console.log(file);
  });
});

//ex7
var http = require('http');

http.get(process.argv[2], function (response) {
  response.setEncoding('utf8');
  response.on('data', console.log);
  response.on('error', console.error);
});

//ex8
var http = require('http');
var bl = require('bl');

http.get(process.argv[2], function (response) {
  response.pipe(bl(function (err, data) {
    if (err) {
      return console.error(err)
    }  
    data = data.toString();
    console.log(data.length);
    console.log(data);
  }));  
});

//ex9
var http = require('http');
var bl = require('bl');
var results = [];
var count = 0;

function printResults() {
	for (var i = 0; i < 3; i++){
		console.log(results[i]);
	}	
}

function httpGet(index){
	http.get(process.argv[2+index], function (response){
		response.pipe(bl(function (err, data){
			if (err){
				return console.error(err);
			}

			results[index] = data.toString();
			count++;

			if (count == 3){
				printResults();
			}

		}));
	});
}

for (var i = 0; i < 3; i++){
	httpGet(i);
}


//ex10
var net = require('net');

function zeroFill(i){
	return (i < 10 ? '0' : '') + i
}

function now() {
	var d = new Date();
	return d.getFullYear() + '-'
	 	+ zeroFill(d.getMonth() + 1) + '-'
	 	+ zeroFill(d.getDate()) + ' '
	 	+ zeroFill(d.getHours()) + ':'
	 	+ zeroFill(d.getMinutes())
}

var server = net.createServer(function (socket){
	socket.end(now() + '\n')
});

server.listen(Number(process.argv[2]));



//ex11

var http = require('http');
var fs = require('fs');

var server = http.createServer(function (req,res){
	res.writeHead(200, { 'content-type': 'text/plain'})

	fs.createReadStream(process.argv[3]).pipe(res)
});

server.listen(Number(process.argv[2]));


//ex12 
var http = require('http');
var map = require('through2-map');

var server = http.createServer(function (req, res) {
  if (req.method != 'POST')
    return res.end('send me a POST\n')

  req.pipe(map(function (chunk) {
    return chunk.toString().toUpperCase()
  })).pipe(res)
})

server.listen(Number(process.argv[2]));




//ex13
var http = require('http');
var url = require('url');

function parsetime (time){
	return{
		hour: time.getHours(),
		minute: time.getMinutes(),
		second: time.getSeconds()
	}
}
 function unixtime (time) {
 	return { unixtime : time.getTime()
	}
 }

var server = http.createServer(function (req,res){
	var parseUrl = url.parse(req.url, true)
	var time = new Date(parseUrl.query.iso)
	var result

	if (/^\/api\/parsetime/.test(req.url))
		result = parsetime(time)

	else if (/^\/api\/unixtime/.test(req.url))	
		result = unixtime(time)
		

	if (result) {
		res.writeHead(200, {'Content-type' : 'application/json'})
		res.end(JSON.stringify(result))
		} else {
		res.writeHead(404)
		res.end()
	}
})

server.listen(Number(process.argv[2]));





















































