import "./card.css";
import { Task, UserDetails } from "../../types";
import { useGetUserByIdMutation } from "../../store/api";
import { useEffect, useState } from "react";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";

const Card = ({ task, status }: { task: Task; status: string }) => {
  const [getUserByid] = useGetUserByIdMutation();
  const [user, setUser] = useState<UserDetails | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const data: any = await getUserByid(task.assignedTo);
      setUser(data.data);
    };

    getUser();
  }, [getUserByid, task]);

  let cardBorderStatus;
  let cardBackgroundColor;
  // console.log(status);
  if (status === "Done") {
    cardBorderStatus = "2px solid green";
    cardBackgroundColor = "#eafaf1";
  } else if (status === "Failed") {
    cardBorderStatus = "2px solid red";
    cardBackgroundColor = "#faeaea";
  } else if (status === "In Progress") {
    cardBorderStatus = "2px solid gold";
    cardBackgroundColor = "#f8f6eb";
  } else {
    cardBorderStatus = "2px solid blue";
    cardBackgroundColor = "#f4f4f4";
  }

  let priority;

  if (task.priority === "high") {
    priority = {
      label: "High",
      Icon: ArrowUpward,
      color: "red",
    };
  } else if (task.priority === "not_hurry") {
    priority = {
      label: "Low",
      Icon: ArrowDownward,
      color: "green",
    };
  } else {
    priority = {
      label: "Medium",
      Icon: ArrowUpward,
      color: "gold",
    };
  }

  return (
    <div
      className="Card"
      style={{ borderLeft: cardBorderStatus, background: cardBackgroundColor }}
    >
      <h4>{task.title}</h4>
      {user?.name ? (
        <p className="card__subtitle">Assigned To - {user.name}</p>
      ) : (
        <p className="card__subtitle">Yet to assigned</p>
      )}
      <p className="card__time">Estimated Time - {task.timeEstimate} minutes</p>
      <p className="card__priority" style={{ color: priority.color }}>
        <span>{priority.label}</span>
        <priority.Icon />
      </p>
    </div>
  );
};

export default Card;
