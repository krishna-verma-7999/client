import "./card.css";
import { Task, UserDetails } from "../../types";
import { useGetUserByIdMutation } from "../../store/api";
import { useEffect, useState } from "react";

const Card = ({ task }: { task: Task }) => {
  const [getUserByid] = useGetUserByIdMutation();
  const [user, setUser] = useState<UserDetails | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const data: any = await getUserByid(task.assignedTo);
      setUser(data.data);
    };

    getUser();
  }, []);

  let cardBorderStatus;
  console.log(task);
  if (task.priority === "low") {
    cardBorderStatus = "2px solid green";
  } else if (task.priority === "high") {
    cardBorderStatus = "2px solid red";
  } else {
    cardBorderStatus = "2px solid gold";
  }

  return (
    <div className="Card" style={{ borderLeft: cardBorderStatus }}>
      <h4>{task.title}</h4>
      {user?.name && (
        <p className="card__subtitle">Assigned To - {user.name}</p>
      )}
      <p className="card__time">Estimated Time - {task.timeEstimate} minutes</p>
    </div>
  );
};

export default Card;
