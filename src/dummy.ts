import type { HomeLabData } from ".";

export default {
  name: "myHomeLab",
  data: [
    {
      group: {
        icon: "",
        title: "Test Lab",
        color: ""
      },
      links: [
        {
          title: "Homelab",
          subtitle: "Proxmox",
          url: "http://proxmox.com",
          textColor: "#fff"
        },
        {
          title: "Google",
          url: "http://google.com",
          bgColor: ""
        }
      ]
    }
  ]
} as HomeLabData;
