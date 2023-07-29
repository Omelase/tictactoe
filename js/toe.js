let btnRef = document.querySelectorAll('.button-option');
//주어진 선택자와 일치하는 모든 요소를 배열로 리턴
let popupRef = document.querySelector('.popup');
//주어진 선택자와 일치하는 문서내 첫번째 요소 리턴
let newgameBtn = document.getElementById('new-game');
//주어진 id와 일치하는 요소를 가리키는 변수 리턴
let restartBtn = document.getElementById('restart');
let msgRef = document.getElementById('message');
//let함수는 변수 중복선언 불가하지만 재할당은 가능
//winningPattern 배열 선언
let winningPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [2, 5, 8],
  [6, 7, 8],
  [3, 4, 5],
  [1, 4, 7],
  [0, 4, 8],
  [2, 4, 6],
]; //승리패턴. 좌상단부터 우방향으로 숫자셈
//X플레이어부터 시작
//let함수쓴 이유 : 재할당이 가능하기 때문
let xTurn = true;
let count = 0;

//버튼 비활성화 함수를 정의. const는 메모리 값 바꿀 수 없음
const disableButtons = () => {
  //btnRef배열에서 주어진 파라미터를 찾아 비활성화 true
  //disabled도 내장함수(콜백함수?)
  btnRef.forEach((element) => (element.disabled = true));
  //팝업 활성화
  //popupRef 요소에서 hide클래스 속성을 제거
  popupRef.classList.remove('hide');
};
//disableButtons : 버튼이 사라지는 이벤트 리스너
//=> : function()대신 사용가능
//forEach : 함수를 배열 값 각각에 실행

//버튼 활성화 함수를 정의
const enableButtons = () => {
  //btnRef배열에서 주어진 파라미터를 찾아 비활성화 false
  btnRef.forEach((element) => {
    //버튼 안의  O, X 다 지움
    //요소의 값을 다 비움
    element.innerText = '';
    //innerText : 태그 안의 텍스트를 가져오거나 바꿈
    //innerHTML : 태그 포함한 요소 전체를 가져오거나 바꿈
    //요소 비활성화 기능을 false로
    element.disabled = false;
  });
  //팝업숨기기
  //popupRef 요소에서 hide클래스 속성을 추가
  popupRef.classList.add('hide');
};

//이길 때 함수 정의
//winFunction변수는 letter라는 파라미터를 가진 함수를 가리킨다.
const winFunction = (letter) => {
  //버튼 비활성화 함수 활성화
  disableButtons();
  //만약 letter가 X면 msgRef의 요소를 X승리로 바꾸고 아니면 O승리로 바꾼다.
  if (letter == 'X') {
    //메시지를 X 승리!라는 텍스트를 가진 요소로 바꿈
    msgRef.innerHTML = 'X 승리!';
  } else {
    //메시지를 O 승리!라는 텍스트를 가진 요소로 바꿈
    msgRef.innerHTML = 'O 승리!';
  }
};

//무승부일때 함수 정의
const drawFunction = () => {
  //버튼 비활성화 함수 활성화
  disableButtons();
  //메시지를 무승부!라는 텍스트를 가진 요소로 바꿈
  msgRef.innerHTML = '무승부!';
};

//새 게임하기
//카운트를 0으로 리셋하고 버튼보여짐
//새게임! 버튼과 다시하기 버튼을 이벤트리스너에 추가
//addEventListener함수의 문법은 첫번째 인자가 실행되면 두번째 인자가 실행되는 구조
//클릭하면 카운트를 0으로 리셋하고 버튼 활성화 함수가 활성화되는 함수
newgameBtn.addEventListener('click', () => {
  count = 0;
  enableButtons();
});
restartBtn.addEventListener('click', () => {
  count = 0;
  enableButtons();
});

//승리조건 함수 정의
const winChecker = () => {
  //모든 승리패턴 반복
  //winningPattern배열의 값 개수 (8개)만큼 반복
  for (let i of winningPattern) {
    //element1,2,3이라는 변수를 선언하고 각 변수에 btnRef배열의 n번째 인덱스 값에 채워진 텍스트 (O 또는 X)를 할당
    let [element1, element2, element3] = [
      btnRef[i[0]].innerText,
      btnRef[i[1]].innerText,
      btnRef[i[2]].innerText,
    ];
    //값이 다 채워질 경우 체크
    //같은 라인 값 3개가 빈 값이 아니고, 다 동일할 경우 승리한다.
    if (element1 != '' && (element2 != '') & (element3 != '')) {
      if (element1 == element2 && element2 == element3) {
        //3개의 버튼이 모두 같은 값이면 winFunction에 값 전달
        winFunction(element1);
      }
    }
  }
};

//클릭할 때 O 또는 X 보여줌
//btnRef배열에서 값을 찾아 각각에 실행한다.
//여기서 element는 각각의 버튼이 된다.
//forEach함수(함수1)에 주어지는 파라미터(함수2)에 들어갈 함수2를 정의
btnRef.forEach((element) => {
  //함수2가 실행되면 함수3의 파라미터(element)를 이벤트리스너에 추가
  //element 클릭하면 하단의 함수4를 실행
  element.addEventListener('click', () => {
    //xTurn이 true면 xTurn을 false로 바꾸고, element를 X로 바꾸고, 클릭된 버튼(element) 비활성화
    //아니면 요소를 O로 바꾸고, 클릭된 버튼(element) 비활성화
    if (xTurn) {
      xTurn = false;
      //X보임
      element.innerText = 'X';
      element.disabled = true;
        element.classList.remove('o-cursor');
        element.classList.add('x-cursor');
    } else {
      xTurn = true;
      //O보임
      element.innerText = 'O';
      element.disabled = true;
        element.classList.add('o-cursor');
        element.classList.remove('x-cursor');
    }
    //클릭할 때마다 카운트 증가
    count += 1;
    //카운트가 9라면(버튼 9개가 모두 채워지면) 무승부
    if (count == 9) {
      drawFunction();
    }
    //클릭할 때마다 승리조건 확인
    winChecker();
    // if (count % 2 == 0) {
    // }
    // else {
    // }
  });
});

//onload함수는 자동 실행 함수
//버튼 활성화 함수를 자동 실행한다.
window.onload = enableButtons;
