import React from "react";
import styled from "styled-components";

const HeaderWrapper = styled.div`
  text-align: center;
`;

const Header = () => (
  <HeaderWrapper>
    <h3>Manage your todo's anywhere. Sign in or register to get started.</h3>
    <p>
      You can still use the app without an account, but you'll only be able to
      manage your todo's in this device.
    </p>
  </HeaderWrapper>
);

export default Header;
