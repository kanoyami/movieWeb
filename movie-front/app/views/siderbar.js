import React, { Component } from 'react'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
class SidebarLeftOverlay extends Component {
  state = { visible: true}

  toggleVisibility = () => this.setState({ visible: !this.state.visible })

  render() {
    const { visible } = this.state
    return (
      <div >
        
        <Sidebar.Pushable as={Segment}>
          <Sidebar style={{height:'1000px',position:'fixed'}} as={Menu} animation='push' width='thin' visible={visible} icon='labeled' vertical inverted>
          <Link to={'/'}>
            <Menu.Item name='home'>
              <Icon name='home' />
              Home
            </Menu.Item>
          </Link>
            
          </Sidebar>
          <Sidebar.Pusher>
            <Segment  basic>
              {this.props.children}
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    )
  }
}

export default SidebarLeftOverlay