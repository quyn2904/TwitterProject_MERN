import React, { useContext, useEffect } from "react";
import DataContext from "../../context/DataContext";
import { useNavigate } from "react-router-dom";
import { callGetMe } from "./HomeService";
import CustomButton from "../../components/CustomButton/CustomButton";
import "./Home.scss";

export default function Home() {
  const { ctx, setCtx } = useContext(DataContext);
  const nav = useNavigate();
  const [user, setUser] = React.useState({ name: null, avatar: null });

  const checkUser = async () => {
    if (!ctx?.auth?.access_token) {
      nav("/login");
    } else {
      const data = await callGetMe(ctx.auth.access_token);
      const userInfo = data.result;
      console.log(userInfo);
      setCtx({ ...ctx, user: userInfo });
    }
  };

  // log out
  const logout = () => {
    setCtx({});
    nav("/login");
  };

  useEffect(() => {
    if (ctx.user) {
      setUser({ name: ctx.user.name, avatar: ctx.user.avatar });
    }
  }, [ctx.user]);

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <div className="Home">
      <div className="nav__container">
        <div logo-container></div>
        <ul className="nav__list">
          <li className="nav__item">
            <a href="/">Home</a>
          </li>
          <li className="nav__item">
            <a href="/">Explore</a>
          </li>
          <li className="nav__item">
            <a href="/">Notifications</a>
          </li>
          <li className="nav__item">
            <a href="/">Messages</a>
          </li>
          <li className="nav__item">
            <a href="/">Bookmarks</a>
          </li>
          <li className="nav__item">
            <a href="/">List</a>
          </li>
          <li className="nav__item">
            <a href="/">Profile</a>
          </li>
          <li className="nav__item">
            <a href="/">More</a>
          </li>
        </ul>
        <CustomButton text="Tweet" background="#42B72A" />
      </div>
      <div className="post__container">
        <h1>post</h1>
      </div>
      <div className="discover__container">
        <h1>discover</h1>
        <CustomButton
          text="Log out"
          onClick={logout}
          background="#42B72A"
        ></CustomButton>
      </div>
    </div>
  );
}
