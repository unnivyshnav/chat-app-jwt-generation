import "./messenger.css";
import vector from "../vector.svg";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function Messenger() {
  const nameRef = useRef();
  const mobileRef = useRef();
  const [viewMode, setViewMode] = useState(false);
  const [token, setToken] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/auth", {
        name: nameRef.current.value,
        mobile: mobileRef.current.value,
      });
      console.log(res.data);
      setViewMode(true);
      setToken(res.data);
    } catch (err) {}
  };
  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);
  return (
    <div>
      <form onSubmit={handleSubmit} className="messenger">
        <div className="rectangle">
          <span className="vector">
            <img src={vector} alt="" />
          </span>
          <span className="auth">Auth</span>
        </div>
        {!viewMode && (
          <div className="generateMode">
            <span className="register">Register</span>
            <div className="name">
              <input
                type="text"
                placeholder="Name"
                name="name"
                ref={nameRef}
                required="true"
              />
            </div>
            <div className="mobile">
              <input
                type="text"
                placeholder="Mobile Number"
                name="mobile"
                ref={mobileRef}
                required="true"
              />
            </div>
            <div className="nextButton">
              <button type="submit">Generate Token</button>
            </div>
          </div>
        )}
        {viewMode && (
          <div className="genrateMode">
            <span className="register">Token Generated!!</span>
            <div className="name">
              <input type="text" value={token} ref={nameRef} />
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
