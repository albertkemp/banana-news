import { useState } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import { useContext } from 'react'
import { useImperativeHandle } from 'react'
import { forwardRef } from 'react'
import { createContext } from 'react';
import './App.css'
import { start20TPSLoop, tick } from './minecraftEngine.js'
import { __default__ } from './default.js'
import arm from '/steve_arm.png'
import head from '/steve_head.png'
import body from '/steve.png'
import leg from '/steve_leg.png'
import dirt from '/dirt.jpg'
import oak_plank from '/oak_plank.jpg'
import oak_log from '/oak_log.jpg'

const pos = createContext({x: 0, y: 0})
const world = createContext([0, [], [], [], 0])

const Player = forwardRef((props, ref)=>{
  const [head_angle, setHead_angle] = useState(0);
  const [head_pos, setHead_pos] = useState({ x: 0, y: 0 });
  const [arm_angle, setArm_angle] = useState(0);
  const [arm_pos, setArm_pos] = useState({ x: 0, y: 0 });
  const [body_angle, setBody_angle] = useState(0);
  const [body_pos, setBody_pos] = useState({ x: 0, y: 0 });
  const [leg_angle, setLeg_angle] = useState(0);
  const [leg_pos, setLeg_pos] = useState({ x: 0, y: 0 });

  const update = (x, y) => {
    setLeg_pos({x: x, y: y-100})
    setBody_pos({x: x, y: y-200})
    setHead_pos({x: x-16, y: y-264})
    setArm_pos({x: x - (34 - Math.cos(68 * Math.PI / 180) * 34), y: y-200 + Math.sin(68 * Math.PI / 180) * 34})
    setArm_angle(68)
  }

  useImperativeHandle(ref, () => ({
    update
  }))

  return (
    <>
      <img src={head} className="no-drag" style={{
          position: "absolute",
          zIndex: 3, 
          left: head_pos.x,
          top: head_pos.y,
          width: "64px",
          height: "64px",
          transform: `rotate(${head_angle}deg)`
        }}/>
      <img src={arm} className="no-drag" style={{
          position: "absolute",
          zIndex: 4, 
          left: arm_pos.x,
          top: arm_pos.y,
          width: "100px",
          height: "32px",
          transform: `rotate(${arm_angle}deg)`
        }}/>
      <img src={body} className="no-drag" style={{
          position: "absolute",
          zIndex: 1, 
          left: body_pos.x,
          top: body_pos.y,
          width: "32px",
          height: "100px",
          transform: `rotate(${body_angle}deg)`
        }}/>
      <img src={leg} className="no-drag" style={{
          position: "absolute",
          zIndex: 2, 
          left: leg_pos.x,
          top: leg_pos.y,
          width: "32px",
          height: "100px",
          transform: `rotate(${leg_angle}deg)`
        }}/>
    </>
  )
})

function Block(props){
  const P_pos = useContext(pos)
  const R_pos = {x: props.x-P_pos.x, y: props.y-P_pos.y}
  let src;
  switch (props.type) {
    case "dirt":
      src = dirt;
      break;
    case "oak_plank":
      src = oak_plank;
      break;
    case "oak_log":
      src = oak_log;
      break;
    default:
      break;
  }
  return(
    <>
      <img src={src} className="no-drag" style={{
        position: "absolute", 
        left: R_pos.x*100+window.innerWidth/2,
        top: R_pos.y*100+100+window.innerHeight/2,
        width: "100px", 
        height: "100px"
      }}/>
    </>
  )
}

function Blocks(){
  //[{type: "oak_planks", key: 0, x: 1, y: 0}, {type: "oak_planks", key: 1, x: 0, y: 0}, {type: "oak_planks", key: 2, x: -1, y: 0}, {type: "oak_planks", key: 3, x: 1, y: -1}, {type: "oak_planks", key: 4, x: 0, y: -1}, {type: "oak_planks", key: 5, x: -1, y: -1}]
  const [blockRenderList, setBlockRenderList] = useState(useContext(world)[3])
  return (
    <>
      {blockRenderList.map((block) => {
        return (
          <Block key={Math.random()} type={block.type} x={block.x} y={block.y}/>
        )
      })}
    </>
  )
}

function Entity(){
  return(
    <>
      <h1>Entity</h1>
    </>
  )
}

function Entities(){
  const [entityRenderList, setEntityRenderList] = useState([{id: 0, key: 0, x: 0, y: 0, direction: 0}])
  return (
    <>
      {entityRenderList.map((entity) => {
        return (
          <Entity key={entity.key}/>
        )
      })}
    </>
  )
}

function Game(){
  const [engineList, setEngineList] = useState(__default__)
  const gateRef = useRef();
  useEffect(() => {
    gateRef.current.update(window.innerWidth/2, window.innerHeight/2)
  }, [window.innerWidth, window.innerHeight]);
  useEffect(()=>{
    const username = "h7777"
    const a = () => {
      for(let i of engineList[1]){
        if(i.username == username){
          _ = engineList[1].indexOf(i)
        }
      }
    }
  }, [])
  let playerPos = {x: 0, y: 0}
  for(let i of engineList[1]){
    if(i.username == "h7777"){
      for(let j of engineList[2]){
        if(j.uuid==i.uuid){
          playerPos = {x: j.x, y: j.y}
        }
      }
    }
  }
  start20TPSLoop(tick, setEngineList, engineList)
  return (
    <>
      <pos.Provider value={playerPos}>
        <world.Provider value={engineList}>
          <Player ref={gateRef}/>
          <Entities/>
          <Blocks/>
        </world.Provider>
      </pos.Provider>
    </>
  )
}

function App(){
  return (
    <>
      <Game/>
    </>
  )
}

export default App
