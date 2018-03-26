

export class TransactionClass {

    constructor(private from: String, private to: String, private amount: Number) {
    }

    getFrom() {
        return this.from;
    }

    getTo() {
        return this.to;
    }

    getAmount() {
        return this.amount;
    }
}
