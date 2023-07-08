import ToggleButton from "./ToggleButton"
export default function CloseSideBarButton() {
  return (
    <div className="fixed top-4 left-4 hidden md:block ">
        <ToggleButton close={false}/>
    </div>
  )
}
