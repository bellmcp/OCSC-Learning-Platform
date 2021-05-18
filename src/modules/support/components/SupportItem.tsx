//@ts-nocheck
import React from "react";
import { useDispatch } from "react-redux";
import DayJS from "react-dayjs";
import {
  Typography,
  Grid,
  CardContent,
  Card,
  Box,
  Divider,
  CardActions,
  Button,
  Link,
  Badge,
} from "@material-ui/core";
import {
  Check as CheckIcon,
  ChatBubbleOutlineOutlined as ChatBubbleIcon,
  ModeComment as ModeCommentIcon,
  AttachFile as AttachmentIcon,
} from "@material-ui/icons";

import * as supportActions from "modules/support/actions";

import { SupportProps } from "../types";

export default function SupportItem({
  id,
  subject,
  message,
  contact,
  attachFile,
  createDate,
  replyMessage,
  replyDate,
  isAcknowledged,
}: SupportProps) {
  const dispatch = useDispatch();

  const markSupportAsRead = () => {
    const mark_as_read_action = supportActions.markSupportAsRead(id);
    dispatch(mark_as_read_action);
  };

  const renderReadButton = () => {
    if (replyMessage !== null) {
      if (!isAcknowledged) {
        return (
          <CardActions>
            <Button
              onClick={markSupportAsRead}
              color="primary"
              variant="contained"
              startIcon={<CheckIcon />}
              fullWidth
            >
              ทำเครื่องหมายว่าอ่านแล้ว
            </Button>
          </CardActions>
        );
      } else {
        return (
          <CardActions>
            <Button
              disabled
              color="primary"
              variant="contained"
              startIcon={<CheckIcon />}
              fullWidth
            >
              อ่านแล้ว
            </Button>
          </CardActions>
        );
      }
    } else {
      return (
        <>
          <Divider />
          <Box m={2}>
            <Typography
              variant="body2"
              component="p"
              align="center"
              color="textSecondary"
            >
              โปรดรอการตอบกลับจากเจ้าหน้าที่
            </Typography>
          </Box>
        </>
      );
    }
  };

  return (
    <Box my={3}>
      <Card>
        <CardContent>
          <Box m={3}>
            <Typography
              variant="body2"
              color="secondary"
              component="p"
              style={{ fontWeight: "bold" }}
              gutterBottom
            >
              เลขที่อ้างอิง: {id}
            </Typography>
            <Grid
              container
              alignItems="center"
              style={{ marginBottom: 4 }}
              wrap="nowrap"
            >
              <ChatBubbleIcon style={{ marginRight: 10 }} />
              <Typography
                variant="h6"
                component="h2"
                gutterBottom
                style={{ lineHeight: "1.2" }}
              >
                {subject}
              </Typography>
            </Grid>
            {message ? (
              <Typography
                variant="body1"
                component="p"
                gutterBottom
                style={{ marginBottom: 16, lineHeight: "1.3" }}
              >
                {message}
              </Typography>
            ) : null}
            <Typography
              variant="caption"
              component="p"
              color="textSecondary"
              style={{ lineHeight: "1.3", marginBottom: 2 }}
            >
              <b>ช่องทางติดต่อกลับ</b> {contact}
            </Typography>
            <Typography variant="caption" component="p" color="textSecondary">
              <b>ส่งเมื่อ</b>{" "}
              <DayJS format="D/M/YYYY HH:mm" add={{ years: 543 }}>
                {createDate}
              </DayJS>
              {attachFile ? (
                <>
                  <AttachmentIcon
                    style={{
                      fontSize: 14,
                      marginLeft: "16px",
                      marginRight: "4px",
                    }}
                  />
                  <Link href={attachFile} target="_blank" rel="noreferrer">
                    ไฟล์แนบ
                  </Link>
                </>
              ) : null}
            </Typography>
          </Box>
          {replyMessage ? (
            <>
              <Divider />
              <Box m={3}>
                <Grid container alignItems="center" justify="flex-end">
                  <Badge variant="dot" color="error" invisible={isAcknowledged}>
                    <ModeCommentIcon />
                  </Badge>
                  <Typography
                    variant="h6"
                    component="h1"
                    gutterBottom
                    style={{ marginLeft: "10px" }}
                  >
                    ข้อความจากเจ้าหน้าที่
                  </Typography>
                </Grid>
                <Typography
                  variant="body1"
                  component="p"
                  gutterBottom
                  align="right"
                  style={{ lineHeight: "1.3", marginBottom: 16 }}
                >
                  {replyMessage}
                </Typography>
                <Typography
                  variant="caption"
                  component="h2"
                  align="right"
                  color="textSecondary"
                >
                  <b>ตอบกลับเมื่อ</b>{" "}
                  <DayJS format="D/M/YYYY HH:mm" add={{ years: 543 }}>
                    {replyDate}
                  </DayJS>
                </Typography>
              </Box>
            </>
          ) : null}
        </CardContent>
        {renderReadButton()}
      </Card>
    </Box>
  );
}
