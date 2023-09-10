// List of movies for the puzzle
const movies = ['Rocky Horror Picture Show',
'Hocus Pocus',
'Scream',
'The Addams Family',
'The Omen',
'Rosemarys Baby',
'A Nightmare on Elm Street',
'The Haunted Mansion',
'The Shining',
'Halloweentown',
'Childs Play',
'Beetlejuice',
'The Exorcist',
'Carrie',
'The Craft',
'Paranormal Activity',
'Practical Magic',
'The Nightmare Before Christmas',
'The Witches of Eastwick',
'The Ring',
'Death Becomes Her',
'Sleepy Hollow',
'Dracula',
'Psycho',
'Interview with a Vampire',
'The Witches']

// Variables for hiding/displaying sections on-clicks
	let newGame = document.getElementById('new-game');
	let wonGame = document.getElementById('won-game');
	let lostGame = document.getElementById('lost-game');
	let puzzleAreas = document.getElementById('puzzle-areas');

function blankPuzzle() {
// Set necessary variables for movie name and length
	let position = document.getElementById('puzzle');
	let randomMovie = movies[Math.floor(Math.random() * movies.length)];
	let words = randomMovie.split(' ');

// Remove all previous puzzle images to reset for the new blank puzzle
	let puzzleWordEle = document.getElementsByClassName('puzzle-word');
    while (puzzleWordEle.length > 0) {
        puzzleWordEle[0].parentNode.removeChild(puzzleWordEle[0]);
    }

// Replace the hangman image with the blank/starting image
    let hangman = document.getElementById('hangman-image').getElementsByTagName('img')[0];
    hangman.src = 'assets/images/hangman-1.png'

// Replace the selected alphabet images, styling, and functions with blank alphabet defaults
    let alphabet = document.getElementById('alphabet').getElementsByTagName('button');
    for (let alphaButtons = 0; alphaButtons < alphabet.length; alphaButtons++) {
    	let alphabetClass = alphabet[alphaButtons].classList[0];
    	let alphaLetter = document.getElementById('alphabet').getElementsByTagName('img')[alphaButtons];
    	alphaLetter.src = 'assets/images/' + alphabetClass + '.png';
    	alphabet[alphaButtons].disabled = false;
    	alphaLetter.style.cursor = 'pointer';
    }

// TESTING
	console.log(randomMovie);

// Count the number of words in the movie name to create separate divs
	for (let word = 0; word < words.length; word++) {
		let puzzleWord = document.createElement('div');
		puzzleWord.classList.add('puzzle-word');
		position.appendChild(puzzleWord);

// Count the number of letters in each word to create the blank images for each letter
	  	for (let letter = 0; letter < words[word].length; letter++) {
	 		let blank = document.createElement('img');
	 		blank.src = 'assets/images/blank.png';
	 		blank.classList.add(words[word][letter].toLowerCase());
	 		blank.classList.add('blank');
	        puzzleWord.appendChild(blank);
		}
	}

// Hide all new game areas and display the puzzle
	newGame.style.display = 'none';
	wonGame.style.display = 'none';
	lostGame.style.display = 'none';
	puzzleAreas.style.display = 'inherit';
}

// Function to fill out letter matches in the puzzle when the user selects a letter from the alphabet
function letterSelection(event) {
// Get the class name for the clicked letter and the related blanks
	let clickedLetter = event.className;
	let blankMatch = document.getElementById('puzzle').getElementsByClassName(clickedLetter);
// Get the clicked alphabet button
	let clickedButton = document.getElementById('alphabet').getElementsByClassName(clickedLetter)[0];
// Get the letter image clicked in the alphabet
	let clickedAlphabet = document.getElementById('alphabet').getElementsByClassName(clickedLetter)[0].getElementsByTagName('img');	
// Get the puzzle images
	let puzzleImages = document.getElementById('puzzle').getElementsByTagName('img');	
// Get the stage of the hangman image and set various variables
	let hangman = document.getElementById('hangman-image').getElementsByTagName('img');
	let hangmanAttr = hangman[0].getAttribute('src');
	let hangmanSrc = hangmanAttr.substr(0, 22);
	let hangmanNr = Number(hangmanAttr.substr(22, 1));

// Function to disable the clicked letter, replace the image with a strikethrough image, and set the cursor style to default
	function clickActions() {
		clickedButton.disabled = true;
		let letterStrikethrough = clickedAlphabet[0].src = 'assets/images/' + clickedLetter + '-selected.png';
		clickedAlphabet[0].style.cursor = 'default';
	}

// Check to see if there are still blanks in the puzzle
	function puzzleStage() {
		let blankPresent = 0;
		for (let pImg = 0; pImg < puzzleImages.length; pImg++) {
			if (puzzleImages[pImg].classList.contains('blank')) {
				blankPresent++;
			}
		}
		return blankPresent;
	}

// Check the latest puzzle stage to get the blankPresent variable
	let blankPresent = puzzleStage();

// If the user clicks a letter that is present in the puzzle...
	if (blankMatch.length > 0 && hangmanNr < 8 && blankPresent > 0) {
// Run functions to update the clicked button
		clickActions();
// Replace all relevant blank puzzle letters with the selected alphabet letter
		for (let match = 0; match < blankMatch.length; match++) {
			let replaceLetter = blankMatch[match].src = 'assets/images/' + clickedLetter + '.png';
			blankMatch[match].classList.remove('blank');			
		}
// Check if any blanks remain in the puzzle
		blankPresent = puzzleStage()
		if (blankPresent === 0) {
			setTimeout(() => {
// If none remain, the user won, switch to the Congratulations screen
				puzzleAreas.style.display = 'none';
				wonGame.style.display = 'inherit';
			}, 750);
		}
// If the user clicks a letter that is not in the puzzle...
	} else if (blankMatch.length === 0 && hangmanNr < 7 && blankPresent > 0) {
// Run functions to update the clicked button
		clickActions();
// Replace the hangman image for every wrong answer
		let hangmanHung = hangman[0].src = hangmanSrc + (hangmanNr + 1) + '.png';
// If the user clicks a letter that is not in the puzzle and it's their last chance...
	} else if (blankMatch.length === 0 && hangmanNr === 7 && blankPresent > 0) {
// Run functions to update the clicked button
		clickActions();
// Replace the hangman image for the wrong answer and switch to the Game Over screen
		let hangmanHung = hangman[0].src = hangmanSrc + (hangmanNr + 1) + '.png';
		setTimeout(() => {
			puzzleAreas.style.display = 'none';
			lostGame.style.display = 'inherit';
		}, 750);
	}
}