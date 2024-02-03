import Login from "./components/auth/login";
import Register from "./components/auth/register";
import Home from "./components/pages/home";
import { Route, Routes } from "react-router";

import AuthLayout from "./components/layout/auth-layout";
import RootLayout from "./components/layout/root-layout";
import CreateTask from "./components/pages/create-task";
import Stats from "./components/pages/stats";

const App = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/sign-in" element={<Login />} />
        <Route path="/sign-up" element={<Register />} />
      </Route>
      <Route element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="/create-task" element={<CreateTask />} />
        <Route path="/stats" element={<Stats />} />
      </Route>
    </Routes>
  );
};

export default App;
