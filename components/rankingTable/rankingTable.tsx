import * as React from "react";
import html2canvas from "html2canvas";
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import brands from "../../data/carBrands/brands.json";
import { useThemeLanguage } from "@/context/ThemeLanguageContext";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "../ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

type RankingData = {
  name: string;
  car: string;
  time: string;
  brand: string;
};

interface EventProps {
  event?: string;
  data: RankingData[];
  hideFilters?: boolean;
}

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
      return (
        <div
          className="flex items-center"
          dangerouslySetInnerHTML={{ __html: svgContent }}
        />
      );
    },
  },
];

export default function RankingDataTable({
  event,
  data,
  hideFilters,
}: EventProps) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [nameFilter, setNameFilter] = React.useState<string>("");
  const { translations } = useThemeLanguage();
  const [selectedBrand, setSelectedBrand] = React.useState<string>("");
  const [open, setOpen] = React.useState(false);

  const sortedAndFilteredData = React.useMemo(() => {
    return data
      .filter((item) =>
        columnFilters.every((filter) => {
          if (typeof filter.value === "string") {
            if (filter.id === "brand") return item.brand === filter.value;
            if (filter.id === "name")
              return item.name
                .toLowerCase()
                .includes(filter.value.toLowerCase());
          }
          return true;
        })
      )
      .sort((a, b) => parseFloat(a.time) - parseFloat(b.time));
  }, [columnFilters, data]);

  const table = useReactTable({
    data: sortedAndFilteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel()
  });

  const handleBrandFilterChange = (brand: string) => {
    setSelectedBrand(brand);
    setColumnFilters((prev) => [
      ...prev.filter((filter) => filter.id !== "brand"),
      ...(brand !== "all" ? [{ id: "brand", value: brand }] : []),
    ]);
  };

  const handleNameFilterChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
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
        html2canvas(hiddenTableElement, {
          backgroundColor: "black",
          scale: 2,
        }).then((canvas) => {
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
      <div className={`${hideFilters ? "hidden" : ""}`}>
        <div className="flex gap-4 py-4 p-2 lg:pl-12 flex-col md:flex-col lg:flex-row lg:items-center">
          <Input
            placeholder={translations.table.filter}
            value={nameFilter}
            onChange={handleNameFilterChange}
            className="max-w-sm"
          />
          <div className="flex gap-4 flex-wrap">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-[200px] justify-between"
                >
                  {selectedBrand || translations.table.brands}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder={translations.table.searchBrand} />
                  <CommandList>
                    <CommandEmpty>{translations.table.noResults}</CommandEmpty>
                    <CommandGroup>
                      <CommandItem
                        key="all"
                        value="all"
                        onSelect={() => {
                          handleBrandFilterChange("all");
                          setOpen(false);
                        }}
                      >
                        {translations.table.allBrands}
                        <Check
                          className={cn(
                            "ml-auto",
                            selectedBrand === "" ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </CommandItem>
                      {[...new Set(data.map((item) => item.brand))].map(
                        (brand) => (
                          <CommandItem
                            key={brand}
                            value={brand}
                            onSelect={() => {
                              handleBrandFilterChange(brand);
                              setOpen(false);
                            }}
                          >
                            {brand}
                            <Check
                              className={cn(
                                "ml-auto",
                                selectedBrand === brand
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        )
                      )}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            <Button onClick={downloadTableAsJpeg}>
              {translations.table.download}
            </Button>

            <div className="flex flex-wrap gap-4">
            <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
            </div>

          </div>
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
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
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
                No hay resultados.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>


      <div
        id="hidden-table"
        className="flex flex-col items-center"
        style={{
          display: "none",
          position: "absolute",
          bottom: "-9999px",
          minWidth: "1500px",
          minHeight: "700px",
        }}
      >
        <div className="p-5 mb-3 flex flex-wrap items-center justify-between">
          <p className="text-5xl font-semibold mb-5">RaceNation</p>
          <p className="font-bold text-3xl">{event}</p>
        </div>
        <div className="w-full flex items-center justify-center">
          <div className="min-w-[1100px] max-w-[1100px] self-center">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
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
                      <TableCell>
                        <div
                          className="flex items-center"
                          dangerouslySetInnerHTML={{
                            __html: getBrandSvg(row.brand),
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No hay resultados.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
