# gulp-inno

Compile a windows installer using Inno Setup Compiler and Gulp.

### Example:

Pass your inno script in gulp src and pipe it to Inno.

```javascript
var gulp = require('gulp');
var inno = require('gulp-inno');
gulp.src('./installer_script.iss').pipe(inno());
```

### TODO:
- Write proper Readme.
- Clean unneeded inno files.
- Use terminal version of Inno
