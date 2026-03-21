const TitleDiv = <HTMLDivElement>document.getElementById("title-div");

window.addEventListener("resize", ()=>{
    const width: number = TitleDiv.getBoundingClientRect().width;
    TitleDiv.style.height = `${width / 229 * 180}px`;
});