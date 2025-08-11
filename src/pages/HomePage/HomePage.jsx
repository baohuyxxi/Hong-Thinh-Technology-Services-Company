import "./HomePage.scss";
import FramePage from "~/components/FramePage/FramePage";
import { FaCheckCircle, FaLock, FaRocket, FaStore, FaLaptopCode, FaCoffee, FaFileInvoiceDollar, FaPhoneAlt } from "react-icons/fa";

export default function HomePage() {
  return (
    <FramePage>
      <section className="home-banner">
        <div className="home-banner__content">
          <h1>Công ty Cổ Phần Dịch Vụ Công Nghệ Hồng Thịnh</h1>
          <p>Giải pháp công nghệ – Tối ưu vận hành – Nâng tầm thương hiệu</p>
          <a href="tel:0907079168" className="btn-contact">
            <FaPhoneAlt /> Liên hệ ngay: 0907 079 168
          </a>
        </div>
      </section>

      <section className="home-intro">
        <h2>Giới thiệu nhanh</h2>
        <p>
          Hồng Thịnh là đối tác tin cậy cung cấp các giải pháp công nghệ thông tin toàn diện: thiết kế website, chữ ký số Viettel, phần mềm quản lý bán hàng POS365, giải pháp quản lý quán cafe, trà sữa, và cung cấp giấy in nhiệt chất lượng cao. Cam kết mang đến dịch vụ bảo mật, hiệu quả và đồng hành lâu dài cùng sự phát triển của doanh nghiệp bạn.
        </p>
      </section>

      <section className="home-services">
        <h2>Dịch vụ chủ lực</h2>
        <div className="services-list">
          <div className="service-item">
            <FaLock className="service-icon" />
            <h3>Chữ ký số Viettel</h3>
            <p>Xác thực an toàn, tiện lợi, hợp pháp - ký hợp đồng và khai báo điện tử nhanh chóng.</p>
          </div>
          <div className="service-item">
            <FaStore className="service-icon" />
            <h3>Phần mềm quản lý bán hàng POS</h3>
            <p>Tối ưu quy trình bán hàng, giúp tăng doanh thu và tiết kiệm chi phí.</p>
          </div>
          <div className="service-item">
            <FaCoffee className="service-icon" />
            <h3>Giải pháp quản lý quán Cafe, Trà sữa</h3>
            <p>Quản lý kho, nhân viên, báo cáo doanh thu rõ ràng, hỗ trợ thanh toán hiện đại.</p>
          </div>
          <div className="service-item">
            <FaLaptopCode className="service-icon" />
            <h3>Thiết kế Website chuyên nghiệp</h3>
            <p>Chuẩn SEO, tốc độ nhanh, bảo mật cao, giao diện độc đáo phù hợp thương hiệu.</p>
          </div>
          <div className="service-item">
            <FaFileInvoiceDollar className="service-icon" />
            <h3>Giấy in nhiệt chất lượng cao</h3>
            <p>Giá tốt, in sắc nét, giao hàng toàn quốc, hỗ trợ mua số lượng lớn.</p>
          </div>
        </div>
      </section>

      <section className="home-benefits">
        <h2>Lợi ích khi chọn Hồng Thịnh</h2>
        <ul>
          <li><FaCheckCircle /> An tâm tuyệt đối với dịch vụ bảo mật và hỗ trợ lâu dài.</li>
          <li><FaCheckCircle /> Tiết kiệm chi phí với các gói dịch vụ cạnh tranh, hiệu quả.</li>
          <li><FaCheckCircle /> Hỗ trợ nhanh chóng bởi đội ngũ kỹ thuật giàu kinh nghiệm.</li>
          <li><FaCheckCircle /> Giải pháp toàn diện từ phần mềm, thiết bị đến dịch vụ triển khai.</li>
        </ul>
      </section>

      <section className="home-stats">
        <h2>Những con số ấn tượng</h2>
        <div className="stats-list">
          <div className="stat-item">
            <h3>2000+</h3>
            <p>Khách hàng tin tưởng</p>
          </div>
          <div className="stat-item">
            <h3>10+</h3>
            <p>Năm kinh nghiệm</p>
          </div>
          <div className="stat-item">
            <h3>5000+</h3>
            <p>Dự án đã triển khai</p>
          </div>
          <div className="stat-item">
            <h3>99%</h3>
            <p>Khách hàng hài lòng</p>
          </div>
        </div>
      </section>
    </FramePage>
  );
}
