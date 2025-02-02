<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ultimate Quiz App</title>
</head>
<body>
  <h1>Ultimate Quiz App</h1>
  <p>A fun and interactive quiz app where users can test their knowledge across multiple categories, earn points, and keep track of their score! With gamified effects, timers, and beautiful UI design, it offers an engaging experience for users.</p>

  <h2>Features</h2>
  <ul>
    <li><strong>Dynamic Quiz Flow</strong>: Seamlessly move from one question to another with time-based restrictions.</li>
    <li><strong>Gamified Effects</strong>: Celebrate correct answers with confetti, increase your streak, and earn points.</li>
    <li><strong>Interactive UI</strong>: Animated buttons, icons, and transitions for a fun and engaging experience.</li>
    <li><strong>Timer</strong>: Each question has a time limit to answer, adding excitement to the quiz.</li>
    <li><strong>Score Tracking</strong>: Track your score throughout the quiz and see your final score at the end.</li>
    <li><strong>Explanation for Answers</strong>: Get detailed solutions for the answers at the end of each question.</li>
  </ul>

  <h2>Technologies Used</h2>
  <ul>
    <li><strong>React.js</strong>: For building the user interface.</li>
    <li><strong>React Spring</strong>: For smooth animations and transitions.</li>
    <li><strong>Framer Motion</strong>: For advanced animations and motion effects.</li>
    <li><strong>React Confetti</strong>: To celebrate correct answers with a confetti explosion.</li>
    <li><strong>Tailwind CSS</strong>: For responsive design and styling.</li>
    <li><strong>Lucide Icons</strong>: For interactive and customizable icons.</li>
  </ul>

  <h2>Installation</h2>
  <p>Follow these steps to get the project up and running:</p>
  <ol>
    <li><strong>Clone the repository:</strong></li>
    <pre><code>git clone https://github.com/yourusername/ultimate-quiz-app.git</code></pre>
    
    <li><strong>Navigate to the project directory:</strong></li>
    <pre><code>cd ultimate-quiz-app</code></pre>
    
    <li><strong>Install the required dependencies:</strong></li>
    <pre><code>npm install</code></pre>
    
    <li><strong>Start the development server:</strong></li>
    <pre><code>npm start</code></pre>
    
    <p>Open <a href="http://localhost:3000">http://localhost:3000</a> in your browser to view the app.</p>
  </ol>

  <h2>Configuration</h2>
  <p>The quiz app fetches quiz data from a <strong>JsonData.json</strong> file. Ensure that the file is available in the correct path (inside the <code>public/</code> folder). You can modify or add more quiz questions to this JSON file as needed.</p>
  
  <h3>Example structure for <code>JsonData.json</code>:</h3>
  <pre><code>
{
  "title": "Ultimate Knowledge Quiz",
  "description": "Test your knowledge in various topics!",
  "duration": 30,
  "questions": [
    {
      "id": 1,
      "description": "What is the capital of France?",
      "options": [
        {
          "id": 1,
          "description": "Berlin",
          "is_correct": false
        },
        {
          "id": 2,
          "description": "Madrid",
          "is_correct": false
        },
        {
          "id": 3,
          "description": "Paris",
          "is_correct": true
        },
        {
          "id": 4,
          "description": "Rome",
          "is_correct": false
        }
      ],
      "detailed_solution": "The capital of France is Paris."
    }
  ],
  "max_mistake_count": 3
}
  </code></pre>

  <h2>How to Play</h2>
  <ol>
    <li><strong>Start Quiz</strong>: Click on the "Start Quiz" button to begin.</li>
    <li><strong>Answer Questions</strong>: Choose an answer from the options presented.</li>
    <li><strong>Next Question</strong>: Once you answer, click "Next Question" to proceed.</li>
    <li><strong>View Score</strong>: After finishing the quiz, your total score will be displayed, along with the time taken and the number of correct answers.</li>
  </ol>

  <h2>Contribution</h2>
  <p>Feel free to fork the repository, make improvements, and submit pull requests. If you find any bugs or issues, please report them in the "Issues" section of the repository.</p>

  <h2>License</h2>
  <p>This project is licensed under the MIT License - see the LICENSE file for details.</p>
</body>
</html>
