import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CommentTreeComponent from "./CommentTreeComponent";
import { fetchCommentsTree } from "../modules/api";
import CircularProgress from '@material-ui/core/CircularProgress';
import IconUp from "@material-ui/icons/ArrowUpward";


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
    },
    titleContainer: {
        display: "flex"
    }
}));

const fetchComments = (event, expanded, commentIds, setComments, setLoading) => {
    if (expanded) {
        setLoading(true);
        fetchCommentsTree(commentIds).then((comments) => {
            setComments(comments);
            setLoading(false);
        });
    }
};

const handleUpvote = (event) => {
    window.alert("To be implemented!");
} 

export default function StoryComponent(props) {
    const { number, story } = props;
    const [comments, setComments] = useState({});
    const [loading, setLoading] = useState(false);
    const classes = useStyles();

    let commentsSection = null;
    if (story.kids && story.kids.length > 0) {

        let expansionDetails;
        if (loading) {
            expansionDetails = <CircularProgress color="secondary" />
        } else {
            expansionDetails = <CommentTreeComponent
                firstLevelIds={story.kids}
                comments={comments}
            />
        }

        commentsSection =
            <ExpansionPanel
                className={classes.panel}
                onChange={(event, expanded) => fetchComments(event, expanded, story.kids, setComments, setLoading)}
            >
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography variant="body2">Comments: {story.kids.length}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.panelDetails}>
                    {expansionDetails}
                </ExpansionPanelDetails>
            </ExpansionPanel>
    }

    return (
        <Paper className={classes.root}>
            <Typography variant="caption">
                Score {story.score} | by: {story.by} | <a href={story.url} rel="noopener noreferrer" target="_blank">source</a>
            </Typography>
            <div className={classes.titleContainer}>
                <IconUp onClick={handleUpvote} />
                <Typography>
                    {number}. {story.title}
                </Typography>
            </div>
            {commentsSection}
        </Paper>
    );
};