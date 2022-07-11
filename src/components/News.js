import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class News extends Component {
  constructor() {
    super();
    this.state = {
      // articles is a part of the state of my class based component
      articles: [],
      loading: false,
    };
  }

  async componentDidMount() {
    let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=4619fd07b9e94787bf45a4e3b2120114#";
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({articles : parsedData.articles})
  }

  render() {
    return (
      <div className="container my-3">
        <h2>NewsToday - Top Headlines</h2>
        <div className="row">
          {this.state.articles.map((element) => {
            return <div className="col-md-4"  key={element.url}>
              <NewsItem
                title={element.title?.slice(0, 45)}
                description={element.description?.slice(0, 88)}
                imageUrl={element.urlToImage}
                newsUrl={element.url}
              />
            </div>;
          })}
        </div>
      </div>
    );
  }
}

export default News;
