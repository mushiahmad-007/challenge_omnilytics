import React, {useState, useEffect} from "react";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {generateFile, getFileStats} from '../../api/fileHandling'
const defaultProps = {
  bgcolor: "background.paper",
  m: 1,
  border: 1,
  style: { width: "45%", height: "100%", paddingBottom: "3%", paddingTop: "3%" }
};

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(7)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

function FileHandling() {
  const classes = useStyles();
  const [fileDownloadLink, setFileDownloadLink] = useState()
  const [fileStatsLink, setFileStatsLink] = useState()
  const [fileStats, setFileStats] = useState()
  useEffect(() => {
      
  }, [])
  const _handleFileGeneration = () => {
    generateFile().then(res => {
        console.log(res)
        setFileDownloadLink(res.data.download_link)
        setFileStatsLink(res.data.stats_link)
    })
  }
  const _handleFileStats = () => {
      getFileStats(fileStatsLink).then(res => {
        console.log(res)
        setFileStats(res.data.stats)
    })
  }
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Box borderColor="text.primary" {...defaultProps}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={6}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    className={classes.submit}
                    onClick={_handleFileGeneration}
                  >
                    {" "}
                    GENERATE
                  </Button>
                </Grid>

                <Grid item xs={12}>
                  <Typography component="h4" variant="h5">
                    Link:
                  </Typography>
                  <Typography component="h4" variant="h5">
                    {fileDownloadLink}
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={_handleFileStats}
                  >
                    Report
                  </Button>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Typography component="h5" variant="h6">
                    Alphabetical String:
                  </Typography>
                  <Typography component="h5" variant="h6">
                    {fileStats?.alphabets}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} >
                  <Typography component="h5" variant="h6">
                    Real Numbers:
                  </Typography>
                  <Typography component="h5" variant="h6">
                    {fileStats?.real_numbers}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Typography component="h5" variant="h6">
                    Integers:
                  </Typography>
                  <Typography component="h5" variant="h6">
                    {fileStats?.integers}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Typography component="h5" variant="h6">
                    Alphanumeric:
                  </Typography>
                  <Typography component="h5" variant="h6">
                    {fileStats?.alphanumerics}
                  </Typography>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
      </Box>
    </Box>
  );
}


export default FileHandling