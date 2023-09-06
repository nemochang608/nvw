class WebSocket2 extends EventTarget {
  set onopen(v) { throw new Error('cannot set this property'); }

  set onmessage(v) { throw new Error('cannot set this property'); }

  set onclose(v) { throw new Error('cannot set this property'); }

  set onerror(v) { throw new Error('cannot set this property'); }

  #ws;

  constructor(url) {
    super();
    this.#connect(url);
  }

  #connect(url) {
    this.#ws = new WebSocket(url);
    this.#ws.onopen = (e) => {
      const wsopen = new CustomEvent('open', { detail: e });
      this.dispatchEvent(wsopen);
    };
    this.#ws.onmessage = (e) => {
      const wsmessage = new CustomEvent('message', { detail: e });
      this.dispatchEvent(wsmessage);
    };
    this.#ws.onclose = (e) => {
      const wsclose = new CustomEvent('close', { detail: e });
      this.dispatchEvent(wsclose);
      console.log('websocket closed', e);
      console.log('reconnecting');
      this.dispatchEvent(wsclose);
      setTimeout(
        () => this.#connect(url),
        3000,
      );
    };
    this.#ws.onerror = (e) => {
      const wserror = new CustomEvent('error', { detail: e });
      this.dispatchEvent(wserror);
    };
  }

  send(data) {
    this.#ws.send(data);
  }
}

export default WebSocket2;
