import React from "react";

const NewsItem = (props) => {
    // Accept all props and destructure them from the News Component
    let { title, description, imageUrl, newsUrl, author, date, source, mode } = props;
    let myStyle = {
      color: mode ==='dark'?'white':'#212522',
      backgroundColor: mode ==='dark'?'#212522':'white', 
    }
    
    return (
      <>
        <div className="my-3"style={myStyle}>
          <div className="card" style={{color: mode ==='dark'?'white':'dark'}}>
            {/* Default Image in case of missing images */}
            <img
              src={
                !imageUrl
                  ? "https://images.moneycontrol.com/static-mcnews/2022/03/fandosensexniftyderivative-1-770x433.jpg"
                  : imageUrl
              }
              className="card-img-top"
              alt="..."
            />
            <div className="card-body" style={myStyle}>
              <h5 className="card-title" style={myStyle}>
                {title}{" "}
                <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left: "90%", zIndex : "1"}}>
                  {source}
                  <span className="visually-hidden">unread messages</span>
                </span>
              </h5>
              <p className="card-text" style={myStyle}>{description}...</p>
              <p className="card-text" style={myStyle}>
                <small className="text-muted">
                  By {author ? author : "Unknown"} on {" "}
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

export default NewsItem;
