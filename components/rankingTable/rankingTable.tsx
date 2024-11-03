"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import NumberTicker from "../ui/number-ticker";

type RankingData = {
  position: number;
  name: string;
  car: string;
  time: string;
  imageUrl: React.ReactNode;
};

const rankingData: RankingData[] = [
  {
    position: 1,
    name: "Carlos Pérez",
    car: "Nissan GT-R",
    time: "24.56",
    imageUrl: (
      <svg fill="currentColor" width="50px" height="50px" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg">
        <title>Nissan icon</title>
        <path d="M20.576 14.955l-.01.028c-1.247 3.643-4.685 6.086-8.561 6.086-3.876 0-7.32-2.448-8.562-6.09l-.01-.029H.71v.329l1.133.133c.7.08.847.39 1.038.78l.048.096c1.638 3.495 5.204 5.752 9.08 5.752 3.877 0 7.443-2.257 9.081-5.747l.048-.095c.19-.39.338-.7 1.038-.781l1.134-.134v-.328zM3.443 9.012c1.247-3.643 4.686-6.09 8.562-6.09 3.876 0 7.319 2.447 8.562 6.09l.01.028h2.728v-.328l-1.134-.133c-.7-.081-.847-.39-1.038-.781l-.047-.096C19.448 4.217 15.88 1.96 12.005 1.96c-3.881 0-7.443 2.257-9.081 5.752l-.048.095c-.19.39-.338.7-1.038.781l-1.133.133v.329h2.724zm13.862 1.586l-1.743 2.795h.752l.31-.5h2.033l.31.5h.747l-1.743-2.795zm1.033 1.766h-1.395l.7-1.124zm2.81-1.066l2.071 2.095H24v-2.795h-.614v2.085l-2.062-2.085h-.795v2.795h.619zM0 13.393h.619v-2.095l2.076 2.095h.781v-2.795h-.619v2.085L.795 10.598H0zm4.843-2.795h.619v2.795h-.62zm4.486 2.204c-.02.005-.096.005-.124.005H6.743v.572h2.5c.019 0 .167 0 .195-.005.51-.048.743-.472.743-.843 0-.381-.243-.79-.705-.833-.09-.01-.166-.01-.2-.01H7.643a.83.83 0 0 1-.181-.014c-.129-.034-.176-.148-.176-.243 0-.086.047-.2.18-.238a.68.68 0 0 1 .172-.014h2.357v-.562H7.6c-.1 0-.176.004-.238.014a.792.792 0 0 0-.695.805c0 .343.214.743.685.81.086.009.205.009.258.009H9.2c.029 0 .1 0 .114.005.181.023.243.157.243.276a.262.262 0 0 1-.228.266zm4.657 0c-.02.005-.096.005-.129.005H11.4v.572h2.5c.019 0 .167 0 .195-.005.51-.048.743-.472.743-.843 0-.381-.243-.79-.705-.833-.09-.01-.166-.01-.2-.01H12.3a.83.83 0 0 1-.181-.014c-.129-.034-.176-.148-.176-.243 0-.086.047-.2.18-.238a.68.68 0 0 1 .172-.014h2.357v-.562h-2.395c-.1 0-.176.004-.238.014a.792.792 0 0 0-.695.805c0 .343.214.743.686.81.085.009.204.009.257.009h1.59c.029 0 .1 0 .114.005.181.023.243.157.243.276a.267.267 0 0 1-.228.266Z"/>
      </svg>
    ),
  },
  {
    position: 2,
    name: "Ana Torres",
    car: "Toyota Supra",
    time: "25.30",
    imageUrl: (<svg fill="currentColor" version="1.1" id="Layer_1"
        viewBox="0 0 548 548" width="50px" height="50px">
   <g>
       <path d="M273.3,99.6C123.9,99.6,2,177.6,2,273.3s121.9,173.7,271.3,173.7c149.4,0,271.3-78,271.3-173.7S422.7,99.6,273.3,99.6
           L273.3,99.6z M348.4,131.8c24,4.6,46.5,11.4,66.7,20c17.4,9,27.6,19.6,27.6,31.1c0,23.2-41.6,43.3-101,52.1
           c-4.1-44.8-15.1-83.1-29.9-107.6C324.6,128.4,336.8,129.9,348.4,131.8L348.4,131.8z M273.3,125.9c22.5,0,41.4,47.7,46.7,111.8
           c-14.9,1.4-30.5,2.2-46.7,2.2c-16.2,0-31.9-0.8-46.7-2.2C231.9,173.5,250.9,125.9,273.3,125.9L273.3,125.9z M131.5,151.8
           c20.2-8.6,42.7-15.3,66.7-20c11.5-1.9,23.8-3.4,36.6-4.4C220,151.9,209,190.3,204.9,235c-59.4-8.9-101-28.9-101-52.1
           C103.9,171.4,114.1,160.7,131.5,151.8L131.5,151.8z M26.1,273.3c0-34.9,20.2-67,53.9-92.4c-0.1,1.2-0.2,2.4-0.2,3.6
           c0,34.1,51.4,63.4,123.6,75.1c-0.2,4.9-0.2,9.8-0.2,14.8c0,60.4,12.2,113.8,30.8,145.5C116.4,408.6,26.1,347.1,26.1,273.3
           L26.1,273.3z M279.3,421.8c-2,0-4,0-6,0c-2,0-4,0-6,0c-23.8-9.1-42.3-71.8-42.3-147.4c0-4,0.1-7.9,0.2-11.8
           c15.4,1.6,31.5,2.5,48.1,2.5c16.6,0,32.7-0.9,48.1-2.5c0.1,3.9,0.2,7.9,0.2,11.8C321.5,350,303,412.7,279.3,421.8L279.3,421.8z
            M312.6,420c18.6-31.7,30.8-85.1,30.8-145.5c0-5-0.1-9.9-0.2-14.8c72.2-11.7,123.6-41,123.6-75.1c0-1.2-0.1-2.4-0.2-3.6
           c33.7,25.4,53.9,57.5,53.9,92.4C520.5,347.1,430.2,408.6,312.6,420L312.6,420z"/>
   </g>
   </svg>), 
  },
  {
    position: 3,
    name: "Juan López",
    car: "Mazda RX-7",
    time: "26.12",
    imageUrl: (<svg fill="currentColor" width="50px" height="50px" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg"><title>Mazda icon</title><path d="M11.999 12.876c-.036 0-.105-.046-.222-.26a7.531 7.531 0 00-1.975-2.353A8.255 8.255 0 007.7 9.065a17.945 17.945 0 00-.345-.136c-1.012-.4-2.061-.813-3.035-1.377A8.982 8.982 0 014 7.362c.194-.34.42-.665.67-.962a6.055 6.055 0 011.253-1.131 7.126 7.126 0 011.618-.806c1.218-.434 2.677-.647 4.458-.649 1.783.002 3.241.215 4.459.65a7.097 7.097 0 011.619.805c.471.319.892.699 1.253 1.13.25.298.475.623.67.963-.103.064-.212.129-.32.192-.976.564-2.023.977-3.037 1.376l-.345.136a8.26 8.26 0 00-2.1 1.198 7.519 7.519 0 00-1.975 2.354c-.117.213-.187.259-.224.259m0 7.072c-1.544-.002-2.798-.129-3.83-.387-1.013-.252-1.855-.64-2.576-1.188a5.792 5.792 0 01-1.392-1.537 7.607 7.607 0 01-.81-1.768 10.298 10.298 0 01-.467-2.983c0-.674.047-1.313.135-1.901 1.106.596 2.153.895 3.08 1.16l.215.06c1.29.371 2.314.857 3.135 1.488.475.368.89.793 1.23 1.264.369.508.663 1.088.877 1.725.096.289.2.468.403.468.207 0 .308-.18.405-.468a6.124 6.124 0 012.107-2.988c.82-.632 1.845-1.118 3.135-1.489l.216-.06c.926-.265 1.973-.564 3.078-1.16.09.589.136 1.227.136 1.9 0 .458-.046 1.664-.465 2.984a7.626 7.626 0 01-.809 1.768 5.789 5.789 0 01-1.396 1.537c-.723.548-1.565.936-2.574 1.188-1.035.258-2.288.385-3.833.387m9.692-14.556c-1.909-2.05-4.99-2.99-9.692-2.995-4.7.005-7.781.944-9.69 2.994C.89 6.913 0 9.018 0 11.874c0 1.579.39 5.6 3.564 7.676 1.9 1.242 4.354 2.046 8.435 2.052 4.083-.006 6.536-.81 8.437-2.052C23.609 17.474 24 13.452 24 11.874c0-2.848-.897-4.968-2.31-6.483Z"/></svg>), 
  },
];

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
    accessorKey: "imageUrl",
    header: "Marca",
    cell: ({ row }) => (
      <div className="flex items-center justify-start">
        {row.getValue("imageUrl")}
      </div>
    ),
  },
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