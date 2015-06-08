var es = require('event-stream');
var spawn = require('child_process').spawn;
var path = require('path');

module.exports = function(opts) {
  return es.map(function(script, next) {
    var compil = path.resolve(path.join(__dirname, 'inno/Compil32.exe'));
    var script_path = path.resolve(script.path);

    var args, run;
    if (process.platform !== 'win32') {
      args = [compil, '/cc', 'Z:' + script_path];
      run = spawn('wine', args);
    } else {
      args = ['/cc', script_path];
      run = spawn(compil, args);
    }
    run.stdout.on('data', function(data) {
      console.log('stdout: ' + data);
    });
    run.stderr.on('data', function(data) {
      console.log('stderr: ' + data);
    });
    run.on('close', function(code) {
      console.log('child process exited with code ' + code);
      return next(null);
    });
  });
};
