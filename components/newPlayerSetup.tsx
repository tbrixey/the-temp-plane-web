import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import axios from "axios";
import { find } from "lodash";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { Classes } from "../types/classes";
import { Location } from "../types/location";
import { Races } from "../types/races";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface NewPlayerSetupProps {
  cities: Location[];
  races: Races[];
  classes: Classes[];
}

export const NewPlayerSetup = ({
  cities,
  races,
  classes,
}: NewPlayerSetupProps) => {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedRace, setSelectedRace] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [submit, setSubmit] = useState({ current: "no" });
  const { data: session } = useSession();

  const reloadSession = () => {
    const event = new Event("visibilitychange");
    document.dispatchEvent(event);
  };

  const submitPlayerRegistration = async () => {
    if (session) {
      setSubmit({ current: "progress" });
      const userId = session.user.data.apiKey;
      axios.defaults.headers.common["Authorization"] = "Bearer " + userId;
      axios.defaults.headers.common["accept"] = "*/*";

      await axios.post(BASE_URL + `class/${selectedClass}`).then((res) => {
        console.log("Added player Class");
      });
      await axios.post(BASE_URL + `race/${selectedRace}`).then((res) => {
        console.log("Added player Race");
      });
      await axios.post(BASE_URL + `city/${selectedLocation}`).then((res) => {
        console.log("Added player City");
      });
      await axios.get(BASE_URL + `quests`).then((res) => {
        console.log("Quest List", res.data);
      });
      setSubmit({ current: "done" });
      reloadSession();
    }
  };

  return (
    <>
      {classes && cities && races && submit.current !== "done" && (
        <div>
          Tasks to complete character
          <div>
            <span>{session?.user.data.quests[0].tasks?.join(", ")}</span>
          </div>
          <Grid
            container
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Grid item sx={{ maxWidth: 350 }}>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Class
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={selectedClass}
                  onChange={(event) => setSelectedClass(event.target.value)}
                  label="Class"
                  fullWidth
                >
                  {classes.map((item, idx: number) => (
                    <MenuItem key={item.name + idx} value={item.name}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {!selectedClass && <br />}
              {selectedClass && (
                <>
                  <Typography>
                    {find(classes, { name: selectedClass })?.description}
                  </Typography>
                  <Typography>
                    <b>Speed: </b>{" "}
                    {find(classes, { name: selectedClass })?.speed}{" "}
                    <b>Weight: </b>{" "}
                    {find(classes, { name: selectedClass })?.weight}
                  </Typography>
                  <Typography>
                    <b>Bonus stats:</b>{" "}
                    {find(classes, { name: selectedClass })?.bonus}
                  </Typography>
                </>
              )}
            </Grid>
            <Grid item sx={{ maxWidth: 350 }}>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Race
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={selectedRace}
                  onChange={(event) => setSelectedRace(event.target.value)}
                  label="Race"
                >
                  {races.map((item, idx: number) => (
                    <MenuItem key={item.name + idx} value={item.name}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {!selectedRace && <br />}
              {selectedRace && (
                <Typography>
                  {find(races, { name: selectedRace })?.description}
                </Typography>
              )}
            </Grid>
            <Grid item>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Starting Location
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={selectedLocation}
                  onChange={(event) => setSelectedLocation(event.target.value)}
                  label="Starting Location"
                >
                  {cities.map((item, idx: number) => (
                    <MenuItem key={item.name + idx} value={item._id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {!selectedLocation && <br />}
              {selectedLocation && (
                <Typography>
                  <b>Population:</b>{" "}
                  {find(cities, { _id: selectedLocation })?.population}
                </Typography>
              )}
            </Grid>
            <Button
              variant="contained"
              sx={{ mt: 1 }}
              onClick={() => submitPlayerRegistration()}
              disabled={
                submit.current === "progress" || submit.current === "done"
              }
            >
              Save
            </Button>
          </Grid>
        </div>
      )}
      {submit.current === "done" && (
        <Link href="/game" passHref={true}>
          <Button variant="contained">Reload</Button>
        </Link>
      )}
    </>
  );
};
