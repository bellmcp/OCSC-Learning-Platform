import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import {
  TextField,
  Button,
  FormHelperText,
  Container,
  Typography,
  InputAdornment,
  IconButton,
  Paper,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  Person as PersonIcon,
  Lock as LockIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from "@material-ui/icons";
import * as actions from "../actions";
import Header from "modules/ui/components/Header";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(5, 3, 1),
    margin: theme.spacing(7, 1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
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

const TITLE = "เข้าสู่ระบบ";
const HERO_IMAGE_URL =
  "https://raw.githubusercontent.com/bellmcp/OCSC-Learning-Platform/master/src/assets/images/root/hero-min.jpg";

export default function Login() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });

  const handleChange = (prop: keyof State) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
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

  const { register, handleSubmit, errors } = useForm({
    mode: "onSubmit",
    validationSchema: yup.object().shape({
      userId: yup
        .string()
        .required("กรุณากรอกเลขประจำตัวประจำตัวประชาชน")
        .matches(/^[0-9]{13}$/, "กรุณากรอกเป็นตัวเลข 13 หลัก"),
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
    <>
      <Header
        title={TITLE}
        icon={<PersonIcon fontSize="large" style={{ marginRight: "24px" }} />}
        imageUrl={HERO_IMAGE_URL}
      />
      <Container component="main" maxWidth="xs">
        <Paper className={classes.paper}>
          <Typography
            component="h1"
            variant="h4"
            style={{ fontWeight: 600 }}
            gutterBottom
          >
            เข้าสู่ระบบ
          </Typography>
          <p style={{ textAlign: "center" }}>
            userID: 1555327140532
            <br />
            password: 12345678
            <br />
            CURRENT_API_ENDPOINT:
            https://welearn.ocsc.go.th/learning-portal-api/
          </p>
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
              helperText={errors.userId ? "กรุณากรอกเลขประจำตัวประชาชน" : ""}
              error={!!errors.userId}
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
              helperText={errors.password ? "กรุณากรอกรหัสผ่าน" : ""}
              error={!!errors.password}
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
            {messageLogin && (
              <FormHelperText error>{messageLogin}</FormHelperText>
            )}
            <Button
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
        </Paper>
      </Container>
    </>
  );
}
