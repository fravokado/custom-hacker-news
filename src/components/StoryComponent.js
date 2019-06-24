import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CommentTreeComponent from "./CommentTreeComponent";
import { fetchCommentsTree } from "../modules/api";


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        padding: theme.spacing(3, 2),
        textAlign: "left",
        marginTop: "5px"
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    panel: {
        marginTop: "15px"
    },
    panelDetails: {
        display: "block"
    }
}));

const fetchComments = (event, expanded, commentIds, setComments) => {
    if (expanded) {
        fetchCommentsTree(commentIds).then(comments => setComments(comments));
    }
};

export default function StoryComponent(props) {
    const { number, story } = props;
    const [comments, setComments] = useState({});
    const classes = useStyles();

    let commentsSection = null;
    if (story.kids && story.kids.length > 0) {
        commentsSection =
            <ExpansionPanel 
                className={classes.panel}
                onChange={(event, expanded) => fetchComments(event, expanded, story.kids, setComments)}
            >
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={classes.heading}>Comments: {story.kids.length}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.panelDetails}>
                    <CommentTreeComponent
                        firstLevelIds={story.kids}
                        comments={comments}
                    />
                </ExpansionPanelDetails>
            </ExpansionPanel>
    }

    return (
        <Paper className={classes.root}>
            <Typography variant="caption">
                Score {story.score} | by: {story.by} | <a href={story.url} target="_blank">source</a>
            </Typography>
            <Typography>
                {number}. {story.title}
            </Typography>
            {commentsSection}
        </Paper>
    );
};