const express = require('express');
const path = require('path');
const cors = require('cors');  // Import the cors package
const bodyParser = require('body-parser');
const twilio = require('twilio');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const accountSid = 'ACbd631c374b3297176fd08b9e59744a8d';  // Replace with your Twilio Account SID
const authToken = '664453c32c9140d438f94d844a1b6076';  // Replace with your Twilio Auth Token
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

  const sendMessages = async () => {
    try {
      for (const question of questions) {
        const message = await client.messages.create({
          body: question,
          to: `+${phoneNumber}`,  // Ensure the number includes the country code
          from: '+18336865091'  // Your Twilio phone number in E.164 format
        });
        console.log('Message sent:', message.sid);
      }
      res.status(200).send('Questions sent!');
    } catch (error) {
      console.error('Error sending messages:', error);
      res.status(500).send(`Failed to send questions: ${error.message}`);
    }
  };

  sendMessages();
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
