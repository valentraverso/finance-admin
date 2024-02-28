import { API_URL } from "@/shared/config/config"
import { ITransactionEntity } from "@/shared/types/interfaces/transaction.interface";

export default async function postTransaction({ data }: { data: ITransactionEntity }) {
    try {
        // Fetch data
        const postTransaction = await fetch(`${API_URL}/api/v1/transactions/create/one`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        // Convert fetch to json
        const postTransactionJson = await postTransaction.json();

        return postTransactionJson;
    } catch (err: any) {
        return {
            status: false,
            msg: err
        }
    }
}