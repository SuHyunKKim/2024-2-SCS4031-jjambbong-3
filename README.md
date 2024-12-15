# 🍊당신의 제주도 여행을 탐라, 탐나와 함께.
![Group 64746](https://github.com/user-attachments/assets/c1597f72-1208-46fd-aca1-7857fe7dbd13)



## 목차
[1. 팀원](#-🤝-팀원)<br>
[2. 프로젝트 소개](#-프로젝트-소개)<br>
&nbsp;&nbsp;&nbsp;&nbsp;[2.1. 탐라, 탐나](#LLM-기반-제주도-여행-계획-추천-서비스-탐라,-탐나-)<br>
&nbsp;&nbsp;&nbsp;&nbsp;[2.2. 주요 화면 구성](#2.1.-주요-화면-구성)<br>
&nbsp;&nbsp;&nbsp;&nbsp;[2.3. 프로젝트 구조](#-프로젝트-구조)<br>
&nbsp;&nbsp;&nbsp;&nbsp;[2.4. 기술 스택](#2.3.-기술-스택)<br>
[3. 협업 규칙](#3.-협업-규칙)<br>
[4. 시작 가이드](#4.-시작-가이드)<br>
[5. 추가 자료](#5.-추가-자료)<br>
<br><br>


## 🤝 팀원
|<img src="https://avatars.githubusercontent.com/u/144208568?v=4" width="150" height="150"/>|<img src="https://avatars.githubusercontent.com/u/155754445?v=4" width="150" height="150"/>|<img src="https://avatars.githubusercontent.com/u/162420581?v=4" width="150" height="150"/>|<img src="https://avatars.githubusercontent.com/u/144078388?v=4" width="150" height="150"/>|
|:-:|:-:|:-:|:-:|
|김수현[@SuHyunKKim](https://github.com/SuHyunKKim) |서가은[@gaaaani](https://github.com/gaaaani)|이현종[@HyunJong00](https://github.com/HyunJong00)|조예림[@YeRimmm-Cho](https://github.com/YeRimmm-Cho)|
|백엔드 |백엔드 |프론트엔드 |프론트엔드 |


구분 | 성명 | 학번 | 소속학과 | 연계전공
------|-------|-------|-------|-------
팀장 | 김수현 | 2019112426 | 산업시스템공학과 | 융합소프트웨어      
팀원 | 서가은 | 2021110261 | 통계학과 | 융합소프트웨어      
팀원 | 이현종 | 2019111655 | 바이오환경과학과 | 융합소프트웨어 
팀원 | 조예림 | 2020111500 | 회계학과 | 융합소프트웨어 

#### Mentor
- 이준희 멘토님 (삼성리서치)

<br><br>



## 🍊 프로젝트 소개

<h3 id="LLM-기반-제주도-여행-계획-추천-서비스-탐라,-탐나-">🍊 LLM 기반 제주도 여행 계획 추천 서비스 "탐라, 탐나"</h3>
- LLM과 RAG를 결하여 제주도를 여행하는 사용자들이 개인의 취향과 필요에 맞춘 여행 계획을 쉽게 세우고 실행할 수 있도록 돕는 플랫폼 개발<br>

### 🍊 개발 동기 및 목표
#### 1) 개발 동기
<table>
  <tr>
    <th align="center"><img src="https://github.com/user-attachments/assets/4f40867f-94c6-4b0e-b3e1-debffaede55f" alt="사용자 초기 입력 화면" width="400"></th>
    <th align="center"><img src="https://github.com/user-attachments/assets/0b9ab0a7-14a8-4731-844a-bde95aa6dc89" alt="사용자 초기 입력 화면" width="400"></th>
  </tr>
  <tr>
    <td><center>컨슈머 인사이트 여행 도표</td>
    <td><center>관광 트랜드 평가</td>
  </tr>
</table>

1. 여행 트렌드의 변화
- 코로나 엔데믹 선언 이후 여행 산업이 회복세에 접어들며 국내 여행 수요는 팬데믹 이전 수준을 초과.
- 현대인들은 개성을 중시하며 자신만의 독특한 경험을 찾는 여행 경향이 강화.
- 현대 관광 트렌드는 소확행, 비일상 여행, 경험 소비 등 다양하게 세분화.
2. 기존 여행 플랫폼의 한계
- 사용자는 여행 정보를 얻기 위해 많은 시간과 노력을 투자해야 하며, 기존 플랫폼은 주로 패키지 중심으로 운영.
- 개인의 선호도와 요구를 충분히 반영하지 못해 개별화된 맞춤형 여행 계획 제공에 한계가 존재.
3. LLM 기술의 도입 필요성
- LLM은 방대한 데이터 학습을 통해 자연어를 이해하고 실시간 맞춤형 여행 일정을 생성 가능.
- 사용자 요구를 파악해 개인화된 여행 경험을 제공하며, 실시간 피드백과 선호도를 반영.
- 여행 후기 자동 생성 및 커뮤니티 공유를 통해 신뢰성 있는 정보 교환 지원.<br>



#### 2) 개발 목표 
- 사용자 중심의 맞춤형 여행 일정 추천 서비스 제공
- 여행 일정 관리의 편의성 제공
- 최신 데이터와 LLM의 결합으로 신뢰도 강화<br>

### 🍊 선행 기술 분석 및 차별점
#### 1) 선행 기술 분석
1. 여행 일정 관리 어플 ‘트리플’의 ‘AI 일정 추천’ 서비스
<기능 개요>
 - 여행지, 여행 기간, 여행 스타일 등의 라벨을 제공하여 사용자가 선택한 라벨을 기반으로 AI가 맞춤형 여행 일정을 자동으로 생성해준다.
<특징 및 한계점>
 - 사용자가 선택한 라벨에 따라 AI가 단일 일정을 생성한다.
 - 추천된 일정은 사용자가 편집할 수 있으며 이를 본인의 일정으로 저장할 수 있다.
 - 사용자가 선택한 라벨에 따라 AI가 단일 일정을 제시할 뿐, 실시간으로 요구 사항을 추가하거나 일정을 수정하는 대화형 상호작용이 불가능하다.
 - 일정이 마음에 들지 않을 경우 사용자가 직접 일정을 수정하거나 다시 처음부터 라벨을 선택해야하는 불편함이 존재한다.
 - 여행 일정과 연계된 숙소나 다른 여행 관련 상품에 대한 추가적인 정보나 대체 옵션이제공되지만 광고와 마케팅으로 인한 추천이 이루어지기도 한다.
2. 마이리얼트립의 ‘AI 여행 플래너 ’ 서비스
<기능 개요>
 - 챗지피티 기반의 AI 여행 플래너를 제공
< 특징 및 한계점>
 - 마이리얼트립이 보유한 데이터베이스를 활용하여, 사용자의 요청에 맞춘 여행 일정과 여행 관련 상품을 추천한다.
 - 사용자가 추천받은 일정 내에서 숙소, 액티비티, 투어 등을 예약할 수 있는 통합된 서비스를 제공한다.
 - GPT 기반 답변이 영어에서 번역되면서 번역 품질이 매끄럽지 않고 어색한 표현이 많고 국내 여행지에 대해서는 다소 미비한 답변을 제공하는 경우가 있다.
 - 현재 해당 서비스는 웹에서는 사용이 불가능하고 앱에서만 사용 가능 하지만 현재 서비스가 중단된 것으로 보인다.
3. AI 기반 여행 쇼츠 플랫폼인 viiv
 <기능 개요>
 - 질문형 자연어 입력 방식을 통해 여행 일정을 짧은 비디오 형식으로 시각화하여 제공한다.
 <특징 및 한계점>
 - 날짜, 도시, 인원, 여행 테마 등에 대한 정해진 질문에 사용자가 답변을 입력하면, AI가 그 정보를 바탕으로 단일 여행 일정을 생성해준다.
 - 짧고 직관적인 쇼츠 형식으로 시각적 콘텐츠를 통해 일정이 제공된다.
 - 일정 추천이 단일 일정에 한정되며, 추가적 상품 추천이나 선택의 다양성이 부족하다.
 - 질문형 자연어 입력 방식은 사용자가 정해진 질문에 답하는 방식으로, 상호작용의 깊이가 제한적이다. 사용자는 AI가 제시하는 질문에만 답할 수 있으며, 그 외의 추가적인 요구 사항이나 세부 수정 사항을 즉각 반영하기 어렵다.
#### 2) 차별점
<div>
<center>

기능 |트리플 | 마이리얼트립 | viiv | **탐라, 탐나**
-----|-----|-----|-----|-----
실시간 상호작용 | <center>X | <center>△ | <center>X | <center>O
개인 성향 반영 정도 | <center>△ | <center>X | <center>X | <center>O
일정 저장 및 확인 | <center>O | <center>O | <center>O | <center>O

</div>

1. 실시간 상호작용 및 일정 수정
대화형 LLM 인터페이스를 통해 사용자는 여행 일정 추천을 실시간으로 받고, 즉시 수정하거나 추가적인 요구 사항을 반영할 수 있다. 여행 계획을 수립하면서 발생하는 다양한 변수에 맞춰 실시간 피드백을 제공하며, 사용자의 요청에 따라 유연한 여행 계획이 가능하다.
1. 개인 성향 반영 정도
대화가 거듭될수록 사용자의 자세한 요구를 파악하게 되며, 이를 기반으로 매번 더 정교하고 개인화된 맞춤형 일정을 추천할 수 있다. 또한, 실시간 피드백을 반영해 사용자 경험을 최적화하고, 이를 통해 사용자에게 더욱 개인화된 여행 경험을 제공할 수 있다.
1. 마이페이지 기능
사용자들이 LLM과 대화하며 생성한 여행 계획을 저장하고 마이페이지에서 언제든지 다시 확인할 수 있도록 지원한다. 단순히 일정을 생성하고 끝나는 것이 아니라, 계획을 저장하고 보관함으로써 사용자들이 자신의 여행 기록을 관리하고, 이후에도 참고할 수 있다.



### 🍊 주요 기능 및 핵심기술
- **사용자 맞춤형 여행 추천**
  - 프롬프트 엔지니어링을 통한 "여행 계획 에이전트" 개발
  - 사용자가 입력한 여행 정보(여행 기간, 동반자, 선호 테마 등)를 바탕으로 페르소나가 부여된 LLM이 여행 일정을 추천
  - 실시간 대화형 인터페이스를 통해 추천받은 일정 수정 및 상호작용 가능<br><br>
- **RAG(Retrieval-Augmented Generation) 기반 장소 데이터 활용**
  - 크롤링한 데이터를 기반으로 한 최신 장소 정보 제공
  - 수집한 데이터를 벡터화하고, 데이터의 코사인 유사도를 바탕으로 입력 정보와 유사도를 판별
  - RAG 기술을 사용하여 데이터베이스에서 관련 정보를 검색하고 LLM이 자연어로 여행 일정 생성<br><br>

- **세부 일정 및 경로 생성**
  - 여행 일정 추천 화면의 좌측에서 추천 일자별 여행 일정 확인 가능
  - 추천된 여행지에 대한 경로를 지도로 확인 가능
  - 여행지 사이사이에 대한 경로를 클릭 한번으로 카카오맵을 통해 확인 가능<br><br>

- **여행 일정 저장 및 관리**
  - 생성된 여행 일정을 사용자가 저장할 수 있는 기능 지원
  - 저장된 일정을 사용자가 언제든 다시 확인 가능<br><br>


<h2 id="2.1.-주요-화면-구성">🖥️ 주요 화면 구성</h2>
<table>
  <tr>
    <th>사용자 초기 입력 화면</th>
    <th>일정 추천 화면</th>
  </tr>
  <tr>
    <td align="center"><img src="https://github.com/user-attachments/assets/ff3d1b71-f28a-4883-9961-9fe1d18addc5" alt="사용자 초기 입력 화면" width="400"></td>
    <td align="center"><img src="https://github.com/user-attachments/assets/5177b7ce-d49d-4f64-8788-85fe0a61e877" alt="일정 추천 화면" width="400"></td>
  </tr>
  <tr>
    <th>상세 일정 화면</th>
    <th>길찾기 화면</th>
  </tr>
  <tr>
    <td align="center"><img src="https://github.com/user-attachments/assets/477f37ee-7fe3-4bfc-9fa8-155027865a08" alt="상세 일정 화면" width="400"></td>
    <td align="center"><img src="https://github.com/user-attachments/assets/61fce3c3-f302-44e9-9ff4-37d417dd4710" alt="길찾기 화면" width="400"></td>
  </tr>
    <tr>
    <th>일정 확정 화면</th>
    <th>마이페이지 일정 목록 화면</th>
  </tr>
  <tr>
    <td align="center"><img src="https://github.com/user-attachments/assets/6d735b02-6c10-4c21-9162-f55764198fff" alt="일정 확정 화면" width="300"></td>
    <td align="center"><img src="https://github.com/user-attachments/assets/44de33be-60f4-4a68-b12b-756a8a2212fe" alt=마이페이지 일정 목록 화면" width="300"></td>
  </tr>
</table>

<br>

#### ✔️시연 영상 링크
🔗 [**시연 동영상 링크**](https://youtu.be/xXba5srjkrQ)

<div align="right">

[목차로](#목차)

</div>
<br>

## 📂 프로젝트 구조
### ✔️시스템 구조
![image](https://github.com/user-attachments/assets/7b8e7652-2810-4854-ab49-cd8077342166)
#### [프론트엔드]
- 리엑트로 구현하였음
#### [백엔드]
- 스프링 부트: 플랫폼 데이터 관리 관련 기능 개발
- 플라스크: 여행 계획 추천 에이전트 관련 기능 개발, Chatgpt와 랭체인, 파인콘을 결합하였음

### ✔️Back-end
```
2024-2-SCS4031-jjambbong-3
├── agentPersona           # LLM 모델 디렉토리
│   ├── tamtam             # 프롬프트 템플릿, ai api, 실험 폴더
│   ├── venv               # 이 루트에 가상환경 생성
│   ├── app4.py            # 메인 flask 어플리케이션
│   ├── requirements.txt
│   ├── .env
├── server
│   ├── src
│   │   ├── main
│   │   │   ├── java.com.capstone.server  # 스프링부트 모듈 파일 폴더
│   │   │   ├── resources  # 어플리케이션 properties
│   ├── build.gradle       # gradle 빌드 파일
├── data
│   ├── testdb.sqlite      # 프로젝트 DB
```
### ✔️Front-end
```
frontend
├── node_modules
├── public
│   ├── mockdata
│   ├── favicon.ico
│   ├── index.html
│   ├── logo.svg
│   ├── manifest.json
├── src
│   ├── api             # API 연결 코드 모음
│   ├── assets          # 사용 이미지 및 아이콘 모음
│   │   ├── fonts       # 사용 폰트
│   │   ├── images
│   │   ├── logo.svg
│   ├── components		# 재사용 가능 컴포넌트 모음
│   ├── pages	        # 페이지 모음
│   ├── App.js
│   ├── index.js
│   ├── setupProxy.js
│   ├── url.txt
├── .gitignore
├── package-lock.json
├── package.json
├── yarn.lock
```
<br>
<div align="right">

[목차로](#목차)

</div>
<br>

<h2 id="2.3.-기술-스택">🛠️ 기술 스택</h2>
<div style="display:flex; flex-direction:column; align-items:flex-start;">
    <!-- Frontend -->
    <p><strong>Frontend</strong></p>
    <div>
      <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black">
      <img src="https://img.shields.io/badge/CSS Modules-000000?style=for-the-badge&logo=css3&logoColor=white">
      <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
      <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
      <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white">
      <img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white">
      <img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white">
      <img src="https://img.shields.io/badge/react_router-CA4245?style=for-the-badge&logo=react-router&logoColor=white">
      <img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white">
    </div>
    <!-- Backend -->
    <p><strong>Backend</strong></p>
    <div>
      <img src="https://img.shields.io/badge/Spring Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white">
      <img src="https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white">
      <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white">
      <img src="https://img.shields.io/badge/venv-4CAF50?style=for-the-badge&logo=python&logoColor=white">
      <img src="https://img.shields.io/badge/LangChain-1C3C3C?style=for-the-badge&logo=langchain&logoColor=white">
      <img src="https://img.shields.io/badge/Pinecone-0093E9?style=for-the-badge&logoColor=white">
      <img src="https://img.shields.io/badge/Java-000000?style=for-the-badge&logo=openjdk&logoColor=white">
    </div>
    <!-- Server -->
    <p><strong>Server</strong></p>
    <div>
      <img src="https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white">
      <img src="https://img.shields.io/badge/Gunicorn-499848?style=for-the-badge&logo=gunicorn&logoColor=white">
      <img src="https://img.shields.io/badge/aws ec2-FF9900?style=for-the-badge&logo=amazon ec2&logoColor=white">
      <img src="https://img.shields.io/badge/aws route53-8C4FFF?style=for-the-badge&logo=amazonroute53&logoColor=white">
      <img src="https://img.shields.io/badge/AWS ELB-8C4FFF?style=for-the-badge&logo=awselasticloadbalancing&logoColor=white">
      <img src="https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazonwebservices&logoColor=white">
    </div>
    <!-- Database -->
    <p><strong>Database</strong></p>
    <div>
      <img src="https://img.shields.io/badge/Amazon RDS-527FFF?style=for-the-badge&logo=amazonrds&logoColor=white">
      <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white">
      <img src="https://img.shields.io/badge/MySQL Workbench-4479A1?style=for-the-badge&logo=mysql&logoColor=white">
    </div>
    <!-- Development Tools -->
    <p><strong>Development Tools</strong></p>
    <div>
      <img src="https://img.shields.io/badge/Visual Studio Code-0078d7?style=for-the-badge&logo=visual studio code&logoColor=white">
      <img src="https://img.shields.io/badge/IntelliJ IDEA-000000?style=for-the-badge&logo=intellijidea&logoColor=white">
      <img src="https://img.shields.io/badge/google colab-F9AB00?style=for-the-badge&logo=googlecolab&logoColor=white">
    </div>
    <!-- Communications -->
    <p><strong>Communications</strong></p>
    <div>
      <img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white">
      <img src="https://img.shields.io/badge/Google Meet-34A853?style=for-the-badge&logo=google-meet&logoColor=white">
      <img src="https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white">
      <img src="https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=slack&logoColor=white">
    </div>
    <!-- Communications -->
    <p><strong>Collaborations</strong></p>
    <div>
      <img src="https://img.shields.io/badge/KakaoMap API-FFCD00?style=for-the-badge&logo=kakao&logoColor=black">
      <img src="https://img.shields.io/badge/Google Maps API-4285F4?style=for-the-badge&logo=google-maps&logoColor=white">
      <img src="https://img.shields.io/badge/Google Image-4285F4?style=for-the-badge&logo=google&logoColor=white">
    </div>
    <!-- Version Control -->
    <p><strong>Version Control</strong></p>
    <div>
      <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white">
      <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white">
    </div>
</div>
<br>
<div align="right">

[목차로](#목차)
</div>


<h2 id="3.-협업-규칙">❗협업 규칙</h2>

### 🍊Branch 규칙
- 메인 브랜치와 기능별 브랜치를 구분하여 사용
- `main`: 배포 가능한 상태의 코드만을 관리하는 브랜치
- `[#기능이슈번호]-feat-[#파트]-[#기능명]`: 파트와 기능별로 브랜치를 생성하여 작업</br>
  예) `15-feat-BE-agentpersona`

### 🍊commit 규칙
- 커밋 메시지는 다음과 같은 형식으로 작성
  ```
  convention:[#파트] 커밋메시지
  예) feat:[BE] 로그인 API 구현
  ```
- 깃 컨벤션</br>
  - `feat`: 새로운 기능 추가
  - `fix`: 버그 수정
  - `docs`: 문서 수정
  - `style`: 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우
  - `test`: 테스트 코드, 리팩토링 테스트 코드 추가
  - `design`: 디자인 관련 수정
  - `refactor`: 코드 리팩토링
  - `remove`: 파일 또는 코드 삭제
  - `rename`: 파일 또는 코드명 변경

### 🍊PR 규칙
- 템플릿을 사용하여 PR을 작성: [PR 템플릿 바로가기](https://github.com/CSID-DGU/2024-2-SCS4031-jjambbong-3/blob/main/.github/pull_request_template.md)
- 기능 이슈번호에 따라 PR을 상세하게 작성하도록 하였음

### 🍊Issue 규칙
- 템플릿을 사용하여 Issue를 작성: [Issue 템플릿 바로가기](https://github.com/CSID-DGU/2024-2-SCS4031-jjambbong-3/tree/main/.github/ISSUE_TEMPLATE)
- PR에 해당하는 이슈번호를 작성하여 PR과 이슈를 연결
<br>
<div align="right">

[목차로](#목차)

</div>

<h2 id="4.-시작-가이드">📕 시작 가이드</h2>

### Requirements
로컬 환경에서 빌드하고 실행하려면 다음이 필요함:
```
* Intellij - for Springboot
* Ngrok
* Front, Back .env 파일 (요청시 제공)
```

### 실행 방법
- Springboot, flask, react 총 3개의 프로젝트를 실행해야함
- Intellij 상에서 리엑트와 플라스크를 위한 두개의 터미널, 총 2개를 실행해야함
![image](https://github.com/user-attachments/assets/7561f579-2957-4ae3-9e4b-abcfbbc7210e)
![image](https://github.com/user-attachments/assets/1a7f64b0-051d-47e5-8a11-5a08666fe17b)
#### 1-1. 백엔드 가상환경 생성 및 실행
```
cd ./agentPersona
python -m venv [가상환경이름]
./venv/Scripts/activate
```
#### 1.2 라이브러리 설치
```
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu
pip install -r requirements.txt --no-deps
```
#### 1.3플라스크 프로젝트 실행
```
python app4.py
```
#### 2.1 프런트 프로젝트 라이브러리 설치
```
cd ./frontend # 프로젝트 루트 디렉토리 기준
npm install
```
#### 2.2 프런트 프로젝트 실행
```
npm start
```
#### 3.1 스프링 프로젝트 실행
- server 디렉토리의 gradle 파일 빌드 및 실행<br>
![image](https://github.com/user-attachments/assets/43a6f66f-6261-41ce-ae8b-b2b629e7a409)
![image](https://github.com/user-attachments/assets/e4f21c20-9ec0-49be-b108-27d3ca2b674e)

#### 4. 구체적인 실행 방법 링크
(작성예정)

<div align="right">

[목차로](#목차)

</div>

<h2 id="5.-추가-자료">📑 추가 자료</h2>

## 추가자료
### 프로젝트 관리
- 회의록 바로가기: [노션 회의록 바로가기](https://meadow-cast-ab6.notion.site/15c2184fcc7f8017a4c1d2e5902bbcba?v=15c2184fcc7f81dc94db000c014875ba&pvs=4)</br>
- 프로젝트 일정 관리: [간트차트 바로가기](https://docs.google.com/spreadsheets/d/1pmHWCLUkOmYGtPjWniW8xUe0MbYlfN0K/edit?gid=1439925983#gid=1439925983)



### 발표자료 및 계획서와 보고서
- 수행계획서: [수행계획서 바로보기](https://github.com/SuHyunKKim/2024-2-SCS4031-jjambbong-3/blob/main/Docs/%EC%88%98%ED%96%89%EA%B3%84%ED%9A%8D%EC%84%9C_S3_%EC%A7%AC%EB%BD%95.pdf)
- 최종보고서: [최종보고서 바로보기](
- 제안발표: [제안발표자료 바로보기](https://github.com/SuHyunKKim/2024-2-SCS4031-jjambbong-3/blob/main/Docs/%EC%A0%9C%EC%95%88%EB%B0%9C%ED%91%9C_S3_%EC%A7%AC%EB%BD%95.pdf)
- 중간발표: [중간발표자료 바로보기](https://github.com/SuHyunKKim/2024-2-SCS4031-jjambbong-3/blob/main/Docs/%EC%A4%91%EA%B0%84%EB%B0%9C%ED%91%9C_S3_%EC%A7%AC%EB%BD%95.pdf)
- 최종발표: [최종발표자료 바로보기](https://github.com/SuHyunKKim/2024-2-SCS4031-jjambbong-3/blob/main/Docs/%EC%B5%9C%EC%A2%85%EB%B0%9C%ED%91%9C_S3_%EC%A7%AC%EB%BD%95.pdf)
- 특허명세서: [특허명세서 바로보기](

### 프로젝트 진행 관련 자료
- 기능명세서: [기능명세서 바로가기](https://meadow-cast-ab6.notion.site/15c2184fcc7f8064af2bcdaf2561bf32?pvs=4)
- API 명세서: [API 명세서 바로가기](https://meadow-cast-ab6.notion.site/API-4f8a75307f27427297e140102ffc0222?pvs=4)


<div align="right">

[목차로](#목차)

</div>
