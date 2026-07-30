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
  // const [isMenuOpen, setMenuOpen] = useState(false);
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

  // function handleSearch(e) {
  //   setSearchText(e.target.value);
  // }

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
       <nav className="movie-navbar fixed-top  ">
  <div className="nav-container">
    <span 
      className="logo" 
      onClick={() => handleLogoClick("Allmovies")}
    >
      <span className="film-icon">🎬</span>
      <span className="logo-text">PS <span className="logo-highlight">Cinema</span></span>
    </span>

    <div className="nav-controls">
      {/* Show Back button only if not on Allmovies */}
      {view !== "Allmovies" && (
        <button className="nav-btn back-btn" onClick={handleBackSpace}>
          <span className="btn-icon">←</span>
          <span className="btn-text">Back</span>
        </button>
      )}

       <form className="search-form" onSubmit={handleSubmit}>
            <div className="search-group">
              <input
                type="text"
                className="search-input"
                placeholder="Search movies..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <button type="submit" className="search-btn">
                <i className="bi bi-search"></i>
              </button>
            </div>
          </form>

      <div className="action-buttons">
        <button className="nav-btn wishlist-btn" onClick={handleWishListClick}>
          <span className="btn-icon">❤️</span>
          <span className="btn-text">Wishlist</span>
        </button>

        <button className="nav-btn webseries-btn" onClick={handleWebSeriesClick}>
          <span className="btn-icon">📺</span>
          <span className="btn-text">Web Series</span>
        </button>

        <button className="nav-btn ai-btn" onClick={() => props.onLogoClick("ai-reco")}>
          <span className="btn-icon">🤖</span>
          <span className="btn-text">AI Recs</span>
        </button>

        <button className="nav-btn guide-btn" onClick={() => props.onLogoClick("guide")}>
          <span className="btn-icon">📖</span>
          <span className="btn-text">App Guide</span>
        </button>
      </div>
    </div>
  </div>
</nav>
    </>
  );
}
