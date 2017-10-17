var gulp = require('gulp')
var del = require('del')
var path = require('path')
var mkdirp = require('mkdirp')
var exec = require('child_process').exec
var zip = require('gulp-zip')
var tar = require('gulp-tar')
var moment = require('moment')
var GulpSSH = require('gulp-ssh')

const replace = require('replace')
var mom = moment(new Date())

// update
var stampVer = 'WEBVer-' + mom.format('YYYYMMDDHHmm')
console.log(stampVer)
var file = path.join(__dirname, 'client/src/constants.js')
console.log(file)

/*
replace({
  regex: new RegExp(/WEBVer-\d+/),
  replacement: stampVer,
  paths: [file],
  recursive: false,
  silent: true,
})
*/

var stamp = mom.format('YYYYMMDDHH')
var exportDir = '../export/' + stamp

// process: deploy: build => upload
//          update: build => zip (export)=> upload

var packs = {
  client: {
    src: 'client/dist/**/*.*',
    output: 'client.zip'
  },
  client_slim: {
    src: ['client/dist/**/*.*', '!client/dist/**/*.mp4'],
    output: 'client_slim.zip'
  },
  server: {
    src: ['./**/*.*', '!./**/*.log', '!./test/*.*', '!./client/**/*.*', '!./*.tar', '!./*.tar.gz', '!./export/**/*.*', '!./*.rpm', '!./node_modules/**/*.*', '!./.vscode/*.*'],
    output: 'server.zip'
  },
  serverOffline: {
    src: ['./**/*', '!./**/*.log', '!./test/*', '!./client/**/*', '!./*.tar', '!./*.tar.gz', '!./export/**/*', '!./.vscode/*'],
    output: 'serverOffline.tar.gz'
  },
  db: {
    src: '',
    output: 'db.zip'
  }
}

var remothost = {
  config: {
    host: '192.168.8.147',
    port: 22,
    username: 'root',
    password: 'bstar'
  },
  dir:{
    client: '/opt/bstar/html',
    server: '/opt/bstar/web/nodejs',
    exportDir: '/home/xian/' + stamp,
    db: '/home/xian/' + stamp
  }
}

var remothost_2 = {
  config: {
    //host: '192.168.8.113',
    host: '192.168.8.36',
    port: 22,
    username: 'root',
    //password: 'bc4-123'
    password: 'admin888'
  },
  dir:{
    client: '/opt/bstar/html',
    server: '/opt/bstar/web/nodejs',
    exportDir: '/home/xian/' + stamp,
    db: '/home/xian/' + stamp
  }
}

var gulpSSH = new GulpSSH({
  ignoreErrors: false,
  sshConfig: remothost.config
})

var gulpSSH_2 = new GulpSSH({
  ignoreErrors: false,
  sshConfig: remothost_2.config
})

gulp.task('scm:update', function (cb) {
 exec('svn upate', function(err) {
    if (err) return cb(err) // 返回 error
    cb() // 完成 task
  })
})

gulp.task('build:ver', function (cb) {
  replace({
    regex: new RegExp(/WEBVer-\d+/),
    replacement: stampVer,
    paths: [file],
    recursive: false,
    silent: true
  })
  cb()
})

gulp.task('clean:client', function (cb) {
  del([
    path.join(exportDir, packs.client.output),
    path.join(exportDir , packs.client_slim.output)
  ], cb)
})

gulp.task('build:client', ['build:ver'], function (cb) {
  exec('npm run build', function(err) {
    if (err) return cb(err) // 返回 error
    cb() // 完成 task
  })
})

gulp.task('build:zipclient', ['build:client'], function (cb) {
  return gulp.src(packs.client.src)
    .pipe(zip(packs.client.output))
    .pipe(gulp.dest(exportDir))
})

gulp.task('export:zipclient', function (cb) {
  return gulp.src(packs.client.src)
    .pipe(zip(packs.client.output))
    .pipe(gulp.dest(exportDir))
})

gulp.task('build:zipclientslim', ['build:client'], function (cb) {
  return gulp.src(packs.client_slim.src)
    .pipe(zip(packs.client_slim.output))
    .pipe(gulp.dest(exportDir))
})

gulp.task('export:zipclientslim', function (cb) {
  return gulp.src(packs.client_slim.src)
    .pipe(zip(packs.client_slim.output))
    .pipe(gulp.dest(exportDir))
})

gulp.task('clean:server', function (cb) {
  del([
    path.join(exportDir, packs.server.output)
  ], cb)
})

gulp.task('export:zipserver', function (cb) {
  return gulp.src(packs.server.src)
    .pipe(zip(packs.server.output))
    .pipe(gulp.dest(exportDir))
})

gulp.task('export:offlineserver', function (cb) {
  mkdirp.sync(exportDir)
  var outFile = path.join(exportDir, packs.serverOffline.output)
  exec('tar -czf ' + outFile + ' ./* --exclude=client --exclude=export', function(err) {
    if (err) {
      console.log('export:offlineserver failed: ' + err)
      return cb(err) // 返回 error
    }
    console.log(outFile)
    cb() // 完成 task
  })
})

gulp.task('upload:client', ['build:client'], function (cb) {
  return gulp.src(packs.client_slim.src)
    .pipe(gulpSSH.dest(remothost.dir.client))
    .on('error', function(err) {
      console.log(err)
    })
})

gulp.task('uploadonly:client', function (cb) {
  return gulp.src(packs.client_slim.src)
    .pipe(gulpSSH.dest(remothost.dir.client))
    .on('error', function(err) {
      console.log(err)
    })
})

gulp.task('upload:server', function (cb) {
  return gulp.src(packs.server.src)
    .pipe(gulpSSH.dest(remothost.dir.server))
    .on('error', function(err) {
      console.log(err)
    })
})

gulp.task('uploadonlyhost_2:client', function (cb) {
  console.log('remote host: ' + remothost_2.config.host)
  return gulp.src(packs.client_slim.src)
    .pipe(gulpSSH_2.dest(remothost_2.dir.client))
    .on('error', function(err) {
      console.log(err)
    })
})

gulp.task('uploadhost_2:server', function (cb) {
  console.log('remote host: ' + remothost_2.config.host)
  return gulp.src(packs.server.src)
    .pipe(gulpSSH_2.dest(remothost_2.dir.server))
    .on('error', function(err) {
      console.log(err)
    })
})

gulp.task('update:client', ['build:zipclientslim'], function (cb) {
  return gulp.src(path.join(exportDir, packs.client_slim.output))
    .pipe(gulpSSH.dest(remothost.dir.exportDir))
    .on('error', function(err) {
      console.log(err)
    })
})

gulp.task('updateonly:client', function (cb) {
  return gulp.src(path.join(exportDir, packs.client_slim.output))
    .pipe(gulpSSH.dest(remothost.dir.exportDir))
    .on('error', function(err) {
      console.log(err)
    })
})

gulp.task('update:server', ['export:zipserver'], function (cb) {
  return gulp.src(path.join(exportDir, packs.server.output))
    .pipe(gulpSSH.dest(remothost.dir.exportDir))
    .on('error', function(err) {
      console.log(err)
    })
})

gulp.task('clean:dist', function (cb) {
  del([
    'client/dist.zip',
    'client/dist',
    'client/client.zip',
    's1.zip',
    'server.zip',
    exportDir
  ], cb)
})

gulp.task('clean:export', function (cb) {
  del([
    exportDir
  ], cb)
})

gulp.task('buildslim', ['clean:export', 'build:client', 'build:zipclientslim', 'export:zipserver'])
gulp.task('export', ['clean:export', 'export:zipclient', 'export:zipserver'])
gulp.task('exportslim', ['clean:export', 'export:zipclientslim', 'export:zipserver'])

gulp.task('deploy:client', ['clean:client', 'build:client', 'upload:client'])
gulp.task('deploy:server', ['upload:server'])

gulp.task('deploy:offline', ['build:zipclientslim', 'export:offlineserver'])

gulp.task('deployhost_2', ['uploadonlyhost_2:client', 'uploadhost_2:server'])

gulp.task('upload', ['uploadonly:client', 'upload:server'])

gulp.task('deploy', ['deploy:client', 'deploy:server'])
gulp.task('update', ['update:client', 'update:server'])

gulp.task('deupdate', ['deploy', 'update'])

gulp.task('default', ['clean:dist', 'build:client', 'build:zipclient', 'export:zipserver'])
