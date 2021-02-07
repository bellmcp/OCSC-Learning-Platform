import React from "react";
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
}: any) {
  const onRead = () => {
    alert(`{"id": ${id}, "isAcknowledged": true}`);
  };

  const renderReadButton = () => {
    if (replyMessage !== null) {
      if (!isAcknowledged) {
        return (
          <CardActions>
            <Button
              onClick={onRead}
              color="secondary"
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
              color="secondary"
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
          <Box m={3}>
            <Typography variant="body1" component="p" align="center">
              รอการตอบกลับจากเจ้าหน้าที่
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
            <Grid container alignItems="center">
              <ChatBubbleIcon style={{ marginRight: 10 }} />
              <Typography variant="h6" component="h1" gutterBottom>
                {subject}
              </Typography>
            </Grid>
            {message ? (
              <Typography
                variant="body1"
                component="p"
                gutterBottom
                style={{ marginBottom: 16 }}
              >
                {message}
              </Typography>
            ) : null}
            <Typography variant="caption" component="p" color="textSecondary">
              <b>ช่องทางติดต่อกลับ:</b> {contact}
            </Typography>
            <Typography variant="caption" component="p" color="textSecondary">
              <b>ส่งเมื่อ:</b> {createDate}
              {attachFile ? (
                <>
                  <AttachmentIcon
                    style={{
                      fontSize: 14,
                      marginLeft: "16px",
                      marginRight: "4px",
                    }}
                  />
                  <Link href={attachFile} target="_blank">
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
                >
                  {replyMessage}
                </Typography>
                <Typography
                  variant="caption"
                  component="h2"
                  align="right"
                  color="textSecondary"
                >
                  <b>ตอบกลับเมื่อ:</b> {replyDate}
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
