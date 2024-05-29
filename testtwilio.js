const twilio = require('twilio');

const accountSid = 'ACbd631c374b3297176fd08b9e59744a8d';  // Replace with your Twilio Account SID
const authToken = '664453c32c9140d438f94d844a1b6076';  // Replace with your Twilio Auth Token
const client = new twilio(accountSid, authToken);

client.messages.create({
  body: 'Test message',
  to: '+19796763971',  // Replace with your phone number in E.164 format
  from: '+18336865091'  // Replace with your Twilio phone number
})
.then(message => console.log('Message sent to 9796763971:', message.sid))
.catch(error => console.error('Error sending message:', error.message));




