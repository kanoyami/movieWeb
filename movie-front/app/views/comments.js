import React from 'react'
import { Button, Comment, Form, Header } from 'semantic-ui-react'



export default class Comments extends React.Component {

constructor(props) {
    super(props);
    this.state={userInfo:[],data:[]};
    }


componentWillMount =()=>{
  fetch('/usersApi/userInfo?uid='+this.props.data.uid)
  .then(response => response.json())
  .then(results => {
    console.log(results);
    this.setState({userInfo:results['datas'][0],data:this.props.data})
  })
    .catch(e => console.log("Oops, error", e))

}

render(){
  return(

 <Comment>
      <Comment.Avatar src={this.state.userInfo.tumb_src} />
      <Comment.Content>
        <Comment.Author as='a'>{this.state.userInfo.email}</Comment.Author>
        <Comment.Metadata>
          <div>{this.state.data.time}</div>
        </Comment.Metadata>
        <Comment.Text>{this.state.data.comment}</Comment.Text>
      </Comment.Content>
    </Comment>

    )
}


}