export type ChildType = "search" | "notifications" | "create" | "post_detail";

interface IMenuConfig {
  title: string;
  icon: string;
  link?: string;
  childType?: ChildType;
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
    childType: "search",
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
    childType: "notifications",
  },
  {
    title: "Create",
    icon: "CreateIcon",
    childType: "create",
  },
];

export default menuConfig;
