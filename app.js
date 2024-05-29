document.addEventListener('DOMContentLoaded', function() {
  const questions = [
    "What are three accomplishments you are most proud of this week, and why?",
    "What was your biggest challenge this week, and how did you address it? Could you have done anything better?",
    "How have you grown personally or professionally in the past week? What new skills or knowledge have you acquired?",
    "What inspired you this week to keep going when things got tough?",
    "What are your short-term goals for next week, and what steps can you take today to move closer to achieving them?"
  ];

  const questionContainer = document.getElementById('question-container');
  
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

    const sessionDate = document.getElementById('session-date').value;
    const sessionTime = document.getElementById('session-time').value;

    alert(`Session scheduled on ${sessionDate} at ${sessionTime}.`);
  });
});
