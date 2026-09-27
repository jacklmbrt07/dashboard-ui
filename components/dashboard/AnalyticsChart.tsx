"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import data from "@/data/analytics";

const AnalyticsChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Analytics for this Year</CardTitle>
        <CardDescription>Views Per Month</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full" style={{ height: "300px" }}>
          <ResponsiveContainer>
            <LineChart width={1100} height={300} data={data}>
              <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalyticsChart;
