import { useState } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import { useImperativeHandle } from 'react'
import { forwardRef } from 'react'
import './App.css'
import arm from '/steve_arm.png'
import head from '/steve_head.png'
import body from '/steve.png'
import leg from '/steve_leg.png'

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
      <img src={head} style={{
          position: "absolute",
          left: head_pos.x,
          top: head_pos.y,
          width: "64px",
          height: "64px",
          transform: `rotate(${head_angle}deg)`
        }}/>
      <br/>
      <img src={arm} style={{
          position: "absolute",
          left: arm_pos.x,
          top: arm_pos.y,
          width: "100px",
          height: "32px",
          transform: `rotate(${arm_angle}deg)`
        }}/>
      <br/>
      <img src={body} style={{
          position: "absolute",
          left: body_pos.x,
          top: body_pos.y,
          width: "32px",
          height: "100px",
          transform: `rotate(${body_angle}deg)`
        }}/>
      <br/>
      <img src={leg} style={{
          position: "absolute",
          left: leg_pos.x,
          top: leg_pos.y,
          width: "32px",
          height: "100px",
          transform: `rotate(${leg_angle}deg)`
        }}/>
    </>
  )
})

function Block(type, x, y){
  return(
    <>
      <h1>Block</h1>
    </>
  )
}

function Blocks(){
  const [blockRenderList, setBlockRenderList] = useState([{type: "oak_planks", key: 0, x: 0, y: 0}])
  return (
    <>
      {blockRenderList.map((block) => {
        return (
          <Block key={block.key} type={block.type} x={block.x} y={block.y}/>
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
  const gateRef = useRef();
  useEffect(() => {
    gateRef.current.update(500, 500)
  }, []);
  return (
    <>
      <Player ref={gateRef}/>
      <Entities/>
      <Blocks/>
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
