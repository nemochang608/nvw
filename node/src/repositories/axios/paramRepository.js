import Repository from './axiosRepositoryBase';
import globals from '../../globals';

const path = globals.settings.rest_api_path_base + globals.settings.rest_api_param_path;

export default {
  get(envName) {
    return Repository.get(`${path}/${envName}`);
  },
  update(body) {
    return Repository.post(`${path}/`, body);
  },
};
