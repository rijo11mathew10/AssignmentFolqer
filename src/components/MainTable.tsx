import React from "react";
import { Alert, Spin, Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { useReports } from "./useReports"; // Import the custom hook
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface DataType {
  key: React.Key;
  year: number;
  totaljobs: number;
  salary: number;
}

interface MainTableProps {
  onRowSelect: (year: number) => void; // Function prop that takes a year
}

const columns: TableColumnsType<DataType> = [
  {
    title: "Year",
    dataIndex: "year",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.year - b.year,
  },
  {
    title: "No. Of Total Jobs",
    dataIndex: "totaljobs",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.totaljobs - b.totaljobs,
  },
  {
    title: "Salary in USD",
    dataIndex: "salary",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.salary - b.salary,
  },
];

// Keeping this function to track changes in the table sorting, pagination, etc.
const onChange: TableProps<DataType>["onChange"] = (
  pagination,
  filters,
  sorter,
  extra
) => {
  console.log("params", pagination, filters, sorter, extra);
};

const MainTable: React.FC<MainTableProps> = ({ onRowSelect }) => {
  // Use the useReports hook to fetch the report data
  const { data, error, isLoading } = useReports();

  const handleRowClick = (record: DataType) => {
    onRowSelect(record.year);
  };

  // Handle loading state
  if (isLoading) {
    return <Spin size="large" />;
  }

  // Handle error state
  if (error instanceof Error) {
    return (
      <Alert
        message="Error"
        description={error.message}
        type="error"
        showIcon
      />
    );
  }

  // Map the API data to the DataType structure for the table
  const tableData: DataType[] =
    data?.map((report: any) => ({
      key: report.year, // You can also use report.year as the key since it's unique
      year: report.year,
      totaljobs: report.totalJobs,
      salary: report.averageSalary,
    })) || [];

  const years = tableData.map((item) => item.year);
  const totalJobs = tableData.map((item) => item.totaljobs);
  const chartOptions: ApexOptions = {
    series: [
      {
        name: "Number of Jobs",
        data: totalJobs, // Use dynamic data for total jobs
      },
    ],
    chart: {
      height: 350,
      type: "line", // No error now, since it's part of the ApexOptions type
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    title: {
      text: "Jobs by Year",
      align: "left",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: years, // Use dynamic data for years
    },
  };

  return (
    <>
      <Table
        columns={columns}
        dataSource={tableData} // Use the fetched data here
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
        rowKey="year"
        onChange={onChange}
        showSorterTooltip={{ target: "sorter-icon" }}
      />

      {/* ApexCharts component */}
      <div id="chart">
        <ReactApexChart
          options={chartOptions}
          series={chartOptions.series}
          type="line"
          height={350}
        />
      </div>
    </>
  );
};

export default MainTable;
