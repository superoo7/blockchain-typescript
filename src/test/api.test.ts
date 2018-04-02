import axios from 'axios';
import * as assert from 'assert';

interface TransactionData {
    from: string;
    to: string;
    amount: number;
}

console.log('test');
// wait for 10 seconds for the API to setup
wait(10000);
console.log('api test started');

root()
    .then(function(d): void {
        assert.equal(d, 'hello world');
        console.log("root test pass");
    })
    .catch(e => console.error(e));

let t: TransactionData = {'from': 'han', 'to': 'yan', 'amount': 10}
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


async function transactions(t: TransactionData) {
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

function wait(ms: number) {
    const start: number = Date.now();
    let now: number = start;
    while (now - start < ms) {
      now = Date.now();
    }
}