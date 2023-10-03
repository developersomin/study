export function checkPhone(phoneNumber) {
    //early-exit 일찍 에러를 만나 종료 시키는 방법
    if (phoneNumber.length < 10 || phoneNumber.length > 11) {
        console.log("에러발생 핸드폰 번호 제대로 입력해주세요");
        return false;
    } else{
        return true;
    }
}

export function getToken() {
    return String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
}

export function sendTokenToSMS(phoneNumber,myToken) {
    console.log(`${phoneNumber} 번호로  인증번호: ${myToken} 을 전송합니다.`);
}