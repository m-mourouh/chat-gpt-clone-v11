import OpenSideBarButton from "@/components/OpenSideBarButton";
import NavBar from "@/components/NavBar";
import Loader from "./Loader";


export default function Layout() {
  return (
    <div className="flex">
      <OpenSideBarButton />
      <NavBar />
      <Loader />
    </div>
  );
}
