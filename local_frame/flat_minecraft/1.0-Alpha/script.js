var state = 0;
// 0 = pre-content

var pages = [
    document.getElementById('pre-content'),
    document.getElementById('worldSector'),
    document.getElementById('setting'),
    document.getElementById('CreateWorld'), 
    document.getElementById('join-menu')
]

function updatePage(setState){
    state = setState;
    for (let i = 0;i < pages.length;i++){
        pages[i].style.display = 'none';
    };
    pages[state].style.display = 'block';
}

function setWorldtype(setType){
    switch (setType){
        case 0:
            document.getElementById("worldType").innerHTML="Normal";
            break;
        case 1:
            document.getElementById("worldType").innerHTML="Flat";
            break;
        default:
            break;
    }
}

document.querySelector("form#join-form").addEventListener("submit", function(e){
    e.preventDefault()
    pageData = {}
    try{
        pageData.offer = JSON.parse(document.querySelector("input#offer").value)
        forwardPageDataHref(pageData)
    }catch{
        document.getElementById("message").innerHTML="Offer format is invalid. "
    }
})

const forwardPageDataHref = data => {
    sessionStorage.setItem("pageData", JSON.stringify(data)); 
    location.href = "./game/dist";
}

function createElement(tag, props, ...children) {
  const el = document.createElement(tag);
  for (const key in props) {
    if (key === "class") el.className = props[key];
    else if (key.startsWith("on")) el[key.toLowerCase()] = props[key];
    else el.setAttribute(key, props[key]);
  }
  for (const child of children) {
    if (typeof child === "string" || typeof child === "number") {
      el.appendChild(document.createTextNode(child));
    } else if (child instanceof Node) {
      el.appendChild(child);
    }
  }
  return el;
}


const init = () => {
    updatePage(0);
    const request = indexedDB.open("FMC_DB", 1);
    request.onupgradeneeded = e => {
        const tx = e.target.transaction;
        tx.abort();
    }
    request.onsuccess = e =>{
        const db = e.target.result; 
        const transaction = db.transaction("handle", "readonly");
        const store = transaction.objectStore("handle");
        const request = store.getAll();
        request.onsuccess = async() => {
          const dir = request.result?.[0];
          console.log(await dir.queryPermission({ mode: "readwrite" }))
          if(await dir.queryPermission({ mode: "readwrite" }) === "granted"){
            for await (const [name, handle] of dir.entries()) {
                if (handle.kind === "file") {
                    document.getElementById("worldShow").appendChild(
                        createElement("div", {
                            class: "world-item"
                        }, createElement("h2", {
                            class: "mcText noMargin"
                        }, name.replace(/\.[^/.]+$/, "")), createElement("div", {
                            class: "mcText btn world-btn",
                            onclick: ()=>{
                                forwardPageDataHref({
                                    name: name,
                                    dir: true
                                });
                            }
                        }, "Play"))
                    )
                }
            }
          }
        }
    }
}

document.addEventListener("DOMContentLoaded", init);