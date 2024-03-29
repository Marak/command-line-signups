var http = require("http");
var charmer = require("charm");

var colors = [ 'red', 'blue', 'yellow', 'green', 'cyan' ];

exports.handler = function (stream, cb) {
  var charm = charmer(stream);
  
  stream.on('close', function(){
    charm.destroy();
  });
  
  var frames = [
  "                                                                ",
  "                        ██                                      ",
  "                        ██                 ██                   ",
  "  ████████ ███████ ███████ ███████ ██ ██ ██████ ██████ ██   ██  ",
  "   ██   ██ ██   ██ ██   ██ ██   ██ ██ ██   ██   ██     ██   ██  ",
  "   ██   ██ ██   ██ ██   ██ ███████ ██ ██   ██   ██████ ██   ██  ",
  "   ██   ██ ██   ██ ██   ██ ██      ██ ██   ██       ██ ██   ██  ",
  "   ██   ██ ███████ ███████ ███████ ██ ██   ████ ██████ ████████ ",
  "                                   ██                           ",
  "                                 ████                           ",
  "                                                                " ];

  var draw = {
    curWidth: 1,
    curHeight: 10,
    _start: function () {
      for (var i = 0; i <= this.curHeight; i++) {
        charm.foreground(colors[1]).write(frames[i].substring(0, this.curWidth) + "\n");
        
      }
      this.curWidth++;
      for ( var i = 0; i <= this.curHeight; i++ ) {
        charm.move(this.curWidth, -10).write(frames[i].substring(this.curWidth-1, this.curWidth) + "\n");
      }
    },
    _end: function () {
      charm.reset().down(1).foreground(colors[0]).write(frames.join("\n"));
      charm.write('\n');
      cb(null, charm);
    }
  };
  
  var animate = {
    _start: function () {
      if (draw.curWidth <= 64) {
        setTimeout(function(){
          
          if(stream.writable) {
            draw._start();
            animate._start();
          }
          
        }, 50); 
      }
      if (draw.curWidth == 65) {
        draw._end();
      }
    }
  };

  (function kickoff () {
    animate._start();
  })();

};