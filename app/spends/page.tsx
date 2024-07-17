"use client";

import getSpends from "@/api/transactions/spends/getSpends";
import { useQuery } from "@tanstack/react-query";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";

export default function Home() {
  // Fetch spends
  const { data, isLoading } = useQuery(["spends"], async () => {
    const response = await getSpends();

    return response.data;
  });

  console.log(data);

  const valueFormatter = (value: number | null) => `$ ${value}`;

  const chartSetting = {
    yAxis: [
      {
        label: "Quantity",
      },
    ],
    series: [{ dataKey: "amount", label: "Spends by months", valueFormatter }],
    height: 300,
    sx: {
      [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
        transform: "translateX(-10px)",
      },
    },
  };
  return (
    isLoading ||
    (data !== undefined && (
      <div>
        <BarChart
          dataset={data}
          xAxis={[{ scaleType: "band", dataKey: "month", tickPlacement: "middle", tickLabelPlacement: "middle" }]}
          {...chartSetting}
        />
        
      </div>
    ))
  );
}
