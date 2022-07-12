import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

export class News extends Component {
  constructor() {
    super();
    this.state = {
      // articles is a part of the state of my class based component
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
  }

  handleBackClick = async () => {
    console.log("Prev");
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=4619fd07b9e94787bf45a4e3b2120114&page=${
      this.state.page - 1
    }&pagesize=${this.props.pageSize}`;
    this.setState({loading : true});
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading : false
    });
  };

  handleNextClick = async () => {
    console.log("Next");
    if (this.state.page + 1 <= Math.ceil(this.state.totalResults / (this.props.pageSize))) {
      let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=4619fd07b9e94787bf45a4e3b2120114&page=${
        this.state.page + 1
      }&pagesize=${this.props.pageSize}`;
      this.setState({loading: true});
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        loading: false
      });
    } else {
    }
  };

  async componentDidMount() {
    let url =
      `https://newsapi.org/v2/top-headlines?country=in&apiKey=4619fd07b9e94787bf45a4e3b2120114&page=1&pagesize=${this.props.pageSize}`;
      this.setState({loading : true});
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    });
  }

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center">NewsToday - Top Headlines</h1>
        {this.state.loading && <Spinner/>}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title?.slice(0, 45)}
                  description={element.description?.slice(0, 88)}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            class="btn btn-dark"
            onClick={this.handleBackClick}
          >
            &larr; Back
          </button>
          <button
            disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / (this.props.pageSize))}
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
