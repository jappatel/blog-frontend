const nbaData = [
    {
      id: "1",
      name: "Categories ",
      children: [
        {
          id: "2",
          name: "CatA",
          children: [
            {
              id: "3",
              name: "child of A",
              children: [
                {
                  id: "4",
                  name: "Atlantic Division",
                  children: [
                    {
                      id: "5",
                      name: "Boston Celtics",
                      children: [
                        {
                          id: "6",
                          name: "Players",
                          children: [
                            {
                              id: "7",
                              name: "Jayson Tatum"
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: "8",
          name: "CatB",
          children: [
            {
              id: "9",
              name: "child of B",
              children: [
                {
                  id: "10",
                  name: "Statistics",
                  children: [
                    {
                      id: "11",
                      name: "2020-2021",
                      children: [
                        {
                          id: "12",
                          name: "Points",
                          children: [
                            {
                              id: "13",
                              name: "25.8 PPG"
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: "14",
          name: "CatC",
          children: [
            {
              id: "15",
              name: "child of c",
              children: [
                {
                  id: "16",
                  name: "2020",
                  children: [
                    {
                      id: "17",
                      name: "Giannis Antetokounmpo",
                      children: [
                        {
                          id: "18",
                          name: "Team",
                          children: [
                            {
                              id: "19",
                              name: "Milwaukee Buks"
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
            id:"101",
            name:"catD"
        }
      ]
    }
  ];
  
  export function fetchData() {
    return new Promise((resolve) => {
      setTimeout(resolve, 100, nbaData);
    });
  }