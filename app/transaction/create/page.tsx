"use client";

import getAccounts from "@/api/accounts/getAccounts";
import getCategories from "@/api/categories/getCategories";
import postTransaction from "@/api/transactions/postTransaction";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { useQuery } from "@tanstack/react-query";
import { DatePicker, NumberInput, Select, SelectItem, TextInput } from "@tremor/react";
import { useForm, Controller } from "react-hook-form";
import { SearchSelect, SearchSelectItem } from "@tremor/react";
import { useEffect, useState } from "react";

export default function CreateMovement() {
  const [categories, setCategories] = useState<null | Array<Record<string, string>>>(null);
  const [accountBalance, setAccountBalance] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm();

  const values = watch();

  // Fetch accounts
  const { data: accountsData, isLoading, refetch: refetchAccount } = useQuery(["accounts"], async () => {
    const response = await getAccounts();

    return response;
  });

  // Fetch categories
  const { data: categoriesData, isLoading: isLoadingCategories } = useQuery(["categories"], async () => {
    const response = await getCategories();

    return response.data;
  });

  function getAllValuesWithKeyNumbers(obj: any, prefix = ""): any {
    const results = [];

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        const currentKey = prefix ? `${prefix}.${key}` : key; // Combine key numbers

        if (typeof value === "object") {
          results.push(...getAllValuesWithKeyNumbers(value, currentKey));
        } else {
          results.push({ [currentKey]: value }); // Create object with key and value
        }
      }
    }

    return results;
  }

  useEffect(() => {
    if ((values !== null || values !== "") && values.type) {
      const filterByType = categoriesData.find((item: any) => item.type == values.type);
      const arrayWithCategories = getAllValuesWithKeyNumbers(filterByType.categories);
      setCategories(arrayWithCategories);
    }

    if (values.idAccount || values.idAccount != undefined) {
      const account = accountsData.data.find((account: any) => account._id === values.idAccount);
      setAccountBalance(account.balance);
    }
  }, [values.type, values.idAccount, accountsData]);

  // Handle submit
  const onSubmit = async (data: any) => {
    const response = await postTransaction({ data });
    refetchAccount();
  };

  return (
    <div className="mx-auto max-w-270">
      <Breadcrumb pageName="Create transaction" />
      <div className="col-span-5 xl:col-span-3">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="p-7">
            <form
              onSubmit={handleSubmit((data: any) => {
                onSubmit(data);
              })}
            >
              <div className="mb-5.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="fullName">
                  Account
                </label>
                <Controller
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: "This value is required.",
                    },
                  }}
                  name="idAccount"
                  render={({ field: { ...field } }) => (
                    <Select {...field}>
                      {!isLoading &&
                        accountsData.data.map((account: any, i: number) => (
                          <SelectItem value={account._id} key={i}>
                            {account.name} - {account?.IBAN} (Currency: {account.currency})
                          </SelectItem>
                        ))}
                    </Select>
                  )}
                />
                {errors?.idAccount && <span>{!errors?.idAccount?.message}</span>}
                {accountBalance && <span>Balance: {accountBalance}</span>}
              </div>

              <div className="mb-5.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="type">
                  Type
                </label>
                <Controller
                  control={control}
                  name="type"
                  rules={{
                    required: {
                      value: true,
                      message: "This value is required.",
                    },
                  }}
                  render={({ field: { ref, ...field } }) => (
                    <Select {...field}>
                      <SelectItem value="0">Egress</SelectItem>
                      <SelectItem value="1">Income</SelectItem>
                    </Select>
                  )}
                />
                {errors?.type && <span>{!errors?.type?.message}</span>}
              </div>

              <div className="mb-5.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="phoneNumber">
                  Category
                </label>
                <Controller
                  control={control}
                  name="categorie"
                  rules={{
                    required: {
                      value: true,
                      message: "This value is required.",
                    },
                  }}
                  render={({ field: { ref, ...field } }) => (
                    <SearchSelect {...field}>
                      {categories ? (
                        categories.map((categories: Record<string, string>, i: number) => (
                          <SearchSelectItem key={i} value={Object.keys(categories)[0]}>
                            {Object.keys(categories)[0]} - {Object.values(categories)}
                          </SearchSelectItem>
                        ))
                      ) : (
                        <span>Please select a type of transaction</span>
                      )}
                    </SearchSelect>
                  )}
                />
                {errors?.category && <span>{!errors?.category?.message}</span>}
              </div>

              <div className="mb-5.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="phoneNumber">
                  Amount
                </label>
                <NumberInput
                  {...register("amount", { required: { value: true, message: "This value is required" } })}
                  enableStepper={false}
                  placeholder="Ej: 500"
                  step="any"
                />
                {errors?.amount && <span>{!errors?.amount?.message}</span>}
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
                {errors?.description && <span>{!errors?.description?.message}</span>}
              </div>

              <div className="mb-5.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="phoneNumber">
                  Date
                </label>
                <Controller
                  control={control}
                  name="date"
                  rules={{
                    required: {
                      value: true,
                      message: "This value is required.",
                    },
                  }}
                  render={({ field: { onChange } }) => (
                    <DatePicker
                      onValueChange={(value: any) => {
                        onChange(value);
                      }}
                      enableYearNavigation={true}
                      enableClear={true}
                    />
                  )}
                />
                {errors?.date && <span>{!errors?.date?.message}</span>}
              </div>

              <div className="flex justify-end gap-4.5">
                <button
                  className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                  onClick={() => {
                    console.log("cancelado");
                  }}
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
