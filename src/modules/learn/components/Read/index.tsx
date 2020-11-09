import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    playerWrapper: {
      position: "relative",
      paddingTop: "56.25%",
    },
    reactPlayer: { position: "absolute", top: 0, left: 0 },
  })
);

interface onDocumentLoadSuccessProps {
  numPages: any;
}

function PDFContent() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }: onDocumentLoadSuccessProps) {
    setNumPages(numPages);
  }

  return (
    <div>
      <Document
        file="https://ocsc-learning-platform.herokuapp.com/sample.pdf"
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
  );
}

export default function Video() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Container maxWidth="md">
        <Box my={2}>
          <Typography
            variant="h6"
            color="initial"
            gutterBottom
            style={{ fontSize: "1.5rem" }}
          >
            เอกสารประกอบ (PDF)
          </Typography>
        </Box>
        <Box my={4}>
          <PDFContent />
        </Box>
      </Container>
    </React.Fragment>
  );
}
