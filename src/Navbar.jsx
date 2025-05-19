// import React, { useState } from "react";

// export default function Navbar(props) {
//   let { view } = props;
//   let [searchText, setSearchText] = useState("");
//   function handlePopular() {
//     props.onPopular();
//   }
//   function handleUpcoming() {
//     props.Upcoming();
//   }
//   function handleTop() {
//     props.onTop();
//   }
//   function handleWishListClick() {
//     props.onWishListClick();
//   }
//   function handleSearch(e) {
//     setSearchText(e.target.value);

//     //props.onSearch(e.target.value);
//     // console.log(e.target.value);
//   }
//   function handleBackSpace() {
//     props.onBackSpace();
//   }
//   function handleSubmit(e) {
//     e.preventDefault();
//     props.onSearch(searchText);
//   }
//   function handleLogoClick(name) {
//     props.onLogoClick(name);
//   }
//   // function handleSignUpLogin() {
//   //   props.onSignUpLogin()

//   //}
//   return (
//     <>
//       <div
//         className="row  p-2     fixed-top "
//         style={{ background: "#747474" }}
//       >
//         {view == "detail" && (
//           <div
//             className=" position-absolute   ps-5     text-warning  rounded rounded-2 "
//             onClick={handleBackSpace}
//           >
//             <button className="button-84  ">
//             <i class="bi bi-arrow-left-square-fill"></i>
//             </button>
//           </div>
//         )}
//         <div
//           className="col-3     cursour  text-center    cursor-pointe   fw-bolder  "
//           onClick={() => handleLogoClick("moviepage")}
//         >
//           SKFlix
//         </div>
//         <div className=" col-6 myb  text-end ">
//           {/* <button className="  mx-5 btn bg-dark text-white   " onClick={handleSignUpLogin}>Register</button> */}
//           <button
//             className="rounded rounded-5   bg-danger border-black border border-2 text-white"
//             onClick={handleWishListClick}
//           >
//             <i className="bi bi-suit-heart-fill"></i>
//           </button>
//         </div>
//         {/* <div className="col-3  text-center     ">
//           <button
//             style={{
//               borderRadius: "10px",
//               background:"#444444",
//               color:"white",
//               fontFamily: "Arial",
//             }} onClick={handlePopular}
//           >
//             Popular
//           </button>
//           <button
//             style={{
//               borderRadius: "10px",
//               background:"#444444",
//               color:"white",
//               fontFamily: "Arial",
//             }}
//             className=" mx-1"
//             onClick={handleTop}
//           >
//             Top Rated
//           </button>
//           <button
//             style={{
//               borderRadius: "10px",
//               background:"#444444",
//               color:"white",
//               fontFamily: "Arial",
//             }}
//             className=" mx-1"
//             onClick={handleUpcoming}
//           >
//             Upcoming
//           </button>
//         </div> */}
//         <div className=" col-3     ">
//           <form className=" " onSubmit={handleSubmit}>
//             <input
//               type="search"
//               value={searchText}
//               style={{ borderRadius: "10px", marginRight: "10px" }}
//               onChange={handleSearch}
//               className=" bg-info-subtle "
//               placeholder="Search movies"
//             />
//             <button
//               type="submit"
//               style={{
//                 borderRadius: "10px",
//                 background: "#444444",
//                 color: "white",
//               }}
//             >
//               search
//             </button>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }

import React, { useState } from "react";

export default function Navbar(props) {
  let { view } = props;
  let [searchText, setSearchText] = useState("");

  function handlePopular() {
    props.onPopular();
  }

  function handleUpcoming() {
    props.Upcoming();
  }

  function handleTop() {
    props.onTop();
  }

  function handleWishListClick() {
    props.onWishListClick();
  }

  function handleSearch(e) {
    setSearchText(e.target.value);
  }

  function handleBackSpace() {
    props.onBackSpace();
  }
  function handleWebSeriesClick() {
    props.onWebSeriesClick();
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onSearch(searchText);
  }

  function handleLogoClick(name) {
    props.onLogoClick(name);
  }

  function handleRegisterClick() {
    props.onRegister();
  }
  //  function handleFormButtonClick(view) {
  //   props.onFormButtonClick(view);
  // }

  return (
    <>
      <div className="row p-2 fixed-top" style={{ background: "#1e1f26" }}>
        {view === "detail" && (
          <div
            className="position-absolute ps-5 mx-5  text-warning "
            onClick={handleBackSpace}
          >
            <button className="button-84">
              <i className="fa-solid fa-square-caret-left fa-beat-fade"></i>
            </button>
          </div>
        )}

        {/* Left: Logo */}
        <div
          className="col-2 my-3 my-lg-1 ps-lg-5    col-lg-3 col-md-4 col-sm-6  text-white cursor-pointer align-items-lg-center fw-bolder"
          // style={{ fontSize: " 1.4rem", fontWeight: "500" }}
          onClick={() => handleLogoClick("Allmovies")}
        >
          SKFlix
        </div>

        {/* Center: Register Button */}
        <div className="col-2 d-flex col-lg-3 col-md-4 col-sm-6 justify-content-center align-items-center">
          {/* <button
            className=" unified-button purple ms-2 "
            onClick={handleRegisterClick}
          >
            Register
          </button> */}
          {/* <button
                className="btn btn-primary log  mx-2 "
                onClick={() => {
                  handleFormButtonClick("SignUp");
                }}
              >
                SignUp
              </button>

              <button
                className="btn btn-primary log  mx-2"
                onClick={() => {
                  handleFormButtonClick("Login");
                }}
              >
                Login
              </button>  */}
          <button
            className="unified-button dark"
            onClick={handleWebSeriesClick}
          >
            TV Shows
          </button>
        </div>

        {/* Right: Wishlist & Search */}
        <div className="col-8 col-lg-6    col-md-4 col-sm-6   d-flex    align-items-lg-center    justify-content-lg-end ">
          <button
            className="rounded dark  rounded-5 bg-danger border-black border border-2 text-white "
            onClick={handleWishListClick}
          >
            <i className="bi bi-suit-heart-fill "></i>
          </button>

          <form className=" d-flex" onSubmit={handleSubmit}>
            <input
              type="search"
              value={searchText}
              style={{ borderRadius: "10px" }}
              onChange={handleSearch}
              className="bg-info-subtle custom-search-input"
              placeholder="Search movies"
            />
            <button
              type="submit"
              className="unified-button dark ms-2 "
              style={{
                borderRadius: "10px",
                background: "#444444",
                color: "white",
              }}
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
