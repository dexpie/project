let currentQuestionIndex = 0;
let score = 0;
let data = {};

// Ambil elemen yang diperlukan
const startContainer = document.getElementById('start-container');
const quizContainer = document.getElementById('quiz-container');
const resultContainer = document.getElementById('result-container');
const questionContainer = document.getElementById('question-container');

// Fungsi memulai kuis
function startQuiz() {
    startContainer.style.display = 'none'; // Sembunyikan halaman pembuka
    quizContainer.style.display = 'block'; // Tampilkan kuis

    // Mulai menampilkan pertanyaan
    fetch('data.json')
        .then(response => response.json())
        .then(json => {
            data = json;
            if (data.questions && data.questions.length > 0) {
                displayQuestion();
            } else {
                console.error("Data pertanyaan kosong atau tidak ditemukan.");
            }
        })
        .catch(error => console.error('Gagal memuat JSON:', error));
}

// Fungsi menampilkan pertanyaan
function displayQuestion() {
    if (!data.questions || data.questions.length === 0) {
        console.error("Pertanyaan tidak tersedia.");
        return;
    }

    const questionData = data.questions[currentQuestionIndex];
    if (!questionData || !questionData.options) {
        console.error("Format pertanyaan tidak valid.");
        return;
    }

    // Bersihkan tampilan sebelumnya
    questionContainer.innerHTML = '';

    // Tampilkan teks pertanyaan
    const questionText = document.createElement('h2');
    questionText.innerText = questionData.question;
    questionContainer.appendChild(questionText);

    // Buat pilihan jawaban
    questionData.options.forEach(option => {
        const optionDiv = document.createElement('div');
        optionDiv.classList.add('option');
        optionDiv.innerText = option.text;
        optionDiv.onclick = () => {
            score += option.points;
            nextQuestion();
        };
        questionContainer.appendChild(optionDiv);
    });
}

// Fungsi pindah ke pertanyaan berikutnya
function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < data.questions.length) {
        displayQuestion();
    } else {
        showResult();
    }
}

// Fungsi menampilkan hasil akhir
function showResult() {
    quizContainer.style.display = 'none';
    resultContainer.style.display = 'block';

    // Menentukan karakter berdasarkan skor
    const character = data.characters.find(c => score >= c.minPoints && score <= c.maxPoints);
    
    if (character) {
        document.getElementById('result-character').innerText = character.name;
        document.getElementById('result-description').innerText = character.description;

        // Tampilkan gambar karakter
        const resultImage = document.getElementById('result-image');
        resultImage.src = character.image;
        resultImage.style.display = 'block';
    }
}

// Fungsi berbagi ke media sosial
function shareOnFacebook() {
    const url = window.location.href;
    const text = `Saya cocok dengan karakter ${document.getElementById('result-character').innerText} dari Frieren! Ikuti kuisnya di ${url}`;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`, '_blank');
}

function shareOnTwitter() {
    const text = `Saya cocok dengan karakter ${document.getElementById('result-character').innerText} dari Frieren! Ikuti kuis ini!`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
}

function shareOnWhatsApp() {
    const text = `Saya cocok dengan karakter ${document.getElementById('result-character').innerText} dari Frieren! Ikuti kuis di: ${window.location.href}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
}
