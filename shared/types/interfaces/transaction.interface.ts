export interface ITransactionEntity {
    id?: string;
    amount: number;
    description: string;
    type: number;
    idAccount: string;
    balance: number;
}