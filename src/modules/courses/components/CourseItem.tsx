// @ts-nocheck
import React from 'react';
import { Link as RouterLink, useRouteMatch } from 'react-router-dom';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import { FiberManualRecord as Circle } from '@material-ui/icons';
import categoryColor from 'utils/categoryColor';

import { CategoryProps } from 'modules/categories/types';

interface CourseItemProps {
  categories: CategoryProps[];
  id: number;
  code: string;
  name: string;
  courseCategoryId: number;
  learningObjective: string;
  thumbnail: string;
}

const useStyles = makeStyles((theme) => ({
  card: {
    height: '100%',
    display: 'flex',
    padding: '15px',
    paddingBottom: 0,
    flexDirection: 'column',
    position: 'relative',
    background: 'none',
    boxShadow: 'none',
    transition: '0.3s',
    // eslint-disable-next-line no-useless-computed-key
    ['@media (hover: hover) and (pointer: fine)']: {
      '&:hover': {
        transform: 'translateY(-4px)',
      },
    },
  },
  actionArea: {
    borderRadius: 5,
  },
  focusHighlight: {},
  cardMedia: {
    paddingTop: '90%',
    borderRadius: theme.shape.borderRadius,
    boxShadow:
      '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
  },
  cardMediaStack: {
    paddingTop: '90%',
    marginTop: '8px',
    borderRadius: theme.shape.borderRadius,
    boxShadow:
      '0 2px 1px -1px rgba(0,0,0,0.2), 0 1px 1px 0px rgba(0,0,0,0.14), 0 1px 3px 0px rgba(0,0,0,0.12), 0 -1px 1px rgba(0,0,0,0.15), 0 -10px 0 -5px #eee, 0 -10px 1px -4px rgba(0,0,0,0.15), 0 -20px 0 -10px #eee, 0 -20px 1px -9px rgba(0,0,0,0.15)',
  },
  cardDetail: {
    position: 'absolute',
    color: 'white',
    textAlign: 'center',
    bottom: '15px',
    left: '50%',
    transform: 'translateX(-50%)',
  },
  cardContent: {
    flexGrow: 1,
    padding: 0,
  },
  title: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 1,
    WebkitBoxOrient: 'vertical',
  },
  genre: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 1,
    WebkitBoxOrient: 'vertical',
  },
  detail: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
  },
}));

export default function CourseItem({
  categories,
  id,
  code,
  name,
  courseCategoryId,
  learningObjective,
  thumbnail,
}: CourseItemProps) {
  const classes = useStyles();
  const { path } = useRouteMatch();
  const basePath = process.env.REACT_APP_BASE_PATH;

  const getCourseDetailsTargetUrl = () => {
    switch (path) {
      case `${basePath}/search`:
      case `${basePath}/curriculums/:id`:
        return `${basePath}/courses/${id}`;
      case `${basePath}/courses`:
        return `${path}/${id}`;
      default:
        return `${path}/courses/${id}`;
    }
  };

  return (
    <CardActionArea
      component={RouterLink}
      to={getCourseDetailsTargetUrl}
      classes={{
        root: classes.actionArea,
        focusHighlight: classes.focusHighlight,
      }}
    >
      <Card className={classes.card}>
        <CardMedia
          key={id}
          className={classes.cardMedia}
          image={thumbnail}
          title={name}
          style={{
            background: `url('${thumbnail}')`,
            backgroundColor: 'lightgray',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
          }}
        />
        <CardContent className={classes.cardContent}>
          <Box my={2}>
            <Typography className={classes.title} variant="h6" component="h2">
              {name ? name : 'รายวิชา'}
            </Typography>
            <Typography variant="body2">
              <div className={classes.genre}>{code ? code : 'รหัสรายวิชา'}</div>
            </Typography>
            <Box my={1}>
              <Typography
                variant="body2"
                gutterBottom
                color="textSecondary"
                component="p"
              >
                <div
                  className={classes.detail}
                  dangerouslySetInnerHTML={{
                    __html: learningObjective
                      ? learningObjective
                      : 'ไม่มีข้อมูล',
                  }}
                ></div>
              </Typography>
            </Box>
            <Box mt={2} mb={1}>
              <Typography variant="body2">
                <div className={classes.genre}>
                  <Circle
                    style={{
                      color: categoryColor(courseCategoryId),
                      fontSize: 12,
                      marginRight: 6,
                    }}
                  />
                  {categories[courseCategoryId - 1]?.courseCategory}
                </div>
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </CardActionArea>
  );
}
