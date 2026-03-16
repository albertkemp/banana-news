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

https://banana-news.github.io/banana/share_this_page
*/

// and , please ask  before editing or deleting any of this code.
///
function animateMarks() {
            var mark1 = document.getElementById('mark1');
            var mark2 = document.getElementById('mark2');
            var mark3 = document.getElementById('mark3');
            var mark4 = document.getElementById('mark4');
            var mark5 = document.getElementById('mark5');

            mark1.style.display = "none";
            mark2.style.display = "none";
            mark3.style.display = "none";
            mark4.style.display = "none";
            mark5.style.display = "none";
            
            setTimeout(function() {
                mark1.style.display = "block";
            }, 250);
            setTimeout(function() {
                mark2.style.display = "block";
            }, 500);
            setTimeout(function() {
                mark3.style.display = "block";
            }, 750);
            setTimeout(function() {
                mark4.style.display = "block";
            }, 1000);
            setTimeout(function() {
                mark5.style.display = "block";
            }, 1250);

            setTimeout(animateMarks, 2000);  // Repeat the animation every 2 seconds
        }

        animateMarks();