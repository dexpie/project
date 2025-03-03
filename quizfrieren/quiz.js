let currentQuestionIndex = 0;
let score = 0;
let data = {};

// Function to load data from JSON file
fetch('data.json')
    .then(response => response.json())
    .then(json => {
        data = json;
        displayQuestion(); // Initialize quiz once data is loaded
    })
    .catch(error => console.error('Error loading JSON data:', error));

// Function to display the current question
function displayQuestion() {
  if (data.questions.length === 0) {
    alert("Data not loaded correctly.");
    return;
  }

  const questionContainer = document.getElementById('question-container');
  const questionData = data.questions[currentQuestionIndex];
  
  // Clear previous content
  questionContainer.innerHTML = '';
  
  // Display the question
  const questionText = document.createElement('h2');
  questionText.innerText = questionData.question;
  questionContainer.appendChild(questionText);
  
  // Create options
  questionData.options.forEach(option => {
    const optionDiv = document.createElement('div');
    optionDiv.classList.add('option');
    optionDiv.innerText = option.text;
    
    // Add event listener to handle selection
    optionDiv.onclick = () => {
      score += option.points;
      nextQuestion();
    };
    
    questionContainer.appendChild(optionDiv);
  });
}

// Function to move to the next question
function nextQuestion() {
  // Go to the next question
  currentQuestionIndex++;
  
  // Check if we have more questions
  if (currentQuestionIndex < data.questions.length) {
    displayQuestion();
  } else {
    // If no more questions, show the result
    showResult();
  }
}

// Function to display the final result
function showResult() {
  const questionContainer = document.getElementById('question-container');
  const resultContainer = document.getElementById('result-container');
  
  // Find the character based on the score
  const character = data.characters.find(c => score >= c.minPoints && score <= c.maxPoints);
  
  // Show the result
  document.getElementById('result-character').innerText = character.name;
  document.getElementById('result-description').innerText = character.description;
  
  // Set character image
  document.getElementById('result-image').src = character.image;
  
  questionContainer.style.display = 'none'; // Hide the question container
  resultContainer.style.display = 'block'; // Show the result container

  document.getElementById('next-button').style.display = 'none'; // Hide next button after quiz ends
}

// Share to Facebook
function shareOnFacebook() {
    const url = window.location.href;
    const text = `Saya mengikuti kuis karakter Frieren dan saya cocok dengan karakter: ${document.getElementById('result-character').innerText}! Ikuti kuisnya di ${url}`;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`;
    window.open(facebookUrl, '_blank');
}

// Share to Twitter
function shareOnTwitter() {
    const text = `Saya mengikuti kuis karakter Frieren dan saya cocok dengan karakter: ${document.getElementById('result-character').innerText}! Ikuti kuisnya sekarang!`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(twitterUrl, '_blank');
}

// Share to WhatsApp
function shareOnWhatsApp() {
    const text = `Saya mengikuti kuis karakter Frieren dan saya cocok dengan karakter: ${document.getElementById('result-character').innerText}! Ikuti kuisnya di: ${window.location.href}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
}
