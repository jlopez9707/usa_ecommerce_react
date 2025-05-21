import { Button } from '@/components/ui/button';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    // Calcular rango de páginas a mostrar
    let startPage = Math.max(currentPage - 2, 1);
    let endPage = Math.min(startPage + 4, totalPages);

    if (endPage - startPage < 4 && totalPages > 5) {
        startPage = Math.max(endPage - 4, 1);
    }

    const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

    return (
        <div className="flex items-center justify-center space-x-1">
            {/* Botón Primera Página */}
            {currentPage > 3 && totalPages > 5 && (
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(1)}
                    disabled={currentPage === 1}
                >
                    1
                </Button>
            )}

            {/* Elipsis si no estamos mostrando las primeras páginas */}
            {startPage > 1 && (
                <span className="px-2">...</span>
            )}

            {/* Páginas centrales */}
            {pages.map(page => (
                <Button
                    key={page}
                    variant={page === currentPage ? "default" : "outline"}
                    size="sm"
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </Button>
            ))}

            {/* Elipsis si no estamos mostrando las últimas páginas */}
            {endPage < totalPages && (
                <span className="px-2">...</span>
            )}

            {/* Botón Última Página */}
            {endPage < totalPages && (
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(totalPages)}
                >
                    {totalPages}
                </Button>
            )}
        </div>
    );
}
