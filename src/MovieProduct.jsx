import React from "react";

export default function MovieProduct(props) {
  let { M } = props;
  //console.log(M);
  function handleImageClick(data,F) {
    console.log(data,F);
    
    props.onImageClick(data,F);
  }
  if (M.poster_path == "") return null;

  return (
    <>
      <div
        className="  col-lg-2 col-sm-12 col-md-6 col-6      m-lg-4 my-3   p-lg-4 p-2 "
        style={{
          background: " linear-gradient(to bottom, rgba(255,255,255,0.05), rgba(255,255,255,0))",
          borderRadius: "10px",
        }}
      >
        <div className="image">
          <img
            className=" img-fluid  "
            onClick={() => handleImageClick(M,"movie")}
            src={
              M.poster_path
                ? `https://image.tmdb.org/t/p/w500${M.poster_path}`
                : ""
            }
            alt=""
          />
        </div>
        <div
          className="title text-white "
          style={{
        "--expanded-max-height": "unset",
        color: "white",
        fontSize: "18px",
        fontWeight: 500,
        letterSpacing: "0.02em",
        lineHeight: "28px",
       
        borderRadius: "12px",
        maxWidth: "600px",
        margin: "20px auto",
      }}
        >
          {M.poster_path ? M.title : ""}
        </div>
        <div
          className="rating text-white"
          style={{
        "--expanded-max-height": "unset",
        color: "white",
        fontSize: "18px",
        fontWeight: 500,
        letterSpacing: "0.02em",
        lineHeight: "28px",
        
        borderRadius: "12px",
        maxWidth: "600px",
        margin: "20px auto",
      }}
        >
          {M.poster_path ? M.release_date : ""}
        </div>
      </div>
    </>
  );
}
