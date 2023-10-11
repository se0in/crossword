"use strict";

// crossword.html 파일 불러오기
//깃허브 404로 사용 안함.
/* const CROSS_HTML = "/../sub/crossword.html";
const CROSS_ID = document.getElementById("crossword");
fetch(CROSS_HTML)
  .then((response) => response.text())
  .then((data) => {
    CROSS_ID.innerHTML = data;
  })
  .catch((error) => {
    console.log("파일을 가져오는 동안 오류가 발생했습니다,", error);
  });
 */

/* 시간 */
function updateClock() {
  let nowTime = new Date();
  let nowHours = nowTime.getHours();
  let nowMinutes = nowTime.getMinutes();
  let $amOrPm = document.querySelector("#amOrPm");
  if (nowHours <= 11) {
    $amOrPm.textContent = "오전";
  } else {
    $amOrPm.textContent = "오후";
  }
  let $hours = document.querySelector("#hours");
  $hours.textContent = nowHours <= 9 ? `0${nowHours}` : nowHours;
  let $minutes = document.querySelector("#minutes");
  $minutes.textContent = nowMinutes <= 9 ? `0${nowMinutes}` : nowMinutes;
}
// 초기 시간 표시
updateClock();
// 1초마다 시간 업데이트
setInterval(updateClock, 1000);


/* 게임 방법, 다시시작, 정답보기 팝업 띄우기 & 닫기 */
//클래스 사용
class PopupHandler {
  constructor() {
    const popups = [
      { name: "howToPlay", trigger: "howToPlayLi" },
      { name: "replay", trigger: "replayLi", inputs: "crossword_board" },
      { name: "answer", trigger: "answerLi" },
    ];

    popups.forEach((popup) => {
      this.setupPopup(popup);
      this.setupPopupEvents(popup);
    });
  }

  setupPopup({ name, trigger, inputs }) {
    this[`$${name}Li`] = document.querySelector(`.${trigger}`);
    this[`$${name}Popup`] = document.querySelector(`.${name}.popup`);
    this[`$${name}PopupCloseBtn`] = document.querySelector(
      `.${name} button.close`
    );
    this[`$${name}PopupOkBtn`] = document.querySelector(
      `.${name} button.okBtn`
    );

    if (name === "replay") {
      this[`$${name}PopupNoBtn`] = document.querySelector(
        `.${name} button.noBtn`
      );
      this[`$${name}PopupReplayBtn`] = document.querySelector(
        `.${name} button.replayBtn`
      );
    }

    if (inputs) {
      this[`$$${inputs}`] = document.querySelectorAll(`.${inputs}`);
    }
  }

  setupPopupEvents({ name }) {
    const li = this[`$${name}Li`];
    const closeBtn = this[`$${name}PopupCloseBtn`];
    const okBtn = this[`$${name}PopupOkBtn`];

    li.addEventListener("click", () => this.showPopup(name));
    closeBtn.addEventListener("click", () => this.hidePopup(name));

    if (name === "replay") {
      const noBtn = this[`$${name}PopupNoBtn`];
      const replayBtn = this[`$${name}PopupReplayBtn`];

      noBtn.addEventListener("click", () => this.hidePopup(name));
      replayBtn.addEventListener("click", () => this.inputClean(name));
    }

    if (okBtn) {
      okBtn.addEventListener("click", () => this.hidePopup(name));
    }
  }

  showPopup(name) {
    this[`$${name}Popup`].classList.remove("displayNone");
  }

  hidePopup(name) {
    this[`$${name}Popup`].classList.add("displayNone");
  }

  inputClean(name) {
    const inputs = this[`$$crossword_board`];
    inputs.forEach((input) => (input.value = ""));
    this.hidePopup(name);
  }
}

const popupHandler = new PopupHandler();


/* 설명 호버 시 해당 input bg 변경 */
//요소 선택
// 반복할 요소의 숫자
const rowCount = 10;
const colCount = 10;

// for 사용하여 input 요소 전체 선택 (없는 요소는 null)
for (let row = 1; row <= rowCount; row++) {
  for (let col = 1; col <= colCount; col++) {
    const selector = `.crossword_item${row}-${col} input`;
    window[`input${row}_${col}`] = document.querySelector(selector);
  }
}

//html description 요소(1~13) 선택 
const descriptionCount = 13; 
for(let num = 1; num <= descriptionCount; num++){
  let selector = `.desNum${num}`;
  window[`description${num}`] = document.querySelector(selector);
}

//mouseenter 이벤트
function addMouseEnterHandler(description, inputs) {
  description.addEventListener("mouseenter", function () {
    for (let input of inputs) {
      input.style.backgroundColor = "#a4a4f4";
      input.style.color = "#fff";
    }
  });
}
//mouseleave 이벤트
function addMouseLeaveHandler(description, inputs) {
  description.addEventListener("mouseleave", function () {
    for (let input of inputs) {
      input.style.backgroundColor = "#fff";
      input.style.color = "#000";
    }
  });
}

// 배열로 정의
const descriptions = [
  description1, description2, description3, description4, description5,
  description7, description8, description9, description10, description11,
  description12, description13
];

const inputLists = [
  [input2_2, input2_3, input2_4],
  [input2_3, input3_3, input4_3, input5_3],
  [input5_3, input5_4, input5_5],
  [input5_4, input6_4, input7_4, input8_4],
  [input4_5, input4_6, input4_7, input4_8],
  [input2_8, input2_9, input2_10],
  [input7_4, input7_5, input7_6, input7_7],
  [input8_1, input8_2, input8_3, input8_4],
  [input7_7, input8_7, input9_7],
  [input8_7, input8_8, input8_9],
  [input9_6, input9_7],
  [input8_9, input9_9, input10_9]
];

// for문으로 반복되는 함수 호출
for (let i = 0; i < descriptions.length; i++) {
  const description = descriptions[i];
  const inputList = inputLists[i];
  
  addMouseEnterHandler(description, inputList);
  addMouseLeaveHandler(description, inputList);
}



/* 제이쿼리 */
$(function () {
  {
    /* 게임창 숨기기 and 다시 띄우기 */
    let closeGameBtnAll = {
      gameXButton: $(".tabHeader .btns button"),
      gameCloseButton: $(".closeBtn button"),
      taskCurrentGame: $(".background-taskbar .current .current-crossword"),
      bgGameIcon: $(".icon-box.game"),
    };

    $.each(closeGameBtnAll, function (key, $element) {
      $element.click(function () {
        $("#crossword").toggleClass("displayNone");
      });
    });
  }

  /* smallNumber 글자 focus 시 색상 변경 */
  $(".crossword_container input[type=text]")
    .on("focus", function () {
      $(this).parent($(".smallNumber::after")).css({ color: "#fff" });
    })
    .on("blur", function () {
      $(this).parent($(".smallNumber::after")).css({ color: "#000" });
    });
});
