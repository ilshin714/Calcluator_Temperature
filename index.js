const express = require('express')
const app = express()
const port = 3000
var bodyParser = require('body-parser');
const { render } = require('ejs');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json())

app.get('/', function(req, res){
    res.render('main');
})

var input = "";
app.post('/main', function (req, res) {
    var output = 0;
    var buttonValue = req.body.button;
    var inputType = req.body.inputType;
    var outputType = req.body.outputType;

    input += buttonValue;
    input = parseFloat(input);

    if(buttonValue === "CE"){
        input = 0;
        output =0;
        buttonValue= "";
    }else if(buttonValue === "delete"){
        input = input + "";
        if(input.length > 0){
            input = input.substring(0, input.length-1);
        }
        buttonValue = "";
    }

    input = parseFloat(input);
    console.log("after passe Float" + input);
    if(inputType === "c" && outputType ==="c"){
        output =  input;
    }else if(inputType === "c" && outputType === "f"){
        output = (input * 9/5) + 32;
    }else if(inputType === "f" && outputType ==="c"){
        output =  (input - 32) * 9/5;
    }else if (inputType === "f" && outputType ==="f"){
        output =  input
    }else if(inputType === "c" && outputType === "k"){
        output = input + 273.15; 
    }else if(inputType === "f" && outputType ==="k"){
        output = (input - 32) * 9/5 + 273.15;
    }else if (inputType === "k" && outputType === "k"){
        output = input;
    }

    console.log("input and output" + input + " , " + output);

    res.render('main', {
        input: input,
        output: output,
        inputType : inputType,
        outputType : outputType
    });

});


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));