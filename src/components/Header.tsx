import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

const HeaderWrapper = styled.div`
  text-align: center;
`;

const Link = styled.a`
  text-decoration: underline;
  color: inherit;
  cursor: pointer;
`;

interface IHeaderProps {
  isAuthenticated: boolean;
}

const Header = ({ isAuthenticated }: IHeaderProps) => {
  const headerAuthText = (
    <>
      <Link href="/login">Sign in</Link> or{" "}
      <Link href="/register">register</Link> to get started.
    </>
  );
  const headerAuthSubText = (
    <p>
      You can still use the app without an account, but you'll only be able to
      manage your todo's in this device.
    </p>
  );
  const headerAuthLogout = <Link href="/logout">Logout</Link>;
  return (
    <HeaderWrapper>
      <h3>
        Manage your todo's anywhere.
        {!isAuthenticated ? headerAuthText : headerAuthLogout}
      </h3>
      {!isAuthenticated && headerAuthSubText}
    </HeaderWrapper>
  );
};

const mapStateToProps = ({ auth }: any) => ({
  isAuthenticated: auth.isAuthenticated
});

export default connect(mapStateToProps)(Header);
