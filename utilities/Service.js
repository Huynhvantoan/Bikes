import axios from 'axios';
//import api from './Api';

class Service{
  constructor() {
    this.api = axios.create({
      baseURL: 'http://demo.easymove.vn/api/',
      headers: {
        Authorization: 'Basic YWRtaW46YWRtaW4=',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  }
}

export default Service;
