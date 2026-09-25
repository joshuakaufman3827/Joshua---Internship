import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Author = () => {
  const { authorId } = useParams();
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    const idToFetch = authorId || "73855012";

    axios
      .get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${idToFetch}`
      )
      .then((res) => {
        setAuthor(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching author details:", err);
        setLoading(false);
      });
  }, [authorId]);

  const toggleFollow = () => {
    if (following) {
      setAuthor((prev) => ({ ...prev, followers: prev.followers - 1 }));
      setFollowing(false);
    } else {
      setAuthor((prev) => ({ ...prev, followers: prev.followers + 1 }));
      setFollowing(true);
    }
  };

  if (loading) {
    return (
      <div className="container mt90 text-center">
        <h3>Loading author details...</h3>
      </div>
    );
  }

  if (!author) {
    return (
      <div className="container mt90 text-center">
        <h3>Author not found</h3>
      </div>
    );
  }

  const authorName = author.authorName || author.name || "Unknown Author";
  const username = author.tag || author.username || author.authorName?.toLowerCase().replace(/\s+/g, "") || "author";

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          style={{
            background: `url(${author.authorBanner || "/images/author_banner.jpg"}) center`,
          }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img src={author.authorImage} alt={authorName} />
                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {authorName}
                          <span className="profile_username">
                            @{username}
                          </span>
                          <span id="wallet" className="profile_wallet">
                            {author.address}
                          </span>
                        </h4>
                      </div>
                    </div>
                  </div>

                  <div className="profile_follow de-flex-col">
                    <div className="de-flex-col">
                      <div className="profile_follower">
                        {author.followers} followers
                      </div>
                      <button className="btn-main" onClick={toggleFollow}>
                        {following ? "Unfollow" : "Follow"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;





