const recommendedList = document.getElementById("recommended-list");

const games = [
    {
        id: "cs2",
        title: "Counter Strike 2",
        genre: "Шутер",
        rating: "4.8 / 5",
        players: "125 000",
        image: "images/cs2.jpg"
    },
    {
        id: "dota2",
        title: "Dota 2",
        genre: "MOBA",
        rating: "4.6 / 5",
        players: "98 000",
        image: "images/dota2.jpg"
    },
    {
        id: "fortnite",
        title: "Fortnite",
        genre: "Королівська битва",
        rating: "4.5 / 5",
        players: "210 000",
        image: "images/fortnite.jpg"
    },
    {
        id: "valorant",
        title: "Valorant",
        genre: "Тактичний шутер",
        rating: "4.7 / 5",
        players: "150 000",
        image: "images/valorant.jpg"
    },
    {
        id: "apex",
        title: "Apex Legends",
        genre: "Королівська битва",
        rating: "4.2 / 5",
        players: "50 000",
        image: "images/APEX.jpg"
    },
    {
        id: "pubg",
        title: "PUBG",
        genre: "Королівська битва",
        rating: "4.4 / 5",
        players: "75 000",
        image: "images/PUBG.jpg"
    }
];

let usedGames = [];
let i = 0;

while (i < 3) {
    const randomIndex = Math.floor(Math.random() * games.length);
    const game = games[randomIndex];

    if (!usedGames.includes(game.id)) {
        const card = document.createElement("article");
        card.classList.add("game-card");
        card.classList.add("recommended-card");
        card.setAttribute("data-game", game.id);

        card.innerHTML = `
            <img src="${game.image}" alt="${game.title}">
            <h3>${game.title}</h3>
            <p><strong>Жанр:</strong> ${game.genre}</p>
            <p><strong>Рейтинг:</strong> ${game.rating}</p>
            <p><strong>Активних гравців:</strong> ${game.players}</p>
            <button class="favorite-btn">Додати до улюблених</button>
        `;

        recommendedList.appendChild(card);

        usedGames.push(game.id);
        i++;
    }
}
const favoriteButtons = document.querySelectorAll(".favorite-btn");

for (let i = 0; i < favoriteButtons.length; i++) {
    favoriteButtons[i].addEventListener("dblclick", function () {
        const card = this.closest(".game-card");
        const gameId = card.getAttribute("data-game");

        const sameGames = document.querySelectorAll(`[data-game="${gameId}"]`);

        if (card.classList.contains("favorite")) {
            for (let j = 0; j < sameGames.length; j++) {
                sameGames[j].classList.remove("favorite");

                const btn = sameGames[j].querySelector(".favorite-btn");
                btn.textContent = "Додати до улюблених";
            }
        } else {
            for (let j = 0; j < sameGames.length; j++) {
                sameGames[j].classList.add("favorite");

                const btn = sameGames[j].querySelector(".favorite-btn");
                btn.textContent = "В улюблених";
            }
        }
    });
}
  const progressBar = document.getElementById("progress-bar");
    const progressText = document.getElementById("progress-text");

    let playedGames = 7;
    let gamesForNextReward = 10;

    let progressPercent = (playedGames / gamesForNextReward) * 100;
    let gamesLeft = gamesForNextReward - playedGames;

    // ОБОВʼЯЗКОВИЙ рядок — задає ширину
    progressBar.style.width = progressPercent + "%";

    if (gamesLeft === 0) {
        progressText.textContent = "Нагорода вже доступна!";
    } else if (gamesLeft === 1) {
        progressText.textContent = "До наступної нагороди залишилась 1 гра";
    } else if (gamesLeft > 1 && gamesLeft < 5) {
        progressText.textContent = "До наступної нагороди залишилось " + gamesLeft + " гри";
    } else {
        progressText.textContent = "До наступної нагороди залишилось " + gamesLeft + " ігор";
    }

    const submitCommentBtn = document.getElementById("submit-comment");
const userNameInput = document.getElementById("user-name");
const userCommentInput = document.getElementById("user-comment");
const commentsList = document.getElementById("comments-list");

submitCommentBtn.addEventListener("click", function () {
    const userName = userNameInput.value.trim();
    const userComment = userCommentInput.value.trim();

    if (userName === "" || userComment === "") {
        alert("Будь ласка, заповніть усі поля.");
    } else {
        const commentItem = document.createElement("div");
        commentItem.classList.add("comment-item");

        commentItem.innerHTML = `
            <h3>${userName}</h3>
            <p>${userComment}</p>
        `;

        commentsList.appendChild(commentItem);

        userNameInput.value = "";
        userCommentInput.value = "";
    }
});
const toggleRecommendedBtn = document.getElementById("toggle-recommended");
const recommendedBlock = document.getElementById("recommended-list");

toggleRecommendedBtn.addEventListener("click", function () {
    if (recommendedBlock.style.display === "none") {
        recommendedBlock.style.display = "flex";
        toggleRecommendedBtn.textContent = "Сховати рекомендації";
    } else {
        recommendedBlock.style.display = "none";
        toggleRecommendedBtn.textContent = "Показати рекомендації";
    }
});