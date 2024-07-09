import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [youName, setYouName] = useState('');
    const [youEmail, setYouEmail] = useState('');
    const [youPass, setYouPass] = useState('');

    const navigate = useNavigate();

    const register = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:9000/register', {
            method: 'POST',
            body: JSON.stringify({ youName, youEmail, youPass }),
            headers: { 'Content-Type': 'application/json' },
        });

        console.log(response);

        if (response.status === 200) {
            alert("회원가입 완료");
            navigate('/login');
        } else {
            alert("회원가입 실패");
        }
    }

    return (
        <section id='login'>
            <div className='member__inner'>
                <h2>회원가입</h2>
                <form onSubmit={register}>
                    <fieldset>
                        <legend className='blind'>회원가입 영역</legend>
                        <div>
                            <label htmlFor="youName" className='blind'>이름</label>
                            <input
                                type="text"
                                id='youName'
                                placeholder='이름'
                                value={youName}
                                onChange={e => setYouName(e.target.value)}
                            />
                            <span className='msg'>➟ 이름 없습니다.</span>
                        </div>
                        <div>
                            <label htmlFor="youEmail" className='blind'>이메일</label>
                            <input
                                type="email"
                                id='youEmail'
                                placeholder='이메일'
                                value={youEmail}
                                onChange={e => setYouEmail(e.target.value)}
                            />
                            <span className='msg'>➟ 이메일 틀렸습니다.</span>
                        </div>
                        <div>
                            <label htmlFor="youPass" className='blind'>비밀번호</label>
                            <input
                                type="password"
                                id='youPass'
                                placeholder='비밀번호'
                                value={youPass}
                                onChange={e => setYouPass(e.target.value)}
                            />
                            <span className='msg'>➟ 비밀번호가 틀렸습니다.</span>
                        </div>
                        <div>
                            <button>회원가입</button>
                        </div>
                    </fieldset>
                </form>
            </div>
        </section>
    )
}

export default Register
