const MSPT_ = 50;
let lastTick = performance.now();

function start20TPSLoop(tickFunction, setFunction, input) {
  function tick(now) {
    const MSPT = now - lastTick;
    if (MSPT >= MSPT_) {
      lastTick = now - (MSPT % MSPT_);
      setFunction(tickFunction(input));
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
    let output = [seed]
    let _

    function defined_check(arr) {
        return arr.filter(element => element !== undefined);
    }

    const property = {
        blocks:{
            dirt: {
                hardness: 0.5, 
                tool: [[3, 1]], //0 = sword, 1 = axe, 2 = pickaxe, 3 = shovel, 4 = hoe/ 2nd part = cost/durrability loss
                min_tool: ["none", "Dwood", "Dstone", "Ddiamond", "Dgold", "Dshears", "Dsword"], 
                s: 0.6
            }, 
            oak_log: {
                hardness: 2, 
                tool: [[1, 1]], 
                min_tool: ["none", "Dwood", "Dstone", "Ddiamond", "Dgold", "Dshears", "Dsword"], 
                s: 0.6
            }, 
            oak_plank: {
                hardness: 2, 
                tool: [[1, 1]], 
                min_tool: ["none", "Dwood", "Dstone", "Ddiamond", "Dgold", "Dshears", "Dsword"], 
                s: 0.6
            }
        }, 
        item: {
            dirt: {
                place: "dirt", 
                tool: "none"
            }, 
            oak_log: {
                place: "oak_log", 
                tool: "none"
            }, 
            wood_pickaxe: {
                place: null, 
                tool: "Dwood"
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
    }

    tick++

    for(let p of player){
        if(p?.action?.place?.slot != undefined && p?.action?.place?.pos?.x != undefined && p?.action?.place?.pos?.y != undefined){
            _ = true
            for(let i of block){
                if(i.x == p.action.place.pos.x && i.y == p.action.place.pos.y){
                    _ = false
                }
            }
            if(_){
                block.push({type: p.inventory.hotbar[p.action.place.slot].type, x: p.action.place.pos.x, y: p.action.place.pos.y})
                _ = player.indexOf(p)
                delete player[_].action.place
            }
        }
        if(p?.action?.break?.slot != undefined && p?.action?.break?.pos?.x != undefined && p?.action?.break?.pos?.y != undefined){
            for(let i of block){
                if(i.x == p.action.break.pos.x && i.y == p.action.break.pos.y){
                    _ = block.indexOf(i)
                    let mining_speed = property?.tools?.[property?.item?.[p.inventory.hotbar[p.action.break.slot].type]?.tool].speed??1
                    for(let j of entity){
                        if(p.uuid==j.uuid&&j.v[1]!=0){
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
                    //block[_]
                }
            }
        }
    }

    for(let p of player){
        if(p?.action?.Hmotion?.type != undefined && p?.action?.Hmotion?.dir != undefined){
            for(let i of entity){
                if(i.uuid==p.uuid){
                    _=entity.indexOf(i)
                    entity[_].x += 0.05
                }
            }
            _=player.indexOf(p)
            delete player[_].action.Hmotion
        }
    }

    output.push(player, entity, block, tick)
    defined_check(output)
    return output;
}

export { start20TPSLoop, tick }

//input = [seed, player, entity, block]
//input = [123456789, [{username: "h7777", inventory: {hotbar: [{type: "oak_log", ammount: 1}]}}], [{x: 0, y: 0, type: "arrow"}, {x: 0, y: 0, type: "player"}], [{x: 0, y: -1, type: "oak_plank"}], 0]