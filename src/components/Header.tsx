import React from "react";
import styled from "styled-components";

const HeaderWrapper = styled.div`
  text-align: center;
`;

const Link = styled.a`
  text-decoration: underline;
  color: inherit;
  cursor: pointer;
`;

const Header = () => (
  <HeaderWrapper>
    <h3>
      Manage your todo's anywhere. <Link href="/login">Sign in</Link> or{" "}
      <Link href="/register">register</Link> to get started.
    </h3>
    <p>
      You can still use the app without an account, but you'll only be able to
      manage your todo's in this device.
    </p>
  </HeaderWrapper>
);

export default Header;
