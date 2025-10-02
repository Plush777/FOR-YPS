declare module "@/data/nav/nav.json" {
  interface NavItem {
    name: string;
    link: string;
  }

  interface NavData {
    navList: NavItem[];
  }

  const navData: NavData;
  export default navData;
}
