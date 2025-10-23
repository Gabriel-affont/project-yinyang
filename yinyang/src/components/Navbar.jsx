import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4 flex gap-4">
      <Link to="/">Home</Link>
      <Link to="/services">Explore Skills</Link>
      <Link to="/post-skill">Post a Skill</Link>
    </nav>
  );
}
