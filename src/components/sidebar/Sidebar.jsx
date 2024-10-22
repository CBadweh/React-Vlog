import "./sidebar.css"

export default function Sidebar() {
  return (
      <div className="sidebar">
        {/* Sidebar */}

        {/* ABOUT ME */}
        <div className="sidebarItem">
          <span className="sidebarTitle">ABOUT ME</span>
          <img
            src="https://www.animalhospitalofclemmons.com/files/AdobeStock290844781.jpeg"
            alt=""
          />
          <p>
            Laboris sunt aute cupidatat velit magna velit ullamco dolore mollit
            amet ex esse.Sunt eu ut nostrud id quis proident.
          </p>
        </div>

        {/* CATEGORIES */}
        <div className="sidebarItem">
          <span className="sidebarTitle">CATEGORIES</span>
          <ul className="sidebarList">
            <li className="sidebarListItem">Life</li>
            <li className="sidebarListItem">Music</li>
            <li className="sidebarListItem">Style</li>
            <li className="sidebarListItem">Tech</li>
          </ul>
        </div>

        {/* FOLLOW US */}
        <div className="sidebarItem">
          <span className="sidebarTitle">FOLLOW US</span>
          <div className="sidebarSocial">
            <i className="sidebarIcon fab fa-facebook-square"></i>
            <i className="sidebarIcon fab fa-instagram-square"></i>
            <i className="sidebarIcon fab fa-pinterest-square"></i>
            <i className="sidebarIcon fab fa-twitter-square"></i>
          </div>
      </div>
      </div>
  
  )
}
