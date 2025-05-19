export default function Login(props) {
  let { loginStatus } = props;
  let { user } = props;
  let {name}=props

  function handleLoginFormSubmit(event) {
    event.preventDefault();
    props.onLoginFormSubmit(event);
    console.log(user);
  }
  
  // console.log("aalo");

  return (
    <>
    <div className="my-5 p-4"></div>
      {loginStatus == "success" && (
        <div className="text-center ">
          <h3>Login Successful...</h3>
          <h3>Welcome {name}, Start Shopping!!!</h3>
        </div>
      )}

      {loginStatus == "failed" && (
        <div className="text-center text-white">
          Sorry... Wrong Credentials
        </div>
      )}

      {(loginStatus == "failed" || loginStatus == "no") && (
        <div className="p-3 my-5">
          <div className="text-center p-5   text-decoration-underline  h4 my-3">
            LOGIN FORM
          </div>
          <div className="row  justify-content-center ">
            <div className="col-sm-12 col-md-6 border border-3 border-dark">
              <form action="" onSubmit={handleLoginFormSubmit}>
                {/* <h2> Welcome To Login Form</h2> */}
                <div className="row">
                  <div className="col-6 p-2  h4  text-end">
                    <label htmlFor="">Username:</label>
                  </div>
                  <div className="col-6  p-2">
                    <input type="name" name="name" />
                  </div>
                </div>
                <div className="row">
                  <div className="col-6 p-2  h4  text-end">
                    <label htmlFor="">EmailId:</label>
                  </div>
                  <div className="col-6  p-2">
                    <input type="email" name="email" />
                  </div>
                </div>
                <div className="row">
                  <div className="col-6 p-2  h4  text-end">
                    <label htmlFor="">Password:</label>
                  </div>
                  <div className="col-6  p-2">
                    <input type="password" name="password" />
                  </div>
                  <div className="   col-lg-12 text-center   text-start">
                    <input
                      type="submit"
                      value="Ok"
                      className="mx-1  btn log  btn-warning"
                    />
                    <input
                      type="reset"
                      value="Clear"
                      className=" mx-1 btn log btn-warning"
                    />
                    {/* <button className="btn btn-danger mx-2">Ok</button>
                    <button className="btn btn-danger my-3">Clear</button> */}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {/* <div className="p-5 my-5">
        <div className="row  p-5 justify-content-center">
          <div className=" col-sm-12 col-md-6 border border-3  border-dark">
            <form action="" onSubmit={handleLoginFormSubmit}>
              <div className="row text  ">
                <div className="col-6 p-2  mt-3  h4 text-end">
                  Enter user-name :
                </div>
                <div className="col-6 mt-3 p-2">
                  <input type="text" name="username" id="user" required />
                </div>{" "}
                <div className="col-6 p-2 h4 mt-3  text-end">
                  {" "}
                  Enter E-mail :
                </div>
                <div className="col-6  mt-3 p-2 ">
                  <input type="text" name="emailid" required />
                </div>
                <div className="row "></div>
                <div className=" col-8 p-2 "></div>
                <div className="my-3  text-center ">
                  <input
                    type="submit"
                    value="Ok"
                    className="mx-1  btn   btn-warning"
                  />
                  <input
                    type="reset"
                    value="Clear"
                    className=" mx-1 btn btn-warning"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div> */}
      <div className="size "></div>
    </>
  );
}
