import React, { useEffect, useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  OnDragEndResponder,
} from "react-beautiful-dnd";
import { KanbanBoards, Task, Todos } from "../../types";
import {
  useGetAllTodoTaskMutation,
  useUpdateTodoStatusMutation,
} from "../../store/api";
import { formatData } from "../../helper/kanbanFormatData";

import "./board.css";
import Card from "./card";

const Board = () => {
  const [getTodos, { isLoading }] = useGetAllTodoTaskMutation();
  const [todos, setTodos] = useState<any[]>([]);
  const [updateStatus] = useUpdateTodoStatusMutation();
  console.log(isLoading);
  useEffect(() => {
    async function getAllTodos() {
      const token = localStorage.getItem("token");
      if (token) {
        const res: any = await getTodos();
        const todos: Todos[] = res.data;
        if (todos?.length > 0) {
          const formattedData = formatData(todos);
          setTodos(formattedData);
        }
      }
    }
    getAllTodos();
  }, [isLoading]);

  const onDragEnd = async (result: any) => {
    if (!result.destination) return;
    const { source, destination } = result;
    // console.log(result);

    if (source.droppableId !== destination.droppableId) {
      const sourceColIndex = todos.findIndex((a) => {
        return a.title === source.droppableId;
      });
      const destinationColIndex = todos.findIndex(
        (e) => e.title === destination.droppableId
      );

      const sourceCol = todos[sourceColIndex];
      const destinationCol = todos[destinationColIndex];

      console.log(destinationCol.id);

      const sourceTask = [...sourceCol.tasks];

      const destinationTask = [...destinationCol.tasks];

      const [removed] = sourceTask.splice(source.index, 1);
      // console.log(removed.assignedTo);
      destinationTask.splice(destination.index, 0, removed);
      todos[sourceColIndex].tasks = [...sourceTask];
      todos[destinationColIndex].tasks = [...destinationTask];

      const assignedId = removed.assignedTo;
      const updatedStatus = destinationCol.id;
      // console.log(assignedId, updatedStatus);
      const res = await updateStatus({ assignedId, updatedStatus });
      // console.log(res);
      // setTodos(todos);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="kanban">
        {todos.map((todo) => (
          <Droppable key={todo.title} droppableId={todo.title}>
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="kanban__section"
              >
                <div className="kanban__section__title">{todo.title}</div>

                <div className="kanban__section__content">
                  {todo.tasks?.map((task: any, index: any) => (
                    <Draggable
                      key={task._id}
                      index={index}
                      draggableId={task._id}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          style={{
                            ...provided.draggableProps.style,
                            opacity: snapshot.isDragging ? "0.5" : "1",
                          }}
                        >
                          <Card task={task} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default Board;
