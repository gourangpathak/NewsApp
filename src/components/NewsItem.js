import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } = this.props;

    return (
      <>
        <div className="my-3">
          <div className="card">
            <img
              src={
                !imageUrl
                  ? "https://images.moneycontrol.com/static-mcnews/2022/03/fandosensexniftyderivative-1-770x433.jpg"
                  : imageUrl
              }
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">
                {title}{" "}
                <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left: "90%", zIndex : "1"}}>
                  {source}
                  <span className="visually-hidden">unread messages</span>
                </span>
              </h5>
              <p className="card-text">{description}...</p>
              <p className="card-text">
                <small className="text-muted">
                  By {author ? author : "Unknown"} on{" "}
                  {new Date(date).toGMTString()}
                </small>
              </p>
              <a
                rel="noreferrer noopener"
                href={newsUrl}
                target="_blank"
                className="btn btn-sm btn-dark"
              >
                Read More
              </a>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default NewsItem;
