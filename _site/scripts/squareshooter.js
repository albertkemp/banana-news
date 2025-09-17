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

https://banana-news.github.io/banana/share_this_page.html

*/
const player = document.getElementById("player");
        let playerX = 200;
        let playerY = 400;
        player.style.left = playerX + "px";
        player.style.top = playerY + "px";

        const bullets = [];

        function movePlayer(event) {
            const key = event.key;
            if (key === "ArrowLeft") {
                playerX -= 15;
            } else if (key === "ArrowRight") {
                playerX += 15;
            }
            player.style.left = playerX + "px";
        }

        function shootBullet() {
            const bullet = document.createElement("div");
            bullet.className = "bullet";
            bullet.style.left = playerX + 20 + "px";
            bullet.style.top = playerY + "px";
            document.body.appendChild(bullet);
            bullets.push(bullet);
        }

        function moveBullets() {
            for (const bullet of bullets) {
                const bulletY = parseInt(bullet.style.top);
                if (bulletY > 0) {
                    bullet.style.top = bulletY - 30 + "px";
                } else {
                    document.body.removeChild(bullet);
                    bullets.splice(bullets.indexOf(bullet), 1);
                }
            }
        }

        document.addEventListener("keydown", movePlayer);
        document.addEventListener("keydown", (event) => {
            if (event.key === " ") {
                shootBullet();
            }
        });

        setInterval(moveBullets, 50);