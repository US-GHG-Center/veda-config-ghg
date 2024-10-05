import React from "$veda-ui/react";
import {
  Fold,
  FoldBody,
} from "$veda-ui-scripts/components/common/fold";
import styled from "$veda-ui/styled-components";
import Hug from "$veda-ui-scripts/styles/hug";
import { glsp, media } from "$veda-ui/@devseed-ui/theme-provider";
import { ExpandLink } from "./expand-link";
import { StyledVarHeading } from "../common/style";
import SeaSideImg from "../home/media/seaside-background.jpg";
import { Button } from "$veda-ui/@devseed-ui/button";

const BottomContent = styled(Hug)`
  display: flex;
  gap: ${glsp(2)};
  flex-flow: column;
  width: ${({width}) => width || '100%'};
  margin: auto;

  ${media.mediumDown`
      width: 100%
  `}
`;

const InfoImageContent = styled.div`
  display: flex;
  flex-flow: row;
  background-color: #02225b; // @TODO: But where can I get this color?
  color: #121414;
  width: 100%;
  height: 300px;
  background-image: url(${SeaSideImg});
  background-position: right bottom -50px;
  background-repeat: no-repeat;
  div {
    display: flex;
    flex-flow: column;
    gap: ${glsp()};
    padding-left: ${glsp(3)};
    justify-content: center;
  }

  a {
    width: 18.5rem;
  }
  grid-column: full-start / full-end;
  ${media.largeUp`
    grid-column: content-2 / content-12;
    height: 350px;
  `}
`;

export default function VisitSLR({
    width
  }:
  {
    width?: string
  }) {
  return (
    <Fold>
      <FoldBody>
        <BottomContent width={width}>
          <p>
            Earth.gov is also the gateway to other interagency cooperative
            efforts for our planet, like the{" "}
            <ExpandLink as="a" href="https://earth.gov/sealevel">
              {" "}
              U.S. Sea Level Change Portal
            </ExpandLink>
          </p>
          <InfoImageContent>
            <div>
              <StyledVarHeading size="small" as="h2">
                U.S. Sea Level Change
              </StyledVarHeading>
              <span>
                Rising Seas, Changing Coasts
              </span>
              <Button
                forwardedAs="a"
                href="https://earth.gov/sealevel"
                size="medium"
                radius="square"
                variation="primary-fill"
              >
                Learn more on the portal
              </Button>
            </div>
          </InfoImageContent>
        </BottomContent>
      </FoldBody>
    </Fold>
  )
};
