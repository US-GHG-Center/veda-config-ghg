import React, { useLayoutEffect } from "$veda-ui/react";
import styled from "$veda-ui/styled-components";
import { glsp } from "$veda-ui/@devseed-ui/theme-provider";
import { Link } from "$veda-ui/react-router-dom";

import BrandLogo from "./logo.svg";

import '/common/styles.scss';

const Brand = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: ${glsp()};

  a {
    &,
    &:visited {
      color: inherit;
      text-decoration: none;
    }
  }
`;

const Logo = styled.div`
  width: 9rem;
`;

export default function HeaderComponent() {
  useLayoutEffect(() => {
    const link = document.createElement("link");
    link.setAttribute(
      "href",
      "https://fonts.googleapis.com/css2?family=Inter:slnt,wght@-10..0,100..900&display=swap"
    );
    link.setAttribute("rel", "stylesheet");
    document.head.appendChild(link);
  }, []);

  return (
    <Brand>
      <Link to="/">
        <Logo>
          <img src={BrandLogo} alt="Earth.gov" />
        </Logo>
      </Link>
    </Brand>
  );
}
