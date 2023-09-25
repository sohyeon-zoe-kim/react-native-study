## SectionList
- 2 depth의 형태를 가진 데이터를 UI로 그릴 때 유용하다.
- 데이터 예시
    ```jsx
    [
      {
        title: "간선버스",
        data: [
          {
            type: "R",
            num: 9303,
            directionDescription: "강남역.강남역사거리",
            ...
          },
          {
            type: "R",
            num: 3600,
            directionDescription: "지하철2호선.강남역(중)",
            ...
          }
        ],
      },
      {
        title: "지선버스",
        data: [
          {
            type: "G",
            num: 3412,
            directionDescription: "강남역",
            ...
          }
        ],
      }
      ...
    ]
    ```
- 데이터 예시를 보면, 각 버스 타입별(지선버스, 간선버스 등)로 여러개의 버스를 가지고 있는 2 depth 형태의 데이터이다.
- 이때 SectionList의 renderSectionHeader 를 사용하면 해당 섹션의 title에 대한 UI를 그릴 수 있다.
- SectionHeader는 자동으로 sticky한 기능을 가진다.
