import React, { useState } from "react";
import { signUpUser } from "../firebaseUser";

export default function SignUpPage({ onNavigate }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignUpFormSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signUpUser(email, password);
      // On success, navigate to main page or login
      onNavigate("Allmovies");
    } catch (err) {
      console.error(err);
      if (err.code === "auth/email-already-in-use") {
        setError("Sorry.. This Email-id is already Registered.");
      } else if (err.code === "auth/weak-password") {
        setError("Password should be at least 6 characters.");
      } else {
        setError("Failed to create an account.");
      }
    }
    setLoading(false);
  }

  function handleLoginClick(e) {
    e.preventDefault();
    onNavigate("Login");
  }

  return (
    <>
      <div className="my-5 p-5"></div>
      
      <div className="p-3 my-5">
        <div className="text-center p-5 text-white text-decoration-underline h4 my-3">
          SIGNUP
        </div>
        <div className="row justify-content-center">
          <div className="col-sm-12 col-md-6 border border-3 border-dark bg-dark p-4 rounded">
            {error && <div className="alert alert-danger text-center">{error}</div>}
            
            <form onSubmit={handleSignUpFormSubmit}>
              <div className="row mb-3 align-items-center">
                <div className="col-4 p-2 text-white h5 text-end m-0">
                  <label htmlFor="name">UserName:</label>
                </div>
                <div className="col-8 p-2">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="row mb-3 align-items-center">
                <div className="col-4 p-2 text-white h5 text-end m-0">
                  <label htmlFor="email">Email:</label>
                </div>
                <div className="col-8 p-2">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="row mb-3 align-items-center">
                <div className="col-4 p-2 text-white h5 text-end m-0">
                  <label htmlFor="password">Password:</label>
                </div>
                <div className="col-8 p-2">
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="text-center mt-4">
                <input
                  type="submit"
                  value={loading ? "Creating..." : "Sign Up"}
                  className="mx-2 btn btn-warning log"
                  disabled={loading}
                />
              </div>
              
              <div className="text-center mt-3 text-white">
                Already have an account?{" "}
                <a href="#" className="text-info" onClick={handleLoginClick}>
                  Login here
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
