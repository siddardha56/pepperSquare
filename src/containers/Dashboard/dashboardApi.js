import axios from 'axios';

import constants from '../../constants/constants';
import { getArticles } from './dashboardActions';

const getArticlesApi = () => dispatch =>
  axios({
    url: `${constants.PEP_URL}article`,
    method: 'get',
  }).then(res => dispatch(getArticles(res.data)));

export default getArticlesApi;
