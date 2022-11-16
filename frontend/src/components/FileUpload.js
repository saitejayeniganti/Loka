import React, { useCallback, useEffect, useRef, useState } from "react";
import AWS from "aws-sdk";
import {
  Button,
  CircularProgress,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";

function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

function FileUpload({ callback, fileName = "", folderPath = "" }) {
  const fileInput = useRef();

  const [enableUpload, setEnableUpload] = useState(false);
  const [progress, setProgress] = useState(0);

  const readFile = (e) => {
    console.log(e.target.value);
    if (e.target.value) {
      setEnableUpload(true);
    } else {
      setEnableUpload(false);
    }
  };

  const handleClick = (event) => {
    setEnableUpload(false);
    event.preventDefault();
    if (fileInput.current) {
      const file = fileInput.current.files[0];
      console.log("file path", file);
      let fileExtension = file.name.split(".").pop();
      const newFileName = fileName
        ? fileName.replace(/\..+$/, "") + "." + fileExtension
        : file.name;
      const config = {
        bucketName: "loka1",
        region: "us-east-1",
        accessKeyId: "AKIA5SITFOMDAEMEKQ5B",
        secretAccessKey: "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",
      };

      AWS.config.update({
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
      });
      const myBucket = new AWS.S3({
        params: { Bucket: config.bucketName },
        region: config.region,
      });
      const params = {
        ACL: "public-read",
        Body: file,
        Bucket: config.bucketName,
        Key: folderPath + newFileName,
      };
      myBucket
        .putObject(params)
        .on("httpUploadProgress", (evt) => {
          setProgress(Math.round((evt.loaded / evt.total) * 100));
          // console.log(evt);
          console.log("progress", (evt.loaded / evt.total) * 100);
        })
        .send((err, data) => {
          if (err) {
            console.log(err);
          }
          const signedUrl = myBucket.getSignedUrl("getObject", {
            Bucket: config.bucketName,
            Key: params.Key,
          });
          const url = signedUrl.split("?")[0];
          callback(url);
          // setEnableUpload(false);
        });
    }
  };

  return (
    <>
      {/* <Grid container spacing={2}>
        <Grid item xs={8} sx={{ textAlign: "left" }}>
          <input
            type="file"
            ref={fileInput}
            style={{ margin: "8px" }}
            onChange={(event) => {
              readFile(event);
            }}
            onClick={(event) => {
              event.target.value = null;
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <Button
            disabled={!enableUpload}
            variant="outlined"
            onClick={handleClick}
          >
            Upload
          </Button>
        </Grid>
        <Grid item xs={4}>
          {!enableUpload && <CircularProgressWithLabel value={progress} />}
        </Grid>
      </Grid> */}

      <Grid container>
        <Grid item xs={8}>
          <input
            type="file"
            ref={fileInput}
            style={{ margin: "8px" }}
            onChange={(event) => {
              readFile(event);
            }}
            onClick={(event) => {
              event.target.value = null;
            }}
          />
        </Grid>
        <Grid item xs={2}>
          <Button
            disabled={!enableUpload}
            variant="outlined"
            onClick={handleClick}
          >
            Upload
          </Button>
        </Grid>
        <Grid item xs={2}>
          {!enableUpload && <CircularProgressWithLabel value={progress} />}
        </Grid>
      </Grid>
    </>
  );
}

export default FileUpload;
