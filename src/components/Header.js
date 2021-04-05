import MenuIcon from "@material-ui/icons/Menu";
import YouTubeIcon from "@material-ui/icons/YouTube";
export function Header({setShowSidebar}) {
  return (
    <nav className="nav" style={{height: "100%", backgroundColor: "#f3f4f6"}}>
      <div className="nav-left  lg pd-half">
        <button onClick={() => setShowSidebar((prev) => !prev)}>
          <MenuIcon />
        </button>
        <span className="mg-left-half flex row align-items-center">
          <YouTubeIcon fontSize={"large"} /> Crunchtube
        </span>
      </div>
    </nav>
  );
}
