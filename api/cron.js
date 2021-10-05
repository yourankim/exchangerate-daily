import { generateMessage, sendMessage } from '../src/service.js';

const cron = (req, res) => {
    const message = await generateMessage();
    const result = sendMessage(message);
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
    res.json(result);
  };

  export default cron;