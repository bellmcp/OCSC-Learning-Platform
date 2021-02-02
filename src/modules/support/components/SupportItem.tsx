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
  UserId,
  Subject,
  Message,
  Contact,
  AttachFile,
  CreateDate,
  ReplyMessage,
  ReplyDate,
  IsAcknowledged,
}: any) {
  const onRead = () => {
    alert(`{"Id": ${id}, "IsAcknowledged": true}`);
  };

  return (
    <Box my={3}>
      <Card elevation={4}>
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
              <Typography
                variant="h6"
                component="h1"
                gutterBottom
                style={{ fontWeight: 600 }}
              >
                {Subject}
              </Typography>
            </Grid>
            {Message ? (
              <Typography
                variant="body1"
                component="p"
                gutterBottom
                style={{ marginBottom: 16 }}
              >
                {Message}
              </Typography>
            ) : null}
            <Typography variant="caption" component="p" color="textSecondary">
              <b>ช่องทางติดต่อกลับ:</b> {Contact}
            </Typography>
            <Typography variant="caption" component="p" color="textSecondary">
              <b>ส่งเมื่อ:</b> {CreateDate}
              {AttachFile ? (
                <>
                  <AttachmentIcon
                    style={{
                      fontSize: 14,
                      marginLeft: "16px",
                      marginRight: "4px",
                    }}
                  />
                  <Link href={AttachFile} target="_blank">
                    ไฟล์แนบ
                  </Link>
                </>
              ) : null}
            </Typography>
          </Box>
          {ReplyMessage ? (
            <>
              <Divider />
              <Box m={3}>
                <Grid container alignItems="center" justify="flex-end">
                  <Badge variant="dot" color="error" invisible={IsAcknowledged}>
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
                  {ReplyMessage}
                </Typography>
                <Typography
                  variant="caption"
                  component="h2"
                  align="right"
                  color="textSecondary"
                >
                  <b>ส่งเมื่อ:</b> {ReplyDate}
                </Typography>
              </Box>
            </>
          ) : null}
        </CardContent>
        {ReplyMessage && !IsAcknowledged ? (
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
        ) : null}
      </Card>
    </Box>
  );
}
