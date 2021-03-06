import { generateMessage, sendMessage } from '../src/service.js';

const cron = async (req, res) => {
    const message = await generateMessage();
    const result = await sendMessage(message);
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
    res.json(result);
  };

  export default cron;