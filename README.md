# profile-velog

**벨로그(Velog) 최신 글의 제목과 일자를 간단하게 보여줍니다.**



스크래핑을 배우는 김에 직접 만들어 봤습니다.

# 사용 방법 (How to use)

{id}에 사용하는 벨로그 ID를 넣어주시면 됩니다.

seq가 0이면 제일 최신글을 가져오고, 값이 오를수록 그 다음 최신글을 가져옵니다.

## 링크

```
[![profile-velog-1](https://profile-velog.vercel.app/api?id={id}&seq=0)](https://velog.io/@{id}) 
```

[![profile-velog-1](https://profile-velog.vercel.app/api?id=fpshtmxm36&seq=0)](https://velog.io/@fpshtmxm36) 

## 이미지

```
<picture>
  <img src="https://profile-velog.vercel.app/api?id=fpshtmxm36&seq=1"/>
</picture>
```

<picture>
  <img src="https://profile-velog.vercel.app/api?id=fpshtmxm36&seq=1"/>
</picture>


# 원리

입력한 벨로그 계정의 전체 글 화면에서 글 목록을 스크래핑해서 보여주는 방식입니다.
