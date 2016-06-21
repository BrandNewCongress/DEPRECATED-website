var isWin = /^win/.test(process.platform);
process.argv.forEach(function (val, index, array) {
  if (val == "clean") {
    console.log("CLEAN SCRIPT RUNNING");
    var exec = require('child_process').exec;
    var cmd = 'rm -rf $OUTPUT_DIR';
    if (isWin) {
      cmd = "echo WINDOWS DETECTED Manually delete the output directory if needed.";
    }
    exec(cmd, function(error, stdout, stderr) { // command output is in stdout
      console.log(stdout);
    });
  }
  if (val == "postinstall") {
    console.log("POST INSTALLATION SCRIPT RUNNING");
    var exec = require('child_process').exec;
    var cmd = 'if [ \"$NODE_ENV\" = production ] ; then npm run prod-build ; fi';
    if (isWin) {
      cmd = "echo WINDOWS DETECTED Production not supported on Windows.";
    }
    exec(cmd, function(error, stdout, stderr) { // command output is in stdout
      console.log(stdout);
    });
  }


});

//