# ✉️ TABTAB

![](/public/image/icon-192x192.png)

> TABTAB은 평소에 하지 못하는 표현이나, 대화를 하고 답장을 하기에 부담스러운분들을 위해 만들어졌습니다.
> 간단한 이모티콘과 텍스트로 쪽지 푸쉬알림을 보낼 수 있습니다.

**배포** : https://push-app-pi.vercel.app/

**Figma** : https://url.kr/8zk6e1

## 🚀 주요기능

---

-   FireBase FCM을 이용한 Push Notification 기능을 제공합니다.
-   오프라인 환경에서 ServiceWorker로 PushMessage를 보내 알림을 받을 수 있습니다.
-   PWA를 적용하여 웹 앱과 같은 환경으로 이용할 수 있습니다.

## 📼 Demo

---

| 📱 쪽지보내기 - 모바일 (푸쉬 알림)                                                                                          | 📱 쪽지보내기 - 모바일2 (푸쉬 알림)                                                                                         | 💻 쪽지보내기 - Web (푸쉬 알림)                                                                                         |
| --------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| <img src="https://github.com/bbung95/push-app/assets/77668478/9cff6b37-b6cb-4ad7-a8ca-a36e4de8dc7d" width="" alt="모바일"/> | <img src="https://github.com/bbung95/push-app/assets/77668478/20cbcc3e-723a-4ed1-9dd4-2d05e10fcd6e" width="" alt="모바일"/> | <img src="https://github.com/bbung95/push-app/assets/77668478/25e70a6c-a0e0-48eb-acb8-602cfd471d06" width="" alt="웹"/> |

| 🧑🏻‍💻 로그인                                                                                                                   | 🗓️ 친구추가                                                                                                                   |
| --------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| <img src="https://github.com/bbung95/push-app/assets/77668478/d75ed3f1-e4cc-490b-ae18-6a1cac93c60b" width="" alt="로그인"/> | <img src="https://github.com/bbung95/push-app/assets/77668478/dcfca139-3b31-4bd1-841c-264f1adf63be" width="" alt="친구추가"/> |

## ⚡️ Skills

---

**Frontend** `React` `Recoil` `Tailwind` `PWA`

**Backend** `Next.js` `Next-Auth`

**Library** `Firsetore Database` `Firebase Messaging`

**Infra** `Vercel`

<!-- ### FrontEnd

-   **React**
    -   대부분 axios API통신을 통해 데이터를 가져오도록 구현했습니다.
-   **SASS** 로 CSS style을 관리했습니다.
    -   각 view, component별로 구분하여 style을 관리했습니다.

### BackEnd

-   **express** 로 API서버 를 구축했습니다.
    -   view Routing과 API를 설계했습니다.
-   **MongoDB** 로 session, 음악 등 데이터를 저장했습니다.
    -   mongodb atlas로 클라우드 환경에서 DB를 관리하고 저장할 수 있도록 했습니다.

### API

-   **last.fm API** 로 앨범과 아티스트, 타이틀 정보를 가져왔습니다.
-   **Youtube API** 로 음악을 재생했습니다.

### Infra

-   **qoddi** 로 express서버를 배포하였습니다.
-   **PWA** 를 적용시켜 웹을 앱과 같은 환경에서 앱처럼 동작하도록 구현했습니다. -->

## 🤔 Trouble Shooting

**FireBase Auth**

<aside>
💡  Firebase Auth를 사용하여 로그인 기능을 구현하는 도중 Web에서는 동작하나 IOS에서는 동작하지 않는 이슈가 발생했습니다.
 
 원인으로 제공되는 함수인 **onauthstatechangedfmf**가 옵저버로 auth의 상태의 변경을 감지하는데 동작하지 않아 발생했습니다.

stackoverflow와 같은 커뮤니티와, 공식 문서를 참고하여 해결해보려고 하지 못하였고 확인해본 결과 IOS에서는 firebase auth가 동작하지 않는걸로 확인되었습니다.

다른 로그인 방법을 고민하다 검색하면서 알게된 Next.auth 찾아보게 되었습니다.
next.auth는 지금 구현하는 프로젝트에서 필요한 기능들을 제공하였고, next.js에 더 친화적인 환경을 제공하여 더 손 쉽게 로그인와 회원가입 기능을 구현할 수 있었습니다.

</aside>

**tailwind**

<aside>
💡 tailwind로 동적 스타일을 작성해야하는데 동적으로 주입된 class가 적용되지 않아 스타일이 적용안되는 이슈가 발생했습니다.

찾아보니 tailwind는 동적할당을 지원하지 않는다고 되어 있었습니다.
작성된 class명을 가지고 스타일이 적용되는데 동적으로 할당된 class명은 tailwind가 적용될때 인식되지 않아 적용이 되지 않았습니다.

object를 이용한 방법이 있어 구현해보았지만 적용되지 않아 기본 style을 이용한 동적 스타일을 구현했습니다.

tailwind는 간단하고 편리하지만 꼭 장점만 있는건 아닌거 같습니다.
빠른 mvp를 위해서하면 tailwind를 사용하고 동적으로 스타일을 주어야하는 상황에서는 styled-component나 css-module을 이용하는 편이 더 좋은거 같습니다.

</aside>

**PWA Notification**

<aside>
💡 PWA Auth 로그인시 notification permission이 정상동작하지 않는 이슈가 있었습니다.

이메일 로그인은 정상적으로 permission을 요청하고 token을 받아오는데
카카오 로그인은 permission 요청이 뜨지 않고 denied로 설정되어 token이 발급되지가 않았습니다.

확인해보니 PWA에 정책이 아닌 IOS Safari 개인정보 보안정책에 위반되는 코드였기에 동작하지 않았습니다.

<img src="https://github.com/bbung95/push-app/assets/77668478/befa76ab-3ad2-4bfe-bff9-d833322be118"/>

Apple은 개인정보에 관련되어 매우 엄격한 보안정책을 가지고 있으며 사용자에 정보 요청을 사용자의 상호작용 없이는 실행할 수 없었습니다.

kakao 로그인 같은 경우는 page가 리다이렉션이되면서 상호작용이 아닌 새 페이지로 넘어가게되어 permission 요청이 거부되었습니다.

그래서 정책과 같이 알림을 설정할 수 있는 버튼을 추가하여 동작하도록 기능을 추가하였습니다.

</aside>
