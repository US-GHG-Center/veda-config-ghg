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
import { Button } from "$veda-ui/@devseed-ui/button";
import HyperwallImg from "../home/media/hyperwall-image1.png";

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
  background-color: black;
  color: #ffffff;
  width: 100%;
  height: 300px;
  position: relative; // Make sure this is relative for positioning pseudo-elements
  overflow: hidden; // Ensures that the pseudo-element respects the container's border-radius

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${HyperwallImg});
    background-position: right bottom;
    background-repeat: no-repeat;
    background-size: cover;
    filter: blur(4px);
    z-index: 1; // Ensure this is behind the content
  }

  div {
    display: flex;
    flex-flow: column;
    gap: ${glsp()};
    padding-left: ${glsp(3)};
    padding-right: ${glsp()};
    justify-content: center;
    z-index: 2; // Ensure content is above the blurred background
    position: relative;
    background: linear-gradient(
      to right,
      rgba(0,0,0,1),
      rgba(0,0,0,0.9),
      rgba(0,0,0,0));
  }

  a {
    width: 18.5rem;
    z-index: 2; // Ensure links are above the blurred background
    position: relative;
  }
  grid-column: full-start / full-end;

  ${media.largeUp`
    grid-column: content-2 / content-12;
    height: 350px;
  `}
`;


export default function HyperwallCTA({
    width
  }:
  {
    width?: string
  }) {
  return (
    <Fold>
      <FoldBody>
        <BottomContent width={width}>
          <InfoImageContent>
            <div>
              <StyledVarHeading size="small" as="h2">
                Live Earth Dashboard
              </StyledVarHeading>
              <span>
                An interactive way to explore what's happening on Earth right now
              </span>
              <Button
                forwardedAs="a"
                href="/stories/hyperwall"
                size="medium"
                radius="square"
                variation="primary-fill"
              >
                Visit the Live Earth Dashboard
              </Button>
            </div>
          </InfoImageContent>
        </BottomContent>
      </FoldBody>
    </Fold>
  )
};