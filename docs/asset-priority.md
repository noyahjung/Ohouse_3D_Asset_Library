# 에셋 우선순위 기준 (Asset Priority Criteria)

> 라이브러리(랜딩 그리드)에 에셋이 노출되는 **순서의 기준** 문서다. 새 에셋을 등록할 때, 이 기준에 따라 **많이 쓰이고 중요한 에셋이 리스트 상단에 먼저** 오도록 배치한다. 코드의 `LANDING_ORDER`(3Dassetlibrary.html)가 이 순서를 그대로 따른다.

## 데이터 출처

- 1년치 Figma 컴포넌트 애널리틱스 → [asset-usage-1y.csv](asset-usage-1y.csv)
- 컬럼: `total_instances`(현재 파일 내 인스턴스 수), `inserts_1y`(최근 1년 삽입 횟수), `detaches_1y`(분리 횟수)

## 정렬 기준

1. **1순위 — `inserts_1y` (최근 1년 사용 빈도)**: "많이 쓰인다"를 가장 직접적으로 반영하는 지표.
2. 동률·보조 — `total_instances`(현재 사용 중인 인스턴스 수).
3. 사용 데이터가 없는 에셋(페이백·번개·청소도구)은 목록 끝에 둔다.

> 수치는 한 에셋의 모든 변형(View/Motion/Shadow 등)을 합산한 값이다.

## 에셋별 집계 & 순위

| 순위 | 에셋 | 라벨 | inserts_1y | total_instances | Figma 컴포넌트(합산) | 비고 |
|---|---|---|---|---|---|---|
| 1 | `pointcoin` | 포인트 코인 | 2,530 | 1,207 | P Circle Large, Motion P Circle Large, Motion Get Point P Circle |  |
| 2 | `truck3` | 배송 트럭 | 439 | 173 | Bolt Truck Large, Motion Bolt Truck Large, Bolt Truck Large View 2, Bolt Truck Large View 3, Shipping Truck Ohouse Symbol |  |
| 3 | `woncoin` | 원화 코인 | 396 | 154 | Won Sign Circle Large, Motion Won Sign Circle Large |  |
| 4 | `gift` | 선물상자 | 386 | 295 | Gift Large, Gift Large View 2, Gift Large View 3, Motion Gift Large |  |
| 5 | `box` | 이사박스 | 374 | 177 | Moving Boxes On Dolly Large, Motion Moving Boxes On Dolly Large, Glossy Blue Delivery Box Large, Glossy Blue Delivery Box Shadow Large |  |
| 6 | `basket` | 장바구니 | 351 | 170 | Cart Large, Grocery Shopping Bag Large, Motion Grocery Shopping Bag Large, Grocery Shopping Bag Large View 2, Cart Large View 2, Motion Cart Large |  |
| 7 | `clock` | 시계 | 348 | 156 | Clock Large View 2, Clock Large, Motion Clock Large |  |
| 8 | `couponEnvelope` | 10% 할인 쿠폰 | 328 | 141 | Percent Ticket On Coupon Large |  |
| 9 | `coupon` | 할인쿠폰 | 190 | 100 | Percent Ticket Large |  |
| 10 | `camera` | 카메라 | 67 | 56 | Motion Camera Large, Camera Large, Camera Large View 2, Camera Large View 3 |  |
| 11 | `packagebox` | 패키지 할인 박스 | 54 | 27 | Package Surprise Icons, Package Surprise Icons No Light, Motion Package Surprise Icons |  |
| 12 | `checkcircle` | 체크 코인 | 20 | 17 | Lucky Check Large, Motion Lucky Check Large | 추정 매핑 |
| 13 | `wifi` | 와이파이 라우터 | 9 | 0 | Glossy Wi-Fi Router Blue Large, Glossy Wi-Fi Router Blue Shadow Large |  |
| 14 | `purifier` | 정수기 | 7 | 1 | Glossy Water Purifier Gray Large, Glossy Water Purifier Gray Shadow Large |  |
| 15 | `woncoinarrow` | 원화 코인 + 페이백 | 0 | 0 | — | 사용 데이터 없음 |
| 16 | `lightning` | 오늘의딜 번개 | 0 | 0 | — | 번개는 Bolt Truck 합성으로만 존재 |
| 17 | `cleaningtool` | 청소 도구 | 0 | 0 | — | Figma 매치 없음 |

## 라이브러리 노출 순서 (LANDING_ORDER)

```
 1. pointcoin
 2. truck3
 3. woncoin
 4. gift
 5. box
 6. basket
 7. clock
 8. couponEnvelope
 9. coupon
10. camera
11. packagebox
12. checkcircle
13. wifi
14. purifier
15. woncoinarrow
16. lightning
17. cleaningtool
```

## 매핑 메모

- `pointcoin` ← **P Circle 계열**(P Circle Large / Motion / Get Point P Circle). "P"=Point 적립 코인으로 해석. 1년 삽입 2,530회로 압도적 1위.
- `checkcircle` ← **Lucky Check Large**(+Motion). 추정 매핑 — 확정 필요.
- `woncoinarrow`·`lightning`·`cleaningtool` ← Figma 사용 데이터 없음(번개는 Bolt Truck 합성으로만 존재).
- `Motion Plus Circle Sweep`(163), `Magnifying Glass Viewfinder`(검색) 등은 매핑이 모호해 집계에서 제외.

## 아직 미등록인 고빈도 에셋 (향후 등록 시 우선순위 참고)

현재 라이브러리에 없지만 사용량이 높은 컴포넌트. 등록 시 inserts_1y 기준으로 위 표에 끼워 넣는다.

| 컴포넌트(계열) | inserts_1y(합산) | 추정 용도 |
|---|---|---|
| Face Smiling Cap Headset (헤드셋) | ~846 | 고객상담·헤드셋 |
| Face Smiling Safety Helmet (안전모) | ~298 | 시공·안전 |
| Face Smiling Cap (모자 캐릭터) | ~148 | 캐릭터/안내 |
| Bell (알림 벨) | ~141 | 알림 |
| Award Star | 67 | 리뷰·보상 |
| House With Drill | 53 | 시공·인테리어 |
| Glossy Id Card | ~31 | 인증·신분 |
| Osense | ~29 | 오센스 |

---

*출처 CSV는 1년 단위 스냅샷이다. 데이터 갱신 시 이 문서와 `LANDING_ORDER`를 함께 재정렬한다.*
