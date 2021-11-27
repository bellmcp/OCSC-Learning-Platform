//@ts-nocheck
import React, { useRef, useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import { Link as RouterLink, useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Breadcrumbs,
  Grid,
  Box,
  Link,
  Divider,
  Button,
  Toolbar,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {
  NavigateNext as NavigateNextIcon,
  Print as PrintIcon,
  Inbox as InboxIcon,
} from '@material-ui/icons';

import Loading from 'modules/ui/components/Loading';
import CertificateRenderer from './CertificateRenderer';
import * as meActions from '../actions';

const useStyles = makeStyles((theme) => ({
  main: {
    display: 'flex',
  },
  content: {
    width: '100%',
    marginBottom: 50,
  },
  mr8: {
    marginRight: 8,
  },
  mr27: {
    marginRight: 27,
  },
}));

export default function CourseCertificateView() {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { id: certificateId }: any = useParams();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const PATH = process.env.REACT_APP_BASE_PATH;

  const {
    isCourseCertificatesLoading,
    courseCertificates,
    isCourseCertificateInfoLoading,
    courseCertificateInfo,
  } = useSelector((state: any) => state.me);
  const currentCertificate = courseCertificates.filter(
    (courseCertificate) => courseCertificate.id === parseInt(certificateId)
  )[0];
  const {
    text1,
    text2,
    text3,
    text4,
    signature,
    signer,
    position1,
    position2,
  } = courseCertificateInfo;

  useEffect(() => {
    const course_certificates_action = meActions.loadCourseCertificates();
    dispatch(course_certificates_action);
  }, [dispatch]);

  useEffect(() => {
    const course_certificate_info_action =
      meActions.loadCourseCertificateInfo(certificateId);
    dispatch(course_certificate_info_action);
  }, [dispatch, certificateId]);

  //PRINT
  const componentRef = useRef(null);
  const onBeforeGetContentResolve = useRef<(() => void) | null>(null);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState('old boring text');
  const handleAfterPrint = useCallback(() => {
    console.log('`onAfterPrint` called'); // tslint:disable-line no-console
  }, []);
  const handleBeforePrint = useCallback(() => {
    console.log('`onBeforePrint` called'); // tslint:disable-line no-console
  }, []);
  const handleOnBeforeGetContent = useCallback(() => {
    console.log('`onBeforeGetContent` called'); // tslint:disable-line no-console
    setLoading(true);
    setText('Loading new text...');

    return new Promise<void>((resolve) => {
      onBeforeGetContentResolve.current = resolve;

      setTimeout(() => {
        setLoading(false);
        setText('New, Updated Text!');
        resolve();
      }, 2000);
    });
  }, [setLoading, setText]);

  const reactToPrintContent = useCallback(() => {
    return componentRef.current;
  }, [componentRef.current]);

  const handlePrint = useReactToPrint({
    content: reactToPrintContent,
    documentTitle: `ประกาศนียบัตร-วิชา${certificateId}-${currentCertificate?.firstname}-${currentCertificate?.lastname}`,
    onBeforeGetContent: handleOnBeforeGetContent,
    onBeforePrint: handleBeforePrint,
    onAfterPrint: handleAfterPrint,
    removeAfterPrint: true,
    pageStyle:
      '@page { size: 210mm 297mm; margin: 0mm; } @media print { body { -webkit-print-color-adjust: exact; } }',
  });

  useEffect(() => {
    if (
      text === 'New, Updated Text!' &&
      typeof onBeforeGetContentResolve.current === 'function'
    ) {
      onBeforeGetContentResolve.current();
    }
  }, [onBeforeGetContentResolve.current, text]);

  function renderCertificateView() {
    if (isCourseCertificatesLoading || isCourseCertificateInfoLoading) {
      return <Loading height={307} />;
    } else if (!currentCertificate?.pass) {
      return (
        <Box my={15}>
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
        </Box>
      );
    } else {
      return (
        <>
          <Box my={3}>
            <Typography
              gutterBottom
              variant="h6"
              style={{
                fontSize: '1.7rem',
                marginBottom: 0,
                fontWeight: 600,
                lineHeight: '1.3',
              }}
            >
              วิชา {currentCertificate?.course}
            </Typography>
          </Box>
          <Box my={3}>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              <b className={classes.mr27}>ผู้สำเร็จการศึกษา</b>{' '}
              {currentCertificate?.title}
              {currentCertificate?.firstname} {currentCertificate?.lastname}
              <br />
              <b className={classes.mr8}>วันที่สำเร็จการศึกษา</b>{' '}
              {new Date(currentCertificate?.enddate).toLocaleDateString(
                'th-TH',
                {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                }
              )}
              <br />
              <b className={classes.mr27}>หน่วยงานรับรอง</b>{' '}
              {currentCertificate?.platform}
            </Typography>
          </Box>
          <Box my={6} style={{ overflow: 'auto' }}>
            <CertificateRenderer
              ref={componentRef}
              text={text}
              title={currentCertificate?.title}
              firstName={currentCertificate?.firstname}
              lastName={currentCertificate?.lastname}
              contentName={currentCertificate?.course}
              hour={currentCertificate?.hour}
              endDate={currentCertificate?.enddate}
              text1={text1}
              text2={text2}
              text3={text3}
              text4={text4}
              signature={signature}
              signer={signer}
              position1={position1}
              position2={position2}
            />
          </Box>
          <Box my={3}>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<PrintIcon />}
              onClick={handlePrint}
              size="large"
              fullWidth
            >
              {loading ? 'กำลังโหลด...' : 'สั่งพิมพ์'}
            </Button>
          </Box>
        </>
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
                  <Link
                    component={RouterLink}
                    color="inherit"
                    to={`${PATH}/me/certificate`}
                  >
                    พิมพ์ประกาศนียบัตร ก.พ.
                  </Link>
                  <Typography color="textPrimary">
                    ประกาศนียบัตรรายวิชา
                  </Typography>
                </Breadcrumbs>
              </Grid>
            </Box>
            <Divider />
            {renderCertificateView()}
          </main>
        </div>
      </Container>
    </>
  );
}
