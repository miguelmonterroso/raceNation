import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  flexRender
} from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import NumberTicker from "../ui/number-ticker";
import brands from '../../data/carBrands/brands.json';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type RankingData = {
  name: string;
  car: string;
  time: string;
  brand: string;
};

const rankingData: RankingData[] = [
  { name: "Carlos Pérez", car: "Nissan GT-R", time: "24.56", brand: "Nissan" },
  { name: "Ana Torres", car: "Toyota Supra", time: "25.30", brand: "Toyota" },
  { name: "Juan López", car: "Mazda RX-7", time: "26.12", brand: "Mazda" },
  { name: "Juan López", car: "Mazda RX-7", time: "23.12", brand: "Mazda" },
  { name: "Juan López", car: "Mazda RX-7", time: "21.12", brand: "Mazda" },
  { name: "Juan López", car: "Mazda RX-7", time: "24.12", brand: "Mazda" },
  { name: "Carlos Pérez", car: "Nissan GT-R", time: "13.56", brand: "Nissan" },
  { name: "Juan Pérez", car: "Nissan GT-R", time: "11.56", brand: "Nissan" },
  { name: "Jose Pérez", car: "Nissan GT-R", time: "22.56", brand: "Nissan" },
  { name: "Oscar Pérez", car: "Nissan GT-R", time: "19.56", brand: "Nissan" },


  { name: "Oscar Pérez", car: "Nissan GT-R", time: "19.56", brand: "Peugeot" },
  { name: "Oscar Pérez", car: "Nissan GT-R", time: "19.56", brand: "Subaru" },


];

const getBrandSvg = (brand: string): string => {
  const brandData = (brands as Record<string, { svg: string }>)[brand];
  return brandData ? brandData.svg : "";
};

export const columns: ColumnDef<RankingData>[] = [
  {
    accessorKey: "position",
    header: "Posición",
    cell: ({ row }) => row.index + 1,
  },
  { accessorKey: "name", header: "Nombre" },
  { accessorKey: "car", header: "Auto" },
  {
    accessorKey: "time",
    header: "Tiempo",
    cell: ({ row }) => <NumberTicker value={row.getValue("time")} decimalPlaces={2} />,
  },
  {
    accessorKey: "brand",
    header: "Marca",
    cell: ({ row }) => {
      const brand = row.getValue("brand") as string;
      const svgContent = getBrandSvg(brand);
      return <div className="flex items-center" dangerouslySetInnerHTML={{ __html: svgContent }} />;
    },
  },
];

export default function RankingDataTable() {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [nameFilter, setNameFilter] = React.useState<string>("");

  // Aplicamos el filtro y ordenamos por tiempo
  const sortedAndFilteredData = React.useMemo(() => {
    return rankingData
      .filter((item) =>
        columnFilters.every((filter) => {
          if (typeof filter.value === "string") {
            if (filter.id === "brand") return item.brand === filter.value;
            if (filter.id === "name") return item.name.toLowerCase().includes(filter.value.toLowerCase());
          }
          return true;
        })
      )
      .sort((a, b) => parseFloat(a.time) - parseFloat(b.time));
  }, [columnFilters]);

  const table = useReactTable({
    data: sortedAndFilteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const handleBrandFilterChange = (brand: string) => {
    setColumnFilters((prev) => [
      ...prev.filter((filter) => filter.id !== "brand"),
      ...(brand !== "all" ? [{ id: "brand", value: brand }] : []),
    ]);
  };

  const handleNameFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    setNameFilter(name);
    setColumnFilters((prev) => [
      ...prev.filter((filter) => filter.id !== "name"),
      ...(name ? [{ id: "name", value: name }] : []),
    ]);
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex gap-4 py-4 p-2 lg:pl-12 flex-col md:flex-row lg:flex-row lg:items-center">
        <Input
          placeholder="Buscar por nombre..."
          value={nameFilter}
          onChange={handleNameFilterChange}
          className="max-w-sm"
        />
        <div className="flex gap-4">
          <Select onValueChange={handleBrandFilterChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Marcas" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Marcas:</SelectLabel>
                <SelectItem value="all">Todas las marcas</SelectItem>
                {[...new Set(rankingData.map((item) => item.brand))].map((brand) => (
                  <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select onValueChange={handleBrandFilterChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Categorias:</SelectLabel>
                <SelectItem value="all">Todas las categorias</SelectItem>
                {[...new Set(rankingData.map((item) => item.brand))].map((brand) => (
                  <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
       
      </div>

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
