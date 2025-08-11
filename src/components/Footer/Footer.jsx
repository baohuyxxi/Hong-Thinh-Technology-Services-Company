import "./Footer.scss";
import logo from "~/assets/images/logoMain.jpg";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__above">
        <div className="footer__info">
          <div className="footer__logo">
            <img src={logo} alt="logo" className="img__logo" />
          </div>
        </div>
        <div className="footer-about row">
          <div className="footer-about__item col l-4 m-6 c-12">
            <div className="footer-about__item__title">Hỗ trợ</div>
            <Link to="/#faq" className="footer-about__item__content">
              Câu hỏi thường gặp
            </Link>
            <Link to="/#guide" className="footer-about__item__content">
              
            </Link>
            <Link to="/#payment" className="footer-about__item__content">
             
            </Link>
            <Link to="/#feedback" className="footer-about__item__content">
              
            </Link>
          </div>
          <div className="footer-about__item col l-4 m-6 c-12">
            <div className="footer-about__item__title">Thông tin</div>
            <Link to="/#policy" className="footer-about__item__content">
              MST: 1301132259
            </Link>
            <Link to="/#team" className="footer-about__item__content">
              Địa chỉ: Số nhà 945/3 Ấp 3, Phường Sơn Đông, Vĩnh Long
            </Link>
            <Link to="/#founder" className="footer-about__item__content">
              Người sáng lập
            </Link>
            <Link to="/#achievement" className="footer-about__item__content">
             
            </Link>
          </div>
          <div className="footer-about__item col l-4 m-6 c-12">
            <div className="footer-about__item__title">LIÊN HỆ</div>
            <Link to="/#contact" className="footer-about__item__content">
              <span className="footer-about__item__content__email">
                Email: pitshongthinh@gmail.com
              </span>
            </Link>
            <Link
              to="https://www.facebook.com/BiSteam129"
              className="footer-about__item__content"
            >
              Facebook
            </Link>
            <Link to="/#contact" className="footer-about__item__content">
               Số Điện thoại: 0123456789
            </Link>
          </div>
        </div>
      </div>
      <div className="divider"></div>
      <div className="footer__below">
        <div className="footer__contact">
          Bản quyên thuộc về Công ty Cổ Phần Dịch Vụ Công Nghệ Hồng Thịnh
        </div>
        <div></div>
      </div>
    </footer>
  );
}
