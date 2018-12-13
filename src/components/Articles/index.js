import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import styles from './articles.scss';
import Images from '../../Images';

class Articles extends React.Component {
  componentDidMount() {
    this.props.fetchArticles();
  }
  render() {
    const { articles } = this.props;
    return (
      <div className={styles.container}>
        {articles.length > 0 ?
          articles.map((article) => {
            if (article.title === '' || article.description === '') return null;
            return (
              <div key={article.id} className={styles.article}>
                <div>
                  <img src={article.image} width="100%" alt={article.title} />
                </div>
                <div className={styles.content}>
                  <h3>{article.title}</h3>
                  <div className={styles.contentTag}>
                    <div className={styles.tag}>{article.tags && article.tags.length > 0 && article.tags.join(', ').toUpperCase()}</div>
                    <div className={styles.created}>{moment(article.created_at).format('DD MMM YYYY')}</div>
                  </div>
                  <p className={styles.description}>{article.description}</p>
                </div>
                <div className={styles.likes}>
                  <img src={Images.BLACK_HEART} alt="" />&nbsp;&nbsp;
                  {article.likes}
                </div>
              </div>
            );
          })
        : ''}
      </div>
    );
  }
}

Articles.propTypes = {
  articles: PropTypes.instanceOf(Array).isRequired,
  fetchArticles: PropTypes.func.isRequired,
};

export default Articles;
