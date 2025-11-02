import React from "react";
import { DeleteButtonProps } from "@/types";

const DeleteButton: React.FC<DeleteButtonProps> = ({
  title,
  style,
  onClick,
}) => {
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

export default DeleteButton;
