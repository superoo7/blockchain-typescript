

export default class Block {
    private index: Number;
    private previousHash: String;
    private hash: String;
    private nonce: Number;
    private transactions: Number[];

    constructor() {
        this.index = 0;
        this.previousHash = '';
        this.hash = '';
        this.nonce = 0;
        this.transactions = [];
    }

    get key(): String {
        return JSON.stringify(this.transactions) + this.index + this.previousHash + this.nonce;
    }

    addTransaction(transaction: Number): void {
        this.transactions.push(transaction);
    }
}