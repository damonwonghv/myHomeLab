import type { HomeLabData } from ".";

export default {
  name: "myLab",
  icon: "",
  data: [
    {
      group: {
        icon: "",
        title: "test",
        color: ""
      },
      links: [
        {
          title: "Homelab",
          subtitle: "",
          url: "http://proxmox.com",
          textColor: "#fff"
        },
        {
          title: "Google",
          url: "http://google.com",
          icon: "icon/google.png",
          bgColor: ""
        }
      ]
    }
  ]
} as HomeLabData;
