document.addEventListener('DOMContentLoaded', () => {
    const navbarLinks = document.querySelectorAll('#navbar a');
    const sections = document.querySelectorAll('section');

    function changeActiveLink() {
        let index = sections.length;

        while(--index && window.scrollY + 50 < sections[index].offsetTop) {}

        navbarLinks.forEach((link) => link.classList.remove('active'));
        navbarLinks[index].classList.add('active');
    }

    changeActiveLink();
    window.addEventListener('scroll', changeActiveLink);

    navbarLinks.forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelector(link.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

const questions = [
    {
        question: "What is the maximum level for the Town Hall in Clash of Clans as of 2024?",
        choices: ["13           ", 
                  "14           ", 
                  "15           ", 
                  "16           "],
        correctAnswer: 3
    },
    {
        question: "At which Town Hall the first hero unlockes?",
        choices: ["6", "7", "8", "9"],
        correctAnswer: 1
    },
    {
        question: "What does P.E.K.K.A. stand for?",
        choices: ["Powerful Energetic Knight of Kinetic Armor", 
                  "Primary Energetic Knight of Kinetic Attacks", 
                  "Perfectly Enraged Knight Killer of Assassins", 
                  "Purple Energetic Knightly Kinetic Armor"],
        correctAnswer: 2
    },
    {
        question: "What are the primary resources in Clash of Clans?",
        choices: ["Gold       ", 
                  "Elixir     ", 
                  "Dark Elixir", 
                  "All of them"],
        correctAnswer: 3
    },
    {
        question: "At which Town Hall you can join a clan?",
        choices: ["2", "3", "4", "5"],
        correctAnswer: 1
    }
];
function displayQuiz() {
    const quizContainer = document.getElementById('quiz');
    quizContainer.innerHTML = questions.map((q, index) => `
        <div>
            <h3>${q.question}</h3>
            ${q.choices.map((choice, i) => `
                <label>
                    <input type="radio" name="question${index}" value="${i}">
                    ${choice}
                </label>
            `).join('')}
        </div>
    `).join('');
}

function submitQuiz() {
    const resultContainer = document.getElementById('result');
    let score = 0;

    questions.forEach((q, index) => {
        const selectedAnswer = document.querySelector(`input[name="question${index}"]:checked`);
        if (selectedAnswer && parseInt(selectedAnswer.value) === q.correctAnswer) {
            score++;
        }
    });

    resultContainer.innerHTML = `You scored ${score} out of ${questions.length}`;
}

displayQuiz();

