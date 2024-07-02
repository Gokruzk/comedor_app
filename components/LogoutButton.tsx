import React from "react";
import { ButtonProps } from "@/types";

const LogoutButton: React.FC<ButtonProps> = ({ title, style, onClick }) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      <button className={style}>{title}</button>
    </form>
  );
};

export default LogoutButton;
