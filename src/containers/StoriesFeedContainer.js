import React, { Component } from "react";
import { fetchStoriesTree } from "../modules/api";
import StoriesFeedComponent from "../components/StoriesFeedComponent";
import CircularProgress from '@material-ui/core/CircularProgress';

export default class StoriesFeedContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            storyType: props.storyType,
            storyIds: [],
            stories: {},
            loading: true
        }
    }

    componentDidMount() {
        fetchStoriesTree(this.state.storyType).then(tree => this.setState({
            ...tree,
            loading: false
        }));
    }

    componentDidUpdate(prevProps) {
        if (this.props.storyType !== prevProps.storyType) {
            this.setState({loading: true});
            fetchStoriesTree(this.props.storyType).then((tree) => {
                this.setState({
                    ...tree,
                    loading: false,
                    storyType: this.props.storyType
                })
            });
        }
    }

    render() {
        if (this.state.loading) {
            return (
                <CircularProgress color="secondary" />
            );
        } else {
            return (
                <StoriesFeedComponent
                    storyIds={this.state.storyIds}
                    stories={this.state.stories}
                />
            );
        }
    }
}