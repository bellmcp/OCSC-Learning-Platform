//@ts-nocheck
import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Typography,
  Breadcrumbs,
  Grid,
  Box,
  Link,
  Divider,
  useMediaQuery,
  Toolbar,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  NavigateNext as NavigateNextIcon,
  Inbox as InboxIcon,
} from '@material-ui/icons';

import * as meActions from '../actions';
import CourseCertificateItem from './CourseCertificateItem';
import CurriculumCertificateItem from './CurriculumCertificateItem';
import Loading from 'modules/ui/components/Loading';

const useStyles = makeStyles((theme) => ({
  main: {
    display: 'flex',
  },
  content: {
    width: '100%',
    marginBottom: 50,
  },
}));

export default function Certificate() {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const PATH = process.env.REACT_APP_BASE_PATH;
  const {
    isCourseCertificatesLoading,
    isCurriculumCertificatesLoading,
    courseCertificates,
    curriculumCertificates,
  } = useSelector((state: any) => state.me);

  const passedCourseCertificates = courseCertificates.filter(
    (certificate) => certificate.pass === true
  );
  const passedCurriculumCertificates = curriculumCertificates.filter(
    (certificate) => certificate.pass === true
  );

  useEffect(() => {
    const course_certificates_action = meActions.loadCourseCertificates();
    dispatch(course_certificates_action);
  }, [dispatch]);

  useEffect(() => {
    const curriculum_certificates_action =
      meActions.loadCurriculumCertificates();
    dispatch(curriculum_certificates_action);
  }, [dispatch]);

  function renderCourseCertificateList() {
    if (isCourseCertificatesLoading) {
      return <Loading height={307} />;
    } else if (passedCourseCertificates.length === 0) {
      return (
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          style={{ height: 150 }}
        >
          <InboxIcon
            color="disabled"
            style={{ fontSize: 54, marginBottom: 14 }}
          />
          <Typography component="h2" variant="body2" color="textSecondary">
            ไม่พบประกาศนียบัตร
          </Typography>
        </Grid>
      );
    } else {
      return (
        <Grid container direction="column" spacing={2}>
          {passedCourseCertificates.map((courseCertificate) => (
            <Grid item key={courseCertificate.id}>
              <CourseCertificateItem {...courseCertificate} />
            </Grid>
          ))}
        </Grid>
      );
    }
  }

  function renderCurriculumCertificateList() {
    if (isCurriculumCertificatesLoading) {
      return <Loading height={307} />;
    } else if (passedCurriculumCertificates.length === 0) {
      return (
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          style={{ height: 150 }}
        >
          <InboxIcon
            color="disabled"
            style={{ fontSize: 54, marginBottom: 14 }}
          />
          <Typography component="h2" variant="body2" color="textSecondary">
            ไม่พบประกาศนียบัตร
          </Typography>
        </Grid>
      );
    } else {
      return (
        <Grid container direction="column" spacing={2}>
          {passedCurriculumCertificates.map((curriculumCertificate) => (
            <Grid item key={curriculumCertificate.id}>
              <CurriculumCertificateItem {...curriculumCertificate} />
            </Grid>
          ))}
        </Grid>
      );
    }
  }

  return (
    <>
      <Toolbar />
      <Container>
        <div className={classes.main}>
          <main className={classes.content}>
            <Box mt={4} mb={3}>
              <Grid
                container
                direction="row"
                justify={matches ? 'flex-start' : 'center'}
                alignItems="center"
              >
                <Breadcrumbs
                  separator={<NavigateNextIcon fontSize="small" />}
                  aria-label="breadcrumb"
                >
                  <Link
                    component={RouterLink}
                    color="inherit"
                    to={`${PATH}/me`}
                  >
                    โปรไฟล์
                  </Link>
                  <Typography color="textPrimary">
                    พิมพ์ประกาศนียบัตร ก.พ.
                  </Typography>
                </Breadcrumbs>
              </Grid>
            </Box>
            <Divider />
            <Box my={3}>
              <Typography
                gutterBottom
                component="h2"
                variant="h6"
                style={{ fontSize: '1.7rem', fontWeight: 600 }}
                align={matches ? 'left' : 'center'}
              >
                ประกาศนียบัตรหลักสูตร
              </Typography>
            </Box>
            {renderCurriculumCertificateList()}
            <Box mt={5} mb={3}>
              <Typography
                gutterBottom
                component="h2"
                variant="h6"
                style={{ fontSize: '1.7rem', fontWeight: 600 }}
                align={matches ? 'left' : 'center'}
              >
                ประกาศนียบัตรรายวิชา
              </Typography>
            </Box>
            {renderCourseCertificateList()}
          </main>
        </div>
      </Container>
    </>
  );
}
