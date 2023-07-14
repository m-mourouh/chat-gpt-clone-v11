"use client";
import ToggleButton from "./ToggleButton";
import { useAppSelector } from "@/redux/hooks";

export default function OpenSideBarButton() {
  const isClosed = useAppSelector((state) => state.sideBar.isClosed);
  if (isClosed) {
    return (
      <div className="fixed top-4 left-4 hidden md:block z-10 ">
        <ToggleButton close={false} />
      </div>
    );
  }
  return null;
}
