import React, { useState, useEffect } from "react";
import { Card } from "@mui/material";

import Navbar from "../Navbar";
import Buttons from "./Buttons";
import Forecast from "./Forecast";

const Home = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    const storedLocation = localStorage.getItem("locations");
    const parsedLocations = JSON.parse(storedLocation);

    if (parsedLocations && parsedLocations.length > 0) {
      setSelectedLocation(parsedLocations[0]);
    }
  }, []);

  const handleLocationChange = (location) => {
    setSelectedLocation(location);
  };

  return (
    <>
      <Navbar />
      <Card sx={{ mt: 10, height: "35rem", width: "50rem", ml: 70 }}>
        <Buttons onLocationChange={handleLocationChange} />
        <Forecast selectedLocation={selectedLocation} />
      </Card>
    </>
  );
};

export default Home;
