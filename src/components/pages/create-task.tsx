import {
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreateTaskMutation, useGetAllUserMutation } from "../../store/api";

import { FormLabel } from "@mui/material";
import { useEffect, useState } from "react";

const taskSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  priority: yup
    .string()
    .oneOf(["low", "medium", "high"])
    .required("Priority is required"),
  timeEstimate: yup
    .number()
    .required("Time Estimate is required")
    .positive("Time Estimate must be a positive number"),
  deadline: yup
    .date()
    .required("Deadline is required")
    .min(new Date(), "Deadline must be in the future"),
  assignedTo: yup.string(),
});

const CreateTask = () => {
  const [newUser, { isLoading }] = useGetAllUserMutation();
  const [users, setUsers] = useState<any>();

  const [createTask] = useCreateTaskMutation();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<yup.InferType<typeof taskSchema>>({
    resolver: yupResolver(taskSchema),
    defaultValues: {
      title: "",
      priority: "medium",
      timeEstimate: 0,
      deadline: new Date(),
      assignedTo: "",
    },
  });

  useEffect(() => {
    async function getAllUsers() {
      const token = localStorage.getItem("token");
      if (token) {
        const res: any = await newUser(token);
        setUsers(res.data);
      }
    }

    getAllUsers();
  }, []);

  const submitHandler = async (values: yup.InferType<typeof taskSchema>) => {
    const token = localStorage.getItem("token");
    const body = {
      ...values,
      token: token,
    };
    const res: any = await createTask(body);
    if (res.data) {
      alert("Task has been created");
      navigate("/");
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Grid
      container
      sx={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        paddingTop: "0",
      }}
    >
      <Grid item xs={10} sm={8} md={6}>
        <Paper style={{ padding: 20 }}>
          <Typography variant="h5" gutterBottom>
            Create Task
          </Typography>
          <form onSubmit={handleSubmit(submitHandler)}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Title"
                      fullWidth
                      error={!!errors.title}
                      helperText={errors.title && errors.title.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="priority"
                  control={control}
                  render={({ field }) => (
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel id="assignedTo-label">Priority</InputLabel>
                      <Select
                        {...field}
                        labelId="priority"
                        label="Priority"
                        error={!!errors.priority}
                      >
                        <MenuItem value="low">Low</MenuItem>
                        <MenuItem value="medium">Medium</MenuItem>
                        <MenuItem value="high">High</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="timeEstimate"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Time Estimate"
                      fullWidth
                      error={!!errors.timeEstimate}
                      helperText={
                        errors.timeEstimate && errors.timeEstimate.message
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <FormLabel />
                <Controller
                  name="deadline"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type="datetime-local"
                      label="Deadline"
                      fullWidth
                      error={!!errors.deadline}
                      helperText={errors.deadline && errors.deadline.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="assignedTo"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel id="assignedTo-label">Assigned To</InputLabel>
                      <Select
                        {...field}
                        labelId="assignedTo-label"
                        label="Assigned To"
                        error={!!errors.assignedTo}
                      >
                        {users?.map((user: any) => (
                          <MenuItem key={user._id} value={user._id}>
                            {user.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={isLoading}
                >
                  Create Task
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};
export default CreateTask;
