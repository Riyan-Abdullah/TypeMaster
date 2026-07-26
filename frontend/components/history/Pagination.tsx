import React from 'react';
import { Button } from '@/components/ui/Button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-dark-border">
      <p className="text-xs text-secondary dark:text-dark-secondary font-medium">
        Page <span className="font-bold text-text dark:text-dark-text">{currentPage}</span> of{' '}
        <span className="font-bold text-text dark:text-dark-text">{totalPages}</span>
      </p>

      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          leftIcon={<ChevronLeft className="w-4 h-4" />}
          aria-label="Go to previous page"
        >
          Previous
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          rightIcon={<ChevronRight className="w-4 h-4" />}
          aria-label="Go to next page"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
