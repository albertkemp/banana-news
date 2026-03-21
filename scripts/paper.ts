const TitleDiv = <HTMLDivElement>document.getElementById("title-div");

window.addEventListener("resize", ()=>{
    const width: number = TitleDiv.getBoundingClientRect().width;
    TitleDiv.style.height = `${Math.min(width / 229 * 180, 350)}px`;
});