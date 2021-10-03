import { generateMessage, sendMessage } from '../src/service';

const cron = (req, res) => {
    const message = await generateMessage();
    sendMessage(message);
  };

  export default cron;