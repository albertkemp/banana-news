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
function checkAnswers() {
    const correctAnswers = {
      "Q1": "D",
      "Q2": "B",
      "Q3": "C",
      "Q4": "C",
      "Q5": "B",
      "Q6": "B",
      "Q7": "B",
      "Q8": "C",
      "Q9": "B",
      "Q10": "B",
      "Q11": "C"
    };

    let score = 0;
    let totalQuestions = Object.keys(correctAnswers).length;

    for (let i = 1; i <= totalQuestions; i++) {
      let questionName = "Q" + i;
      let selectedOption = document.querySelector('input[name="' + questionName + '"]:checked');

      if (selectedOption) {
        if (selectedOption.value === correctAnswers[questionName]) {
          score++;
          alert("Correct! Question " + i + " is right!");
        } else {
          alert("Incorrect! Question " + i + " is wrong. The correct answer is " + correctAnswers[questionName] + ".");
        }
      } else {
        alert("Please answer Question " + i + ".");
      }
    }

    alert("You scored " + score + " out of " + totalQuestions + ".");
  }