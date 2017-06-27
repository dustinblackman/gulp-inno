# gulp-inno

Compile a windows installer using Inno Setup Compiler and Gulp.

### Install:

```bash
npm install --save-dev gulp-inno
```

### Example:

Pass your inno script in gulp src and pipe it to Inno.

```javascript
var gulp = require('gulp');
var inno = require('gulp-inno');
gulp.src('./installer_script.iss')
  .pipe(inno({
    args: ['arg1', 'args2', 'arg3'],
    env: {
        /* environment key-value pairs */
    }
  }));
```

For OS X Users: If you get `Failed to start Cocoa app main loop`, you need to upgrade wine to the latest devel

```brew install wine --devel```

### TODO:
- Write proper Readme.
- Clean unneeded inno files.
