import React from 'react'
import style from './Child.module.scss'

export default function Child() {
    return (
        <div>
            <ul>
                <li className={style.item}>c111</li>
                <li className={style.item}>c2222</li>
            </ul>
        </div>
    )
}
