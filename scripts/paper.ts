const TitleDiv = <HTMLDivElement>document.getElementById("title-div");
const page: { current: string, pages: HTMLElement[] } = {
    current: location.hash.slice(1), 
    pages: [
        <HTMLDivElement>document.getElementById("main")
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
    switch(__page__){
        case "":
            (document.getElementById("main") as HTMLDivElement).style.display = "block";
            break;
        default:
            break;
    }
}

function updatePage(current: string):void{
    page.current = current;
    updatePageDOM(current);
}

function init():void{
    const width: number = TitleDiv.getBoundingClientRect().width;
    TitleDiv.style.height = `${Math.min(width / 229 * 180, 350)}px`;

    const backButtons: HTMLCollectionOf<Element> = document.getElementsByClassName("back-to-main");
    for(const i of backButtons){
        (i as HTMLElement).onclick = () => {
            updatePage("");
        }
    }

}

init();