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
	        puzzleWord.appendChild(blank);
		}
	}
// }

// Function to fill out letter matches in the puzzle when the user selects a letter from the alphabet
function letterSelection(event) {
// Get the class name for the clicked letter and the related blanks
	let clickedLetter = event.className;
	let blankMatch = document.getElementById('puzzle').getElementsByClassName(clickedLetter);
// Disable the clicked alphabet button
	let clickedButton = document.getElementById('alphabet').getElementsByClassName(clickedLetter)[0]
	clickedButton.disabled = true
// Get the letter clicked in the alphabet and replace it with the strikethrough version
	let clickedAlphabet = document.getElementById('alphabet').getElementsByClassName(clickedLetter)[0].getElementsByTagName('img');
	let letterStrikethrough = clickedAlphabet[0].src = 'assets/images/' + clickedLetter + '-selected.png'
// Change the cursor to default for the clicked letter
	clickedAlphabet[0].style.cursor = 'default'

// Replace all relevant blank puzzle letters with the selected alphabet letter
	if (blankMatch.length > 0) {
		for (let i = 0; i < blankMatch.length; i++) {
			let replaceLetter = blankMatch[i].src = 'assets/images/' + clickedLetter + '.png'
			blankMatch[i].style.marginTop = '-44px';
		}
// TODO: If statement to check for the last hangman image (8) and "Game over" if reached		
	} else {
// Replace the hangman image for every wrong answer
			let hangman = document.getElementById('hangman-image').getElementsByTagName('img');
			hangmanAttr = hangman[0].getAttribute('src')
			hangmanSrc = hangmanAttr.substr(0, 22)
			hangmanNr = hangmanAttr.substr(22, 1)
			let hangmanHung = hangman[0].src = hangmanSrc + (Number(hangmanNr) + 1) + '.png'
	}
}