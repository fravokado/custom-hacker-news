const BASE_URL = "https://hacker-news.firebaseio.com/v0";
const JSON_PRETTY_PARAMS = ".json?print=pretty";
const STORY_TYPE = {
    topstories: "/topstories",
    newstories: "/newstories",
    beststories: "/beststories"
};

export const fetchStoriesTree = async (storyType) => {
    let storyTree = {
        storyIds: [],
        stories: {}
    }

    try {
        // Fetch feed story ids
        let storyIds = await fetch(BASE_URL + STORY_TYPE[storyType] + JSON_PRETTY_PARAMS).then(res => res.json());

        // TODO: Implement pagination, for now first 50 stories
        storyIds = storyIds.slice(0, 50);
        storyTree.storyIds = storyIds;

        // Fetch stories
        let stories = await Promise.all(storyIds.map(storyId => fetch(BASE_URL + "/item/" + storyId.toString() + JSON_PRETTY_PARAMS).then(response => response.json())));
        stories.forEach((story) => {
            storyTree.stories[story.id] = story;
        });

        return storyTree;
    } catch (err) {
        console.log(err);
    }
}

export const fetchCommentsTree = async (commentIds) => {
    let commentTree = {};

    try {
        // Fetch comments in deep
        const fetchComments = async (newCommentIds) => {
            let comments = await Promise.all(newCommentIds.map(commentId => fetch(BASE_URL + "/item/" + commentId.toString() + JSON_PRETTY_PARAMS).then(response => response.json())));
            let remainingKids = [];
            comments.forEach((comment) => {
                commentTree[comment.id] = comment;
                if (comment.kids && comment.kids.length > 0) {
                    remainingKids = remainingKids.concat(comment.kids);
                }
            });

            return remainingKids;
        }

        let remainingComments = commentIds;
        do {
            remainingComments = await fetchComments(remainingComments)
        }
        while (remainingComments.length > 0);

        return commentTree;
    } catch (err) {
        console.log(err);
    }
}