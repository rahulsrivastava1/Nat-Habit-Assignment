import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Stack,
} from "@mui/material";

import { getLocations } from "../api/api";

const initialState = {
  isBoxVisible: false,
  locations: [],
  buttons: [],
  renderedButtons: [],
};

const Buttons = ({ onLocationChange }) => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const locationData = await getLocations();
        setState((prevState) => ({
          ...prevState,
          locations: locationData.data.data,
        }));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const savedButtons = JSON.parse(localStorage.getItem("locations")) || [];
    setState((prevState) => ({ ...prevState, renderedButtons: savedButtons }));
  }, [state.buttons]);

  const handleButtonClick = () => {
    setState((prevState) => ({
      ...prevState,
      isBoxVisible: !prevState.isBoxVisible,
    }));
  };

  const handleLocation = (location) => {
    if (!JSON.parse(localStorage.getItem("locations"))) {
      onLocationChange(location);
    }

    if (!state.buttons.includes(location)) {
      const updatedButtons = [...state.buttons, location];
      setState((prevState) => ({
        ...prevState,
        buttons: updatedButtons,
        isBoxVisible: !prevState.isBoxVisible,
      }));
      localStorage.setItem("locations", JSON.stringify(updatedButtons));
    }
  };

  const handleLocationButton = (location) => {
    onLocationChange(location);
  };

  return (
    <Stack direction="row" spacing={2} mt={3}>
      <Box sx={{ width: "60%", borderRadius: 10 }}>
        {state.renderedButtons.map((button, index) => (
          <Button
            variant="contained"
            sx={{ margin: 2, width: "25%" }}
            key={index}
            onClick={() => handleLocationButton(button)}
          >
            {button}
          </Button>
        ))}
      </Box>
      <Box>
        <Button
          variant="contained"
          onClick={handleButtonClick}
          sx={{ margin: 2, display: "fixed", left: "75%" }}
        >
          Add more +
        </Button>
        {state.isBoxVisible && (
          <Box
            display="flex"
            flexDirection="column"
            width={110}
            sx={{
              position: "absolute",
              left: "62%",
              top: "25%",
              cursor: "pointer",
              zIndex: 1,
              backgroundColor: "#fff",
            }}
          >
            <List>
              {state.locations.map((location, index) => (
                <React.Fragment key={index}>
                  <ListItem onClick={() => handleLocation(location.name)}>
                    <ListItemText primary={location.name} />
                  </ListItem>
                  <hr />
                </React.Fragment>
              ))}
            </List>
          </Box>
        )}
      </Box>
    </Stack>
  );
};

export default Buttons;
