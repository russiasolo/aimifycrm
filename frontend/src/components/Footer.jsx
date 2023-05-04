import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";

function Footer()  {
  return (
    <div className="footer">
      <Container>
        <div>
          <Grid>
            <Typography color="textSecondary" variant="subtitle1">{`${new Date().getFullYear()} | AimifyCRM | by Libion`}</Typography>
          </Grid>
        </div>
      </Container>
    </div>
  );
};

export default Footer;