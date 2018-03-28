import axios from 'axios';
import * as assert from 'assert';

root()
    .then(function(d): void {
        assert.equal(d, 'hello world');
        console.log("root test pass");
    })
    .catch(e => console.error(e));

let t = {'from': 'han', 'to': 'yan', 'amount': 10}
transactions(t)
    .then(function(d): void {
        assert.equal(t.to, d[0].to);
        assert.equal(t.from, d[0].from);
        assert.equal(t.amount, d[0].amount);
        console.log("transaction test pass");
    })

async function root() {
    try {
        const response = await axios.get('http://localhost:3000/').then(d => d.data);
        return response;
    } catch(error) {
        console.error(error);
    }
}


async function transactions(t) {
    
    try {
        const response = await axios.post(
                                        'http://localhost:3000/transactions',
                                        t
                                    ).then(d => d.data);
        return response;
    } catch(error) {
        console.error(error);
    }
}