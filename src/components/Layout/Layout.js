import { Outlet } from "react-router-dom";
import { Header, Footer } from "..";

function Layout({ handlePopupOpen }) {
  return (
    <>
      <Header onPopupOpen={handlePopupOpen} />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
