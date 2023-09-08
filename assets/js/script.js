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

// function blankPuzzle() {
// Set necessary variables for movie name and length
	let position = document.getElementById('puzzle');
	let randomMovie = movies[Math.floor(Math.random() * movies.length)];
	let words = randomMovie.split(' ');

// TESTING
	console.log(randomMovie)

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
	 		blank.classList.add('blank')
	        puzzleWord.appendChild(blank);
		}
	}
// }

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
				blankPresent++
			}
		}
		return blankPresent
	}

// Check the latest puzzle stage to get the blankPresent variable
	let blankPresent = puzzleStage() 

// If the user clicks a letter that is present in the puzzle...
	if (blankMatch.length > 0 && hangmanNr < 8 && blankPresent > 0) {
// Run functions to update the clicked button
		clickActions()
// Replace all relevant blank puzzle letters with the selected alphabet letter
		for (let match = 0; match < blankMatch.length; match++) {
			let replaceLetter = blankMatch[match].src = 'assets/images/' + clickedLetter + '.png';
			blankMatch[match].classList.remove('blank');
			blankMatch[match].style.marginTop = '-44px';
		}
// Check if any blanks remain in the puzzle
		blankPresent = puzzleStage()
		if (blankPresent === 0) {
			setTimeout(() => {
// If none remain, the user won
				alert('You won!')}, 200);
		}
// If the user clicks a letter that is not in the puzzle...
	} else if (blankMatch.length === 0 && hangmanNr < 7 && blankPresent > 0) {
// Run functions to update the clicked button
		clickActions()
// Replace the hangman image for every wrong answer
		let hangmanHung = hangman[0].src = hangmanSrc + (hangmanNr + 1) + '.png';
// If the user clicks a letter that is not in the puzzle and it's their last chance...
	} else if (blankMatch.length === 0 && hangmanNr === 7 && blankPresent > 0) {
// Run functions to update the clicked button
		clickActions()
// Replace the hangman image for the wrong answer and provide Game Over message
		let hangmanHung = hangman[0].src = hangmanSrc + (hangmanNr + 1) + '.png';
		setTimeout(() => {
			alert('Game Over');}, 200);
// If the user keeps trying to play, ask them to start a new game
	} else {
		alert('Please start a new game');
	}
}