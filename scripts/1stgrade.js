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
 |  |  \   __   _   _  |  __            |     _      _ __   __   __|         __    |/     _   _            /__ o   _  __  |    |
 |  |__/  /__\ / \ | \ | /__\   |  |  | |__  / \   |/ /__\ /  | /  |   | |  (__    |\  | / \ / \ |  |  |   |   | |/  (__ _|__  |
 |  |     \__  \_/ |_/ | \__    \_/ \_/ |  | \_/   |  \__  \_/ \\_/|   \_/\  __)   | \ |/  | \_/ \_/ \_/   |   | |    __) |_/  |
 |                 |                                                                                                           |
 |_____________________________________________________________________________________________________________________________|


If you're the sort of person who looks at the source code of webpages, try our challenge:

https://banana-news.github.io/banana/share_this_page.html
*/

// and , please ask  before editing or deleting any of this code.
///
// Function to reveal/hide answers
        function revealAnswer(button) {
            var answer = button.previousElementSibling;
            if (answer.style.display === "none" || answer.style.display === "") {
                answer.style.display = "block";
                button.textContent = "Hide Answer";
            } else {
                answer.style.display = "none";
                button.textContent = "Reveal Answer";
            }
        }
        
        // Counter functionality for the interactive area
        let counterValue = 0;
        
        function changeValue(change) {
            counterValue += change;
            if (counterValue < 0) counterValue = 0;
            document.getElementById('counterValue').textContent = counterValue;
        }
        
        // Function to create number line
        function createNumberLine() {
            const numberLine = document.getElementById('number-line');
            numberLine.innerHTML = ''; // Clear any existing content
            
            const min = -10;
            const max = 10;
            const width = numberLine.offsetWidth;
            const range = max - min;
            const step = width / range;
            
            for (let i = min; i <= max; i++) {
                const tick = document.createElement('div');
                tick.className = 'tick';
                const position = ((i - min) / range) * width;
                tick.style.left = `${position}px`;
                
                if (i % 5 === 0 || i === min || i === max) {
                    const label = document.createElement('div');
                    label.className = 'label';
                    label.textContent = i;
                    label.style.left = `${position}px`;
                    numberLine.appendChild(label);
                    
                    tick.style.height = '30px'; // Make major ticks taller
                }
                
                numberLine.appendChild(tick);
            }
        }
        
        // Initialize when page loads
        window.onload = function() {
            createNumberLine();
            // Add any other initialization code here
        };
        
        // Search functionality
        const searchinput = document.getElementById('searchbar');
        const divToShow = document.getElementById('div-to-show');
        const container = document.getElementById('container');
        const topnav = document.getElementById('myTopnav');

        function showSearch() {
            container.style.filter = 'blur(10px)';
            topnav.style.backgroundColor = '#444444';
            divToShow.style.display = 'block';
            divToShow.style.animation = 'slideDown 0.5s ease forwards';
            setTimeout(function() {
                searchinput.focus();
            }, 500);
        }

        const topContainer = document.getElementById('top-container');
        topContainer.addEventListener('mouseleave', divUp);

        function divUp() {
            console.log('mouse has left both elements.');
            topnav.style.backgroundColor = '#555555';
            divToShow.style.animation = 'slideUp 0.5s ease forwards';
            container.style.filter = 'none';
        }