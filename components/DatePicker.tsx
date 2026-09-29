"use client"

import { format, isValid, parse } from "date-fns"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Field, FieldLabel } from "@/components/ui/field"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type DatePickerProps = {
  id: string
  name?: string
  value?: string
  onChange: (date: string) => void
  onBlur?: () => void
}

function parseDate(value?: string) {
  if (!value) return undefined
  const date = parse(value, "yyyy-MM-dd", new Date())
  return isValid(date) ? date : undefined
}

export function DatePicker({
  id,
  name,
  value,
  onChange,
  onBlur,
}: DatePickerProps) {
  const date = parseDate(value)

  return (
    <Field className="w-44">
      <FieldLabel htmlFor={id}>Date</FieldLabel>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id={id}
            name={name}
            onBlur={onBlur}
            className="justify-start font-normal"
          >
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(selected) =>
              onChange(selected ? format(selected, "yyyy-MM-dd") : "")
            }
            defaultMonth={date}
          />
        </PopoverContent>
      </Popover>
    </Field>
  )
}
