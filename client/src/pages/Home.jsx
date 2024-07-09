import React, { useState } from 'react'
import banner from '../assets/img/img1.png'
import { Link } from 'react-router-dom'
import { useData } from '../context/DataContext'

const Home = () => {
    const data = useData();

    // 초기 표시 항목 수를 20개로 설정
    const [visibleCount, setVisibleCount] = useState(4);
    const [selectedRegion, setSelectedRegion] = useState('');

    // 더보기 버튼 클릭 시 호출되는 함수
    const loadMore = () => {
        setVisibleCount(prevCount => prevCount + 20);
    };

    // 지역 선택 변경 시 호출되는 함수
    const handleRegionChange = (event) => {
        setSelectedRegion(event.target.value);
        setVisibleCount(4); // 필터 변경 시 표시 항목 수 초기화
    };

    // 현재 표시할 데이터 슬라이스 및 필터링
    const filteredData = selectedRegion
        ? data.filter(item => item.address.includes(selectedRegion))
        : data;

    const displayData = filteredData.slice(0, visibleCount);
    return (
        <div className='home__inner'>
            <div className='home__banner'>
                <img src={banner} alt="배너1" />
            </div>
            <div className="home__title">
                <span>안녕하세요,</span>
                <p>국리니 닷컴에 오신것을 환영합니다.</p>
            </div>
            <div className='home__box'>
                <div className="box1">
                    <span>비즈니스의 성공을 위한 학습을 지금 시작해보세요</span>
                </div>
                <div className="box2">
                    <span>비즈니스의 성공을 위한 학습을 지금 시작해보세요</span>
                </div>
            </div>
            <div className="home__box__school">
                <h2>
                    <em>마감임박</em> 현재 진행중인 교육
                </h2>
                <div className='box__inner'>
                    {displayData.map((item, index) => (
                        <div className="box" key={index}>
                            <Link to={'/test'}>
                                <div className='box__banner1'>
                                </div>
                                <div className='box__title'>
                                    <span className='line-one'>{item.title}</span>
                                    <p>{item.sub}</p>
                                    <p>{item.address}</p>
                                    <p>{item.StartDate} ~ {item.EndDate}</p>
                                </div>
                            </Link >
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Home
