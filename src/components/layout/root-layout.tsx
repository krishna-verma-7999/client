import { Outlet } from "react-router";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/auth-slice";
import { useGetUserByTokenIdMutation } from "../../store/api";
import MiniDrawer from "../shared/mainLayout";
import MainLayout from "../shared/mainLayout";

const RootLayout = () => {
  const [getUser, { isLoading }] = useGetUserByTokenIdMutation();
  const dispatch = useDispatch();

  const { isAuthenticated } = useAppSelector((state) => state.authUser);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const data: any = await getUser(token);
        // console.log(data?.data);
        dispatch(
          setUser({
            isAuthenticated: true,
            name: data.data.name,
            email: data.data.email,
            role: data.data.role!,
          })
        );
      } else {
        dispatch(
          setUser({
            isAuthenticated: false,
            name: "",
            email: "",
            role: "Employee",
          })
        );
      }
    };

    fetchData(); // Call the async function immediately
  }, []);
  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {!isAuthenticated ? (
        <Navigate to={"/sign-in"} />
      ) : (
        <MainLayout>
          <Outlet />
        </MainLayout>
      )}
    </>
  );
};

export default RootLayout;
