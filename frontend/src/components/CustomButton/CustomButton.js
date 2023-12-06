import React from "react";
import "./CustomButton.scss";

export default function CustomButton({ text, background, onClick }) {
  return (
    <button
      className="CustomButton"
      style={{ background: background }}
      onClick={onClick}
      type="button"
    >
      {text}
    </button>
  );
}
