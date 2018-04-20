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
        team1: {
            name: "LDG",
            icon: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524217866821&di=05b8bec97c5c389eb61e8489e7cff0e6&imgtype=0&src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20160826%2F33eeaffa10474fd0a852ded77ab5de04_th.jpg"
        },
        team2: {
            name: "EHOME",
            icon: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524812329&di=541821e4fec802ad0e5bfa0fe06ad7e9&imgtype=jpg&er=1&src=http%3A%2F%2Fdota2.wanmei.com%2Fresources%2Fpng%2F150113%2F10251421135707960.png"
        },
        gameName: "TI8 BO3",
        gameId: "A123123123",
        gameStatus: "03", //01未开始可预测 02进行中 03可预测
        gameTime: "2小时前",
        detailList: [
            {
                index: 1,
                title: '猜输赢',
                Odds: {
                    teamL: 0.25,
                    teamR: 3.65
                },
                status: "02", //01未开始可预测 02进行中 03已结清
                winner: "",
                statusDesc: "进行中"
            },
            {
                index: 2,
                title: '10杀',
                Odds: {
                    teamL: 0.25,
                    teamR: 3.65
                },
                status: "03", //01未开始可预测 02进行中 03已结清
                winner: "1",
                statusDesc: "已结清"
            },
        ]
    },
    {
        team1: {
            name: "NewBee",
            icon: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524218552147&di=118616052982412454c49e4cbc71329f&imgtype=0&src=http%3A%2F%2Fimg1.gtimg.com%2Fsports%2Fpics%2Fhv1%2F222%2F171%2F2062%2F134125377.png"
        },
        team2: {
            name: "Team Secret",
            icon: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524218189225&di=f1de64cc92deb129094d0108614971c2&imgtype=0&src=http%3A%2F%2Fimg1.178.com%2Fdota2%2F201509%2F237526343764%2F237526403037.jpg"
        },
        gameName: 'TI8 BO3',
        gameId: "B123123123",
        gameStatus: "02", //01未开始可预测 02进行中 03可预测
        gameTime: "47分钟前",
        detailList: [
            {
                index: 1,
                title: '猜输赢',
                Odds: {
                    teamL: 0.25,
                    teamR: 3.65
                },
                status: "01", //01未开始可预测 02进行中 03已结清
                winner: "",
                statusDesc: "可预测"
            },
            {
                index: 2,
                title: '10杀',
                Odds: {
                    teamL: 0.25,
                    teamR: 3.65
                },
                status: "02", //01未开始可预测 02进行中 03已结清
                winner: "",
                statusDesc: "进行中"
            },
        ]
    },
    {
        team1: {
            name: "Invictus Gaming",
            icon: "https://gss0.bdstatic.com/94o3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike92%2C5%2C5%2C92%2C30/sign=5a659521b1de9c82b268f1dd0de8eb6f/f9198618367adab482d06a5b89d4b31c8701e4a2.jpg"
        },
        team2: {
            name: "CDEC Gaming",
            icon: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524218734244&di=fd887c72be7e077fd42715aed03f0b8b&imgtype=0&src=http%3A%2F%2Fimg.sgamer.com%2Fdota2_sgamer_com%2Fimages%2F20151008%2F3835eef3280ba9c2a99f0706cf4a7e2c.jpg"
        },
        gameName: 'TI8 BO3',
        gameId: "C123123123",
        gameStatus: "01", //01未开始可预测 02进行中 03可预测
        gameTime: "3小时后",
        detailList: [
            {
                index: 1,
                title: '猜输赢',
                Odds: {
                    teamL: 0.25,
                    teamR: 3.65
                },
                status: "01", //01未开始可预测 02进行中 03已结清
                winner: "",
                statusDesc: "可预测"
            },
            {
                index: 2,
                title: '10杀',
                Odds: {
                    teamL: 0.25,
                    teamR: 3.65
                },
                status: "03", //01未开始可预测 02进行中 03已结清
                winner: "2",
                statusDesc: "已结清"
            },
        ]
    },
];

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

        // console.log(style)

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

    buildList(list) {
        let listItem;
        listItem = list.map((item) => {

            let titleStyle;
            let statusColor;
            let winLogoL;
            let winLogoR;

            switch (item.status) {
                case "01":
                    titleStyle = style.blackTitle;
                    statusColor = style.blackWord;
                    break;
                case "02":
                    titleStyle = style.redTitle;
                    statusColor = style.blackWord;
                    break;
                case "03":
                    titleStyle = style.greyTitle;
                    statusColor = style.greyWord;
                    break;
                default:
                    titleStyle = style.greyTitle;
                    statusColor = style.greyWord;
                    break;
            }

            if (item.status == "03") {

                if (item.winner == "1") {
                    winLogoL = style.winLogo1;
                    winLogoR = style.hide;
                } else if (item.winner == "2") {
                    winLogoL = style.hide;
                    winLogoR = style.winLogo2;
                } else {
                    winLogoL = style.hide;
                    winLogoR = style.hide;
                }

            } else {
                winLogoL = style.hide;
                winLogoR = style.hide;
            }

            return (
                <div key={item.index} className={style.oddItem} onClick={()=>this.props.goPage('match-detail')}>
                    <div className={style.oddValue}>
                        <p>{item.Odds.teamL}</p>
                        <p>赔率</p>
                        <div className={winLogoL}>胜</div>
                    </div>
                    <div className={style.oddDesc}>
                        <div className={titleStyle}>{item.title}</div>
                        <p className={statusColor}>{item.statusDesc}</p>
                    </div>
                    <div className={style.oddValue}>
                        <p>{item.Odds.teamR}</p>
                        <p>赔率</p>
                        <div className={winLogoR}>胜</div>
                    </div>
                </div>
            )
        })
        return (<div>{listItem}</div>)
    }

    render() {
        // const separator = (sectionID, rowID) => (
        //     <div
        //         key={`${sectionID}-${rowID}`}
        //         style={{
        //             backgroundColor: '#F5F5F9',
        //             height: 8,
        //             borderTop: '1px solid #ECECED',
        //             borderBottom: '1px solid #ECECED',
        //         }}
        //     />

        // );
        let index = data.length - 1;
        const row_head = (rowData, sectionID, rowID) => {
            if (index < 0) {
                index = data.length - 1;
            }
            const obj = data[index--];
            // console.log(obj)

            let statusDes;
            let statusColor;
            switch (obj.gameStatus) {
                case "01":
                    statusDes = "可预测"
                    statusColor = "black"
                    break;
                case "02":
                    statusDes = "进行中"
                    statusColor = "orange"
                    break;
                case "03":
                    statusDes = "可预测"
                    statusColor = "orange"
                    break;
                default:
                    statusDes = "可预测"
                    statusColor = "black"
                    break;
            }

            return (
                <div key={rowID} className={style.matchItem}>

                    <div className={style.content}>

                        <div className={style.itemL + " " + style.itemImg}>
                            <img src={obj.team1.icon} alt="" />
                            <div>{obj.team1.name}</div>
                        </div>
                        <div className={style.descript}>
                            <p>{obj.gameName}</p>
                            <p className={statusColor == "black" ? style.blackBg : style.redBg}>{statusDes}</p>
                            <p className={statusColor == "black" ? style.blackWord : style.greyWord}>{obj.gameTime}</p>
                        </div>
                        <div className={style.itemR + " " + style.itemImg}>
                            <img src={obj.team2.icon} alt="" />
                            <div>{obj.team2.name}</div>
                        </div>
                    </div>
                </div>
            );
        };
        const row = (rowData, sectionID, rowID) => {

            if (index < 0) {
                index = data.length - 1;
            }
            const obj = data[index--];


            return (
                <div key={`${sectionID}-${rowID}`} className={style.listItem}>
                    <Accordion accordion openAnimation={{}} className="my-accordion" onChange={this.onChange}>
                        <Accordion.Panel header={row_head()}>
                            <List className="my-list">
                                {this.buildList(obj.detailList)}
                            </List>
                        </Accordion.Panel>
                    </Accordion>
                </div>
            )
        };
        // console.log(this.state.dataSource)
        return (
            <ListView
                ref={el => this.lv = el}
                dataSource={this.state.dataSource}
                // renderHeader={() => <span>header</span>}
                renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
                    {this.state.isLoading ? 'Loading...' : 'Loaded'}
                </div>)}
                renderRow={row}
                // renderSeparator={separator}
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