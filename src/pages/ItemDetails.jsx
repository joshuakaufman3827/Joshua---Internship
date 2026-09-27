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

        let displayId = data.nftId || data.tag || data.id || id;

        setItem({
          nftNumber: displayId,
          title: data.title ?? "NFT Item",
          description: data.description ?? "No description provided.",
          image: data.nftImage,
          views: data.views ?? 0,
          likes: data.likes ?? 0,
          price: data.price ?? "—",

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

  /* ---------------------------------------------------- */
  /* 1. SKELETON LOADING STATE                            */
  /* ---------------------------------------------------- */
  if (loading) {
    return (
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <div id="top"></div>
          <section aria-label="section" style={{ paddingTop: "120px", paddingBottom: "60px" }}>
            <div className="container">
              <div className="row">
                <div className="col-md-6 text-center">
                  <div
                    className="skeleton-box"
                    style={{ width: "100%", height: "480px", borderRadius: "10px" }}
                  ></div>
                </div>
                <div className="col-md-6">
                  <div
                    className="skeleton-box"
                    style={{ width: "70%", height: "40px", borderRadius: "4px", marginBottom: "20px" }}
                  ></div>
                  <div className="d-flex gap-2 mb-4">
                    <div className="skeleton-box" style={{ width: "80px", height: "30px", borderRadius: "20px" }}></div>
                    <div className="skeleton-box" style={{ width: "80px", height: "30px", borderRadius: "20px" }}></div>
                  </div>
                  <div className="skeleton-box" style={{ width: "100%", height: "80px", borderRadius: "4px", marginBottom: "30px" }}></div>
                  <div className="d-flex flex-column gap-3 mb-4">
                    <div className="d-flex align-items-center gap-3">
                      <div className="skeleton-box" style={{ width: "42px", height: "42px", borderRadius: "50%" }}></div>
                      <div className="skeleton-box" style={{ width: "140px", height: "20px", borderRadius: "4px" }}></div>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                      <div className="skeleton-box" style={{ width: "42px", height: "42px", borderRadius: "50%" }}></div>
                      <div className="skeleton-box" style={{ width: "140px", height: "20px", borderRadius: "4px" }}></div>
                    </div>
                  </div>
                  <div className="skeleton-box" style={{ width: "120px", height: "30px", borderRadius: "4px" }}></div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <div id="top"></div>
          <div className="container text-center" style={{ padding: "140px 20px" }}>
            <h3>Item details could not be loaded.</h3>
          </div>
        </div>
      </div>
    );
  }

  /* ---------------------------------------------------- */
  /* 2. LOADED STATE                                      */
  /* ---------------------------------------------------- */
  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        
        <section aria-label="section" style={{ paddingTop: "120px", paddingBottom: "60px" }}>
          <div className="container">
            <div className="row">
              
              {/* LEFT IMAGE PREVIEW */}
              <div className="col-md-6 text-center mb-4">
                <img
                  src={item.image}
                  className="img-fluid img-rounded mb-sm-30"
                  alt={item.title}
                  style={{
                    width: "100%",
                    maxHeight: "520px",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />
              </div>

              {/* RIGHT ITEM DETAILS */}
              <div className="col-md-6">
                <div className="item_info">
                  
                  {/* TITLE WITH ASSIGNED NFT NUMBER */}
                  <h2 style={{ fontSize: "32px", fontWeight: "bold", color: "#0f172a", marginBottom: "14px" }}>
                    {item.title} #{item.nftNumber}
                  </h2>

                  {/* VIEWS & LIKES BADGES */}
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                    <div
                      style={{
                        backgroundColor: "#f1f5f9",
                        padding: "6px 14px",
                        borderRadius: "20px",
                        fontSize: "13px",
                        fontWeight: "600",
                        color: "#64748b",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <i className="fa fa-eye"></i>
                      <span>{item.views}</span>
                    </div>

                    <div
                      style={{
                        backgroundColor: "#f1f5f9",
                        padding: "6px 14px",
                        borderRadius: "20px",
                        fontSize: "13px",
                        fontWeight: "600",
                        color: "#64748b",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <i className="fa fa-heart"></i>
                      <span>{item.likes}</span>
                    </div>
                  </div>

                  {/* DESCRIPTION */}
                  <p style={{ color: "#64748b", lineHeight: "1.6", fontSize: "15px", marginBottom: "25px" }}>
                    {item.description}
                  </p>

                  {/* OWNER AND CREATOR STACKED */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "25px" }}>
                    
                    {/* OWNER ROW */}
                    <div>
                      <span style={{ fontSize: "13px", fontWeight: "600", color: "#1e293b", display: "block", marginBottom: "6px" }}>
                        Owner
                      </span>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <div style={{ position: "relative", width: "42px", height: "42px", minWidth: "42px" }}>
                          <Link to={`/author/${item.ownerId}`}>
                            <img
                              src={item.ownerImage}
                              alt={item.ownerName}
                              style={{
                                width: "42px",
                                height: "42px",
                                borderRadius: "50%",
                                objectFit: "cover",
                                margin: 0,
                                display: "block",
                              }}
                            />
                            <svg
                              style={{
                                position: "absolute",
                                bottom: "0",
                                right: "0",
                                width: "15px",
                                height: "15px",
                              }}
                              viewBox="0 0 24 24"
                            >
                              <circle cx="12" cy="12" r="12" fill="#8364e2" />
                              <path
                                d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"
                                fill="#ffffff"
                              />
                            </svg>
                          </Link>
                        </div>
                        <Link
                          to={`/author/${item.ownerId}`}
                          style={{ fontWeight: "700", color: "#1e293b", textDecoration: "none", fontSize: "14px", margin: 0 }}
                        >
                          {item.ownerName}
                        </Link>
                      </div>
                    </div>

                    {/* CREATOR ROW */}
                    <div>
                      <span style={{ fontSize: "13px", fontWeight: "600", color: "#1e293b", display: "block", marginBottom: "6px" }}>
                        Creator
                      </span>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <div style={{ position: "relative", width: "42px", height: "42px", minWidth: "42px" }}>
                          <Link to={`/author/${item.creatorId}`}>
                            <img
                              src={item.creatorImage}
                              alt={item.creatorName}
                              style={{
                                width: "42px",
                                height: "42px",
                                borderRadius: "50%",
                                objectFit: "cover",
                                margin: 0,
                                display: "block",
                              }}
                            />
                            <svg
                              style={{
                                position: "absolute",
                                bottom: "0",
                                right: "0",
                                width: "15px",
                                height: "15px",
                              }}
                              viewBox="0 0 24 24"
                            >
                              <circle cx="12" cy="12" r="12" fill="#8364e2" />
                              <path
                                d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"
                                fill="#ffffff"
                              />
                            </svg>
                          </Link>
                        </div>
                        <Link
                          to={`/author/${item.creatorId}`}
                          style={{ fontWeight: "700", color: "#1e293b", textDecoration: "none", fontSize: "14px", margin: 0 }}
                        >
                          {item.creatorName}
                        </Link>
                      </div>
                    </div>

                  </div>

                  {/* PRICE SECTION */}
                  <div>
                    <span style={{ fontSize: "13px", color: "#64748b", display: "block", marginBottom: "6px" }}>
                      Price
                    </span>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <img
                        src={EthereumIcon}
                        alt="ETH"
                        style={{ width: "20px", height: "20px", margin: 0 }}
                      />
                      <span style={{ fontSize: "20px", fontWeight: "bold", color: "#1e293b" }}>
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



