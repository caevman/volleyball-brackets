"use client";

import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandGroup,
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DIVISIONS } from "@/constants/divisions";
import { Division } from "@/types/tournaments";

const divisionTemplates = DIVISIONS;

export default function DivisionMultiSelect({
  selectedDivisions,
  setSelectedDivisions,
}) {
  const [selected, setSelected] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  function toggleSelection(selectedDivision: Division) {
    setSelectedDivisions((prev) =>
      prev.includes(selectedDivision)
        ? prev.filter((v) => v.id !== selectedDivision.id)
        : [...prev, selectedDivision]
    );
  }

  return (
    <div className="space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-start">
            {selectedDivisions.length > 0
              ? `${selectedDivisions.length} divisions selected`
              : "Select divisions"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0">
          <Command>
            <CommandInput placeholder="Search divisions..." />
            <CommandGroup>
              {divisionTemplates.map((division) => (
                <CommandItem
                  key={division.id}
                  onSelect={() => toggleSelection(division)}
                  className="flex justify-between"
                >
                  {division.name}
                  <input
                    type="checkbox"
                    checked={selectedDivisions.includes(division)}
                    readOnly
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Optional badge display */}
      <div className="flex gap-2 flex-wrap">
        {selected.map((id) => {
          const division = divisionTemplates.find((d) => d.id === id);
          return (
            <Badge key={id} variant="secondary">
              {division?.name}
            </Badge>
          );
        })}
      </div>
    </div>
  );
}
