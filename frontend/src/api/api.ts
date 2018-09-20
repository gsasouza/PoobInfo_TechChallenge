import axios from 'axios';

import { API_URL } from '../config';

type Body = {
  [key: string]: string,
}

export default async (route: string = '/', method: string = 'get', body: Body = {}) => {
  try {
    const { status, data, ...rest } = await axios({
      method,
      url: `${API_URL}${route}`,
      data: body,
    });

    return { status, data: data.data, message: data.message, ...rest };
  } catch(e) {
    console.log(e);
    return e;
  }


}
