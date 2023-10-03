import express from 'express';
import {checkPhone, getToken, sendTokenToSMS} from "./phone.js";
import swaggerUi from "swagger-ui-express";
import {openapiSpecification} from "./swagger/config.js";
const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));
app.use(express.json());


app.get('/boards', (req, res)=>{
    const result = [
        {number: 1, writer: "철수", title: "제목", contents: "내용"},
        {number: 2, writer: "영희", title: "제목1", contents: "내용1"},
        {number: 3, writer: "훈이", title: "제목2", contents: "내용2"},
    ];

    res.send(result);
});

app.post('/boards', (req, res)=>{

    console.log(req);
    console.log("--------------------------");
    console.log(req.body);

    res.send("게시물 등록에 성공");
});

app.post('/tokens/phone',(req,res)=>{

    const myPhone = req.body.phoneNumber;
    // 1. 휴대폰번호 자릿수 맞는지 확인하기(10~11자리)
    const isValid = checkPhone(myPhone);
    if(isValid === false) return;
    // 2. 핸드폰 토큰 6자리 만들기
    const myToken = getToken();
    // 3. 핸드폰번호에 토큰 전송하기
    sendTokenToSMS(myPhone, myToken);
    res.send("인증완료!!!");

})

app.listen(3000,()=>{
    console.log("백엔드 API 서버가 커졌어요")
})
