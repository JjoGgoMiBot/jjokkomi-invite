# 쪼꼬미봇 초대장

쪼꼬미 소개, Discord 봇 초대, 닉네임을 포함한 개인 초대 링크 만들기를 제공하는 정적 페이지입니다.

- 공개 주소: https://jjoggomi-bot.pages.dev/
- Discord 봇 ID: 1563724683591942204
- 기본 초대 권한: Administrator (8), scopes: bot + applications.commands
- 개인정보를 수집하는 API나 분석 스크립트가 없으며, 입력한 닉네임은 `?from=` 링크에 포함됩니다.
- 닉네임은 텍스트로만 렌더링하고 제어·방향 전환 문자를 제거합니다.
- 관리자 안내 원문과 비밀 호스트 링크는 포함하지 않습니다.

`public/`을 Cloudflare Pages에 배포합니다. 로컬 미리보기: `python -m http.server 5193 --directory public`.
