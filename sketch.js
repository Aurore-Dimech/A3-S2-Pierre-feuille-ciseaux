document.addEventListener('DOMContentLoaded', () => {

    let classifier;
    const URL = "./model/";
    
    let model, webcam, labelContainer, maxPredictions;
    
    async function init() {
        try {
            const modelURL = URL + "model.json";
            const metadataURL = URL + "metadata.json";
    
            // Load the model
            model = await tmImage.load(modelURL, metadataURL);
            maxPredictions = model.getTotalClasses();
    
            // Setup webcam
            const flip = true;
            webcam = new tmImage.Webcam(200, 200, flip);
            await webcam.setup();
            await webcam.play();
    
            // Start the loop
            window.requestAnimationFrame(loop);
    
            // Append the webcam canvas to the container
            document.querySelector("#webcam-container").appendChild(webcam.canvas);
        
            labelContainer = document.getElementById("label-container");
    
            // Create label elements
            for (let i = 0; i < maxPredictions; i++) { 
                labelContainer.appendChild(document.createElement("div"));
            }
    
            console.log("Webcam and model are ready.");
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
        for (let i = 0; i < maxPredictions; i++) {
            const classPrediction = prediction[i].className + ": " + prediction[i].probability.toFixed(2);
            labelContainer.childNodes[i].innerHTML = classPrediction;
        }
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

    firstPlayerScoreDisplay.innerText = firstPlayerScore;
    secondPlayerScoreDisplay.innerText = secondPlayerScore;

    function captureImage() {
        const captureButton = document.getElementById('capture-button');
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
                console.log("Closest Prediction: ", closestPrediction);
                if(turn % 2 == 1){
                    firstPlayerMove = closestPrediction.className;
                } else {
                    secondPlayerMove = closestPrediction.className;

                    firstPlayerMoveDisplay.src = `./assets/${firstPlayerMove}.png`; 
                    secondPlayerMoveDisplay.src = `./assets/${secondPlayerMove}.png`;

                    getWinner(firstPlayerMove, secondPlayerMove);

                    const historyEntry = document.createElement('div');
                    historyEntry.className = 'player number 1';
                    historyEntry.innerHTML = `
                        <img src="./assets/${firstPlayerMove}.png" alt="${firstPlayerMove} illustration" class="little-illustration">
                        <img src="./assets/${secondPlayerMove}.png" alt="${secondPlayerMove} illustration" class="little-illustration">
                    `;
                    history.insertBefore(historyEntry, history.firstChild); // Insert as the first child
                }
                turn++;
                isCapturing = false;
            }, 4000);
        });
    }

    const getWinner = (firstPlayerMove, secondPlayerMove) => {
        if(firstPlayerMove == secondPlayerMove){
            return;
        }

        if (firstPlayerMove == 'pierre') {
            secondPlayerMove == 'feuille' ? secondPlayerScore++ : firstPlayerScore++;
        } else if (firstPlayerMove == 'feuille') {
            secondPlayerMove == 'ciseaux' ? secondPlayerScore++ : firstPlayerScore++;
        } else {
            secondPlayerMove == 'pierre' ? secondPlayerScore++ : firstPlayerScore++;
        }

        firstPlayerScoreDisplay.innerText = firstPlayerScore;
        secondPlayerScoreDisplay.innerText = secondPlayerScore;
    };
    
    // Initialize the app
    init();
    captureImage();
});