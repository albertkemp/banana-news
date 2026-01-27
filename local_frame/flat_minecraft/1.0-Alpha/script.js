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

document.querySelector("form").addEventListener("submit", function(e){
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

const init = () => {
    updatePage(0);
}

document.addEventListener("DOMContentLoaded", init);