

export interface TransactionData {
    from: String,
    to: String,
    amount: Number
}




export default class Transaction<TransactionData>  {

    constructor(private from: String, private to: String, private amount: Number) {
    }

}
