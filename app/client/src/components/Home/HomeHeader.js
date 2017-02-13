import React from 'react';
import AppBar from 'material-ui/AppBar';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import StyleIcon from 'material-ui/svg-icons/image/style';
import CreateIcon from 'material-ui/svg-icons/content/create';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import {white, green600, grey500} from 'material-ui/styles/colors';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import { Link, browserHistory } from 'react-router';
import AuthStore from '../../stores/AuthStore';
import AuthActions from '../../actions/AuthActions';

class HomeHeader extends React.Component {
    constructor() {
        super();
        this.state = {
            user: AuthStore.getState().user
        }

        this.onChange = this.onChange.bind(this);
    }

    onChange() {
        this.setState({ user: AuthStore.getState().user });
    }

    componentDidMount() {
        AuthStore.listen(this.onChange);
    }

    componentWillUnmount() {
        AuthStore.unlisten(this.onChange);
    }

    get styles() {
        return {
            container: {
                width: '100%',
            },
            username: {
                cursor: 'pointer',
            },
            notifications: {
                marginRight: 20,
                padding: 6,
                float: 'right',
            },
            rightContainer: {
                height: '100%',
                display: 'flex',
                alignItems: 'center',
            },
            rightIconElement: {
                margin: 0,
            },
            logout: {
                color: white,
            },
            notificationMenuPosition: {
                horizontal: 'left', vertical: 'top'
            }
        }
    }

    handleRequestAccept(friendId){
       alert("Req acc friend: " + friendId);
    }

    renderFriendRequest(friendName, friendId) {
        return (
            <MenuItem primaryText={
                <div>
                    <span>Friend request from&nbsp;
                        <Link to={"/users:"+ friendId} >
                            <b>{friendName}</b>
                        </Link>
                    </span>
                    <div>
                        <FlatButton label="Accept" labelStyle={{color: green600}} onClick={() => this.handleRequestAccept(friendId)} />
                        <FlatButton label="Ignore" labelStyle={{color: grey500}}/>
                    </div>
                </div>

            }
                      rightIcon={<PersonAdd />}
            />
        );
    }

    handleLogout() {
        AuthActions.logout();
        browserHistory.push('/');
    }

    renderGameRequest(friendName, gameId) {

    }

    render() {

        return (
            <div style={{...this.styles.container, ...this.props.style}}>
                <AppBar
                    title={
                        <Link to={"/users:"+ this.state.user.username}>
                            <span style={this.styles.username}>{this.state.user.username}</span>
                        </Link>}
                    iconElementLeft={
                        <IconMenu
                            iconButtonElement={
                                <IconButton>
                                    <MenuIcon color={white}/>
                                </IconButton>}
                            anchorOrigin={this.styles.notificationMenuPosition}
                            targetOrigin={this.styles.notificationMenuPosition}
                        >
                            <MenuItem primaryText="Change profile" leftIcon={<CreateIcon />}/>
                            <MenuItem primaryText="Go to lobby" leftIcon={<StyleIcon />}
                                      containerElement={<Link to="/lobby"/>}/>
                            <MenuItem primaryText="Add a friend" leftIcon={<PersonAdd />}/>
                        </IconMenu>
                    }
                    iconStyleRight={this.styles.rightIconElement}
                    iconElementRight={
                        <div style={this.styles.rightContainer}>
                            <Badge
                                badgeContent={2}
                                secondary={true}
                                style={this.styles.notifications}>
                                <IconMenu
                                    iconButtonElement={
                                        <IconButton tooltip="Notifications">
                                            <NotificationsIcon color={white}/>
                                        </IconButton>}
                                    anchorOrigin={this.styles.notificationMenuPosition}
                                    targetOrigin={this.styles.notificationMenuPosition}
                                    width={300}
                                >
                                    {this.renderFriendRequest("Darko", 2)}
                                    <MenuItem primaryText="Send feedback"/>
                                    <MenuItem primaryText="Settings"/>
                                    <MenuItem primaryText="Help"/>
                                    <MenuItem primaryText="Sign out"/>
                                </IconMenu>
                            </Badge>

                            <FlatButton style={this.styles.logout}
                                        label="Logout"
                                        onClick={this.handleLogout} />
                        </div>
                    }
                />

            </div>
        );
    }
}
export default HomeHeader;

HomeHeader.defaultProps = {};

HomeHeader.propTypes = {};