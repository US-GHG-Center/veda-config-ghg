import React from "$veda-ui/react";
import styled from "$veda-ui/styled-components";

import Image from "$veda-ui-scripts/components/common/blocks/images";
import { media } from "$veda-ui/@devseed-ui/theme-provider";

import { getLinkProps } from "$veda-ui-scripts/utils/url";

//import haqastImg from "../media/haqast.png";
import nasaImg from "../media/nasa.png";
import epaImg from "../media/epa.svg";
import noaaImg from "../media/noaa.png";




const LogoWrapper = styled.div`
  grid-column: 1 / -1;
  display: flex;
  flex-flow: wrap;
  gap: 2rem;
  align-items: center;
  justify-content: center;
  z-index: 10;

  > * {
    flex-shrink: 0;
  }
  ${media.mediumDown`
    gap: 1rem;
  `}
`;

export default function Partners(props: {
  variation: "positive" | "negative";
  size: "big" | "small"
}) {
  const { variation, size } = props;
  const squareLogoHeight = size == "big"? "80" : "40"
  const wideLogoHeight = size == "big"? "28" : "14"
  

  return (
    <LogoWrapper>
      <a {...getLinkProps("https://www.nasa.gov/")}>
        <Image src={nasaImg} alt="NASA logo" height={size === "big" ? "90" : "45"}  />
      </a>
      <a {...getLinkProps("https://www.epa.gov/")}>
        <Image src={epaImg} alt="EPA logo" height={squareLogoHeight} />
      </a>
      <a {...getLinkProps("https://www.noaa.gov/")}>
        <Image src={noaaImg} alt="NOAA logo" height={squareLogoHeight} />
      </a>
      {/* <a {...getLinkProps("https://haqast.org/")}>
        <Image src={haqastImg} alt="HAQAST logo" height={squareLogoHeight} />
      </a> */}
    </LogoWrapper>
  );
}
