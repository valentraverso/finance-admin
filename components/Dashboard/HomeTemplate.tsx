"use client";
import React from "react";

import {  SimpleBar } from "@/components/Charts";
import ChatCard from "../Chat/ChatCard";
import TableOne from "../Tables/TableOne";

// without this the component renders on server and throws an error
import DataCard from "../Cards/DataCard";
import AccountBalance from "../AccountsBalance/AccountsBalance";
import { useQuery } from "@tanstack/react-query";
import getAccounts from "@/api/accounts/getAccounts";

const HomeTemplate: React.FC = () => {
  const {data: accounts, isLoading: isLoadingAccounts} = useQuery(["accounts"], async () => {
    const response = await getAccounts();

    return response.data;
  })

  return (
    <>
    {
      isLoadingAccounts ?
      <p>Loading accounts...</p>
      :
      <AccountBalance data={accounts}/>
    }
      <div className="space-y-5 py-5">
        <SimpleBar />
      </div>
    </>
  );
};

export default HomeTemplate;
