import * as React from "react";
import html2canvas from "html2canvas";
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
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
import { Button } from "../ui/button";

type RankingData = {
  name: string;
  car: string;
  time: string;
  brand: string;
};

interface eventProps {
  event: string;
}

const rankingData = [
  { name: "Carlos Pérez", car: "Nissan GT-R", time: "24.56", brand: "Nissan" },
  { name: "Ana Torres", car: "Toyota Supra", time: "25.30", brand: "Toyota" },
  { name: "Juan López", car: "Mazda RX-7", time: "26.12", brand: "Mazda" },
  { name: "Luis Romero", car: "Peugeot 508 PSE", time: "27.45", brand: "Peugeot" },
  { name: "Miguel Monterroso", car: "Subaru WRX", time: "21.89", brand: "Subaru" },
  { name: "Pablo Monterroso García", car: "Subaru WRX STI", time: "22.89", brand: "Subaru" },
  { name: "Alejandro Mendez", car: "Subaru WRX STI", time: "23.89", brand: "Subaru" },
  { name: "Anderson García", car: "Subaru WRX STI", time: "34.89", brand: "Subaru" },
  { name: "Alex García", car: "Subaru WRX STI", time: "25.89", brand: "Subaru" },
  { name: "Elena García", car: "Subaru WRX STI", time: "25.89", brand: "Subaru" },
  { name: "Elena García", car: "Subaru WRX STI", time: "25.89", brand: "Subaru" },
  { name: "Elena García", car: "Subaru WRX STI", time: "25.89", brand: "Subaru" },
  { name: "Elena García", car: "Subaru WRX STI", time: "25.89", brand: "Subaru" },
  { name: "Elena García", car: "Subaru WRX STI", time: "25.89", brand: "Subaru" },

  { name: "Sofía Morales", car: "Mitsubishi Lancer Evolution", time: "23.34", brand: "Mitsubishi" },
  { name: "Daniela Ríos", car: "Acura NSX", time: "21.76", brand: "Acura" },
  { name: "Miguel Castro", car: "Alfa Romeo Giulia Quadrifoglio", time: "24.99", brand: "Alfa Romeo" },
  { name: "Felipe López", car: "Aston Martin DBS Superleggera", time: "20.45", brand: "Aston Martin" },
  { name: "Lucía Sánchez", car: "Audi R8", time: "22.16", brand: "Audi" },
  { name: "Fernando Ruiz", car: "BMW M5 Competition", time: "23.78", brand: "BMW" },
  { name: "Laura Hernández", car: "Bugatti Chiron Super Sport", time: "18.92", brand: "Bugatti" },
  { name: "Raúl Vargas", car: "Buick Regal GS", time: "28.45", brand: "Buick" },
  { name: "Cristina Rivera", car: "Cadillac CT5-V Blackwing", time: "26.78", brand: "Cadillac" },
  { name: "Tomás Cabrera", car: "Chevrolet Corvette Z06", time: "23.05", brand: "Chevrolet" },
  { name: "Adriana Flores", car: "Citroën DS3 Racing", time: "27.22", brand: "Citroën" },
  { name: "Luis Vargas", car: "Chrysler 300 SRT8", time: "28.15", brand: "Chrysler" },
  { name: "Santiago Ramírez", car: "Dacia Sandero RS", time: "29.89", brand: "Dacia" },
  { name: "Alejandro Vega", car: "Dodge Challenger Hellcat", time: "20.98", brand: "Dodge" },
  { name: "Claudia Márquez", car: "Ferrari 812 Superfast", time: "19.67", brand: "Ferrari" },
  { name: "Andrés León", car: "Fiat 124 Spider Abarth", time: "27.01", brand: "Fiat" },
  { name: "Javier Herrera", car: "Ford Mustang Shelby GT500", time: "22.34", brand: "Ford" },
  { name: "María Carrillo", car: "GMC Sierra Denali", time: "28.67", brand: "GMC" },
  { name: "Sergio Medina", car: "Honda Civic Type R", time: "25.12", brand: "Honda" },
  { name: "Natalia Gómez", car: "Hyundai i30 N", time: "26.98", brand: "Hyundai" },
  { name: "Pedro Moreno", car: "Infiniti Q60 Red Sport", time: "24.01", brand: "Infiniti" },
  { name: "Francisco Luna", car: "Jaguar F-Type SVR", time: "22.45", brand: "Jaguar" },
  { name: "Patricia Campos", car: "Jeep Grand Cherokee Trackhawk", time: "25.56", brand: "Jeep" },
  { name: "Ignacio Cortés", car: "Kia Stinger GT", time: "27.77", brand: "Kia" },
  { name: "Valeria Paredes", car: "Land Rover Range Rover SVAutobiography", time: "28.54", brand: "Land Rover" },
  { name: "David Pérez", car: "Lexus LC 500", time: "23.65", brand: "Lexus" },
  { name: "Juan Aguilar", car: "Maserati Quattroporte GTS", time: "24.88", brand: "Maserati" },
  { name: "Oscar Núñez", car: "McLaren 720S", time: "19.78", brand: "McLaren" },
  { name: "Verónica Salinas", car: "Mercedes-Benz AMG GT R", time: "21.34", brand: "Mercedes Benz" },
  { name: "Manuel Flores", car: "Opel Astra OPC", time: "28.12", brand: "Opel" },
  { name: "Renata Ortiz", car: "Porsche 911 Turbo S", time: "19.56", brand: "Porsche" },
  { name: "Diego Castillo", car: "Renault Megane RS", time: "26.45", brand: "Renault" },
  { name: "Fernanda Reyes", car: "Škoda Octavia vRS", time: "27.89", brand: "Škoda" },
  { name: "Héctor Díaz", car: "Rolls Royce Wraith", time: "28.98", brand: "Rolls Royce" },
  { name: "Roberto Navarro", car: "Saab 9-3 Turbo X", time: "27.76", brand: "Saab" },
  { name: "Daniela González", car: "Suzuki Swift Sport", time: "28.23", brand: "Suzuki" },
  { name: "Rafael Peña", car: "Tesla Model S Plaid", time: "20.12", brand: "Tesla" },
  { name: "Gabriela Cruz", car: "Volvo S60 Polestar", time: "27.54", brand: "Volvo" },
  { name: "Eduardo Soto", car: "Volkswagen Golf R", time: "26.34", brand: "Volkswagen" }
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

export default function RankingDataTable({ event }: eventProps) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [nameFilter, setNameFilter] = React.useState<string>("");

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

  const downloadTableAsJpeg = () => {
    const hiddenTableElement = document.getElementById("hidden-table");
    if (hiddenTableElement) {
      hiddenTableElement.style.display = "block"; 

      setTimeout(() => {
        html2canvas(hiddenTableElement, { backgroundColor: "black", scale: 2 }).then((canvas) => {
          const link = document.createElement("a");
          link.href = canvas.toDataURL("image/jpeg", 1.0);
          link.download = "ranking_table.jpeg";
          link.click();

          hiddenTableElement.style.display = "none"; 
        });
      }, 100);
    }
  };

  const dataForCapture = sortedAndFilteredData.slice(0, 10);


  return (
    <div className="w-full overflow-x-auto p-3 lg:p-0">
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

          <Button onClick={downloadTableAsJpeg}>
            Descargar Resultados
        </Button>
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

      <div id="hidden-table" style={{ display: "none", position: "absolute", bottom: "-9999px", minWidth: '1500px', minHeight: '700px' }}>
        <div className="p-5 mb-3 flex flex-wrap items-center justify-between">
          <p className="text-5xl font-semibold mb-5">RaceNation</p>
          <p className="font-bold text-3xl">{event}</p>
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
            {dataForCapture.length ? (
              dataForCapture.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.car}</TableCell>
                  <TableCell>{row.time}</TableCell>
                  <TableCell>{row.brand}</TableCell>
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

    </div>
  );
}
