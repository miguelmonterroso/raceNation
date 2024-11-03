import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import NumberTicker from "../ui/number-ticker";
import brands from '../../data/carBrands/brands.json';

type RankingData = {
  position: number;
  name: string;
  car: string;
  time: string;
  brand: string;
};

const rankingData: RankingData[] = [
  {
    position: 1,
    name: "Carlos Pérez",
    car: "Nissan GT-R",
    time: "24.56",
    brand: "Nissan"
  },
  {
    position: 2,
    name: "Ana Torres",
    car: "Toyota Supra",
    time: "25.30",
    brand: "Toyota"
  },
  {
    position: 3,
    name: "Juan López",
    car: "Mazda RX-7",
    time: "26.12",
    brand: "Mazda"
  },
];

const getBrandSvg = (brand: string): string => {
  const brandData = (brands as Record<string, { svg: string }>)[brand];
  return brandData ? brandData.svg : "";
};

export const columns: ColumnDef<RankingData>[] = [
  {
    accessorKey: "position",
    header: "Posición",
  },
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "car",
    header: "Auto",
  },
  {
    accessorKey: "time",
    header: "Tiempo",
    cell: ({ row }) => (
        <NumberTicker value={row.getValue("time")} decimalPlaces={2} />
    )
  },
  {
    accessorKey: "brand",
    header: "Marca",
    cell: ({ row }) => {
      const brand = row.getValue("brand") as string;
      const svgContent = getBrandSvg(brand);
      return (
        <div
          className="flex items-center justify-start"
          dangerouslySetInnerHTML={{ __html: svgContent }}
        />
      );
    }
  }
];

export default function RankingDataTable() {
  const table = useReactTable({
    data: rankingData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
