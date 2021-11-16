let randomRange = 0;
let number1=1;
let number2=2;
let userInput = 0;
let result = 0;
let level = 0;
let expression ='+';
let score = 0;
let counter = 0;

//* affichage des setups - initialisation *//
document.getElementById("panel").innerHTML = `
    <div class="difficulty">
    <h1>Difficulty</h1>
    <div class="signes">
        <button class=bouton value="+" onclick="setExpression(this)">+</button>
        <button class=bouton value="-" onclick="setExpression(this)">-</button>
        <button class=bouton value="x" onclick="setExpression(this)">x</button>
        <button class=bouton value="/" onclick="setExpression(this)">/</button>
    </div>
    </div>
    <div class="difficulty">
    <h1>Level</h1>
    <div class="level">
        <button class=bouton value="1" onclick="setLevel(this)">1</button>
        <button class=bouton value="2" onclick="setLevel(this)">2</button>
        <button class=bouton value="3" onclick="setLevel(this)">3</button>
        <button class=bouton value="4" onclick="setLevel(this)">4</button>
        <button class=bouton value="5" onclick="setLevel(this)">5</button>
    </div>
    </div>
`
var setExpression = function (ex){
    expression = ex.value;
    startQuestion();
}

var setLevel = function (lev){
    level = lev.value;
    randomRange = levelCase();
    startQuestion();
    chargeCalcul();
}


var showScoreInformation = function(){
    document.getElementById("score").innerHTML=`
    <p class="first">Score : ${score}/20</p>
    <p class="first">Expression : ${expression}</p>
    <p class="first">Level : ${level}</p>
    `
}

var startQuestion = function() {
    if(expression!= "" && level>0){
        calculateTest();
        document.getElementById("panel").innerHTML="";
        document.getElementById("test").style.visibility = "visible";
        
    } showScoreInformation();
}


let afficheRandom = document.getElementById("randomCalcul");
let boutons = document.getElementsByClassName("bouton");
let valide = document.getElementById("valide");
let resultat = document.getElementById("result");


var calculateTest = function (){
    number1 = Math.floor(Math.random()*(randomRange));
    number2 = Math.floor(Math.random()*(randomRange));

    switch (expression){
        case "+" :
            result = number1+number2;
        break;
        case "-" :
            result = number1-number2;
        break;
        case "x" :
            result = number1*number2;
        break;
        case "/" :
            result = (number1/number2).toFixed(2);
        break;
    } return result;
}



var levelCase = function (){
    switch (level){
        case "1" :
            randomRange = 11;
        break;
        case "2" :
            randomRange = 101;
        break;
        case "3" :
            randomRange = 1001;
        break;
        case "4" :
            randomRange = 10001;
        break;
        case "5" :
            randomRange = 100001;
        break;
    } return randomRange;
}

var chargeCalcul = function (){
    afficheRandom.innerHTML = number1+" "+expression+" "+number2+" = ";   
};

var validation = function (){
    userInput = document.getElementById("Utilisateur").value;
    if (userInput == ""){
        resultat.style.backgroundColor = "rgb(255,99,71)";
        resultat.innerHTML="You must put a number !";
    } else {
        checkUserResult();
}
};

var checkUserResult = function(){
    counter+=1;
        if(counter<21){
            if (userInput==result){
                score+=1;
                resultat.style.backgroundColor = "rgb(72, 141, 40)";
                resultat.innerHTML="Good job !";
            } else {
                score+=0;
                resultat.style.backgroundColor = "rgb(255,99,71)";
                resultat.innerHTML=`${number1} ${expression} ${number2} = ${userInput} not correst, it is ${result}`;
            }
            calculateTest();
            chargeCalcul();
            showScoreInformation();
            console.log(score);
        } else {
            document.getElementById("test").innerHTML="";
            resultat.innerText=`You score is ${score}`;
            if(score<10){
                resultat.style.backgroundColor = "rgb(255,99,71)";
            } else {
                resultat.style.backgroundColor = "rgb(72, 141, 40)";
            }
        }
}

for (var i=0; i<boutons.length; i++){
    boutons[i].addEventListener('click', chargeCalcul);
}


valide.addEventListener('click', validation);


window.addEventListener("DOMContentLoaded", chargeCalcul);


