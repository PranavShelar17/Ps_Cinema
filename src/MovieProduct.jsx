import React from "react";

export default function MovieProduct(props) {
  let { M } = props;
  console.log(M);

  return (
    <>
      <div className="  col-lg-2 col-sm-12 col-md-6 col-6 myb mx-2 text-lg-center   m-lg-3 my-3   p-lg-4 p-2 " style={{background:"#B1B1B1",borderRadius:"20px"}}>
        <div className="image">
          <img className=" img-fluid  " src={M.Poster} alt="image" />
        </div>
        <div className="title text-white ">{M.Title}</div>
        <div className="rating text-white">{M.Year}</div>
      </div>
    </>
  );
}
