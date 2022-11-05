import React, { useRef } from "react";
import AWS from "aws-sdk";
import { Button, MenuItem, Select, TextField } from "@mui/material";
import { Grid, Typography } from "@mui/material";

function FileUpload({ callback, fileName = "", folderPath = "" }) {
  const fileInput = useRef();

  const handleClick = (event) => {
    event.preventDefault();
    if (fileInput.current) {
      const file = fileInput.current.files[0];
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
          // setProgress(Math.round((evt.loaded / evt.total) * 100));
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
        });
    }
  };
  
  return (
    <>
    <Grid container spacing={2}>
      <Grid item xs={8} sx={{textAlign:"left"}}>
          <input type="file" ref={fileInput} style={{ margin: "8px" }} />
      </Grid>
      <Grid item xs={4}>
          <Button variant="outlined" onClick={handleClick}>Upload</Button>
      </Grid>
    </Grid>
    </>
  );
}

export default FileUpload;
