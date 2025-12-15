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
                player[_].action.place = undefined
            }
        }
    }

    output.push(player, entity, block, tick)
    return output;
}

export { start20TPSLoop, tick }

//input = [seed, player, entity, block]
//input = [123456789, [{username: "h7777", inventory: {hotbar: [{type: "oak_log", ammount: 1}]}}], [{x: 0, y: 0, type: "arrow"}, {x: 0, y: 0, type: "player"}], [{x: 0, y: -1, type: "oak_plank"}], 0]