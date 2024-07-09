import React, { useState } from 'react'
import { useData } from '../context/DataContext';

const Academy = () => {
    const data = useData();

    return (
        <div className='academy__inner'>
            <div className='academy__list__to'>
                <div className='list__title'>
                    <span>교육기관명 | 과정제목</span>
                </div>
                <div className='list__day'>
                    <span>모집기한</span>
                </div>
                <div className='list__field'>
                    <span>분야</span>
                </div>
                <div className='list__address'>
                    <span>위치</span>
                </div>
                <div className='list__yardMan'>
                    <span>정원</span>
                </div>
                <div className='list__ncscd'>
                    <span>NCS코드</span>
                </div>
            </div>
            {data.map((item, index) => (
                <div className='academy__list__to' key={index}>
                    <div className='list__title'>
                        <p>{index + 1}</p>
                        <p>{item.sub}</p>
                        <span>{item.title}</span>
                    </div>
                    <div className='list__day'>
                        <span>{item.StartDate} ~ {item.EndDate}</span>
                    </div>
                    <div className='list__field'>
                        <span>{item.ncsTitle}</span>
                    </div>
                    <div className='list__address'>
                        <span>{item.address}</span>
                    </div>
                    <div className='list__yardMan'>
                        <span>{item.yardMan}</span>
                    </div>
                    <div className='list__ncscd'>

                    </div>
                </div>
            ))}
        </div>
    )
}

export default Academy
