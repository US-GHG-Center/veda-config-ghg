import React from "$veda-ui/react";
import { Link } from "$veda-ui/react-router-dom";
import styled from "$veda-ui/styled-components";
import { glsp, themeVal, media } from "$veda-ui/@devseed-ui/theme-provider";
import { Button } from "$veda-ui/@devseed-ui/button";
import Hug from "$veda-ui-scripts/styles/hug";
import {
  Fold,
  FoldHeader,
  FoldTitle,
  FoldBody,
  FoldHeadline,
  FoldHeadActions,
} from "$veda-ui-scripts/components/common/fold";
import { StyledVarHeading } from "../common/style";
import { variableGlsp } from "$veda-ui-scripts/styles/variable-utils";
import ThemeCards from "../components/theme-cards";
import { themeLandingPageIds } from "../common/story-data";
import VisitGHG from "../components/visit-ghg";
import VisitSLR from "../components/visit-slr";
import HyperwallCTA from "../components/hyperwall-cta";

import Partners from "./partners";

const IntroHeadline = styled(Hug)`
  display: flex;
  gap: ${glsp(2)};
  grid-column: content-start / content-end;

  ${media.largeUp`
    grid-column: content-2 / content-12;
    flex-flow: row;
  `}

  ${media.mediumDown`
    flex-flow: column;
  `}
  
  p {
    font-size: 1.25rem;
    padding-top: 1rem;
  }

  span {
    color: ${themeVal("color.primary")};
  }
`;

const HomeDescription = styled(Hug)`
  padding: ${variableGlsp(2.5, 0)};
  grid-row-gap: ${variableGlsp(2)};

  ${media.mediumUp`
    grid-row-gap: ${variableGlsp(3)};
  `}
`;
const IntroDesc = styled.div`
  ${media.largeUp`
    grid-column: -1/1;
  `}
`;

const GradientWrapper = styled.div`
  background-image: linear-gradient(
    ${themeVal("color.info-50")} 0%,
    ${themeVal("color.info-100")} 75%,
    ${themeVal("color.surface")} 75%
  );
`;

const CollaboratorsContent = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  gap: ${glsp()};
  padding: 7rem;

  div {
    margin: 1rem auto;
  }

  span {
    color: ${themeVal("color.primary")};
  }

  p {
    text-align: center;
  }
`

export default function HomeComponent() {
  const description =
    "The Earth Information Center consolidates data and insights on how Earth is changing from across the US federal government. Earth.gov is also the gateway to other interagency cooperative efforts for our planet, like the U.S. Greenhouse Gas Center.  Discover how these data are being used to prepare for climate change and mitigate, adapt and respond to environmental challenges across the country.  ";
  return (
    <>
      <GradientWrapper>
        <HomeDescription>
          <IntroHeadline>
            <IntroDesc>
              <StyledVarHeading size="xlarge" as="h1">
                One government
                <br />
                working for <span>one planet.</span>
              </StyledVarHeading>
              <p>{description}</p>
            </IntroDesc>
            <Partners size="small" top={4} />
          </IntroHeadline>
        </HomeDescription>
        <HyperwallCTA width="82%"/>
        <p>Earth.gov is also the gateway to other interagency cooperative efforts for our planet.</p>
        <VisitGHG width="82%"/>
        <VisitSLR width="82%"/>
      </GradientWrapper>
        <Fold>
          <FoldHeader>
            <FoldHeadline>
              <StyledVarHeading as="h2" size="large">
                Nine themes, one Earth
              </StyledVarHeading>
            </FoldHeadline>
            <FoldHeadActions>
              <Button
                forwardedAs={Link}
                to="/stories"
                size="medium"
                radius="square"
                variation="primary-fill"
              >
                View all themes
              </Button>
            </FoldHeadActions>
          </FoldHeader>

          <ThemeCards storyIds={themeLandingPageIds} />
        </Fold>
      <Fold>
        <FoldBody>
          <CollaboratorsContent>
            <StyledVarHeading size="small" as="h2">
              Joining forces <span>for a better tomorrow</span>
            </StyledVarHeading>
            <p>
            The EIC was created by NASA and is enabled by contributions across EPA, FEMA, NASA, NOAA, USAID, USDA and USGS.
            </p>
            <Partners size="small" />
            <Button
              forwardedAs="a"
              href="/about"
              size="medium"
              radius="square"
              variation="primary-fill"
            >
              Learn more
            </Button>
          </CollaboratorsContent>
        </FoldBody>
      </Fold>
    </>
  );
}
