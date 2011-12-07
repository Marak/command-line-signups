var net = require('net');

var splash = require('./lib/animations/jitsu');
 
var server = net.createServer(function (socket) {


  socket.hasEmail = false;
  splash.handler(socket, function(err, charm){

    socket.on('data', function(data){
      parseInput(cleanInput(data.toString()), this, charm)
    });


    charm.foreground('blue');
    socket.write('type "exit" to quit session \n');
    charm.foreground('white');
    socket.write('So you wish to learn Nodejitsu? \n');
    socket.write('Please enter your email address to enroll...');
    charm.foreground('red');
    socket.write('\nemail> ');
    charm.foreground('white');

  });


  
  
}).listen(8888);


function cleanInput (data) {

  var clean;

  //
  // Cleans the input of carriage return, newline
  //
  clean = data.toString().replace(/(\r\n|\n|\r)/gm,"");

  return clean;
}

function parseInput (data, socket, charm) {

  if(data === "exit") {
    socket.end();
  }

  if (socket.hasEmail) {
    
    //
    // Attempt to signup with desired user name
    //
    
    function request (options, cb) {
      cb(null, '{"message": "ok"}')
    }
    
    
    request({}, function(err, result){
      
      if (err) {
        charm.write('\n');
        charm.write('Username is already taken, please try again.');
        charm.foreground('white');
      } else {
        charm.write('\n');
        charm.write('ITS NODEJITSU TIME');
        charm.write('\n\n');

        socket.end();
      }
      
    });
  }


  if (data.match(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i) !== null) {
    
    socket.hasEmail = true;
    //
    // Capture email address
    //
    //console.log(data);
    
    //
    // Prompt for username
    //
    charm.write('\n');
    charm.write('Excellent! Now, enter a unique username');
    
    charm.foreground('red');
    socket.write('\nusername> ');
    charm.foreground('white');
    
  }
  
  

  if(data === "S") {
    socket.write('Let us signup for Nodejitsu!');
  }

  if(data === "A") {
    splash.handler(socket);
  }
  
  

}