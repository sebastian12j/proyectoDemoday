import styled from "styled-components";

export const NavBarContainer = styled.nav`
  width: 100%;
  height: 60px;
  background-color: #000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  color: #fff;
`;
export const Logo = styled.div`
  font-size: 24px;
  color: yellow;
  font-weight: bold;
`;

export const DivContainer = styled.div`
  padding: 30px;
  margin: 0 auto;
  max-width: 400px;
  mix-height: 200px;
`;

export const FormStyle = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
export const MenuUl = styled.ul`
  list-style-type: none;
  display: flex;
  gap: 20px;
`;

export const MenuLi = styled.li`
  font-size: 18px;
  color: #fff
  cursor: pointer;
  &:hover {
  color: #f39c12}
`;
