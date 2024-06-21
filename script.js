document.addEventListener('DOMContentLoaded', () => {
    // Year in Footer
    const currentYear = new Date().getFullYear();
    document.querySelectorAll("#year, #year2").forEach(el => el.textContent = currentYear);
    
    const gameBoard = document.getElementById('game-board');
    const rowInfo = document.getElementById('row-info');
    const colInfo = document.getElementById('col-info');
    const levelDisplay = document.getElementById('level');
    const coinsDisplay = document.getElementById('coins');
    const collectedDisplay = document.getElementById('collected');
    const messageDisplay = document.getElementById('message');

    let level = 1;
    let coins = 0;
    let collected = 0;
    let board = [];
    let display = [];
    let choice = [];
    let status = true;
    let consecutiveWins = 0; // Track consecutive wins
    let previousLevel = 1; // Track previous level

    const setupGame = () => {
        // Reset board arrays and variables
        board = new Array(25).fill(1);
        display = new Array(25).fill('?');
        choice = [];
        collected = 0;
        status = true;
        messageDisplay.textContent = '';

        // Display level change message
        if (level > previousLevel) {
            messageDisplay.textContent = `Advanced to Game Lv.${level}!`;
        } else if (level < previousLevel) {
            messageDisplay.textContent = `Dropped to Game Lv. ${level}.`;
        }
        
        // Clear the message after a few seconds
        setTimeout(() => {
            messageDisplay.textContent = '';
        }, 1500);

        // Update the previous level
        previousLevel = level;
    
        // Assign new board configuration for the current level
        assignBoard(level);
    
        // Render the game components
        renderBoard(); // Render the game board cells
        renderRowInfo(); // Render row information
        renderColInfo(); // Render column information
        updateStatus(); // Update status displays (level, coins)
    };
    
    const assignBoard = (level) => {
        const randomNum = Math.floor(Math.random() * 5);
        let w, h, o; //w: two, h: three, o: voltorb

        if (level === 1) {
            if (randomNum === 0) { w = 3; h = 1; o = 6; }
            else if (randomNum === 1) { w = 0; h = 3; o = 6; }
            else if (randomNum === 2) { w = 5; h = 0; o = 6; }
            else if (randomNum === 3) { w = 2; h = 2; o = 6; }
            else if (randomNum === 4) { w = 4; h = 1; o = 6; }
        }
        else if (level === 2) {
            if (randomNum === 0) { w = 1; h = 3; o = 7; }
            else if (randomNum === 1) { w = 6; h = 0; o = 7; }
            else if (randomNum === 2) { w = 3; h = 2; o = 7; }
            else if (randomNum === 3) { w = 0; h = 4; o = 7; }
            else if (randomNum === 4) { w = 5; h = 1; o = 7; }
        }
        else if (level === 3) {
            if (randomNum === 0) { w = 2; h = 3; o = 8; }
            else if (randomNum === 1) { w = 7; h = 0; o = 8; }
            else if (randomNum === 2) { w = 4; h = 2; o = 8; }
            else if (randomNum === 3) { w = 1; h = 4; o = 8; }
            else if (randomNum === 4) { w = 6; h = 1; o = 8; }
        }
        else if (level === 4) {
            if (randomNum === 0) { w = 3; h = 3; o = 8; }
            else if (randomNum === 1) { w = 0; h = 5; o = 8; }
            else if (randomNum === 2) { w = 8; h = 0; o = 10; }
            else if (randomNum === 3) { w = 5; h = 2; o = 10; }
            else if (randomNum === 4) { w = 2; h = 4; o = 10; }
        }
        else if (level === 5) {
            if (randomNum === 0) { w = 7; h = 1; o = 10; }
            else if (randomNum === 1) { w = 4; h = 3; o = 10; }
            else if (randomNum === 2) { w = 1; h = 5; o = 10; }
            else if (randomNum === 3) { w = 9; h = 0; o = 10; }
            else if (randomNum === 4) { w = 6; h = 2; o = 10; }
        }
        else if (level === 6) {
            if (randomNum === 0) { w = 3; h = 4; o = 10; }
            else if (randomNum === 1) { w = 0; h = 6; o = 10; }
            else if (randomNum === 2) { w = 8; h = 1; o = 10; }
            else if (randomNum === 3) { w = 5; h = 3; o = 10; }
            else if (randomNum === 4) { w = 2; h = 5; o = 10; }
        }
        else if (level === 7) {
            if (randomNum === 0) { w = 7; h = 2; o = 10; }
            else if (randomNum === 1) { w = 4; h = 4; o = 10; }
            else if (randomNum === 2) { w = 1; h = 6; o = 13; }
            else if (randomNum === 3) { w = 9; h = 1; o = 13; }
            else if (randomNum === 4) { w = 6; h = 3; o = 10; }
        }
        else if (level === 8) {
            if (randomNum === 0) { w = 0; h = 7; o = 10; }
            else if (randomNum === 1) { w = 8; h = 2; o = 10; }
            else if (randomNum === 2) { w = 5; h = 4; o = 10; }
            else if (randomNum === 3) { w = 2; h = 6; o = 10; }
            else if (randomNum === 4) { w = 7; h = 3; o = 10; }
        }
        
        const placeNumbers = (count, value) => {
            for (let i = 0; i < count; i++) {
                while (true) {
                    const index = Math.floor(Math.random() * 25);
                    if (board[index] === 1) {
                        board[index] = value;
                        break;
                    }
                }
            }
        };

        placeNumbers(w, 2);
        placeNumbers(h, 3);
        placeNumbers(o, 0);
    };

    const renderBoard = () => {
        gameBoard.innerHTML = '';
        for (let i = 0; i < 25; i++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.textContent = display[i];
            if (display[i] !== '?') {
                cell.classList.add('revealed');
            }
            cell.addEventListener('click', () => handleCellClick(i));
            gameBoard.appendChild(cell);
        }
    };
    
    const renderRowInfo = () => {
        rowInfo.innerHTML = '';
        for (let i = 0; i < 5; i++) {
            let sum = 0;
            let voltorbs = 0;
            for (let j = 0; j < 5; j++) {
                const value = board[i * 5 + j];
                sum += value;
                if (value === 0) voltorbs++;
            }

            const rowSumTop = document.createElement('div');
            rowSumTop.className = 'row-cell-top';
            rowSumTop.textContent = `${sum.toString().padStart(2, '0')}`;
            const rowSumBottom = document.createElement('div');
            rowSumBottom.className = 'row-cell-bottom';
            rowSumBottom.innerHTML = `<img src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/heartgold-soulsilver/100.png' alt='Voltorb' width='35' height='35'> ${voltorbs}`;

            const rowSumContainer = document.createElement('div');
            rowSumContainer.className = 'row-cell';
            rowSumContainer.appendChild(rowSumTop);
            rowSumContainer.appendChild(rowSumBottom);

            rowInfo.appendChild(rowSumContainer);
        }
    };

    const renderColInfo = () => {
        colInfo.innerHTML = '';
        for (let i = 0; i < 5; i++) {
            let sum = 0;
            let voltorbs = 0;
            for (let j = 0; j < 5; j++) {
                const value = board[j * 5 + i];
                sum += value;
                if (value === 0) voltorbs++;
            }
    
            const colSumTop = document.createElement('div');
            colSumTop.className = 'col-cell-top';
            colSumTop.textContent = `${sum.toString().padStart(2, '0')}`;
            const colSumBottom = document.createElement('div');
            colSumBottom.className = 'col-cell-bottom';
            colSumBottom.innerHTML = `<img src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/heartgold-soulsilver/100.png' alt='Voltorb' width='35' height='35'> ${voltorbs}`;
    
            const colSumContainer = document.createElement('div');
            colSumContainer.className = 'col-cell';
            colSumContainer.appendChild(colSumTop);
            colSumContainer.appendChild(colSumBottom);
    
            colInfo.appendChild(colSumContainer);
        }
    
        // Create an extra invisible box at the end
        const invisibleBox = document.createElement('div');
        invisibleBox.className = 'col-cell invisible-box';
        colInfo.appendChild(invisibleBox);
    };
    
    const handleCellClick = (index) => {
        if (display[index] !== '?') return;
        gameBoard.children[index].classList.add('revealed');
    
        if (board[index] === 0) {
            display[index] = '🚫';
            messageDisplay.textContent = 'Oh no! You get 0 Coins!';
            status = false;
    
            // Set all cells to 'revealed' if they are not already revealed
            for (let i = 0; i < display.length; i++) {
                if (display[i] === '?') {
                    // Replace '0' with '🚫'
                    display[i] = board[i] === 0 ? '🚫' : board[i].toString();
                    gameBoard.children[i].classList.add('revealed');
                    collected = 0;
                }
            }
    
            renderBoard(); // Re-render the board to show all numbers
            endGame();
        } else {
            display[index] = board[index].toString();
            collected = collected === 0 ? board[index] : collected * board[index];
            choice.push(index);
            renderBoard();
            renderRowInfo(); // Update row information
            renderColInfo(); // Update column information
            checkGameStatus();
        }
    
        collectedDisplay.textContent = collected; // Update collected coins display
    };
        
    const checkGameStatus = () => {
        const uncovered = choice.filter(i => board[i] === 2 || board[i] === 3).length;
        const total = board.filter(i => i === 2 || i === 3).length;

        if (uncovered === total) {
            // Check if game win conditions are met
            const multiplierCount = choice.filter(i => board[i] === 2 || board[i] === 3).length;

            if (multiplierCount >= 8) {
                consecutiveWins++;
            } else {
                consecutiveWins = 0; // Reset consecutive wins if win condition not met
            }

            // Check if consecutiveWins equals five to advance to Level 8
            if (consecutiveWins === 5) {
                level = 8;
                updateStatus();
                setTimeout(() => setupGame(), 2000);
                return;
            }

            // Proceed with normal game completion logic
            messageDisplay.textContent = `Game Clear! You received ${collected} Coins!`;
            coins += collected;
            collected = 0;
            if (level < 7) level++;
            updateStatus();

            // Reveal all cells
            for (let i = 0; i < display.length; i++) {
                if (display[i] === '?') {
                    display[i] = board[i] === 0 ? '🚫' : board[i].toString();
                    gameBoard.children[i].classList.add('revealed');
                }
            }

            renderBoard(); // Re-render the board to show all numbers
            setTimeout(() => setupGame(), 2000);
        }
    };

    const endGame = () => {
        level = choice.length > level ? level : Math.max(1, choice.length);
        updateStatus();
        setTimeout(() => setupGame(), 2000);
    };

    const updateStatus = () => {
        levelDisplay.textContent = level;
        coinsDisplay.textContent = coins;
    };

    setupGame();
});
