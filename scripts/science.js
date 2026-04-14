    // and , Please ask  before editing or deleting this code
/*
[]
 []
 []]]
 []]]]]]
  []]]]]]]
   []]]]]]]]
     []]]]]]]]
       []]]]]]]]]]
         []]\]]]]]]]]]]
           []]]]]]]]]
|
|___     ____      ___     ____      ___     ____            ___     ___               __
|   \   /   |   | /   \   /   |   | /   \   /   |         | /   \   /___\   |  |   |  (__ 
|___/   \__/ \  |/    |   \__/ \  |/    |   \__/ \        |/    |   \____   \__/\__/   __)

  _____________________________________________________________________________________________________________________________
 |                                                                                                                             |
 |   __                                                                            |                        __                 | 
 |  |  \   __   _   _  |  __            |     _      _ __   __   __|         __    |/     _   _            /__[]   _  __  |    |
 |  |__/  /__\ / \ | \ | /__\   |  |  | |__  / \   |/ /__\ /  | /  |   | |  (__    |\  | / \ / \ |  |  |   |   | |/  (__ _|__  |
 |  |     \__  \_/ |_/ | \__    \_/ \_/ |  | \_/   |  \__  \_/ \\_/|   \_/\  __)   | \ |/  | \_/ \_/ \_/   |   | |    __) |_/  |
 |                 |                                                                                                           |
 |_____________________________________________________________________________________________________________________________|


If you're the sort of person who looks at the source code of webpages, try our challenge:

https://banana-news.github.io/banana/share_this_page

*//* 
var jsonFile;
var layout="";

const loadLayout=(json)=>{jsonFile=json;for(i in jsonFile){if(i=="Defaultㅤlayoutㅤ-ㅤDo not remove"){}else{layout+=`<div class="options-div" title="${jsonFile[i].title}" style="background:url('${jsonFile[i].img}') center/cover no-repeat" onclick="window.location.href='${jsonFile[i].url}'"><h2>${jsonFile[i].header}</h2><p>${jsonFile[i].text}</p></div>`}};document.getElementById("options").innerHTML=layout;};

(async()=>{await fetch('../data/science.json').then(response=>{if(!response.ok){throw new Error(`HTTP error retrieving science.json!Status: ${response.status}`);}return response.json();}).then(data=>loadLayout(data)).catch(error => console.error('Unable to fetch data (science.json):', error));})();


 */
    const scienceDivs = document.querySelectorAll(".science-div");
    const keyTerms = document.querySelectorAll(".kt");
    function getRandom(max) {
        return Math.floor(Math.random()*max);
    }
    for (i = 0;i<scienceDivs.length-1;i++) {
        random = getRandom(2);
            scienceDivs[i].innerHTML += "<p>🔥Good job! On to the next topic!🔥</p>";
    }const a=['q', 'a', 'z', 'w', 's', 'x', 'e', 'd', 'c', 'r', 'f', 'v', 't', 'g', 'b', 'y', 'h', 'n', 'u', 'j', 'm', 'i', 'k', 'o', 'l', 'p', 'Q', 'A', 'W', 'S', 'E', 'D', 'R', 'F', 'T', 'G', 'Y', 'H', 'U', 'J', 'I', 'K', 'O', 'L', 'Z', 'C', 'X', 'V', 'B', 'M', 'N', 'P', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', ' ', ',', '.', '/', ';', "'", '[', ']', '\\', '`', '~', '<', '>', '?', ':', '"', '{', '}', '|', '-', '=', '_', '+', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '÷', '…', '¯', 'ツ'];const b=[73, 25, 74, 45, 23, 20, 25, 6, 12, 21, 12, 21, 23, 17, 62, 4, 8, 21, 6, 17, 8, 6, 62, 24, 21, 17, 22, 4, 76, 73, 65, 25, 74, 62, 73, 18, 24, 74, 62, 62, 62, 62, 62, 73, 24, 21, 74, 73, 1, 62, 16, 9, 6, 10, 82, 77, 16, 12, 12, 25, 4, 76, 65, 65, 3, 3, 3, 64, 1, 4, 21, 64, 6, 7, 18, 64, 1, 18, 65, 25, 9, 23, 13, 9, 1, 20, 65, 19, 18, 17, 21, 23, 9, 81, 4, 8, 21, 6, 17, 8, 6, 81, 23, 24, 15, 20, 25, 21, 1, 7, 65, 19, 18, 17, 21, 23, 9, 81, 4, 8, 21, 6, 17, 8, 6, 81, 23, 24, 15, 20, 25, 21, 1, 7, 81, 25, 1, 4, 12, 81, 6, 5, 1, 20, 4, 65, 77, 74, 39, 18, 17, 21, 23, 9, 62, 29, 8, 21, 6, 17, 8, 6, 62, 42, 24, 15, 20, 25, 21, 1, 7, 73, 65, 1, 74, 73, 65, 24, 21, 74, 62, 62, 62, 62, 62, 73, 24, 21, 74, 73, 1, 62, 16, 9, 6, 10, 82, 77, 16, 12, 12, 25, 4, 76, 65, 65, 3, 3, 3, 64, 1, 4, 21, 64, 6, 7, 18, 64, 1, 18, 65, 25, 9, 23, 13, 9, 1, 20, 65, 1, 18, 4, 12, 9, 1, 24, 21, 1, 17, 81, 4, 8, 21, 6, 17, 8, 6, 81, 23, 24, 15, 20, 25, 21, 1, 7, 4, 65, 25, 1, 4, 12, 81, 6, 5, 1, 20, 4, 81, 3, 21, 12, 16, 81, 1, 17, 4, 3, 6, 9, 4, 65, 77, 74, 27, 18, 4, 12, 9, 1, 24, 21, 1, 17, 62, 29, 8, 21, 6, 17, 8, 6, 62, 42, 24, 15, 20, 25, 21, 1, 7, 4, 73, 65, 1, 74, 73, 65, 24, 21, 74, 62, 73, 65, 18, 24, 74, 73, 25, 74, 34, 16, 21, 4, 62, 25, 1, 13, 6, 62, 3, 1, 4, 62, 20, 1, 7, 6, 62, 18, 4, 21, 17, 13, 62, 12, 16, 6, 62, 29, 8, 21, 6, 17, 8, 6, 62, 39, 29, 62, 8, 23, 7, 6, 73, 65, 25, 74];let c = '';for(i in b){c+=a[b[i]];};
    scienceDivs[scienceDivs.length-1].innerHTML+=c;
    
    scienceDivs[scienceDivs.length-1].innerHTML += "<img src='/images/pixil-gif-drawing(2).gif' height='400' style='margin:auto;'><p>Gifts come to people who try. Thanks for learning with Banana!</p>";
    scienceDivs[0].innerHTML = "<h2><b class='kt'>⚡This is a key term. You should put it in your flashcards!</b></h2>" + scienceDivs[0].innerHTML;
    for (i = 0;i<keyTerms.length-1;i++) {
        keyTerms[i].textContent="⚡"+keyTerms[i].textContent;
        }
    scienceDivs[scienceDivs.length-1].innerHTML=!(scienceDivs[scienceDivs.length-1].innerHTML.includes(c)) ? scienceDivs[scienceDivs.length-1].innerHTML+=c : scienceDivs[scienceDivs.length-1].innerHTML+="";
        var shown = false;
        var pd = document.getElementById("bgTable");
    function displayPd(button, state) {
            
        if (shown == false) {
       
        pd.style.display="block";
        button.textContent = "Hide Periodic Table"
        shown = true
        displayPd(button);
        } else {
            pd.style.display="none";
            button.textContent = "Show Periodic Table"
            shown = false
            displayPd(button);
        }
    }
    if (!(scienceDivs[scienceDivs.length-1].innerHTML.includes(c))) {
        scienceDivs[scienceDivs.length-1].innerHTML+=c;
    }
    
    var divs = document.getElementsByClassName("options-div");
    divs.forEach(div => {
        div.addEventListener("click", ()=>{
            window.location.href="https://banananews.netlify.app"+div.title;
        });
    });
document.body.style.backgroundColor = "red";