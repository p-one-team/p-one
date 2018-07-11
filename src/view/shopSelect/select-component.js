import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import style from './select.less'
import { NavBar, Icon, Tabs } from 'antd-mobile';


@CSSModules(style)
class SelectComponent extends Component {
	constructor(props) {
        super(props)
        
        this.state = {
            tabs: [
                {title: "稀有度"},
                {title: "品质"},
                {title: "种类"},
                {title: "英雄"}
            ]

        }
    }

    tabContent = (attributeId,list) => {
        const self = this
        if(list){
            return (<div className="list-item">
                <span onClick={()=>self.props.chooseAttribute(this.props.selectEnter,attributeId,"")}>不限</span>
                {list.map((item,index) => (
                    <span key={index} onClick={()=>self.props.chooseAttribute(this.props.selectEnter,attributeId,item)}>{item}</span>
                ))}
            </div>)
        }else{
            return ""
        }
    }
    
	render() {
		return (
			<div styleName="wrap">
				<NavBar
					mode="dark"
					icon={<Icon type="left" />}
					onLeftClick={() => this.props.history.goBack()}
				>求购商品属性筛选</NavBar>

                <Tabs tabs={this.state.tabs}
                    initalPage={0}
                    tabBarPosition="left"
                    tabDirection="vertical"
                >
                    <div>
                        {this.tabContent(1,this.props.prodAttribute.RarityList)}
                    </div>

                    <div>
                        {this.tabContent(2,this.props.prodAttribute.QualityList)}
                    </div>

                    <div>
                        {this.tabContent(3,this.props.prodAttribute.TypeList)}
                    </div>

                    <div>
                        {this.tabContent(4,this.props.prodAttribute.HeroList)}
                    </div>
                </Tabs>
			</div>
		)
	}
}

SelectComponent.propTypes = {
	goItemDetail: PropTypes.func,
}

export default SelectComponent