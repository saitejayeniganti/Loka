import { geocodeByAddress, getLatLng } from "react-places-autocomplete";

export const getCoordinates = (address) => {
  return geocodeByAddress(address).then((results) => {
    return getLatLng(results[0]).catch((error) =>
      console.error("Error", error)
    );
  });
};
