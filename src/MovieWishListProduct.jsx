import React from 'react'

export default function MovieWishListProduct(props) {
    let { M } = props;
    console.log(M);
    function handleWishListImgClick(WishM) {
      props.onWishListImgClick(WishM)
      
    }
    
  return (
    <>
     <div className="  col-lg-2 col-sm-12 col-md-6 col-6 myb mx-2 text-lg-center   m-lg-3 my-3   p-lg-4 p-2 " style={{background:"#B1B1B1",borderRadius:"20px"}}>
        <div className="image">
          <img  onClick={()=>handleWishListImgClick(M)}className=" img-fluid  "  src={`https://image.tmdb.org/t/p/w500${M.poster_path}`} alt="image" />
        </div>
        <div className="title text-white ">{M.title}</div>
        <div className="rating text-white">{M.release_date}</div>
      </div>
    </>
  )
}

