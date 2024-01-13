import React, { useState, useEffect } from "react";
import { Container, Typography, Card } from "@mui/material";

import { dateFormat } from "../utils/dateFormat";
import { getLocationData } from "../api/api";

const Forecast = ({ selectedLocation }) => {
  const [data, setData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const forecastData = await getLocationData(selectedLocation);
        setData(forecastData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [selectedLocation]);

  if (data === "") {
    return (
      <Typography sx={{ textAlign: "center", mt: 10 }}>
        Please add location from add more button to see data.
      </Typography>
    );
  }

  return (
    <>
      <Typography
        sx={{
          mt: 5,
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "1.5rem",
        }}
      >
        4 Days Forecast - {selectedLocation}
      </Typography>
      <Container
        sx={{ mt: 5, display: "flex", justifyContent: "space-between" }}
      >
        {data &&
          data.map((d, index) => {
            return (
              <Card
                key={index}
                sx={{
                  width: "10rem",
                  height: "15rem",
                  borderRadius: 5,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                  {d.day}
                </Typography>
                <Typography>{d.today !== "" ? d.today : ""}</Typography>
                <Typography>{dateFormat(d.date)}</Typography>
                <Typography sx={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                  {d.maxTemp}° C
                </Typography>
                <Typography>{d.condition}</Typography>
              </Card>
            );
          })}
      </Container>
    </>
  );
};

export default Forecast;
