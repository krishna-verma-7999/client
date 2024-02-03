import { List } from "@mui/icons-material";
import CreateIcon from "@mui/icons-material/Create";
import DashboardIcon from "@mui/icons-material/Dashboard";
import QueryStatsIcon from "@mui/icons-material/QueryStats";

export const AdminRoutes = [
  {
    label: "Create Task",
    Icon: CreateIcon,
    link: "/create-task",
  },
  {
    label: "Dashboard",
    Icon: DashboardIcon,
    link: "/",
  },
];

export const UserRoutes = [
  {
    label: "My Task",
    Icon: List,
    link: "/",
  },
  {
    label: "My performance",
    Icon: QueryStatsIcon,
    link: "/stats",
  },
];
