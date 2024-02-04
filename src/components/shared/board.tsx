import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Todos } from "../../types";
import {
  useGetAllTodoTaskMutation,
  useUpdateTodoStatusMutation,
} from "../../store/api";
import { formatData } from "../../helper/kanbanFormatData";

import "./board.css";
import Card from "./Card";

const Board = () => {
  const [getTodos] = useGetAllTodoTaskMutation();
  const [todos, setTodos] = useState<any[]>([]);
  const [updateStatus] = useUpdateTodoStatusMutation();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function getAllTodos() {
    const res: any = await getTodos();
    const todos: Todos[] = res.data;
    console.log(todos);

    if (todos?.length > 0) {
      const formattedData = formatData(todos);
      setTodos(formattedData);
    } else {
      return <h2>No data...</h2>;
    }
  }
  useEffect(() => {
    setIsLoading(true);
    getAllTodos();
    setIsLoading(false);
  }, []);

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

      // console.log(destinationCol.id);

      const sourceTask = [...sourceCol.tasks];

      const destinationTask = [...destinationCol.tasks];

      const [removed] = sourceTask.splice(source.index, 1);
      // console.log(removed.assignedTo);
      destinationTask.splice(destination.index, 0, removed);
      todos[sourceColIndex].tasks = [...sourceTask];
      todos[destinationColIndex].tasks = [...destinationTask];

      // console.log(removed);
      const assignedToId = removed.assignedTo;
      const taskId = removed._id;
      const currentStatus = sourceCol.id;
      const updatedStatus = destinationCol.id;
      console.log(currentStatus, updatedStatus);
      if (currentStatus === "failed") {
        alert("Task already failed. You cannot update its status");
        getAllTodos();
        return;
      }
      if (currentStatus === "done") {
        alert("Task already done. you cannot change it now!");
        getAllTodos();
        return;
      }
      const res: any = await updateStatus({
        assignedToId,
        taskId,
        updatedStatus,
      });
      if (res?.data?.status === 401) {
        alert("You cannot update the task that is not assigned to you");
      } else if (res.data.status === 200) {
        alert(
          "Email has been sent to admin to notify that you have updated your status"
        );
      }
      getAllTodos();
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>Kanban board</h1>
      {todos.length > 0 ? (
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
                              <Card task={task} status={todo.title} />
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
      ) : (
        <p
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: "5rem",
          }}
        >
          No Task.
        </p>
      )}
    </>
  );
};

export default Board;
