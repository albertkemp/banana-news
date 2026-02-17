import { useState } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import { useContext } from 'react'
import { useImperativeHandle } from 'react'
import { forwardRef } from 'react'
import { createContext } from 'react';
import './App.css'

const select =  createContext(()=>void(0))

function Marker(props){
  const _ = useContext(select)
  return(
    <>
      <div style={{
        position: 'absolute', 
        left: props.x*props.width-7.5+props.offset[0], 
        top: props.y*props.height-2.5+props.offset[1], 
        zIndex: 0
      }} onClick={()=>{_(props._0, props._1)}}>
        <svg height="15" width="15">
          <circle cx="7.5" cy="7.5" r="7.5" fill={props.color} />
        </svg>
      </div>
    </>
  )
}

function Dot(props){
  const _ = useContext(select)
  return(
    <>
      <div style={{
        position: 'absolute', 
        left: props.x*props.width-5+props.offset[0], 
        top: props.y*props.height-5+props.offset[1], 
        zIndex: -1
      }} onClick={()=>{_(props._0, props._1)}}>
        <svg height="10" width="10">
          <circle cx="5" cy="5" r="5" fill="black" />
        </svg>
      </div>
    </>
  )
}

function Line(props){
  return(
    <>
      <div style={{
        position: 'absolute', 
        zIndex: -2, 
        width: '100%', 
        height: '100%'
      }}>
        <svg width="100%" height="100%">
          <line
            x1={props.x1}
            y1={props.y1}
            x2={props.x2}
            y2={props.y2}
            stroke="black"
            strokeWidth="2"
          />
        </svg>
      </div>
    </>
  )
}

const Board = forwardRef((props, ref)=>{
  const [board, setBoard] = useState([[null, null, null], [null, null, null], [null, null, null], [null, null, null, null, null, null], [null, null, null], [null, null, null], [null, null, null]])
  const layout = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12, 13, 14, 15], [16, 17, 18], [19, 20, 21], [22, 23, 24]]
  const posX = [[0, 0.5, 1], [1/6, 0.5, 5/6], [1/3, 0.5, 2/3], [0, 1/6, 1/3, 2/3, 5/6, 1], [1/3, 0.5, 2/3], [1/6, 0.5, 5/6], [0, 0.5, 1]]
  const posY = [[0, 0, 0], [1/6, 1/6, 1/6], [1/3, 1/3, 1/3], [1/2, 1/2, 1/2, 1/2, 1/2, 1/2], [2/3, 2/3, 2/3], [5/6, 5/6, 5/6], [1, 1, 1]]
  const line = [[[0, 0], [0, 2]], [[1, 0], [1, 2]], [[2, 0], [2, 2]], [[3, 0], [3, 2]], [[3, 3], [3, 5]], [[4, 0], [4, 2]], [[5, 0], [5, 2]], [[6, 0], [6, 2]], [[0, 0], [6, 0]], [[1, 0], [5, 0]], [[2, 0], [4, 0]], [[0, 1], [2, 1]], [[4, 1], [6, 1]], [[2, 2], [4, 2]], [[1, 2], [5, 2]], [[0, 2], [6, 2]]]

  useImperativeHandle(ref, () => ({
    setBoard
  }))

  let items = []
  let _ = 0;
  for(let i of layout){
    for(let j of i){
      const _0 = layout.indexOf(i)
      const _1 = i.indexOf(j)
      if(board[_0][_1]==0){
        items.push(
          <Marker x={posX[_0][_1]} y={posY[_0][_1]} width={props.width} height={props.height} offset={props.offset} _0={_0} _1={_1} color={"#f7f716"} key={_+layout.at(-1).at(-1)}/>
        )
      } else if(board[_0][_1]==1){
        items.push(
          <Marker x={posX[_0][_1]} y={posY[_0][_1]} width={props.width} height={props.height} offset={props.offset} _0={_0} _1={_1} color={"#ff0000"} key={_+layout.at(-1).at(-1)}/>
        )
      }
      items.push(
        <Dot x={posX[_0][_1]} y={posY[_0][_1]} width={props.width} height={props.height} offset={props.offset} _0={_0} _1={_1} key={_}/>
      )
      _++
    }
  }
  for(let l of line){
    items.push(
      <Line x1={posX[l[0][0]][l[0][1]]*props.width+props.offset[0]} y1={posY[l[0][0]][l[0][1]]*props.height+props.offset[1]+3} x2={posX[l[1][0]][l[1][1]]*props.width+props.offset[0]} y2={posY[l[1][0]][l[1][1]]*props.height+props.offset[1]+3} key={_+layout.at(-1).at(-1)}/>
    )
    _++
  }
  return(
    <>
      {items}
    </>
  )
})

function UI(){
  return(
    <div style={{
      position: 'absolute',
      width: '100%', 
      textAlign: 'center'
    }}>
      <h2>hello</h2>
    </div>
  )
}

function Player(props){
  const token = [0, 1, 2, 3, 4, 5, 6, 7, 8]
  return(
    <>
      {props.side==0?
        <div style={{
          position: 'absolute', 
          top: (window.innerHeight-Math.min(window.innerHeight, window.innerWidth)*0.4)/4*1.5-5.5, 
          left: (window.innerWidth-175)/2, 
          display: 'flex', 
          gap: 5, 
        }}>
          {token.map((t)=>{
            return(
              <div key={t}>
                <svg height="15" width="15">
                  <circle cx="7.5" cy="7.5" r="7.5" fill={props.side==0?"#f7f716":props.side==1?"#ff0000":""} />
                </svg>
              </div>
            )
          })}
        </div>
      :
        <div style={{
          position: 'absolute', 
          bottom: (window.innerHeight-Math.min(window.innerHeight, window.innerWidth)*0.4)/8, 
          left: (window.innerWidth-175)/2, 
          display: 'flex', 
          gap: 5, 
        }}>
          {token.map((t)=>{
            return(
              <div key={t}>
                <svg height="15" width="15">
                  <circle cx="7.5" cy="7.5" r="7.5" fill={props.side==0?"#f7f716":props.side==1?"#ff0000":""} />
                </svg>
              </div>
            )
          })}
        </div>
      }
    </>
  )
}

function Hr(){
  return (
    <div style={{
      position: 'absolute', 
      top: (window.innerHeight-Math.min(window.innerHeight, window.innerWidth)*0.4)/4, 
      left: 0, 
      width: "100%", 
      height: 2, 
      backgroundColor: "#000000"
    }}></div>
  )
}

function App() {
  const board = useRef()
  let __board__ = {
    state: [[null, null, null], [null, null, null], [null, null, null], [null, null, null, null, null, null], [null, null, null], [null, null, null], [null, null, null]], 
    update: ()=>void(0), 
    turn: 0, 
    c: [9, 9], 
    s: null, 
    r: false
  }
  useEffect(() => {
    __board__.update = () => board.current.setBoard(structuredClone(__board__.state))
  }, []);
  return (
    <>
      <UI/>
      <Hr/>
      <Player side={0}/>
      <select.Provider value={(_0, _1)=>{
        if(((__board__.turn == __board__.state[_0][_1] && __board__.c[__board__.turn] == 0) || (__board__.state[_0][_1] == null && __board__.c[__board__.turn] > 0)) && !__board__.r){
          if(__board__.state[_0][_1] == null && __board__.c[__board__.turn] > 0){
            __board__.state[_0][_1] = __board__.turn
            __board__.c[__board__.turn]--
            switch(__board__.turn){
              case 0:
                __board__.turn = 1
                break;
              case 1:
                __board__.turn = 0
                break;
              default:
                break;
            }
          } else if (__board__.turn == __board__.state[_0][_1] && __board__.c[__board__.turn] == 0) {
            if(__board__.s == null){
              __board__.s = [_0, _1]
              return;
            }
          }
          __board__.update()
          return;
        } else if(__board__.state[_0][_1] == null && __board__.s != null && !__board__.r){
          const valid = [[[0, 0], [0, 1]], [[0, 0], [3, 0]], [[0, 2], [0, 1]], [[0, 1], [0, 2]], [[0, 2], [3, 5]], [[6, 2], [3, 5]], [[6, 0], [3, 0]], [[6, 1], [6, 0]], [[6, 1], [6, 2]], [[0, 1], [1, 1]], [[3, 0], [3, 1]], [[3, 5], [3, 4]], [[6, 1], [5, 1]], [[1, 1], [1, 0]], [[1, 1], [1, 2]], [[5, 1], [5, 0]], [[5, 1], [5, 2]], [[1, 0], [3, 1]], [[1, 2], [3, 4]], [[3, 1], [5, 0]], [[3, 4], [5, 2]], [[3, 1], [3, 2]], [[3, 3], [3, 4]], [[1, 1], [2, 1]], [[5, 1], [4, 1]], [[2, 1], [2, 0]], [[2, 1], [2, 2]], [[4, 1], [4, 0]], [[4, 1], [4, 2]], [[2, 0], [3, 2]], [[3, 2], [4, 0]], [[2, 2], [3, 3]], [[3, 3], [4, 2]]]
          const check = (_0, _1, __0, __1, valid) => {
            for(let i of valid){
              if(i[0][0]==_0&&i[0][1]==_1&&i[1][0]==__0&&i[1][1]==__1){
                return true;
              } else if (i[0][0]==__0&&i[0][1]==__1&&i[1][0]==_0&&i[1][1]==_1){
                return true;
              } else {}
            }
            return false;
          }

          if(check(_0, _1, __board__.s[0], __board__.s[1], valid)){
            __board__.state[__board__.s[0]][__board__.s[1]] = null
            __board__.state[_0][_1] = __board__.turn
            __board__.s = null
            const _3InARow = [[[0, 0], [0, 1], [0, 2]], [[0, 0], [3, 0], [6, 0]], [[0, 2], [3, 5], [6, 2]], [[6, 0], [6, 1], [6, 2]], [[1, 0], [1, 1], [1, 2]], [[5, 0], [5, 1], [5, 2]], [[1, 0], [3, 1], [5, 0]], [[1, 2], [3, 4], [5, 2]], [[2, 0], [2, 1], [2, 2]], [[4, 0], [4, 1], [4, 2]], [[2, 0], [3, 2], [4, 0]], [[2, 2], [3, 3], [4, 2]]]
            label:
            for(let i of _3InARow){
              for(let j of i){
                if(j[0] == _0 && j[1] == _1){
                  if(
                    __board__.state[i[0][0]][i[0][1]]==__board__.turn && 
                    __board__.state[i[1][0]][i[1][1]]==__board__.turn && 
                    __board__.state[i[2][0]][i[2][1]]==__board__.turn
                  ){
                    __board__.r = true
                    break label;
                  }
                }
              }
            }
            switch(__board__.turn){
              case 0:
                __board__.turn = 1
                break;
              case 1:
                __board__.turn = 0
                break;
              default:
                break;
            }
            __board__.update()
          }
        } else if (__board__.r){
          if(__board__.state[_0][_1]==__board__.turn){
            __board__.state[_0][_1]=null
            __board__.r = false
            __board__.update()
          }else{
            return;
          }
        }
      }}>
        <Board width={Math.min(window.innerHeight, window.innerWidth)*0.6} height={Math.min(window.innerHeight, window.innerWidth)*0.6} offset={[(window.innerWidth-Math.min(window.innerHeight, window.innerWidth)*0.6)/2, (window.innerHeight-Math.min(window.innerHeight, window.innerWidth)*0.4)/2.25]} ref={board}/>
      </select.Provider>
      <Player side={1}/>
    </>
  )
}

export default App
