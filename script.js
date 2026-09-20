
document.addEventListener("DOMContentLoaded", function () {

    const loginPage = document.getElementById("loginPage");
    const photoPage = document.getElementById("photoPage");
    const quizPage = document.getElementById("quizPage");
    const resultPage = document.getElementById("resultPage");
    const paymentPage = document.getElementById("paymentPage");
    const finalPage = document.getElementById("finalPage");
    const loveRevealPage = document.getElementById("loveRevealPage");
    const storyPage = document.getElementById("storyPage");
    const mainMusic = document.getElementById("mainMusic");
    const memoriesMusic = document.getElementById("memoriesMusic");

    function stopMusic(audio) {
        if (!audio) return;
        audio.pause();
        audio.currentTime = 0;
    }

    function playMusic(audio) {
        if (!audio) return;
        const p = audio.play();
        if (p && typeof p.catch === "function") p.catch(function () {});
    }

    const username = document.getElementById("username");
    const password = document.getElementById("password");
    const error = document.getElementById("error");
    const loginButton = document.getElementById("loginBtn");

    function showPage(page) {
        [loginPage, photoPage, quizPage, resultPage, paymentPage, loveRevealPage, finalPage, storyPage]
            .forEach(function (p) {
                p.classList.remove("active");
            });

        page.classList.add("active");
    }

    function login() {
        const user = username.value.trim().toLowerCase();
        const pass = password.value.trim().toLowerCase();

        if (user !== "akshaya") {
            error.textContent = "Enodaiya wife-e nee illa pae 😑";
            return;
        }

        if (pass !== "husband" && pass !== "purushan") {
            error.textContent = "Naalam yaarunga unaku 💔🥲";
            return;
        }

        error.textContent = "Welcome, my wife ❤️";

        setTimeout(function () {
            showPage(photoPage);
        }, 600);
    }

    loginButton.addEventListener("click", login);

    username.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            password.focus();
        }
    });

    password.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            login();
        }
    });


    // ---------- PHOTO -> QUIZ ----------
    function openQuiz() {
        currentQuestion = 0;
        score = 0;
        showPage(quizPage);
        loadQuestion();
    }

    document.getElementById("startQuiz").addEventListener("click", openQuiz);
    document.getElementById("couplePhoto").addEventListener("click", openQuiz);


    // ---------- QUIZ ----------
    const questions = [
        {
            question: "Mani-ku Akshaya mela kovam vandha maximum time?",
            options: [
                "2 minutes",
                "5 minutes",
                "10 minutes",
                "Kovam varum… but 5 mins-ku mela pesama irukka mudiyadhu 😂❤️"
            ],
            answer: 3
        },
        {
            question: "Akshaya “seri” nu sonna, adhu usually enna meaning?",
            options: [
                "Seri 😇",
                "Seri… but actually NOT seri 😑",
                "Seri da ❤️",
                "Mani, nee danger-la irukka 😂"
            ],
            answer: 1
        },
        {
            question: "Mani-ku Akshaya kitta irundhu most dangerous message edhu?",
            options: [
                "Hmm",
                "Okay",
                "Onnum illa 😇",
                "Onnum illa-nu sonna apram dhaan real danger 😂"
            ],
            answer: 3
        },
        {
            question: "Mani & Akshaya fight pannina first person yaaru compromise pannuva?",
            options: [
                "Mani mattum",
                "Akshaya mattum",
                "Rendu perum konjam konjama",
                "Fight start aana reason-e marandhuduvaanga 😂"
            ],
            answer: 3
        },
        {
            question: "Final and most important question: Akshaya is...?",
            options: [
                "Mani's friend",
                "Mani's bestie",
                "Mani's problem 😂",
                "Mani's Wife ❤️♾️"
            ],
            answer: 3
        }
    ];

    let currentQuestion = 0;
    let score = 0;

    const questionNumber = document.getElementById("qn");
    const question = document.getElementById("question");
    const optionsBox = document.getElementById("options");
    const progressBar = document.getElementById("progress");
    const nextButton = document.getElementById("next");
    const quizMessage = document.getElementById("quizMsg");

    function loadQuestion() {
        const q = questions[currentQuestion];

        questionNumber.textContent =
            "Question " + (currentQuestion + 1) + " of " + questions.length;

        question.textContent = q.question;

        progressBar.style.width =
            ((currentQuestion + 1) / questions.length * 100) + "%";

        optionsBox.innerHTML = "";
        quizMessage.textContent = "";
        nextButton.classList.add("hide");

        q.options.forEach(function (text, index) {
            const button = document.createElement("button");

            button.type = "button";
            button.className = "option";
            button.textContent = text;

            button.addEventListener("click", function () {
                selectAnswer(index, button);
            });

            optionsBox.appendChild(button);
        });
    }

    function selectAnswer(selected, selectedButton) {
        const q = questions[currentQuestion];
        const allOptions = document.querySelectorAll(".option");

        allOptions.forEach(function (button) {
            button.disabled = true;
        });

        if (selected === q.answer) {
            score++;
            selectedButton.classList.add("correct");
            quizMessage.textContent = "Correct madam 😌❤️";
        } else {
            selectedButton.classList.add("wrong");
            allOptions[q.answer].classList.add("correct");
            quizMessage.textContent = "Aiyo 😂 close... but not quite!";
        }

        nextButton.classList.remove("hide");
    }

    nextButton.addEventListener("click", function () {
        currentQuestion++;

        if (currentQuestion < questions.length) {
            loadQuestion();
        } else {
            showResult();
        }
    });


    // ---------- RESULT ----------
    function showResult() {
        showPage(resultPage);

        document.getElementById("score").textContent =
            score + " / " + questions.length + " ❤️";

        const continueButton = document.getElementById("continue");
        const retryButton = document.getElementById("retryQuiz");

        if (score === 5) {
            document.getElementById("icon").textContent = "💍";
            document.getElementById("resultTitle").textContent =
                "OFFICIALLY VERIFIED ❤️";
            document.getElementById("resultText").textContent =
                "Okay madam, next level unlock pannalaam. 😂💍";

            retryButton.classList.add("hide");
            continueButton.classList.remove("hide");
        } else {
            document.getElementById("icon").textContent = "😏";
            document.getElementById("resultTitle").textContent =
                "Almost there!";
            document.getElementById("resultText").textContent =
                "5/5 venum madam... one more try? 😂❤️";

            continueButton.classList.add("hide");
            retryButton.classList.remove("hide");
        }
    }

    document.getElementById("retryQuiz").addEventListener("click", function () {
        openQuiz();
    });

    // 5/5 -> payment page.
    document.getElementById("continue").addEventListener("click", function () {
        showPage(paymentPage);
    });

    // ---------- MAIN LOVE WORLD ----------
    const startStory = document.getElementById("startStory");
    const backToMain = document.getElementById("backToMain");
    const chatStoryImage = document.getElementById("chatStoryImage");
    const chatCaption = document.getElementById("chatCaption");
    const chatDots = document.querySelectorAll("#chatDots span");
    const orbitPhotos = document.querySelectorAll(".orbit-photo");

    const chatSlides = [
        { src: "images/chat/chat1.png", caption: "It all started with these little words... 🥹❤️" },
        { src: "images/chat/chat2.png", caption: "Then came the words I will never forget. 💗" },
        { src: "images/chat/chat3.png", caption: "A little love, a little madness... and a call. 😂❤️" },
        { src: "images/chat/chat4.png", caption: "And suddenly... you became my everything. ♾️❤️" }
    ];

    let chatIndex = 0;
    let chatTimer = null;
    let orbitFrame = null;
    let orbitStart = performance.now();

    function showChatSlide(index) {
        chatIndex = index;
        chatStoryImage.classList.remove("chat-visible");
        chatStoryImage.classList.add("chat-changing");
        setTimeout(function () {
            chatStoryImage.src = chatSlides[index].src;
            chatCaption.textContent = chatSlides[index].caption;
            chatDots.forEach(function (dot, i) {
                dot.classList.toggle("active", i === index);
            });
            chatStoryImage.classList.remove("chat-changing");
            chatStoryImage.classList.add("chat-visible");
        }, 220);
    }

    function startChatSlideshow() {
        if (chatTimer) clearInterval(chatTimer);
        chatTimer = setInterval(function () {
            showChatSlide((chatIndex + 1) % chatSlides.length);
        }, 4300);
    }

    function animateHeartOrbit(now) {
        if (!finalPage.classList.contains("active")) {
            orbitFrame = requestAnimationFrame(animateHeartOrbit);
            return;
        }
        const elapsed = (now - orbitStart) * 0.00022;
        const rect = document.getElementById("heartOrbit").getBoundingClientRect();
        const scale = Math.min(rect.width, rect.height) * 0.027;
        const cx = rect.width / 2;
        const cy = rect.height / 2 + 8;
        orbitPhotos.forEach(function (photo, i) {
            const t = elapsed + (i * Math.PI * 2 / orbitPhotos.length);
            const x = 16 * Math.pow(Math.sin(t), 3);
            const y = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
            const px = cx + x * scale;
            const py = cy + y * scale * 0.92;
            const wobble = Math.sin(t * 2) * 4;
            photo.style.left = px + "px";
            photo.style.top = py + "px";
            photo.style.transform = "translate(-50%, -50%) rotate(" + (wobble + i * 2 - 7) + "deg)";
        });
        orbitFrame = requestAnimationFrame(animateHeartOrbit);
    }

    chatDots.forEach(function (dot, i) {
        dot.addEventListener("click", function () {
            showChatSlide(i);
            startChatSlideshow();
        });
    });

    startStory.addEventListener("click", function () {
        // This is a user gesture, so browsers allow the second song to start here.
        stopMusic(mainMusic);
        showPage(storyPage);
        playMusic(memoriesMusic);
    });

    backToMain.addEventListener("click", function () {
        stopMusic(memoriesMusic);
        showPage(finalPage);
        playMusic(mainMusic);
    });

    // Camera film: mirror photo 03 stays fixed in the center; all other memories roll slowly above and below.
    function buildFilm(id, reverse) {
        const strip = document.getElementById(id);
        if (!strip) return;
        const nums = [];
        for (let i = 1; i <= 32; i++) {
            if (i !== 3) nums.push(i);
        }
        const filmPhotos = nums.concat(nums);
        filmPhotos.forEach(function (n) {
            const frame = document.createElement("div");
            frame.className = "film-frame";
            frame.innerHTML = '<img src="images/memories/' + String(n).padStart(2, "0") + '.jpg" alt="Our memory ' + n + '">';
            strip.appendChild(frame);
        });
        if (reverse) strip.classList.add("reverse");
    }
    buildFilm("filmStripTop", false);
    buildFilm("filmStripBottom", true);

    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        orbitPhotos.forEach(function (photo, i) {
            const t = i * Math.PI * 2 / orbitPhotos.length;
            const rect = document.getElementById("heartOrbit").getBoundingClientRect();
            const scale = Math.min(rect.width, rect.height) * 0.027;
            const cx = rect.width / 2, cy = rect.height / 2 + 8;
            const x = 16 * Math.pow(Math.sin(t), 3);
            const y = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
            photo.style.left = (cx + x * scale) + "px";
            photo.style.top = (cy + y * scale * 0.92) + "px";
        });
    } else {
        orbitFrame = requestAnimationFrame(animateHeartOrbit);
    }
    showChatSlide(0);
    startChatSlideshow();

    // ---------- FUN ₹1 CHALLENGE ----------
    const makePayment = document.getElementById("makePayment");
    const goMainPage = document.getElementById("goMainPage");

    makePayment.addEventListener("click", function () {
        showPage(loveRevealPage);
    });

    goMainPage.addEventListener("click", function () {
        stopMusic(memoriesMusic);
        showPage(finalPage);
        playMusic(mainMusic);
    });

});
