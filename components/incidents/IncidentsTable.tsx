"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from "@/components/ui/table";
import Link from "next/link";
import incidents from "@/data/incidents";
import { Incident } from "@/types/incidents";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const columns = [
  { key: "number", label: "Number" },
  { key: "alert_id", label: "Alert ID" },
  { key: "alert_level", label: "Alert Level" },
  { key: "state", label: "State" },
  { key: "description", label: "Short description" },
  { key: "config_item", label: "Configuration item" },
  { key: "priority", label: "Priority" },
  { key: "category", label: "Category" },
  { key: "alert_acknowledge", label: "Alert Acknowledge" },
] as const;

type SearchField = (typeof columns)[number]["key"];

const emptySearch = Object.fromEntries(
  columns.map((column) => [column.key, ""]),
) as Record<SearchField, string>;

const incidentField = (incident: Incident, key: SearchField) => {
  const value = incident[key];
  return typeof value === "string" ? value : String(value);
};

const matchesSearch = (value: string, query: string) =>
  value.toLowerCase().includes(query.trim().toLowerCase());

const IncidentsTable = () => {
  const [currPage, setCurrPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [search, setSearch] = useState(emptySearch);

  const updateSearch = (key: SearchField, value: string) => {
    setSearch((current) => ({ ...current, [key]: value }));
    setCurrPage(1);
  };

  const sortedIncidents: Incident[] = [...incidents].sort(
    (a, b) => b.id - a.id,
  );

  const searchedIncidents = sortedIncidents.filter((incident) =>
    columns.every((column) =>
      matchesSearch(incidentField(incident, column.key), search[column.key]),
    ),
  );

  const filteredIncidents = limit
    ? searchedIncidents.slice((currPage - 1) * limit, limit * currPage)
    : searchedIncidents;

  const pages = Math.ceil(searchedIncidents.length / limit);

  const handleChange = (value: string) => {
    setLimit(Number(value));
    setCurrPage(1);
  };

  const visibleIds = filteredIncidents.map((incident) => incident.id);
  const allVisibleSelected =
    visibleIds.length > 0 && visibleIds.every((id) => selectedIds.has(id));

  const toggleAll = (checked: boolean | "indeterminate") => {
    setSelectedIds((current) => {
      const next = new Set(current);
      if (checked === true) {
        visibleIds.forEach((id) => next.add(id));
      } else {
        visibleIds.forEach((id) => next.delete(id));
      }
      return next;
    });
  };

  const toggleOne = (id: number, checked: boolean | "indeterminate") => {
    setSelectedIds((current) => {
      const next = new Set(current);
      if (checked === true) {
        next.add(id);
      } else {
        next.delete(id);
      }
      return next;
    });
  };

  return (
    <div className="mt-10">
      <h3 className="text-2xl mb-4 font-semibold">Incidents</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Checkbox
                checked={allVisibleSelected}
                onCheckedChange={toggleAll}
                aria-label="Select all incidents"
              />
            </TableHead>
            <TableHead>
              <Search className="ml-2 h-4 w-4 text-blue-700" />
            </TableHead>
            {columns.map((column) => (
              <TableHead key={column.key} className="font-bold">
                {column.label}
              </TableHead>
            ))}
          </TableRow>
          <TableRow className="bg-gray-300 hover:bg-gray-300">
            <TableHead> </TableHead>
            <TableHead> </TableHead>
            {columns.map((column) => (
              <TableHead key={column.key}>
                <Input
                  className="rounded-xs bg-white"
                  placeholder="Search"
                  value={search[column.key]}
                  onChange={(event) =>
                    updateSearch(column.key, event.target.value)
                  }
                  aria-label={`Search by ${column.label.toLowerCase()}`}
                />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredIncidents.map((incident, i) => (
            <TableRow
              key={incident.id}
              className={i % 2 === 0 ? "" : "bg-gray-100"}
            >
              <TableCell>
                <Checkbox
                  checked={selectedIds.has(incident.id)}
                  onCheckedChange={(checked) => toggleOne(incident.id, checked)}
                  aria-label={`Select ${incident.number}`}
                />
              </TableCell>
              <TableCell> </TableCell>
              <TableCell>
                <Link href="#" className="text-blue-700">
                  {incident.number}
                </Link>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {incident.alert_id}
              </TableCell>
              <TableCell className="text-left hidden md:table-cell">
                {incident.alert_level}
              </TableCell>
              <TableCell className="text-left hidden md:table-cell">
                {incident.state}
              </TableCell>
              <TableCell className="text-left hidden md:table-cell">
                {incident.description}
              </TableCell>
              <TableCell className="text-left hidden md:table-cell">
                <Link href="#" className="text-blue-700">
                  {incident.config_item}
                </Link>
              </TableCell>
              <TableCell className="text-left hidden md:table-cell">
                {incident.priority}
              </TableCell>
              <TableCell className="text-left hidden md:table-cell">
                {incident.category}
              </TableCell>
              <TableCell className="text-left hidden md:table-cell">
                {String(incident.alert_acknowledge)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination>
        <PaginationContent>
          <Field orientation="horizontal" className="w-fit">
            <FieldLabel htmlFor="select-rows-per-page">
              Rows per page
            </FieldLabel>
            <Select value={String(limit)} onValueChange={handleChange}>
              <SelectTrigger className="w-20" id="select-rows-per-page">
                <SelectValue />
              </SelectTrigger>
              <SelectContent align="start">
                <SelectGroup>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>

          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => setCurrPage(currPage - 1)}
            />
          </PaginationItem>

          {Array.from({ length: pages }, (_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                href="#"
                isActive={currPage === i + 1}
                onClick={() => setCurrPage(i + 1)}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => setCurrPage(currPage + 1)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default IncidentsTable;
