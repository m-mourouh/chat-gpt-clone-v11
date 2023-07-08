import CloseSideBarButton from "@/components/CloseSideBarButton";
import Main from "@/components/Main";
import NavBar from "@/components/NavBar";

export default function Home() {
  return (
    <div className="flex">
      <CloseSideBarButton />
      <NavBar />
      <Main />
    </div>
  );
}
