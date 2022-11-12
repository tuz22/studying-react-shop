/* 리액트에서 자주 사용하는 if문 작성 패턴 */

/* 1. 컴포넌트 안에서 쓰는 if/else */
function Component() {
  if ( true ) {
    return <p>참이면 이 HTML을 출력</p>;
  } else {
    return null;
  }
}

// return() 안의 JSX 내에서는 if문 사용 불가. -> 보통 return + JSX 전체를 출력하는 if문 작성

// 이렇게 쓰면 else 생략가능
function Component() {
  if ( true ) {
    return <p>참이면 보여줄 HTML</p>;
  } 
  return null;
}

/* JSX암에서 쓰는 삼항연산자 */
// = ternary operator
// 조건문 ? 조건문 참일 때 실행할 코드 : 거짓일 때 실행할 코드
function Component() {
  return (
    <div>
      {
        1 === 1 
        ? <p>참이면 이 HTML을 출력</p>
        : null
      }
    </div>
  )
} 

// 삼항연산자는 중첩 사용 가능
function Component() {
  return (
    <div>
      {
        1 === 1
        ? <p>참이면 이 HTML을 출력</p>
        : ( 2 === 2 
            ? <p>안녕하세요!</p> 
            : <p>반가워요!</p> 
          )
      }
    </div>
  )
} 

/* 3. && 연산자로 if 역할 대신하기 */
function Component() {
  return (
    <div>
      {
        1 === 1
        ? <p>참이면 이 HTML을 출력</p>
        : null
      }
    </div>
  )
} 

// 아래 코드와 기능 동일

function Component() {
  return (
    <div>
      { 1 === 1 && <p>참이면 이 HTML을 출력</p> }
    </div>
  )
}

/* 4. switch / case 조건문 */
// if문을 중첩해서 여러개 사용할 때 씀
// 장점 : if문을 연달아 쓸 때 코드 길이를 줄임
// 단점 : 조건식란에서 변수하나만 검사 가능

// 이 코드를
function Component2(){
  var user = 'seller';
  if (user === 'seller'){
    return <h4>판매자 로그인</h4>
  } else if (user === 'customer'){
    return <h4>구매자 로그인</h4>
  } else {
    return <h4>그냥 로그인</h4>
  }
}

// switch 문법 사용해서 변경
function Component2(){
  var user = 'seller';
  switch (user){
    case 'seller' :
      return <h4>판매자 로그인</h4>
    case 'customer' :
      return <h4>구매자 로그인</h4>
    default : 
      return <h4>그냥 로그인</h4>
  }
}

/* 5. object / array 자료형 응용 */

// 이 코드를
function Component() {
  var 현재상태 = 'info';
  return (
    <div>
      {
        { 
          info : <p>상품정보</p>,
          shipping : <p>배송관련</p>,
          refund : <p>환불약관</p>
        }[현재상태]
      }

    </div>
  )
}

// 변수에 저장해서 사용하기
var 탭UI = { 
  info : <p>상품정보</p>,
  shipping : <p>배송관련</p>,
  refund : <p>환불약관</p>
}

function Component() {
  var 현재상태 = 'info';
  return (
    <div>
      {
        탭UI[현재상태]
      }
    </div>
  )
}

