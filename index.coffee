es = require 'event-stream'
spawn = require('child_process').spawn
path = require 'path'

module.exports = (opts) ->
  return es.map (script, next) ->
    compil = path.resolve('./node_modules/gulp-inno/inno/Compil32.exe')
    script_path = path.resolve(script.path)

    if process.platform != 'win32'
      args = [compil, '/cc',  'Z:' + script_path]
      run = spawn('wine', args)
    else
      args = ['/cc', script_path]
      run = spawn(compil, args)

    run.stdout.on 'data', (data) ->
      console.log 'stdout: ' + data

    run.stderr.on 'data', (data) ->
      console.log 'stderr: ' + data

    run.on 'close', (code) ->
      console.log 'child process exited with code ' + code
      next null
