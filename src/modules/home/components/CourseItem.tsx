// @ts-nocheck
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link as RouterLink } from "react-router-dom";
import Skeleton from "@material-ui/lab/Skeleton";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import { FiberManualRecord as Circle } from "@material-ui/icons";
import categoryColor from "utils/categoryColor";

const useStyles = makeStyles((theme) => ({
  card: {
    height: "100%",
    display: "flex",
    padding: "15px",
    paddingBottom: 0,
    flexDirection: "column",
    position: "relative",
    background: "none",
    boxShadow: "none",
  },
  actionArea: {
    borderRadius: theme.shape.borderRadius,
  },
  focusHighlight: {},
  cardMedia: {
    paddingTop: "75%", // 4:3
    borderRadius: theme.shape.borderRadius,
    boxShadow:
      "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
  },
  cardMediaStack: {
    paddingTop: "75%", // 4:3
    marginTop: "8px",
    borderRadius: theme.shape.borderRadius,
    boxShadow:
      "0 2px 1px -1px rgba(0,0,0,0.2), 0 1px 1px 0px rgba(0,0,0,0.14), 0 1px 3px 0px rgba(0,0,0,0.12), 0 -1px 1px rgba(0,0,0,0.15), 0 -10px 0 -5px #eee, 0 -10px 1px -4px rgba(0,0,0,0.15), 0 -20px 0 -10px #eee, 0 -20px 1px -9px rgba(0,0,0,0.15)",
  },
  cardDetail: {
    position: "absolute",
    color: "white",
    textAlign: "center",
    bottom: "15px",
    left: "50%",
    transform: "translateX(-50%)",
  },
  cardContent: {
    flexGrow: 1,
    padding: 0,
  },
  title: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: 1,
    WebkitBoxOrient: "vertical",
  },
  genre: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: 1,
    WebkitBoxOrient: "vertical",
  },
  detail: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
  },
}));

export default function CourseItem({
  id,
  Code,
  Name,
  CourseCategoryId,
  LearningObjective,
  LearningTopic,
  TargetGroup,
  Assessment,
  Thumbnail,
  SeqFlow,
}: any) {
  const classes = useStyles();
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadCategories = async () => {
      setIsLoading(true);
      const { data } = await axios.get("/CourseCategories");
      setCategories(data);
      setIsLoading(false);
    };

    loadCategories();
  }, []);

  return (
    <CardActionArea
      component={RouterLink}
      to={`courses/${id}`}
      classes={{
        root: classes.actionArea,
        focusHighlight: classes.focusHighlight,
      }}
    >
      <Card className={classes.card}>
        <CardMedia
          key={id}
          className={classes.cardMedia}
          image={Thumbnail}
          title={Name}
          style={{
            background: `url('${Thumbnail}')`,
            backgroundSize: "cover",
          }}
        />
        <CardContent className={classes.cardContent}>
          <Box my={2}>
            <Typography className={classes.title} variant="h6" component="h2">
              {Name}
            </Typography>
            <Typography variant="body2">
              <div className={classes.genre}>{Code}</div>
            </Typography>
            <Box my={1}>
              <Typography
                variant="body2"
                gutterBottom
                color="textSecondary"
                component="p"
              >
                <div className={classes.detail}>{LearningObjective}</div>
              </Typography>
            </Box>
            <Box mt={2} mb={1}>
              <Typography variant="body2">
                {isLoading ? (
                  <Skeleton />
                ) : (
                  <div className={classes.genre}>
                    <Circle
                      style={{
                        color: categoryColor(CourseCategoryId),
                        fontSize: 12,
                        marginRight: 6,
                      }}
                    />
                    {categories[CourseCategoryId]?.CourseCategory}
                  </div>
                )}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </CardActionArea>
    // <Grid item xs={12} sm={6} lg={3}>
    //   <Card onClick={navigateToDetails}>
    //     <CardActionArea>
    //       <CardMedia image={Thumbnail} title={Name} className={classes.media} />
    //       <CardContent>
    //         <Typography gutterBottom variant="h5" component="h2">
    //           {Name}
    //         </Typography>
    //         <Typography
    //           gutterBottom
    //           variant="body2"
    //           component="p"
    //           color="textSecondary"
    //           className={classes.description}
    //         >
    //           {LearningObjective}
    //         </Typography>
    //         <Grid
    //           container
    //           alignItems="center"
    //           justify="space-between"
    //           className={classes.footer}
    //         >
    //           <span>{Code}</span>
    //           <Chip
    //             label={categories[CourseCategoryId - 1]?.CourseCategory}
    //             size="small"
    //           ></Chip>
    //         </Grid>
    //       </CardContent>
    //     </CardActionArea>
    //   </Card>
    // </Grid>
  );
}
