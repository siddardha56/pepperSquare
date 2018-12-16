import React from 'react';
import PropTypes from 'prop-types';
import {
  Route, Switch, NavLink,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Images from '../../Images';
import styles from './dashboard.scss';
import Input from '../../common/Input';
import {
  getArticlesApi,
  createArticleApi,
} from './dashboardApi';
import Articles from '../../components/Articles';
import CreateArticle from '../../components/Create';

class Dashboard extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      title: 'Home',
      id: '',
      author: '',
      published: '',
    };
  }
  componentDidMount() {
    const { fetchArticles } = this.props;
    fetchArticles();
  }

  componentWillReceiveProps(newProps) {
    const { location } = this.props;
    if (location.pathname !== newProps.location.pathname) {
      this.body.scrollTop = 0;
      this.setState({
        id: '',
        author: '',
        published: '',
      });
    }
  }

  updateFilterValues = filter => ({ target }) => {
    this.setState({
      [filter]: filter === 'published' ? target.checked : target.value,
    });
  }

  filterArticles = () => {
    const { fetchArticles } = this.props;
    const { id, author, published } = this.state;
    fetchArticles({ id, author, published });
  }

  changeTitle = title => () => {
    this.setState({
      title,
    });
  }

  loadArticle = id => () => {
    const { history } = this.props;
    history.push(`/article/${id}`);
  }

  render() {
    const {
      articles,
      location,
      createArticle,
      fetchArticles,
    } = this.props;
    const {
      id,
      author,
      published,
      title,
    } = this.state;
    return (
      <div className={styles.container}>
        <header>
          {title}
        </header>
        <div ref={(ref) => { this.body = ref; }} className={styles.body}>
          {location.pathname !== '/create' &&
          <div className={styles.filterContainer}>
            <Input
              type="text"
              placeholder="Id"
              value={id}
              className={styles.input}
              onChange={this.updateFilterValues('id')}
            />
            <Input
              type="text"
              placeholder="Author"
              value={author}
              className={styles.input}
              onChange={this.updateFilterValues('author')}
            />
            <Input
              type="checkbox"
              checked={published}
              className={styles.input}
              onChange={this.updateFilterValues('published')}
            /> <span>Published</span>
            <Input
              type="button"
              value="Filter"
              onClick={this.filterArticles}
            />
          </div>}
          <Switch>
            <Route
              path="/"
              exact
              render={routeParams =>
                (<Articles
                  {...routeParams}
                  articles={articles}
                  loadArticle={this.loadArticle}
                  filterArticles={fetchArticles}
                />)}
            />
            <Route
              path="/popular"
              exact
              render={routeParams =>
                (<Articles
                  {...routeParams}
                  loadArticle={this.loadArticle}
                  filterArticles={fetchArticles}
                  articles={[...articles].sort((a, b) => (b.likes - a.likes))}
                />)}
            />
            <Route
              path="/create"
              exact
              render={routeParams =>
                (<CreateArticle
                  {...routeParams}
                  createArticle={createArticle}
                />)}
            />
          </Switch>
        </div>
        <footer>
          <NavLink exact to="/" onClick={this.changeTitle('Home')} activeClassName={styles.active}>
            <img src={Images.HOME} width="24px" alt="" />
          </NavLink>
          <NavLink to="/popular" onClick={this.changeTitle('Most Popular')} activeClassName={styles.active}>
            <img src={Images.BLACK_HEART} width="24px" alt="" />
          </NavLink>
          <NavLink to="/create" onClick={this.changeTitle('Create')} activeClassName={styles.active}>
            <img src={Images.ADD} width="24px" alt="" />
          </NavLink>
        </footer>
      </div>
    );
  }
}

Dashboard.propTypes = {
  articles: PropTypes.instanceOf(Array).isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  fetchArticles: PropTypes.func.isRequired,
  createArticle: PropTypes.func.isRequired,
};

const mapStateToProps = ({ DashboardReducer }) => ({
  articles: DashboardReducer.articles,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    fetchArticles: getArticlesApi,
    createArticle: createArticleApi,
  }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
