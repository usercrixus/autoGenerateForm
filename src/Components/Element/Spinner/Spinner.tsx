import React from "react";
import "./spinner.css";

export default function LoadingSpinner() {
  return (
    <div className="fullCenter">
      <div className="spinner-container">
        <div className="loading-spinner" />
      </div>
    </div>
  );
}
