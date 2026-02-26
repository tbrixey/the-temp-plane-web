import { useSession } from "../../contexts/authContext";
import {
  Button,
  CircularProgress,
  Chip,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import userContext from "../../util/userContext";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { gameApi } from "../../util/gameApiClient";

interface SkillingActivity {
  _id: string;
  skill: string;
  location: string;
  level: number;
  time: number;
  item: string;
}

const PlayerSkilling = () => {
  const { data: session } = useSession();
  const navigate = useNavigate();
  const { user } = useContext(userContext);

  const [activities, setActivities] = useState<SkillingActivity[]>();
  const [loadingActivities, setLoadingActivities] = useState(false);
  const [startingSkill, setStartingSkill] = useState<string | null>(null);
  const [counts, setCounts] = useState<Record<string, number>>({});

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (!session) {
      navigate("/game");
    }
  });

  const getActivities = async () => {
    setLoadingActivities(true);
    await gameApi
      .get("skilling", {
        params: user?.location?.name ? { location: user.location.name } : {},
      })
      .then((res) => {
        if (res.data.message) {
          enqueueSnackbar(res.data.message);
          setActivities([]);
        } else {
          setActivities(res.data.data ?? []);
        }
      })
      .catch((error) => {
        const msg =
          error.response?.data?.message ??
          "Error getting skilling activities, try again later.";
        enqueueSnackbar(msg);
      })
      .finally(() => setLoadingActivities(false));
  };

  const startSkilling = async (activity: SkillingActivity) => {
    setStartingSkill(activity._id);
    const count = counts[activity._id] ?? 1;
    await gameApi
      .post("skilling", {
        skillName: activity.skill,
        item: activity.item,
        count,
      })
      .then((res) => {
        enqueueSnackbar(res.data.message ?? "Started skilling!");
      })
      .catch((error) => {
        const msg =
          error.response?.data?.message ?? "Error starting skilling.";
        enqueueSnackbar(msg);
      })
      .finally(() => setStartingSkill(null));
  };

  if (!user) {
    return <div>error can not find user. Please go back to /game</div>;
  }

  const isCurrentlySkilling =
    user.finishTime && new Date(user.finishTime) > new Date();

  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-8">
      <Typography variant="h5" gutterBottom>
        Skilling
      </Typography>

      {isCurrentlySkilling && (
        <Typography color="warning.main" sx={{ mb: 2 }}>
          Currently working — finishes at{" "}
          {new Date(user.finishTime!).toLocaleTimeString()}
        </Typography>
      )}

      <Stack spacing={2} alignItems="center" sx={{ width: "100%", maxWidth: 500 }}>
        <Typography style={{ textAlign: "center" }}>
          Activities available in <b>{user.location?.name ?? "current location"}</b>
        </Typography>
        <Button
          onClick={getActivities}
          variant="contained"
          disabled={loadingActivities}
        >
          {loadingActivities ? <CircularProgress size={20} /> : "Get Activities"}
        </Button>
      </Stack>

      {activities && activities.length === 0 && (
        <Typography sx={{ mt: 2 }} color="text.secondary">
          No skilling activities available here.
        </Typography>
      )}

      {activities && activities.length > 0 && (
        <Grid
          spacing={1}
          container
          alignItems="center"
          flexDirection="column"
          sx={{ mt: 2, maxWidth: 500, width: "100%" }}
        >
          <Grid item xs={12}>
            <Typography variant="h6">Available Activities</Typography>
          </Grid>
          {activities.map((activity) => {
            const playerSkillLevel =
              user.skills?.[activity.skill as keyof typeof user.skills] ?? 0;
            const canDo = playerSkillLevel >= activity.level;

            return (
              <Grid item key={activity._id} sx={{ width: "100%" }}>
                <Stack
                  spacing={1}
                  sx={{
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 1,
                    p: 1.5,
                    opacity: canDo ? 1 : 0.5,
                  }}
                >
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Stack spacing={0.5}>
                      <Typography fontWeight="bold" sx={{ textTransform: "capitalize" }}>
                        {activity.skill}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Item: {activity.item} · {activity.time}s each
                      </Typography>
                      <Stack direction="row" spacing={0.5}>
                        <Chip
                          label={`Req. level ${activity.level}`}
                          size="small"
                          color={canDo ? "success" : "error"}
                          variant="outlined"
                        />
                        <Chip
                          label={`Your level: ${playerSkillLevel}`}
                          size="small"
                          variant="outlined"
                        />
                      </Stack>
                    </Stack>
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <TextField
                      label="Count"
                      type="number"
                      size="small"
                      value={counts[activity._id] ?? 1}
                      onChange={(e) =>
                        setCounts((prev) => ({
                          ...prev,
                          [activity._id]: Math.max(1, Number(e.target.value)),
                        }))
                      }
                      inputProps={{ min: 1 }}
                      sx={{ width: 80 }}
                      disabled={!canDo || isCurrentlySkilling || startingSkill === activity._id}
                    />
                    <Button
                      variant="contained"
                      size="small"
                      disabled={
                        !canDo ||
                        Boolean(isCurrentlySkilling) ||
                        startingSkill === activity._id
                      }
                      onClick={() => startSkilling(activity)}
                    >
                      {startingSkill === activity._id ? (
                        <CircularProgress size={16} />
                      ) : (
                        "Start"
                      )}
                    </Button>
                  </Stack>
                </Stack>
              </Grid>
            );
          })}
        </Grid>
      )}
    </div>
  );
};

export default PlayerSkilling;
