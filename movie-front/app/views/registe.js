import React from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'


export default class Registe extends React.Component {

constructor(props) {
    super(props);
    this.state={email:'',password:'',errorLog:'',nickname:''};
    this.submitLogin = this.submitLogin.bind(this);
    }

handleEmailChange =(event)=>{
    this.setState({email: event.target.value});
  }
handlePasswordChange =(event)=>{
    this.setState({password: event.target.value});
  }
handleNicknameChange =(event)=>{
    this.setState({nickname: event.target.value});
  }

errorLog=()=>this.setState({errorLog:'password or email error'});

submitLogin = (e,callback)=>{

    fetch('/usersApi/regist', {
    method: 'POST',
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json'
    }, 
    body: JSON.stringify({email:this.state.email,password:this.state.password,nickname:this.state.nickname})
}).then((response)=>{
  return response.json();
}).then((datas)=>{
 //console.log(datas);
    if(datas['status']>=0){
      //console.log(datas);
      this.props.loginDo(datas['datas'],true);
    }else{
      console.log(datas);
    }
}).catch((err)=>{
  console.log(err);
});
  

}
render(){
  return (

  <Form widths='equal' style={{margin:'10px',textAlign:'center'}}>
    <Form.Field>
      <label>email</label>
      <input name='email' onChange={this.handleEmailChange} placeholder='email' />
    </Form.Field>
    <Form.Field  >
      <label>nickname</label>
      <input  onChange={this.handleNicknameChange} type='text' name='nickname' placeholder='Nick Name' />
    </Form.Field>
    <Form.Field  >
      <label>密码</label>
      <input id='password' onChange={this.handlePasswordChange} type='password' name='password' placeholder='password' />
    </Form.Field>
    <p style={{color:'red'}}>{this.state.errorLog}</p>
    <Button type='Button' onClick={this.submitLogin} >Submit</Button>
  </Form>

    );
}
  

}
