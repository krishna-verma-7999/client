import { Outlet } from "react-router";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { useEffect } from "react";
import { setUser } from "../../store/auth-slice";
import { useGetUserByTokenIdMutation } from "../../store/api";
import { useDispatch } from "react-redux";

const AuthLayout = () => {
  const [getUser, { isLoading }] = useGetUserByTokenIdMutation();
  const dispatch = useDispatch();

  const { isAuthenticated } = useAppSelector((state) => state.authUser);

  // console.log(isAuthenticated);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const data: any = await getUser();
        dispatch(
          setUser({
            isAuthenticated: true,
            name: data.data.name,
            email: data.data.email,
            role: data.data.role!,
          })
        );
      } else {
        setUser({
          isAuthenticated: false,
          name: "",
          email: "",
          role: "Employee",
        });
      }
    };

    fetchData(); // Call the async function immediately
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      {isAuthenticated ? (
        <Navigate to={"/"} />
      ) : (
        <div>
          <Outlet />
        </div>
      )}
    </div>
  );
};

export default AuthLayout;
