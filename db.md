-- 문제 1: 테이블 생성하기
/* attendance 테이블은 중복된 데이터가 쌓이는 구조이다. 중복된 데이터는 어떤 컬럼인가?
   crew_id와 nickname 컬럼의 데이터가 중복되어 쌓입니다.
   둘 다 '크루'에 대한 정보를 담는 컬럼입니다.
*/
/* attendance 테이블에서 중복을 제거하기 위해 crew 테이블을 만들려고 한다. 어떻게 구성해 볼 수 있을까?
   attendance 테이블에 존재하는 crew_id와 nickname 컬럼을 중복 없이 조회하여, 그 값을 crew 테이블로 구성하면 됩니다.
*/

-- 크루들의 정보 추출
SELECT DISTINCT crew_id, nickname
FROM attendance;

-- Crew 테이블 생성
CREATE TABLE crew (
id INT NOT NULL,
nickname VARCHAR(50) NOT NULL,
PRIMARY KEY (id)
);

-- attendance 테이블에서 크루 정보를 추출해서 crew 테이블에 삽입
INSERT INTO crew (id, nickname)
SELECT DISTINCT crew_id, nickname
FROM attendance;


-- 문제 2: 테이블 컬럼 삭제하기
/* crew 테이블을 만들고 중복을 제거했다. attendance에서 불필요해지는 컬럼은?
   크루를 식별하기 위해 crew_id는 필요하므로, nickname 컬럼만 불필요합니다.
*/
ALTER TABLE attendance
DROP COLUMN nickname;


-- 문제 3: 외래키 설정하기
ALTER TABLE attendance
ADD CONSTRAINT fk_crew_id
FOREIGN KEY (crew_id)
REFERENCES crew (id);


-- 문제 4: 유니크 키 설정하기
ALTER TABLE crew
ADD CONSTRAINT uq_nickname
UNIQUE (nickname);


-- 문제 5: 크루 닉네임 검색하기
SELECT nickname
FROM crew
WHERE nickname like '디%';


-- 문제 6: 출석 기록 확인하기
SELECT *
FROM attendance a JOIN crew c on a.crew_id = c.id
WHERE c.nickname = '어셔' and a.attendance_date = '2025-03-06';


-- 문제 7: 누락된 출석 기록 추가
INSERT INTO attendance (crew_id, attendance_date, start_time, end_time)
SELECT id, '2025-03-06', '09:31', '18:01'
FROM crew
WHERE nickname = '어셔';


-- 문제 8: 잘못된 출석 기록 수정
UPDATE attendance a
JOIN crew c ON a.crew_id = c.id
SET a.start_time = '10:00'
WHERE c.nickname = '주니' AND a.attendance_date = '2025-03-12';


-- 문제 9: 허위 출석 기록 삭제
DELETE a
FROM attendance a JOIN crew c ON a.crew_id = c.id
WHERE a.attendance_date = '2025-03-12' AND c.nickname = '아론';


-- 문제 10: 출석 정보 조회하기
SELECT a.*, c.nickname
FROM attendance a JOIN crew c ON a.crew_id = c.id;


-- 문제 11: nickname으로 쿼리 처리하기
SELECT a.*
FROM attendance a
WHERE crew_id = (
SELECT c.id
FROM crew c
WHERE c.nickname = '검색하고 싶은 닉네임'
);


-- 문제 12: 가장 늦게 하교한 크루 찾기
SELECT c.nickname, a.end_time
FROM attendance a JOIN crew c ON a.crew_id = c.id
WHERE a.attendance_date = '2025-03-05'
ORDER BY a.end_time DESC
LIMIT 1;


-- 문제 13: 크루별로 기록된 날짜 수 조회
SELECT crew_id, count(attendance_date) AS "기록된 날짜 수"
FROM attendance
GROUP BY crew_id;


-- 문제 14: 크루별로 등교 기록이 있는(start_time IS NOT NULL) 날짜 수 조회
SELECT crew_id, count(start_time) AS "등교 기록이 있는 날짜 수"
FROM attendance
WHERE start_time IS NOT NULL
GROUP BY crew_id;


-- 문제 15: 날짜별로 등교한 크루 수 조회
SELECT attendance_date, count(crew_id) AS "등교한 크루 수"
FROM attendance
GROUP BY attendance_date;


-- 문제 16: 크루별 가장 빠른 등교 시각(MIN)과 가장 늦은 등교 시각(MAX)
SELECT crew_id, min(start_time) AS "가장 빠른 등교 시각", max(start_time) AS "가장 늦은 등교 시각"
FROM attendance
GROUP BY crew_id;
