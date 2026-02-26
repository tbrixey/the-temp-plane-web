import { useSession } from "../../contexts/authContext";
import {
  Button,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import userContext from "../../util/userContext";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { Quest } from "../../types/quest";
import { gameApi } from "../../util/gameApiClient";

const PlayerQuests = () => {
  const { data: session } = useSession();
  const navigate = useNavigate();
  const { user, setUser } = useContext(userContext);

  const [availableQuests, setAvailableQuests] = useState<Quest[]>();
  const [loadingQuests, setLoadingQuests] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (!session) {
      navigate("/game");
    }
  });

  const getAvailableQuests = async () => {
    setLoadingQuests(true);
    await gameApi
      .get("quests")
      .then((res) => {
        // API returns the array directly (not wrapped in data)
        const quests: Quest[] = Array.isArray(res.data) ? res.data : res.data.data ?? [];
        setAvailableQuests(quests);
      })
      .catch((error) => {
        const msg =
          error.response?.data?.message ??
          "Error getting quests, try again later.";
        enqueueSnackbar(msg);
      })
      .finally(() => setLoadingQuests(false));
  };

  const acceptQuest = async (questId: string) => {
    setActionLoading(questId);
    await gameApi
      .post(`quests/${questId}`)
      .then(() => {
        enqueueSnackbar("Quest accepted!");
        // Remove from available list after accepting
        setAvailableQuests((prev) => prev?.filter((q) => q._id !== questId));
      })
      .catch((error) => {
        const msg =
          error.response?.data?.message ?? "Error accepting quest.";
        enqueueSnackbar(msg);
      })
      .finally(() => setActionLoading(null));
  };

  const dropQuest = async (questId: string) => {
    setActionLoading(questId);
    await gameApi
      .delete(`quests/${questId}`)
      .then(() => {
        enqueueSnackbar("Quest abandoned!");
        if (setUser && user) {
          setUser({
            ...user,
            quests: user.quests.filter((q) => q._id !== questId),
          });
        }
      })
      .catch((error) => {
        const msg =
          error.response?.data?.message ?? "Error dropping quest.";
        enqueueSnackbar(msg);
      })
      .finally(() => setActionLoading(null));
  };

  if (!user) {
    return <div>error can not find user. Please go back to /game</div>;
  }

  const activeQuests = user.quests.filter((q) => q.type !== "intro");

  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-8">
      <Typography variant="h5" gutterBottom>
        Quests
      </Typography>

      {activeQuests.length > 0 && (
        <Stack spacing={1} sx={{ mb: 3, width: "100%", maxWidth: 500 }}>
          <Typography variant="h6">Active Quests</Typography>
          {activeQuests.map((quest) => (
            <Stack
              key={quest._id}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ border: "1px solid", borderColor: "divider", borderRadius: 1, p: 1.5 }}
            >
              <Stack spacing={0.5}>
                <Typography fontWeight="bold">{quest.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {quest.description}
                </Typography>
                <Chip label={quest.type} size="small" sx={{ width: "fit-content" }} />
              </Stack>
              <Button
                size="small"
                color="error"
                variant="outlined"
                disabled={actionLoading === quest._id}
                onClick={() => dropQuest(quest._id)}
              >
                Drop
              </Button>
            </Stack>
          ))}
          <Divider />
        </Stack>
      )}

      {user.location && user.location.type === "city" ? (
        <Stack spacing={2} alignItems="center" sx={{ width: "100%", maxWidth: 500 }}>
          <Typography style={{ textAlign: "center" }}>
            Get available quests in <b>{user.location.name}</b>
          </Typography>
          <Button
            onClick={getAvailableQuests}
            variant="contained"
            disabled={loadingQuests}
          >
            {loadingQuests ? <CircularProgress size={20} /> : "Get Quests"}
          </Button>
        </Stack>
      ) : (
        <Typography style={{ textAlign: "center" }}>
          Travel to a city to get available quests
        </Typography>
      )}

      {availableQuests && availableQuests.length === 0 && (
        <Typography sx={{ mt: 2 }} color="text.secondary">
          No quests available here.
        </Typography>
      )}

      {availableQuests && availableQuests.length > 0 && (
        <Grid
          spacing={1}
          container
          alignItems="center"
          flexDirection="column"
          sx={{ mt: 2, maxWidth: 500, width: "100%" }}
        >
          <Grid item xs={12}>
            <Typography variant="h6">Available Quests</Typography>
          </Grid>
          {availableQuests.map((quest) => (
            <Grid item key={quest._id} sx={{ width: "100%" }}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ border: "1px solid", borderColor: "divider", borderRadius: 1, p: 1.5 }}
              >
                <Stack spacing={0.5}>
                  <Typography fontWeight="bold">{quest.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {quest.description}
                  </Typography>
                  <Chip label={quest.type} size="small" sx={{ width: "fit-content" }} />
                </Stack>
                <Button
                  size="small"
                  variant="contained"
                  disabled={actionLoading === quest._id}
                  onClick={() => acceptQuest(quest._id)}
                >
                  Accept
                </Button>
              </Stack>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default PlayerQuests;
