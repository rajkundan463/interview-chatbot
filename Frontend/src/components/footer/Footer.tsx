// import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div
        style={{
          width: "100%",
          minHeight: "20vh",
          marginTop: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p
          style={{
            fontSize: "clamp(16px, 3vw, 22px)",
            textAlign: "center",
            opacity: 0.9,
          }}
        >
          BUILT WITH ❤️ BY{" "}
          <a
            href="https://github.com/RajKundan"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link"
            style={{ color: "white", fontWeight: 700 }}
          >
            RajKundan
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
