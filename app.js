document.addEventListener('DOMContentLoaded', function() {
  const initialQuestions = [
    "Hello! What's your name?",
    "Can you share a bit about your personality and what you enjoy doing?",
    "What are some of your personal and professional goals?",
    "What do you find challenging, and how do you usually overcome challenges?",
    "What inspires you and keeps you motivated?"
  ];

  const dailyQuotes = [
    "The best time to plant a tree was 20 years ago. The second best time is now.",
    "Your limitation—it's only your imagination.",
    "Push yourself, because no one else is going to do it for you.",
    "Sometimes later becomes never. Do it now.",
    "Great things never come from comfort zones."
  ];

  let userResponses = {};
  let userName = '';
  let currentQuestionIndex = 0;
  let moodLoggedThisWeek = false;
  const weekNumber = getCurrentWeekNumber();

  const questionPool = [
    "What are three accomplishments you are most proud of this week, and why?",
    "What was your biggest challenge this week, and how did you address it? Could you have done anything better?",
    "How have you grown personally or professionally in the past week? What new skills or knowledge have you acquired?",
    "What inspired you this week to keep going when things got tough?",
    "What are your short-term goals for next week, and what steps can you take today to move closer to achieving them?",
    "What new hobby or activity have you tried recently?",
    "What is the most valuable lesson you learned this week?",
    "How do you plan to implement what you've learned this week into your daily life?",
    "Who or what had the biggest impact on you this week?",
    "What did you do this week that you are most proud of?",
    "How did you handle a difficult situation this week?",
    "What is one thing you want to improve on next week?",
    "What is something you did for someone else this week?",
    "How did you take care of your mental health this week?",
    "What is one thing that made you happy this week?",
    "How did you manage stress this week?",
    "What is a goal you have for the next month?",
    "What is one thing you are grateful for this week?",
    "How did you practice self-care this week?",
    "What is one thing you learned about yourself this week?",
    "What is one thing you wish you could have done differently this week?",
    "What is one thing you are looking forward to next week?",
    "How did you make progress towards your goals this week?",
    "What is one thing you want to let go of from this week?",
    "How did you stay motivated this week?",
    "What is one thing you did this week that was out of your comfort zone?",
    "How did you stay connected with loved ones this week?",
    "What is one thing you are proud of accomplishing this week?",
    "What is one thing you want to focus on next week?",
    "What is one thing you learned from a mistake this week?",
    "How did you practice gratitude this week?",
    "What is one thing you are excited about for next week?",
    "How did you overcome a challenge this week?",
    "What is one thing you did to help someone else this week?",
    "What is one thing you are proud of doing for yourself this week?"
  ];

  const questionContainer = document.getElementById('question-container');
  const currentWeekElement = document.getElementById('week-number');
  const currentYearElement = document.getElementById('current-year');
  const currentDateTimeElement = document.getElementById('current-date-time');
  const currentYear = new Date().getFullYear();
  const currentDate = new Date().toLocaleDateString();
  const currentTime = new Date().toLocaleTimeString();

  currentWeekElement.textContent = weekNumber;
  currentYearElement.textContent = currentYear;
  currentDateTimeElement.textContent = `Date: ${currentDate} Time: ${currentTime}`;

  const signupForm = document.getElementById('signup-form');
  const verifyForm = document.getElementById('verify-form');

  signupForm.addEventListener('submit', function(e) {
    e.preventDefault();

    userName = document.getElementById('userName').value;
    const phoneNumber = document.getElementById('phoneNumber').value;

    fetch('/send-sms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `phoneNumber=${encodeURIComponent(phoneNumber)}`
    }).then(response => {
      if (response.ok) {
        signupForm.style.display = 'none';
        verifyForm.style.display = 'block';
        alert('Verification code sent! Check your phone.');
      } else {
        alert('If you did not receive a short code to the number mentioned, it might be an issue on your side or your free twilio verify account needs upgrade. Please try again.');
      }
    }).catch(error => {
      console.error('Error:', error);
      alert('If you did not receive a short code to the number mentioned, it might be an issue on your side or your free twilio verify account needs upgrade. Please try again.');
    });
  });

  verifyForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const verificationCode = document.getElementById('verificationCode').value;

    fetch('/verify-code', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `code=${encodeURIComponent(verificationCode)}`
    }).then(response => {
      if (response.ok) {
        verifyForm.style.display = 'none';
        alert(`Phone number verified! Reflective Buddy activated. Welcome, ${userName}!`);
        // Start the initial chatbot interaction
        startChat();
      } else {
        alert('If you did not receive the verification text message, contact your twilio admin to upgrade your free account or check the phone number again.');
      }
    }).catch(error => {
      console.error('Error:', error);
      alert('If you did not receive the verification text message, contact your twilio admin to upgrade your free account or check the phone number again.');
    });
  });

  const chatToggle = document.getElementById('chat-toggle');
  const chatBody = document.getElementById('chatbot');
  const chatHeader = document.getElementById('chat-header');
  const typingIndicator = document.getElementById('typing-indicator');
  const chatMessages = document.getElementById('chat-messages');
  const chatInput = document.getElementById('chat-input');
  const chatSend = document.getElementById('chat-send');

  setTimeout(() => {
    chatBody.style.display = 'block';
    startChat();
  }, 5000);

  chatToggle.addEventListener('click', function() {
    if (chatBody.style.display === 'none' || chatBody.style.display === '') {
      chatBody.style.display = 'block';
    } else {
      chatBody.style.display = 'none';
    }
  });

  chatHeader.addEventListener('click', function() {
    if (chatBody.style.display === 'none' || chatBody.style.display === '') {
      chatBody.style.display = 'block';
    } else {
      chatBody.style.display = 'none';
    }
  });

  chatSend.addEventListener('click', function() {
    sendMessage();
  });

  chatInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  });

  function sendMessage() {
    const userMessage = chatInput.value.trim();
    if (userMessage) {
      appendMessage('user-message', userMessage);
      handleChatResponse(userMessage);
    }
    chatInput.value = '';
  }

  function appendMessage(type, text) {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = text;
    messageDiv.classList.add(type);
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function handleChatResponse(userMessage) {
    typingIndicator.style.display = 'block';

    setTimeout(() => {
      typingIndicator.style.display = 'none';

      let botResponse = '';
      if (currentQuestionIndex < initialQuestions.length) {
        // Store user responses
        userResponses[currentQuestionIndex] = userMessage;
        // Move to the next question
        currentQuestionIndex++;
        if (currentQuestionIndex < initialQuestions.length) {
          botResponse = initialQuestions[currentQuestionIndex];
        } else {
          // All initial questions answered
          botResponse = `Thank you, ${userName}. Based on your responses, here are your personalized questions for this week.`;
          displayPersonalizedQuestions();
        }
      } else {
        botResponse = "Thank you for your response. Based on your inputs, your personalized questions have been generated.";
        displayPersonalizedQuestions();
      }

      appendMessage('bot-message', botResponse);
    }, 1000);
  }

  function startChat() {
    appendMessage('bot-message', initialQuestions[currentQuestionIndex]);
  }

  function displayPersonalizedQuestions() {
    const moodScore = calculateScore();
    const personalizedQuestions = generatePersonalizedQuestions(moodScore, userResponses);

    questionContainer.innerHTML = ''; // Clear previous questions
    personalizedQuestions.forEach(question => {
      const questionDiv = document.createElement('div');
      questionDiv.classList.add('question');
      questionDiv.textContent = question;
      questionContainer.appendChild(questionDiv);
    });

    document.getElementById('questions').style.display = 'block';
  }

  function getCurrentWeekNumber() {
    const currentDate = new Date();
    const startDate = new Date(currentDate.getFullYear(), 0, 1);
    const days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000));
    return Math.ceil(days / 7);
  }

  // Weekly Mood Tracker Functionality
  const moodForm = document.getElementById('mood-form');
  const moodLog = document.getElementById('mood-log');
  const moodEmoji = document.getElementById('mood-emoji');

  const moodEmojis = {
    1: "😞",
    2: "😐",
    3: "😊",
    4: "😁",
    5: "🤩"
  };

  moodForm.addEventListener('input', function() {
    const mood = document.getElementById('mood').value;
    moodEmoji.textContent = moodEmojis[mood];
  });

  moodForm.addEventListener('submit', function(e) {
    e.preventDefault();

    if (moodLoggedThisWeek) {
      alert("You have already logged your mood for this week.");
      return;
    }

    const mood = document.getElementById('mood').value;
    const moodEntry = document.createElement('div');
    moodEntry.textContent = `Logged mood: ${moodEmojis[mood]} on ${new Date().toLocaleDateString()}`;
    moodEntry.style.color = getColorForMood(mood);
    moodLog.appendChild(moodEntry);

    moodLoggedThisWeek = true;

    // Calculate and display score based on mood and chatbot interactions
    const moodScore = calculateScore();
    displayNextSteps(moodScore);
  });

  function getColorForMood(mood) {
    switch (mood) {
      case "1":
        return "#FF0000"; // Red for sad
      case "2":
        return "#FFA500"; // Orange for neutral
      case "3":
        return "#FFFF00"; // Yellow for happy
      case "4":
        return "#00FF00"; // Green for very happy
      case "5":
        return "#0000FF"; // Blue for excited
      default:
        return "#FFFFFF"; // White as default
    }
  }

  function calculateScore() {
    const moodScores = {
      1: -2,
      2: 0,
      3: 2,
      4: 4,
      5: 6
    };

    let totalScore = 0;
    let moodCount = 0;

    document.querySelectorAll('#mood-log div').forEach(entry => {
      const mood = entry.textContent.match(/Logged mood: (.)/)[1];
      totalScore += moodScores[mood];
      moodCount++;
    });

    const averageScore = (moodCount > 0) ? (totalScore / moodCount).toFixed(2) : 0;
    const scoreMessage = document.createElement('div');
    scoreMessage.textContent = `Average Mood Score: ${averageScore}`;
    moodLog.appendChild(scoreMessage);

    return averageScore;
  }

  function displayNextSteps(score) {
    let nextSteps = "";

    if (score < 0) {
      nextSteps = "It looks like you've been feeling down. Consider talking to a friend or a mental health professional.";
    } else if (score <= 2) {
      nextSteps = "You're doing okay, but there's room for improvement. Try incorporating more activities that make you happy into your routine.";
    } else {
      nextSteps = "You're feeling great! Keep up the good work and continue to focus on your well-being.";
    }

    const nextStepsDiv = document.createElement('div');
    nextStepsDiv.textContent = `Next Steps: ${nextSteps}`;
    moodLog.appendChild(nextStepsDiv);

    displayPersonalizedQuestions();
  }

  function generatePersonalizedQuestions(moodScore, userResponses) {
    const selectedQuestions = [];

    if (moodScore < 0) {
      selectedQuestions.push("It seems you've been feeling down. Can you share more about what's been troubling you?");
      selectedQuestions.push("Have you been able to talk to anyone about how you're feeling?");
      selectedQuestions.push("What activities usually help lift your mood?");
    } else if (moodScore <= 2) {
      selectedQuestions.push("You're doing okay. What has been a highlight of your week?");
      selectedQuestions.push("Is there anything you wish you could have done differently this week?");
      selectedQuestions.push("What small changes can you make to improve your mood?");
    } else {
      selectedQuestions.push("You're feeling great! What has been the most exciting part of your week?");
      selectedQuestions.push("How can you maintain this positive energy?");
      selectedQuestions.push("What are some goals you want to achieve in the coming weeks?");
    }

    // Add questions based on user responses
    if (userResponses[0]) {
      selectedQuestions.push(`You mentioned that you enjoy ${userResponses[0]}. How has this influenced your week?`);
    }
    if (userResponses[1]) {
      selectedQuestions.push(`You set a goal to ${userResponses[1]}. How have you progressed towards it?`);
    }

    // Add random questions from the pool if needed to reach 5 questions
    while (selectedQuestions.length < 5) {
      const randomIndex = Math.floor(Math.random() * questionPool.length);
      selectedQuestions.push(questionPool[randomIndex]);
    }

    // Ensure no duplicate questions
    const uniqueQuestions = [...new Set(selectedQuestions)];

    return uniqueQuestions.slice(0, 5);
  }

  // Display Daily Inspirational Quote
  const quoteElement = document.getElementById('quote');
  const randomQuote = dailyQuotes[Math.floor(Math.random() * dailyQuotes.length)];
  quoteElement.textContent = randomQuote;
});
