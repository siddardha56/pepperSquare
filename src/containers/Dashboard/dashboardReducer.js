import { GET_ARTICLES } from './dashboardActions';

const initialState = {
  articles: [],
};

export default function DashboardReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ARTICLES: {
      return Object.assign({}, state, {
        articles: action.articles,
      });
    }
    default: return state;
  }
}
