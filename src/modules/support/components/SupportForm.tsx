import React from "react";
import moment from "moment";
import { useForm } from "react-hook-form";
import { Typography, Grid, TextField, Button } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Send as SendIcon } from "@material-ui/icons";

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
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data: any) => {
    alert(
      `RESULT: ${JSON.stringify(
        data
      )}\nTIMESTAMP: {"CreateDate": ${moment().format("DD-MM-YYYY hh:mm:ss")}}`
    );
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
          name="Subject"
          inputRef={register({ required: true })}
          helperText={errors.Subject && "กรุณากรอกปัญหาที่พบ"}
          error={!!errors.Subject}
          id="Subject"
          label="ปัญหาที่พบ"
          placeholder="เช่น ลงทะเบียนเรียนไม่ได้"
          required
          multiline
        />
        <TextField
          name="Message"
          inputRef={register}
          id="Message"
          label="รายละเอียด (ถ้ามี)"
          multiline
        />
        <TextField
          name="Contact"
          inputRef={register({ required: true })}
          helperText={
            errors.Contact
              ? "กรุณากรอกช่องทางติดต่อกลับ"
              : "เบอร์โทรศัพท์ หรือ อีเมล และเวลาที่สะดวกติดต่อกลับ (ถ้ามี)"
          }
          error={!!errors.Contact}
          id="Contact"
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
              name="AttachFile"
              id="AttachFile"
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
