import IAccounts from "@/shared/types/interfaces/account.interface";
import { Card, Metric, Text } from "@tremor/react";
import { useEffect } from "react";

interface IProps {
  data: IAccounts[];
}

export default function AccountBalance({ data }: IProps) {

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5 mb-5">
      {data.map((account) => (
        <Card key={account._id} decoration="top" decorationColor="indigo">
          <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content"> {account.name} </p>
          <p className="text-3xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
            {" "}
            {account.currency === "USD" ? "$" : account.currency === "EUR" && "€"}
            {account.balance}{" "}
          </p>
        </Card>
      ))}
    </div>
  );
}
