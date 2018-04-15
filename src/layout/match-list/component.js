import React from 'react'
import { ListView, Accordion, List } from 'antd-mobile';
import CSSModules from 'react-css-modules'
import style from './match-list.less'


function MyBody(props) {
    return (
        <div className="am-list-body my-body">
            <span style={{ display: 'none' }}>you can custom body wrap element</span>
            {props.children}
        </div>
    );
}

const data = [
    {
        img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
        title: 'Meet hotel',
        des: '不是所有的兼职汪都需要风吹日晒',
    },
    {
        img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
        title: 'McDonald\'s invites you',
        des: '不是所有的兼职汪都需要风吹日晒',
    },
    {
        img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
        title: 'Eat the week',
        des: '不是所有的兼职汪都需要风吹日晒',
    },
];

// const data1 = [
//     {
//         teamL: { name: 'col', icon: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png' },
//         teamR: { name: 'liquid', icon: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png' },
//         title: 'Meet hotel',
//         time: '2小时前',
//         matchID: 'A11123454',
//         child_OPTS: [{ title: '猜输赢', Odds: { teamL: 0.25, teamR: 3.65 }, overdue: false, winner: null }, { title: '10杀', Odds: { teamL: 0.95, teamR: 3.65 }, overdue: false, winner: null }],
//         overdue: false
//     },
//     {
//         teamL: { name: 'LGD', icon: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png' },
//         teamR: { name: 'NB', icon: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png' },
//         title: 'Meet hotel',
//         time: '1小时前',
//         matchID: 'A1112r454',
//         child_OPTS: [{ title: '猜输赢', Odds: { teamL: 0.25, teamR: 3.65 }, overdue: true, winner: 'teamL' }, { title: '10杀', Odds: { teamL: 0.95, teamR: 3.65 }, overdue: false, winner: null }],
//         overdue: false
//     },
//     {
//         teamL: { name: 'WINGS', icon: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png' },
//         teamR: { name: 'VG', icon: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png' },
//         title: 'Meet hotel',
//         time: '1小时前',
//         matchID: 'A1112r454',
//         child_OPTS: [{ title: '猜输赢', Odds: { teamL: 0.25, teamR: 3.65 }, overdue: false, winner: 'teamL' }, { title: '10杀', Odds: { teamL: 0.95, teamR: 3.65 }, overdue: true, winner: 'teamR' }],
//         overdue: false
//     },
// ];
const NUM_ROWS = 20;
let pageIndex = 0;


// const dataBlobs = {};
// let sectionIDs = [];
// let rowIDs = [];

function genData(pIndex = 0) {
    const dataBlob = {};
    for (let i = 0; i < NUM_ROWS; i++) {
        const ii = (pIndex * NUM_ROWS) + i;
        dataBlob[`${ii}`] = `row - ${ii}`;
    }
    return dataBlob;
}


@CSSModules(style, { handleNotFoundStyleName: 'ignore' })
class MatchList extends React.Component {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        console.log(style)

        this.state = {
            dataSource,
            isLoading: true,
            height: document.documentElement.clientHeight * 3 / 4,
        };
    }

    componentDidMount() {
        // you can scroll to the specified position
        // setTimeout(() => this.lv.scrollTo(0, 120), 800);

        // simulate initial Ajax
        setTimeout(() => {
            this.rData = genData();
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                isLoading: false,
            });
        }, 600);
    }

    // If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
    // componentWillReceiveProps(nextProps) {
    //   if (nextProps.dataSource !== this.props.dataSource) {
    //     this.setState({
    //       dataSource: this.state.dataSource.cloneWithRows(nextProps.dataSource),
    //     });
    //   }
    // }


    onEndReached = (event) => {
        // load new data
        // hasMore: from backend data, indicates whether it is the last page, here is false
        if (this.state.isLoading && !this.state.hasMore) {
            return;
        }
        console.log('reach end', event);
        this.setState({ isLoading: true });
        setTimeout(() => {
            this.rData = { ...this.rData, ...genData(++pageIndex) };
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                isLoading: false,
            });
        }, 1000);
    }

    render() {
        const separator = (sectionID, rowID) => (
            <div
                key={`${sectionID}-${rowID}`}
                style={{
                    backgroundColor: '#F5F5F9',
                    height: 8,
                    borderTop: '1px solid #ECECED',
                    borderBottom: '1px solid #ECECED',
                }}
            />

        );
        let index = data.length - 1;
        const row_head = (rowData, sectionID, rowID) => {
            if (index < 0) {
                index = data.length - 1;
            }
            const obj = data[index--];
            console.log(obj)

            return (
                <div key={rowID} className={style.matchItem}>

                    <div className={style.content}>

                        <div stylename="itemL">
                            <img style={{ height: '64px', marginRight: '15px' }} src={obj.img} alt="" />
                            <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>{obj.des}</div>
                            <div><span style={{ fontSize: '30px', color: '#FF6E27' }}>{rowID}</span>¥</div>
                        </div>
                        <div className={style.descript}>
                            <p>{obj.title}</p>
                            <p></p>
                            <p></p>
                        </div>
                        <div stylename="itemR">
                            <img style={{ height: '64px', marginRight: '15px' }} src={obj.img} alt="" />
                            <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>{obj.des}</div>
                            <div><span style={{ fontSize: '30px', color: '#FF6E27' }}>{rowID}</span>¥</div>
                        </div>
                    </div>
                </div>
            );
        };
        const row = (rowData, sectionID, rowID) => (
            <div key={`${sectionID}-${rowID}`} style={{ marginTop: 10, marginBottom: 10 }}>
                <Accordion accordion openAnimation={{}} className="my-accordion" onChange={this.onChange}>
                    <Accordion.Panel header={row_head()}>
                        <List className="my-list">
                            <List.Item>content 1</List.Item>
                            <List.Item>content 2</List.Item>
                            <List.Item>content 3</List.Item>
                        </List>
                    </Accordion.Panel>
                </Accordion>
            </div>
        );
        console.log(this.state.dataSource)
        return (
            <ListView
                ref={el => this.lv = el}
                dataSource={this.state.dataSource}
                renderHeader={() => <span>header</span>}
                renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
                    {this.state.isLoading ? 'Loading...' : 'Loaded'}
                </div>)}
                renderRow={row}
                renderSeparator={separator}
                renderBodyComponent={() => <MyBody />}
                className="am-list aabbste"
                pageSize={4}
                style={{
                    height: document.documentElement.clientHeight - 75 - 80,
                    overflow: 'auto',
                    width: '100%'
                }}
                onScroll={() => { console.log('scroll'); }}
                scrollRenderAheadDistance={500}
                onEndReached={this.onEndReached}
                onEndReachedThreshold={10}
            />
        );
    }
}

export default MatchList