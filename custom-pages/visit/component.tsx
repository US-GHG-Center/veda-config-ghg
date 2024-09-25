import React from "$veda-ui/react";
import styled from "$veda-ui/styled-components";
import { Fold, FoldBody } from "$veda-ui-scripts/components/common/fold";
import RelatedContents from "../../overrides/components/related-content-cards";
import { glsp } from "$veda-ui/@devseed-ui/theme-provider";
import { decorativeHeader } from "../../overrides/common/style";
import {
  visitLocationStoryIds,
  visitLocationAllFeaturesStoryIds,
} from "../../overrides/common/story-data";

const StyledH2 = styled.h2`
  ${decorativeHeader}
  margin-bottom: ${glsp(0.5)};
`;

const FoldSection = styled.div`
  grid-column: 1 / -1;
  display: flex;
  flex-flow: column nowrap;
  margin-bottom: ${glsp(2)};
`;

export default function VisitPage() {
  return (
    <Fold>
      <FoldBody>
        <FoldSection>
          <StyledH2> Locations </StyledH2>
          <RelatedContents storyIds={visitLocationStoryIds} />
        </FoldSection>
        <FoldSection>
          <StyledH2> Features </StyledH2>
          <RelatedContents storyIds={visitLocationAllFeaturesStoryIds} />
        </FoldSection>
      </FoldBody>
    </Fold>
  );
}
