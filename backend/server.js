var app = require('express')();
var fs = require('fs');
const exec = require('child_process').exec;
app.post('/', function (req, res) {
    fs.writeFileSync('./text.txt', req.body);
    exec('./tree-tagger-MacOSX-3.2-intel/cmd/tree-tagger-english ./text.txt', (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
    });
});

app.listen(8000, function () {
    console.log('Example app listening on port 8000!');
});
