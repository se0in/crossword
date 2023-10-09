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

// 시간
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

//게임 방법, 다시시작, 정답보기 팝업 띄우기 & 닫기
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

//설명 호버 시 해당 input bg 변경
//요소 선택
let input1_8 = document.querySelector(".crossword_item1-8 input");
let input2_2 = document.querySelector(".crossword_item2-2 input");
let input2_3 = document.querySelector(".crossword_item2-3 input");
let input2_4 = document.querySelector(".crossword_item2-4 input");
let input2_8 = document.querySelector(".crossword_item2-8 input");
let input2_9 = document.querySelector(".crossword_item2-9 input");
let input2_10 = document.querySelector(".crossword_item2-10 input");
let input3_3 = document.querySelector(".crossword_item3-3 input");
let input3_8 = document.querySelector(".crossword_item3-8 input");
let input4_3 = document.querySelector(".crossword_item4-3 input");
let input4_5 = document.querySelector(".crossword_item4-5 input");
let input4_6 = document.querySelector(".crossword_item4-6 input");
let input4_7 = document.querySelector(".crossword_item4-7 input");
let input4_8 = document.querySelector(".crossword_item4-8 input");
let input5_3 = document.querySelector(".crossword_item5-3 input");
let input5_4 = document.querySelector(".crossword_item5-4 input");
let input5_5 = document.querySelector(".crossword_item5-5 input");
let input6_4 = document.querySelector(".crossword_item6-4 input");
let input7_4 = document.querySelector(".crossword_item7-4 input");
let input7_5 = document.querySelector(".crossword_item7-5 input");
let input7_6 = document.querySelector(".crossword_item7-6 input");
let input7_7 = document.querySelector(".crossword_item7-7 input");
let input8_1 = document.querySelector(".crossword_item8-1 input");
let input8_2 = document.querySelector(".crossword_item8-2 input");
let input8_3 = document.querySelector(".crossword_item8-3 input");
let input8_4 = document.querySelector(".crossword_item8-4 input");
let input8_7 = document.querySelector(".crossword_item8-7 input");
let input8_8 = document.querySelector(".crossword_item8-8 input");
let input8_9 = document.querySelector(".crossword_item8-9 input");
let input9_6 = document.querySelector(".crossword_item9-6 input");
let input9_7 = document.querySelector(".crossword_item9-7 input");
let input9_9 = document.querySelector(".crossword_item9-9 input");
let input10_9 = document.querySelector(".crossword_item10-9 input");
//가로
let description1 = document.querySelector(".desNum1");
let description3 = document.querySelector(".desNum3");
let description5 = document.querySelector(".desNum5");
let description7 = document.querySelector(".desNum7");
let description8 = document.querySelector(".desNum8");
let description9 = document.querySelector(".desNum9");
let description11 = document.querySelector(".desNum11");
let description12 = document.querySelector(".desNum12");
// 세로
let description2 = document.querySelector(".desNum2");
let description4 = document.querySelector(".desNum4");
let description10 = document.querySelector(".desNum10");
let description13 = document.querySelector(".desNum13");

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

//
// 가로
addMouseEnterHandler(description1, [input2_2, input2_3, input2_4]);
addMouseLeaveHandler(description1, [input2_2, input2_3, input2_4]);
addMouseEnterHandler(description3, [input5_3, input5_4, input5_5]);
addMouseLeaveHandler(description3, [input5_3, input5_4, input5_5]);
addMouseEnterHandler(description5, [input4_5, input4_6, input4_7, input4_8]);
addMouseLeaveHandler(description5, [input4_5, input4_6, input4_7, input4_8]);
addMouseEnterHandler(description7, [input2_8, input2_9, input2_10]);
addMouseLeaveHandler(description7, [input2_8, input2_9, input2_10]);
addMouseEnterHandler(description8, [input7_4, input7_5, input7_6, input7_7]);
addMouseLeaveHandler(description8, [input7_4, input7_5, input7_6, input7_7]);
addMouseEnterHandler(description9, [input8_1, input8_2, input8_3, input8_4]);
addMouseLeaveHandler(description9, [input8_1, input8_2, input8_3, input8_4]);
addMouseEnterHandler(description11, [input8_7, input8_8, input8_9]);
addMouseLeaveHandler(description11, [input8_7, input8_8, input8_9]);
addMouseEnterHandler(description12, [input9_6, input9_7]);
addMouseLeaveHandler(description12, [input9_6, input9_7]);
// 세로
addMouseEnterHandler(description2, [input2_3, input3_3, input4_3, input5_3]);
addMouseLeaveHandler(description2, [input2_3, input3_3, input4_3, input5_3]);
addMouseEnterHandler(description4, [input5_4, input6_4, input7_4, input8_4]);
addMouseLeaveHandler(description4, [input5_4, input6_4, input7_4, input8_4]);
addMouseEnterHandler(description10, [input7_7, input8_7, input9_7]);
addMouseLeaveHandler(description10, [input7_7, input8_7, input9_7]);
addMouseEnterHandler(description13, [input8_9, input9_9, input10_9]);
addMouseLeaveHandler(description13, [input8_9, input9_9, input10_9]);

// 제이쿼리
$(function () {
  {
    //게임창 숨기기 and 다시 띄우기
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

  //smallNumber 글자 focus 시 색상 변경
  $(".crossword_container input[type=text]")
    .on("focus", function () {
      $(this).parent($(".smallNumber::after")).css({ color: "#fff" });
    })
    .on("blur", function () {
      $(this).parent($(".smallNumber::after")).css({ color: "#000" });
    });
});
