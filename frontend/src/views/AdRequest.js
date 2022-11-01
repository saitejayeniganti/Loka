import React, { useEffect, useState, useRef } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import NumberFormat from "react-number-format";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
// import S3 from 'react-aws-s3';
import { uploadFile } from "react-s3";

import FileUpload from "../components/FileUpload.js";

import { v4 as uuidv4 } from "uuid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

import { get, post } from "../utils/serverCall.js";
import { doSignIn, showMessage } from "../reducers/actions.js";
import { actionCreators } from "../reducers/actionCreators.js";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

window.Buffer = window.Buffer || require("buffer").Buffer;

const config = {
  bucketName: "event-scout",
  //   dirName: "" /* optional */,
  region: "us-east-1",
  accessKeyId: "AKIA5SITFOMDE2SHCWOK",
  secretAccessKey: "/xpkY98lNxt3736mp1r5bFyVlQjZtylEtTNnx2ugN",
};

function AdRequest() {
  const [imageUrl, setImageUrl] = useState("");
  const [imageList, setImageList] = useState([]);
  const [file, setFile] = useState("");

  const doLogin = (e) => {};

  const handleFileInput = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (file) => {
    uploadFile(file, config)
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  };

  const fileList = [];

  return (
    <div className="container">
      <TextField
        sx={{ width: "20%" }}
        id="outlined-size-small"
        InputProps={{
          startAdornment: <InputAdornment position="start"></InputAdornment>,
        }}
        placeholder="First Name"
        size="small"
        name="fristName"
      />
      <TextField
        sx={{ width: "20%" }}
        id="outlined-size-small"
        InputProps={{
          startAdornment: <InputAdornment position="start"></InputAdornment>,
        }}
        placeholder="Last Name"
        size="small"
        name="lastName"
      />
      <TextField
        sx={{ width: "20%" }}
        id="outlined-size-small"
        InputProps={{
          startAdornment: <InputAdornment position="start"></InputAdornment>,
        }}
        placeholder="Phone"
        size="small"
        name="phone"
      />

      <TextField
        sx={{ width: "20%" }}
        id="outlined-size-small"
        InputProps={{
          startAdornment: <InputAdornment position="start"></InputAdornment>,
        }}
        placeholder="Company"
        size="small"
        name="company"
      />
      <TextField
        sx={{ width: "20%" }}
        id="outlined-size-small"
        InputProps={{
          startAdornment: <InputAdornment position="start"></InputAdornment>,
        }}
        type="number"
        placeholder="Amount"
        size="small"
        name="amount"
      />

      <TextField
        sx={{ width: "20%" }}
        id="outlined-size-small"
        InputProps={{
          startAdornment: <InputAdornment position="start"></InputAdornment>,
        }}
        placeholder="Redirect Link"
        size="small"
        name="redirectLink"
      />

      <input
        type="date"
        id="start"
        name="From Date"
        min="2018-01-01"
        max="2018-12-31"
      />

      <input
        type="date"
        id="start"
        name="To Date"
        min="2018-01-01"
        max="2018-12-31"
      />

      <input type="file" onChange={handleFileInput} />
      <button onClick={() => handleUpload(file)}> Upload to S3</button>
      <FileUpload
        callback={(e) => {
          console.log("location", e);
          console.log("do other operation");
        }}
        fileName="dynamicName"
        folderPath="hello/"
      />
      {imageList.length == 0 ? (
        ""
      ) : (
        <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
          {imageList.map((item) => (
            <ImageListItem key={item.img}>
              <img
                src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      )}
    </div>
  );
}

export default AdRequest;
