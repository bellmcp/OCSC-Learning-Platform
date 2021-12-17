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
import { amber } from '@material-ui/core/colors';

interface CurriculumItemProps {
  id: number;
  code: string;
  name: string;
  learningObjective: string;
  thumbnail: string;
}

const useStyles = makeStyles((theme) => ({
  card: {
    height: '100%',
    display: 'flex',
    padding: '30px 15px',
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
    overflow: 'visible',
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
    transition: '0.3s',
    boxShadow:
      '0 2px 1px -1px rgb(0 0 0 / 20%), 0 1px 1px 0px rgb(0 0 0 / 14%), 0 1px 3px 0px rgb(0 0 0 / 12%), 0 -1px 1px rgb(0 0 0 / 15%), 0 -14px 0 -5px rgb(243 243 243), 0 -14px 5px -4px rgb(0 0 0 / 20%), 0 -28px 0 -10px rgb(238 238 238), 0px -28px 5px -9px rgb(0 0 0 / 20%)',
    // // eslint-disable-next-line no-useless-computed-key
    // ['@media (hover: hover) and (pointer: fine)']: {
    //   '&:hover': {
    //     boxShadow:
    //       '0 2px 1px -1px rgb(0 0 0 / 20%), 0 1px 1px 0px rgb(0 0 0 / 14%), 0 1px 3px 0px rgb(0 0 0 / 12%), 0 -1px 1px rgb(0 0 0 / 15%), 0 -10px 0 -5px rgb(243 243 243), 0 -10px 5px -4px rgb(0 0 0 / 20%), 0 -22px 0 -10px rgb(238 238 238), 0px -22px 5px -9px rgb(0 0 0 / 20%)',
    //   },
    // },
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

export default function CurriculumItem({
  id,
  code,
  name,
  learningObjective,
  thumbnail,
}: CurriculumItemProps) {
  const classes = useStyles();
  const { path } = useRouteMatch();
  const basePath = process.env.REACT_APP_BASE_PATH;

  const getCurriculumDetailsTargetUrl = () => {
    switch (path) {
      case `${basePath}/search`:
      case `${basePath}/curriculums/:id`:
        return `${basePath}/curriculums/${id}`;
      case `${basePath}/curriculums`:
        return `${path}/${id}`;
      default:
        return `${path}/curriculums/${id}`;
    }
  };

  return (
    <CardActionArea
      component={RouterLink}
      to={getCurriculumDetailsTargetUrl}
      classes={{
        root: classes.actionArea,
        focusHighlight: classes.focusHighlight,
      }}
    >
      <Card className={classes.card}>
        <CardMedia
          key={id}
          className={classes.cardMediaStack}
          image={thumbnail}
          title={name}
          style={{
            background: `url('${thumbnail}')`,
            backgroundColor: 'lightgray',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            borderLeft: `8px solid ${amber[500]}`,
          }}
        />
        <CardContent className={classes.cardContent}>
          <Box my={2}>
            <Typography
              variant="body2"
              style={{ fontWeight: 'bold', color: amber[500] }}
            >
              หลักสูตร
            </Typography>
            <Typography className={classes.title} variant="h6" component="h2">
              {name ? name : 'หลักสูตร'}
            </Typography>
            <Typography variant="body2">
              <div className={classes.genre}>
                {code ? code : 'รหัสหลักสูตร'}
              </div>
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
          </Box>
        </CardContent>
      </Card>
    </CardActionArea>
  );
}
