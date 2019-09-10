import React, { FC, useEffect } from 'react'
import '../App.css';

const Card: FC<IClass> = ({type, count, className, Icon}) => {
    return (
        <React.Fragment>
              <div className={["info-box",className, "hover-expand-effect"].join(' ')}>
                    <div className="icon">
                    <Icon/>
                    </div>
                    <div className="content">
                        <div className="text">{type}</div>
                        <h3 className="card-title">{count}</h3>
                    </div>
                </div>
        </React.Fragment>
    )
}

export default Card

interface IClass {
    type: string
    count: number,
    className: string,
    Icon: any
}