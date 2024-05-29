const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

const accountSid = 'ACbd631c374b3297176fd08b9e59744a8d';
const authToken = '664453c32c9140d438f94d844a1b6076';
const client = new twilio(accountSid, authToken);

const questions = [
  "What are three accomplishments you are most proud of this week, and why?",
  "What was your biggest challenge this week, and how did you address it? Could you have done anything better?",
  "How have you grown personally or professionally in the past week? What new skills or knowledge have you acquired?",
  "What inspired you this week to keep going when things got tough?",
  "What are your short-term goals for next week, and what steps can you take today to move closer to achieving them?"
];

app.post('/send-sms', (req, res) => {
  const phoneNumber = req.body.phoneNumber;

  questions.forEach(question => {
    client.messages.create({
      body: question,
      to: phoneNumber,
      from: '9796763971'
    }).then(message => console.log(message.sid));
  });

  res.send('Questions sent!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
