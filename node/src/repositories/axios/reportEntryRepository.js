import Repository from './axiosRepositoryBase';
import globals from '../../globals';

const path = globals.settings.rest_api_path_base + globals.settings.rest_api_reportentry_path;

export default {
  get(reportName) {
    return Repository.get(`${path}/?report=${reportName}`);
  },
  create(body) {
    // TODO: it should be 'put'
    return Repository.post(`${path}/`, body);
  },
};
