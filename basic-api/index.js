import express from 'express';

const app = express();
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

    // 1. 휴대폰번호 자릿수 맞는지 확인하기(10~11자리)
    check
    // 2. 핸드폰 토큰 6자리 만들기

    // 3. 핸드폰번호에 토큰 전송하기
    const myPhone = req.body.qqq;
})

app.listen(3000,()=>{
    console.log("백엔드 API 서버가 커졌어요")
})
