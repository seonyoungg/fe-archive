---
title: 제로데이 취약점 찾아서 해킹했더니 사람들 난리 난 썰
description: 7월 21일 OpenAI 능력 평가 중 발생한 해킹 사고에 대한 설명
lastUpdated: 2026-08-06
presentation:
  session: 44
  part: 2
  date: 2026-08-06
  speaker: sk-choi
  topics: [AI]
  tags: [hugging_face, ai, openai, jfrog]
---

## Hugging Face

- 오픈소스 AI 모델, 데이터셋, 웹 데모 앱을 누구나 올리고 공유할 수 있는 'AI계의 GitHub(깃허브)'이자 세계 최대의 오픈소스 AI 플랫폼
- 7월 16일, hugging face가 "보안 사고 공개"라는 블로그 게시글 작성
    
    https://huggingface.co/blog/security-incident-july-2026
    

## 범인은 OpenAI의 연구용 AI

- 7월 21일, openAI가 "OpenAI와 Hugging Face, 모델 평가 중 발생한 보안 사고에 공동 대응"라는 보안 뉴스 작성
    
    https://openai.com/ko-KR/index/hugging-face-model-evaluation-security-incident/
    

# 어떻게 했나…

- 사이버 보안 벤치마크(ExploitGym)를 통해 AI 모델의 보안 능력을 평가받는 환경(외부 인터넷과 차단된 격리)
- 모델들은 정해진 평가 문제를 해결하기 위해 시스템 내부의 제로데이 취약점을 찾아내 통제망을 뚫고 외부 인터넷에 자율적으로 접속
- 외부망에 연결된 AI 모델은 문제 해결에 필요한 단서나 답을 찾기 위해 오픈소스 플랫폼인 '허깅페이스'로 이동해 인증 정보를 탈취하고 서버를 침투/해킹

# JFrog

- 개발된 소프트웨어가 사용자에게 전달되기까지의 모든 과정(배포·저장·보안)을 자동화하는 '데브옵스(DevOps) 및 아티팩트 관리' 서비스 제공 기업
- 70% 이상의 해외 IT 기업에 서비스 제공
- 주요 제품
    - JFrog Artifactory - 범용 아티팩트/패키지 저장소
    - JFrog Xray - 보안 및 취약점 분석 도구
    - JFrog Distribution - 글로벌 대규모 배포 솔루션

# 제로데이 취약점

- 알려지지 않았거나 해결되지 않은 취약점
- AI가 발견한 제로데이 취약점
    - 프록시 서버가 외부 패키지를 요청할 때 들어오는 URL 입력을 제대로 검증하지 않는 SSRF(Server-Side Request Forgery)
    - 프록시 소프트웨어의 관리자 권한을 획득(권한 상승)하고 해당 서버 내부에서 임의의 명령어(RCE)를 실행

출처

https://www.promptarmor.com/resources/how-openai-hacked-hugging-face

https://huggingface.co/

https://jfrog.com/

https://arxiv.org/abs/2605.11086 ← 이건 넣으면 내용 커질 느낌

https://www.boho.or.kr/kr/bbs/view.do?searchCnd=&bbsId=B0000133&searchWrd=&menuNo=205023&pageIndex=1&categoryCode=&nttId=72039

https://www.youtube.com/watch?v=0b-h_PfjeRc
