import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import authors from "../data/authors.json";
import AuthorItems from "../components/author/AuthorItems";

const Author = () => {
  const { id } = useParams();
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    const found = authors.find(
      (a) => a.authorId.toString() === id.toString()
    );
    setAuthor(found || null);
  }, [id]);

  if (!author)
    return (
      <div className="container text-center">
        <h2>Author profile not found.</h2>
        <p>Target Author ID: {id}</p>
        <Link to="/" className="btn-main">Back to Home</Link>
      </div>
    );

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">

        <section
          id="profile_banner"
          className="text-light"
          style={{ background: `url(${author.authorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">

              <div className="col-md-12">
                <div className="d_profile de-flex">

                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img src={author.authorImage} alt={author.authorName} />
                      <i className="fa fa-check"></i>

                      <div className="profile_name">
                        <h4>
                          {author.authorName}
                          <span className="profile_username">
                            @{author.authorUsername}
                          </span>

                          <span id="wallet" className="profile_wallet">
                            {author.authorWallet}
                          </span>

                          <button id="btn_copy" title="Copy Text">
                            Copy
                          </button>
                        </h4>
                      </div>
                    </div>
                  </div>

                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">
                        {author.authorFollowers} followers
                      </div>
                      <Link to="#" className="btn-main">Follow</Link>
                    </div>
                  </div>

                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems items={author.nfts} />
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


