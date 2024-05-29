document.addEventListener('DOMContentLoaded', function() {
  const questions = [
    "What are three accomplishments you are most proud of this week, and why?",
    "What was your biggest challenge this week, and how did you address it? Could you have done anything better?",
    "How have you grown personally or professionally in the past week? What new skills or knowledge have you acquired?",
    "What inspired you this week to keep going when things got tough?",
    "What are your short-term goals for next week, and what steps can you take today to move closer to achieving them?"
  ];

  const questionContainer = document.getElementById('question-container');
  const currentWeekElement = document.getElementById('week-number');
  const currentWeek = getCurrentWeekNumber();
  currentWeekElement.textContent = currentWeek;

  questions.forEach(question => {
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question');
    questionDiv.textContent = question;
    questionContainer.appendChild(questionDiv);
  });

  document.getElementById('signup-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const phoneNumber = document.getElementById('phoneNumber').value;

    fetch('/send-sms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `phoneNumber=${encodeURIComponent(phoneNumber)}`
    }).then(response => {
      if (response.ok) {
        alert('Reflective Buddy activated! Check your phone for the questions.');
      } else {
        alert('Failed to activate Reflective Buddy. Please try again.');
      }
    }).catch(error => {
      console.error('Error:', error);
      alert('Failed to activate Reflective Buddy. Please try again.');
    });
  });

  document.getElementById('schedule-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const sessionDay = document.getElementById('session-day').value;
    const sessionTime = document.getElementById('session-time').value;

    alert(`Session scheduled every ${sessionDay} at ${sessionTime}.`);
  });

  const chatToggle = document.getElementById('chat-toggle');
  const chatBody = document.getElementById('chatbot');
  setTimeout(() => {
    chatBody.style.display = 'block';
  }, 5000);

  chatToggle.addEventListener('click', function() {
    if (chatBody.style.display === 'none' || chatBody.style.display === '') {
      chatBody.style.display = 'block';
    } else {
      chatBody.style.display = 'none';
    }
  });

  document.getElementById('chat-send').addEventListener('click', function() {
    const chatInput = document.getElementById('chat-input').value.toLowerCase();
    const chatOutput = document.getElementById('chat-messages');

    // Mock responses for demo purposes
    const responses = {
      "how does the chatbot work": "Reflective Buddy helps you by providing weekly questions designed to enhance your self-awareness. You can activate it by entering your phone number and scheduling interactive sessions.",
      "what will i learn from this": "You will learn to reflect on your weekly accomplishments, challenges, and growth areas, enhancing your self-awareness and personal development.",
      "how can this help": "This can help you gain insights into your personal growth, set goals, and develop a habit of self-reflection.",
      "is it my friend": "Yes, Reflective Buddy is designed to be a friendly companion that supports your journey to self-awareness.",
      "can i get better": "Absolutely! Regular self-reflection can help you identify areas for improvement and track your progress.",
      "is this a therapist": "Reflective Buddy is not a therapist but a tool to help you reflect on your experiences. For professional help, it's important to consult a licensed therapist."
    };

    const userMessage = document.createElement('div');
    userMessage.textContent = chatInput;
    userMessage.classList.add('user-message');

    const botResponse = responses[chatInput] || "I'm here to help! Please ask questions related to Reflective Buddy.";
    const botMessage = document.createElement('div');
    botMessage.textContent = botResponse;
    botMessage.classList.add('bot-message');

    chatOutput.appendChild(userMessage);
    chatOutput.appendChild(botMessage);
    document.getElementById('chat-input').value = "";
    chatOutput.scrollTop = chatOutput.scrollHeight; // Scroll to the bottom
  });

  function getCurrentWeekNumber() {
    const currentDate = new Date();
    const startDate = new Date(currentDate.getFullYear(), 0, 1);
    const days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000));
    return Math.ceil(days / 7);
  }
});
