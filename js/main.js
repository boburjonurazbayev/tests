const elQuestionTemp = document.querySelector("#question-template").content;
const elAnswerTemp = document.querySelector("#answer-template").content;
const elAnswerText = document.querySelector("#trueAnswer");

let minute = 2;
let second = 0;

const milSecondInSecond = 1000;
const secondInMinute = 60;

let realtime = "0" + minute + " : " + "0" + second;

function renderTime(realtime, node) {
  node.textContent = realtime;
}

renderTime(realtime, timer);

function time() {
  minute--;
  let runSecond = setInterval(() => {
    if (second <= 0 && minute <= 0) {
      formBtn.disabled = true;
      clearInterval(runSecond);
      clearInterval(runMinute);
      clearInterval(fullTime);

      const input = questionsForm.querySelectorAll(".input");

      let yourResult = [];
      let allAnswers = [];
      data.forEach((el) =>
        allAnswers.push({
          id: el.id,
          answer: el.answerId,
        })
      );

      for (let i = 0; i < input.length; i++) {
        if (input[i].checked) {
          yourResult.push({ id: input[i].name, answer: input[i].value });
        }
      }

      let result = 0;

      for (let i = 0; i < allAnswers.length; i++) {
        for (let j = 0; j < yourResult.length; j++) {
          if (
            allAnswers[i].id == yourResult[j].id &&
            allAnswers[i].answer == yourResult[j].answer
          ) {
            result++;
          }
        }
      }
      trueAnswer.textContent =
        "Your true answers is " +
        result +
        " and your result " +
        (result / allAnswers.length) * 100 +
        "%";

      for (let i = 0; i < input.length; i++) {
        input[i].checked = false;
      }

      alert("Time is over");
    }

    if (second == 0 && minute > 0) {
      second = 60;
    }

    second--;
  }, milSecondInSecond);

  let runMinute = setInterval(() => {
    minute--;
  }, secondInMinute * milSecondInSecond);

  let fullTime = setInterval(() => {
    second = String(second).padStart(2, 0);
    minute = String(minute).padStart(2, 0);

    realtime = minute + " : " + second;

    renderTime(realtime, timer);
  }, milSecondInSecond);

  questionsForm.addEventListener("submit", (evt) => {
    evt.preventDefault();

    clearInterval(runSecond);
    clearInterval(runMinute);
    clearInterval(fullTime);

    const input = questionsForm.querySelectorAll(".input");

    let yourResult = [];
    let allAnswers = [];
    data.forEach((el) =>
      allAnswers.push({
        id: el.id,
        answer: el.answerId,
      })
    );

    for (let i = 0; i < input.length; i++) {
      if (input[i].checked) {
        yourResult.push({ id: input[i].name, answer: input[i].value });
      }
    }

    let result = 0;

    for (let i = 0; i < allAnswers.length; i++) {
      if (
        allAnswers[i].id == yourResult[i].id &&
        allAnswers[i].answer == yourResult[i].answer
      ) {
        result++;
      }
    }
    trueAnswer.textContent =
      "Your true answers is " +
      result +
      " and your result " +
      (result / allAnswers.length) * 100 +
      "%";

    for (let i = 0; i < input.length; i++) {
      input[i].checked = false;
    }
  });
}

time();

function renderQuestion(arr, node) {
  node.innerHTML = null;

  arr.forEach((question) => {
    const questionFragment = document.createDocumentFragment();
    const questionTemp = elQuestionTemp.cloneNode(true);

    const header = questionTemp.querySelector(".question");

    header.textContent = question.question;
    questionFragment.appendChild(questionTemp);

    for (let i = 0; i < question.variant.length; i++) {
      const answerTemp = elAnswerTemp.cloneNode(true);

      const input = answerTemp.querySelector(".input");
      const span = answerTemp.querySelector(".answer");

      input.name = question.id;
      input.value = i;

      span.textContent = question.variant[i];

      questionFragment.appendChild(answerTemp);
    }
    node.appendChild(questionFragment);
  });
}

renderQuestion(data, questionsForm);
