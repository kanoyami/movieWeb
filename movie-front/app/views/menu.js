import React from 'react'
import {  Menu, Button, Header, Image, Modal} from 'semantic-ui-react'
import SearchNav from './search'
import Login from './Login.js'
import Registe from './registe.js'

export default class MenuNav extends React.Component  {

  constructor(props) {
    super(props);
    this.state = { activeItem: 'home' ,loginState:false,userInfo:[],datas:[]};
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  chengeLoginState = (data,state) =>{
    if(data){
    console.log(data);
    this.props.upload(data);
    window.localStorage.setItem('loginState',true);
    window.localStorage.setItem('token',data.token);
    window.localStorage.setItem('email',data.userinfo.email);
    this.setState({loginState:state,userInfo:data}); 
    
    }else{
    window.localStorage.setItem('loginState',false);
    this.setState({loginState:false});
  }
}

  logout=(e)=>{

    fetch('/usersApi/logout', {
    method: 'POST',
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json'
    }, 
    body: JSON.stringify({uid:this.state.userInfo['uid']})
}).then((response)=>{
  return response.json();
}).then((datas)=>{
    //console.log(datas);
     window.localStorage.clear();
    this.setState({loginState:false});
}).catch((err)=>{
  console.log(err);
});
  
  }


  render() {
    const { activeItem } = this.state.activeItem;

    return (
      <div>
        <Menu stackable >
          <Menu.Item name='大正影视' active={activeItem === 'home'} onClick={this.handleItemClick} />
          {console.log(window.localStorage.loginState)}
    {(window.localStorage.loginState)? <Menu.Menu position='right'><SearchNav style={{padding:6}}/>
    <Menu.Item>
    <p>{ window.localStorage.email}</p>
    </Menu.Item>
    <Menu.Item>
    <Button onClick={this.logout} primary>logout</Button>
    </Menu.Item>
    </Menu.Menu>:
    <Menu.Menu position='right'>
         <SearchNav style={{padding:6}}/>
         <Menu.Item>
           <Modal trigger={<Button primary>注册</Button>}>
           <Modal.Header>注册</Modal.Header>
             <Modal.Content>
               <Registe loginDo={this.chengeLoginState}/>
             </Modal.Content>
           </Modal>
         </Menu.Item>
        <Menu.Item>
         <Modal trigger={<Button>登录</Button>}>
         <Modal.Header>登录</Modal.Header>
           <Modal.Content>
             <Login loginDo={this.chengeLoginState}/>
           </Modal.Content>
         </Modal>
        </Menu.Item>
         </Menu.Menu>
       }
        </Menu>
      </div>
    )
  }
}
