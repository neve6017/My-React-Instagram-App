import instagramLogo from "../assets/instagram.png";

const Nav = () => {
  return (
    <nav>
      <button className="logo">
        <img src={instagramLogo} alt="logo" />
      </button>
      <input type="text" className="search" placeholder="Search" />
      <span className="nav-links">
        <button>
          <i className="fas fa-home"></i>
        </button>
        <button>
          <i className="fas fa-paper-plane"></i>
        </button>
        <button>
          <i className="fas fa-compass"></i>
        </button>
        <button>
          <i className="fas fa-heart"></i>
        </button>
      </span>
    </nav>
  );
};

export default Nav;
