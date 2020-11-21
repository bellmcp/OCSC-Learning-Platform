import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function PDFContent() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }: any) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset: any) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  return (
    <div>
      <Grid
        container
        spacing={1}
        direction="column"
        justify="center"
        alignItems="center"
        alignContent="center"
        wrap="nowrap"
      >
        <Grid item>
          <Document
            file="https://ocsc-learning-platform.herokuapp.com/sample.pdf"
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page pageNumber={pageNumber} />
          </Document>
        </Grid>
        <Grid item>
          <p>
            หน้าที่ {pageNumber} จาก {numPages}
          </p>
        </Grid>
      </Grid>
    </div>
    // <>
    //   <Grid
    //     container
    //     spacing={1}
    //     direction="row"
    //     justify="flex-start"
    //     alignItems="flex-start"
    //     alignContent="stretch"
    //     wrap="nowrap"
    //   >
    //     <Grid item>
    //       <Document
    //         file="https://ocsc-learning-platform.herokuapp.com/sample.pdf"
    //         onLoadSuccess={onDocumentLoadSuccess}
    //       >
    //         <Page pageNumber={pageNumber} />
    //       </Document>
    //     </Grid>
    //   </Grid>
    //   <Grid
    //     container
    //     spacing={1}
    //     direction="column"
    //     justify="center"
    //     alignItems="center"
    //     alignContent="center"
    //     wrap="nowrap"
    //   >
    //     <Grid item>
    //       <p>
    //         หน้าที่ {pageNumber || (numPages ? 1 : "-")} จาก {numPages || "-"}
    //       </p>
    //     </Grid>
    //     <Grid item>
    //       <ButtonGroup variant="outlined" color="default" aria-label="">
    //         <Button disabled={pageNumber <= 1} onClick={previousPage}>
    //           Previous
    //         </Button>
    //         <Button disabled={pageNumber === numPages} onClick={nextPage}>
    //           Next
    //         </Button>
    //       </ButtonGroup>
    //     </Grid>
    //   </Grid>
    // </>
  );
}

export default function Read() {
  return (
    <React.Fragment>
      <Container maxWidth="md">
        <Box my={2}>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Typography
              variant="h6"
              color="initial"
              gutterBottom
              style={{ fontSize: "1.4rem", fontWeight: 600 }}
            >
              เอกสาร: หลักธรรมเบื้องต้น
            </Typography>
            <Link
              href="https://ocsc-learning-platform.herokuapp.com/sample.pdf"
              target="_blank"
              style={{ textDecoration: "none" }}
            >
              <Button variant="outlined" color="default">
                ดาวน์โหลดไฟล์
              </Button>
            </Link>
          </Grid>
        </Box>
        <Divider />
        <Box my={4}>
          <PDFContent />
        </Box>
      </Container>
    </React.Fragment>
  );
}
