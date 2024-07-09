const express = require('express');
const cors = require('cors');

const app = express();

const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://admin:qwe123@team4.nbe8an3.mongodb.net/?retryWrites=true&w=majority&appName=team4")

const User = require('./models/User');
const Board = require('./models/Board')

const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(cookieParser());
app.use(express.json());

app.listen(9000, () => {
    console.log('9000 서버가 작동되고 있습니다.');
})

// 회원가입
app.post('/register', async (req, res) => {
    const { youName, youEmail, youPass } = req.body;

    try {
        const userInfo = await User.create({
            youName,
            youEmail,
            youPass: bcrypt.hashSync(youPass, salt)
        })
        res.status(200).json(userInfo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// 로그인
app.post('/login', async (req, res) => {
    const { youEmail, youPass } = req.body;

    try {
        // 이메일 검사
        const userInfo = await User.findOne({ youEmail });
        if (!userInfo) {
            return res.status(400).json({ message: '이메일 또는 비밀번호가 정확하지 않습니다.' });
        }

        // 비밀번호 검사
        const isPassValid = bcrypt.compareSync(youPass, userInfo.youPass);
        if (!isPassValid) {
            return res.status(400).json({ message: '이메일 또는 비밀번호가 정확하지 않습니다.' });
        }

        // 로그인(토근 발행)
        jwt.sign(
            { youName: userInfo.youName, youEmail, id: userInfo._id },
            secret,
            { expiresIn: '1d' },
            (err, token) => {
                if (err) {
                    return res.status(500).json({ message: err.message });
                }
                // 발행한 토큰을 쿠키에 저장
                res.cookie('token', token, { httpOnly: true, secure: true }).json({
                    id: userInfo._id,
                    youName: userInfo.youName,
                    youEmail,
                    token
                });
            }
        )
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

// 로그인 확인 
app.get('/profile', (req, res) => {
    const { token } = req.cookies;

    // 토근 값 유효성 확인
    jwt.verify(token, secret, (err, info) => {
        if (err) {
            return res.json({ message: '토근 검증 실패, 관리자에게 문의하세요!' });
        }
        res.json(info);
    })
});

// 게시글 작성
app.post("/board", (req, res) => {
    const { boardTitle, boardConts } = req.body;
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "로그인을 하지 않았습니다." });
    }

    jwt.verify(token, secret, async (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "유효한 토큰이 아닙니다." });
        }

        try {
            const boardInfo = await Board.create({
                boardTitle,
                boardConts,
                boardAuthor: decoded.id,
                boardViews: 0,
            })
            res.status(200).json({ boardInfo })
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    })
});

// 게시글 목록
app.get("/board", async (req, res) => {
    try {
        const boardInfo = await Board.find().populate('boardAuthor', 'youName').sort({ createdAt: -1 });
        res.status(200).json(boardInfo);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

// 게시글 보기 & 조회수 증가
app.get("/board/:id", async (req, res) => {
    try {
        const boardId = req.params.id;

        // 게시글 정보 가져오기 및 조회수 증가
        const boardInfo = await Board.findByIdAndUpdate(
            boardId,
            { $inc: { boardViews: 1 } },
            { new: true }
        ).populate('boardAuthor', 'youName');

        if (!boardInfo) {
            return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
        }

        res.status(200).json(boardInfo);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// 게시글 삭제 
app.delete("/board/:id", (req, res) => {
    const { id } = req.params;
    const token = req.cookies.token;

    if (!token) {
        return res.status(500).json({ message: "로그인을 하지 않았습니다!" })
    };

    jwt.verify(token, secret, async (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "유효하지 않은 토큰입니다." });
        }

        try {
            const boardInfo = await Board.findById(id);
            if (!boardInfo) {
                return res.status(400).json({ message: "게시물을 찾을 수 없습니다." });
            }
            if (boardInfo.boardAuthor == decoded.id) {
                return res.status(400).json({ message: "삭제 권한이 없습니다." });
            }

            await Board.findByIdAndDelete(id);
            return res.status(400).json({ message: "게시물이 삭제되었습니다." });

        } catch (err) {
            return res.status(400).json({ message: "유효하지 않은 토큰입니다." });
        }
    })

})

// 게시글 수정

app.put("/board/:id", (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "로그인을 하지 않았습니다." });
    }

    jwt.verify(token, secret, async (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "유효하지 않은 토큰입니다." });
        }

        try {
            const boardInfo = await Board.findById(id);
            if (!boardInfo) {
                return res.status(400).json({ message: "게시물을 찾을 수 없습니다." });
            }

            if (boardInfo.boardAuthor !== decoded.id) {
                return res.status(403).json({ message: "삭제 권한이 없습니다." });
            }

            boardInfo.boardTitle = title
            boardInfo.boardConts = content;
            await boardInfo.save();

            return res.status(200).json({ message: "게시물이 수정되었습니다." });

        } catch (err) {
            return res.status(400).json({ message: err.message })
        }
    });
})

// 로그아웃
app.post('/logout', (req, res) => {
    res.cookie('token', { path: "/" }).json({ message: '로그아웃 성공' });
})