// array-passing the number, questions, options, and answers.
let questions = [
    {
    numb: 1,
    question: "What does HTML stand for?",
    answer: "Hyper Text Markup Language",
    options: [
      "Hyper Text Multi Learner",
      "Hyper Text Markup Language",
      "Hyper Text Multiple Language",
      "Hyper Tool Multi Language"
    ]
  },
    {
    numb: 2,
    question: "What does CSS stand for?",
    answer: "Cascading Style Sheet",
    options: [
      "Code Style Sheet",
      "Cascading Sheet Style",
      "Code Sheet Style",
      "Cascading Style Sheet"
    ]
  },
    {
    numb: 3,
    question: "Which of the following is a CSS Selector?",
    answer: ".class",
    options: [
      ".class",
      "#class",
      ".id",
      "id"
    ]
  },
    {
    numb: 4,
    question: "Which of the following is NOT a CSS Function?",
    answer: "top()",
    options: [
      "attr()",
      "counter()",
      "var()",
      "top()"
    ]
  },
    {
    numb: 5,
    question: "Which of the following is NOT a way to declare a variable in JavaScript?",
    answer: "log",
    options: [
      "log",
      "var",
      "let",
      "const"
    ]
  },
];

//variables
let timeValue =  59;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterColor;
let widthValue = 0;
let timerOn = false;
let changeColors = false;

//selecting all required elements
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const initials_box = document.querySelector(".initials_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");
const next_btn = document.querySelector("footer .next_btn");
const finish_btn = document.querySelector("footer .finish_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");
const initialsInput = document.querySelector("#initials");
const scoreText = initials_box.querySelector(".score_text");

// if startQuiz button clicked
start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo"); //show info box
}

// if exitQuiz button clicked
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide info box
}

// if continueQuiz button clicked
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.add("activeQuiz"); //show quiz box
    showQuestions(0); //calling showQestions function
    queCounter(1); //passing 1 parameter to queCounter
    timerOn = true;
    startTimer(); //calling startTimer function
}

// if restartQuiz button clicked
restart_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz"); //show quiz box
    result_box.classList.remove("activeResult"); //hide result box
    timeValue = 59; 
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuestions(que_count); //calling showQestions function
    queCounter(que_numb); //passing que_numb value to queCounter
    clearInterval(counter); //clear counter
    timerOn = true;
    startTimer(); //calling startTimer function
    timeText.textContent = "Time Left"; //change the text of timeText to Time Left
    next_btn.classList.remove("show"); //hide the next button
    initialsInput.value = "";
}

// if quitQuiz button clicked
quit_quiz.onclick = ()=>{
    window.location.reload(); //reload the current window
}

// if Next button clicked
next_btn.onclick = ()=>{
    if(que_count < questions.length - 1){ //if question count is less than total question length
        que_count++; //increment the que_count value
        que_numb++; //increment the que_numb value
        showQuestions(que_count); //calling showQestions function
        queCounter(que_numb); //passing que_numb value to queCounter
        timeText.textContent = "Time Left"; //change the timeText to Time Left
        next_btn.classList.remove("show"); //hide the next button
    }else{
        timerOn = false;
        //showResult(); //calling showResult function
        showPlayerInitialsBox();
    }
}

// if Finish button clicked
finish_btn.onclick = ()=>{
    var playerInitials = initialsInput.value;
    localStorage.setItem(playerInitials, userScore);
    changeColors = false; //stop the color changing
    showResult(); //calling showResult function
}

// getting questions and options from array
function showQuestions(index){
    const que_text = document.querySelector(".que_text");

    //creating a new span and div tag for question and option and passing the value using array index
    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag; //adding new span tag inside que_tag
    option_list.innerHTML = option_tag; //adding new div tag inside option_tag
    
    const option = option_list.querySelectorAll(".option");

    // set onclick attribute to all available options
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

// creating the new div tags which for icons
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

//if user clicked on option
function optionSelected(answer){
    //clearInterval(counter); //clear counter
    let userAns = answer.textContent; //getting user selected option
    let correcAns = questions[que_count].answer; //getting correct answer from array
    const allOptions = option_list.children.length; //getting all option items
    
    if(userAns == correcAns){ //if user selected option is equal to array's correct answer
        userScore += 1; //upgrading score value with 1
        answer.classList.add("correct"); //adding green color to correct selected option
        answer.insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to correct selected option
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    }else{
        answer.classList.add("incorrect"); //adding red color to correct selected option
        answer.insertAdjacentHTML("beforeend", crossIconTag); //adding cross icon to correct selected option
        timeValue -= 3;

        for(i=0; i < allOptions; i++){
            if(option_list.children[i].textContent == correcAns){ //if there is an option which is matched to an array answer 
                option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                console.log("Auto selected correct answer.");
            }
        }
    }
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
    }
    next_btn.classList.add("show"); //show the next button if user selected any option
}

function oninputOfInitialsBox (){
    if(initialsInput.value.length <= 4 && initialsInput.value.length > 0){
       finish_btn.classList.add("show"); //shows finish button if user typed initials
    }
    else{
        finish_btn.classList.remove("show"); //hide the finish button
    }
}

function showPlayerInitialsBox(){
    changeColors = true; //start the color changing
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.remove("activeQuiz"); //hide quiz box
    initials_box.classList.add("activeInitials"); //show initials box
    //creating a new li tag and passing the user score number and total question number
    let scoreTag = '<p>You got '+ userScore +' out of '+ questions.length +'</p>';
    scoreText.innerHTML = scoreTag;  //adding new span tag inside score_Text
}

function showResult(){
    initials_box.classList.remove("activeInitials"); //hide initials box
    result_box.classList.add("activeResult"); //show result box
    const scoreOrderedList = result_box.querySelector(".score_ordered_list");
    let bigInnerHTML = "";

    for(let i = 0; i < localStorage.length; i++) { 

        //console.log(localStorage.key(i));
        let storageKey = localStorage.key(i);
        var storageValue = localStorage.getItem(storageKey);
        
        //creating a new li tag and passing the user score number and total question number
        let scoreTag = '<li>  '+ storageKey + ' ' + storageValue +'</li>';
        console.log(scoreTag);
        bigInnerHTML += scoreTag;
    }

    scoreOrderedList.innerHTML = bigInnerHTML;  //adding new span tag inside score_Text
}

function startTimer(){
    counter = setInterval(timer, 1000);
    function timer(){

        if(timerOn === true){
            timeCount.textContent = timeValue; //changing the value of timeCount with time value

            if(timeValue <= 9){ //if timer is less than 9
                timeCount.textContent = "0" + timeValue; //add a 0 before time value
            }
            if(timeValue <= 0){ //if timer is less than 0
                timerOn = false;
                timeText.textContent = "Time Off"; //change the time text to time off
                const allOptions = option_list.children.length; //getting all option items
                let correcAns = questions[que_count].answer; //getting correct answer from array
                for(i=0; i < allOptions; i++){
                    if(option_list.children[i].textContent == correcAns){ //if there is an option which is matched to an array answer
                        option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                        option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                    }
                }
                for(i=0; i < allOptions; i++){
                    option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
                }
                next_btn.classList.add("show"); //show the next button if user selected any option
                showPlayerInitialsBox();

            }
            timeValue--; //decrement the time value

        }
    }
}

function queCounter(index){
    //creating a new span tag and passing the question number and total question
    let totalQueCounTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;  //adding new span tag inside bottom_ques_counter
}

function startTimerColor(){
    counterColor = setInterval(timer, 50);
    function timer(){
        if (changeColors === true){
            const randomColor = Math.floor(Math.random()*16777215).toString(16);
            scoreText.style.color = "#" + randomColor;
        }
    }
}

//start the color timer
startTimerColor();
