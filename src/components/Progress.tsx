import React, { FC, useEffect } from 'react'
import '../App.css';
import styled, { keyframes } from 'styled-components';

const Progress: FC<any> = (props) => {
    const sqSize = props.sqSize;
    const radius = (props.sqSize - props.strokeWidth) / 2;
    const viewBox = `0 0 ${sqSize} ${sqSize}`;
    const dashArray = radius * Math.PI * 2;
    const dashOffset = dashArray - dashArray * props.percentage / 100;

    const circleframes = keyframes`
    from {
      stroke-dashoffset: ${dashArray};
      }

    50% {stroke-dashoffset: ${dashOffset};}
      
    to {
      stroke-dashoffset: ${dashOffset};
      }`

      const animatedframes = keyframes`
      from {
        stroke-dashoffset: ${dashArray};
        }

      15% {stroke-dashoffset: ${dashArray};}

      75% {stroke-dashoffset: ${dashOffset-100};}

      to {
        stroke-dashoffset: ${dashOffset};
        }`

    const StyleCirlce = styled('circle')`
    stroke: #29c631;
    stroke-linecap: round;
    stroke-linejoin: round;
    transition: ${dashOffset} 10s;
    animation-play-state: running;
    -webkit-animation: ${circleframes} 10s infinite;
    animation: ${circleframes} 10s infinite;
    &:hover {
    stroke-dashoffset: ${dashArray}!important;
    -webkit-animation-play-state: paused;
    animation-play-state: paused;
    }
    }`

    const AnimatedCirlce = styled('circle')`
    stroke: #29c631;
    stroke-linecap: round;
    stroke-linejoin: round;
    transition: ${dashOffset} 10s;
    animation-play-state: running;
    -webkit-animation: ${animatedframes} 10s infinite;
    animation: ${animatedframes} 10s infinite;
    &:hover {
    stroke-dashoffset: ${dashArray}!important;
    -webkit-animation-play-state: paused;
    animation-play-state: paused;
    }
    }`

    return (
        <React.Fragment>
        <svg
        width={props.sqSize}
        height={props.sqSize}
        viewBox={viewBox}>
        <circle
        className="circle-outter"
        cx={props.sqSize / 2}
        cy={props.sqSize / 2}
        r={radius+3}
        strokeWidth={`2px`} />
        {/* <circle
          className="circle-background"
          cx={props.sqSize / 2}
          cy={props.sqSize / 2}
          r={radius}
          strokeWidth={`${props.strokeWidth}px`} /> */}
        <AnimatedCirlce
          className="circle-background"
          cx={props.sqSize / 2}
          cy={props.sqSize / 2}
          r={radius}
          strokeWidth={`5px`} 
          transform={`rotate(-90 ${props.sqSize / 2} ${props.sqSize / 2})`}
          style={{
          strokeDasharray: dashArray,
          strokeDashoffset: dashOffset
          }} />
        <StyleCirlce
          className="circle-progress"
          cx={props.sqSize / 2}
          cy={props.sqSize / 2}
          r={radius}
          strokeWidth={`${props.strokeWidth}px`}
          transform={`rotate(-90 ${props.sqSize / 2} ${props.sqSize / 2})`}
          style={{
            strokeDasharray: dashArray,
            strokeDashoffset: dashOffset
          }} />
        <text
          className="circle-text"
          id="myTimer"
          x="50%"
          y="50%"
          dy=".3em"
          textAnchor="middle">
          {`${props.percentage}%`}
        </text>
        <text
          className="circle-sidetext"
          x="50%"
          y="70%"
          dy=".3em"
          textAnchor="middle">
          {`${props.type}`}
          </text>
    </svg>
    </React.Fragment>
    )
}

export default Progress
