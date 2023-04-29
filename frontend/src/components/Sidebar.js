import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import SimpleBar from "simplebar-react";

// Import logo
import logoSm from "../assets/images/logo-sm.png";
import logoDark from "../assets/images/logo-dark.png";
import logoLight from "../assets/images/logo-light.png";

// Import Components
import VerticalSidebar from "./VerticalSidebar";
import { Container } from "reactstrap";

const Sidebar = ({ layoutType }) => {
  useEffect(() => {
    var verticalOverlay = document.getElementsByClassName("vertical-overlay");
    if (verticalOverlay) {
      verticalOverlay[0].addEventListener("click", function () {
        document.body.classList.remove("vertical-sidebar-enable");
      });
    }
  });

  const addEventListenerOnSmHoverMenu = () => {
    if (document.documentElement.getAttribute("data-sidebar-size") === "sm-hover") {
      document.documentElement.setAttribute("data-sidebar-size", "sm-hover-active");
    } else if (document.documentElement.getAttribute("data-sidebar-size") === "sm-hover-active") {
      document.documentElement.setAttribute("data-sidebar-size", "sm-hover");
    } else {
      document.documentElement.setAttribute("data-sidebar-size", "sm-hover");
    }
  };

  return (
    <React.Fragment>
      <div className="app-menu navbar-menu">
        <div className="navbar-brand-box">
          <Link to="/" className="logo logo-dark">
            <span className="logo-sm">
              <img src={logoSm} alt="" height="22" />
            </span>
            <span className="logo-lg">
              <img src={logoDark} alt="" height="17" />
            </span>
          </Link>

          <Link to="/" className="logo logo-light">
            <span className="logo-sm">
              <img src={logoSm} alt="" height="22" />
            </span>
            <span className="logo-lg">
              <img src={logoLight} alt="" height="17" />
            </span>
          </Link>
          <button
            onClick={addEventListenerOnSmHoverMenu}
            type="button"
            className="btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover"
            id="vertical-hover"
          >
            <i className="ri-record-circle-line"></i>
          </button>
        </div>
        <React.Fragment>
          <SimpleBar id="scrollbar" className="h-100">
            <ul className="nav nav-pills nav-sidebar flex-column">
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">
                  <i className="ri-dashboard-line"></i>
                  <span>Рабочий стол</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/students">
                  <i className="ri-user-line"></i>
                  <span>Ученики</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/calendar">
                  <i className="ri-book-line"></i>
                  <span>Расписание уроков</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/courses">
                  <i className="ri-book-line"></i>
                  <span>Группы</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/lids">
                  <i className="ri-book-line"></i>
                  <span>Новые</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin-options">
                  <i className="ri-book-line"></i>
                  <span>Администратирование</span>
                </Link>
              </li>
            </ul>
          </SimpleBar>
          <div className="sidebar-background"></div>
        </React.Fragment>
      </div>
      <div className="vertical-overlay"></div>
    </React.Fragment>
  );
};

export default Sidebar;
