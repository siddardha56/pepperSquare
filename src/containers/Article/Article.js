import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  getArticlesApi,
  createArticleApi,
} from '../Dashboard/dashboardApi';
import styles from './article.scss';
import Images from '../../Images';

class Article extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    const { articles, fetchArticles } = this.props;
    if (articles.length < 1) {
      fetchArticles();
    }
  }

  goBack = () => {
    const { history } = this.props;
    history.goBack();
  }

  render() {
    const { articles, match } = this.props;
    const article = articles.length > 0 ?
      articles.filter(post => post.id === parseInt(match.params.id, 10))[0] : {};
    if (Object.keys(article).length === 0) return null;
    return (
      <div className={styles.container}>
        <div
          className={styles.imageContainer}
          style={{
            background: `url(${article.image})`,
            backgroundRepeat: 'round',
          }}
        >
          <a href="javascript: void(0);" className={styles.back} onClick={this.goBack}>
            <img src={Images.BACK} alt="" />
          </a>
          <div className={styles.header}>
            <div>Detail</div>
          </div>
          <span className={styles.likes}>
            <img src={article.likes > 0 ? Images.RED_HEART : Images.BLACK_HEART} alt="" /> &nbsp;
            {article.likes}&nbsp;Likes
          </span>
        </div>
        <div className={styles.content}>
          <h3>{article.title}</h3>
          <div className={styles.contentTag}>
            <div className={styles.tag}>{article.tags && article.tags.length > 0 && article.tags.join(', ').toUpperCase()}</div>
            <div className={styles.created}>{moment(article.created_at).format('DD MMM YYYY')}</div>
          </div>
          <p className={styles.description}>{article.description}</p>
        </div>
      </div>
    );
  }
}

Article.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  fetchArticles: PropTypes.func.isRequired,
  articles: PropTypes.instanceOf(Array).isRequired,
};

const mapStateToProps = ({ DashboardReducer }) => ({
  articles: DashboardReducer.articles,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    fetchArticles: getArticlesApi,
    createArticle: createArticleApi,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Article);
