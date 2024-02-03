import {
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreateUserMutation } from "../../services/authApi";
import { ResponseData } from "../../types";

const registerSchema = yup.object().shape({
  name: yup.string().required("user name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
  asAdmin: yup.boolean().required(),
});

const Register = () => {
  const [newUser, { isLoading }] = useCreateUserMutation();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<yup.InferType<typeof registerSchema>>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      asAdmin: false,
    },
  });

  const submitHandler = async (
    values: yup.InferType<typeof registerSchema>
  ) => {
    const res: any = await newUser(values);
    const data: ResponseData = res.data;
    if (data.status) {
      alert(data.message);
      navigate("/sign-in");
    }
  };

  return (
    <Grid
      container
      sx={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        paddingTop: "5rem",
      }}
    >
      <Grid item xs={10} sm={8} md={6}>
        <Paper style={{ padding: 20 }}>
          <Typography variant="h5" gutterBottom>
            Register
          </Typography>
          <form onSubmit={handleSubmit(submitHandler)}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="User Name"
                      fullWidth
                      error={!!errors.name}
                      helperText={errors.name && errors.name.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Email"
                      fullWidth
                      error={!!errors.email}
                      helperText={errors.email && errors.email.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type="password"
                      label="Password"
                      fullWidth
                      error={!!errors.password}
                      helperText={errors.password && errors.password.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="asAdmin"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={
                        <Checkbox {...field} checked={field.value === true} />
                      }
                      label="Continue as Admin"
                    />
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
                  Register
                </Button>
              </Grid>
            </Grid>
          </form>
          <Typography sx={{ fontSize: "14px", marginTop: "10px" }}>
            Already have an account?{" "}
            <Link
              to={"/sign-in"}
              style={{
                fontWeight: "bold",
                marginLeft: "4px",
              }}
            >
              log-in
            </Link>
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};
export default Register;
