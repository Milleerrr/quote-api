const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.get('/api/quotes/random', (req, res) => {
    const randomQuote = getRandomElement(quotes);
    res.status(200).send({
        quote: randomQuote
    });
});

app.get('/api/quotes', (req, res) => {
    if (req.query.person !== undefined) {
        const quotesByPerson = quotes.filter(quote => quote.person === req.query.person);
        res.send({
            quotes: quotesByPerson
        })
    } else {
        res.send({
            quotes: quotes 
        })
    }
});

app.post('/api/quotes', (req, res) => {
    const queryQuote = req.query.quote;
    const queryPerson = req.query.person;

    if (queryQuote !== undefined && queryPerson !== undefined) {
        const newQuoteObject = {
            quote: queryQuote,
            person: queryPerson
        };
        quotes.push(newQuoteObject);
        res.send({
            quote : newQuoteObject
        });
    } else {
        res.status(400).send();
    }
});

app.listen(PORT, () => {
    console.log(`Server listening on Port ${PORT}.`);
})