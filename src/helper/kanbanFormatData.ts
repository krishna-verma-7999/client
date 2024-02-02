import { KanbanBoards, Todos } from "../types";

export const formatData = (tasks: Todos[]) => {
  const columns: KanbanBoards[] = [
    { id: "pending", title: "To Do", tasks: [] },
    { id: "in_progress", title: "In Progress", tasks: [] },
    { id: "done", title: "Done", tasks: [] },
    { id: "failed", title: "Failed", tasks: [] },
  ];

  // Map tasks to columns based on their status
  tasks.forEach((task) => {
    let columnIndex;
    switch (task.status) {
      case "pending":
        columnIndex = 0; // To Do column
        break;
      case "in_progress":
        columnIndex = 1; // In Progress column
        break;
      case "done":
        columnIndex = 2; // Done column
        break;
      case "failed":
        columnIndex = 3; // failed column
        break;
      default:
        columnIndex = 0; // Default to To Do column
    }
    columns[columnIndex]?.tasks?.push({
      _id: task._id,
      title: task.title,
      priority: task.priority,
      deadline: task.deadline,
      timeEstimate: task.timeEstimate,
      assignedTo: task.assignedTo,
    });
  });

  // Resulting Kanban board data

  return columns;
};
