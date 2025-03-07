import QRCode from 'qrcode';
import './App.css';
import { useEffect } from 'react';

function App() {
  const appId = 'wx56b51448c015f42f'
  const redirectUri = encodeURI('http://vnwiud.natappfree.cc/wechat/callback')
  const state = 'STATE'

  // const authUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirectUri}&response_type=code&scope=snsapi_userinfo&state=${state}#wechat_redirect`

  const qrCodeUrl = `https://open.weixin.qq.com/connect/qrconnect?appid=${appId}&redirect_uri=${redirectUri}&response_type=code&scope=snsapi_base&state=${state}#wechat_redirect`

  useEffect(() => {
    const canvas = document.getElementById('canvas')
    QRCode.toCanvas(canvas, qrCodeUrl, function (error) {
      if (error) console.error(error)
      console.log('success!');
    })
  })
  

  return (
    <div className="App">
      <canvas id="canvas"></canvas>
    </div>
  );
}

export default App;
