import React from "react";
import { Link } from "react-router-dom";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";

const items = [1, 2, 3, 4, 5, 6];

const HotCollections = () => {
  let scrollInterval = null;

  const startScrollNext = (swiper) => {
    swiper.slideNext();
    scrollInterval = setInterval(() => {
      swiper.slideNext();
    }, 300); // smooth continuous scroll speed
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
          slidesPerView={4}
          spaceBetween={30}
          grabCursor={true}
          onSwiper={(swiper) => {
            // attach hold-to-scroll behavior to arrows
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
          {items.map((i) => (
            <SwiperSlide key={i}>
              <div className="nft_coll">
                <div className="nft_wrap">
                  <Link to="/item-details">
                    <img
                      src={nftImage}
                      className="lazy img-fluid"
                      alt=""
                    />
                  </Link>
                </div>

                <div className="nft_coll_pp">
                  <Link to="/author">
                    <img
                      className="lazy pp-coll"
                      src={AuthorImage}
                      alt=""
                    />
                  </Link>
                  <i className="fa fa-check"></i>
                </div>

                <div className="nft_coll_info">
                  <Link to="/explore">
                    <h4>Collection {i}</h4>
                  </Link>
                  <span>ERC-{100 + i}</span>
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


















