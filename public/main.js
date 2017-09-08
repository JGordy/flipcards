let correct =
document.getElementsByClassName("correct");
let incorrect = document.getElementsByClassName("incorrect");
let eachCard = document.getElementsByClassName("each_card");
let correctCount = document.getElementById("correct_count");
let totalCount = document.getElementById("total_count");

let correctAnswers = 0;
let totalQuestions = 0;
correctCount.textContent = 0;
totalCount.textContent = 0;


for (var i = 0; i < correct.length; i++) {
  correct[i].addEventListener("click", function() {
    this.parentNode.parentNode.remove();
    correctAnswers += 1;
    totalQuestions += 1;
    correctCount.textContent = correctAnswers;
    totalCount.textContent = totalQuestions;
  })
}

for (var i = 0; i < incorrect.length; i++) {
  incorrect[i].addEventListener("click", function() {
    this.parentNode.parentNode.remove();
    totalQuestions += 1;
    totalCount.textContent = totalQuestions;
  })
}
