//@ts-nocheck
import React, { useState, useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import {
  Box,
  Container,
  Divider,
  Grid,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { useTheme } from '@material-ui/core/styles';
import { getContentType, getContentTypeTitle } from 'utils/contentType';
import { generateContentSourceUrl } from 'utils/soureceUrl';
import {
  Hd as HdIcon,
  ArrowBack as ArrowLeft,
  ArrowDownward as ArrowBottom,
} from '@material-ui/icons';

import VideoPlayer from './Content/VideoPlayer';
import PdfViewer from './Content/PdfViewer';
import IframeViewer from './Content/IframeViewer';
import TestList from './Test/TestList';
import EvaluationList from './Evaluation/EvaluationList';

import HeroImage from 'assets/images/hero-learn.svg';

export default function ContentView({
  contentId,
  activeContentView,
  currentContentView,
  courseRegistrationDetails,
  currentSession,
  testStart,
  setTestStart,
  userTestAnswers,
  setUserTestAnswers,
}) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  // const registrationId = courseRegistrationDetails[0]?.id;
  const [activeSource, setActiveSource] = useState('');
  const contentSourceUrl1 = generateContentSourceUrl(
    isMobile,
    activeContentView?.content1
  );
  const contentSourceUrl2 = generateContentSourceUrl(
    isMobile,
    activeContentView?.content2
  );

  useEffect(() => {
    setActiveSource(contentSourceUrl1);
  }, [isMobile, activeContentView]);

  const handleSource = (
    event: React.MouseEvent<HTMLElement>,
    newSource: string | null
  ) => {
    if (newSource !== null) {
      setActiveSource(newSource);
    }
  };

  function checkVideoQuality() {
    if (!isMobile) {
      return (
        <HdIcon
          color="disabled"
          style={{ marginLeft: 12, marginBottom: '-4px' }}
        />
      );
    }
  }

  function renderContentView() {
    switch (getContentType(activeSource)) {
      case 'video':
        return <VideoPlayer url={activeSource} />;
      case 'pdf':
        return <PdfViewer url={activeSource} />;
      case 'iframe':
        return <IframeViewer url={activeSource} />;
      default:
        return (
          <Grid container justify="center" alignItems="center">
            <Box my={4}>
              <Typography variant="body1" color="textSecondary">
                ไม่สามารถแสดงเนื้อหาประเภทนี้ได้
              </Typography>
            </Box>
          </Grid>
        );
    }
  }

  return (
    <>
      {contentId === undefined ? (
        <Box my={10}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Grid
              item
              style={{
                width: '50%',
                minWidth: 280,
                maxWidth: 500,
                marginBottom: 24,
              }}
            >
              <img
                src={HeroImage}
                alt="ยินดีต้อนรับ"
                style={{ width: '100%', height: 'auto' }}
              />
            </Grid>
            <Typography
              variant="h6"
              color="textPrimary"
              gutterBottom
              style={{ fontSize: '1.7rem', fontWeight: 600 }}
            >
              ยินดีต้อนรับ
            </Typography>
            <Typography variant="body1" color="textSecondary">
              โปรดเลือกเนื้อหาที่ต้องการเรียนจากสารบัญ
            </Typography>
            {matches ? (
              <ArrowLeft
                style={{ marginTop: 16, color: theme.palette.text.secondary }}
              />
            ) : (
              <ArrowBottom
                style={{ marginTop: 16, color: theme.palette.text.secondary }}
              />
            )}
          </Grid>
        </Box>
      ) : (
        <Container maxWidth="lg">
          <Box mt={4} mb={3}>
            <Grid
              container
              spacing={1}
              direction={matches ? 'row' : 'column'}
              justify="space-between"
              alignItems="center"
              wrap="nowrap"
            >
              <Grid item>
                <Grid container wrap="nowrap">
                  <Typography
                    variant="h6"
                    color="initial"
                    style={{
                      fontSize: '1.6rem',
                      fontWeight: 600,
                      lineHeight: '1.2',
                    }}
                    gutterBottom={matches ? false : true}
                    align={matches ? 'left' : 'center'}
                  >
                    {activeContentView?.name
                      ? activeContentView?.name
                      : getContentTypeTitle(
                          activeContentView?.type,
                          getContentType(activeContentView?.content1)
                        )}
                    {matches && getContentType(activeSource) === 'video'
                      ? checkVideoQuality()
                      : null}
                  </Typography>
                </Grid>
              </Grid>
              {activeContentView?.type === 'c' && (
                <Grid item style={{ minWidth: 185 }}>
                  <ToggleButtonGroup
                    value={activeSource}
                    exclusive
                    onChange={handleSource}
                    aria-label="สลับลิงก์"
                    size="small"
                  >
                    <ToggleButton
                      value={contentSourceUrl1}
                      aria-label="ลิงก์หลัก"
                    >
                      <Typography
                        variant="body2"
                        color="textPrimary"
                        style={{ fontWeight: 500, padding: '0 6px' }}
                      >
                        ลิงก์หลัก
                      </Typography>
                    </ToggleButton>
                    <ToggleButton
                      value={contentSourceUrl2}
                      aria-label="ลิงก์สำรอง"
                    >
                      <Typography
                        variant="body2"
                        color="textPrimary"
                        style={{ fontWeight: 500, padding: '0 6px' }}
                      >
                        ลิงก์สำรอง
                      </Typography>
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Grid>
              )}
            </Grid>
          </Box>
          <Divider />
          <Box my={4}>
            {activeContentView?.type === 'c' && <>{renderContentView()}</>}
            {activeContentView?.type === 't' && (
              <TestList
                activeContentView={activeContentView}
                testStart={testStart}
                setTestStart={setTestStart}
                currentContentView={currentContentView}
                courseRegistrationDetails={courseRegistrationDetails}
                userTestAnswers={userTestAnswers}
                setUserTestAnswers={setUserTestAnswers}
                contentId={contentId}
              />
            )}
            {activeContentView?.type === 'e' && (
              <EvaluationList
                activeContentView={activeContentView}
                currentContentView={currentContentView}
                courseRegistrationDetails={courseRegistrationDetails}
              />
            )}
            {/* <Box my={4}>
              <Typography variant="body2" color="textSecondary">
                FOR DEVELOPMENT
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Current content url: {activeSource}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                You are currently viewing this content via {browserName}{" "}
                {fullBrowserVersion} on {osName}
              </Typography>
              <Typography variant="body2" color="error">
                Current session id: {currentSession.id}, key:{" "}
                {currentSession.key}, created at{" "}
                <DayJS format="D/M/YYYY HH:mm" add={{ years: 543 }}>
                  {currentSession.createDate}
                </DayJS>
              </Typography>
              <Typography variant="body2" color="error">
                Current course registration id: {registrationId}
              </Typography>
              <Typography variant="body2" color="error">
                Current content id: {contentId}
              </Typography>
              <Typography variant="body2" color="error">
                Current content view id: {currentContentView?.id}, User
                cumulative content view seconds at start:{" "}
                {currentContentView?.contentSeconds
                  ? currentContentView?.contentSeconds
                  : 0}
                {" seconds "}({currentContentView?.contentSeconds / 60} minutes)
              </Typography>
            </Box> */}
          </Box>
        </Container>
      )}
    </>
  );
}
