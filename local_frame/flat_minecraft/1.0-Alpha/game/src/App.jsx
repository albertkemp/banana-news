import { useState } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import { useContext } from 'react'
import { useLayoutEffect } from 'react'
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
const PosS = createContext([])
const world = createContext([0, [], [], [], 0])
const MPF = createContext(()=>void(0))
const Pdata = createContext()
const RTCContext = createContext({ channel: null, channelOpen: false });

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

const Players = props => {
  const [skinMemory, setSkinMemory] = useState({
    head: null, 
    arm: null, 
    body: null, 
    leg: null
  })
  const skinMemoryPromises = useRef({
    head: null, 
    arm: null, 
    body: null, 
    leg: null
  })
  const skinMemoryFetchURL = {
    head: head, 
    arm: arm, 
    body: body, 
    leg: leg
  }
  const fetchImg = async src => {
    const res = await fetch(src);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    return url;
  };
  for(const i in skinMemory){
    if(skinMemory[i] == null){
      skinMemoryPromises.current[i] = fetchImg(skinMemoryFetchURL[i])
    }
  }
  useEffect(() => {
    for(const i in skinMemoryPromises.current){
      if (typeof skinMemoryPromises.current[i] === "string") {
        let tmp = skinMemory
        tmp[i] = skinMemoryPromises.current[i]
        setSkinMemory(structuredClone(tmp))
        return;
      }
      skinMemoryPromises.current[i].then(url => {
        let tmp = skinMemory
        tmp[i] = url
        setSkinMemory(structuredClone(tmp))
      });
    }
  }, [skinMemoryPromises.current]);
  return (
    <>
      <img src={skinMemory.head} className="no-drag" style={{
          position: "absolute",
          zIndex: 3, 
          left: props.x-16,
          top: props.y-264,
          width: "64px",
          height: "64px",
          transform: `rotate(${0}deg)`
        }}/>
      <img src={skinMemory.arm} className="no-drag" style={{
          position: "absolute",
          zIndex: 4, 
          left: props.x - (34 - Math.cos(68 * Math.PI / 180) * 34),
          top: props.y-200 + Math.sin(68 * Math.PI / 180) * 34,
          width: "100px",
          height: "32px",
          transform: `rotate(${68}deg)`
        }}/>
      <img src={skinMemory.body} className="no-drag" style={{
          position: "absolute",
          zIndex: 1, 
          left: props.x,
          top: props.y-200,
          width: "32px",
          height: "100px",
          transform: `rotate(${0}deg)`
        }}/>
      <img src={skinMemory.leg} className="no-drag" style={{
          position: "absolute",
          zIndex: 2, 
          left: props.x,
          top: props.y-100,
          width: "32px",
          height: "100px",
          transform: `rotate(${0}deg)`
        }}/>
    </>
  )
}

function PlayersW () {
  const P_pos = useContext(pos)
  var list = []
  for(var i of useContext(PosS)){
    list.push(
      <Players x={100*(i.x-P_pos.x)+window.innerWidth/2} y={100*(-i.y+P_pos.y)+window.innerHeight/2} key={i.u}/>
    )
  }
  return (
    <>
      {list}
    </>
  )
}

function Block(props){
  const [imageURL, setImageURL] = useState(undefined)
  const P_pos = useContext(pos)
  const R_pos = {x: props.x-P_pos.x, y: -props.y+P_pos.y}
  useEffect(() => {
    if (!props.promise) return;
    if (typeof props.promise === "string") return;

    props.promise.then(url => setImageURL(url));
  }, [props.promise]);

  return(
    <>
      <img src={typeof props.promise=='string'?props.promise:imageURL} className="no-drag" style={{
        position: "absolute", 
        left: R_pos.x*100+window.innerWidth/2,
        top: R_pos.y*100-100+window.innerHeight/2,
        width: "100px", 
        height: "100px"
      }}/>
    </>
  )
}

function Blocks(){
  //[{type: "oak_planks", key: 0, x: 1, y: 0}, {type: "oak_planks", key: 1, x: 0, y: 0}, {type: "oak_planks", key: 2, x: -1, y: 0}, {type: "oak_planks", key: 3, x: 1, y: -1}, {type: "oak_planks", key: 4, x: 0, y: -1}, {type: "oak_planks", key: 5, x: -1, y: -1}]
  const [blockRenderList, setBlockRenderList] = useState(useContext(world)[3])
  const P_pos = useContext(pos)
  const memoizedImg = useRef({})
  const cacheItems = useRef([])
  const fetchImg = src => {
    return fetch(src)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok: ' + response.statusText);
        }
        return response.blob();
      })
      .then(blob => URL.createObjectURL(blob))
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        return null;
      });
  };

  return (
    <>
      {blockRenderList.map((block) => {
        if(block.x + 16 < P_pos.x || block.x - 16 > P_pos.x){
          return;
        }
        let src;
        let src_;
        switch (block.type) {
          case "dirt":
            src = dirt;
            if(memoizedImg.current[src]){
              if(cacheItems.current.includes(src)){
                src_ = src
              }else{
                src_ = memoizedImg.current[src]
              }
            }else{
              src_ = fetchImg(src)
              memoizedImg.current[src] = src_;
              (async function (){
                await src_
                performance.clearResourceTimings()
                await fetch(src);
                while (performance.getEntriesByType('resource').length === 0) {
                  await new Promise(r => setTimeout(r, 10));
                }
                performance.getEntriesByType('resource').forEach(resource => {
                  if(resource.name.includes(src)){
                    if(resource.transferSize === 0){
                      cacheItems.current.push(src)
                    }
                  }
                })
              })()
            }
            break;
          case "oak_plank":
            src = oak_plank;
            if(memoizedImg.current[src]){
              if(cacheItems.current.includes(src)){
                src_ = src
              }else{
                src_ = memoizedImg.current[src]
              }
            }else{
              src_ = fetchImg(src)
              memoizedImg.current[src] = src_;
              (async function (){
                await src_
                performance.clearResourceTimings()
                await fetch(src);
                while (performance.getEntriesByType('resource').length === 0) {
                  await new Promise(r => setTimeout(r, 10));
                }
                performance.getEntriesByType('resource').forEach(resource => {
                  if(resource.name.includes(src)){
                    if(resource.transferSize === 0){
                      cacheItems.current.push(src)
                    }
                  }
                })
              })()
            }
            break;
          case "oak_log":
            src = oak_log;
            if(memoizedImg.current[src]){
              if(cacheItems.current.includes(src)){
                src_ = src
              }else{
                src_ = memoizedImg.current[src]
              }
            }else{
              src_ = fetchImg(src)
              memoizedImg.current[src] = src_;
              (async function (){
                await src_
                performance.clearResourceTimings()
                await fetch(src);
                while (performance.getEntriesByType('resource').length === 0) {
                  await new Promise(r => setTimeout(r, 10));
                }
                performance.getEntriesByType('resource').forEach(resource => {
                  if(resource.name.includes(src)){
                    if(resource.transferSize === 0){
                      cacheItems.current.push(src)
                    }
                  }
                })
              })()
            }
            break;
          default:
            break;
        }
        return (
          <Block key={`${block.x}${block.y}`} promise={src_} x={block.x} y={block.y}/>
        )
      })}
    </>
  )
}

function Entity(){
  return(
    <></>
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

function MP(){
  const F = useContext(MPF)
  return (
    <>
      <button style={{
        position:'absolute', 
        zIndex:11
      }} className='auto-pointer' onClick={()=>{F(0, "")}}> Create offer</button>
      <button style={{
        zIndex:11
      }} onClick={()=>{F(1, "")}}> Create ans</button>
      <button style={{
        zIndex:11
      }} onClick={()=>{F(2, "")}}> connect</button>
    </>
  )
}

function Pause(){
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [windowHeight, setWindowHeight] = useState(window.innerHeight)
  const [pauseBtnWidth, setPauseBtnWidth] = useState(0)
  const [pauseScreenState, setPauseScreenState] = useState(false)
  const pauseBtnRef = useRef(null)

  useLayoutEffect(()=>{
    if(pauseBtnRef.current){
      setPauseBtnWidth(pauseBtnRef.current.getBoundingClientRect().width)
    }
  }, [])

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return(
    <>
      <button
        ref={pauseBtnRef}
        style={{
          position:'absolute', 
          zIndex:13, 
          top: 0, 
          left: windowWidth/2-pauseBtnWidth/2
        }}
        className='btn'
        onClick={()=>{
          setPauseScreenState(!pauseScreenState)
        }}
      >| |</button>
      <div
        style={{
          position: 'absolute', 
          top: 0, 
          left: 0, 
          zIndex:11, 
          display: pauseScreenState ? 'block' : 'none', 
          width: '100%', 
          height: '100%', 
          backgroundColor: '#000000', 
          opacity: 0.5
        }}
      ></div>
      <div
        style={{
          position: 'absolute', 
          top: windowHeight/2-windowHeight*0.9/2,
          left: windowWidth/2-(windowWidth*0.9<300?300:windowWidth*0.9)/2,  
          display: pauseScreenState ? 'block' : 'none', 
          zIndex: 12, 
          minWidth: 300, 
          width: '90%', 
          height: '90%', 
          backgroundColor: '#a6a6a6', 
          border: 'outset'
        }}
      ></div>
    </>
  )
}

function Click(){
  const P_pos = useContext(pos)
  const world_ = useContext(world)
  var Pointer_state = useRef(false)
  var mode = useRef(null)
  var EVENT = {}
  const PHandle = () => {
    var br = false
    console.log(mode.current)
    if(mode.current != 1&& mode.current != null){
      OL:
      for(const i of world_[3]){
        if(i.x == Math.round(P_pos.x)+Math.floor((EVENT.clientX-window.innerWidth/2)/100) && i.y == Math.round(P_pos.y)-Math.floor((EVENT.clientY-window.innerHeight/2+100)/100)){
          for(const j of world_[1]){
            if(j.username == "h7777"){
              j.action.break = {}
              j.action.break.slot = 0
              j.action.break.pos = {}
              j.action.break.pos.x = Math.round(P_pos.x)+Math.floor((EVENT.clientX-window.innerWidth/2)/100)
              j.action.break.pos.y = Math.round(P_pos.y)-Math.floor((EVENT.clientY-window.innerHeight/2+100)/100)
              mode.current = 0
              br = true
              break OL;
            }
          }
        }
      }
    }
    if(!br && mode.current != 0 && mode.current != null){
      for(const j of world_[1]){
        if(j.username == "h7777"){
          j.action.place = {}
          j.action.place.slot = 0
          j.action.place.pos = {}
          j.action.place.pos.x = Math.round(P_pos.x)+Math.floor((EVENT.clientX-window.innerWidth/2)/100)
          j.action.place.pos.y = Math.round(P_pos.y)-Math.floor((EVENT.clientY-window.innerHeight/2+100)/100)
          mode.current = 1
        }
      }
    }
    if(Pointer_state.current){
      requestAnimationFrame(PHandle)
    }
  }
  return (
    <div style={{
      position: 'absolute',
      top: 0, 
      left: 0,  
      width: '100%', 
      height: '100%', 
      zIndex: 10
    }} onPointerDown={()=>{
      EVENT = event
      if(!Pointer_state.current){
        Pointer_state.current = true;
        mode.current = -1;
        requestAnimationFrame(PHandle)
      }
    }} onPointerUp={()=>{
      EVENT = event
      mode.current = null
      Pointer_state.current = false;
    }} onPointerMove={()=>{
      EVENT = event
    }}>
    </div>
  )
}

function Game({ref}){
  const [engineList, setEngineList] = useState(__default__)
  const gateRef = useRef();
  const host = !(useContext(Pdata).offer != null && useContext(Pdata).offer != undefined);
  const RTC = useContext(RTCContext);
  //console.log(RTC.channelOpen)
  useEffect(() => {
    gateRef.current.update(window.innerWidth/2, window.innerHeight/2)
  }, [window.innerWidth, window.innerHeight]);
  useEffect(()=>{
    const username = "h7777"
    const keys = new Set();
    const update = () => {
      for(let j of keys){
        for(let i of engineList[1]){
          if(i.username == username){
            if(!host){
              //console.log(RTC.channelOpen)
              if(RTC.channelOpen){
                if(j=="KeyA" ? true : j=="KeyD" ? true : j=="ArrowRight" ? true : j=="ArrowLeft" ? true : false){
                  RTC.channel.send(`packet:Hmove:${keys.has("ShiftLeft") || keys.has("ShiftRight") ? "sneak" : keys.has("CapsLock") ? "sprint" : "walk"}:${j=="KeyA" ? -1 : j=="KeyD" ? 1 : j=="ArrowRight" ? 1 : j=="ArrowLeft" ? -1 : engineList[1][_].action.Hmotion.dir}`)
                }
                if(j=="KeyW" || j=="ArrowUp"){
                  RTC.channel.send("packet:Vmove")
                }
              }
            }else if(host){
              let _ = engineList[1].indexOf(i)
              if(engineList[1][_].action.Hmotion == undefined){
                engineList[1][_].action.Hmotion = {}
              }
              engineList[1][_].action.Hmotion.type = keys.has("ShiftLeft") || keys.has("ShiftRight") ? "sneak" : keys.has("CapsLock") ? "sprint" : "walk"
              engineList[1][_].action.Hmotion.dir = j=="KeyA" ? -1 : j=="KeyD" ? 1 : j=="ArrowRight" ? 1 : j=="ArrowLeft" ? -1 : engineList[1][_].action.Hmotion.dir;
              engineList[1][_].action.Vmotion = j=="KeyW" || engineList[1][_].action.Vmotion
            }
          }
        }
      }
    }
    window.addEventListener("keydown", (e) => {
      keys.add(e.code);
      update()
    });

    window.addEventListener("keyup", (e) => {
      keys.delete(e.code);
      update()
    });
  }, [RTC])
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
  let playersPos = []
  for(let i of engineList[1]){
    if(i.username != "h7777"){
      for(let j of engineList[2]){
        if(j.uuid==i.uuid){
          playersPos.push({x: j.x, y: j.y, u: i.username})
        }
      }
    }
  }
  
  useImperativeHandle(ref, () => {
    return {
      addPlayer(data) {
        structuredClone(engineList[1].push(data))
      }, 
      addEntity(data) {
        structuredClone(engineList[2].push(data))
      }, addAction(data, type) {
        let j = 0;
        for(let i of engineList[1]){
          if(i.username != "h7777"){
            engineList[1][j].action[type] = data
            console.log(engineList)
            structuredClone(engineList)
          }
          j++
        }
      }
    };
  }, [])
  start20TPSLoop(tick, setEngineList, engineList)

  return (
    <>
      <PosS.Provider value={playersPos}>
        <pos.Provider value={playerPos}>
          <world.Provider value={engineList}>
            <Click/>
            <Player ref={gateRef}/>
            <PlayersW/>
            <Entities/>
            <Blocks/>
          </world.Provider>
        </pos.Provider>
      </PosS.Provider>
    </>
  )
}

function App(){
  const [RTCChannelState, setRTCChannelState] = useState(false)
  const [RTCChannel, setRTCChannel] = useState(null)
  const data = useRef(JSON.parse(sessionStorage.getItem("pageData")));
  sessionStorage.removeItem("pageData");
  /*const data = {
    offer: null
  }
  if(data.current==null){
    //window.location.href = "../../"
  }*/
  console.log(data.current)
  const pc = useRef(new RTCPeerConnection({
    iceServers: [
      { urls: "stun:stun.l.google.com:19302" }, 
      { urls: "stun:stun1.l.google.com:19302" }, 
      { urls: "stun:stun2.l.google.com:19302" }, 
      { urls: "stun:stun3.l.google.com:19302" }, 
      { urls: "stun:stun4.l.google.com:19302" }, 
      { urls: "stun:stun.relay.metered.ca:80" }, 
      /*{
        urls: "turn:global.relay.metered.ca:443",
        username: "b9ef557234472bc8c25f65e3",
        credential: "vy7k6gSHvcB1Bk3p",
      },
      {
        urls: "turns:global.relay.metered.ca:443?transport=tcp",
        username: "b9ef557234472bc8c25f65e3",
        credential: "vy7k6gSHvcB1Bk3p",
      }, */
      {
        urls: "turn:free.expressturn.com:3478",
        username: "000000002084940025", 
        credential: "944su+RsD2/M07E2LuN8TOaFdls="
      }
    ]
  }))
  if(data.current.offer!=null&&data.current.offer!=undefined&&!RTCChannelState){
    (async()=>{
      pc.current.ondatachannel = (event) => {
        const channel = event.channel
        channel.onmessage = (e) => console.log("B received:", e.data)
        channel.onopen = () => {setRTCChannelState(true);channel.send("packet:ping")}
        channel.onclose = () => setRTCChannelState(false)
        setRTCChannel(channel)
      }

      const offerFromA = data.current.offer
      await pc.current.setRemoteDescription(offerFromA)
      const answer = await pc.current.createAnswer()
      await pc.current.setLocalDescription(answer)

      if (pc.current.iceGatheringState !== "complete") {
        await new Promise(resolve => {
          function checkState() {
            if (pc.current.iceGatheringState === "complete") {
              pc.current.removeEventListener("icegatheringstatechange", checkState)
              resolve()
            }
          }
          pc.current.addEventListener("icegatheringstatechange", checkState)
        })
      }

      console.log("ANSWER:", JSON.stringify(pc.current.localDescription))
    })()
  }
  const MPR = useRef()
  let MPR_ = () => void(0)
  useEffect(()=>{
    MPR_ = MPR.current
  }, [])
  return (
    <>
      <Pdata.Provider value={data.current}>
        <RTCContext.Provider value={{
          channel: RTCChannel, 
          channelOpen: RTCChannelState
        }}>
          <Game ref={MPR}/>
        </RTCContext.Provider>
      </Pdata.Provider>
      <MPF.Provider value={async(type, str)=>{
        if(type == 0){
          const channelA = pc.current.createDataChannel("chat")
          channelA.onopen = () => channelA.send("packet:ping");
          channelA.onmessage = (e) => {
            console.log(e.data)
            if(e.data.split(":")[0] == "packet"){
              if(e.data.split(":")[1] != undefined){
                const data = e.data.split(":")[1]
                switch (data) {
                  case "ping":
                    const uuid = crypto.randomUUID() 
                    MPR.current.addPlayer({
                      username: crypto.randomUUID(), 
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
                      action: {}, 
                    })
                    MPR.current.addEntity({
                      x: 0,
                      y: 0,
                      v: [0, 0],
                      uuid: uuid, 
                      s: 0, 
                      type: "player"
                    })
                    break;
                  case "Hmove":
                    console.log(`${e.data.split(":")[2]} : ${e.data.split(":")[3]}`)
                    MPR.current.addAction(
                      {
                        type: e.data.split(":")[2], 
                        dir: e.data.split(":")[3]
                      }, 
                      "Hmotion"
                    )
                    break;
                  case "Vmove":
                    MPR.current.addAction(true, "Vmotion")
                  default:
                    break;
                }
              }
            }
          }

          const offer = await pc.current.createOffer()
          await pc.current.setLocalDescription(offer)

          if (pc.current.iceGatheringState !== "complete") {
            await new Promise(resolve => {
              function checkState() {
                if (pc.current.iceGatheringState === "complete") {
                  pc.current.removeEventListener("icegatheringstatechange", checkState);
                  resolve();
                }
              }
              pc.current.addEventListener("icegatheringstatechange", checkState);
            });
          }

          console.log("OFFER:", JSON.stringify(pc.current.localDescription))
        } else if (type == 1){
          pc.current.ondatachannel = (event) => {
            const channel = event.channel
            channel.onmessage = (e) => console.log("B received:", e.data)
            channel.onopen = () => channel.send("packet:ping")
          }

          const offerFromA = JSON.parse(prompt("offer plz"))
          await pc.current.setRemoteDescription(offerFromA)
          const answer = await pc.current.createAnswer()
          await pc.current.setLocalDescription(answer)

          if (pc.current.iceGatheringState !== "complete") {
            await new Promise(resolve => {
              function checkState() {
                if (pc.current.iceGatheringState === "complete") {
                  pc.current.removeEventListener("icegatheringstatechange", checkState)
                  resolve()
                }
              }
              pc.current.addEventListener("icegatheringstatechange", checkState)
            })
          }

          console.log("ANSWER:", JSON.stringify(pc.current.localDescription))
        } else if (type == 2){
          const answerFromB = JSON.parse(prompt("ans plz"))
          await pc.current.setRemoteDescription(answerFromB)
          console.log("Peer A connected (once ICE completes)")
        }
      }}>
        <MP/>
        <Pause/>
      </MPF.Provider>
    </>
  )
}

export default App
