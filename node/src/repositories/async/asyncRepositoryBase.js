import WebSocket2 from '../../plugins/websocket';
import globals from '../../globals';

async function newWS2() {
  return new Promise((resolve, reject) => {
    const websocketURI = globals.settings.websocket_uri === '' ? `ws://${window.location.host}/` : globals.settings.websocket_uri;
    const ws = new WebSocket2(`${websocketURI}${globals.settings.websocket_path}`);
    function f() { ws.removeEventListener('open', f); resolve(ws); }
    ws.addEventListener('open', f);
    ws.addEventListener('error', () => { reject(); });
  });
}

const ws = await newWS2();

export default ws;
