// import React, { useEffect, useState } from "react";
// import MovieWishListProduct from "./MovieWishListProduct";
// import { RingLoader } from "react-spinners";
// import axios from "axios";

// export default function WishList(props) {
//   let [flagLoader, setFlagLoader] = useState(false);
//   let [wishlistdata, setWishListData] = useState([]);

//   let { wishlist } = props;
//   //console.log(wishlist);
//   //     useEffect(() => {
//   //     if (wishlist) {
//   // WishListDetail(wishlist)
//   //     }
//   //       let movieId = wishlist;
//   //       let apiKey = "685e2f09bfed147ad18e97893e8a01ff";
//   //       async function WishListDetail(wishlist) {
//   //       setFlagLoader(true);
//   //       const response = await fetch(
//   //         `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${wishlist}`
//   //       );
//   //       const data = await response.json();
//   //       //`https://www.omdbapi.com/?s=${searchMovieData}&apikey=${apiKey}`

//   //         setMovieData(data.results);
//   //       setFlagLoader(true)
//   //       }
//   //       // let response = axios
//   //       //   .get(
//   //       //     `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`
//   //       //   )
//   //       //   .then((response) => {
//   //       //     // Set cast data from response
//   //       //     setWishListData(response.data.cast);
//   //       //     console.log(response.data.cast);

//   //       //   })
//   //       //   .catch((error) => {
//   //       //     // Handle errors outside async function
//   //       //     console.error("Failed to fetch cast:", error);
//   //       //   });
//   //       //setCast(response.data.cast)
//   //       setFlagLoader(false)

//   //   }, [wishlist]);
//   useEffect(() => {
//     if (!wishlist) return;

//     setFlagLoader(true);
//     const apiKey = "685e2f09bfed147ad18e97893e8a01ff";

//     axios
//       .get(`https://api.themoviedb.org/3/movie/${wishlist}?api_key=${apiKey}`)
//       .then((res) => {
//         setWishListData(res.data);
//         setFlagLoader(false);
//       })
//       .catch((err) => {
//         console.error("Failed to fetch movie:", err);
//         setFlagLoader(false);
//       });
//   }, [wishlist]);
//   if (flagLoader) {
//     return (
//       <div className="  text-center my-5 d-flex justify-content-center">
//         <RingLoader size={50} color={"green"} className="" />
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className=" my-5 my-lg-4 "></div>
//       {wishlistdata?.poster_path && (
//         <>
//           {" "}
//           <div
//             className=""
//             style={{ minHeight: "100vh", background: "#444444" }}
//           >
//             <div
//               className="row radius d-flex 
//          p-2 m-lg-3  m-2   text-center"
//               style={{ background: "#444444" }}
//             >
//               <div
//                 className="  col-lg-2 col-sm-12 col-md-6 col-6 myb mx-2  text-lg-center   m-lg-3 my-3   p-lg-4 p-2 "
//                 style={{ background: "#B1B1B1", borderRadius: "20px" }}
//               >
//                 <div className="image">
//                   <img
//                     className=" img-fluid  "
//                     src={`https://image.tmdb.org/t/p/w500${wishlistdata.poster_path}`}
//                     alt="image"
//                   />
//                 </div>
//                 <div className="title text-white ">{wishlistdata.title}</div>
//                 <div className="rating text-white">
//                   {wishlistdata.release_date}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//       {wishlistdata?.poster_path == null && (
//         <div className=" my-5  text-center text-capitalize">
//           <h1>Add wishlist Movies First...</h1>
//         </div>
//       )}
//     </>
//   );
// }

// {
//   /* {Array.isArray(wishlistdata) &&
// wishlistdata.map((e, index) => (
//   <MovieWishListProduct M={e} key={index}
//   />
// ))} */
// }
import React, { useEffect, useState } from "react";
import { RingLoader } from "react-spinners";
import axios from "axios";

export default function WishList(props) {
  let [flagLoader, setFlagLoader] = useState(false);
  let [wishlistdata, setWishListData] = useState([]);

  let { wishlist } = props; // expecting array of movie IDs

  useEffect(() => {
    if (!wishlist || wishlist.length === 0) {
      setWishListData([]);
      return;
    }

    setFlagLoader(true);
    const apiKey = "685e2f09bfed147ad18e97893e8a01ff";

    // Create an array of promises for each movie fetch
    const promises = wishlist.map((movieId) =>
      axios
        .get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`)
        .then((res) => res.data)
        .catch((err) => {
          console.error(`Failed to fetch movie ${movieId}:`, err);
          return null; // skip this movie if error occurs
        })
    );

    Promise.all(promises).then((results) => {
      // Filter out any null responses (failed fetches)
      const filteredResults = results.filter((movie) => movie !== null);
      setWishListData(filteredResults);
      setFlagLoader(false);
    });
  }, [wishlist]);

  if (flagLoader) {
    return (
      <div className="text-center my-5 d-flex justify-content-center">
        <RingLoader size={50} color={"green"} />
      </div>
    );
  }

  if (wishlistdata.length === 0) {
    return (
      <div className="my-5 p-lg-5 p-5 text-center text-capitalize">
        <h1>Add wishlist movies first...</h1>
      </div>
    );
  }
   function handleWishListImgClick(WishM) {
      props.onWishListImgClick(WishM)
      
    }

  return (
    <div style={{ minHeight: "100vh", background: "#2a2a2f" }} className="p-3 my-lg-5 my-5">
      <div className="row">
        {wishlistdata.map((movie) => (
          <div
            key={movie.id}
            className="col-lg-2 col-md-4 col-sm-6 col-12 my-lg-5 mx-lg-2 text-center"
            style={{ background: "#242429", borderRadius: "20px", padding: "10px" }}
          >
            <img onClick={()=>handleWishListImgClick(movie)}
              className="img-fluid mb-2"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <div className="title text-white">{movie.title}</div>
            <div className="rating text-white">{movie.release_date}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

