import axios from 'axios';

const response = await axios.get(`${window.location.protocol}//${window.location.host}/${_ENVIRONMENT.JSONPATH}`);
const settings = response.data;

export default {
  settings,
};
