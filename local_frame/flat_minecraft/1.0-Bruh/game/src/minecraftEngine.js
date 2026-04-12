import { sha256, sha224 } from 'js-sha256';
import { noise } from '@chriscourses/perlin-noise'

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
    const seed = input[0]
    let player = input[1]
    let entity = input[2]
    let block = input[3]
    let tick = input[4]
    let gen = input[5]
    let scale = input[6]
    let vip = input[7]
    let output = [seed]
    let _

    const property = {
        blocks:{
            bruh: {
                hardness: 0.1, 
                tool: [[3, 1]],
                min_tool: ["none", "Dwood", "Dstone", "Ddiamond", "Dgold", "Dshears", "Dsword"], 
                s: 0.98, 
                collisionBox: {
                    width: 1, 
                    height: 1, 
                    offset: [0, 0]
                }
            }, 
            corrupt: {
                hardness: 10, 
                tool: [[1, 1]], 
                min_tool: ["none", "Dwood", "Dstone", "Ddiamond", "Dgold", "Dshears", "Dsword"], 
                s: 0.6, 
                collisionBox: {
                    width: 1, 
                    height: 1, 
                    offset: [0, 0]
                }
            }, 
            fill: {
                hardness: 5, 
                tool: [[1, 1]], 
                min_tool: ["none", "Dwood", "Dstone", "Ddiamond", "Dgold", "Dshears", "Dsword"], 
                s: 0.6, 
                collisionBox: {
                    width: 1, 
                    height: 1, 
                    offset: [0, 0]
                }
            }, 
            op: {
                hardness: Number.MAX_SAFE_INTEGER, 
                tool: [], 
                min_tool: [], 
                s: 0.4, 
                collisionBox: {
                    width: 1, 
                    height: 1, 
                    offset: [0, 0]
                }
            }, 
            "cheese-dirt": {
                hardness: 0.5, 
                tool: [[1, 1]], 
                min_tool: ["none", "Dwood", "Dstone", "Ddiamond", "Dgold", "Dshears", "Dsword"], 
                s: 0.6, 
                collisionBox: {
                    width: 1, 
                    height: 1, 
                    offset: [0, 0]
                }
            }, 
            "cheese-grass": {
                hardness: 0.5, 
                tool: [[1, 1]], 
                min_tool: ["none", "Dwood", "Dstone", "Ddiamond", "Dgold", "Dshears", "Dsword"], 
                s: 0.6, 
                collisionBox: {
                    width: 1, 
                    height: 1, 
                    offset: [0, 0]
                }
            }, 
            "cheese-grass-light": {
                hardness: 0.5, 
                tool: [[1, 1]], 
                min_tool: ["none", "Dwood", "Dstone", "Ddiamond", "Dgold", "Dshears", "Dsword"], 
                s: 0.6, 
                collisionBox: {
                    width: 1, 
                    height: 1, 
                    offset: [0, 0]
                }
            }, 
            "trump-block": {
                hardness: 7.5, 
                tool: [[1, 1]], 
                min_tool: ["none", "Dwood", "Dstone", "Ddiamond", "Dgold", "Dshears", "Dsword"], 
                s: 0.8,  
                collisionBox: {
                    width: 1, 
                    height: 1, 
                    offset: [0, 0]
                }
            }, 
            "trump-slab": {
                hardness: 7.5, 
                tool: [[1, 1]], 
                min_tool: ["none", "Dwood", "Dstone", "Ddiamond", "Dgold", "Dshears", "Dsword"], 
                s: 0.4, 
                collisionBox: {
                    width: 1, 
                    height: 0.5, 
                    offset: [0, 0]
                }
            }, 
            "trump-massive": {
                hardness: 7.5, 
                tool: [[1, 1]], 
                min_tool: ["none", "Dwood", "Dstone", "Ddiamond", "Dgold", "Dshears", "Dsword"], 
                s: 0.6, 
                collisionBox: {
                    width: 2, 
                    height: 2, 
                    offset: [0, 0]
                }
            }
        }, 
        item: {
            bruh: {
                place: "bruh", 
                tool: "none"
            }, 
            oak_log: {
                place: "oak_log", 
                tool: "none"
            }, 
            diamond_pickaxe: {
                place: null, 
                tool: "Ddiamond"
            }
        }, 
        tools: {
            none: {
                speed: 1
            }, 
            Dwood: {
                speed: 2
            }, 
            Dstone: {
                speed: 4
            }, 
            Diron: {
                speed: 6
            }, 
            Ddiamond: {
                speed: 8
            }, 
            Dgold: {
                speed: 12
            }, 
            Dshears: {
                speed: 2
            }, 
            woolshears: {
                speed: 5
            }, 
            CbLvshears: {
                speed: 15
            }, 
            Dsword: {
                speed: 1.5
            }, 
            Cbsword: {
                speed: 15
            }, 
            Basword: {
                speed: 30
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

    const AABB = (x, y, Vx, Vy, blocks, type, property) => {
        var [Nx, Ny] = [x, y]
        var [Tx, Ty] = [x+Vx, y+Vy]
        if(Vy > 0){
            OL: 
            while(Ny<Ty){
                Ny += 1/16
                for(const b of blocks){
                    if(
                        Nx-property.entity?.[type]?.hitbox?.width/2+property.entity?.[type]?.hitbox?.offset[0] < b.x+property.blocks?.[b.type]?.collisionBox.width/2+property.blocks?.[b.type]?.collisionBox.offset[0] && 
                        Nx+property.entity?.[type]?.hitbox?.width/2+property.entity?.[type]?.hitbox?.offset[0] > b.x-property.blocks?.[b.type]?.collisionBox.width/2+property.blocks?.[b.type]?.collisionBox.offset[0] && 
                        Ny+property.entity?.[type]?.hitbox?.offset[1] < b.y+property.blocks?.[b.type]?.collisionBox.height+property.blocks?.[b.type]?.collisionBox.offset[1] && 
                        Ny+property.entity?.[type]?.hitbox?.height+property.entity?.[type]?.hitbox?.offset[1] > b.y+property.blocks?.[b.type]?.collisionBox.offset[1]
                    ){
                        Vy = 0
                        Ny -= 1/16
                        break OL;
                    }
                }
            }
        } else if(Vy < 0) {
            OL: 
            while(Ny>Ty){
                Ny -= 1/16
                for(const b of blocks){
                    if(
                        Nx-property.entity?.[type]?.hitbox?.width/2+property.entity?.[type]?.hitbox?.offset[0] < b.x+property.blocks?.[b.type]?.collisionBox.width/2+property.blocks?.[b.type]?.collisionBox.offset[0] && 
                        Nx+property.entity?.[type]?.hitbox?.width/2+property.entity?.[type]?.hitbox?.offset[0] > b.x-property.blocks?.[b.type]?.collisionBox.width/2+property.blocks?.[b.type]?.collisionBox.offset[0] && 
                        Ny+property.entity?.[type]?.hitbox?.offset[1] < b.y+property.blocks?.[b.type]?.collisionBox.height+property.blocks?.[b.type]?.collisionBox.offset[1] && 
                        Ny+property.entity?.[type]?.hitbox?.height+property.entity?.[type]?.hitbox?.offset[1] > b.y+property.blocks?.[b.type]?.collisionBox.offset[1]
                    ){
                        Vy = 0
                        Ny += 1/16
                        break OL;
                    }
                }
            }
        }
        if(Vx > 0){
            OL: 
            while(Nx<Tx){
                Nx += 1/16
                for(const b of blocks){
                    if(
                        Nx-property.entity?.[type]?.hitbox?.width/2+property.entity?.[type]?.hitbox?.offset[0] < b.x+property.blocks?.[b.type]?.collisionBox.width/2+property.blocks?.[b.type]?.collisionBox.offset[0] && 
                        Nx+property.entity?.[type]?.hitbox?.width/2+property.entity?.[type]?.hitbox?.offset[0] > b.x-property.blocks?.[b.type]?.collisionBox.width/2+property.blocks?.[b.type]?.collisionBox.offset[0] && 
                        Ny+property.entity?.[type]?.hitbox?.offset[1] < b.y+property.blocks?.[b.type]?.collisionBox.height+property.blocks?.[b.type]?.collisionBox.offset[1] && 
                        Ny+property.entity?.[type]?.hitbox?.height+property.entity?.[type]?.hitbox?.offset[1] > b.y+property.blocks?.[b.type]?.collisionBox.offset[1]
                    ){
                        Vx = 0
                        Nx -= 1/16
                        break OL;
                    }
                }
            }
        } else if(Vx < 0) {
            OL: 
            while(Nx>Tx){
                Nx -= 1/16
                for(const b of blocks){
                    if(
                        Nx-property.entity?.[type]?.hitbox?.width/2+property.entity?.[type]?.hitbox?.offset[0] < b.x+property.blocks?.[b.type]?.collisionBox.width/2+property.blocks?.[b.type]?.collisionBox.offset[0] && 
                        Nx+property.entity?.[type]?.hitbox?.width/2+property.entity?.[type]?.hitbox?.offset[0] > b.x-property.blocks?.[b.type]?.collisionBox.width/2+property.blocks?.[b.type]?.collisionBox.offset[0] && 
                        Ny+property.entity?.[type]?.hitbox?.offset[1] < b.y+property.blocks?.[b.type]?.collisionBox.height+property.blocks?.[b.type]?.collisionBox.offset[1] && 
                        Ny+property.entity?.[type]?.hitbox?.height+property.entity?.[type]?.hitbox?.offset[1] > b.y+property.blocks?.[b.type]?.collisionBox.offset[1]
                    ){
                        Vx = 0
                        Nx += 1/16
                        break OL;
                    }
                }
            }
        }
        return [Nx, Ny, Vx, Vy]
    }

    tick++
    
    for(const p of player){
        for(const e of entity){
            if(p.uuid == e.uuid){
                if(Math.round(e.x)+16>gen[0]){
                    while(Math.round(e.x)+16 > gen[0]){
                        const height = Math.floor((noise(gen[0]/scale)*10))
                        if(height === 0){
                            block.push({
                                x: gen[0], 
                                y: 0, 
                                type: "fill"
                            })
                        }else{
                            if(height >= 8 && height <= 10){
                                block.push({
                                    x: gen[0], 
                                    y: height, 
                                    type: "cheese-grass-light"
                                })
                            }else{
                                block.push({
                                    x: gen[0], 
                                    y: height, 
                                    type: "cheese-grass"
                                })
                            }
                            let tmp = height-1;
                            while(tmp >= 0){
                                block.push({
                                    x: gen[0], 
                                    y: tmp, 
                                    type: "cheese-dirt"
                                })
                                tmp--;
                            }
                        }
                        for(let i = 30;i > -30;i--){
                            if(sha256(`${gen[0]}:${i}:${seed}`).startsWith("00")){
                                for(let j of block){
                                    if(j.x === gen[0] && j.y === i){
                                        _ = block.indexOf(j);
                                        block.splice(_, 1);
                                    }
                                }
                                block.push({
                                    x: gen[0], 
                                    y: i, 
                                    type: "corrupt"
                                })
                            }
                            if(vip){
                                const hash = sha224(`${gen[0]}:${i}:${seed}`);
                                if(
                                    hash.startsWith("0000") ||
                                    hash.startsWith("0001") ||
                                    hash.startsWith("0002") ||
                                    hash.startsWith("0003") ||
                                    hash.startsWith("0004") ||
                                    hash.startsWith("0005") ||
                                    hash.startsWith("0006") ||
                                    hash.startsWith("0007")
                                ){
                                    for(let j of block){
                                        if(j.x === gen[0] && j.y === i){
                                            _ = block.indexOf(j);
                                            block.splice(_, 1);
                                        }
                                    }
                                    block.push({
                                        x: gen[0], 
                                        y: i, 
                                        type: "trump-massive"
                                    })
                                }else if(sha224(hash).startsWith("000")){
                                    for(let j of block){
                                        if(j.x === gen[0] && j.y === i){
                                            _ = block.indexOf(j);
                                            block.splice(_, 1);
                                        }
                                    }
                                    block.push({
                                        x: gen[0], 
                                        y: i, 
                                        type: "trump-slab"
                                    })
                                }else if(hash.startsWith("00")){
                                    for(let j of block){
                                        if(j.x === gen[0] && j.y === i){
                                            _ = block.indexOf(j);
                                            block.splice(_, 1);
                                        }
                                    }
                                    block.push({
                                        x: gen[0], 
                                        y: i, 
                                        type: "trump-block"
                                    })
                                }
                            }
                            if(sha256(sha256(`${gen[0]}:${i}:${seed}`)).startsWith("0000")){
                                for(let j of block){
                                    if(j.x === gen[0] && j.y === i){
                                        _ = block.indexOf(j);
                                        block.splice(_, 1);
                                    }
                                }
                                block.push({
                                    x: gen[0], 
                                    y: i, 
                                    type: "op"
                                })
                            }
                        }
                        gen[0]++
                        //console.log(gen[0])
                    }
                }
                if(Math.round(e.x)-16<gen[1]){
                    while(Math.round(e.x)-16 < gen[1]){
                        const height = Math.floor((noise(gen[1]/scale)*10))
                        if(height === 0){
                            block.push({
                                x: gen[1], 
                                y: 0, 
                                type: "fill"
                            })
                        }else{
                            if(height >= 8 && height <= 10){
                                block.push({
                                    x: gen[1], 
                                    y: height, 
                                    type: "cheese-grass-light"
                                })
                            }else{
                                block.push({
                                    x: gen[1], 
                                    y: height, 
                                    type: "cheese-grass"
                                })
                            }
                            let tmp = height-1;
                            while(tmp >= 0){
                                block.push({
                                    x: gen[1], 
                                    y: tmp, 
                                    type: "cheese-dirt"
                                })
                                tmp--;
                            }
                        }
                        for(let i = 30;i > -30;i--){
                            if(sha256(`${gen[1]}:${i}:${seed}`).startsWith("00")){
                                for(let j of block){
                                    if(j.x === gen[1] && j.y === i){
                                        _ = block.indexOf(j);
                                        block.splice(_, 1);
                                    }
                                }
                                block.push({
                                    x: gen[1], 
                                    y: i, 
                                    type: "corrupt"
                                })
                            }
                            if(vip){
                                const hash = sha224(`${gen[1]}:${i}:${seed}`);
                                if(
                                    hash.startsWith("0000") ||
                                    hash.startsWith("0001") ||
                                    hash.startsWith("0002") ||
                                    hash.startsWith("0003") ||
                                    hash.startsWith("0004") ||
                                    hash.startsWith("0005") ||
                                    hash.startsWith("0006") ||
                                    hash.startsWith("0007")
                                ){
                                    for(let j of block){
                                        if(j.x === gen[1] && j.y === i){
                                            _ = block.indexOf(j);
                                            block.splice(_, 1);
                                        }
                                    }
                                    block.push({
                                        x: gen[1], 
                                        y: i, 
                                        type: "trump-massive"
                                    })
                                }else if(sha224(hash).startsWith("000")){
                                    for(let j of block){
                                        if(j.x === gen[1] && j.y === i){
                                            _ = block.indexOf(j);
                                            block.splice(_, 1);
                                        }
                                    }
                                    block.push({
                                        x: gen[1], 
                                        y: i, 
                                        type: "trump-slab"
                                    })
                                }else if(hash.startsWith("00")){
                                    for(let j of block){
                                        if(j.x === gen[1] && j.y === i){
                                            _ = block.indexOf(j);
                                            block.splice(_, 1);
                                        }
                                    }
                                    block.push({
                                        x: gen[1], 
                                        y: i, 
                                        type: "trump-block"
                                    })
                                }
                            }
                            if(sha256(sha256(`${gen[1]}:${i}:${seed}`)).startsWith("0000")){
                                for(let j of block){
                                    if(j.x === gen[1] && j.y === i){
                                        _ = block.indexOf(j);
                                        block.splice(_, 1);
                                    }
                                }
                                block.push({
                                    x: gen[1], 
                                    y: i, 
                                    type: "op"
                                })
                            }
                        }
                        gen[1]--
                    }
                }
            }
        }
    }

    for(let p of player){
        for(let e of entity){
            if(e.uuid == p.uuid){
                for(let i of block){
                    if(Math.floor(e.x)==i.x && Math.floor(e.y-1/16)==i.y){
                        if(i.type == "op"){
                            _ = player.indexOf(p)
                            player[_].inventory.hotbar[0] = {
                                type: "diamond_pickaxe",
                                ammount: 1
                            }
                            break
                        }
                    }
                }
            }
        }
        if(p?.action?.place?.slot != undefined && p?.action?.place?.pos?.x != undefined && p?.action?.place?.pos?.y != undefined){
            _ = true
            for(let i of block){
                if(i.x == p.action.place.pos.x && i.y == p.action.place.pos.y){
                    _ = false
                }
            }
            if(_){
                console.log(p?.action?.place)
                block.push({type: "bruh", x: p.action.place.pos.x, y: p.action.place.pos.y})
            }
            _ = player.indexOf(p)
            delete player[_].action.place
        }
        if(p?.action?.break?.slot != undefined && p?.action?.break?.pos?.x != undefined && p?.action?.break?.pos?.y != undefined){
            for(let i of block){
                if(i.x == p.action.break?.pos.x && i.y == p.action.break?.pos.y){
                    _ = block.indexOf(i)
                    let mining_speed = property?.tools?.[property?.item?.[p.inventory.hotbar[p.action.break.slot].type]?.tool].speed??1
                    EL:
                    for(let j of entity){
                        if(p.uuid==j.uuid&&j.v[1]!=0){
                            for(let b of block){
                                if(Math.floor(j.x)==b.x && Math.floor(j.y-1/16)==b.y){
                                    break EL;
                                }
                            }
                            mining_speed /= 5
                        }
                    }
                    let dammage = mining_speed/property.blocks[block[_].type]?.hardness
                    if(property.blocks[block[_].type]?.min_tool.includes(property?.item?.[p.inventory.hotbar[p.action.break.slot].type]?.tool)){
                        dammage /= 30
                    } else {
                        dammage /= 100
                    }
                    if(block[_]?.dammage == undefined || block[_]?.state == undefined){
                        block[_].dammage = 1
                        block[_].state = 123 //uninplemented
                    }
                    block[_].dammage = block[_].dammage - dammage
                    if(block[_].dammage < 0){
                        block.splice(_, 1)
                    }
                    _ = player.indexOf(p)
                    delete player[_].action.break
                    //block[_]
                }
            }
        }
    }

    for(let i = 0;i<entity.length;i++){
        [entity[i].x, entity[i].y, entity[i].v[0], entity[i].v[1]] = AABB(entity[i].x, entity[i].y, entity[i].v[0], entity[i].v[1], block, entity[i].type, property)
    }

    for(const p of player){
        for(const i of entity){
            if(i.uuid==p.uuid){
                _=entity.indexOf(i)
                if(Math.abs(entity[_].v[1]) < 0.003){
                    entity[_].v[1] = 0
                }
                if(p.action.Vmotion==true){
                    for(const j of block){
                        if(Math.floor(entity[_].x)==j.x && Math.floor(entity[_].y-0.01)==j.y){
                            if(j.type == "op"){
                                entity[_].v[1] += 10;
                            }else{
                                entity[_].v[1] += 0.42;
                            }
                            break;
                        }
                    }
                    delete p.action.Vmotion
                }
                entity[_].v[1] -= 0.04
                entity[_].v[1] *= 0.9
            }
        }
    }

    for(let p of player){
        for(let i of entity){
            if(i.uuid==p.uuid){
                _=entity.indexOf(i)
                let V_coefficient = p.action.Hmotion?.type == "sprint" ? 1.3 : p.action.Hmotion?.type == "walk" ? 1 : p.action.Hmotion?.type == "sneak" ? 0.3 : 0
                let S_coefficient;
                let dir = p.action.Hmotion?.dir ?? 0;
                if(dir != -1 && dir != 0 && dir != 1){
                    dir = 0;
                }
                for(let j of block){
                    if(Math.floor(entity[_].x)==j.x && Math.floor(entity[_].y-0.501)==j.y){
                        S_coefficient = property.blocks?.[j?.type].s;
                        break;
                    }
                }
                S_coefficient = S_coefficient??1
                if(Math.abs(entity[_].v[0]) < 0.003){
                    entity[_].v[0] = 0
                }
                entity[_].v[0] = entity[_].v[0]*entity[_].s*0.99+dir*0.1*V_coefficient*(0.6/S_coefficient)**3
                entity[_].s = S_coefficient
            }
        }
        _=player.indexOf(p)
        delete player[_].action.Hmotion
    }

    output.push(player, entity, block, tick, gen, scale, vip)
    return output;
}

export { start20TPSLoop, tick }

//input = [seed, player, entity, block]
//input = [123456789, [{username: "h7777", inventory: {hotbar: [{type: "oak_log", ammount: 1}]}}], [{x: 0, y: 0, type: "arrow"}, {x: 0, y: 0, type: "player"}], [{x: 0, y: -1, type: "oak_plank"}], 0]