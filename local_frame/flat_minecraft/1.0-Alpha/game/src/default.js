const uuid =  crypto.randomUUID();

const __default__ = [
  123456789,
  [
    {
      username: "h7777",
      uuid: uuid, 
      inventory: {
        hotbar: [
          {
            type: "oak_log",
            ammount: 1
          }, 
          {
            type: "",
            ammount: 0
          }, 
          {
            type: "",
            ammount: 0
          }, 
          {
            type: "",
            ammount: 0
          }, 
          {
            type: "",
            ammount: 0
          }, 
          {
            type: "",
            ammount: 0
          }, 
          {
            type: "",
            ammount: 0
          }, 
          {
            type: "",
            ammount: 0
          }, 
          {
            type: "",
            ammount: 0
          }
        ]
      }, 
      action: {
        place: {
            slot: 0, 
            pos: {
                x: 1, 
                y: -1
            }
        }, 
        break: {
            slot: 0, 
            pos: {
                x: 1, 
                y: -1
            }
        }, 
        Hmotion: {
            type: "walk", 
            dir: 1
        }
      }, 
    }
  ],
  [
    {
      x: 0,
      y: 0,
      v: [100, 0],
      uuid: crypto.randomUUID(), 
      s: 0, 
      type: "arrow"
    },
    {
      x: 0,
      y: 0,
      v: [0, 0],
      uuid: uuid, 
      s: 0, 
      type: "player"
    }
  ],
  [
    {
      x: 0,
      y: -1,
      type: "oak_plank"
    }
  ],
  0
]

export { __default__ }