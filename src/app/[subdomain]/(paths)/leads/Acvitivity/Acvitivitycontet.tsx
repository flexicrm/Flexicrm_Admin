import React from "react";
import { Typography, Divider, Box } from "@mui/material";

interface User {
  firstname?: string;
}

interface FollowItem {
  userId?: User;
  actionType?: string;
  description?: string;
}

interface LeadDetailsProps {
  follow: FollowItem[];
}

const LeadDetails: React.FC<LeadDetailsProps> = ({ follow }) => {
  return (
    <Box>
      <Typography variant="h5" sx={{ color: "#083A50", mb: 2 }}>
        Lead Activity
      </Typography>
      {Array.isArray(follow) && follow.length > 0 ? (
        follow.map((item, i) => (
          <Box key={i} mb={2}>
            <Typography>
              <strong>First Name:</strong> {item?.userId?.firstname || "Unknown"}
            </Typography>
            <Typography>
              <strong>Action Type:</strong> {item?.actionType}
            </Typography>
            <Typography>
              <strong>Description:</strong> {item?.description}
            </Typography>
            <Divider sx={{ my: 2 }} />
          </Box>
        ))
      ) : (
        <Typography>No lead activity available.</Typography>
      )}
    </Box>
  );
};

export default LeadDetails;
