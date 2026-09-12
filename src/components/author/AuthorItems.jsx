import React from "react";
import { Link } from "react-router-dom";

const AuthorItems = ({ items }) => {
  if (!items || items.length === 0) {
    return <p className="text-center">No items found for this author.</p>;
  }

  return (
    <div className="row">
      {items.map((item) => (
        <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={item.id}>
          <div className="nft__item">
            <div className="de_countdown"></div>

            <div className="author_list_pp">
              <span>
                <img className="lazy" src={item.image} alt={item.title} />
              </span>
            </div>

            <div className="nft__item_wrap">
              <Link to={`/item/${item.id}`}>
                <img
                  src={item.image}
                  className="lazy nft__item_preview"
                  alt={item.title}
                />
              </Link>
            </div>

            <div className="nft__item_info">
              <Link to={`/item/${item.id}`}>
                <h4>{item.title}</h4>
              </Link>
              <div className="nft__item_price">
                {item.price} ETH
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AuthorItems;

