var state = 0;
// 0 = pre-content

var pages = [
    document.getElementById('pre-content'),
    document.getElementById('worldSector'),
    document.getElementById('setting'),
    document.getElementById('CreateWorld')
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

const init = () => {
    updatePage(0);
}

document.addEventListener("DOMContentLoaded", init);