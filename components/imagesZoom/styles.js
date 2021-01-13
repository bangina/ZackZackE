import styled, { createGlobalStyle } from "styled-components";
import { CloseOutlined } from "@ant-design/icons";

export const Overlay = styled.div`
  position: fixed;
  z-index: 500000;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

export const Header = styled.header`
  height: 44px;
  background-color: white;
  position: relative;
  padding: 0;
  text-align: center;
  & h1 {
    margin: 0;
    font-size: 17px;
    color: #333;
    line-height: 44px;
  }
`;
export const CloseButton = styled(CloseOutlined)`
  position: absolute;
  right: 0;
  top: 0;
  padding: 15px;
  line-height: 14px;
  cursor: pointer;
`;
export const SliderWrapper = styled.div`
  height: calc(100% - 44px);
  background-color: rgba(0, 0, 0, 0.9);
`;
export const ImageWrapper = styled.div`
  padding: 32px;
  text-align: center;
  & img {
    margin: 0 auto;
    max-height: 750px;
    border: 1px solid red;
  }
`;
export const Indicator = styled.div`
  text-align: center;
  & > div {
    width: 75px;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    background-color: #313131;
    display: inline-block;
    text-align: center;
    color: #fff;
  }
`;
//스타일드 컴포넌트로 덮어씌우기
export const Global = createGlobalStyle`
.slick-slide{
display: inline-block;
}
.ant-card-cover{
transform: none !important;
}`;
