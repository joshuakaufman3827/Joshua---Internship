import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  let scrollInterval = null;

  // Fetch Hot Collections from your API
  useEffect(() => {
    fetch("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections")
      .then((res) => res.json())
      .then((data) => setCollections(data))
      .catch((err) => console.error("Error fetching collections:", err));
  }, []);

  const startScrollNext = (swiper) => {
    swiper.slideNext();
    scrollInterval = setInterval(() => {
      swiper.slideNext();
    }, 300);
  };

  const startScrollPrev = (swiper) => {
    swiper.slidePrev();
    scrollInterval = setInterval(() => {
      swiper.slidePrev();
    }, 300);
  };

  const stopScroll = () => {
    clearInterval(scrollInterval);
    scrollInterval = null;
  };

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">

        {/* Title */}
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
        </div>

        {/* SWIPER REEL */}
        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          loop={true}
          slidesPerView={4}   // ← 4 cards visible
          spaceBetween={30}
          grabCursor={true}
          onSwiper={(swiper) => {
            const nextBtn = document.querySelector(".swiper-button-next");
            const prevBtn = document.querySelector(".swiper-button-prev");

            nextBtn.onmousedown = () => startScrollNext(swiper);
            nextBtn.onmouseup = stopScroll;
            nextBtn.onmouseleave = stopScroll;

            prevBtn.onmousedown = () => startScrollPrev(swiper);
            prevBtn.onmouseup = stopScroll;
            prevBtn.onmouseleave = stopScroll;
          }}
        >
          {collections.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="nft_coll">
                <div className="nft_wrap">
                  <Link to={`/item-details/${item.id}`}>
                    <img
                      src={item.nftImage}
                      className="lazy img-fluid"
                      alt={item.name}
                    />
                  </Link>
                </div>

                <div className="nft_coll_pp">
                  <Link to={`/author/${item.authorId}`}>
                    <img
                      className="lazy pp-coll"
                      src={item.authorImage}
                      alt={item.author}
                    />
                  </Link>
                  <i className="fa fa-check"></i>
                </div>

                <div className="nft_coll_info">
                  <Link to="/explore">
                    <h4>{item.name}</h4>
                  </Link>
                  <span>{item.erc}</span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Swiper arrows */}
        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div>

      </div>
    </section>
  );
};

export default HotCollections;



















