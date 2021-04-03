import MenuIcon from "@material-ui/icons/Menu";

export function Header({setShowSidebar}) {
  return (
    <nav className="nav" style={{height: "100%", backgroundColor: "#f3f4f6"}}>
      <div className="nav-left  lg pd-half">
        <button onClick={() => setShowSidebar((prev) => !prev)}>
          <MenuIcon />
        </button>
        <span className="mg-left-half">Crunhtube</span>
      </div>
    </nav>
  );
}
