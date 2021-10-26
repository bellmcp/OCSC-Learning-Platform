import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Link from '@material-ui/core/Link';

import { PressProps } from '../types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cardSmall: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      transition: '0.3s',
      borderRadius: 6,
      boxShadow: '0 0 20px 0 rgba(0,0,0,0.12)',
      // eslint-disable-next-line no-useless-computed-key
      ['@media (hover: hover) and (pointer: fine)']: {
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)',
        },
      },
    },
    cardMediaSmall: {
      paddingTop: '75%', // 4:3
    },
    cardDetail: {
      position: 'absolute',
      color: 'white',
      textAlign: 'center',
      bottom: '15px',
      left: '50%',
      transform: 'translateX(-50%)',
    },
  })
);

export default function PressItem({
  id,
  headline,
  imageUrl,
  targetUrl,
}: PressProps) {
  const classes = useStyles();

  return (
    <Link href={targetUrl} target="_blank" rel="noreferrer">
      <Card className={classes.cardSmall} style={{ position: 'relative' }}>
        <CardMedia
          key={id}
          className={classes.cardMediaSmall}
          image={imageUrl}
          title={headline}
          style={{
            background: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75)), url('${imageUrl}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
          }}
        />
        <div className={classes.cardDetail}>{headline}</div>
      </Card>
    </Link>
  );
}
