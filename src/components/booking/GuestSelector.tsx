import * as React from "react";
import { Users } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface GuestSelectorProps {
  className?: string;
  adults: number;
  children: number;
  onAdultsChange: (value: number) => void;
  onChildrenChange: (value: number) => void;
  maxGuests?: number;
}

export function GuestSelector({
  className,
  adults,
  children,
  onAdultsChange,
  onChildrenChange,
  maxGuests = 10,
}: GuestSelectorProps) {
  const totalGuests = adults + children;

  const handleIncrement = (type: 'adults' | 'children') => {
    if (totalGuests >= maxGuests) return;
    
    if (type === 'adults') {
      onAdultsChange(adults + 1);
    } else {
      onChildrenChange(children + 1);
    }
  };

  const handleDecrement = (type: 'adults' | 'children') => {
    if (type === 'adults' && adults > 1) {
      onAdultsChange(adults - 1);
    } else if (type === 'children' && children > 0) {
      onChildrenChange(children - 1);
    }
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-start text-left font-normal"
          >
            <Users className="mr-2 h-4 w-4" />
            <span>
              大人 {adults}名
              {children > 0 ? `、子供 ${children}名` : ""}
              （計 {totalGuests}名）
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium">宿泊人数</h4>
              <p className="text-sm text-muted-foreground">
                最大 {maxGuests}名まで選択可能です
              </p>
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span>大人</span>
                  <span className="text-sm text-muted-foreground">13歳以上</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    onClick={() => handleDecrement('adults')}
                    disabled={adults <= 1}
                  >
                    -
                  </Button>
                  <span className="w-8 text-center">{adults}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    onClick={() => handleIncrement('adults')}
                    disabled={totalGuests >= maxGuests}
                  >
                    +
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span>子供</span>
                  <span className="text-sm text-muted-foreground">2〜12歳</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    onClick={() => handleDecrement('children')}
                    disabled={children <= 0}
                  >
                    -
                  </Button>
                  <span className="w-8 text-center">{children}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    onClick={() => handleIncrement('children')}
                    disabled={totalGuests >= maxGuests}
                  >
                    +
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}