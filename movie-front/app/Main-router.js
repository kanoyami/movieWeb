import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import SidebarLeftOverlay from './views/siderbar'
import CardView from './views/cardview'
import MenuNav from './views/menu'
import ViewList from './controller/GetListController'
import VideoPage from './views/videoPage'

export default class MainRouter extends React.Component{
	constructor(props){
		super(props);
    this.state={data:[]};
	}

  userToken = (data) =>{
    //console.log(data);
    this.setState({data:data});
}

	render(){
	var locate = this.props.history.push;

		return (
  
  	<div>
    <MenuNav upload={this.userToken}/>
    <SidebarLeftOverlay >
    <Route exact path={'/'} component={ViewList}/>
    <Route exact path={'/home/:vid?'}  component={VideoPage}/>
    </SidebarLeftOverlay >
    </div>
           )

	}
}