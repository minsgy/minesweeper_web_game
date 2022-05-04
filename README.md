## 💥 Web 지뢰찾기 게임

```
  🔍 지뢰찾기 게임을 웹 브라우저를 통해 즐길 수 있어요.
  🎟 타이머를 통해 게임 클리어 시간을 확인 할 수 있어요.
  🖱 랭킹 시스템을 통해서 본인의 기록을 확인 할 수 있어요.
```

## 프로젝트 실행 및 배포 URL

해당 [링크](https://minsgy-mine-sweeper.netlify.app/)를 통해 DEMO 확인이 가능합니다.

```text
  npm install
  yarn install
```

```text
  npm run start
  yarn start
```

## 기술 스택

- `TypeScript`와 `React 17`, `CRA(create-react-app)`을 활용했습니다.
- 게임 보드 관리를 `Redux(RTK)` 전역 상태 라이브러리를 활용하여 사용 할 수 있도록 설계했어요.
- `CSS-in-JS` 방식의 `styled-components`를 활용하였고, 전역 CSS 초기화를 위해 `styled-reset`을 활용했습니다.
- `craco`를 선택하여 CRA로 만들어진 프로젝트의 webpack 설정을 override해 `alias` 설정을 해주었습니다.

```json
    "@craco/craco": "^6.4.3",
    "@reduxjs/toolkit": "^1.8.1",
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "react-redux": "^8.0.1",
    "react-router-dom": "^6.2.2",
    "react-scripts": "5.0.0",
    "redux": "^4.2.0",
    "styled-components": "^5.3.5",
    "styled-reset": "^4.3.4",
    "typescript": "^4.6.3",
    "craco-alias": "^3.0.1",
```

## 구현 리스트

### 필수 구현

- [x] 남은 지뢰 개수 (초기값은 적절한 난이도로 정하시면 됩니다.
- [x] 닫혀있는 셀 8x8 (CSS 사용을 보려는 것이 아니기 때문에 최대한 간단하게 출력해주세요.)
- 닫혀있는 셀을 왼쪽 클릭하면 다음과 같이 진행됩니다.
  - [x] 지뢰인 경우: 지뢰가 표시되고 게임 종료 ⇒ 다시 시작하기 확인을 누르면 새로운 게임이 시작됨
  - [x] 지뢰가 아닌 경우: 해당 셀에 인접한 셀 중 지뢰가 있는 만큼의 숫자가 표시됨 ⇒ 숫자가 0인 경우 아무것도 표시하지 않음
- 닫혀있는 셀을 오른쪽 클릭하면 다음과 같이 진행됩니다.
  - [x] 화면에 표시된 남은 지뢰 개수에서 1이 줄어들고 클릭한 셀에 깃발이 표시됩니다.
  - [x] 남은 지뢰 개수가 0인 경우 아무일도 일어나지 않습니다.
  - [x] 깃발이 표시된 셀을 다시 오른쪽 클릭하면 깃발이 없어지고 남은 지뢰 개수가 1 늘어납니다.
  - [x] 모든 셀을 열거나 깃발로 표시하면 게임이 종료됩니다.
- [x] 다시 시작하기를 선택하여 초기화시킬 수 있습니다.

### 선택 구현

- [x] 첫 클릭 후 소요된 시간을 표시하고 최고기록을 병기
- [x] 기록이 좋은 순서로 순위표를 확인할 수 있는 인터페이스

## 구현 상세 내용

1. Redux(RTK) 전역 상태 라이브러리를 통한 Game Controller 구현

   - `redux-toolkit`를 활용하여 기존 Redux의 많은 Boilerplate 코드를 줄여서 가독성을 높였습니다.
   - action과 reducer를 전부 가진 함수인 `createSlice`를 통해 코드를 간결하게 작성 할 수 있었습니다.

   ```tsx
   export const control = createSlice({
   name: 'control',
   initialState,
   reducers: {
      startGame: (state): void => {
         ...
      },
      updateTimer: (state): void => {
         ...
      },
      openCell: (state, action): void => {
         ...
      },
      changeFlagState: (state, action): void => {
        ...
      },
   },
   });
   ```

2. DFS를 활용한 지뢰찾기 알고리즘 적용

   - 지뢰 찾기 알고리즘에 있어서 폭탄 블록을 만나기 전까지 계속해서 탐색하는 방식이였습니다.
   - 깊이 우선 탐색 알고리즘과 유사하다고 생각하여 재귀를 이용해 탐색하지 못하는 곳까지 탐색했습니다.
   - 탐색이 마무리가 된 이후부터는 `Cell` 자체에 주변 지뢰 카운팅을 하여 `Cell`텍스트로 입력해주었습니다.
   - 이를 통해 지뢰 찾기에 나오는 지뢰 카운팅 텍스트를 명시하고 원하는 범위까지 탐색할 수 있었습니다.

   ```tsx
   // @NOTE: 재귀 DFS 탐색을 활용한 열어야 할 셀을 찾는 함수
   const boardSearchExplorer = (row: number, col: number) => {
     // 해당 셀이 NOTHING이 아니라면, 재귀 탐색을 종료한다. (지뢰, 플래그, 열린 셀)
     if (board[col][row] !== CELL_FLAG.NOTHING) {
       return;
     }

     board[col][row] = getMineCount(row, col);
     openCellCount++;

     let boardData: any[] = [];

     // 탐색 중인 셀 상단 3개
     boardData = board[col - 1]
       ? boardData.concat(
           { row: row - 1, col: col - 1 },
           { row, col: col - 1 },
           { row: row + 1, col: col - 1 },
         )
       : boardData;
     // 탐색 중인 셀 양 옆 2개
     boardData = boardData.concat({ row: row - 1, col }, { row: row + 1, col });
     // 탐색 중인 셀 하단 3개
     boardData = board[col + 1]
       ? boardData.concat(
           { row: row - 1, col: col + 1 },
           { row, col: col + 1 },
           { row: row + 1, col: col + 1 },
         )
       : boardData;

     // @NOTE: 주변 셀이 모두 열려있으면, DFS방식의 탐색
     if (board[col][row] === CELL_FLAG.OPEN) {
       boardData.forEach((cell) => {
         boardSearchExplorer(cell.row, cell.col);
       });
     }
   };
   ```

   ![image](https://user-images.githubusercontent.com/60251579/166803835-da37547e-2aa6-4505-8a16-965ab5d342e0.png)


3. Cell FLAG 정의

   - 보드에서 사용하는 Cell의 Flag 값을 다음과 같이 정의해주었습니다.
   - 상수 값으로 명시하기 위해서 재할당 방지로 `as const` type assertion을 사용했습니다.
   - `열려있는, 선택되지 않은, 깃발, 지뢰, 지뢰가 든 깃발` 총 5개의 FLAG 값으로 나누어 사용했습니다.
   - 이러한 상수 값을 활용해 Cell 상태를 효율적으로 FLAG 관리를 했습니다.

   ```tsx
    // constants.ts
    export const CELL_FLAG = {
      OPEN: 0,
      NOTHING: -1,
      FLAG: -2,
      MINE: -3,
      MINE_FLAG: -4,
    } as const;

    ...

    // cell.tsx
    /* 타입 별 배경 컬러 변경 */
    background-color: ${({ cellData }) => {
      switch (cellData) {
        case CELL_FLAG.NOTHING:
        case CELL_FLAG.MINE:
          return '#FFF';
        case CELL_FLAG.FLAG:
        case CELL_FLAG.MINE_FLAG:
          return '#95E0C8';
        default:
          return '#F4D74F';
      }
    }};
   ```

4. 진행 중인 시간과 최고 기록 병기 구현 (추가 구현)

   - 매 1초마다 숫자 값을 counting하는 방식으로 `useInterval` hook을 활용하여 구현했습니다.
   - 최고 기록의 경우, 랭킹 시스템을 구현하면서 `Storage`에 저장 된 데이터을 이용하여 받아와 사용했습니다.

   ```tsx
   // Status.tsx
   useInterval(
     () => {
       dispatch(updateTimer());
     },
     isRunning ? 1000 : null,
   );

   const bestRecordTimer = rankList.reduce((prev: IRank, curr: IRank) => {
     return prev?.score < curr?.score ? prev.score : curr.score;
   }, false); // 최고 기록 가져오기 || False 반환
   ```

   ![image](https://user-images.githubusercontent.com/60251579/166640958-1d4c86d6-be52-4ab5-ace7-88b290c9d516.png)

5. Storage를 통한 랭킹 시스템 구현 (추가 구현)

   - `useLocalStorage` hook을 활용하여 저장 된 데이터를 불러와 리스트를 구현했습니다.
   - `filter`를 활용하여 오름차순 정렬을 통해 낮은 풀이 시간 순으로 구현했습니다.

   ```tsx
   // RankList.tsx
   const [rankList] = useLocalStorage(MINE_SWEEPER_RANK, []);

   // @NOTE : 시간 점수를 오름차순 정렬
   const sortedList = useMemo(
     () => rankList.sort((a: IRank, b: IRank) => a.score - b.score),
     [rankList],
   ); // 기록 가져오기 || False 반환
   ```

   ![image](https://user-images.githubusercontent.com/60251579/166674310-e2d40588-1899-43bb-8fcb-e4bc4bae70f8.png)

   ![image](https://user-images.githubusercontent.com/60251579/166801818-645b6734-6810-4fbf-b847-a17a52943008.png)

## 고민 한 점/아쉬운 점

1. React 18 사용 여부

   - React 18 버전이 나오면서 사용 할 지 말지 고민했지만, 종합적인 이유로 선택하지 않았습니다.
   - 18 버전에서 새로 제공하는 기능들에 대해 필요성을 느끼지 못했습니다. (`Suspence`, `SSR Component`)
   - 다른 라이브러리와의 호환성이 걱정되었습니다. (craco 등)
   - 결론은 위와 같은 이유로 React 17 버전을 선택하게 되었습니다.

2. 전역 상태를 꼭 써야한다면 무엇을 사용 할 지

   - 게임 보드 전체의 데이터를 다루기 위해서는 전역 상태 라이브러리를 필요로 했습니다.
   - `Recoil`, `ContextAPI`, `Redux` 등 여러 전역 상태 중 선택한 것은 Redux(RTK) 였습니다.
   - 설계를 하면서 많은 상태를 관리해야 한다고 느꼈고, 그 중 사이드이펙트가 최소화 될 만한 방법을 생각했고, Flux 패턴을 사용하는 Redux와 알맞다고 생각했습니다.
   - 오히려 Recoil은 여러 곳에서 useHook을 사용하게 된다면 데이터 흐름을 예측하기 어렵다고 느꼈고, `dev-tools`가 Redux에 비해서 추적하기도 어렵고 기능이 아쉬워 많은 상태를 확인하기 어렵다 생각했습니다.
   - ContextAPI 같은 경우 Redux와 비슷한 방식으로 쓸 수 있었습니다. 그렇지만 RTK를 활용한다면 BoilerPlate 코드도 간결해지고, Reducer와 Action을 하나로 활용 할 수 있어서 ContextAPI에 비해 코드도 간결해지면서 후에 확장성에 있어서도 유리하다고 생각해 RTK를 선택하게 되었습니다.

3. Storage와 전역 상태 관리에 의한 Rendering 이슈, persist를 쓰는 이유..

   - 게임을 마무리한 상태에서 랭킹 페이지에 입장 후, 게임 페이지로 가게 되면 상태 데이터가 변경되지 않아서 랭킹 데이터가 중복해서 들어가는 버그가 발생했었습니다.
   - `LocalStorage`와 `Redux` 상태 관리를 동시에 쓰면서 발생한 렌더링 순서 문제였습니다.
   - 이 문제로 인해서 `redux-persist`를 활용하여 redux state를 한번에 관리하려고 했지만, 관련 라이브러리가 5년 전부터 유지보수가 진행되지 않아 아쉽게 선택하지 못했습니다.
   - 다른 방식으로 문제를 해결 할 수 있었지만 persist 라이브러리를 왜 사용하는 지 알 수 있었던 트러블 슈팅 경험이였습니다.

4. 최적화 적용하기

   - `React.memo`를 활용해서 최대한으로 발생할 수 있는 불필요한 렌더링을 방지할 수 있었고, `useCallback`과 `useMemo`를 활용하여 비용을 많이 차지 하는 계산, 함수 재정의를 메모이제이션하여 활용했습니다.
   - `react-dev-tools`를 활용해 breaking point를 지정하고 발생하는 컴포넌트 비용을 파악하면서 컴포넌트 최적화를 진행했습니다.
   - 그렇지만 보드 전체를 계산하는 데 있어서, 다시 재정의를 하게 되어 렌더링이 굉장히 많이 되는데 이를 어떻게 줄일 수 있을 지 좀 더 고민이 필요했습니다.
