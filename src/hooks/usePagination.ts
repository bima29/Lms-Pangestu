import { useState, useEffect } from 'react';

interface UsePaginationProps {
  data: any[];
  itemsPerPage?: number;
  key?: string;
}

export const usePagination = ({ data, itemsPerPage = 10, key = 'default' }: UsePaginationProps) => {
  const [currentPage, setCurrentPage] = useState(() => {
    const saved = localStorage.getItem(`pagination_${key}`);
    return saved ? parseInt(saved, 10) : 1;
  });

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  useEffect(() => {
    localStorage.setItem(`pagination_${key}`, currentPage.toString());
  }, [currentPage, key]);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return {
    currentData,
    currentPage,
    totalPages,
    goToPage,
    hasNext: currentPage < totalPages,
    hasPrev: currentPage > 1
  };
};