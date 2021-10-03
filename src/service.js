import axios from 'axios';
import '../dotenv.js'; //https://kwoncheol.me/posts/dotenv-and-module 참조

const CUR_UNIT = "USD";

const getCurInfo = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.API_URI}?authkey=${process.env.AUTH_KEY}&data=AP01`
      );
      console.log("getCurInfo: ", data);
      const curInfo = data.filter((obj) => obj.cur_unit === CUR_UNIT)[0];
      return {
        code: 200,
        message: "OK",
        data: curInfo,
      };
    } catch (e) {
      console.error("getCurInfo:", e);
      return {
        code: 500,
        message: e.message,
        data: null,
      };
    }
  };

  const generateMessage = async () => {

    let message = "";
    const result = await getCurInfo();
    if (result.data) {
      message = `오늘의 USD 환율:  ${result.data.deal_bas_r}(매매기준율)`;
    } else if (result.code == 200) {
      message = "비영업일, 혹은 영업당일 11시 이전에는 정보가 제공되지 않습니다!";
    } else {
      message = result.message;
    }
    console.log("generateMessage:", message);
    return message;
  };

  
  const sendMessage = async (message) => {  
    try {
      const response = await axios.post(process.env.SLACK_HOOK_URI, {text: message });
      console.log("sendMessage - success!");
    } catch (e) {
      console.error("sendMessage - fail: ", e.message);
      console.log(e);
    }
  }

  export { generateMessage, sendMessage };