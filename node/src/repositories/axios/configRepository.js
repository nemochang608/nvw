import Repository from './axiosRepositoryBase';
import globals from '../../globals';

const path = globals.settings.rest_api_path_base + globals.settings.rest_api_config_path;

export default {
  get(envName, deviceName) {
    return Repository.get(`${path}/${envName}/${deviceName}/`);
  },
  update(body) {
    return Repository.put(`${path}/`, body);
  },
};
