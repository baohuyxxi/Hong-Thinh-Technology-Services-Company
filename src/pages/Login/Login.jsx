import "./Login.scss";
import { useState } from "react";
import FramePage from "~/components/FramePage/FramePage";
import { roleLogin } from "~/models/roleLogin";
import AuthAPI from "~/services/apis/AuthAPI";
import { useDispatch } from "react-redux";
import accountSlice from "~/redux/accountSlice";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import DialogLoading from "~/components/DialogLoading/DialogLoading";

export default function Login() {
  const [dataLogin, setDataLogin] = useState({ account: "", password: "" });
  const [selectRole, setSelectRole] = useState();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    AuthAPI.login(dataLogin)
      .then((res) => {
        dispatch(accountSlice.actions.login(res.data));
        enqueueSnackbar("Đăng nhập thành công", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        enqueueSnackbar("Đăng nhập thất bại", { variant: "error" });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleChange = (e) => {
    setDataLogin({
      ...dataLogin,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <FramePage>
      {loading && <DialogLoading />}
      <div id="login-form">
        <h1>Đăng nhập</h1>
        <div className="radios">
          {roleLogin.map((role) => (
            <div className="radio" key={role.role}>
              <input
                id={role.role}
                className="radio"
                type="radio"
                checked={role.role === selectRole}
                onClick={(e) => {
                  setSelectRole(role.role);
                }}
              />
              <label htmlFor={role.role} className="radio-label">
                {role.label}
              </label>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="account">Email/Username/SĐT:</label>
          <input
            type="text"
            id="account"
            name="account"
            value={dataLogin.account}
            onChange={handleChange}
          />
          <label htmlFor="password">Mật khẩu :</label>
          <input
            type="password"
            id="password"
            name="password"
            value={dataLogin.password}
            onChange={handleChange}
          />
          <input type="submit" value="Đăng nhập" />
        </form>
      </div>
    </FramePage>
  );
}
