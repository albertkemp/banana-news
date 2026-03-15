import { useState } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import { use } from 'react'
import { useContext } from 'react'
import { useLayoutEffect } from 'react'
import { useImperativeHandle } from 'react'
import { forwardRef } from 'react'
import { createContext } from 'react'
import { Suspense } from 'react'
import { Component } from 'react'
import { deflate } from "pako"
import { inflate } from "pako"
import './App.css'
import { start20TPSLoop, tick } from './minecraftEngine.js'
import { __default__ } from './default.js'
import { VERSION } from './version.js'
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

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      info: null
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    this.setState({ info });

    console.error("Error message:", error.message);
    console.error("JS stack:", error.stack);
    console.error("Component stack:", info.componentStack);
  }

  render() {
    const { hasError, error, info } = this.state;
    if (hasError) {
      if (typeof this.props.fallback === "function") {
        return this.props.fallback(error, info);
      }

      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div style={{ color: "red" }}>
          <h3>{error?.message}</h3>
          {info && <pre>{info.componentStack}</pre>}
        </div>
      );
    }

    return this.props.children;
  }
}


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
    if(
      i.x+16<P_pos.x || 
      i.x-16>P_pos.x || 
      i.y+16<P_pos.y ||
      i.y-16>P_pos.y
    )continue;
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
  const blockRenderList = useContext(world)[3]
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
        if(block.x + 16 < P_pos.x || block.x - 16 > P_pos.x || block.y + 16 < P_pos.y || block.y - 16 > P_pos.y){
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
        position:'absolute',
        left: 50, 
        zIndex:11
      }} onClick={()=>{F(2, "")}}> connect</button>
    </>
  )
}

function Alert({ message, w, h }){
  return (
    <>
      <div
        style={{
          position: 'absolute', 
          top: 0, 
          left: 0, 
          zIndex: 13, 
          width: '100%', 
          height: '100%', 
          backgroundColor: '#000000', 
          opacity: 0.5
        }}
      ></div>
      <div style={{
        position: 'absolute', 
        top: h/2-(h*0.4<300?300:h*0.4)/2, 
        left: w/2-(w*0.4<300?300:w*0.4)/2, 
        minWidth: 300, 
        minHeight: 300, 
        width: '40%', 
        height: '40%', 
        zIndex: 14, 
        backgroundColor: '#a6a6a6', 
        border: '5px outset'
      }}>{message}</div>
    </>
  )
}

function Offer({ state, count }) {
  const RTC = useContext(MPF)
  const [text, setText] = useState("")
  const prevCount = useRef(0)
  const promiseRef = useRef(null)
  const inputRef = useRef(null)
  
  if (state && prevCount.current !== count) {
    prevCount.current = count
    promiseRef.current = RTC(0, null)
  }

  if (!promiseRef.current) {
    promiseRef.current = new Promise(res => setTimeout(() => res(""), 0))
  }
  
  const offer = use(promiseRef.current)

  return (
    <div
      style={{
        display: state ? 'block' : 'none'
      }}
    >
      <input type="text" value={offer} ref={inputRef} style={{
        border: '5px inset', 
        outline: 'none', 
        verticalAlign: 'top', 
        height: 15, 
        lineHeight: 0, 
      }} readOnly/>
      <button
        className='btn'
        style={{
          borderWidth: 5, 
          paddingTop: 1, 
          paddingRight: 2, 
          paddingBottom: 1, 
          paddingLeft: 2, 
          margin: 0, 
          lineHeight: 0
        }}
        onClick={
          async () => {
            await navigator.clipboard.writeText(inputRef?.current?.value);
            setText("Coppied to clipboard! ")
          }
        }
      >
        <svg 
          viewBox="0 0 24 24" 
          fill="black"
          style={{
            height: 15
          }}
        >
          <path d="M5.5028 4.62704L5.5 6.75V17.2542C5.5 19.0491 6.95507 20.5042 8.75 20.5042L17.3663 20.5045C17.0573 21.3782 16.224 22.0042 15.2444 22.0042H8.75C6.12665 22.0042 4 19.8776 4 17.2542V6.75C4 5.76929 4.62745 4.93512 5.5028 4.62704ZM17.75 2C18.9926 2 20 3.00736 20 4.25V17.25C20 18.4926 18.9926 19.5 17.75 19.5H8.75C7.50736 19.5 6.5 18.4926 6.5 17.25V4.25C6.5 3.00736 7.50736 2 8.75 2H17.75ZM17.75 3.5H8.75C8.33579 3.5 8 3.83579 8 4.25V17.25C8 17.6642 8.33579 18 8.75 18H17.75C18.1642 18 18.5 17.6642 18.5 17.25V4.25C18.5 3.83579 18.1642 3.5 17.75 3.5Z"></path>
        </svg>
      </button>
      <br/>
      <p
        style={{
          color: '#00dd00ff', 
          margin: 0
        }}
      >{text}</p>
    </div>
  )
}

function ConnectUI ({ state }){
  const RTC = useContext(MPF)
  const [promise, setPromise] = useState(null)
  const inputRef = useRef(null)

  function handleConnect() {
    setPromise(RTC(1, inputRef?.current?.value))
   } 
   
   let result = null 
   if (promise) {
    result = use(promise)
  }

  return (
    <div
      style={{
        display: state ? "block" : "none"
      }}
    >
      <input
        type="text" 
        placeholder='Add answer here...' 
        style={{
          border: '5px inset', 
          outline: 'none', 
          verticalAlign: 'top', 
          height: 15, 
          lineHeight: 0, 
        }}
        ref={inputRef}
      />
      <button
        className='btn'
        style={{
          borderWidth: 5, 
          paddingTop: 1, 
          paddingRight: 2, 
          paddingBottom: 1, 
          paddingLeft: 2, 
          margin: 0, 
          fontSize: 14
        }}
        onClick={handleConnect}
      >Connect</button>
    </div>
  )
}

function Pause({ getWorld }){
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [windowHeight, setWindowHeight] = useState(window.innerHeight)
  const [pauseBtnWidth, setPauseBtnWidth] = useState(0)
  const [pauseScreenState, setPauseScreenState] = useState(false)
  const [inviteState, setInviteState] = useState(false)
  const [offerState, setOfferState] = useState([false, 0])
  const [connectUIState, setConnectUIState] = useState(false)
  const [urlState, setUrlState] = useState(false)
  const [alertState, setAlert] = useState([false, ""])
  const [saveStatus, setSaveStatus] = useState(false)
  const pauseBtnRef = useRef(null)
  const urlRef = useRef(null)
  const pageData = useContext(Pdata)

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

  async function save(quit=true){
    const encoder = new TextEncoder();
    console.log(getWorld())
    const worldData = getWorld();
    console.log(getWorld)
    for(let i = 0;i < worldData[1].length;i++){
      if(worldData[1][i].username != "h7777"){
        delete worldData[1][i];
      }
    }
    const compressed = deflate(JSON.stringify(worldData));
    const v = encoder.encode(VERSION);
    const staged = new Uint8Array(compressed.length + v.length + 1);
    staged.set(v, 0);
    staged.set(compressed, v.length + 1);
    staged[v.length] = 0x00;
    const hashBuffer = await crypto.subtle.digest("SHA-256", compressed);
    const checkSum = new Uint8Array(hashBuffer);
    const file = new Uint8Array(staged.length + 36);
    file[0] = 0x46;
    file[1] = 0x4D;
    file[2] = 0x43;
    file[3] = 0x00;
    file.set(checkSum, 4);
    file.set(staged, 36);
    if("showDirectoryPicker" in window) {
      const request = indexedDB.open("FMC_DB", 1);
      request.onupgradeneeded = event => {
        const db = event.target.result; 
        if(!db.objectStoreNames.contains("handle")){
          db.createObjectStore("handle", {
            autoIncrement: true
          })
        }
      }
      request.onsuccess = event => {
        const db = event.target.result; 
        if(!db.objectStoreNames.contains("handle")){
          db.createObjectStore("handle", {
            autoIncrement: true
          })
        }
        const transaction = db.transaction("handle", "readonly");
        const store = transaction.objectStore("handle");
        const request = store.getAll();
        request.onsuccess = () => {
          (async()=>{
            const dir = request.result?.[0];
            if(dir){
              const perm = await dir.queryPermission({ mode: "readwrite" });
              if (perm === "granted") {
                try {
                  const fileHandle = await dir.getFileHandle(`${pageData.name}.fmc`);
                  const writable = await fileHandle.createWritable();
                  await writable.write(file);
                  await writable.close();
                  if(!quit){
                    setSaveStatus(true);
                    setTimeout(function(){setSaveStatus(false)}, 2000)
                  }
                } catch (err) {
                  if (err.name === "NotFoundError"){
                    const fileHandle = await dir.getFileHandle(`${pageData.name}.fmc`, { create: true });
                    const writable = await fileHandle.createWritable();
                    await writable.write(file);
                    await writable.close();
                    if(!quit){
                      setSaveStatus(true);
                      setTimeout(function(){setSaveStatus(false)}, 2000);
                    }
                  } else {
                    setAlert([true, 
                      <>
                        <h1>An error occurred:</h1>
                        <p>An unexpected error occurred while dirPicker queryPermission was "granted"</p>
                        <p>Error message: </p>
                        <p>{err.name}: {err.message}</p>
                        <p>JS stack:</p>
                        <p>{err.stack}</p>
                        <br/>
                        <p>Please report this error. </p>
                        <button className='btn' onClick={setAlert([false, ""])}>Close</button>
                      </>
                    ])
                  }
                }
              } else if (perm === "prompt"){
                setAlert([
                  true, 
                  <>
                    <h1>Please read:</h1>
                    <p>Flat Minecraft requires a folder to save your world please create and select a folder to save your world. </p>
                    <button className='btn' onClick={
                      async function (){
                        const dir = await window.showDirectoryPicker({ mode: "readwrite" });
                        try {
                          const fileHandle = await dir.getFileHandle(`${pageData.name}.fmc`);
                          const writable = await fileHandle.createWritable();
                          await writable.write(file); 
                          await writable.close();
                          const transaction = db.transaction("handle", "readwrite");
                          const store = transaction.objectStore("handle");
                          const request = store.add(dir);
                          request.onsuccess = () => {
                            if(quit){
                              window.location.href = "../../"
                            } else {
                              setSaveStatus(true);
                              setTimeout(function(){setSaveStatus(false)}, 2000);
                            }
                          }
                          request.onerror = event => setAlert([true, 
                            <>
                              <h1>An error occurred:</h1>
                              <p>Failed opening IDB with error at "readwrite" perm in try statement, "add" operation inside perm query "prompt". </p>
                              <p>Error:</p>
                              <p>{event.target.error?.name}: {event.target.error?.message}</p>
                              <br/>
                              <p>Please report this error. </p>
                              <button className='btn' onClick={setAlert([false, ""])}>Close</button>
                            </>
                          ])
                        } catch (err) {
                          if (err.name === "NotFoundError"){
                            const fileHandle = await dir.getFileHandle(`${pageData.name}.fmc`, { create: true });
                            const writable = await fileHandle.createWritable();
                            await writable.write(file);
                            await writable.close();
                            const transaction = db.transaction("handle", "readwrite");
                            const store = transaction.objectStore("handle");
                            const request = store.add(dir);
                            request.onsuccess = () => {
                              if(quit){
                                window.location.href = "../../"
                              } else {
                                setSaveStatus(true);
                                setTimeout(function(){setSaveStatus(false)}, 2000);
                              }
                            }
                            request.onerror = event => setAlert([true, 
                              <>
                                <h1>An error occurred:</h1>
                                <p>Failed opening IDB with error at "readwrite" perm in catch statement, "add" operation inside perm query "prompt". </p>
                                <p>Error:</p>
                                <p>{event.target.error?.name}: {event.target.error?.message}</p>
                                <br/>
                                <p>Please report this error. </p>
                                <button className='btn' onClick={setAlert([false, ""])}>Close</button>
                              </>
                            ])
                          } else {
                            setAlert([true, 
                              <>
                                <h1>An error occurred:</h1>
                                <p>An unexpected error occurred while dirPicker queryPermission was "prompt"</p>
                                <p>Error message: </p>
                                <p>{err.name}: {err.message}</p>
                                <p>JS stack:</p>
                                <p>{err.stack}</p>
                                <br/>
                                <p>Please report this error. </p>
                                <button className='btn' onClick={setAlert([false, ""])}>Close</button>
                              </>
                            ])
                          }
                        }
                        setAlert([false, ""]);
                      }
                    }>Continue</button>
                  </>
                ])
              } else {
                const blob = new Blob([file], { type: "application/octet-stream" });
                const url = URL.createObjectURL(blob);
                setUrlState(true);
                urlRef.current.href = url;
                urlRef.current.download = `${pageData.name}.fmc`;
                urlRef.current.click();
                setUrlState(false);
                URL.revokeObjectURL(url);
              }
            } else {
              setAlert([
                true, 
                <>
                  <h1>Please read:</h1>
                  <p>Flat Minecraft requires a folder to save your world please create and select a folder to save your world. </p>
                  <button className='btn' onClick={
                    async function (){
                      const dir = await window.showDirectoryPicker({ mode: "readwrite" });
                      try {
                        const fileHandle = await dir.getFileHandle(`${pageData.name}.fmc`);
                        const writable = await fileHandle.createWritable();
                        await writable.write(file); 
                        await writable.close();
                        const transaction = db.transaction("handle", "readwrite");
                        const store = transaction.objectStore("handle");
                        const request = store.add(dir);
                        request.onsuccess = () => {
                          if(quit){
                            window.location.href = "../../"
                          } else {
                            setSaveStatus(true);
                            setTimeout(function(){setSaveStatus(false)}, 2000);
                          }
                        }
                        request.onerror = event => setAlert([true, 
                          <>
                            <h1>An error occurred:</h1>
                            <p>Failed opening IDB with error at "readwrite" perm in try statement, "add" operation. </p>
                            <p>Error:</p>
                            <p>{event.target.error?.name}: {event.target.error?.message}</p>
                            <br/>
                            <p>Please report this error. </p>
                            <button className='btn' onClick={setAlert([false, ""])}>Close</button>
                          </>
                        ])
                      } catch (err) {
                        if (err.name === "NotFoundError"){
                          const fileHandle = await dir.getFileHandle(`${pageData.name}.fmc`, { create: true });
                          const writable = await fileHandle.createWritable();
                          await writable.write(file);
                          await writable.close();
                          const transaction = db.transaction("handle", "readwrite");
                          const store = transaction.objectStore("handle");
                          const request = store.add(dir);
                          request.onsuccess = () => {
                            if(quit){
                              window.location.href = "../../"
                            } else {
                              setSaveStatus(true);
                              setTimeout(function(){setSaveStatus(false)}, 2000);
                            }
                          }
                          request.onerror = event => setAlert([true, 
                            <>
                              <h1>An error occurred:</h1>
                              <p>Failed opening IDB with error at "readwrite" perm in catch statement, "add" operation. </p>
                              <p>Error:</p>
                              <p>{event.target.error?.name}: {event.target.error?.message}</p>
                              <br/>
                              <p>Please report this error. </p>
                              <button className='btn' onClick={setAlert([false, ""])}>Close</button>
                            </>
                          ])
                        } else {
                          setAlert([true, 
                            <>
                              <h1>An error occurred:</h1>
                              <p>An unexpected error occurred while dirPicker handle did not exist in IDB. </p>
                              <p>Error message: </p>
                              <p>{err.name}: {err.message}</p>
                              <p>JS stack:</p>
                              <p>{err.stack}</p>
                              <br/>
                              <p>Please report this error. </p>
                              <button className='btn' onClick={setAlert([false, ""])}>Close</button>
                            </>
                          ])
                        }
                      }
                      setAlert([false, ""]);
                    }
                  }>Continue</button>
                </>
              ])
            }
          })()
        }
        request.onerror = () => {
          setAlert([true, 
            <>
              <h1>An error occurred:</h1>
              <p>Failed opening IDB with "readonly" permission. </p>
              <p>Error:</p>
              <p>{request.error?.name}: {request.error?.message}</p>
              <br/>
              <p>Please report this error. </p>
              <button className='btn' onClick={setAlert([false, ""])}>Close</button>
            </>
          ])
        }
      }
      request.onerror = event => {
        setAlert([true, 
          <>
            <h1>An error occurred:</h1>
            <p>Failed opening IDB "FMC_DB". </p>
            <p>Error:</p>
            <p>{event.target.error?.name}: {event.target.error?.message}</p>
            <p>Please report this error. </p>
            <button className='btn' onClick={setAlert([false, ""])}>Close</button>
            <br/>
          </>
        ])
      }
    } else {
      const blob = new Blob([file], { type: "application/octet-stream" });
      const url = URL.createObjectURL(blob);
      setUrlState(true);
      urlRef.current.href = url;
      urlRef.current.download = `${pageData.name}.fmc`;
      urlRef.current.click();
      setUrlState(false);
      URL.revokeObjectURL(url);
    }
  }

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
          setPauseScreenState(!pauseScreenState);
          void pauseScreenState ? null : setInviteState(false)
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
          border: '5px outset'
        }}
      >
        <div style={{
          textAlign: 'center'
        }}>
          <button 
            className='btn'
            style={{
              width: '40%', 
              minWidth: 100
            }}
            onClick={()=>{
              setInviteState(!inviteState)
            }}
          >Invite</button>
          <div
            style={{
              display: inviteState ? 'block' : 'none'
            }}
          >
            <h2>How to invite:</h2>
            <p>Click Create Offer it will generate an "Offer" send this to the person you want to invite. Then they will create an "Answer" they will need to send that to you. Then click Connect and they should connect. </p>
            <button
              className='btn'
              onClick={()=>{
                setOfferState([
                  true, 
                  offerState[1]+1
                ])
              }}
            >Create Offer</button>
            <ErrorBoundary fallback={(error, info) => (<div style={{textAlign: 'left'}}>
              <p>An error occurred when generating Offer:</p>
              <p>Error message: {error.message}</p>
              <p>JS stack: </p>
              <pre>{error.stack}</pre>
              <p>Component stack: </p>
              {info && <pre>{info.componentStack}</pre>}
            </div>)}>
              <Suspense fallback={<div>Creating Offer...</div>}>
                <ErrorBoundary fallback={(error, info) => (<div style={{textAlign: 'left'}}>
                  <p>An error occurred when generating Offer:</p>
                  <p>Error message: {error.message}</p>
                  <p>JS stack: </p>
                  <pre>{error.stack}</pre>
                  <p>Component stack: </p>
                  {info && <pre>{info.componentStack}</pre>}
                </div>)}>
                  <Offer state={offerState[0]} count={offerState[1]}/>
                </ErrorBoundary>
              </Suspense>
            </ErrorBoundary>
            <button
              className='btn'
              onClick={
                ()=>void setConnectUIState(!connectUIState)
              }
            >Connect</button>
            <ErrorBoundary fallback={(error, info) => (<div style={{textAlign: 'left'}}>
              <p>An error occurred when Connecting:</p>
              <p>Error message: {error.message}</p>
              <p>JS stack: </p>
              <pre>{error.stack}</pre>
              <p>Component stack: </p>
              {info && <pre>{info.componentStack}</pre>}
            </div>)}>
              <Suspense fallback={<div>Connecting...</div>}>
                <ErrorBoundary fallback={(error, info) => (<div style={{textAlign: 'left'}}>
                  <p>An error occurred when Connecting:</p>
                  <p>Error message: {error.message}</p>
                  <p>JS stack: </p>
                  <pre>{error.stack}</pre>
                  <p>Component stack: </p>
                  {info && <pre>{info.componentStack}</pre>}
                </div>)}>
                  <ConnectUI state={connectUIState}/>
                </ErrorBoundary>
              </Suspense>
            </ErrorBoundary>
          </div>
          <div>
            <button onClick={function(){save(false)}} className='btn' style={{
              width: '40%', 
              minWidth: 100
            }}>Save</button>
            {saveStatus ? <p style={{
              color: '#00dd00ff', 
              margin: 0
            }}>Game saved</p> : <></>}
            <br/>
            <button onClick={save} className='btn' style={{
              width: '40%', 
              minWidth: 100
            }}>Save and quit</button>
          </div>
        </div>
      </div>
      {alertState[0] ? <Alert message={alertState[1]} w={windowWidth} h={windowHeight}/> : <></>}
      {urlState ? <a ref={urlRef} style={{display: 'none'}}></a> : <></>}
    </>
  )
}

function InputWorldUI({ pageData, upload }){
  const [alertState, setAlert] = useState([false, null])

  const content = (function(){
    if(pageData.upload){
      async function handleFile(e) {
        const file = e.target.files[0];
        if (!file) return;

        const buf = await file.arrayBuffer();
        const u8 = new Uint8Array(buf);

        const name = file.name.replace(/\.[^/.]+$/, "");

        if(
          u8[0] == 0x46 &&
          u8[1] == 0x4D &&
          u8[2] == 0x43 &&
          u8[3] == 0x00
        ){
          let ptr = 36;
          let ver = [];
          while(ptr < u8.length && u8[ptr] !== 0x00){
            ver.push(u8[ptr]);
            ptr++;
          }
          if(ptr == u8.length){
            setAlert([true, 
              <>
                <p>Null terminator character could not be found. </p>
                <p>You may have loaded the wrong file or it was corrupted. </p>
                <p>Details:</p>
                <p>Pointer reached position {ptr} without finding a null terminator character. </p>
              </>
            ])
            return;
          } else if(new TextDecoder().decode(new Uint8Array(ver)) != VERSION){
            setAlert([true, 
              <>
                <p>Unknown version of the game. </p>
                <p>You may have loaded the wrong file or a future version of the game. </p>
                <p>Details:</p>
                <p>Receieved version {new TextDecoder().decode(new Uint8Array(ver))}. </p>
              </>
            ])
            return;
          } else {
            let fc = [];
            let SHA256 = new Uint8Array(32);
            ptr++;
            while(ptr < u8.length){
              fc.push(u8[ptr]);
              ptr++;
            }
            ptr = 4;
            for(let _ of new Uint8Array(32)){
              SHA256[ptr - 4] =  u8[ptr];
              ptr++;
            }
            const hashBuffer = await crypto.subtle.digest("SHA-256", new Uint8Array(fc));
            const checkSum = new Uint8Array(hashBuffer);
            for(let i = 0;i<32;i++){
              if(SHA256[i] === checkSum[i]){
                continue;
              }else{
                setAlert([true, 
                  <>
                    <p>SHA-256 Checksum did not match. </p>
                    <p>This file may be currupted or tampered with. </p>
                    <p>Details:</p>
                    <p>Receieved checksum: </p>
                    <p>{[...SHA256].map(b => b.toString(16).padStart(2, "0")).join("")}</p>
                    <p>Computed checksum:</p>
                    <p>{[...SHA256].map(b => b.toString(16).padStart(2, "0")).join("")}</p>
                  </>
                ])
                return;
              }
            }
            const decompress = (()=>{
              try{
                return inflate(new Uint8Array(fc), { to: "string" });
              }catch(err){
                setAlert([true, 
                  <>
                    <p>Error decompressing file</p>
                    <p>This file may be currupted. </p>
                    <p>Details:</p>
                    <p>Error: </p>
                    <p>{err.name}: {err.message}</p>
                    <p>JS stack: </p>
                    <pre>{err.stack}</pre>
                  </>
                ])
                return;
              }
            })();
            if(!decompress)return;
            const parse = (function(){
              try{
                return JSON.parse(decompress);
              }catch(err){
                setAlert([true, 
                  <>
                    <p>Error parsing file</p>
                    <p>This file may be currupted. </p>
                    <p>Details:</p>
                    <p>Error: </p>
                    <p>{err.name}: {err.message}</p>
                    <p>JS stack: </p>
                    <pre>{err.stack}</pre>
                  </>
                ])
              }
            })()
            upload([parse, name]);
            console.log(parse)
          }
        } else {
          setAlert([true, 
            <>
              <p>File header/MAGIC did not match. </p>
              <p>You may have loaded the wrong file or it was corrupted. </p>
              <p>Details:</p>
              <p>Expected header/MAGIC:</p>
              <p>0x46 0x4D 0x43 0x00</p>
              <p>Received header/MAGIC:</p>
              <p>0x{u8[0].toString(16).padStart(2, "0")} 0x{u8[1].toString(16).padStart(2, "0")} 0x{u8[2].toString(16).padStart(2, "0")} 0x{u8[3].toString(16).padStart(2, "0")}</p>
            </>
          ])
          return;
        }
      }
      return (
        <>
          {[...new Uint8Array(8)].map(()=>{
            return (
              <br key={Math.random()}/>
            )
          })}
          <form>
            <label style={{
              padding: '8px 14px', 
              background: '#333', 
              color: 'white', 
              borderRadius: 6, 
              cursor: 'pointer', 
              border: 'none', 
            }}>
              Upload File
              <input
                type="file"
                onChange={handleFile}
                style={{ display: "none" }}
              />
            </label>
          </form>
        </>
      )
    } else if(pageData.dir){
      const request = indexedDB.open("FMC_DB", 1);
      request.onupgradeneeded = e => {
        setAlert([true, 
          <>
            <p>Indexed DB was not initialized. </p>
          </>
        ])
        const tx = e.target.transaction;
        tx.abort();
      };
      request.onsuccess = e =>{
        const db = e.target.result; 
        if(!db.objectStoreNames.contains("handle")){
          setAlert([true, 
            <>
              <p>No store name called "handle" in Indexed DB. </p>
            </>
          ])
          return;
        }
        const transaction = db.transaction("handle", "readonly");
        const store = transaction.objectStore("handle");
        const request = store.getAll();
        request.onsuccess = async() => {
          const dir = request.result?.[0];
          const fileHandle = await dir.getFileHandle(pageData.name);
          const file = await fileHandle.getFile();
          const u8 = new Uint8Array(await file.arrayBuffer());
          if(
            u8[0] == 0x46 &&
            u8[1] == 0x4D &&
            u8[2] == 0x43 &&
            u8[3] == 0x00
          ){
            let ptr = 36;
            let ver = [];
            while(ptr < u8.length && u8[ptr] !== 0x00){
              ver.push(u8[ptr]);
              ptr++;
            }
            if(ptr == u8.length){
              setAlert([true, 
                <>
                  <p>Null terminator character could not be found. </p>
                  <p>You may have loaded the wrong file or it was corrupted. </p>
                  <p>Details:</p>
                  <p>Pointer reached position {ptr} without finding a null terminator character. </p>
                </>
              ])
              return;
            } else if(new TextDecoder().decode(new Uint8Array(ver)) != VERSION){
              setAlert([true, 
                <>
                  <p>Unknown version of the game. </p>
                  <p>You may have loaded the wrong file or a future version of the game. </p>
                  <p>Details:</p>
                  <p>Receieved version {new TextDecoder().decode(new Uint8Array(ver))}. </p>
                </>
              ])
              return;
            } else {
              let fc = [];
              let SHA256 = new Uint8Array(32);
              ptr++;
              while(ptr < u8.length){
                fc.push(u8[ptr]);
                ptr++;
              }
              ptr = 4;
              for(let _ of new Uint8Array(32)){
                SHA256[ptr - 4] =  u8[ptr];
                ptr++;
              }
              const hashBuffer = await crypto.subtle.digest("SHA-256", new Uint8Array(fc));
              const checkSum = new Uint8Array(hashBuffer);
              for(let i = 0;i<32;i++){
                if(SHA256[i] === checkSum[i]){
                  continue;
                }else{
                  setAlert([true, 
                    <>
                      <p>SHA-256 Checksum did not match. </p>
                      <p>This file may be currupted or tampered with. </p>
                      <p>Details:</p>
                      <p>Receieved checksum: </p>
                      <p>{[...SHA256].map(b => b.toString(16).padStart(2, "0")).join("")}</p>
                      <p>Computed checksum:</p>
                      <p>{[...SHA256].map(b => b.toString(16).padStart(2, "0")).join("")}</p>
                    </>
                  ])
                  return;
                }
              }
              const decompress = (()=>{
                try{
                  return inflate(new Uint8Array(fc), { to: "string" });
                }catch(err){
                  setAlert([true, 
                    <>
                      <p>Error decompressing file</p>
                      <p>This file may be currupted. </p>
                      <p>Details:</p>
                      <p>Error: </p>
                      <p>{err.name}: {err.message}</p>
                      <p>JS stack: </p>
                      <pre>{err.stack}</pre>
                    </>
                  ])
                  return;
                }
              })();
              if(!decompress)return;
              const parse = (function(){
                try{
                  return JSON.parse(decompress);
                }catch(err){
                  setAlert([true, 
                    <>
                      <p>Error parsing file</p>
                      <p>This file may be currupted. </p>
                      <p>Details:</p>
                      <p>Error: </p>
                      <p>{err.name}: {err.message}</p>
                      <p>JS stack: </p>
                      <pre>{err.stack}</pre>
                    </>
                  ])
                }
              })()
              upload([parse, null]);
            }
          } else {
            setAlert([true, 
              <>
                <p>File header/MAGIC did not match. </p>
                <p>You may have loaded the wrong file or it was corrupted. </p>
                <p>Details:</p>
                <p>Expected header/MAGIC:</p>
                <p>0x46 0x4D 0x43 0x00</p>
                <p>Received header/MAGIC:</p>
                <p>0x{u8[0].toString(16).padStart(2, "0")} 0x{u8[1].toString(16).padStart(2, "0")} 0x{u8[2].toString(16).padStart(2, "0")} 0x{u8[3].toString(16).padStart(2, "0")}</p>
              </>
            ])
            return;
          }
        }
      }
      return (
        <></>
      )
    }
  })()
  return (
    <>
      <div
        style={{
          position: 'absolute',
          top: 0, 
          left: 0,  
          width: '100%', 
          height: '100%', 
          zIndex: 14, 
          backgroundColor: '#a6a6a6', 
          textAlign: 'center'
        }}
      >{content}{alertState[0] ? alertState[1] : undefined}</div>
    </>
  )
}

function AnswerUI({ answer, error }){
  const [text, setText] = useState("")
  return(
    <>
      <div
        style={{
          position: 'absolute',
          top: 0, 
          left: 0,  
          width: '100%', 
          height: '100%', 
          zIndex: 14, 
          backgroundColor: '#a6a6a6', 
          textAlign: 'center'
        }}
      >
        {error ? 
        <div>
          <h2>An error occurred when generating Answer:</h2>
          <p>Error message:</p>
          <p>{error[0]}</p>
          <p>JS stack:</p>
          <pre>{error[1]}</pre>
        </div> :
        answer ? 
          <>
            <textarea
              style={{
                border: '5px inset', 
                outline: 'none', 
                verticalAlign: 'top', 
                height: 15
              }}
              readOnly
            >{answer}</textarea>
            <button
              className='btn'
              style={{
                borderWidth: 5, 
                paddingTop: 1, 
                paddingRight: 2, 
                paddingBottom: 1, 
                paddingLeft: 2, 
                margin: 0, 
                lineHeight: 0
              }}
              onClick={
                async () => {
                  await navigator.clipboard.writeText(answer);
                  setText("Coppied to clipboard! ")
                }
              }
            >
              <svg 
                viewBox="0 0 24 24" 
                fill="black"
                style={{
                  height: 15
                }}
              >
                <path d="M5.5028 4.62704L5.5 6.75V17.2542C5.5 19.0491 6.95507 20.5042 8.75 20.5042L17.3663 20.5045C17.0573 21.3782 16.224 22.0042 15.2444 22.0042H8.75C6.12665 22.0042 4 19.8776 4 17.2542V6.75C4 5.76929 4.62745 4.93512 5.5028 4.62704ZM17.75 2C18.9926 2 20 3.00736 20 4.25V17.25C20 18.4926 18.9926 19.5 17.75 19.5H8.75C7.50736 19.5 6.5 18.4926 6.5 17.25V4.25C6.5 3.00736 7.50736 2 8.75 2H17.75ZM17.75 3.5H8.75C8.33579 3.5 8 3.83579 8 4.25V17.25C8 17.6642 8.33579 18 8.75 18H17.75C18.1642 18 18.5 17.6642 18.5 17.25V4.25C18.5 3.83579 18.1642 3.5 17.75 3.5Z"></path>
              </svg>
            </button>
            <p style={{
              color: '#00dd00ff', 
              margin: 0
            }}>
              {text}
            </p>
          </> : 
        "Generating answer..."}
      </div>
    </>
  )
}

function Click(){
  const P_pos = useContext(pos)
  const world_ = useContext(world)
  const data = useContext(Pdata)
  const RTC = useContext(RTCContext)
  var Pointer_state = useRef(false)
  var mode = useRef(null)
  var EVENT = {}
  const PHandle = () => {
    var br = false
    //console.log(mode.current)
    if(mode.current != 1&& mode.current != null){
      OL:
      for(const i of world_[3]){
        if(i.x == Math.round(P_pos.x)+Math.floor((EVENT.clientX-window.innerWidth/2)/100) && i.y == Math.round(P_pos.y)-Math.floor((EVENT.clientY-window.innerHeight/2+100)/100)){
          if(!data.offer){
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
          } else if (data.offer && RTC.channelOpen){
            RTC.channel.send(`packet:break:${0}:${Math.round(P_pos.x)+Math.floor((EVENT.clientX-window.innerWidth/2)/100)}:${Math.round(P_pos.y)-Math.floor((EVENT.clientY-window.innerHeight/2+100)/100)}`)
          }
        }
      }
    }
    if(!br && mode.current != 0 && mode.current != null){
      if(!data.offer){
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
      } else if (data.offer && RTC.channelOpen){
        RTC.channel.send(`packet:place:${0}:${Math.round(P_pos.x)+Math.floor((EVENT.clientX-window.innerWidth/2)/100)}:${Math.round(P_pos.y)-Math.floor((EVENT.clientY-window.innerHeight/2+100)/100)}`)
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

function Game({ ref, upload }){
  const [engineList, setEngineList] = useState(__default__)
  const gateRef = useRef();
  const inputRef = useRef(__default__)
  const data = useContext(Pdata);
  const host = !(useContext(Pdata).offer != null && useContext(Pdata).offer != undefined);
  const RTC = useContext(RTCContext);

  const lastSend = useRef(performance.now())

  if(RTC.channelOpen && !data.offer){
    //console.log("state buffered:", RTC.channel.bufferedAmount);
  }

  useEffect(()=>{
    console.log(upload)
    if(upload && typeof upload == 'object' && (data.upload || data.dir))setEngineList(upload);
    inputRef.current = engineList
  }, [upload])
  useEffect(() => {
    inputRef.current = engineList;
  }, [engineList]);
  useEffect(() => {
    gateRef.current.update(window.innerWidth/2, window.innerHeight/2)
  }, [window.innerWidth, window.innerHeight]);
  useEffect(()=>{
    const username = "h7777"
    const keys = new Set();
    const update = () => {
      for(let j of keys){
        for(let i of inputRef.current[1]){
          if(i.username == username){
            if(!host){
              //console.log(RTC.channelOpen)
              if(RTC.channelOpen){
                if(j=="KeyA" ? true : j=="KeyD" ? true : j=="ArrowRight" ? true : j=="ArrowLeft" ? true : false){
                  RTC.channel.send(`packet:Hmove:${keys.has("ShiftLeft") || keys.has("ShiftRight") ? "sneak" : keys.has("CapsLock") ? "sprint" : "walk"}:${j=="KeyA" ? -1 : j=="KeyD" ? 1 : j=="ArrowRight" ? 1 : j=="ArrowLeft" ? -1 : inputRef.current[1][_].action.Hmotion.dir}`)
                }
                if(j=="KeyW" || j=="ArrowUp"){
                  RTC.channel.send("packet:Vmove")
                }
              }
            }else if(host){
              let _ = inputRef.current[1].indexOf(i)
              if(inputRef.current[1][_].action.Hmotion == undefined){
                inputRef.current[1][_].action.Hmotion = {}
              }
              inputRef.current[1][_].action.Hmotion.type = keys.has("ShiftLeft") || keys.has("ShiftRight") ? "sneak" : keys.has("CapsLock") ? "sprint" : "walk"
              inputRef.current[1][_].action.Hmotion.dir = j=="KeyA" ? -1 : j=="KeyD" ? 1 : j=="ArrowRight" ? 1 : j=="ArrowLeft" ? -1 : inputRef.current[1][_].action.Hmotion.dir;
              inputRef.current[1][_].action.Vmotion = j=="KeyW" || inputRef.current[1][_].action.Vmotion
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
    if((i.username == "h7777") == !data.offer){
      for(let j of engineList[2]){
        if(j.uuid==i.uuid){
          playerPos = {x: j.x, y: j.y}
        }
      }
    }
  }
  let playersPos = []
  for(let i of engineList[1]){
    if((i.username == "h7777") == !!data.offer){
      for(let j of engineList[2]){
        if(j.uuid==i.uuid){
          playersPos.push({x: j.x, y: j.y, u: i.username})
        }
      }
    }
  }

  if(RTC.channelOpen && !data.offer){
    const now = performance.now();
    //console.log("send interval ms:", now - lastSend.current, "buffered:", RTC.channel.bufferedAmount);
    lastSend.current = now;
    const data = [
      inputRef.current[0], 
      inputRef.current[1], 
      inputRef.current[2], 
      inputRef.current[3].filter(e=>{
        for(let i of playersPos){
          if(Math.abs(i.x-e.x)<16 && Math.abs(i.y-e.y)<16)return true;
        }
        return;
      }), 
      inputRef.current[4], 
      inputRef.current[5]
    ]
    RTC.channel.send(`packet:data:${JSON.stringify(data)}`)
  }
  
  useImperativeHandle(ref, () => {
    return {
      addPlayer(data) {
        structuredClone(inputRef.current[1].push(data))
      }, 
      addEntity(data) {
        structuredClone(inputRef.current[2].push(data))
      }, 
      addAction(data, type) {
        let j = 0;
        for(let i of inputRef.current[1]){
          if(i.username != "h7777"){
            inputRef.current[1][j].action[type] = data
            console.log(inputRef.current)
            structuredClone(inputRef.current)
          }
          j++
        }
      }, 
      updateEngineList(data) {
        setEngineList(data)
      }, 
      getWorld() {
        return inputRef.current;
      }
    };
  }, [])
  useEffect(()=>{
    if(!RTC.channelOpen && !data.offer){
      console.log(inputRef.current)
      start20TPSLoop(tick, setEngineList, ()=>inputRef.current);
    }
  }, [])

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
  const [answerState, setAnswerState] = useState(null)
  const [answerError, setAnswerError] = useState(null)
  const [tmpWorldExtract, setTmpWorldExtract] = useState(null)
  const [getWorldFunc, setGetWorldFunc] = useState(()=>void(0))
  const data = useRef(JSON.parse(sessionStorage.getItem("pageData")));
  const latestTick = useRef(-1)
  sessionStorage.removeItem("pageData");
  /*const data = {
    current: {
      name: "test", 
      offer: null
    }
  }*/
  /*if(data.current==null){
    //window.location.href = "../../"
  }*/
  console.log(tmpWorldExtract)
  console.log(data.current)
  if(tmpWorldExtract && typeof tmpWorldExtract === 'object'){
    data.current.name = tmpWorldExtract[1];
  }
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
  useEffect(()=>{
    try{
      if(data.current.offer!=null&&data.current.offer!=undefined&&!RTCChannelState){
        (async()=>{
          pc.current.ondatachannel = (event) => {
            const channel = event.channel
            if(channel.label === "state"){
              channel.onopen = () => channel.send("packet:ping");
              channel.onmessage = (e) => {
                if(e.data.split(":")[0] == "packet"){
                  if(e.data.split(":")[1] != undefined){
                    switch (e.data.split(":")[1]) {
                      case "ping":
                        break;
                      case "data":
                        const t0 = performance.now();
                        const data = JSON.parse(e.data.split(":").slice(2).join(":"))
                        const t1 = performance.now();
                        if(data[4] <= latestTick.current)return;
                        latestTick.current = data[4];
                        MPR.current.updateEngineList(data)
                        const t2 = performance.now();
                        console.log("parse:", t1 - t0, "apply:", t2 - t1);
                        break;
                      default:
                        break;
                    }
                  }
                }
              }
            }else if(channel.label === "input"){
              channel.onopen = () => {setRTCChannelState(true);channel.send("packet:ping")}
              channel.onclose = () => setRTCChannelState(false)
              setRTCChannel(channel)
            }
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

          setAnswerState(JSON.stringify(pc.current.localDescription))
        })()
      }
    } catch (err) {
      setAnswerError(
        [
          err.name + ": " + err.message, 
          err.stack
        ]
      )
    }
  }, [])
  const MPR = useRef()
  let MPR_ = () => void(0)
  useEffect(()=>{
    MPR_ = MPR.current
    setGetWorldFunc(()=>MPR.current.getWorld)
  }, [])
  return (
    <>
      <Pdata.Provider value={data.current}>
        <RTCContext.Provider value={{
          channel: RTCChannel, 
          channelOpen: RTCChannelState
        }}>
          <Game ref={MPR} upload={typeof tmpWorldExtract == 'object' && tmpWorldExtract != null ? tmpWorldExtract[0] : null}/>
        </RTCContext.Provider>
      </Pdata.Provider>
      <MPF.Provider value={async(type, str)=>{
        if(type == 0){
          const InputChannel = pc.current.createDataChannel("input")
          InputChannel.onopen = () => InputChannel.send("packet:ping");
          InputChannel.onmessage = (e) => {
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
                    break;
                  case "place":
                    MPR.current.addAction({
                      slot: e.data.split(":")[2], 
                      pos: {
                        x: e.data.split(":")[3], 
                        y: e.data.split(":")[4]
                      }
                    }, "place")
                    break;
                  case "break":
                    MPR.current.addAction({
                      slot: e.data.split(":")[2], 
                      pos: {
                        x: e.data.split(":")[3], 
                        y: e.data.split(":")[4]
                      }
                    }, "break")
                    break;
                  default:
                    break;
                }
              }
            }
          }
          const StateChannel = pc.current.createDataChannel("state", {
            ordered: false,
            maxRetransmits: 0
          })
          StateChannel.onopen = () => {setRTCChannelState(true);StateChannel.send("packet:ping");}
          StateChannel.onclose = () => setRTCChannelState(false);
          setRTCChannel(StateChannel)

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

          return JSON.stringify(pc.current.localDescription);
        } else if (type == 1){
          const answerFromB = JSON.parse(str)
          await pc.current.setRemoteDescription(answerFromB)
          return true;
        }
      }}>
        <Pdata.Provider value={data.current}>
          <Pause getWorld={getWorldFunc}/>
        </Pdata.Provider>
      </MPF.Provider>
      {(data.current.upload || data.current.dir) && !tmpWorldExtract ? <InputWorldUI pageData={data.current} upload={setTmpWorldExtract}/> : <></>}
      {data.current.offer && !RTCChannelState ? <AnswerUI answer={answerState} error={answerError}/> : <></>}
    </>
  )
}

export default App
