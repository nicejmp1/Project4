import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';

const Login = () => {
    const [youEmail, setYouEmail] = useState('');
    const [youPass, setYouPass] = useState('');
    const { setUserInfo } = useContext(UserContext);
    const navigate = useNavigate();

    const login = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:9000/login', {
            method: 'POST',
            body: JSON.stringify({ youEmail, youPass }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });

        // console.log(response);

        if (response.ok) {
            response.json().then(userInfo => {
                // console.log(userInfo);
                setUserInfo(userInfo);
                navigate('/');
            })
        }

    }
    return (
        <section id='login'>
            <div className='member__inner'>
                <h2>로그인</h2>
                <form onSubmit={login}>
                    <fieldset>
                        <legend className='blind'>로그인 영역</legend>
                        <div>
                            <label htmlFor="youEmail" className='blind'>이메일</label>
                            <input type="text" id='youEmail' placeholder='이메일' value={youEmail} onChange={e => setYouEmail(e.target.value)} />
                            <span className='msg'>➟ 이메일이 없습니다.</span>
                        </div>
                        <div>
                            <label htmlFor="youPass" className='blind'>이메일</label>
                            <input type="password" id='youPass' placeholder='비밀번호' value={youPass} onChange={e => setYouPass(e.target.value)} />
                            <span className='msg'>➟ 비밀번호가 틀렸습니다.</span>
                        </div>
                        <div>
                            <button>로그인</button>
                        </div>
                    </fieldset>
                </form>
            </div>
        </section>
    )
}

export default Login
