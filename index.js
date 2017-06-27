var es = require('event-stream');
var spawn = require('child_process').spawn;
var path = require('path');

module.exports = function(opts) {
  opts = opts || {};
  opts.args = opts.args || [];
  opts.env = Object.assign({}, process.env, opts.env || {});

  return es.map(function(script, next) {
    var compil = path.resolve(path.join(__dirname, 'inno/ISCC.exe'));
    var script_path = path.resolve(script.path);

    var args, run;
    if (process.platform !== 'win32') {
      args = [compil, 'Z:' + script_path].concat(opts.args);
      run = spawn('wine', args, {env: opts.env});
    } else {
      args = [script_path].concat(opts.args);
      run = spawn(compil, args, {env: opts.env});
    }
    run.stdout.on('data', function(data) {
      console.log('stdout: ' + data);
    });
    run.stderr.on('data', function(data) {
      console.log('stderr: ' + data);
    });
    run.on('close', function(code) {
      var message = 'child process exited with code ' + code;
      console.log(message);
      if (code !== 0) {
        return next(message);
      } else {
        return next(null);
      }
    });
  });
};
