document.addEventListener('DOMContentLoaded', () => {
    const URL = "./model/";
    
    let model, webcam;
    
    async function init() {
        try {
            const modelURL = URL + "model.json";
            const metadataURL = URL + "metadata.json";
    
            model = await tmImage.load(modelURL, metadataURL);
            maxPredictions = model.getTotalClasses();
    
            const flip = true;
            webcam = new tmImage.Webcam(300, 300, flip);
            await webcam.setup();
            await webcam.play();
    
            window.requestAnimationFrame(loop);
    
            document.querySelector("#webcam-container").appendChild(webcam.canvas);
        } catch (error) {
            console.error("Error loading model or initializing webcam: ", error);
        }
    }
    
    async function loop() {
        webcam.update();
        await predict();
        window.requestAnimationFrame(loop);
    }
    
    async function predict() {
        const prediction = await model.predict(webcam.canvas);
        latestPrediction = prediction; 
    }

    let turn = 1;
    let firstPlayerMove, secondPlayerMove;
    let firstPlayerScore = 0;
    let secondPlayerScore = 0;
    const firstPlayerMoveDisplay = document.querySelector('#first-player-display-move');
    const secondPlayerMoveDisplay = document.querySelector('#second-player-display-move');
    const firstPlayerScoreDisplay = document.querySelector('#first-player-score');
    const secondPlayerScoreDisplay = document.querySelector('#second-player-score');
    const history = document.querySelector('#history');
    const winnerContainer = document.querySelector('.winner-container');
    const winnerAnnouncer = document.querySelector('.winner-announcer');

    firstPlayerScoreDisplay.innerText = firstPlayerScore;
    secondPlayerScoreDisplay.innerText = secondPlayerScore;

    const firstPlayerCard = document.querySelector('#first-player-card')
    const secondPlayerCard = document.querySelector('#second-player-card')

    turn % 2 == 1 ? firstPlayerCard.classList.add('background-red') : secondPlayerCard.classList.add('background-yellow');

    function captureImage() {
        const captureButton = document.querySelector('#capture-button');
        let isCapturing = false;

        captureButton.addEventListener('click', () => {
            if (isCapturing) return;
            isCapturing = true;

            const decount = document.querySelector('#decount');
            let countdown = 3;

            const countdownInterval = setInterval(() => {
                decount.textContent = countdown;
                countdown--;

                if (countdown < 0) {
                    clearInterval(countdownInterval);
                    decount.textContent = '';
                }
            }, 1000);

            setTimeout(async () => {
                await predict();
                const closestPrediction = latestPrediction.reduce((prev, current) => (prev.probability > current.probability) ? prev : current);
                if(turn % 2 == 1){
                    firstPlayerMove = closestPrediction.className;
                    secondPlayerCard.classList.toggle('background-yellow');
                    firstPlayerCard.classList.toggle('background-red');
                } else {
                    secondPlayerMove = closestPrediction.className;

                    firstPlayerMoveDisplay.src = `./assets/${firstPlayerMove}.png`; 
                    secondPlayerMoveDisplay.src = `./assets/${secondPlayerMove}.png`;

                    getWinner(firstPlayerMove, secondPlayerMove);

                    winnerContainer.classList.toggle('hidden')

                    secondPlayerCard.classList.toggle('background-yellow');
                    firstPlayerCard.classList.toggle('background-red');
                    const historyEntry = document.createElement('div');
                    historyEntry.className = 'player number 1';
                    historyEntry.innerHTML = `
                        <img src="./assets/${firstPlayerMove}.png" alt="${firstPlayerMove} illustration" class="little-illustration">
                        <img src="./assets/${secondPlayerMove}.png" alt="${secondPlayerMove} illustration" class="little-illustration">
                    `;
                    history.insertBefore(historyEntry, history.firstChild);


                    setTimeout(() => {
                        firstPlayerMoveDisplay.src = `./assets/undefined.png`; 
                        secondPlayerMoveDisplay.src = `./assets/undefined.png`;
                        winnerContainer.classList.toggle('hidden')
                    }, 3000)
                }
                turn++;
                isCapturing = false;
            }, 4000);
        });
    }

    const getWinner = (firstPlayerMove, secondPlayerMove) => {
        if(firstPlayerMove == secondPlayerMove){
            winnerAnnouncer.innerText = 'Egalité !'
            return;
        }

        if (firstPlayerMove == 'pierre') {
            secondPlayerMove == 'feuille' ? winner = 'Joueur 2': winner = 'Joueur 1' ;
        } else if (firstPlayerMove == 'feuille') {
            secondPlayerMove == 'ciseaux' ? winner = 'Joueur 2': winner = 'Joueur 1';
        } else {
            secondPlayerMove == 'pierre' ? winner = 'Joueur 2': winner = 'Joueur 1' ;
        }

        winner == 'Joueur 2' ? secondPlayerScore++ : firstPlayerScore++ ;
        console.log(winner, firstPlayerScore, secondPlayerScore)

        firstPlayerScoreDisplay.innerText = firstPlayerScore;
        secondPlayerScoreDisplay.innerText = secondPlayerScore;
        winnerAnnouncer.innerText = `${winner} gagne !`
    };
    
    init();
    captureImage();
});