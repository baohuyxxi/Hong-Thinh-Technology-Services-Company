import './Products.scss';
import React from "react";
import FramePage from "~/components/FramePage/FramePage";
import { FaCheckCircle } from "react-icons/fa";
import products from "~/mock/products.js"

// const products = [
//   "PHẦN MỀM QUẢN LÝ BÁN HÀNG POS365",
//   "Tingbox",
//   "MÁY POSAPP D3 FHD",
//   "Máy D2A POS Terminal (1 màn hình)",
//   "Máy D2A POS Terminal (2 màn hình)",
//   "MÁY POS PAC2S",
//   "MÁY IN BILL POSAPP USB +LAN",
//   "Máy in nhiệt 888BT AYIN in đơn hàng, in tem, mã vận đơn, mã vạch, phiếu gửi hàng",
//   "Máy in mã vạch HPRT HT330",
//   "Máy in mã vạch Xprinter XP-TT426B",
//   "Máy in mã vạch GODEX G500U",
//   "NGĂN KÉO ĐỰNG TIỀN PA (4 NGĂN)",
//   "BỘ RUNG 16 THẺ",
//   "MÁY QUÉT MÃ VẠCH ĐƠN TIA PA – QW2120",
//   "MÁY QUÉT MÃ VẠCH ĐƠN TIA DATAMAX PA – C1200",
//   "MÁY QUÉT ĐA TIA PA",
//   "GIẤY IN TEM 50X30 PA",
//   "GIẤY IN NHIỆT K57X45",
//   "GIẤY IN NHIỆT K80X45",
//   "GIẤY IN NHIỆT K80X80",
//   "Viettel CA (khai báo thuế) + CKS HSM",
//   "HDDT Sinvoice Viettel",
//   "Phần mềm Kế Toán",
//   "Phần mềm quản lý bán hàng",
//   "Phần mềm vBHXH",
// ];

const Products = () => {
//    console.log(products);
  return (
    <FramePage>
      <div className="product-cards">
      {products.map(({ id, name, image, bestSeller }) => (
        <div key={id} className="product-card">
          {bestSeller && <div className="product-card__badge">🔥 Bán chạy</div>}
          <div className="product-card__image-wrapper">
            <img src={image} alt={name} className="product-card__image" />
          </div>
          <div className="product-card__name">{name}</div>
          <button className="product-card__btn">Xem thêm</button>
        </div>
      ))}
    </div>
    </FramePage>
  );
};

export default Products;
