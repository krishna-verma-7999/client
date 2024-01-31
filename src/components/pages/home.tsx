import { useEffect, useState } from "react";
import { useGetAllTodoTaskMutation } from "../../store/api";
import Board from "../shared/board";

const Home = () => {
  const [getTodos] = useGetAllTodoTaskMutation();
  const [todos, setTodos] = useState();
  console.log(todos);

  useEffect(() => {
    async function getAllTodos() {
      const token = localStorage.getItem("token");
      console.log(token);
      if (token) {
        const res: any = await getTodos(token);
        console.log(res);
        setTodos(res.data);
      }
    }
    getAllTodos();
  }, []);

  return (
    <div>
      <Board />
    </div>
  );
};

export default Home;
