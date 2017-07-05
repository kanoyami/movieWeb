import React from 'react'
import {Button, Card, Icon, Image } from 'semantic-ui-react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

export default class CardView extends React.Component {

constructor(props) {
    super(props);
    this.state={datas:[]};
  }
  render(){
    return(

<Card style={{display:'inline-block',margin:'5px',width:'25em'} } >
    <Image  height='235' src={this.props.data['tumb_src']} />
    <Card.Content>
      <Card.Header>
        {this.props.data['name']}
      </Card.Header>
      <Card.Description>
        {this.props.data['tiny_content']}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
    <Link to={'/home/'+this.props.data.vid}>
     <Button>wacth it!</Button>
     </Link>
    </Card.Content>
  </Card>

      )
  }

}

