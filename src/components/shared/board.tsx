import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Column from "./column";
import Card from "./Card";

const Board: React.FC = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: "flex" }}>
        <Column title="To Do">
          <Card title="Task 1" />
          <Card title="Task 2" />
        </Column>
        <Column title="In Progress" />
        <Column title="Done" />
        <Column title="failed" />
      </div>
    </DndProvider>
  );
};

export default Board;
