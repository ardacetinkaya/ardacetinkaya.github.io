import React, { Component } from "react";
import DataService from "../services/data";

class Blog extends Component {
  state = {
    articles: []
  };

  async componentDidMount() {
    const articles = await new DataService().parseRSSFeed();
    this.setState({ articles });
  }

  renderArticles = (articles) => {
    return articles.slice(0, 6).map((article, index) => {
      const date = new Date(article.pubDate);
      var options = { year: 'numeric', month: 'long', day: 'numeric' };
      return (
        <div className="item col-md-6 col-lg-4" key={index}>
          <article className="post">
            <figure></figure>
            <div className="post-header">
              <ul className="post-meta">
                <li className="post-date">{date.toLocaleDateString("en-US", options)}</li>
              </ul>
              <h2 className="post-title h5"><a href={article.link} target="_blank" rel="noopener noreferrer" className="hover">{article.title}</a></h2>
              <p>{article.description}...</p>
            </div>
          </article>
        </div>)
    })
  }

  render() {
    const { articles } = this.state;
    return (<div className="card">
      <div className="card-header">
        <div className="row gx-0">
          <div className="col-6 col-md-8 col-lg-9">
            <h2 className="h6">Latest Posts</h2>
          </div>
        </div>
      </div>
      <div className="card-body grid grid-view">
        <div className="row gx-md-25 gy-15 isotope">
          {this.renderArticles(articles)}
        </div>
        <div className="row gx-md-25 gy-15 isotope text-right mr-5 mt-5">
          <a className="btn text-right pr-5" href="https://www.minepla.net" target="_blank" rel="noopener noreferrer">All blog posts</a>
        </div>
      </div>
    </div>);
  }
}

export default Blog
