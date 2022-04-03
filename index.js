const axios = require('axios');
const dayjs = require('dayjs')
const DingtalkBot = require('./lib/DingtalkBot');
const initLogger = require('./lib/logger');

const bot = new DingtalkBot({
  webhook: "",
  secret: "",
})

function singleRequest(){
  const options = {
    url: 'https://maicai.api.ddxq.mobi/order/getMultiReserveTime',
    method: 'POST',
    headers: {
      "Host": "maicai.api.ddxq.mobi",
      "ddmc-city-number": 0101,
      "nars": "",
      "Time": "",
      "ddmc-locale-identifier": "zh_CN",
      "User-Agent": "neighborhood/9.48.1 (iPhone; iOS 15.3.1; Scale/2.00)",
      "ddmc-device-token": "",
      "Cookie": "",
      "Accept-Encoding": "gzip, deflate, br",
      "ddmc-api-version": "9.48.1",
      "ddmc-build-version": 1216,
      // "ddmc-idfa": "",
      "ddmc-longitude": "",
      "ddmc-latitude": "",
      "sesi": "",
      "ddmc-app-client-id": 1,
      "sign": "",
      "Content-Length": 7308,
      "ddmc-device-name": "iPhone XR",
      "ddmc-uid": "",
      "Accept-Language": "zh-Hans-CN;q=1",
      "ddmc-device-model": "iPhone11,8",
      "ddmc-channel": "App Store",
      "Connection": "keep-alive",
      "ddmc-country-code": "CN",
      "ddmc-device-id": "",
      // "ddmc-ip": "",
      "Content-Type": "application/x-www-form-urlencoded",
      "ddmc-language-code": "zh",
      "ddmc-station-id": "",
      "Accept": "*/*",
      "ddmc-os-version": "15.3.1",
    },
    data: "",
  };

  const log = {
    time: dayjs().format('YYYY:MM:DD HH:mm:ss'),
    data: null
  }

  axios(options).then( res =>{
    if(res.data.success){
      try {
        const data = res.data.data[0];
        // const closed = data.closed;
        const times = data.time[0].times;
        let havePsy = false;
        console.log(log.time)

        // if(!closed){
        //   havePsy = true;
        // }

        times.forEach(ele => {
          if(ele.disableMsg !== '已约满' || ele.textMsg !== '已约满'){
            havePsy = true;
          }
        });

        if(havePsy){
          bot.sendMessage('抢菜！！！');
        }

        log.data = data;
        initLogger(JSON.stringify(log));
      } catch (error) {
        log.data = error;
        initLogger(JSON.stringify(log));
      }
    } else {
      log.data = res.data;
      initLogger(JSON.stringify(log));
    }
  })
}

function botTest(){
  bot.sendMessage('机器人测试');
}

botTest();
singleRequest();
setInterval(() => {
  singleRequest();
}, 5000);