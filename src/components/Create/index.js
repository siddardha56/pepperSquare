import React from 'react';
import PropTypes from 'prop-types';

import Input from '../../common/Input';
import styles from './create.scss';

class CreateArticle extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '',
      description: '',
      tags: '',
      author: '',
      image: '',
      published: false,
    };
    this.submit = this.submit.bind(this);
  }

  updateValues = propertyName => ({ target }) => {
    this.setState({
      [propertyName]: target.value,
    });
  }

  submit() {
    const { tags } = this.state;
    const { history } = this.props;
    this.props.createArticle({
      ...this.state,
      tags: tags.split(','),
    }).then((res) => {
      if (res.status === 202) {
        history.push('/');
      }
    });
  }

  render() {
    const {
      title,
      description,
      tags,
      author,
      image,
    } = this.state;
    return (
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <Input
            type="text"
            placeholder="Title"
            value={title}
            className={styles.input}
            onChange={this.updateValues('title')}
          />
          <textarea
            cols="30"
            rows="10"
            value={description}
            placeholder="Description"
            className={styles.input}
            onChange={this.updateValues('description')}
          />
          <Input
            type="text"
            value={tags}
            placeholder="Category/Tags"
            className={styles.input}
            onChange={this.updateValues('tags')}
          />
          <Input
            type="text"
            value={author}
            placeholder="Author"
            className={styles.input}
            onChange={this.updateValues('author')}
          />
          <Input
            type="text"
            value={image}
            placeholder="Image URL only"
            className={styles.input}
            onChange={this.updateValues('image')}
          />
          <Input
            type="button"
            className={`${styles.inputButton} ${styles.input}`}
            value="PUBLISH"
            onClick={this.submit}
          />
        </div>
      </div>
    );
  }
}

CreateArticle.propTypes = {
  history: PropTypes.object.isRequired,
  createArticle: PropTypes.func.isRequired,
};


export default CreateArticle;
