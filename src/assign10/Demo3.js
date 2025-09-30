import React, { Component } from 'react';
import axios from 'axios';

const Loading = () => <div>Loading ...</div>;

export default class Demo3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      isLoading: true,  
      error: null,
    };
  }

  componentDidMount() {
    axios
  
      .get('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        this.setState({ posts: response.data, isLoading: false });
      })
      .catch((err) => {
        this.setState({ error: "Error fetching data", isLoading: false });
        console.error("error", err);
      });
  }

  render() {
    const { posts, isLoading, error } = this.state;
    return (
      <div>
        <h2>List of Posts</h2>
        {isLoading && <Loading />}
        {/* Show error */}
        {error && <div style={{ color: 'red' }}>{error}</div>}
        {/* Show data once loaded */}
        {!isLoading &&
          posts.map((pos) => (
            <div key={pos.id}>
              <strong>{pos.title}</strong>
              <p>{pos.body}</p>
              <hr />
            </div>
          ))}
      </div>
    );
  }
}
