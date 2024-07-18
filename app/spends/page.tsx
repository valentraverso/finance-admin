"use client";

import getSpends from "@/api/transactions/spends/getSpends";
import { useQuery } from "@tanstack/react-query";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { colors } from "@mui/material";

export default function Home() {
  // Fetch spends
  const { data, isLoading } = useQuery(["spends"], async () => {
    const response = await getSpends();

    return response.data;
  });

  const valueFormatter = (value: number | null) => `€ ${value}`;

  const chartSetting = {
    yAxis: [
      {
        label: "",
        colors: ["red"]
      },
    ],
    series: [{ dataKey: "amount", label: "Spends by months", valueFormatter, colors: ["red"] }],
    height: 300,
    sx: {
      [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
        transform: "translate(-20px, 0)",
      },
    },
  };
  return (
    isLoading ||
    (data !== undefined && (
      <div>
        <BarChart
          dataset={data}
          xAxis={[{ scaleType: "band", dataKey: "month", tickPlacement: "extremities", tickLabelPlacement: "middle" }]}
          {...chartSetting}
        />
      </div>
    ))
  );
}
