// Card.tsx
import React from "react";
import { useDrag } from "react-dnd";

interface CardProps {
  title: string;
}

const Card: React.FC<CardProps> = ({ title }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "CARD",
    item: { title },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        border: "1px solid #ccc",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
      }}
    >
      {title}
    </div>
  );
};

export default Card;
