"use client"

import React from "react"
import {
  createColumnHelper,
  createPaginatedRowModel,
  rowPaginationFeature,
  tableFeatures,
  useTable,
} from "@tanstack/react-table"
import { createClient } from "@/lib/supabase/client"
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"

type Person = {
  id: string
  hming: string
  chhungte: string
  mobile: string
  chhungte_mobile: string
  pianni: string
  veng: string
  awm_tan_ni: string
  hnathawhna: string
  created_by: string
}

const features = tableFeatures({
  rowPaginationFeature,
  paginatedRowModel: createPaginatedRowModel(),
})

const columnHelper = createColumnHelper<typeof features, Person>()

export default function Members() {
  const [members, setMembers] = React.useState<Person[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  const columns = React.useMemo(
    () =>
      columnHelper.columns([
        columnHelper.display({
          id: "rowNumber",
          header: "#",
          cell: ({ row }) => row.getDisplayIndex() + 1,
        }),

        columnHelper.accessor("hming", {
          header: "Hming",
          cell: (info) => info.getValue(),
        }),

        columnHelper.accessor("chhungte", {
          header: "Chhungte",
          cell: (info) => info.getValue(),
        }),

        columnHelper.accessor("mobile", {
          header: "Mobile",
          cell: (info) => info.getValue(),
        }),

        columnHelper.accessor("chhungte_mobile", {
          header: "Visits",
          cell: (info) => info.getValue(),
        }),

        columnHelper.accessor("pianni", {
          header: "Status",
          cell: (info) => info.getValue(),
        }),

        columnHelper.accessor("veng", {
          header: "Veng",
          cell: (info) => info.getValue(),
        }),

         columnHelper.accessor("awm_tan_ni", {
          header: "Awm Tan Ni",
          cell: (info) => info.getValue(),
        }),

         columnHelper.accessor("hnathawhna", {
          header: "Hnathawhna",
          cell: (info) => info.getValue(),
        }),
      ]),
    []
  )

  React.useEffect(() => {
    const fetchMembers = async () => {
      const supabase = createClient()

      const { data, error } = await supabase
        .from("members")
        .select("*")

      if (error) {
        setError(error.message)
        setLoading(false)
        return
      }

      setMembers(data ?? [])
      setLoading(false)
    }

    fetchMembers()
  }, [])

  if (loading) {
    return <div>Loading members...</div>
  }

  if (error) {
    return (
      <div>
        <p>Error loading members:</p>
        <p>{error}</p>
      </div>
    )
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="min-w-0">
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    ANIMWA
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Members</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <MyTable data={members} columns={columns} />
        </div>
      </SidebarInset>
    </SidebarProvider>
    )
}

function MyTable({
  data,
  columns,
}: {
  data: Person[]
  columns: ReturnType<typeof columnHelper.columns>
}) {
  const table = useTable(
    {
      features,
      columns,
      data,
      debugTable: true,
    },
    (state) => state
  )

  return (
    <div className="demo-root">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableCell key={header.id} colSpan={header.colSpan}>
                  <table.FlexRender header={header} />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getAllCells().map((cell) => (
                <TableCell key={cell.id}>
                  <table.FlexRender cell={cell} />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="controls">
        <Button variant="outline"
          onClick={() => table.firstPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<<"}
        </Button>

        <Button variant="outline"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </Button>

        <Button variant="outline"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </Button>

        <Button variant="outline"
          onClick={() => table.lastPage()}
          disabled={!table.getCanLastPage()}
        >
          {">>"}
        </Button>

        <span>
          Page{" "}
          <strong>
            {table.state.pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>
        </span>

        <span>
          Go to page:
          <input
            type="number"
            min={1}
            max={table.getPageCount()}
            value={table.state.pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value
                ? Number(e.target.value) - 1
                : 0

              table.setPageIndex(page)
            }}
          />
        </span>

        <select
          value={table.state.pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}

          <option value={Infinity}>Show All</option>
        </select>
      </div>

      <div>
        Showing {table.getRowModel().rows.length} of{" "}
        {table.getRowCount()} Rows
      </div>
    </div>
  )
}