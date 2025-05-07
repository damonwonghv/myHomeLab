import { Box, Tooltip, Typography } from "@mui/material";
import type { LinkType } from "../..";
import { type FC } from "react";
import "./index.less";

export const MyLink: FC<LinkType> = (props) => {
  const { title, icon, textColor, bgColor, url, subtitle } = props;
  const goTo = (url: string) => {
    window.open(url, "_blank");
  };
  const Icon = (url: string | undefined) => {
    if (url) return <img className="link-icon-style" src={url}></img>;
    else return <></>;
  };
  return (
    <Tooltip title={title} arrow>
      <Box
        className="link"
        sx={{ backgroundColor: bgColor }}
        onClick={() => {
          goTo(url);
        }}
      >
        <Box className="link-icon">{Icon(icon)}</Box>
        <Box className="link-title">
          <Typography
            noWrap
            className="link-title-text"
            variant="body1"
            sx={{ color: textColor || "text.secondary" }}
          >
            {title}
          </Typography>
          <Typography
            className="link-subtitle-text"
            variant="body2"
            sx={{ color: "text.secondary" }}
          >
            {subtitle}
          </Typography>
        </Box>
      </Box>
    </Tooltip>
  );
};
