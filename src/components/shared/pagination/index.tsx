import { ChevronRight, ChevronLeft } from "lucide-react";

interface PaginationProps {
    page: number;
    totalPages: number;
    onPageChange: (newPage: number) => void;
}

export default function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
    return (
      <div className="flex justify-center mt-4 space-x-2">
        
        <button
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          className={`p-2 flex items-center justify-center rounded-full ${page === 1 ? "bg-zinc-600 cursor-not-allowed" : "bg-zinc-200 hover:bg-zinc-300"}`}
        >
          <ChevronLeft className="text-zinc-800 w-8 h-8"/>
        </button>

        <span className="p-2 text-lg font-semibold text-zinc-200">
          {page} / {totalPages}
        </span>

        <button
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          className={`p-2 flex items-center justify-center rounded-full ${page >= totalPages ? "bg-zinc-600 cursor-not-allowed" : "bg-zinc-200 hover:bg-zinc-300"}`}
        >
          <ChevronRight className="text-zinc-800 w-8 h-8"/>
        </button>
      </div>
    );
}
