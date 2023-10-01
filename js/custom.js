// crossword.html 파일 불러오기
const CROSS_HTML = "/../crossword.html";
const CROSS_ID = document.getElementById("crossword");
fetch(CROSS_HTML)
  .then((response) => response.text())
  .then((data) => {
    CROSS_ID.innerHTML = data;
  })
  .catch((error) => {
    console.log("파일을 가져오는 동안 오류가 발생했습니다,", error);
  });
// $(document).ready(function(){});

/* window.addEventListener('resize', function(){
  backgroundVisibility();
});

function backgroundVisibility(){
  let screenHeight = window.innerHeight;
  let backScreenIconBox = document.querySelectorAll('.background-icon');
  let backTaskbar = document.querySelector('.background-taskbar');

  if (screenHeight < 810) {
    console.log('hjhj');
    backScreenIconBox.style.display = 'none';
  }
} */
