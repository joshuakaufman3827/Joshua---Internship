import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import SkeletonCollection from "./SkeletonCollection";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const NextArrow = ({ onClick }) => (
  <button className="slick-arrow slick-next" onClick={onClick}>
    <i className="fa fa-angle-right" />
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button className="slick-arrow slick-prev" onClick={onClick}>
    <i className="fa fa-angle-left" />
  </button>
);

function Countdown({ end }) {
  const [timeLeft, setTimeLeft] = useState(calc(end));

  useEffect(() => {
    const t = setInterval(() => setTimeLeft(calc(end)), 1000);
    return () => clearInterval(t);
  }, [end]);

  if (!end) return <div className="de_countdown">—</div>;
  if (!timeLeft) return <div className="de_countdown">Ended</div>;

  return (
    <div className="de_countdown">
      {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
    </div>
  );

  function calc(endTs) {
    const ts = Date.parse(endTs);
    if (isNaN(ts)) return null;

    const diff = ts - Date.now();
    if (diff <= 0) return null;

    const s = Math.floor(diff / 1000);
    return {
      hours: Math.floor(s / 3600),
      minutes: Math.floor((s % 3600) / 60),
      seconds: s % 60,
    };
  }
}

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
        );
        const raw = await res.json();

        const mapped = raw.map((d) => ({
          id: d.id,
          title: d.title,
          nftImage: d.nftImage,
          authorImage: d.authorImage,
          eth: d.price,
          likes: d.likes,
          endsAt: d.expiry,
        }));

        setItems(mapped);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    speed: 400,
    arrows: true,
    swipeToSlide: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 3 } },
      { breakpoint: 992, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h2>New Items</h2>
            <div className="small-border bg-color-2" />
          </div>
        </div>

        {loading ? (
          <div className="row">
            {[0, 1, 2, 3].map((i) => (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={i}>
                <SkeletonCollection />
              </div>
            ))}
          </div>
        ) : (
          <div className="row">
            <div className="col-12">
              <div className="slider-wrapper">
                <Slider {...settings}>
                  {items.map((it) => (
                    <div key={it.id} className="slide-item">
                      <div className="nft__item">
                        <div className="author_list_pp">
                          <Link to={`/author/${it.id}`}>
                            <img className="lazy" src={it.authorImage} alt="" />
                            <i className="fa fa-check" />
                          </Link>
                        </div>

                        <Countdown end={it.endsAt} />

                        <div className="nft__item_wrap">
                          <Link to={`/item-details/${it.id}`}>
                            <img
                              src={it.nftImage}
                              className="lazy nft__item_preview"
                              alt=""
                            />
                          </Link>
                        </div>

                        <div className="nft__item_info">
                          <Link to={`/item-details/${it.id}`}>
                            <h4>{it.title}</h4>
                          </Link>
                          <div className="nft__item_price">{it.eth} ETH</div>
                          <div className="nft__item_like">
                            <i className="fa fa-heart" />
                            <span>{it.likes}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default NewItems;



