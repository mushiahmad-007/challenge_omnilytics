import React, {useState, useEffect} from "react";
import Loader from 'react-loader-spinner';
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import {generateFile, getFileStats} from '../../api/fileHandling'
import {useStyles} from './style'
const defaultProps = {
  bgcolor: "background.paper",
  m: 1,
  border: 1,
  style: { width: "45%", height: "100%", paddingBottom: "6%" }
};

function FileHandling() {
  const classes = useStyles();
  const [fileDownloadLink, setFileDownloadLink] = useState()
  const [fileStatsLink, setFileStatsLink] = useState()
  const [fileStats, setFileStats] = useState()
  const [isLoading, setIsLoading] = useState(false);
  const [fileGenerated, setFileGenerated] = useState(false);
  const [reportLoading, setReportLoading] = useState(false);

  const _handleFileGeneration = () => {
    setIsLoading(true);
    setFileStats('');
    generateFile().then(res => {
        console.log(res)
        setFileDownloadLink(res.data.download_link)
        setFileStatsLink(res.data.stats_link)
        setIsLoading(false);
        setFileGenerated(true);
    })
  }
  const _handleFileStats = () => {
    setReportLoading(true);
      getFileStats(fileStatsLink).then(res => {
        console.log(res)
        setFileStats(res.data.stats)
        setReportLoading(false);

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
                  <Typography  
                  style={{overflowWrap: 'anywhere'}}
                  >
                  {isLoading ===true? (
                      <Loader
                        type='ThreeDots'
                        color='primary'
                        style={{
                          width: '100%',
                          height: '100',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                            }}
                       />
                     ):<a href={fileDownloadLink} >{fileDownloadLink}</a>}
                     
                     
                     
                   
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={_handleFileStats}
                    disabled = {fileGenerated?false:true}
                  >
                    Report
                  </Button>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={6}>
                  <Typography component="h5" variant="h6">
                    Alphabetical String:
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={6}>
                  <Typography component="h5" variant="h6" style = {{fontStyle: 'italic', fontWeight:'bold'}}>
                  {reportLoading === true? (
                      <Loader
                        type='ThreeDots'
                        color='primary'
                        style={{
                          marginTop :'-20px',
                          alignItems: 'center',
                            }}
                       />
                     ):fileStats?.alphabets
                    }
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={6} >
                  <Typography component="h5" variant="h6">
                    Real Numbers:
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={6} >
                  <Typography component="h5" variant="h6" style = {{fontStyle: 'italic', fontWeight:'bold'}}>
                  {reportLoading === true? (
                      <Loader
                        type='ThreeDots'
                        color='primary'
                        style={{
                          marginTop :'-20px',
                          alignItems: 'center',
                            }}
                       />
                     ):fileStats?.real_numbers
                    }
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={6}>
                  <Typography component="h5" variant="h6">
                    Integers:
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={6}>
                  <Typography component="h5" variant="h6" style = {{fontStyle: 'italic', fontWeight:'bold'}}>
                  {reportLoading === true? (
                      <Loader
                        type='ThreeDots'
                        color='primary'
                        style={{
                          marginTop :'-20px',
                          alignItems: 'center',
                            }}
                       />
                     ):fileStats?.integers
                    }
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={6}>
                  <Typography component="h5" variant="h6">
                    Alphanumeric:
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={6}>
                  <Typography component="h5" variant="h6" style = {{fontStyle: 'italic', fontWeight:'bold'}}>
                  {reportLoading === true? (
                      <Loader
                        type='ThreeDots'
                        color='primary'
                        style={{
                          marginTop :'-20px',
                          alignItems: 'center',
                            }}
                       />
                     ):fileStats?.alphanumerics
                    }
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