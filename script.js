var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var directions = [ 'up', 'down','left','right'];
var grammar = '#JSGF V1.0; grammar directions; public <direction> = ' + directions.join(' | ') + ' ;'

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

var diagnostic = document.querySelector('.output');

document.body.onclick = function() {
  recognition.start();
}

recognition.onresult = function(event) {
    var direction = event.results[0][0].transcript;
    diagnostic.textContent = 'Result received: ' + direction + '.';
    moveBlock(direction)
}

recognition.onspeechend = function() {
    recognition.stop();
}
  
recognition.onnomatch = function(event) {
    diagnostic.textContent = "I didn't recognise that direction(up,down,right,left).";
}
  
recognition.onerror = function(event) {
    diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
}

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

var block={
    x:185,
    y:185,
    side:30,
    color:"purple",
    drawBlock: function(){ 
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x,this.y,this.side,this.side);}
}

function update(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    block.drawBlock();    
    requestAnimationFrame(update);
}
requestAnimationFrame(update);

function moveBlock(direction) {
    if(direction == 'right' && block.x<=360){ 
        block.x += 30; 
    }
    else if(direction == 'left' && block.x>30){
        block.x += -30; 
    }
    else if(direction == 'up' && block.y>30) {
        block.y += -30;
    }
    else if(direction == 'down' && block.y<=360){
        block.y += 30; 
    }
}