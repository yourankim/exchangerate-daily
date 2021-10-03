import express from 'express';
import { generateMessage, sendMessage } from '../src/service';


const app = express();

app.get('/api/message', (req, res) => {
    const message = await generateMessage();
    sendMessage(message);
});


export default app;