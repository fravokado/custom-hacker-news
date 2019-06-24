import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { Paper, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CommentTreeComponent from "./CommentTreeComponent";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: "5px"
    },
    paper: {
        padding: theme.spacing(3, 2)
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    panelDetails: {
        display: "block"
    },
}));

export default function CommentComponent(props) {
    const { comment, comments } = props;
    const classes = useStyles();

    let render = null;
    if (comment.kids && comment.kids.length > 0) {
        render =
            <ExpansionPanel>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                <Typography variant="body2">
                    {comment.text}
                    <br />
                    <br />
                    Replies: {comment.kids.length}
                </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.panelDetails}>
                    <CommentTreeComponent
                        firstLevelIds={comment.kids}
                        comments={comments}
                    />
                </ExpansionPanelDetails>
            </ExpansionPanel>
    } else {
        render =
            <Paper className={classes.paper}>
                <Typography className={classes.heading}>{comment.text}</Typography>
            </Paper>
    }

    return (
        <div className={classes.root}>
            {render}
        </div>
    );
};