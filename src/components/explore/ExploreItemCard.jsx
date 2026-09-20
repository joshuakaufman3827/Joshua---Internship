import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRemainingTime } from "../../utils/countdown";

const ExploreItemCard = ({ item }) => {
  const [timeLeft, setTimeLeft] = useState(
    getRemainingTime(item.expiryDate || item.expiry_date)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getRemainingTime(item.expiryDate || item.expiry_date));
    }, 1000);

    return () => clearInterval(interval);
  }, [item.expiryDate, item.expiry_date]);

  return (
    <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4">
      <div className="nft__item">
        {/* Author */}
        <div className="author">
          <div className="author_thumb">
            <Link to={`/author/${item.authorId || item.author_id}`}>
              <img
                src={item.authorImage || item.author_image}
                alt={item.authorName || item.author_name}
              />
            </Link>
          </div>
        </div>

        {/* Countdown */}
        <div className="de_countdown">
          {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
        </div>

        {/* NFT Image */}
        <div className="nft__item_wrap">
          <Link to={`/item-details/${item.nftId || item.nft_id}`}>
            <img src={item.nftImage || item.nft_image} alt={item.title} />
          </Link>
        </div>

        {/* Info */}
        <div className="nft__item_info">
          <Link to={`/item-details/${item.nftId || item.nft_id}`}>
            <h4>{item.title}</h4>
          </Link>

          <div className="d-flex justify-content-between align-items-center mt-2">
            <div className="nft__item_price">{item.price} ETH</div>
            <div className="nft__item_like">
              <i className="fa fa-heart" /> {item.likes}
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center mt-3">
            <button className="btn btn-primary btn-sm">Buy Now</button>
            <button className="btn btn-outline-secondary btn-sm">Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreItemCard;
