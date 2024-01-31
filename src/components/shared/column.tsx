// Column.tsx
import React, { ReactNode } from "react";
import { useDrop } from "react-dnd";
import Card from "./Card";

interface ColumnProps {
  title: string;
  children?: ReactNode;
}

const Column: React.FC<ColumnProps> = ({ title, children }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "CARD",
    drop: () => ({ column: title }),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      style={{
        border: "1px solid #ccc",
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        background: isOver ? "#f0f0f0" : "white",
      }}
    >
      <h3>{title}</h3>
      <div>{children}</div>
    </div>
  );
};

export default Column;
