import React, { Component } from "react";
import DataService from "../services/data";

class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true
    };
    this.dataService = new DataService();
  }

  componentDidMount = async () => {
    const blogs = await this.dataService.getBlogPosts("https://www.minepla.net/feed/");
    this.setState({
      articles: blogs,
      loading: false
    });
  }

  renderArticles = (articles) => {
    return articles.slice(0, 9).map((article, index) => {
      const date = new Date(article.pubDate);
      var options = { year: 'numeric', month: 'long', day: 'numeric' };
      return (
        <div className="item col-md-6 col-lg-4" key={index}>
          <article className="post">
            <figure></figure>
            <div className="post-header">
              <ul className="post-meta">
                <li className="post-date">{date.toLocaleDateString("en-US", options)}</li>
                <li className="post-date">{article.categories.includes("en")?"English":"Turkish"}</li>
              </ul>
              <h2 className="post-title h5"><a href={article.link} target="_blank" rel="noopener noreferrer" className="hover">{article.title}</a></h2>
            </div>
          </article>
        </div>)
    })
  }

  render() {
    const { articles, loading } = this.state;
    const url = this.props.url;
    return (<div className="card">
      <div className="card-header">
        <div className="row gx-0">
          <div className="col-6 col-md-8 col-lg-9">
            <h2 className="h6">Latest Posts</h2>
          </div>
        </div>
      </div>
      <div className="card-body grid grid-view">
        {loading ? (
          <div className="text-center p-5">
            <div className="spinner-grow" role="status">
              <span className="sr-only">Loading blog posts...</span>
            </div>
          </div>
        ) : (
          <>
            <div className="row gx-md-25 gy-15 isotope">
              {this.renderArticles(articles)}
            </div>
            <div className="row gx-md-25 gy-15 isotope text-right mr-5 mt-5">
              <a className="btn text-right pr-5" href={url} target="_blank" rel="noopener noreferrer">All blog posts</a>
            </div>
          </>
        )}
      </div>
    </div>);
  }
}

export default Blog