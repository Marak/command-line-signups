var net = require('net');

//
// animations with charm tend to leak memory,
// this require('kiwf') will restart the process at 200mbs of ram
//
require('kiwf')({
  "maxMemory":200000000
});

var splash = require('./lib/animations/jitsu');

var nj = require('nodejitsu-api');


var server = net.createServer(function (socket) {

  //
  // TODO: Add socket timeout if no data has come in
  //
  socket.getEmail = false;
  socket.getUsername = false;
  socket.email = '';
  
  splash.handler(socket, function(err, charm){

    socket.charm = charm;

    var bufferingHackTimer;

    socket.charm = charm;
    bufferingHackTimer = setInterval(function(){
      if (socket.writable) {
        //socket.write(new Buffer([0]));
      }
    }, 50);


    socket.on('close', function(){
      charm.destroy();
    });

    charm.foreground('blue');
    charm.write('type "exit" to quit session \n\n');
    charm.foreground('white');
    charm.write('So you wish to learn Nodejitsu? \n\n');
    promptEmail(socket, charm);

  socket.body = '';
  
  socket.on('data', function(data){
    parseInput(cleanInput(data.toString()), this)
  });

    
  });

}).listen(23, '0.0.0.0');

function promptEmail (socket, charm) {
  charm.write('Enter your email address to enroll...');
  charm.foreground('red');
  charm.write('\nemail> ');
  charm.foreground('white');
  socket.getEmail = true;
}


function promptUsername (socket, charm) {
  charm.write('\nEnter your desired username');
  charm.foreground('red');
  charm.write('\nusername> ');
  charm.foreground('white');
  socket.getUsername = true;
  
}

function cleanInput (data) {

  var clean;

  //
  // Cleans the input of carriage return, newline
  //
  clean = data.toString().replace(/(\r\n|\n|\r)/gm,"");

  return clean;
}

function parseInput (data, socket) {


  var charm = socket.charm;

  //
  // This is a hack for HTTP data from CURL...
  // if anything we should detect the HTTP connection upstream and flag the socket
  //
  if(Number(data[0]) === data.length){
    data = data.substr(1,clean.length-1);
  }

  if(data === "exit" || data === "quit") {
    charm.destroy();
    socket.end();
    return;
  }

  if (socket.email.length && socket.getUsername) {

    socket.getUsername = false;
    //
    // Attempt to signup with desired user name
    //

    var client = nj.createClient({
      remoteUri: 'http://api.nodejitsu.com'
    });

    charm.write('Attempting to signup...\n');

    client.users.create({
      username: data,
      email: socket.email
    }, function (err, result){

      if (!socket.writable) {
        return false;
      }

      if (err) {
        charm.write('\n');
        charm.write('Username ').foreground('magenta').write(data).foreground('white').write(' is already taken!!\nPlease try again with a new username.\n\n');
        charm.write('If you think ').foreground('magenta').write(data).foreground('white').write(' might be your account...\n');
        charm.write('Try running ').foreground('magenta').write('npm install jitsu -g').foreground('white').write(' in your local session \n');
        charm.write('Once you have').foreground('magenta').write(' jitsu ').foreground('white').write('installed you can type ').foreground('magenta').write('jitsu forgot').foreground('white').write(' to reset your password\n');
        charm.foreground('white');
        promptUsername(socket, charm);
        return;
      }

      charm.write('\n');
      charm.foreground('green');
      charm.write('Great success!');
      charm.write('\n\n');
      charm.foreground('white');
      charm.write('We are now sending an email to ').foreground('magenta').write(socket.email).foreground('white').write(' with further instructions\n\n');
      charm.foreground('white');
      charm.write('To get started we recommend installing our CLI tool ').foreground('magenta').write('jitsu \n');
      charm.foreground('white')
      charm.write('Simply run the command: ').foreground('magenta').write('npm install jitsu -g').foreground('white').write(' in your local session \n\n');
      charm.foreground('white');
      charm.write('Fairwell Ninja!\n\n');
      socket.end();

    });

  }

  if (data.match(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i) !== null) {

    socket.email = data;
    //
    // Capture email address
    //

    //
    // Prompt for username
    //
    socket.getEmail = false;
    socket.charm.write('Excellent! Now you will need to enter a unique username.\n');
    promptUsername(socket, charm);
  }

  if (!socket.email.length && socket.getEmail) {
    charm.write('\n');
    charm.write('You have provided an invalid email address!!!\n\n');
    promptEmail(socket, charm);
  }
 

}