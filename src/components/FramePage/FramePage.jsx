import "./FramePage.scss";
// import Footer from '../Footer/Footer'
import HeaderDefault from "~/components/HeaderDefault/HeaderDefault";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Banner from "../Banner/Banner";
import Messenger from "../Messenger/Messenger";
import Phone from "../Phone/Phone";

export default function FramePage({ children, imageBanner }) {

  return (
    <div className="frame-page">
      <HeaderDefault />
      <Navbar />
      {/* <Banner image={imageBanner} /> */}
      <main className="frame-page__main">
        {children}
        <Messenger />
        <Phone />
      </main>

      <Footer />
    </div>
  );
}
