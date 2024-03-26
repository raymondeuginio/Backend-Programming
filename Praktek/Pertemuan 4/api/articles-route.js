const express = require('express');

const route = express.Router();

module.exports = (app) => {
  app.use('/articles', route);
};

const articleList = [];
route.get('/', (request, response) => {
    if  (articleList.length === 0) {
        response.status(404).json({ message: 'Belom ada article yang di-post' });
    } else {
    return response.status(200).json(articleList);
    }
});

route.post('/', (request, response) => {
    const tanggal = new Date();
    const article = {
        id: request.body.id,
        author: request.body.author,
        title: request.body.title,
        content: request.body.content,
        datetime: tanggal
    };
    articleList.push(article);
    return response.status(201).json(article);
});

route.get('/:id', (req, res) => {
    const articleId = req.params.id;
    const article = articleList.find(article => article.id.toString() === articleId.toString());
    if (article) {
        res.json(article);
    } else {
        res.status(404).json({ message: 'Belom ada article dengan id' + articleId });
    }
});
    
