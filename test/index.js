import { generateMessage, sendMessage } from '../src/service.js';

const message = await generateMessage();
console.log("message in test", message);
sendMessage(message);