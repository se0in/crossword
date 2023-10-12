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


//desNumRow/Col (html 설명) 각각 불러오는 법
function createDescriptions(count, row) {
  for (let num = 1; num <= count; num++) {
    const selector = row ? `.desNumRow${num}` : `.desNumCol${num}`;
    window[`description${row ? "Row" : "Col"}${num}`] = document.querySelector(selector);
  }
}
const descriptionCount = 13;//중복 미포함 설명란 최대 숫자
createDescriptions(descriptionCount, true); // 가로
createDescriptions(descriptionCount, false); // 세로


//mouseenter 이벤트
//삼항 연산자를 이용한 이벤트 등록 방법
function addMouseHandler(description, inputs, isMouseEnter) {
  const bgColor = isMouseEnter ? "#a4a4f4" : "#fff";
  const textColor = isMouseEnter ? "#fff" : "#000";
  
  description.addEventListener(isMouseEnter ? "mouseenter" : "mouseleave", function () {
    for (let input of inputs) {
      input.style.backgroundColor = bgColor;
      input.style.color = textColor;
    }
  });
}

// 배열로 정의
// 가로 description 요소 배열
const descriptionsRow = [
  descriptionRow1,
  descriptionRow3,
  descriptionRow5,
  descriptionRow7,
  descriptionRow8,
  descriptionRow9,
  descriptionRow11,
  descriptionRow12
];

// 세로 description 요소 배열
const descriptionsCol = [
  descriptionCol2,
  descriptionCol4,
  descriptionCol5,
  descriptionCol6,
  descriptionCol10,
  descriptionCol13
];

// 가로 input 배열
const inputListsRow = [
  [input2_2, input2_3, input2_4],
  [input5_3, input5_4, input5_5],
  [input4_5, input4_6, input4_7, input4_8],
  [input2_8, input2_9, input2_10],
  [input7_4, input7_5, input7_6, input7_7],
  [input8_1, input8_2, input8_3, input8_4],
  [input8_7, input8_8, input8_9],
  [input9_6, input9_7]
];

// 세로 input 배열
const inputListCol = [
  [input2_3, input3_3, input4_3, input5_3],
  [input5_4, input6_4, input7_4, input8_4],
  [input4_5, input5_5],
  [input1_8, input2_8, input3_8, input4_8],
  [input7_7, input8_7, input9_7],
  [input8_9, input9_9, input10_9]
];

//가로와 세로 description 배열을 하나로 합치기
//스프레드 연산자(...) 사용
const allDescriptions = [...descriptionsRow, ...descriptionsCol];
const allInputs = [...inputListsRow, ...inputListCol];

// 이벤트 핸들러 추가
for (let i = 0; i < allDescriptions.length; i++) {
  const description = allDescriptions[i];
  const inputList = allInputs[i];

  if (description && inputList) {
    addMouseHandler(description, inputList, true);  // Mouse Enter 이벤트 추가
    addMouseHandler(description, inputList, false); // Mouse Leave 이벤트 추가
  }
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
