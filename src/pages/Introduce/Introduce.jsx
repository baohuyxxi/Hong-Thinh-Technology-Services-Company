import "./Introduce.scss";
import FramePage from "~/components/FramePage/FramePage";
import { FaCheckCircle, FaPhoneAlt, FaEnvelope, FaFacebook, FaHandshake, FaBullseye, FaLaptopCode } from "react-icons/fa";

export default function Introduce() {
  return (
    <FramePage imageBanner="/images/banner-introduce.jpg">
      <div className="introduce">
        {/* Giới thiệu chung */}
        <section className="introduce__section">
          <h1 className="introduce__title">
            Công ty Cổ Phần Dịch Vụ Công Nghệ Hồng Thịnh
          </h1>
          <p className="introduce__text">
            Công ty Cổ Phần Dịch Vụ Công Nghệ Hồng Thịnh chuyên cung cấp
            các giải pháp và dịch vụ công nghệ thông tin, bao gồm:
            tư vấn, thiết kế website, cung cấp phần mềm quản lý,
            triển khai giải pháp chuyển đổi số cho doanh nghiệp và cá nhân.
          </p>
        </section>

        {/* Lĩnh vực hoạt động */}
        <section className="introduce__section">
          <h2><FaLaptopCode className="icon" /> Lĩnh vực hoạt động</h2>
          <ul>
            <li><FaCheckCircle /> Tư vấn & triển khai giải pháp công nghệ thông tin</li>
            <li><FaCheckCircle /> Thiết kế và phát triển website</li>
            <li><FaCheckCircle /> Cung cấp và triển khai phần mềm quản lý bán hàng</li>
            <li><FaCheckCircle /> Giải pháp chữ ký số và bảo mật dữ liệu</li>
            <li><FaCheckCircle /> Chuyển đổi số cho doanh nghiệp</li>
          </ul>
        </section>

        {/* Đại lý phần mềm */}
        <section className="introduce__section">
          <h2><FaHandshake className="icon" /> Đối tác & Sản phẩm phân phối</h2>
          <ul>
            <li><FaCheckCircle /> POS365 – Giải pháp quản lý bán hàng đa ngành</li>
            <li><FaCheckCircle /> TheLightGo – Phần mềm quản lý & bán hàng tiện lợi</li>
            <li><FaCheckCircle /> TingBox – Hệ thống quản lý hiện đại</li>
            <li><FaCheckCircle /> Viettel – Chữ ký số & giải pháp bảo mật</li>
          </ul>
        </section>

        {/* Sứ mệnh & Tầm nhìn */}
        <section className="introduce__section">
          <h2><FaBullseye className="icon" /> Sứ mệnh & Tầm nhìn</h2>
          <p>
            <strong>Sứ mệnh:</strong> Mang đến cho khách hàng những giải pháp công nghệ
            tiên tiến, giúp tối ưu quy trình, tiết kiệm chi phí và nâng cao hiệu quả kinh doanh.
          </p>
          <p>
            <strong>Tầm nhìn:</strong> Trở thành đơn vị cung cấp giải pháp công nghệ hàng đầu
            tại Việt Nam, góp phần thúc đẩy chuyển đổi số toàn diện.
          </p>
        </section>

        {/* Thông tin liên hệ */}
        <section className="introduce__section introduce__contact">
          <h2>📞 Thông tin liên hệ</h2>
          <p><FaPhoneAlt /> Hotline: 0907 079 168</p>
          <p><FaEnvelope /> Email: pitshongthinh@gmail.com</p>
          <p><FaFacebook /> Fanpage: Facebook Hồng Thịnh</p>
        </section>
      </div>
    </FramePage>
  );
}
