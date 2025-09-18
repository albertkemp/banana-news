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
 // Comprehensive list of all 195 UN-recognized countries with capitals
        const allCountries = [
            { name: "Afghanistan", capital: "Kabul", flag: "af", level: "medium" },
            { name: "Albania", capital: "Tirana", flag: "al", level: "easy" },
            { name: "Algeria", capital: "Algiers", flag: "dz", level: "medium" },
            { name: "Andorra", capital: "Andorra la Vella", flag: "ad", level: "hard" },
            { name: "Angola", capital: "Luanda", flag: "ao", level: "medium" },
            { name: "Antigua and Barbuda", capital: "Saint John's", flag: "ag", level: "hard" },
            { name: "Argentina", capital: "Buenos Aires", flag: "ar", level: "easy" },
            { name: "Armenia", capital: "Yerevan", flag: "am", level: "medium" },
            { name: "Australia", capital: "Canberra", flag: "au", level: "easy" },
            { name: "Austria", capital: "Vienna", flag: "at", level: "easy" },
            { name: "Azerbaijan", capital: "Baku", flag: "az", level: "medium" },
            { name: "Bahamas", capital: "Nassau", flag: "bs", level: "medium" },
            { name: "Bahrain", capital: "Manama", flag: "bh", level: "medium" },
            { name: "Bangladesh", capital: "Dhaka", flag: "bd", level: "medium" },
            { name: "Barbados", capital: "Bridgetown", flag: "bb", level: "hard" },
            { name: "Belarus", capital: "Minsk", flag: "by", level: "medium" },
            { name: "Belgium", capital: "Brussels", flag: "be", level: "easy" },
            { name: "Belize", capital: "Belmopan", flag: "bz", level: "hard" },
            { name: "Benin", capital: "Porto-Novo", flag: "bj", level: "hard" },
            { name: "Bhutan", capital: "Thimphu", flag: "bt", level: "hard" },
            { name: "Bolivia", capital: "Sucre", flag: "bo", level: "medium" },
            { name: "Bosnia and Herzegovina", capital: "Sarajevo", flag: "ba", level: "medium" },
            { name: "Botswana", capital: "Gaborone", flag: "bw", level: "medium" },
            { name: "Brazil", capital: "Brasília", flag: "br", level: "easy" },
            { name: "Brunei", capital: "Bandar Seri Begawan", flag: "bn", level: "hard" },
            { name: "Bulgaria", capital: "Sofia", flag: "bg", level: "easy" },
            { name: "Burkina Faso", capital: "Ouagadougou", flag: "bf", level: "hard" },
            { name: "Burundi", capital: "Gitega", flag: "bi", level: "hard" },
            { name: "Cabo Verde", capital: "Praia", flag: "cv", level: "hard" },
            { name: "Cambodia", capital: "Phnom Penh", flag: "kh", level: "medium" },
            { name: "Cameroon", capital: "Yaoundé", flag: "cm", level: "medium" },
            { name: "Canada", capital: "Ottawa", flag: "ca", level: "easy" },
            { name: "Central African Republic", capital: "Bangui", flag: "cf", level: "hard" },
            { name: "Chad", capital: "N'Djamena", flag: "td", level: "hard" },
            { name: "Chile", capital: "Santiago", flag: "cl", level: "easy" },
            { name: "China", capital: "Beijing", flag: "cn", level: "easy" },
            { name: "Colombia", capital: "Bogotá", flag: "co", level: "easy" },
            { name: "Comoros", capital: "Moroni", flag: "km", level: "hard" },
            { name: "Congo (Congo-Brazzaville)", capital: "Brazzaville", flag: "cg", level: "hard" },
            { name: "Costa Rica", capital: "San José", flag: "cr", level: "medium" },
            { name: "Côte d'Ivoire", capital: "Yamoussoukro", flag: "ci", level: "hard" },
            { name: "Croatia", capital: "Zagreb", flag: "hr", level: "medium" },
            { name: "Cuba", capital: "Havana", flag: "cu", level: "easy" },
            { name: "Cyprus", capital: "Nicosia", flag: "cy", level: "medium" },
            { name: "Czechia (Czech Republic)", capital: "Prague", flag: "cz", level: "easy" },
            { name: "Denmark", capital: "Copenhagen", flag: "dk", level: "easy" },
            { name: "Djibouti", capital: "Djibouti", flag: "dj", level: "hard" },
            { name: "Dominica", capital: "Roseau", flag: "dm", level: "hard" },
            { name: "Dominican Republic", capital: "Santo Domingo", flag: "do", level: "medium" },
            { name: "Ecuador", capital: "Quito", flag: "ec", level: "medium" },
            { name: "Egypt", capital: "Cairo", flag: "eg", level: "easy" },
            { name: "El Salvador", capital: "San Salvador", flag: "sv", level: "medium" },
            { name: "Equatorial Guinea", capital: "Malabo", flag: "gq", level: "hard" },
            { name: "Eritrea", capital: "Asmara", flag: "er", level: "hard" },
            { name: "Estonia", capital: "Tallinn", flag: "ee", level: "medium" },
            { name: "Eswatini", capital: "Mbabane", flag: "sz", level: "hard" },
            { name: "Ethiopia", capital: "Addis Ababa", flag: "et", level: "medium" },
            { name: "Fiji", capital: "Suva", flag: "fj", level: "medium" },
            { name: "Finland", capital: "Helsinki", flag: "fi", level: "easy" },
            { name: "France", capital: "Paris", flag: "fr", level: "easy" },
            { name: "Gabon", capital: "Libreville", flag: "ga", level: "hard" },
            { name: "Gambia", capital: "Banjul", flag: "gm", level: "hard" },
            { name: "Georgia", capital: "Tbilisi", flag: "ge", level: "medium" },
            { name: "Germany", capital: "Berlin", flag: "de", level: "easy" },
            { name: "Ghana", capital: "Accra", flag: "gh", level: "medium" },
            { name: "Greece", capital: "Athens", flag: "gr", level: "easy" },
            { name: "Grenada", capital: "Saint George's", flag: "gd", level: "hard" },
            { name: "Guatemala", capital: "Guatemala City", flag: "gt", level: "medium" },
            { name: "Guinea", capital: "Conakry", flag: "gn", level: "hard" },
            { name: "Guinea-Bissau", capital: "Bissau", flag: "gw", level: "hard" },
            { name: "Guyana", capital: "Georgetown", flag: "gy", level: "hard" },
            { name: "Haiti", capital: "Port-au-Prince", flag: "ht", level: "medium" },
            { name: "Honduras", capital: "Tegucigalpa", flag: "hn", level: "medium" },
            { name: "Hungary", capital: "Budapest", flag: "hu", level: "easy" },
            { name: "Iceland", capital: "Reykjavik", flag: "is", level: "easy" },
            { name: "India", capital: "New Delhi", flag: "in", level: "easy" },
            { name: "Indonesia", capital: "Jakarta", flag: "id", level: "medium" },
            { name: "Iran", capital: "Tehran", flag: "ir", level: "medium" },
            { name: "Iraq", capital: "Baghdad", flag: "iq", level: "medium" },
            { name: "Ireland", capital: "Dublin", flag: "ie", level: "easy" },
            { name: "Israel", capital: "Jerusalem", flag: "il", level: "medium" },
            { name: "Italy", capital: "Rome", flag: "it", level: "easy" },
            { name: "Jamaica", capital: "Kingston", flag: "jm", level: "medium" },
            { name: "Japan", capital: "Tokyo", flag: "jp", level: "easy" },
            { name: "Jordan", capital: "Amman", flag: "jo", level: "medium" },
            { name: "Kazakhstan", capital: "Nur-Sultan", flag: "kz", level: "medium" },
            { name: "Kenya", capital: "Nairobi", flag: "ke", level: "medium" },
            { name: "Kiribati", capital: "South Tarawa", flag: "ki", level: "hard" },
            { name: "Korea, North", capital: "Pyongyang", flag: "kp", level: "medium" },
            { name: "Korea, South", capital: "Seoul", flag: "kr", level: "easy" },
            { name: "Kosovo", capital: "Pristina", flag: "xk", level: "hard" },
            { name: "Kuwait", capital: "Kuwait City", flag: "kw", level: "medium" },
            { name: "Kyrgyzstan", capital: "Bishkek", flag: "kg", level: "hard" },
            { name: "Laos", capital: "Vientiane", flag: "la", level: "medium" },
            { name: "Latvia", capital: "Riga", flag: "lv", level: "medium" },
            { name: "Lebanon", capital: "Beirut", flag: "lb", level: "medium" },
            { name: "Lesotho", capital: "Maseru", flag: "ls", level: "hard" },
            { name: "Liberia", capital: "Monrovia", flag: "lr", level: "hard" },
            { name: "Libya", capital: "Tripoli", flag: "ly", level: "medium" },
            { name: "Liechtenstein", capital: "Vaduz", flag: "li", level: "hard" },
            { name: "Lithuania", capital: "Vilnius", flag: "lt", level: "medium" },
            { name: "Luxembourg", capital: "Luxembourg", flag: "lu", level: "medium" },
            { name: "Madagascar", capital: "Antananarivo", flag: "mg", level: "medium" },
            { name: "Malawi", capital: "Lilongwe", flag: "mw", level: "hard" },
            { name: "Malaysia", capital: "Kuala Lumpur", flag: "my", level: "medium" },
            { name: "Maldives", capital: "Malé", flag: "mv", level: "hard" },
            { name: "Mali", capital: "Bamako", flag: "ml", level: "hard" },
            { name: "Malta", capital: "Valletta", flag: "mt", level: "medium" },
            { name: "Marshall Islands", capital: "Majuro", flag: "mh", level: "hard" },
            { name: "Mauritania", capital: "Nouakchott", flag: "mr", level: "hard" },
            { name: "Mauritius", capital: "Port Louis", flag: "mu", level: "medium" },
            { name: "Mexico", capital: "Mexico City", flag: "mx", level: "easy" },
            { name: "Micronesia", capital: "Palikir", flag: "fm", level: "hard" },
            { name: "Moldova", capital: "Chisinau", flag: "md", level: "hard" },
            { name: "Monaco", capital: "Monaco", flag: "mc", level: "hard" },
            { name: "Mongolia", capital: "Ulaanbaatar", flag: "mn", level: "medium" },
            { name: "Montenegro", capital: "Podgorica", flag: "me", level: "hard" },
            { name: "Morocco", capital: "Rabat", flag: "ma", level: "medium" },
            { name: "Mozambique", capital: "Maputo", flag: "mz", level: "hard" },
            { name: "Myanmar (Burma)", capital: "Naypyidaw", flag: "mm", level: "medium" },
            { name: "Namibia", capital: "Windhoek", flag: "na", level: "medium" },
            { name: "Nauru", capital: "Yaren", flag: "nr", level: "hard" },
            { name: "Nepal", capital: "Kathmandu", flag: "np", level: "medium" },
            { name: "Netherlands", capital: "Amsterdam", flag: "nl", level: "easy" },
            { name: "New Zealand", capital: "Wellington", flag: "nz", level: "medium" },
            { name: "Nicaragua", capital: "Managua", flag: "ni", level: "medium" },
            { name: "Niger", capital: "Niamey", flag: "ne", level: "hard" },
            { name: "Nigeria", capital: "Abuja", flag: "ng", level: "medium" },
            { name: "North Macedonia", capital: "Skopje", flag: "mk", level: "hard" },
            { name: "Norway", capital: "Oslo", flag: "no", level: "easy" },
            { name: "Oman", capital: "Muscat", flag: "om", level: "medium" },
            { name: "Pakistan", capital: "Islamabad", flag: "pk", level: "medium" },
            { name: "Palau", capital: "Ngerulmud", flag: "pw", level: "hard" },
            { name: "Panama", capital: "Panama City", flag: "pa", level: "medium" },
            { name: "Papua New Guinea", capital: "Port Moresby", flag: "pg", level: "medium" },
            { name: "Paraguay", capital: "Asunción", flag: "py", level: "medium" },
            { name: "Peru", capital: "Lima", flag: "pe", level: "easy" },
            { name: "Philippines", capital: "Manila", flag: "ph", level: "medium" },
            { name: "Poland", capital: "Warsaw", flag: "pl", level: "easy" },
            { name: "Portugal", capital: "Lisbon", flag: "pt", level: "easy" },
            { name: "Qatar", capital: "Doha", flag: "qa", level: "medium" },
            { name: "Romania", capital: "Bucharest", flag: "ro", level: "easy" },
            { name: "Russia", capital: "Moscow", flag: "ru", level: "easy" },
            { name: "Rwanda", capital: "Kigali", flag: "rw", level: "medium" },
            { name: "Saint Kitts and Nevis", capital: "Basseterre", flag: "kn", level: "hard" },
            { name: "Saint Lucia", capital: "Castries", flag: "lc", level: "hard" },
            { name: "Saint Vincent and the Grenadines", capital: "Kingstown", flag: "vc", level: "hard" },
            { name: "Samoa", capital: "Apia", flag: "ws", level: "hard" },
            { name: "San Marino", capital: "San Marino", flag: "sm", level: "hard" },
            { name: "Sao Tome and Principe", capital: "São Tomé", flag: "st", level: "hard" },
            { name: "Saudi Arabia", capital: "Riyadh", flag: "sa", level: "medium" },
            { name: "Senegal", capital: "Dakar", flag: "sn", level: "medium" },
            { name: "Serbia", capital: "Belgrade", flag: "rs", level: "medium" },
            { name: "Seychelles", capital: "Victoria", flag: "sc", level: "hard" },
            { name: "Sierra Leone", capital: "Freetown", flag: "sl", level: "hard" },
            { name: "Singapore", capital: "Singapore", flag: "sg", level: "easy" },
            { name: "Slovakia", capital: "Bratislava", flag: "sk", level: "medium" },
            { name: "Slovenia", capital: "Ljubljana", flag: "si", level: "medium" },
            { name: "Solomon Islands", capital: "Honiara", flag: "sb", level: "hard" },
            { name: "Somalia", capital: "Mogadishu", flag: "so", level: "hard" },
            { name: "South Africa", capital: "Pretoria", flag: "za", level: "medium" },
            { name: "South Sudan", capital: "Juba", flag: "ss", level: "hard" },
            { name: "Spain", capital: "Madrid", flag: "es", level: "easy" },
            { name: "Sri Lanka", capital: "Sri Jayawardenepura Kotte", flag: "lk", level: "hard" },
            { name: "Sudan", capital: "Khartoum", flag: "sd", level: "medium" },
            { name: "Suriname", capital: "Paramaribo", flag: "sr", level: "hard" },
            { name: "Sweden", capital: "Stockholm", flag: "se", level: "easy" },
            { name: "Switzerland", capital: "Bern", flag: "ch", level: "medium" },
            { name: "Syria", capital: "Damascus", flag: "sy", level: "medium" },
            { name: "Taiwan", capital: "Taipei", flag: "tw", level: "medium" },
            { name: "Tajikistan", capital: "Dushanbe", flag: "tj", level: "hard" },
            { name: "Tanzania", capital: "Dodoma", flag: "tz", level: "medium" },
            { name: "Thailand", capital: "Bangkok", flag: "th", level: "easy" },
            { name: "Timor-Leste", capital: "Dili", flag: "tl", level: "hard" },
            { name: "Togo", capital: "Lomé", flag: "tg", level: "hard" },
            { name: "Tonga", capital: "Nuku'alofa", flag: "to", level: "hard" },
            { name: "Trinidad and Tobago", capital: "Port of Spain", flag: "tt", level: "hard" },
            { name: "Tunisia", capital: "Tunis", flag: "tn", level: "medium" },
            { name: "Turkey", capital: "Ankara", flag: "tr", level: "medium" },
            { name: "Turkmenistan", capital: "Ashgabat", flag: "tm", level: "hard" },
            { name: "Tuvalu", capital: "Funafuti", flag: "tv", level: "hard" },
            { name: "Uganda", capital: "Kampala", flag: "ug", level: "medium" },
            { name: "Ukraine", capital: "Kyiv", flag: "ua", level: "medium" },
            { name: "United Arab Emirates", capital: "Abu Dhabi", flag: "ae", level: "medium" },
            { name: "United Kingdom", capital: "London", flag: "gb", level: "easy" },
            { name: "United States", capital: "Washington, D.C.", flag: "us", level: "easy" },
            { name: "Uruguay", capital: "Montevideo", flag: "uy", level: "medium" },
            { name: "Uzbekistan", capital: "Tashkent", flag: "uz", level: "medium" },
            { name: "Vanuatu", capital: "Port Vila", flag: "vu", level: "hard" },
            { name: "Vatican City", capital: "Vatican City", flag: "va", level: "hard" },
            { name: "Venezuela", capital: "Caracas", flag: "ve", level: "medium" },
            { name: "Vietnam", capital: "Hanoi", flag: "vn", level: "medium" },
            { name: "Yemen", capital: "Sana'a", flag: "ye", level: "medium" },
            { name: "Zambia", capital: "Lusaka", flag: "zm", level: "medium" },
            { name: "Zimbabwe", capital: "Harare", flag: "zw", level: "medium" }
        ];

        // Game state variables
        let score = 0;
        let currentQuestionIndex = 0;
        let questions = [];
        let streak = 0;
        let timer;
        let timeLeft = 30;
        let currentLevel = "all";
        const totalQuestions = 10;

        // DOM elements
        const questionEl = document.getElementById('question');
        const answerEl = document.getElementById('answer');
        const resultEl = document.getElementById('result');
        const submitBtn = document.getElementById('submit-btn');
        const nextBtn = document.getElementById('next-btn');
        const scoreEl = document.getElementById('score');
        const questionCountEl = document.getElementById('question-count');
        const totalQuestionsEl = document.getElementById('total-questions');
        const streakEl = document.getElementById('streak');
        const progressBar = document.getElementById('progress-bar');
        const flagEl = document.getElementById('flag');
        const timerEl = document.getElementById('timer');
        const difficultyBtns = document.querySelectorAll('.difficulty-btn');

        // Initialize the game
        function initGame() {
            // Reset game state
            score = 0;
            streak = 0;
            currentQuestionIndex = 0;
            timeLeft = 30;
            clearInterval(timer);
            
            // Create a shuffled list of questions based on difficulty
            let filteredCountries;
            if (currentLevel === "all") {
                filteredCountries = [...allCountries];
            } else {
                filteredCountries = allCountries.filter(country => country.level === currentLevel);
            }
            
            questions = [...filteredCountries].sort(() => Math.random() - 0.5).slice(0, totalQuestions);
            
            // Update UI
            updateUI();
            showQuestion();
            startTimer();
            
            // Focus on answer input
            answerEl.focus();
        }

        // Display current question
        function showQuestion() {
            const currentCountry = questions[currentQuestionIndex];
            questionEl.textContent = `What is the capital of ${currentCountry.name}?`;
            
            // Set flag
            flagEl.style.backgroundImage = `url(https://flagcdn.com/240x180/${currentCountry.flag}.png)`;
            
            // Clear input and result
            answerEl.value = '';
            resultEl.textContent = '';
            resultEl.className = '';
            
            // Reset buttons
            submitBtn.disabled = false;
            nextBtn.disabled = true;
            
            // Update progress
            progressBar.style.width = `${(currentQuestionIndex / totalQuestions) * 100}%`;
            questionCountEl.textContent = currentQuestionIndex + 1;
        }

        // Start the timer for current question
        function startTimer() {
            clearInterval(timer);
            timeLeft = 30;
            timerEl.textContent = `${timeLeft}s`;
            
            timer = setInterval(() => {
                timeLeft--;
                timerEl.textContent = `${timeLeft}s`;
                
                if (timeLeft <= 0) {
                    clearInterval(timer);
                    resultEl.textContent = `Time's up! The capital is ${questions[currentQuestionIndex].capital}`;
                    resultEl.className = "incorrect";
                    submitBtn.disabled = true;
                    nextBtn.disabled = false;
                    streak = 0;
                    updateUI();
                }
            }, 1000);
        }

        // Check the user's answer
        function checkAnswer() {
            const userAnswer = answerEl.value.trim();
            const correctAnswer = questions[currentQuestionIndex].capital;
            
            if (!userAnswer) {
                resultEl.textContent = "Please enter an answer";
                resultEl.className = "incorrect";
                return;
            }
            
            // Case-insensitive comparison with flexibility for punctuation
            const normalizedUserAnswer = userAnswer.toLowerCase()
                .replace(/[.,'’]/g, '')
                .replace(/\s+/g, ' ')
                .trim();
            
            const normalizedCorrect = correctAnswer.toLowerCase()
                .replace(/[.,'’]/g, '')
                .replace(/\s+/g, ' ')
                .trim();
            
            if (normalizedUserAnswer === normalizedCorrect) {
                // Correct answer
                score += 10;
                streak++;
                resultEl.textContent = `Correct! ${correctAnswer} is the capital of ${questions[currentQuestionIndex].name}`;
                resultEl.className = "correct";
            } else {
                // Incorrect answer
                streak = 0;
                resultEl.textContent = `Incorrect. The capital is ${correctAnswer}`;
                resultEl.className = "incorrect";
            }
            
            // Stop timer
            clearInterval(timer);
            
            // Update UI
            updateUI();
            
            // Enable next button and disable submit
            submitBtn.disabled = true;
            nextBtn.disabled = false;
        }

        // Move to next question
        function nextQuestion() {
            currentQuestionIndex++;
            
            if (currentQuestionIndex < totalQuestions) {
                showQuestion();
                startTimer();
            } else {
                // Game over
                showResults();
            }
        }

        // Show final results
        function showResults() {
            clearInterval(timer);
            const percentage = Math.round((score / 100) * 100);
            let message;
            
            if (percentage >= 90) message = "Geography Master! 🏆";
            else if (percentage >= 70) message = "Great job! 🌍";
            else if (percentage >= 50) message = "Good effort! 👍";
            else message = "Keep practicing! 📚";
            
            questionEl.innerHTML = `Game Over!<br>You scored ${score} points (${percentage}%)<br>${message}`;
            flagEl.style.backgroundImage = '';
            
            // Update buttons
            submitBtn.style.display = 'none';
            nextBtn.textContent = 'Play Again';
            nextBtn.onclick = initGame;
            nextBtn.disabled = false;
            
            // Update progress to 100%
            progressBar.style.width = '100%';
        }

        // Update score and streak display
        function updateUI() {
            scoreEl.textContent = score;
            streakEl.textContent = streak;
            totalQuestionsEl.textContent = totalQuestions;
        }

        // Set difficulty level
        function setDifficulty(level) {
            currentLevel = level;
            difficultyBtns.forEach(btn => {
                btn.classList.toggle('active', btn.dataset.level === level);
            });
            initGame();
        }

        // Event listeners
        submitBtn.addEventListener('click', checkAnswer);
        nextBtn.addEventListener('click', nextQuestion);
        
        answerEl.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                if (!submitBtn.disabled) {
                    checkAnswer();
                } else if (!nextBtn.disabled) {
                    nextQuestion();
                }
            }
        });
        
        difficultyBtns.forEach(btn => {
            btn.addEventListener('click', () => setDifficulty(btn.dataset.level));
        });

        // Initialize the game when page loads
        window.onload = initGame;