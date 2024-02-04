import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CommentIcon from "@mui/icons-material/Comment";
import IconButton from "@mui/material/IconButton";

import React, { useEffect, useState } from "react";
import {
  useAssignedTaskMutation,
  useGetAllTodoTaskMutation,
} from "../../store/api";
import { Task, valuesInterFace } from "../../types";
import { Assignment } from "@mui/icons-material";

export default function TodoList() {
  const [todoTasks] = useGetAllTodoTaskMutation();
  const [tasks, setTasks] = useState<any[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [updateTask] = useAssignedTaskMutation();

  async function getTodoTasks() {
    const data: any = await todoTasks();
    setTasks(data.data);
  }

  useEffect(() => {
    setIsLoading(true);

    getTodoTasks();
    setIsLoading(false);
  }, []);

  //   console.log(tasks);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const updateStatus = async (values: valuesInterFace) => {
    // console.log(values);
    // eslint-disable-next-line no-restricted-globals
    const bool = confirm("Do you want to assigned self this task ?");
    if (bool) {
      setIsLoading(true);
      const updatedTask = await updateTask(values);
      console.log(updatedTask);
      getTodoTasks();
      setIsLoading(false);
    }
  };

  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 600,
        margin: "auto",
        bgcolor: "background.paper",
      }}
    >
      {tasks?.map((value) => {
        const status = value.status.toUpperCase();
        const assignedTo = value.assignedTo;
        return (
          <>
            <ListItem
              key={value._id}
              disableGutters
              secondaryAction={
                <>
                  {assignedTo === undefined ? (
                    <IconButton
                      aria-label="assigned_To_self"
                      onClick={() =>
                        updateStatus({
                          taskId: value._id,
                        })
                      }
                    >
                      <ListItemText
                        primary={"Yet to assigned"}
                        secondary={`assigned to self ?`}
                      />
                    </IconButton>
                  ) : (
                    <ListItemText
                      primary={"Assigned To"}
                      secondary={`${assignedTo.name}`}
                    />
                  )}
                </>
              }
            >
              {/* {value.assignedTo !== undefined && <p>{value.assignedTo.name}</p>} */}
              <ListItemText primary={`${value.title}`} secondary={status} />
            </ListItem>
          </>
        );
      })}
    </List>
  );
}
