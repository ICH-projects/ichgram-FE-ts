export type ChildType = "search" | "notifications" | "create";

interface IMenuConfig {
  title: string;
  icon: string;
  link?: string;
  child?: ChildType;
}

const menuConfig: IMenuConfig[] = [
  {
    title: "Home",
    icon: "HomeIcon",
    link: "/",
  },
  {
    title: "Search",
    icon: "SearchIcon",
    child: "search",
  },
  {
    title: "Explore",
    icon: "ExploreIcon",
    link: "/explore",
  },
  {
    title: "Messages",
    icon: "MessagesIcon",
    link: "/messages",
  },
  {
    title: "Notifications",
    icon: "NotificationIcon",
    child: "notifications",
  },
  {
    title: "Create",
    icon: "CreateIcon",
    child: "create",
  },
  // {
  //     title: "Profile",
  //     icon: null,
  //     link: "/profile"
  // },
];

export default menuConfig;
