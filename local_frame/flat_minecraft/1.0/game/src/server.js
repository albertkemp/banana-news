import { start20TPSLoop, tick } from './minecraftEngine.js'

function loop(ref){
    const handle = input => {
        ref.current = input;
    }
    start20TPSLoop(tick, handle, ()=>ref.current);
}

function addPlayer(ref, username, x, y){
    const uuid = crypto.randomUUID();
    const ref = [x>>4, y>>4];
    if(!ref.current?.players || typeof ref.current?.players != 'object')return false;
    ref.current.players[username] = {
        action: {}, 
        ref: ref, 
        uuid: uuid
    }
    if(ref.current?.chunks?.[ref[0]]?.[ref[1]]){
        if(ref.current?.chunks?.[ref[0]]?.[ref[1]]?.entities){
            ref.current.chunks[ref[0]][ref[1]].entities[uuid] = {
                x, 
                y,
                __prototype__: "player" 
            }
        } else {
            ref.current.chunks[ref[0]][ref[1]].entities = {
                [uuid]: {
                    x, 
                    y,
                    __prototype__: "player" 
                }
            }
        }
    }else{
        ref.current.chunks[ref[0]][ref[1]] = {
            entities: {
                [uuid]: {
                    x, 
                    y,
                    __prototype__: "player" 
                }
            }, 
            flags: ["generate"]
        }
    }
}

export { loop, addPlayer }