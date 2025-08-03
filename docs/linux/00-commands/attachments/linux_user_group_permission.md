---
title: 사용자, 그룹, 권한 설정
authors: 'may54ther'
created_at: '2025-07-26'
tags: ['#CheatSheet', '#Linux']
---

## 사용자 및 그룹 관리

### 주요 시스템 파일 참고

| 파일 경로          | 설명                             |
|-------------------|----------------------------------|
| /etc/passwd       | 사용자 계정 기본 정보             |
| /etc/shadow       | 사용자 암호 정보 (암호화 저장)   |
| /etc/group        | 그룹 정보                         |
| /etc/gshadow      | 그룹 암호 정보                    |
| /etc/sudoers      | sudo 권한 사용자 정의             |

---

### 그룹 관리

- 그룹 생성
```sh
groupadd [그룹명]
```

- 그룹 삭제
```sh
groupdel [그룹명]
```

- 그룹 정보 확인
```sh
getent group [그룹명]
```

---

### 사용자 계정 관리

#### 사용자 추가

- 홈 디렉터리 없이
```sh
useradd [사용자]
```

- 홈 디렉터리 자동 생성 및 인터랙티브 설정
```sh
adduser [사용자]
```

#### 사용자 삭제

- 계정만 삭제
```sh
deluser [사용자]
```

- 계정 + 홈 디렉터리 삭제
```sh
deluser [사용자] --remove-home
```

- 계정 + 홈 + 메일 스풀 삭제
```sh
deluser [사용자] --remove-all-files
```

#### 사용자 수정

- 로그인 셸 변경
```sh
usermod -s /bin/bash [사용자]
```

- 홈 디렉터리 변경 (기존 디렉터리 이동 포함)
```sh
usermod -d /home/newhome -m [사용자]
```

- UID 변경
```sh
usermod -u 1234 [사용자]
```

- 잠금 / 잠금 해제
```sh
usermod -L [사용자]   # 계정 잠금
usermod -U [사용자]   # 계정 잠금 해제
```

---

### 사용자 비밀번호 설정

- 비밀번호 설정
```sh
passwd [사용자]
```

- 비밀번호 제거 (빈 암호 허용)
```sh
passwd -d [사용자]
```

- 만료 설정 (다음 로그인 시 변경 요구)
```sh
passwd -e [사용자]
```

---

### 그룹 설정 및 변경

- 사용자 그룹 추가 (보조 그룹)
```sh
usermod -aG [그룹] [사용자]
```

- 그룹에서 사용자 제거
```sh
gpasswd -d [사용자] [그룹]
```

- 초기 그룹 설정
```sh
usermod -g [그룹] [사용자]
```

- 현재 그룹 확인
```sh
id [사용자]
groups [사용자]
```

---

## `sudo` 권한 설정

- 사용자에게 sudo 권한 부여
```sh
usermod -aG sudo [사용자]
```

- `sudo` 그룹 확인
```sh
getent group sudo
```

- 수동 설정 (visudo 사용 권장)
```sh
visudo
```

예시 추가:
```
사용자명 ALL=(ALL:ALL) ALL
```

---

## 실전 팁 및 보안 관련

- 특정 기간 후 비활성화
```sh
chage -E 2025-12-31 [사용자]
```

- 계정 만료일 확인
```sh
chage -l [사용자]
```

- 사용자 로그인 금지 (nologin 셸 사용)
```sh
usermod -s /usr/sbin/nologin [사용자]
```

- 모든 사용자 리스트 보기
```sh
cut -d: -f1 /etc/passwd
```

---

필요에 따라 사용자 템플릿 스크립트, 비밀번호 정책 설정, `/etc/login.defs` 기반 보안 규칙도 연동 가능.
