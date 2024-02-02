import React, { ReactNode } from "react";
import "./card.css";

const Card = ({ children }: { children: ReactNode }) => {
  return <div className="Card">{children}</div>;
};

export default Card;
