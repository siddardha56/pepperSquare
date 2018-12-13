import React from 'react';
import PropTypes from 'prop-types';
import {
  Route, Switch, NavLink,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import styles from './dashboard.scss';
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
    };
  }
  changeTitle = title => () => {
    this.setState({
      title,
    });
  }
  render() {
    const { articles, fetchArticles, createArticle } = this.props;
    const { title } = this.state;
    return (
      <div className={styles.container}>
        <header>
          {title}
        </header>
        <div className={styles.body}>
          <Switch>
            <Route
              path="/"
              exact
              render={routeParams =>
                (<Articles
                  {...routeParams}
                  articles={articles}
                  fetchArticles={fetchArticles}
                />)}
            />
            <Route
              path="/fav"
              exact
              render={() => <div>Fav</div>}
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
            <Route path="/404" render={() => <h1>Page not found</h1>} />
          </Switch>
        </div>
        <footer>
          <NavLink exact to="/" onClick={this.changeTitle('Home')} activeClassName={styles.active}>Home</NavLink>
          <NavLink to="/fav" onClick={this.changeTitle('Popular')} activeClassName={styles.active}>Fav</NavLink>
          <NavLink to="/create" onClick={this.changeTitle('Create')} activeClassName={styles.active}>Create</NavLink>
        </footer>
      </div>
    );
  }
}

Dashboard.propTypes = {
  articles: PropTypes.instanceOf(Array).isRequired,
  history: PropTypes.object.isRequired,
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
