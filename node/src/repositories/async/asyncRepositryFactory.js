import envListRepository from './envListRepository';
import topologyRepository from './topologyRepository';
import packetCaptureRepository from './packetCaptureRepository';

const repositories = {
  envList: envListRepository,
  topology: topologyRepository,
  pakcetCapture: packetCaptureRepository,
};

export default {
  get(name) { return repositories[name]; },
};
