document.addEventListener('DOMContentLoaded', () => {
    let randomNumber = generateRandomNumber();
    let attempts = 0;

    const guessInput = document.getElementById('guessInput');
    const checkBtn = document.getElementById('checkBtn');
    const message = document.getElementById('message');
    const attemptsDisplay = document.getElementById('attempts');
    const resetBtn = document.getElementById('resetBtn');

    function generateRandomNumber() {
        return Math.floor(Math.random() * 100) + 1;
    }

    function updateMessage(text, isSuccess = false) {
        message.textContent = text;
        message.className = 'message ' + (isSuccess ? 'success' : 'error');
    }

    function checkGuess() {
        const userGuess = parseInt(guessInput.value);

        if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
            updateMessage('Please enter a valid number between 1 and 100');
            return;
        }

        attempts++;
        attemptsDisplay.textContent = `Attempts: ${attempts}`;

        if (userGuess === randomNumber) {
            updateMessage('Congratulations! You got it right! 🎉', true);
            checkBtn.disabled = true;
            guessInput.disabled = true;
        } else if (userGuess < randomNumber) {
            updateMessage('Too low! Try a higher number 👆');
        } else {
            updateMessage('Too high! Try a lower number 👇');
        }

        guessInput.value = '';
        guessInput.focus();
    }

    function resetGame() {
        randomNumber = generateRandomNumber();
        attempts = 0;
        attemptsDisplay.textContent = 'Attempts: 0';
        message.textContent = '';
        guessInput.value = '';
        checkBtn.disabled = false;
        guessInput.disabled = false;
        guessInput.focus();
    }

    checkBtn.addEventListener('click', checkGuess);
    resetBtn.addEventListener('click', resetGame);

    guessInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            checkGuess();
        }
    });


    guessInput.focus();
});