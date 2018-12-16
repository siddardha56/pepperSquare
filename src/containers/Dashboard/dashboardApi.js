import axios from 'axios';

import constants from '../../constants/constants';
import { getArticles } from './dashboardActions';

export const getArticlesApi = (filters = {}) => (dispatch) => {
  const { id, author, published } = filters;
  return axios({
    url: `${constants.PEP_URL}article${(id || author || published) ? `?id=${id}&author=${author}&published=${published}` : ''}`,
    method: 'get',
  }).then(res => dispatch(getArticles(res.data)));
};

export const createArticleApi = params => () =>
  axios({
    url: `${constants.PEP_URL}article`,
    method: 'post',
    data: params,
  }).then(res => res);
