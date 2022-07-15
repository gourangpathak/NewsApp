import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import PropTypes from "prop-types";

// A Simple Function to Capitalize the first letter in a string
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export class News extends Component {
  // setting up default prop values
  static defaultProps = {
    country: "in",
    pageSize: 6,
  };

  // setting up the default prop types
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  // invoking constuctor
  constructor(props) {
    // invoking the parent constructor
    super(props);

    // defining the state for the component
    this.state = {
      // The following are part of the state of my class based component
      // articles is an array of objects of information about NewsItems
      // loading denotes if the page is getting loaded i.e. if data is getting fetched
      // page denotes here the page in my api endpoint which I want to get
      // totalResults denotes here the total number of results I got from my API
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };

    // Setting the title corresponding to Each of the page in the NewsItem
    // corresponding to the category of the page
    document.title = `${capitalizeFirstLetter(
      this.props.category
    )} - NewsToday`;
  }

  // This Method will update my News by fetching articles from the NEWSAPI
  // This is async since we are doing a fetch operation in here
  async updateNews(pageNo) {
    // this is here for the Progress Bar on top of my page
    this.props.setProgress(10);

    // setup API Url
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pagesize=${this.props.pageSize}`;

    // Now since we are going to start fetching set loading as true
    this.setState({ loading: true });

    // get data using fetch method from the API Url
    let data = await fetch(url);

    this.props.setProgress(30);

    // Parse the data that you got in above step into a JSON object
    let parsedData = await data.json();

    this.props.setProgress(70);

    // Set the State of the News Component as follows
    this.setState({
      // set the articles
      articles: parsedData.articles,

      // set the totalResults
      totalResults: parsedData.totalResults,

      // set loading as false since you have got your data now
      loading: false,
    });

    this.props.setProgress(100);
  }

  // This is a method to handle back button click
  handleBackClick = async () => {
    // On click of this button reduce the page value
    // and update the News

    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  };

  // This is a method to handle next button click
  handleNextClick = async () => {
    // On click of this button increase the page value
    // and update the News

    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  };

  // This Method will run after the News Component has been rendered
  async componentDidMount() {
    // Upon Rendering the Component we have to update our News
    this.updateNews();
  }

  // This Method is here for fetching More Articles for my infinite scroll behaviour
  fetchMoreData = async () => {
    // increment the page value to get new articles
    this.setState({ page: this.state.page + 1 });

    // fetch data from API
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pagesize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();

    this.setState({
      // Append the newly fetched articles to the old articles inside the component
      // update the total results and then set loading as false
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false,
    });
  };

  render() {
    return (
      <>
        {/* The Top Headline on all page it changes according to the category */}
        <h1 className="text-center">
          NewsToday - Top {capitalizeFirstLetter(this.props.category)} Headlines
        </h1>
        {/* {this.state.loading && <Spinner />} */}

        {/* Wrapping Everything Else inside an infinite scroll component*/}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={this.state.loading ? "" : <Spinner />}
        >
          <div className="container">
            <div className="row">
              {/* map each element of articles to NewsItem Component */}
              {this.state.articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={element.title}
                      description={element.description}
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  }
}

export default News;
