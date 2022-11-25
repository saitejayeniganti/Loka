import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import parse from "autosuggest-highlight/parse";
import throttle from "lodash/throttle";
import { get } from "../utils/serverCall";
import { IconButton, InputAdornment, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchMain({ input, callback }) {
  // its selected suggestion  value
  const [value, setValue] = React.useState(null);
  // input value
  const [inputValue, setInputValue] = React.useState("");
  // suggestions
  const [options, setOptions] = React.useState([]);

  //useMem because it will be called only if the request changes.
  const fetch = React.useMemo(
    () =>
      throttle((request, callback) => {
        //autocompleteService.current.getPlacePredictions(request, callback);
        //backend search call here.
        get("/search/merchant", request).then((result) => {
          // console.log("search results", result);
          // const res = [
          //   { _id: 1, name: "apple" },
          //   { _id: 2, name: "orange" },
          //   { _id: 2, name: "tomato" },
          // ];
          let resultSet = new Set();
          result.forEach((each) => {
            resultSet.add(each.name || each.storeName);
          });
          // console.log(resultSet)
          callback(Array.from(resultSet));
        });
      }, 200),
    []
  );

  // is triggered on input change
  React.useEffect(() => {
    let active = true;

    if (inputValue === "") {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results) => {
      // console.log("value", value);
      // console.log("hardcoded", results);
      if (active) {
        // console.log("inside active");
        let newOptions = [];
        // user picked a suggestion but still typing extra data ?
        if (value) {
          newOptions = [value];
        }
        if (results) {
          newOptions = [...newOptions, ...results];
        }
        // set suggestions.
        // console.log("suggestions updated", newOptions);
        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  const createSearchIcon = () => {
    return (
      <InputAdornment position="start">
        <SearchIcon />
      </InputAdornment>
    );
  };

  React.useEffect(() => {
    setInputValue(input);
  }, [input]);

  return (
    <Autocomplete
      id="search-main"
      sx={{ width: 300, background: "white" }}
      getOptionLabel={
        (option) => (typeof option === "string" ? option : option.storeName)
        // Second line of the suggestion.
      }
      filterOptions={(x) => x} // if need filtering
      options={options} // suggestions
      autoComplete
      includeInputInList
      filterSelectedOptions
      freeSolo
      value={value}
      onChange={(event, newValue) => {
        // on selecting suggestion.
        // console.log("new Value", newValue);
        // if (newValue && newValue.description) {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
        callback(newValue);
        // }
        // console.log(newValue);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
        // input trigger this event
      }}
      renderInput={(params) => {
        // console.log("renderInput params", params);
        const ref = params.InputProps.ref;
        params.InputProps.startAdornment = createSearchIcon();
        // delete params["InputLabelProps"];
        // delete params["InputProps"];
        // console.log("input params", params);

        return (
          // <Paper
          //   // component="form"
          //   sx={{
          //     p: "2px 4px",
          //     display: "flex",
          //     alignItems: "center",
          //     width: 400,
          //   }}
          //   ref={ref} // ref for appending suggestions.
          // >
          //   <InputBase
          //     sx={{ ml: 1, flex: 1 }}
          //     placeholder="Search"
          //     // inputProps={{ "aria-label": "search google maps" }}
          //     {...params}
          //   />
          //   <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          //     <SearchIcon />
          //   </IconButton>
          // </Paper>
          // <div ref={params.InputProps.ref}>
          //   <input type="text" {...params.inputProps} />
          // </div>
          <TextField {...params} label="Search" fullWidth variant="filled" />
        );
      }}
      renderOption={(props, option) => {
        // console.log("render suggestion");
        // matches contain offset(start) & length of text that max exactly
        // const matches =
        //   option.structured_formatting.main_text_matched_substrings;

        // parse divides text to highlight & text.
        // const parts = parse(
        //   option.structured_formatting.main_text, // main text is full text in result.
        //   matches.map((match) => [match.offset, match.offset + match.length])
        // );
        // console.log(parts); // list of object. [{highlight:true/false, text:"san"}]
        // console.log("inside render suggestion", option);
        return (
          <li {...props}>
            <Grid container alignItems="center">
              <Grid item>
                {/*  //location icon        
                <Box
                  component={LocationOnIcon}
                  sx={{ color: "text.secondary", mr: 2 }}
                /> */}
              </Grid>
              <Grid item xs>
                {
                  // option.map((part, index) => (
                  <span
                    // key={index}
                    style={{
                      // fontWeight: part.highlight ? 700 : 400,
                      fontWeight: 400,
                    }}
                  >
                    {option}
                  </span>
                  // ))
                }

                {/* <Typography variant="body2" color="text.secondary">
                  Store/Product
                   // {option.structured_formatting.secondary_text} 
                  // this is description text 
                </Typography> */}
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  );
}
