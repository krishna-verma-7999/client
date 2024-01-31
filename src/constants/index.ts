import { List } from "@mui/icons-material";
import CreateIcon from "@mui/icons-material/Create";
import DashboardIcon from "@mui/icons-material/Dashboard";

export const AdminRoutes = [
  {
    label: "Create Task",
    icon: CreateIcon,
    link: "/create-task",
  },
  {
    label: "Dashboard",
    icon: DashboardIcon,
    link: "/",
  },
];

export const UserRoutes = [
  {
    label: "My Task",
    icon: List,
    link: "/",
  },
];
