import axios from 'axios';

import constants from '../../constants/constants';
import { getArticles } from './dashboardActions';

export const getArticlesApi = () => dispatch =>
  axios({
    url: `${constants.PEP_URL}article`,
    method: 'get',
  }).then(res => dispatch(getArticles(res.data)));

export const createArticleApi = params => () =>
  axios({
    url: `${constants.PEP_URL}article`,
    method: 'post',
    data: params,
  }).then(res => res);
