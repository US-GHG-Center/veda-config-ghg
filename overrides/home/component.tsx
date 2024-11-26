import React from "$veda-ui/react";
import { Link } from "$veda-ui/react-router-dom";
import styled from "$veda-ui/styled-components";
import { glsp, themeVal, media } from "$veda-ui/@devseed-ui/theme-provider";
import { Button } from "$veda-ui/@devseed-ui/button";
import {
  Fold,
  FoldHeader, FoldBody,
  FoldHeadline,
  FoldHeadActions
} from "$veda-ui-scripts/components/common/fold";
import { StyledVarHeading } from "../common/style";
import { variableGlsp } from "$veda-ui-scripts/styles/variable-utils";
import ThemeCards from "../components/theme-cards";
import { themeLandingPageIds } from "../common/story-data";
import HyperwallCTA from "../components/hyperwall-cta";
import Partners from "./partners";
import Carousel from './carousel/';
import { GridContainer, Grid } from '$veda-ui/@trussworks/react-uswds';

const IntroHeadline = styled.div`
  display: flex;
  gap: ${glsp(2)};
  width: 100%;
  height: 100%;

  ${media.largeUp`
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

const HomeDescription = styled.div`
  padding: ${variableGlsp(2.5, 0)};
  width: 100%;
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
const SpacerDiv = styled.div`
  padding:2rem;

`
export default function HomeComponent() {
  const description =
    "The Earth Information Center consolidates data and insights on how Earth is changing from across the US federal government. Earth.gov is also the gateway to other interagency cooperative efforts for our planet, like the U.S. Greenhouse Gas Center.  Discover how these data are being used to prepare for climate change and mitigate, adapt and respond to environmental challenges across the country.  ";
  return (
    <>
      <GradientWrapper>
        <GridContainer>
          <Grid row>
            <Grid col>
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
              <HyperwallCTA />
            </Grid>
          </Grid>
        </GridContainer>
      </GradientWrapper>
      {/* Had to add a div wrapper so that the GridContainer styles are correct applied */}
      <div className="padding-top-10 padding-bottom-4">
        <GridContainer>
          <Grid row>
            <Grid col>
              <StyledVarHeading as="h2" size="large">
                Featured interagency collaborations for our planet
              </StyledVarHeading>
            </Grid>
          </Grid>
        </GridContainer>
      </div>
      <Carousel />
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
