import express from 'express';
import axios from 'axios';

const app = express();
const port = 3000;
const API_URL = 'https://www.koreaexim.go.kr/site/program/financial/exchangeJSON';
const AUTH_KEY = 'ZnzGoq0FkPOq92AY2579sxMjy4Pr8RTD';
const CUR_UNIT = 'USD';

const getInfo = async () => {
  try {
    const { data } = await axios.get(`${API_URL}?authkey=${AUTH_KEY}&data=AP01`);
    return data.filter(obj => obj.cur_unit === CUR_UNIT)[0];
  }catch(e) {
    console.error(e);
  }
}

app.get('/', (req, res) => {
  res.send('Exchange Rate Daily');
})

app.get('/today', async (req, res) => {
  const data = await getInfo();
  console.log(data);
  res.send(`오늘의 USD 환율:  ${data.deal_bas_r}(매매기준율)`);
})

app.listen(port, () => {
  console.log('listening...')
})