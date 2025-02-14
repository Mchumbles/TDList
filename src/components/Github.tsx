import { FaGithub } from "react-icons/fa";
import "../styles/github.css";

function GitHub() {
  return (
    <button className="github-button">
      <a
        href="https://github.com/Mchumbles/TDList"
        target="_blank"
        rel="noopener noreferrer"
        className="github-link"
      >
        <FaGithub
          size={window.innerWidth < 640 ? 35 : 45}
          className="github-icon"
        />
      </a>
    </button>
  );
}

export default GitHub;
