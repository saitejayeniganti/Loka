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
          let resultSet = new Set();
          result.forEach((each) => {
            resultSet.add(each.name || each.storeName);
          });

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
        console.log("search changed");
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

        return (
          <TextField {...params} label="Search" fullWidth variant="filled" />
        );
      }}
      renderOption={(props, option) => {
        return (
          <li {...props}>
            <Grid container alignItems="center">
              <Grid item></Grid>
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
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  );
}
