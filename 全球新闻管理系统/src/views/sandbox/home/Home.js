import React from 'react'
import { Button } from 'antd';
import axios from 'axios'

export default function Home() {

    const ajax = ()=>{
        //取数据
        // axios.get("http://localhost:8000/posts/2").then(res=>{
        //     console.log(res.data);
        // })

        // //增加
        // axios.post("http://localhost:8000/posts/1",{
        //     title:"88888",
        //     author:"xiaoliu"
        // })

        //全部更新 put 
        // axios.post("http://localhost:8000/posts/1",{
        //     title:"88888"
        // })

        //局部更新 patch
        // axios.patch("http://localhost:8000/posts/1" ,{
        //     title:"更新11111"
        // })

        //删除 delete
        // axios.delete("http://localhost:8000/posts/3")

        //_embed 向上关联 _expand 向下关联 
        axios.get("http://localhost:8000/posts?_embed=comments").then(res=>{
            console.log(res.data);
        })
    }
    return (
        <div>
            <Button type="primary" onClick={ajax}><h5>Button</h5></Button>
        </div>
    )
}
