const TitleDiv = <HTMLDivElement>document.getElementById("title-div");
const page: { current: string, pages: HTMLElement[] } = {
    current: location.hash.slice(1), 
    pages: [
        <HTMLDivElement>document.getElementById("main"), 
        <HTMLDivElement>document.getElementById("normal"), 
        <HTMLDivElement>document.getElementById("small"), 
        <HTMLDivElement>document.getElementById("custom") 
    ]
};

window.addEventListener("resize", ()=>{
    const width: number = TitleDiv.getBoundingClientRect().width;
    TitleDiv.style.height = `${Math.min(width / 229 * 180, 350)}px`;
});

function updatePageDOM(__page__: string):void{
    for(const i of page.pages){
        i.style.display = "none";
    }
    location.hash = __page__;
    switch(__page__){
        case "":
            (document.getElementById("main") as HTMLDivElement).style.display = "block";
            break;
        case "normal":
            (document.getElementById("normal") as HTMLDivElement).style.display = "block";
            break;
        case "small":
            (document.getElementById("small") as HTMLDivElement).style.display = "block";
            break;
        case "custom":
            (document.getElementById("custom") as HTMLDivElement).style.display = "block";
            break;
        default:
            (document.getElementById("main") as HTMLDivElement).style.display = "block";
            location.hash = "";
            break;
    }
}

function updatePage(current: string):void{
    page.current = current;
    updatePageDOM(current);
}

function initProductButton(): void{
    (document.getElementById("to-normal") as HTMLElement).onclick = () => updatePage("normal");
    (document.getElementById("to-small") as HTMLElement).onclick = () => updatePage("small");
    (document.getElementById("to-custom") as HTMLElement).onclick = () => updatePage("custom");
}

function init():void{
    const backButtons: HTMLCollectionOf<Element> = document.getElementsByClassName("back-to-main");
    for(const i of backButtons){
        (i as HTMLElement).onclick = () => {
            updatePage("");
        }
    }

    initProductButton();
    updatePage(page.current);

    const width: number = TitleDiv.getBoundingClientRect().width;
    TitleDiv.style.height = `${Math.min(width / 229 * 180, 350)}px`;
}

init();