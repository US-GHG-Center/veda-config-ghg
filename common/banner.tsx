import React, { useState } from '$veda-ui/react'
import { Button } from "$veda-ui/@devseed-ui/button";
import { CollecticonXmarkSmall } from "$veda-ui/@devseed-ui/collecticons";
import styled from '$veda-ui/styled-components';
import {
  glsp,
  media,
  themeVal
} from '$veda-ui/@devseed-ui/theme-provider';
import Hug from "$veda-ui-scripts/styles/hug";
import { getString } from 'veda';
import { Link } from "$veda-ui/react-router-dom";

const BANNER_KEY = 'dismissedBannerUrl'

interface BannerItems {
    children: React.ReactNode;
    postClose?: Function;
}

interface ClickableBannerItems {
    text: string;
    url: string;
    skipClientRouting?: boolean; // defaults to false
    postClose?: Function;
}

const BannerBox = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  
  background-color: #1C6AEF;
  text-align: center;
  font-size: 1rem;

  a {
    color: ${themeVal('color.surface')};
  }
`

const BannerContainer = styled(Hug)`
  width: 100%;
  padding: ${glsp(0, 0.25)};
  ${media.mediumDown`
    padding: ${glsp(0.25, 0.25)};
  `}
`;

const BannerContent = styled.div`
  grid-column: content-start / content-end;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-weight: 600;
  ${media.mediumDown`
    text-align: left;
    font-size: 0.75rem;
  `}
  a:link, a:visited {
    color: white;
  }
`

const MultiLinkBanner = styled.p`
    color: white;
    a {
      border-bottom: 1px solid white;
    }
`

function hasExpired(expiryDatetime) {
  const expiryDate = new Date(expiryDatetime);
  const currentDate = new Date();
  return !!(currentDate > expiryDate)
}

export const Banner: React.FC<BannerItems> = ({children, postClose}) => {
  const [ showBanner, setShowBanner ] = useState(true);

  return (
    showBanner &&
      <BannerBox className="banner">
        <BannerContainer>
          <BannerContent>
            { children }
          </BannerContent>
        </BannerContainer>
        <Button
          onClick={() => {
              setShowBanner(false);
              if (postClose) postClose();
            }}
          variation="base-text"
          fitting="skinny"
        >
          <CollecticonXmarkSmall title="Dismiss banner" color="white" meaningful />
        </Button>
      </BannerBox>
  )
}

export const ClickableBanner: React.FC<ClickableBannerItems> = ({text, url, skipClientRouting, postClose}) => {
  const clientRouting = (
      <Link to={url} target="_blank">
        {text}
      </Link>
  )

  const absoluteRouting = (
      <a href={url} target="_blank">
        {text}
      </a>
  )

  return (
    <Banner postClose={postClose}>
      { skipClientRouting ? absoluteRouting : clientRouting }
    </Banner>
  )
}

export function BannerHome() {
  const bannerUrl = getString('tempBannerUrl')?.other || "";
  const bannerExpires = getString('tempBannerExpires')?.other || "";
  const showBanner = (localStorage.getItem(BANNER_KEY) !== bannerUrl) && !!getString('tempBanner')?.other
  const [ showTempBanner, setShowTempBanner ] = useState(showBanner);

  const url = getString('tempBannerUrl')?.other;
  const text = getString('tempBanner').other;

  function postClose () {
    localStorage.setItem(
      BANNER_KEY,
      bannerUrl
    );
    setShowTempBanner(false);
  }

  return ((!hasExpired(bannerExpires)) && showTempBanner &&
    <ClickableBanner
      text={text}
      url={url}
      skipClientRouting={false}
      postClose={postClose}
    />
  )
}

export function DataToolkitBanner() {
  return (
    <Banner>
      <MultiLinkBanner>
        Sign up for the AGU pre-conference workshop <a href='https://agu.confex.com/agu/f/AGU24PreConWorkshops' target='_blank'>PREWS17</a>. Learn JupyterHub and QGIS data visualization and analysis using US GHG Center datasets, Dec 8th, 2024. <a href='https://www.agu.org/annual-meeting/attend#register' target='_blank'>Register early!</a>
      </MultiLinkBanner>
    </Banner>
  )
}