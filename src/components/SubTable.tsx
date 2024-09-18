import React, { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import type { InputRef, TableColumnsType, TableColumnType } from "antd";
import { Button, Input, Space, Table, Spin, Alert } from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";

import { useReports } from "./useReports"; // Import the custom hook for specific year

interface DataType {
  key: string;
  job_title: string;
  count: number;
  year: number; // This field is used for filtering but not for display
}

interface SubTableProps {
  year: number; // The selected year to filter the data by
}

type DataIndex = keyof DataType;

const SubTable: React.FC<SubTableProps> = ({ year }) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  // Use the useReportByYear hook to fetch data for the selected year
  const { data, error, isLoading } = useReports(year);

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): TableColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns: TableColumnsType<DataType> = [
    {
      title: "Job Title",
      dataIndex: "job_title", // This matches the backend field
      key: "job_title",
      width: "30%",
      ...getColumnSearchProps("job_title"),
    },
    {
      title: "Count",
      dataIndex: "count", // This matches the backend field
      key: "count",
      width: "20%",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.count - b.count,
    },
  ];

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

  const filteredData: DataType[] =
    data?.map((item: any) => ({
      key: item.job_title, // Use job_title as a unique key
      job_title: item.job_title,
      count: item.count,
      year: year, // Include the year for consistency
    })) || [];

  


  return (
    <>
      <Table columns={columns} dataSource={filteredData} />
      
    </>
  );
};

export default SubTable;
