import asyncRepositoryBase from './asyncRepositoryBase';

export default function factory(messageType) {
  return {
    sendMessage(message = {}) {
      asyncRepositoryBase.send(JSON.stringify({ request: messageType, option: message }));
    },
    onMessage(handler) {
      asyncRepositoryBase.addEventListener('message', (e) => {
        const eventdata = JSON.parse(e.detail.data);
        if (eventdata.response === messageType) {
          handler(eventdata);
        }
      });
    },
  };
}
