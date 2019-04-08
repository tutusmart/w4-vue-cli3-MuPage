var glob = require('glob');
var path = require('path');
function getMultiEntry(globPath){
    console.log(globPath)
    var entries = {},
    basename, tmp, pathname;
    glob.sync(globPath).forEach(function (entry) {
      basename = path.basename(entry, path.extname(entry));
      tmp = entry.split('/').splice(-4);
  
      var pathsrc = tmp[0] + '/' + tmp[1];
      if (tmp[0] == 'src') {
        pathsrc = tmp[1];
      }
      //console.log(pathsrc)
      pathname = pathsrc + '/' + basename; // 正确输出js和html的路径
      entries[pathname] = entry;
      //console.log(pathname+'-----------'+entry);
    });
    console.dir(entries);
    console.dir("-----------------------")
    return entries;
  }

module.exports = {
    getMultiEntry,
    DevassetsPublicPath:'/',
    ProassetsPublicPath:'./'
};