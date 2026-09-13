import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import AuthorItems from "../components/author/AuthorItems";
import AuthorBanner from "../images/author_banner.jpg";

const Author = () => {
  const { id } = useParams();
  const [author, setAuthor] = useState(null);
    address: "",
    authorID: 0,
    authorImage: "",
    authorName: "",
    followers: 0,
    tag: "",
});
const [authorItems, setAuthorItems] = useState([])
const [loading, setLoading] = useState(true);
const [error, setError] = useState(false);

console.log(id);
//useEffect(() => {
//const found = authors.find(a => a.authorId.toString() === id.toString());
//setAuthor(found || null);
//}, [id]);

async function fetchAuthor() {
  try {
    const response = await fetch(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?
      author=${id}`,
    );
    
    const author = await response.json();

    console.log(author);
    const {
     address,
     authorID,
     authorImage,
     authorName,
     followers,
     tag,
     nftCollection,
    } = author;

    setAuthor ({
      address,
      authorID,
      authorImage,
      authorName,
      followers,
      tag,
    });

    setAuthorItems(nftCollection);
  } catch (error) {
   setError(true);
   console.log("Error fetching author:", error);
  } finally {
    setLoading(false);
    }
  }

   useEffect(() => {
    fetchAuthor();
  }, [id]);

  if (error)
    return (
      <div className="container text=center author-error">
        <h2>Author profile not found.</h2>
        <p>Target Author ID: {id}</p>
        <Link to="/" className="btn-main">
        Back to Home
        </Link>
      </div>
    );

    return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <section
          id="profile_banner"
          className="text-light"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">

              <div className="col-md-12">
              {loading ? (
                <div className="d_profile de-flex">
                 {/* Replace with skeleton Loading State Later on */}
                <div className="de-flex-col">
                  <div className="profile_avatar">
                   Loading...
                   <i className="fa fa-check"></i>
                   <h4>
                    {author.authorName}
                    <span className="profile_username">Loading...</span>

                    <span id="wallet" className="profile_wallet">
                    Loading...
                    </span>

                    <button id="btn_copy" title="Copy Text">
                     Loading...
                    </button>
                   </h4>
                  </div>
                 </div>
                </div>
              ) : (
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img src={author.authorImage} alt={author.authorName} />
                      <i className="fa fa-check"></i>
            

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




