import React, { useState } from "react";
import { loginUser } from "../firebaseUser";

export default function Login({ onNavigate }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLoginFormSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      await loginUser(email, password);
      // On success, go back to main page
      onNavigate("Allmovies");
    } catch (err) {
      console.error(err);
      setError("Failed to log in. Please check your credentials.");
    }
    setLoading(false);
  }

  return (
    <>
      <div className="my-5 p-4"></div>
      <div className="p-3 my-5">
        <div className="text-center p-5 text-decoration-underline h4 my-3 text-white">
          LOGIN FORM
        </div>
        <div className="row justify-content-center">
          <div className="col-sm-12 col-md-6 border border-3 border-dark bg-dark p-4 rounded text-white">
            {error && <div className="alert alert-danger text-center">{error}</div>}
            
            <form onSubmit={handleLoginFormSubmit}>
              <div className="row mb-3 align-items-center">
                <div className="col-4 h5 text-end m-0">
                  <label htmlFor="email">EmailId:</label>
                </div>
                <div className="col-8">
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
                <div className="col-4 h5 text-end m-0">
                  <label htmlFor="password">Password:</label>
                </div>
                <div className="col-8">
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
                  value={loading ? "Logging in..." : "Login"}
                  className="mx-1 btn btn-warning"
                  disabled={loading}
                />
                <button
                  type="button"
                  className="mx-1 btn btn-secondary"
                  onClick={() => onNavigate("SignUp")}
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
