import React from "react";
import { useNavigate } from "react-router-dom";

const ScaleDownButton = ({
  to,
  type,
  children,
  className = "",
  delay = 300,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    setTimeout(() => {
      navigate(to);
    }, delay);
  };

  return (
    <button
    type="type"
      onClick={handleClick}
      className={`
        transition-all duration-200
        active:scale-85
        active:brightness-90
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default ScaleDownButton;
