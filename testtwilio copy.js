const twilio = require('twilio');

const accountSid = 'your_twilio_account_sid';  // Replace with your Twilio Account SID
const authToken = 'your_twilio_auth_token';  // Replace with your Twilio Auth Token
const client = new twilio(accountSid, authToken);

client.messages.create({
  body: 'Test message',
  to: '+19796763971',  // Replace with your phone number in E.164 format
  from: '+18336865091'  // Replace with your Twilio phone number
})
.then(message => console.log('Message sent:', message.sid))
.catch(error => console.error('Error sending message:', error.message));
