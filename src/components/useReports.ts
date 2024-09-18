// hooks/useReports.ts
import { useQuery } from '@tanstack/react-query';

const fetchReports = async (): Promise<any[]> => {
  const response = await fetch('https://assignment-folqer-backend.onrender.com/reports');
  if (!response.ok) {
    throw new Error('Failed to fetch reports');
  }
  return response.json();
};

const fetchReportsByYear = async (year: number): Promise<any[]> => {
  const response = await fetch(`https://assignment-folqer-backend.onrender.com/reports/${year}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch reports for year ${year}`);
  }
  return response.json();
};

export const useReports = (year?: number) => {
  return useQuery({
    queryKey: year ? ['reports', year] : ['reports'],
    queryFn: year ? () => fetchReportsByYear(year) : fetchReports,
  });
};
