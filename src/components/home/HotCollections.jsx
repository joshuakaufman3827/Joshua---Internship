import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const NextArrow = ({ onClick }) => (
  <div className="slick-arrow slick-next" onClick={onClick}>
    <i className="fa fa-angle-right"></i>
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div className="slick-arrow slick-prev" onClick={onClick}>
    <i className="fa fa-angle-left"></i>
  </div>
);

const HotCollections = () => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    fetch("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections")
      .then((res) => res.json())
      .then((data) => setCollections(data))
      .catch((err) => console.error("Error fetching collections:", err));
  }, []);

  const settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    speed: 500,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">

        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
        </div>

        <Slider {...settings}>
          {collections.map((item) => (
            <div key={item.id} className="nft_coll">

              <div className="nft_wrap">
                <Link to={`/item-details/${item.nftId}`}>
                  <img
                    src={item.nftImage}
                    className="lazy img-fluid"
                    alt={item.title}
                  />
                </Link>
              </div>

              <div className="nft_coll_pp">
                <Link to={`/author/${item.authorId}`}>
                  <img
                    className="lazy pp-coll"
                    src={item.authorImage}
                    alt={item.title}
                  />
                </Link>
                <i className="fa fa-check"></i>
              </div>

              <div className="nft_coll_info">
                <Link to="/explore">
                  <h4>{item.title}</h4>
                </Link>
                <span>{item.code}</span>
              </div>

            </div>
          ))}
        </Slider>

      </div>
    </section>
  );
};

export default HotCollections;























