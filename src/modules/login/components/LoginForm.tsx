import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import {
  TextField,
  Button,
  FormHelperText,
  Typography,
  InputAdornment,
  IconButton,
  Paper,
  Toolbar,
  Grid,
  Divider,
  Box,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  Person as PersonIcon,
  Lock as LockIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  ArrowForwardIos as ArrowForwardIcon,
} from "@material-ui/icons";
import * as actions from "../actions";

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.default,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
    padding: theme.spacing(16, 16),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(10, 4),
    },
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

interface State {
  password: string;
  showPassword: boolean;
}

export default function LoginForm() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const linkToForgotPassword = () => {
    window.open(`${process.env.REACT_APP_PORTAL_URL}forget`, "_blank");
  };

  const linkToSignUp = () => {
    window.open(`${process.env.REACT_APP_PORTAL_URL}signup`, "_blank");
  };

  const { register, handleSubmit, errors } = useForm({
    mode: "onSubmit",
    validationSchema: yup.object().shape({
      userId: yup
        .string()
        .required("กรุณากรอกเลขประจำตัวประจำตัวประชาชน")
        .matches(/^[0-9]{13}$/, "กรุณากรอกเป็นตัวเลข 13 หลักเท่านั้น"),
      password: yup.string().required(),
    }),
  });

  const onLogin = (loginInfo: object) => {
    const info = { ...loginInfo, role: "user" };
    const actionLogin = actions.loadLogin(info);
    dispatch(actionLogin);
  };

  const { messageLogin } = useSelector((state: any) => state.login);

  return (
    <Paper className={classes.paper} elevation={0}>
      <Toolbar />
      <Grid container direction="row" justify="center" alignItems="center">
        <Typography
          component="h1"
          variant="h4"
          style={{ fontWeight: 600 }}
          gutterBottom
        >
          เข้าสู่ระบบ
        </Typography>
      </Grid>
      <Typography
        component="h2"
        variant="body2"
        color="textSecondary"
      ></Typography>
      <form className={classes.form} noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          inputRef={register}
          label="เลขประจำตัวประชาชน"
          name="userId"
          helperText={errors.userId ? "กรุณากรอกเลขประจำตัวประชาชน" : null}
          error={!!errors.userId}
          style={{ letterSpacing: " 0.25em" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          inputRef={register}
          label="รหัสผ่าน"
          name="password"
          autoComplete="on"
          helperText={errors.password ? "กรุณากรอกรหัสผ่าน" : null}
          error={!!errors.password}
          style={{ letterSpacing: " 0.25em" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? (
                    <VisibilityIcon />
                  ) : (
                    <VisibilityOffIcon />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
          type={values.showPassword ? "text" : "password"}
          value={values.password}
          onChange={handleChange("password")}
        />
        <Button onClick={linkToForgotPassword}>ลืมรหัสผ่าน</Button>
        <FormHelperText
          error
          style={{ fontSize: "0.9rem", textAlign: "center" }}
        >
          {messageLogin ? messageLogin : ""}
        </FormHelperText>
        <Button
          size="large"
          color="secondary"
          variant="contained"
          className={classes.submit}
          fullWidth
          type="submit"
          onClick={handleSubmit(onLogin)}
        >
          เข้าสู่ระบบ
        </Button>
      </form>
      <Box mt={4}>
        <Divider />
      </Box>
      <Box my={3}>
        <Grid container justify="space-between" alignItems="center">
          <Typography variant="body2" color="textPrimary">
            ยังไม่มีบัญชีใช่ไหม?
          </Typography>
          <Button
            onClick={linkToSignUp}
            variant="text"
            endIcon={<ArrowForwardIcon />}
          >
            สมัครสมาชิก
          </Button>
        </Grid>
      </Box>
    </Paper>
  );
}
