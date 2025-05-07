import React, { useState } from "react";

export default function Navbar({ onSearch }) {
  let [searchText, setSearchText] = useState("");
  function handlePopular(params) {}
  function handleUpcoming(params) {}
  function handleTop(params) {}
  function handleSearch(e) {
    setSearchText(e.target.value);

    //props.onSearch(e.target.value);
    // console.log(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    onSearch(searchText);
  }
  function handleSearchClick() {
    pro
    
  }
  return (
    <>
      <div className="row  p-2     fixed-top " style={{background:"#747474"}}>
        <div className="col-3 text-center   fw-bolder " onClick={handleSearchClick}>MoviesDb</div>
        <div className=" col-3 "></div>
        <div className="col-3  text-center     ">
          <button
            style={{
              borderRadius: "10px",
              background:"#444444",
              color:"white",
              fontFamily: "Arial",
            }}
          >
            Popular
          </button>
          <button
            style={{
              borderRadius: "10px",
              background:"#444444",
              color:"white",
              fontFamily: "Arial",
            }}
            className=" mx-1"
            onClick={handleTop}
          >
            Top Rated
          </button>
          <button
            style={{
              borderRadius: "10px",
              background:"#444444",
              color:"white",
              fontFamily: "Arial",
            }}
            className=" mx-1"
            onClick={handleUpcoming}
          >
            Upcoming
          </button>
        </div>
        <div className=" col-3     ">
          <form className=" " onSubmit={handleSubmit}>
            <input
              type="search"
              value={searchText}
              style={{ borderRadius: "10px", marginRight: "10px" }}
              onChange={handleSearch}
              className=" bg-info-subtle "
              placeholder="Search movies"
            />
            <button type="submit" style={{ borderRadius: "10px", background:"#444444",
              color:"white", }}>
              search
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
