import axios from "axios";
import React, { useState } from "react";

export default function SignUpPage(props) {
  let { signupstatus } = props;

  function handleSignUpFormSubmit(event) {
    event.preventDefault();
    props.onSignUpFormSubmit(event);
  }
  function handleLoginClick() {
    props.onLoginClick("Login");
    console.log("...");
  }

  return (
    <>
      <div className="my-5  p-5"></div>
      {/* {(display =false  && <Page  />)}  */}
      {signupstatus == "success" && (
        <div className="text-center text-white  h3 text-danger">
          Signup Successfull{" "}
          <a href="#" onClick={handleLoginClick}>
            Login
          </a>{" "}
          now.
        </div>
      )}
      {signupstatus == "failed" && (
        <div className="text-center   text-white pb-3 h5 text-danger">
          Sorry.. This Email-id is already Registered.
        </div>
      )}

      {(signupstatus == "no" || signupstatus == "failed") && (
        <div className="p-3  my-5">
          <div className="text-center p-5  text-white text-decoration-underline  h4 my-3">
            SIGNUP
          </div>
          <div className="row p justify-content-center">
            <div className=" col-sm-12 col-md-6 border border-3     border-dark">
              <form action="" onSubmit={handleSignUpFormSubmit}>
                <div className="row    ">
                  <div className="col-6 p-2 text-white  h4  text-end">
                    <label htmlFor="">UserName:</label>
                  </div>
                  <div className="col-6 text-white p-2">
                    <input type="name" name="name" required />
                  </div>{" "}
                  <div className="col-6 text-white p-2  h4 text-end">
                    <label htmlFor="">Email:</label>
                  </div>
                  <div className="col-6  p-2 ">
                    <input
                      type="email"
                      name="email"
                      // onChange={(inform) =>
                      //   setUser({ ...users, email: inform.target.value })
                      // }

                      required
                    />
                  </div>
                  <div className="col-6 p-2 h4  text-white text-end ">
                    <label htmlFor="">Password:</label>
                  </div>
                  <div className="col-6 p-2">
                    <input type="password" name="password" required />
                  </div>
                  {/* <div className="row"></div> */}
                  <div className=" col-8 p-2 "></div>
                  <div className="my-3 text-center">
                    <input
                      type="submit"
                      value="OK"
                      className="mx-2    btn  log"
                      // disabled={submitted}
                    />

                    <input
                      type="reset"
                      value="Clear"
                      className="btn  log my-"
                      // onReset={handleSignUpFormReset}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <div className="size "></div>
    </>
  );
}
// onClick={handleLoginClick}
