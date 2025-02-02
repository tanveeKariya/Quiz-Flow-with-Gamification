import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactConfetti from 'react-confetti';
import { Brain, Trophy, X, Check, Play, Star, Clock, Heart } from 'lucide-react';
import { useSpring, animated } from 'react-spring';

interface Option {
  id: number;
  description: string;
  is_correct: boolean;
}

interface Question {
  id: number;
  description: string;
  options: Option[];
  detailed_solution: string;
}

interface Quiz {
  title: string;
  description: string;
  duration: number;
  questions: Question[];
  max_mistake_count: number;
}

function App() {
  const [quizData, setQuizData] = useState<Quiz | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showExplanation, setShowExplanation] = useState<number | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [timeTaken, setTimeTaken] = useState(0);
  const [timer, setTimer] = useState(30);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [streak, setStreak] = useState(0);
  
  const { scale } = useSpring({ scale: isStarted ? 1.1 : 1, from: { scale: 1 } });

  useEffect(() => {
    fetch('/JsonData.json')
      .then(response => response.json())
      .then(data => setQuizData(data));
  }, []);

  useEffect(() => {
    if (isStarted && timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (isStarted) {
      handleNextQuestion();
    }
  }, [timer, isStarted]);

  const handleAnswerSelect = (questionId: number, optionId: number) => {
    if (selectedAnswers[questionId]) return;
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionId }));
    
    const question = quizData?.questions[currentQuestionIndex];
    const selectedOption = question?.options.find(opt => opt.id === optionId);
    
    if (selectedOption?.is_correct) {
      setScore(prev => prev + 4 + streak);
      setCorrectAnswers(prev => prev + 1);
      setStreak(prev => prev + 1);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    } else {
      setStreak(0);
    }
    setShowExplanation(questionId);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < (quizData?.questions.length || 0) - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setTimer(30);
      setTimeTaken(prev => prev + (30 - timer));
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    setIsCompleted(true);
    setTimeTaken(prev => prev + (30 - timer));
    localStorage.setItem('topScore', JSON.stringify(score));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-blue-600 opacity-20 rounded-full animate-pulse"></div>
      {showConfetti && <ReactConfetti recycle={false} numberOfPieces={200} />}
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-8 text-center z-10 relative">
        {!isStarted ? (
          <motion.div style={{ scale }}>
            <h1 className="text-4xl font-bold text-gray-800 mb-6 transform transition-all ease-in-out duration-300">
              Welcome to the Ultimate Quiz!
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Test your knowledge and earn points while having fun.
            </p>
            <motion.button
              onClick={() => setIsStarted(true)}
              className="mt-6 bg-blue-500 text-white text-lg py-3 px-6 rounded-lg shadow-lg flex items-center justify-center mx-auto hover:bg-blue-600 transition duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Play className="w-6 h-6 mr-2" /> Start Quiz
            </motion.button>
            <div className="mt-4 text-left text-lg text-gray-600">
              <h2 className="font-bold text-gray-800">Instructions:</h2>
              <ul className="list-disc ml-6">
                <li>Answer each question within the time limit.</li>
                <li>Earn points for correct answers and increase your streak.</li>
                <li>Click "Next" to move on to the next question.</li>
                <li>Complete the quiz to see your score and time taken.</li>
              </ul>
            </div>
          </motion.div>
        ) : isCompleted ? (
          <div>
            <h1 className="text-3xl font-bold mb-4">Quiz Completed!</h1>
            <p className="text-lg mb-4">Total Score: <span className="text-blue-500 font-bold">{score}</span></p>
            <p className="text-lg mb-4">Time Taken: {timeTaken} seconds</p>
            <p className="text-lg mb-4">Total Correct: {correctAnswers}</p>
            <p className="text-lg mb-6">Highest Score: {localStorage.getItem('topScore')}</p>
            <motion.button
              onClick={() => window.location.reload()}
              className="mt-6 bg-green-500 text-white text-lg py-3 px-6 rounded-lg shadow-lg flex items-center justify-center mx-auto hover:bg-green-600 transition duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Check className="w-6 h-6 mr-2" /> Restart Quiz
            </motion.button>
            <motion.button
              onClick={() => setIsStarted(false)}
              className="mt-4 bg-gray-500 text-white text-lg py-3 px-6 rounded-lg shadow-lg flex items-center justify-center mx-auto hover:bg-gray-600 transition duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-6 h-6 mr-2" /> Exit
            </motion.button>
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-2">
                <Brain className="w-6 h-6 text-blue-500" />
                <h1 className="text-xl font-bold">{quizData?.title}</h1>
              </div>
              <div className="flex items-center text-blue-500">
                <Trophy className="w-5 h-5 mr-1" />
                <span className="font-bold">{score}</span>
              </div>
            </div>
            <div className="flex justify-between items-center mb-4">
              <Clock className="w-5 h-5 text-red-500" />
              <span className="text-lg font-bold text-red-500">{timer}s</span>
            </div>
            <div className="bg-gray-100 rounded-lg p-6 border border-gray-200 mb-6">
              <h2 className="text-lg font-semibold mb-4">{quizData?.questions[currentQuestionIndex].description}</h2>
              <div className="space-y-3">
                {quizData?.questions[currentQuestionIndex].options.map((option) => (
                  <motion.button
                    key={option.id}
                    onClick={() => handleAnswerSelect(quizData!.questions[currentQuestionIndex].id, option.id)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${selectedAnswers[quizData!.questions[currentQuestionIndex].id] === option.id ? (option.is_correct ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50') : 'border-gray-200 hover:border-blue-500'}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {option.description}
                  </motion.button>
                ))}
              </div>
            </div>
            <motion.button
              onClick={handleNextQuestion}
              className="mt-6 w-full bg-blue-500 text-white py-3 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Next Question
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
