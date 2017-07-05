 import React from 'react';
 import PubSub from 'pubsub-js'
 import Paper from 'material-ui/Paper';
 import ReactEcharts from 'echarts-for-react';
 import {Card, CardActions, CardHeader,CardTitle, CardText} from 'material-ui/Card';


class MoreInfo extends React.Component {
	constructor(props){
		super(props);
    this.state = {datas:[],content:[]};
}


/*setOption = (datas) => {
var option = ; 
    console.log("inSO");
    console.log(datas);
    option.series.data = datas;
    console.log(option);
    return option;
}*/


componentWillMount = () =>{
	PubSub.publish('infomations',1);
    fetch('/datainfo.json')
    .then(response => response.json())
    .then(result =>{
        var content = result.pop();
        this.setState({datas:result,content:content});})
    .catch(e => console.log("Oops, error", e))
}

render(){
        //var option233 = this.setOption(this.state.datas);

return(
<div style={{paddingTop:'64px'}}>
    <Card style={{width:'100%'}} zDepth={1}>
    <CardTitle title={this.state.content.title} subtitle={this.state.content.type}/>
    <CardText>{this.state.content.content}</CardText>
    <div style={{height:'50%'}}>
    <ReactEcharts option={{
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        x: 'left',
        data:['薪资待遇','工作氛围','休假时间','配套补贴']
    },
    series: [
        {
            name:'综合评价',
            type:'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data:this.state.datas
        }
    ]
    }}/>
    </div>
    </Card>
</div>
		)
	}
}

export default MoreInfo;