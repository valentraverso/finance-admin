"use client";

import getAccounts from "@/api/accounts/getAccounts";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { ITransactionEntity } from "@/shared/types/interfaces/transaction.interface";
import { useQuery } from "@tanstack/react-query";
import { DatePicker, NumberInput, Select, SelectItem, TextInput } from "@tremor/react";
import { useForm, SubmitHandler } from "react-hook-form";

export default function CreateMovement() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Fetch accounts
  const { data: accountsData, isLoading } = useQuery(["accounts"], async () => {
    const response = await getAccounts();

    return response;
  });

  // Handle submit
  const onSubmit: SubmitHandler<ITransactionEntity> = (data) => {};

  return (
    <div className="mx-auto max-w-270">
      <Breadcrumb pageName="Create transaction" />

      <div className="col-span-5 xl:col-span-3">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="p-7">
            <form onSubmit={() => handleSubmit(onSubmit)}>
              <div className="mb-5.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="fullName">
                  Account
                </label>
                <Select {...register("accountId", { required: { value: true, message: "This value is required." } })}>
                  {!isLoading &&
                    accountsData.data.map((account: any, i: number) => (
                      <SelectItem value={account._id} key={i}>
                        {account.name} - {account?.IBAN} (Currency: {account.currency})
                      </SelectItem>
                    ))}
                </Select>
              </div>

              <div className="mb-5.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="phoneNumber">
                  Type
                </label>
                <Select
                  {...register("type", { required: { value: true, message: "This value is required" } })}
                  required
                >
                  <SelectItem value="0">Egress</SelectItem>
                  <SelectItem value="1">Income</SelectItem>
                </Select>
              </div>

              <div className="mb-5.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="phoneNumber">
                  Category
                </label>
                <NumberInput
                  {...register("category", { required: { value: true, message: "This value is required." }, max: 50 })}
                  enableStepper={false}
                  placeholder="Ej: 1.2"
                />
              </div>

              <div className="mb-5.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="phoneNumber">
                  Amount
                </label>
                <NumberInput
                  {...register("amount", { required: { value: true, message: "This value is required" } })}
                  enableStepper={false}
                  placeholder="Ej: 500"
                />
              </div>

              <div className="mb-5.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="phoneNumber">
                  Description
                </label>
                <TextInput
                  {...register("description", {
                    required: { value: true, message: "This value is requied" },
                    maxLength: { value: 100, message: "Allowed only 100 characters." },
                  })}
                  placeholder="Ej: Buy coffee"
                />
              </div>

              <div className="mb-5.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="phoneNumber">
                  Date
                </label>
                <DatePicker
                  {...register("date", { required: { value: true, message: "This value is required." } })}
                  enableYearNavigation={true}
                  enableClear={true}
                />
              </div>

              <div className="flex justify-end gap-4.5">
                <button
                  className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                  type="submit"
                >
                  Cancel
                </button>
                <button
                  className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-95"
                  type="submit"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
