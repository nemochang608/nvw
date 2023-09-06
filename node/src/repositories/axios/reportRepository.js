import Repository from './axiosRepositoryBase';
import globals from '../../globals';

const path = globals.settings.rest_api_path_base + globals.settings.rest_api_report_path;

export default {
  get(envName) {
    return Repository.get(`${path}/?env_name=${envName}`);
  },
  create(body) {
    return Repository.post(`${path}/`, body);
  },
  download(reportName) {
    window.location.href = `/${path}/${reportName}/download/`;
  },
};
