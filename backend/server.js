var app = require('express')();
var fs = require('fs');
const exec = require('child_process').exec;
var http = require('http');
app.post('/', function (req, res) {
    //fs.writeFileSync('./text.txt', req.body);
    var options = {
        host: 'api.wordnik.com',
        path: '/v4/word.json/query/definitions?limit=200&includeRelated=true&useCanonical=false&includeTags=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5'
    };
    http.get(options, function(res) {
        res.on('data', function (chunk) {
            console.log('BODY: ' + chunk);
            var definition = JSON.parse(chunk);
            console.log(definition);
        });
    });
    console.log(req);
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
