import React, { useEffect, useRef, useState } from 'react'
import { Card, Col, Row, List, Avatar, Drawer } from 'antd';
import { EditOutlined, EllipsisOutlined, PieChartOutlined } from '@ant-design/icons';
import * as Echarts from 'echarts'

const { Meta } = Card;
export default function Home() {

    const [visible, setvisible] = useState(false);
    const pieRef = useRef()

    useEffect(() => {
        var myChart = Echarts.init(document.getElementById('main'));

        // 指定图表的配置项和数据
        var option = {
            title: {
                text: '新闻浏览量图示'
            },
            tooltip: {},
            legend: {
                data: ['数量']
            },
            xAxis: {
                data: ['生活理财', '科学技术', '军事世界', '世界体育', '环球经济', '时事新闻']
            },
            yAxis: {},
            series: [
                {
                    name: '数量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 12, 20]
                }
            ]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }, [])

    const renderPieView = (obj) => {
        var myChart = Echarts.init(pieRef.current);
        var option;

        option = {
            title: {
                text: '当前用户新闻分类图示',
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left'
            },
            series: [
                {
                    name: 'Access From',
                    type: 'pie',
                    radius: '50%',
                    data: [
                        { value: 1048, name: '军事世界' },
                        { value: 735, name: '时事新闻' },
                        { value: 580, name: '科学技术' },
                        { value: 484, name: '环球经济' },
                        { value: 300, name: '世界体育' },
                        { value: 200, name: '生活理财' },
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        option && myChart.setOption(option);
    }

    useEffect(() => {
        var chartDom = document.getElementById('pikg');
        var myChart = Echarts.init(chartDom);
        var option;

        option = {
            title: {
                text: '新闻关注数量'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {},
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                boundaryGap: [0, 0.01]
            },
            yAxis: {
                type: 'category',
                data: ['生活理财', '世界体育', '环球经济', '科学技术', '时事新闻', '军事世界']
            },
            series: [
                {
                    name: '2021',
                    type: 'bar',
                    data: [78203, 83489, 159034, 204970, 261744, 410230]
                },
                {
                    name: '2022',
                    type: 'bar',
                    data: [109325, 163438, 201000, 251594, 334141, 511807]
                }
            ]
        };

        option && myChart.setOption(option);

    },[])
    
    return (
        <div className="site-card-wrapper">
            <Row gutter={16}>
                <Col span={8}>
                    <Card title="用户最常浏览" bordered={true}>
                        <List
                            size="small"
                            // bordered
                            dataSource={["军事新闻", "科学新闻", "美食节目", "综艺节目", "亮剑电视剧", "海贼王动漫"
                                , "爱情三角猫", "教育节目", "学习课堂"]}
                            renderItem={item => <List.Item>{item}</List.Item>}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="用户点赞最多" bordered={true}>
                        <List
                            size="small"
                            // bordered
                            dataSource={["军事新闻", "美食节目", "海贼王动漫", "综艺节目", "科学新闻", "爱情三角猫"
                                , "亮剑电视剧", "学习课堂", "教育节目"]}
                            renderItem={item => <List.Item>{item}</List.Item>}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card
                        style={{ width: 300 }}
                        cover={
                            <img
                                alt="example"
                                src="https://img1.baidu.com/it/u=356398229,1259493806&fm=253&fmt=auto&app=138&f=JPEG?w=501&h=500"
                            />
                        }
                        actions={[
                            <PieChartOutlined key="setting" onClick={() => {
                                setTimeout(() => {  //设置定时器
                                    setvisible(true) //打开抽屉

                                    renderPieView() //init初始化
                                }, 0);
                            }} />,
                            <EditOutlined key="edit" />,
                            <EllipsisOutlined key="ellipsis" />,
                        ]}
                    >
                        <Meta
                            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                            title="Moira"
                            description="人生就是手脚快的人赢啊，只是傻傻看着，就什么也得不到哦!"
                        />
                    </Card>
                </Col>
            </Row>

            <Drawer width="500px" title="个人新闻分类" placement="right"
                onClose={() => { setvisible(false) }} visible={visible}>
                <div ref={pieRef} style={{ width: "100%", height: "400px", marginTop: "50px" }}></div>
            </Drawer>

            {/* 为 ECharts 准备一个定义了宽高的 DOM  */}
            <div id="main" style={{ width: "40%", height: "400px", marginTop: "40px", float: "right", marginRight: "80px" }}></div>
            <div id="pikg" style={{ width: "40%", height: "400px", marginTop: "30px" }}></div>
        </div>
    )
}
