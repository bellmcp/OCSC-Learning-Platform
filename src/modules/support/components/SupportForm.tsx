import React from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Typography, Grid, TextField, Button } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Send as SendIcon } from "@material-ui/icons";

import * as actions from "../actions";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
        width: "calc(100% - 20px)",
      },
    },
  })
);

export default function SupportForm() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data: any) => {
    const action = actions.sendSupport(data);
    dispatch(action);
  };

  return (
    <>
      <Typography gutterBottom variant="h6" style={{ fontSize: "1.7rem" }}>
        ติดต่อเจ้าหน้าที่
      </Typography>
      <form
        className={classes.root}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        autoComplete="off"
      >
        <TextField
          name="subject"
          inputRef={register({ required: true })}
          helperText={errors.subject && "กรุณากรอกปัญหาที่พบ"}
          error={!!errors.subject}
          id="subject"
          label="ปัญหาที่พบ"
          placeholder="เช่น ลงทะเบียนเรียนไม่ได้"
          required
          multiline
        />
        <TextField
          name="message"
          inputRef={register}
          id="message"
          label="รายละเอียด (ถ้ามี)"
          multiline
        />
        <TextField
          name="contact"
          inputRef={register({ required: true })}
          helperText={
            errors.contact
              ? "กรุณากรอกช่องทางติดต่อกลับ"
              : "เบอร์โทรศัพท์ หรือ อีเมล และเวลาที่สะดวกติดต่อกลับ (ถ้ามี)"
          }
          error={!!errors.contact}
          id="contact"
          label="ช่องทางติดต่อกลับ"
          required
          multiline
        />
        <Grid container alignItems="center">
          <Grid item style={{ marginRight: 20 }}>
            <Typography variant="body1" color="textSecondary">
              ไฟล์แนบ (ถ้ามี)
            </Typography>
          </Grid>
          <Grid item>
            <input
              name="attachFile"
              id="attachFile"
              type="file"
              style={{ width: "100%" }}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          color="primary"
          variant="contained"
          startIcon={<SendIcon />}
          style={{ marginTop: 34 }}
        >
          ส่ง
        </Button>
      </form>
    </>
  );
}
