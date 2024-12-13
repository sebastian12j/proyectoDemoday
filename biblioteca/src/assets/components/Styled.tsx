import styled from "styled-components";

export const NavBarContainer = styled.nav `
  width: 1150px;
  height: 70px;
  background-color: #008037;
  position: relative;
  display: flex;
  z-index: 1;
  color: #ffff;
  justify-content: space-between;
`;
export const Logo = styled.div`
  font-size: 24px;
  color: yellow;
  font-weight: bold;
`;

export const DivContainer = styled.div`
  padding: 50px;
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

// export const MenuLi = styled.li`
//   font-size: 18px;
//   color: #fff
//   cursor: pointer;
//   &:hover {
//   color: #f39c12}
// `;

export const PSaludo = styled.p `
text-align: center;
`;
