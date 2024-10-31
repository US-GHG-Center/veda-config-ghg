import React from "$veda-ui/react";
import styled from "$veda-ui/styled-components";
import { media, glsp } from "$veda-ui/@devseed-ui/theme-provider";
import { stories } from "veda";
import Hug from "$veda-ui-scripts/styles/hug";
import {
  Card,
  CardList
} from "$veda-ui-scripts/components/common/card";
import { ContentsPropType } from './theme-cards';

const CardWrapper = styled(Hug)`
  padding: ${glsp(1, 0)};
  grid-column: 1/-1;
`;

const StyledCard = styled(Card)`
  figure {
    height: 200px;
  }
`

const FlexibleCardList = styled(CardList)`
  ${media.largeUp`
    grid-template-columns: ${(props) => (props.cardAmount %2 ==0 ? "repeat(2, 1fr)" : "repeat(3, 1fr)")}
  `}
`

export default function EICRelatedContents({ storyIds }:ContentsPropType) {
  const relatedData = Object.keys(stories)
  .map((key) => stories[key].data)
  .filter((story) => storyIds.includes(story.id));

  const cards = relatedData.map((t) => (
    <li key={`${t.id}-card`}>
      <StyledCard
        key={t.id}
        linkLabel="View more"
        linkTo={t.asLink?.url?? `/stories/${t.id}`}
        title={t.name}
        description={t.description}
        imgSrc={t.media.src}
        imgAlt={t.media.alt}
        hideExternalLinkBadge={t.hideExternalLinkBadge}
      />
    </li>
  ))

  return (
    <CardWrapper>
        <FlexibleCardList cardAmount ={relatedData.length}>
          {cards}
        </FlexibleCardList>
    </CardWrapper>
  );
}
