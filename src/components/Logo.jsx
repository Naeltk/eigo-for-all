import styled from "styled-components";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const LogoWrapper = styled(Link)`
  display: flex;
  align-items: center;
  height: 40px;
  cursor: pointer;

  img {
    height: 100%;
    width: auto;
    display: block;
  }
`;

export default function Logo() {
  return (
    <LogoWrapper to="/">
      <img src={logo} alt="Eigo for All logo" />
    </LogoWrapper>
  );
}