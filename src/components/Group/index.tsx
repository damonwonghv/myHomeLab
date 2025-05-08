import type { FC } from "react";
import type { LinkType } from "../../index.d";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { MyLink } from "../Link";
import "./index.less";

interface GroupProps {
  title: string;
  links: LinkType[];
}

export const MyGroup: FC<GroupProps> = (props) => {
  const { title, links } = props;
  return (
    <Box className="group">
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>

          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {links.map((item, i) => (
              <Grid size={4} key={i}>
                <MyLink
                  title={item.title}
                  url={item.url}
                  bgColor={item.bgColor}
                  icon={item.icon}
                  subtitle={item.subtitle}
                  textColor={item.textColor}
                ></MyLink>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};
