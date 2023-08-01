const sequelize = require('../config/db');
const { Post, User, Comment } = require('../models');
const router = require('express').Router();
router.get('/', (req, res) => {
    console.log(req.session.loggedIn);
    Post.findAll({
            attributes: [
                'id',
                'title',
                'description',
                'createdAt'
            ],
            include: [{
                    model: Comment,
                    attributes: ['id', 'commentText', 'postId', 'userId', 'createdAt'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        })
        .then(dbPostData => {
            console.log('here');
            const posts = dbPostData.map(post => post.get({ plain: true }));
            console.log(posts, req.session.loggedIn);
            console.log('rendering homepage');
            res.render('homepage', { posts, loggedIn: req.session.loggedIn });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.get('/post/:id', (req, res) => {
    Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: [
                'id',
                'description',
                'title',
                'createdAt'
            ],
            include: [{
                    model: Comment,
                    attributes: ['id', 'commentText', 'postId', 'userId', 'createdAt'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            const post = dbPostData.get({ plain: true });
            console.log(post);
            res.render('single-post', { post, loggedIn: req.session.loggedIn });


        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});
router.get('/posts-comments', (req, res) => {
    Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: [
                'id',
                'description',
                'title',
                'createdAt'
            ],
            include: [{
                    model: Comment,
                    attributes: ['id', 'commentText', 'postId', 'userId', 'createdAt'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            const post = dbPostData.get({ plain: true });

            res.render('posts-comments', { post, loggedIn: req.session.loggedIn });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;