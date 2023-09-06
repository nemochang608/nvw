import Repository from './axiosRepositoryBase';
import globals from '../../globals';

const path = globals.settings.rest_api_path_base + globals.settings.rest_api_tpl_path;

export default {
  get(envName, deviceName) {
    return Repository.get(`${path}/${envName}/${deviceName}/`);
  },
  create(body) {
    // TODO: it should be 'put'
    return Repository.post(`${path}/`, body);
  },
};
