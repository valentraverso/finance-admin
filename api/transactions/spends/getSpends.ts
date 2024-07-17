import { API_URL } from "@/shared/config/config";

export default async function getSpends(){
    try{
        const getSpends = await fetch(`${API_URL}/api/v1/transactions/spends/all?idChart=6626a96c7f147480e2f34751`);
        const getSpendsJson = await getSpends.json();

        return getSpendsJson;
    }catch(err: any){
        return {
            status: false,
            msg: "There was an error"
        }
    }
}