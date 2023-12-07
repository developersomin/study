# 1. 운영체제 및 프로그램 설치
#FROM ubuntu:22.04

#RUN sudo apt install nodejs
#Run sudo npm install -g yarn

#1.운영체제 및 프로그램 설치(이미 리눅스 ,node , npm , yarn 까지 한꺼번에 다운받는 방식)
FROM node:18

#2. 내컴퓨터에 있는 폴더나 파일을 도커 컴퓨터 안에 복사하기
#RUN mkdir myfolder 아래에서 카피할때 자동으로 만들어
COPY ./package.json /myfolder/
COPY ./yarn.lock /myfolder/
WORKDIR /myfolder/
RUN yarn install

COPY . /myfolder/



#3. 도커안에서 index.js 실행시키기 RUN은 이미지화 할때 다 같이 저장되지만 cmd는 이미지화 할때 저장이 안됨
#   CMD는 저장된 컴퓨터를 실행시킬때 cmd가 실행된다. (마지막 한번만 쓸 수 있음)
CMD yarn start:dev