import React from "react";
import CommentComponent from "./CommentComponent";

export default function CommentTreeComponent(props) {
    const { firstLevelIds, comments } = props;

    let commentComponents;
    if (firstLevelIds.length > 0 && Object.keys(comments).length > 0) {
        commentComponents = firstLevelIds.map(id =>
            <CommentComponent
                key={id}
                comment={comments[id]}
                comments={comments}
            />
        );
    }

    return (
        <React.Fragment>
            {commentComponents}
        </React.Fragment>
    );
};