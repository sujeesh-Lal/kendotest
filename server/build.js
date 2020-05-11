var exec = require('child_process').exec;
process.env.NODE_ENV = 'local';
var buildAndServe = false;
if (process && process.argv[2]) {
    process.env.NODE_ENV = process.argv[2];
}
// build and server from dist folder
if (process && process.argv[3] && process.argv[3] === 'build') {
    buildAndServe = true;
}
console.log(process.env.NODE_ENV, buildAndServe);

var commandString = "";

if (buildAndServe) {
    commandString = "ng build --configuration=" + process.env.NODE_ENV + " && node server.js";
} else {
    commandString = "ng serve";
    const serveCommand = 'nodemon --inspect=7000 server.js -w';
    runCommand(serveCommand)
}
runCommand(commandString);

function runCommand(cmd) {
    console.log("exec", " => " + cmd);
    var execCmd = exec(cmd, (err, stdout, stderr) => {
        if (err) {
            console.log("err", err);
            return;
        }
        console.log(stdout);
    });
    execCmd.stdout.on('data', function (data) {
        console.log(data);
    });

    execCmd.stderr.on('data', function (data) {
        console.log(data);
    });
}
