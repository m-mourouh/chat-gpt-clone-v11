import SideBar from "./SideBar";
import TopBar from "./TopBar";

export default function NavBar() {
  return <nav className="relative ">
    <TopBar />
    <SideBar />
  </nav>;
}
// md:min-w-[260px]