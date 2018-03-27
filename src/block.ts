

export default class Block {
    public index: number;
    public previousHash: String;
    public hash: String;
    public nonce: number;
    public transactions: String[];

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

    addTransaction(transaction: String): void {
        this.transactions.push(transaction);
    }
}