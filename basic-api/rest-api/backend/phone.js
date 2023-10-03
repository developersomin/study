import coolsms from 'coolsms-node-sdk';



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

const mysms = coolsms.default;

export async function sendTokenToSMS(phoneNumber,myToken) {
    const messageService = new mysms(process.env.SMS_KEY, process.env.SMS_SECRET);

    const result = await messageService.sendOne({
        to: phoneNumber,
        from: process.env.SMS_SENDER,
        text: `[소민 스터디] 안녕하세요! 요청하신 인증번호는 [${myToken}] 입니다.`
    });
    console.log(result);
}