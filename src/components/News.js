import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import PropTypes from "prop-types";

const News = (props) => {
  // defining the state for the component
  // The following are part of the state of my class based component
  // articles is an array of objects of information about NewsItems
  // loading denotes if the page is getting loaded i.e. if data is getting fetched
  // page denotes here the page in my api endpoint which I want to get
  // totalResults denotes here the total number of results I got from my API
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  // A Simple Function to Capitalize the first letter in a string
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  document.title = `${capitalizeFirstLetter(
    props.category
  )} - NewsToday`;

  // This Method will update my News by fetching articles from the NEWSAPI
  // This is async since we are doing a fetch operation in here
  const updateNews = async (pageNo) => {
    // this is here for the Progress Bar on top of my page
    props.setProgress(10);

    // setup API Url
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pagesize=${props.pageSize}`;

    // Now since we are going to start fetching set loading as true
    setLoading(true);

    // get data using fetch method from the API Url
    let data = await fetch(url);

    props.setProgress(30);

    // Parse the data that you got in above step into a JSON object
    let parsedData = await data.json();

    props.setProgress(70);

    // Set the State of the News Component as follows

    // set the articles
    setArticles(parsedData.articles);
    // set the totalResults
    setTotalResults(parsedData.totalResults);
    // set loading as false since you have got your data now
    setLoading(false);

    props.setProgress(100);
  };

  // This is a method to handle back button click
  const handleBackClick = async () => {
    // On click of this button reduce the page value
    // and update the News
    setPage(page - 1);
    updateNews();
  };

  // This is a method to handle next button click
  const handleNextClick = async () => {
    // On click of this button increase the page value
    // and update the News
    setPage(page + 1);
    updateNews();
  };

  // This Method will run after the News Component has been rendered this has the same functionality as componentDidMount
  useEffect(() => {
    updateNews();
  }, []);

  // This Method is here for fetching More Articles for my infinite scroll behaviour
  const fetchMoreData = async () => {
    // increment the page value to get new articles
    setPage(page + 1);

    // fetch data from API
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pagesize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();

    // set the articles
    setArticles(articles.concat(parsedData.articles));
    // set the totalResults
    setTotalResults(parsedData.totalResults);
    // set loading as false since you have got your data now
    setLoading(false);
  };

  return (
    <>
      {/* The Top Headline on all page it changes according to the category */}
      <h1 className="text-center">
        NewsToday - Top {capitalizeFirstLetter(props.category)} Headlines
      </h1>
      {/* {this.state.loading && <Spinner />} */}

      {/* Wrapping Everything Else inside an infinite scroll component*/}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={loading ? "" : <Spinner />}
      >
        <div className="container">
          <div className="row">
            {/* map each element of articles to NewsItem Component */}
            {articles.map((element) => {
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
};

// setting up default prop values
News.defaultProps = {
  country: "in",
  pageSize: 6,
};

// setting up the default prop types
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
