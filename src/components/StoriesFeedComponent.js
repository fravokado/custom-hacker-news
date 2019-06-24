import React from "react";
import StoryComponent from "./StoryComponent";

export default function StoriesFeedComponent(props) {
    const { storyIds, stories } = props;

    let storyComponents = storyIds.map((id, index) => {
        return <StoryComponent
            key={id}
            number={index}
            story={stories[id]}
        />
    });

    return (
        <React.Fragment>
            {storyComponents}
        </React.Fragment>
    );
};