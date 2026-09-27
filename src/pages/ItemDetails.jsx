import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import EthereumIcon from "../images/ethereum.svg";

const ItemDetails = () => {
  const params = useParams();
  const id = params.nftId || params.id || params.itemId;

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!id) {
      setLoading(false);
      return;
    }

    const loadItem = async () => {
      try {
        const res = await fetch(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${id}`
        );

        if (!res.ok) throw new Error("Network response was not ok");

        const data = await res.json();

        setItem({
          id: data.id || id,
          title: data.title ?? `NFT Item #${id}`,
          description: data.description ?? "No description provided.",
          tag: data.tag ?? null,
          image: data.nftImage,
          views: data.views ?? 0,
          likes: data.likes ?? 0,
          price: data.price ?? "—",
          expiry: data.expiryDate ?? null,

          ownerName: data.ownerName ?? "Unknown Owner",
          ownerImage: data.ownerImage,
          ownerId: data.ownerId ?? null,

          creatorName: data.creatorName ?? "Unknown Creator",
          creatorImage: data.creatorImage,
          creatorId: data.creatorId ?? null,
        });
      } catch (err) {
        console.error("Fetch error:", err);
        setItem(null);
      } finally {
        setLoading(false);
      }
    };

    loadItem();
  }, [id]);

  if (loading) {
    return (
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <div className="container" style={{ padding: "100px 20px" }}>
            <div className="row">
              <div className="col-md-6 text-center">
                <div
                  className="skeleton-box"
                  style={{ width: "100%", height: "400px", borderRadius: "10px" }}
                ></div>
              </div>
              <div className="col-md-6">
                <div
                  className="skeleton-box"
                  style={{ width: "60%", height: "30px", marginBottom: "20px" }}
                ></div>
                <div
                  className="skeleton-box"
                  style={{ width: "40%", height: "20px", marginBottom: "20px" }}
                ></div>
                <div
                  className="skeleton-box"
                  style={{ width: "100%", height: "80px", marginBottom: "30px" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <div className="container text-center" style={{ padding: "100px 20px" }}>
            <h3>Item details could not be loaded.</h3>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <section aria-label="section" className="mt-5">
          <div className="container">
            <div className="row">
              {/* LEFT IMAGE PREVIEW */}
              <div className="col-md-6 text-center mb-4">
                <img
                  src={item.image}
                  className="img-fluid img-rounded mb-sm-30"
                  alt={item.title}
                  style={{ maxHeight: "500px", objectFit: "cover", borderRadius: "10px" }}
                />
              </div>

              {/* RIGHT ITEM DETAILS */}
              <div className="col-md-6">
                <div className="item_info">
                  <h2>{item.title}</h2>

                  {/* VIEWS & LIKES WITH MATCHING GREY HEART */}
                  <div className="d-flex align-items-center gap-2 my-3">
                    <div
                      className="de_badge"
                      style={{
                        backgroundColor: "#f2f2f2",
                        padding: "6px 14px",
                        borderRadius: "20px",
                        fontSize: "13px",
                        fontWeight: "600",
                        color: "#727272",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <i className="fa fa-eye"></i>
                      <span>{item.views}</span>
                    </div>

                    <div
                      className="de_badge"
                      style={{
                        backgroundColor: "#f2f2f2",
                        padding: "6px 14px",
                        borderRadius: "20px",
                        fontSize: "13px",
                        fontWeight: "600",
                        color: "#727272",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <i className="fa fa-heart"></i>
                      <span>{item.likes}</span>
                    </div>
                  </div>

                  <p className="mt-3" style={{ color: "#727272", lineHeight: "1.6" }}>
                    {item.description}
                  </p>

                  {/* VERTICALLY STACKED OWNER THEN CREATOR */}
                  <div className="d-flex flex-column mt-4 mb-4 gap-3">
                    {/* OWNER FIRST */}
                    <div className="item_author">
                      <span style={{ fontSize: "13px", fontWeight: "bold", color: "#222", display: "block", marginBottom: "6px" }}>
                        Owner
                      </span>
                      <div className="d-flex align-items-center gap-2">
                        <div className="author_list_pp" style={{ position: "relative" }}>
                          <Link to={`/author/${item.ownerId}`}>
                            <img
                              className="lazy"
                              src={item.ownerImage}
                              alt={item.ownerName}
                              style={{
                                width: "42px",
                                height: "42px",
                                borderRadius: "50%",
                                objectFit: "cover",
                              }}
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info ms-2">
                          <Link
                            to={`/author/${item.ownerId}`}
                            style={{ fontWeight: "bold", color: "#222", textDecoration: "none", fontSize: "14px" }}
                          >
                            {item.ownerName}
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* CREATOR SECOND */}
                    <div className="item_author">
                      <span style={{ fontSize: "13px", fontWeight: "bold", color: "#222", display: "block", marginBottom: "6px" }}>
                        Creator
                      </span>
                      <div className="d-flex align-items-center gap-2">
                        <div className="author_list_pp" style={{ position: "relative" }}>
                          <Link to={`/author/${item.creatorId}`}>
                            <img
                              className="lazy"
                              src={item.creatorImage}
                              alt={item.creatorName}
                              style={{
                                width: "42px",
                                height: "42px",
                                borderRadius: "50%",
                                objectFit: "cover",
                              }}
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info ms-2">
                          <Link
                            to={`/author/${item.creatorId}`}
                            style={{ fontWeight: "bold", color: "#222", textDecoration: "none", fontSize: "14px" }}
                          >
                            {item.creatorName}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* PRICE SECTION (ONLY ICON + NUMBER) */}
                  <div className="spacer-20"></div>
                  <div className="de_price">
                    <span style={{ fontSize: "13px", color: "#727272", display: "block", marginBottom: "6px" }}>
                      Price
                    </span>
                    <div className="d-flex align-items-center gap-2">
                      <img
                        src={EthereumIcon}
                        alt="ETH"
                        style={{ width: "22px", height: "22px" }}
                      />
                      <span style={{ fontSize: "22px", fontWeight: "bold", color: "#222" }}>
                        {item.price}
                      </span>
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

export default ItemDetails;



