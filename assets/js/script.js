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
	let position = document.getElementById('puzzle')
	let randomMovie = movies[Math.floor(Math.random() * movies.length)]
	let words = randomMovie.split(' ')

// TESTING ONLY
	// console.log(randomMovie)
	// console.log(words)
	// console.log(words.length)

// Count the number of words in the movie name to create separate divs
	for (let word = 0; word < words.length; word++) {
		let puzzleWord = document.createElement('div')
		puzzleWord.classList.add('puzzle-word')
		position.appendChild(puzzleWord)

// Count the number of letters in each word to create the blank imagesfor each letter
	  	for (let letter = 0; letter < words[word].length; letter++) {
	 		let blank = document.createElement('img');
	 		blank.src = 'assets/images/hangman-puzzle.png';
	 		blank.classList.add(words[word][letter].toLowerCase())
	        puzzleWord.appendChild(blank);
		}
	}
// }

// Function to run when the user selects a letter for the puzzle
function letterSelection(event) {
	let clickedLetter = event.className
	console.log(clickedLetter)
}