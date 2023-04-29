import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";


// Import Components
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";



const Layout = (props) => {

  const { layoutType, leftSidebarType, sidebarVisibilitytype } = () => {}

  /*
    layout settings
  */


  useEffect(() => {
    if (
      sidebarVisibilitytype === "show" ||
      layoutType === "vertical"
    ) {
      document.querySelector(".hamburger-icon").classList.remove("open");
    } else {
      document.querySelector(".hamburger-icon").classList.add("open");
    }
  }, [sidebarVisibilitytype, layoutType]);

  /*
    call dark/light mode
    */
 
  const [headerClass, setHeaderClass] = useState("");
  // class add remove in header
  useEffect(() => {
    window.addEventListener("scroll", scrollNavigation, true);
  });
  function scrollNavigation() {
    var scrollup = document.documentElement.scrollTop;
    if (scrollup > 50) {
      setHeaderClass("topbar-shadow");
    } else {
      setHeaderClass("");
    }
  }

  return (
    <React.Fragment>
      <div id="layout-wrapper" className="layout-vertical">
        <Header
          headerClass={headerClass}
          layoutModeType={layoutType}
          
        />
        <div className="main-content">
          <div className="page-content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-12">
                  <Sidebar layoutType={layoutType} />
                  <div className="content-page">
                    {props.children}
                    <Footer />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

Layout.propTypes = {
  children: PropTypes.object,
};

export default Layout;
