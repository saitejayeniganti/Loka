import React from "react";
import { Link } from "react-router-dom";

export const ErrorPath = () => {
  return (
    <>
      <h1 style={{ textAlign: "center" }}>Invalid Access Link</h1>
      <Link to="/" className="button-xlarge pure-button">
        Back Home
      </Link>
    </>
  );
};
