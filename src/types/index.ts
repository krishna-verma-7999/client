export interface CreateUser {
  name: string;
  email: string;
  password: string;
  asAdmin: boolean;
}

export interface ResponseData {
  message: string;
  status: number;
}
export interface CreatedUser {
  data?: ResponseData;
}

export interface Todos {
  createdBy: string;
  assignedTo: string;
  deadline: string;
  priority: string;
  status: string;
  timeEstimate: number;
  title: string;
  _id: string;
}

export interface Task {
  _id: string;
  title: string;
  priority: string;
  deadline: string;
  timeEstimate: number;
  assignedTo: string;
}

export interface KanbanBoards {
  id: string;
  title: string;
  tasks?: Task[];
}

export interface UserDetails {
  _id: string;
  name: string;
  role: string;
  email: string;
}
