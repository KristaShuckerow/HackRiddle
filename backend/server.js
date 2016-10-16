var app = require('express')();
var fs = require('fs');
const exec = require('child_process').exec;
var http = require('http');
var bp = require('body-parser');
 app.use(bp.json());
 app.use(bp.urlencoded({extended: true}));
app.post('/', function (req, res) {
    console.log(req);
    exec('Rscript ../Definition.R ' + 'banana', (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(stdout.substring(6));
        res.status(200).json({
            status: 200,
            message: stdout.substring(6)
        });
    });
    /*exec('./tree-tagger-MacOSX-3.2-intel/cmd/tree-tagger-english ./text.txt', (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
    });*/
});

app.listen(8000, function () {
    console.log('Example app listening on port 8000!');
});
