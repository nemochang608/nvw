import axios from 'axios';
import globals from '../../globals';

const baseURL = `${window.location.protocol}//${window.location.host}/`;

export default axios.create({
  baseURL,
  // currently authentication is not needed
  //auth: {
  //  username: globals.settings.rest_api_user,
  //  password: globals.settings.rest_api_password,
  //},
});
