

export class Block {
    private index: Number;
    private previousHash: String;
    private hash: String;
    private nonce: Number;
    private transaction: Number[];

    constructor() {
        this.index = 0;
        this.previousHash = '';
        this.hash = '';
        this.nonce = 0;
        this.transaction = [];
    }
}