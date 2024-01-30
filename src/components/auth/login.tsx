import { TextField, Button, Grid, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    formState: { isValid },
  } = useForm<yup.InferType<typeof loginSchema>>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const submitHandler = (values: yup.InferType<typeof loginSchema>) => {
    // Handle form submission here, e.g., send data to server or perform validation

    console.log("Form submitted:", values);
  };

  return (
    <Grid
      container
      sx={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: "10rem",
      }}
    >
      <Grid item xs={10} sm={8} md={6}>
        <Paper style={{ padding: 20 }}>
          <Typography variant="h5" gutterBottom>
            Sign-in
          </Typography>
          <form onSubmit={handleSubmit(submitHandler)}>
            <Grid container spacing={2}>
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
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  // disabled={!isValid}
                >
                  Login
                </Button>
              </Grid>
            </Grid>
          </form>
          <Typography sx={{ fontSize: "14px", marginTop: "10px" }}>
            Don't have an account ?{" "}
            <Link
              to={"/sign-up"}
              style={{
                fontWeight: "bold",
                marginLeft: "4px",
              }}
            >
              register
            </Link>
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};
export default Login;