const MSPT_ = 50;
let lastTick = performance.now();

function start20TPSLoop(tickFunction, setFunction, input) {
  function tick(now) {
    const MSPT = now - lastTick;
    if (MSPT >= MSPT_) {
      lastTick = now - (MSPT % MSPT_);
      //console.log(MSPT)
      setFunction(tickFunction(input()));
    }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

function tick(input){
    const property = {
        blocks:{
            dirt: {
                hardness: 0.5, 
                tool: [[3, "none", 1]], //0 = sword, 1 = axe, 2 = pickaxe, 3 = shovel, 4 = hoe/ 2nd part = level/ 3rd part is cost/durrability loss
                s: 0.6, 
                collisionBox: {
                    width: 1, 
                    height: 1, 
                    offset: [0, 0]
                }
            }, 
            oak_log: {
                hardness: 2, 
                tool: [[1, "none", 1]], 
                s: 0.6, 
                collisionBox: {
                    width: 1, 
                    height: 1, 
                    offset: [0, 0]
                }
            }, 
            oak_plank: {
                hardness: 2, 
                tool: [[1, "none", 1]], 
                s: 0.6, 
                collisionBox: {
                    width: 1, 
                    height: 1, 
                    offset: [0, 0]
                }
            }
        }, 
        item: {
            dirt: {
                place: "dirt"
            }, 
            oak_log: {
                place: "oak_log"
            }, 
            wood_pickaxe: {
                tool: "pickaxe", 
                tier: 1, 
                mining_speed: 2
            }
        }, 
        entity: {
            player: {
                hitbox: {
                    width: 0.6, 
                    height: 1.8, 
                    offset: [0, 0]
                }
            }
        }
    }

    const validateChunk = (cx, cy) => {
        const chk = input?.chunks?.[cx]?.[cy];
        if (!chk) return false;
        if (!(chk?.blocks instanceof Map)) return false;
        if (typeof chk?.entities !== "object") return false;
        return true;
    };

    const getBlock = (x, y) => validateChunk(x>>4, y>>4) && input?.chunks?.[x>>4]?.[y>>4]?.blocks?.get(((x&15)<<4)|(y&15));

    const setBlock = (x, y, block) => validateChunk(x>>4, y>>4) && input?.chunks?.[x>>4]?.[y>>4]?.blocks?.set(((x&15)<<4)|(y&15), block);

    const deleteBlock = (x, y) => validateChunk(x>>4, y>>4) && input?.chunks?.[x>>4]?.[y>>4]?.blocks?.delete(((x&15)<<4)|(y&15));

    const AABB = (entity, chunks) => {
        let [Vx, Vy] = [entity.v[0], entity.v[1]];
        let [Nx, Ny] = [entity.x, entity.y];
        const hitbox = entity.hitbox;
        const Ystep = [Math.floor(Math.abs(Vy*16)), Math.sign(Vy)/16, Vy-Math.floor(Math.abs(Vy*16))*Math.sign(Vy)/16];
        const Xstep = [Math.floor(Math.abs(Vx*16)), Math.sign(Vx)/16, Vx-Math.floor(Math.abs(Vx*16))*Math.sign(Vx)/16];
        const relevent_chunk = [];
        Ny += Ystep[1];
        OL:
        for(let i = Ystep[0]+1;i > 0;i--){
            const p1 = [((hitbox?.offset?.[0]??0)+(hitbox?.width??0)/2+Nx)>>4, ((hitbox?.height??0)+(hitbox.offset?.[1]??0)+Ny)>>4];
            const p2 = [((hitbox?.offset?.[0]??0)-(hitbox?.width??0)/2+Nx)>>4, ((hitbox?.offset?.[1]??0)+Ny)>>4];
            const minChunkX = Math.min(p1[0], p2[0]);
            const maxChunkX = Math.max(p1[0], p2[0]);
            const minChunkY = Math.min(p1[1], p2[1]);
            const maxChunkY = Math.max(p1[1], p2[1]);
            relevent_chunk.length = 0;
            for (let cx = minChunkX; cx <= maxChunkX; cx++) {
                for (let cy = minChunkY; cy <= maxChunkY; cy++) {
                    if(validateChunk(cx, cy))relevent_chunk.push(chunks[cx][cy]);
                }
            }
            for(const j of relevent_chunk){
                for(const b of j.blocks){
                    const block = b[1];
                    const width = block?.attributes?.collisionBox?.width;
                    const height = block?.attributes?.collisionBox?.height;
                    const offset = block?.attributes?.collisionBox?.offset;
                    const pos1 = (hitbox?.offset?.[0]??0)+(hitbox?.width??0)/2+Nx;
                    const pos2 = (hitbox?.offset?.[0]??0)-(hitbox?.width??0)/2+Nx;
                    const pos3 = (hitbox?.height??0)+(hitbox.offset?.[1]??0)+Ny;
                    const pos4 = (hitbox?.offset?.[1]??0)+Ny;
                    if(!width || !height) continue;
                    if(
                        pos1>(offset?.[0]??0)+width/2+block?.x &&
                        pos2<(offset?.[0]??0)-width/2+block?.x &&
                        pos3>(offset?.[1]??0)+block?.y &&
                        pos4<(offset?.[1]??0)+height+block?.y
                    ){
                        Vy = 0;
                        if(i-1 === 0){
                            Ny -= Ystep[2];
                        }else{
                            Ny -= Ystep[1];
                        }
                        break OL;
                    }
                }
            }
            if(i-2 === 0){
                Ny += Ystep[2];
            }else if(i-1 === 0){}else{
                Ny += Ystep[1];
            }
        }
        Nx += Xstep[1];
        OL:
        for(let i = Xstep[0]+1;i > 0;i--){
            const p1 = [((hitbox?.offset?.[0]??0)+(hitbox?.width??0)/2+Nx)>>4, ((hitbox?.height??0)+(hitbox.offset?.[1]??0)+Ny)>>4];
            const p2 = [((hitbox?.offset?.[0]??0)-(hitbox?.width??0)/2+Nx)>>4, ((hitbox?.offset?.[1]??0)+Ny)>>4];
            const minChunkX = Math.min(p1[0], p2[0]);
            const maxChunkX = Math.max(p1[0], p2[0]);
            const minChunkY = Math.min(p1[1], p2[1]);
            const maxChunkY = Math.max(p1[1], p2[1]);
            relevent_chunk.length = 0;
            for (let cx = minChunkX; cx <= maxChunkX; cx++) {
                for (let cy = minChunkY; cy <= maxChunkY; cy++) {
                    if(validateChunk(cx, cy))relevent_chunk.push(chunks[cx][cy]);
                }
            }
            for(const j of relevent_chunk){
                for(const b of j.blocks){
                    const block = b[1];
                    const width = block?.attributes?.collisionBox?.width;
                    const height = block?.attributes?.collisionBox?.height;
                    const offset = block?.attributes?.collisionBox?.offset;
                    const pos1 = (hitbox?.offset?.[0]??0)+(hitbox?.width??0)/2+Nx;
                    const pos2 = (hitbox?.offset?.[0]??0)-(hitbox?.width??0)/2+Nx;
                    const pos3 = (hitbox?.height??0)+(hitbox.offset?.[1]??0)+Ny;
                    const pos4 = (hitbox?.offset?.[1]??0)+Ny;
                    if(!width || !height) continue;
                    if(
                        pos1>(offset?.[0]??0)+width/2+block?.x &&
                        pos2<(offset?.[0]??0)-width/2+block?.x &&
                        pos3>(offset?.[1]??0)+block?.y &&
                        pos4<(offset?.[1]??0)+height+block?.y
                    ){
                        Vx = 0;
                        if(i-1 === 0){
                            Nx -= Xstep[2];
                        }else{
                            Nx -= Xstep[1];
                        }
                        break OL;
                    }
                }
            }
            if(i-2 === 0){
                Nx += Xstep[2];
            }else if(i-1 === 0){}else{
                Nx += Xstep[1];
            }
        }
    }

    for(const i in input?.players){
        if(!input?.players?.[i]?.action || typeof input?.players?.[i]?.action !== 'object'){
            input.i.action = {};
            continue;
        }
        if(input?.players?.[i]?.action?.place && input?.players?.[i]?.action?.place?.slot && input?.players?.[i]?.action?.place?.pos?.x && input?.players?.[i]?.action?.place?.pos?.y){
            const [x, y] = [input?.players?.[i]?.action?.pos?.x, input?.players?.[i]?.action?.pos?.y];
            if(!getBlock(x, y)){
                setBlock(x, y, {
                    type: "oak_log", 
                    x: x, 
                    y: y
                })
            }
            delete input?.players?.[i]?.action?.place;
        }
        if(input?.players?.[i]?.action?.break && input?.players?.[i]?.action?.break?.slot && input?.players?.[i]?.action?.break?.pos?.x && input?.players?.[i]?.action?.break?.pos?.y){
            const [x, y] = [input?.players?.[i]?.action?.break?.pos?.x, input?.players?.[i]?.action?.break?.pos?.y];
            const block = getBlock(x, y);
            if(block){
                const hitbox = input?.chunks?.[input?.players?.[i]?.ref[0]]?.[input?.players?.[i]?.ref[1]]?.entities?.[input?.players?.uuid]?.hitbox;
                const [Px, Py] = [input?.chunks?.[input?.players?.[i]?.ref[0]]?.[input?.players?.[i]?.ref[1]]?.entities?.[input?.players?.uuid]?.x, input?.chunks?.[input?.players?.[i]?.ref[0]]?.[input?.players?.[i]?.ref[1]]?.entities?.[input?.players?.uuid]?.y];
                const item = input?.chunks?.[input?.players?.[i]?.ref[0]]?.[input?.players?.[i]?.ref[1]]?.entities?.[input?.players?.uuid]?.inv?.hotbar?.[input?.players?.[i]?.action?.break?.slot];
                let mining_speed = item?.attributes?.mining_speed??1;
                (function(){
                    const r = [];
                    const p1 = [((hitbox?.offset?.[0]??0)+(hitbox?.width??0)/2+Px)>>4, ((hitbox?.height??0)+(hitbox.offset?.[1]??0)+Py)>>4];
                    const p2 = [((hitbox?.offset?.[0]??0)-(hitbox?.width??0)/2+Px)>>4, ((hitbox?.offset?.[1]??0)+Py)>>4];
                    const minChunkX = Math.min(p1[0], p2[0]);
                    const maxChunkX = Math.max(p1[0], p2[0]);
                    const minChunkY = Math.min(p1[1], p2[1]);
                    const maxChunkY = Math.max(p1[1], p2[1]);
                    for (let cx = minChunkX; cx <= maxChunkX; cx++) {
                        for (let cy = minChunkY; cy <= maxChunkY; cy++) {
                            if(validateChunk(cx, cy))relevent_chunk.push(chunks[cx][cy]);
                        }
                    }
                    for(const j of r){
                        for(const b of j.block){
                            const width = b[1]?.attributes?.collisionBox?.width;
                            const height = b[1]?.attributes?.collisionBox?.height;
                            const offset = b[1]?.attributes?.collisionBox?.offset;
                            const pos1 = (hitbox?.offset?.[0]??0)+(hitbox?.width??0)/2+Px;
                            const pos2 = (hitbox?.offset?.[0]??0)-(hitbox?.width??0)/2+Px;
                            const pos3 = (hitbox?.height??0)+(hitbox.offset?.[1]??0)+Py;
                            const pos4 = (hitbox?.offset?.[1]??0)+Py;
                            if(!width || !height) continue;
                            if(
                                pos1>(offset?.[0]??0)+width/2+block?.x &&
                                pos2<(offset?.[0]??0)-width/2+block?.x &&
                                pos3>(offset?.[1]??0)+block?.y &&
                                pos4<(offset?.[1]??0)+height+block?.y
                            )return;
                        }
                    }
                    mining_speed /= 5;
                })()
                let dammage = mining_speed/block?.attributes?.hardness;
                let tmp = true;
                for(let j of block?.attributes?.tool?.[1]){
                    const data = {}
                    switch(j?.[1]){
                        case "none":
                            data.tier = 0;
                            break;
                        case "wood":
                            data.tier = 1;
                            break;
                        case "stone":
                            data.tier = 2;
                            break;
                        case "gold":
                            data.tier = 3;
                            break;
                        case "iron":
                            data.tier = 4;
                            break;
                        case "diamond":
                            data.tier = 5;
                            break;
                        default:
                            data.tier = 0;
                            break;
                    }
                    switch(j?.[0]){
                        case 0:
                            data.type = "sword";
                            break;
                        case 1:
                            data.type = "axe";
                            break;
                        case 2:
                            data.type = "pickaxe";
                            break;
                        case 3:
                            data.type = "shovel";
                            break;
                        case 4:
                            data.type = "hoe";
                            break;
                        default:
                            data.type = null;
                            break;
                    }
                    if(data.tier >= item?.attributes?.tier??0 && data.type === item?.attributes?.tool){
                        dammage /= 30;
                        tmp = false;
                        break;
                    }
                }
                if(tmp){
                    dammage /= 100;
                }
                if(block.dammage == null || block.dammage == undefined){
                    block.dammage = 1-dammage;
                    setBlock(x, y, block);
                }else{
                    block.dammage -= dammage;
                    setBlock(x, y, block);
                }
                if(block.dammage <= 0){
                    deleteBlock(x, y);
                }
            }
            delete input?.players?.[i]?.action?.break;
        }
    }

    return input;
}

export { start20TPSLoop, tick }