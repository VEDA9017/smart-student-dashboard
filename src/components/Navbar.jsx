import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/tasks">Tasks</Link>
      <Link to="/attendance">Attendance</Link>
      <Link to="/notes">Notes</Link>
    </nav>
  );
};

export default Navbar;
