'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { axiosInstance } from '@/lib/axios';

export function PermissionSelectorModal({
  open,
  onClose,
  onSubmit,
  defaultSelected = [],
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (selectedIds: number[]) => void;
  defaultSelected?: number[];
}) {
  const [permissions, setPermissions] = useState<any[]>([]);
  const [selected, setSelected] = useState<number[]>(defaultSelected);

  useEffect(() => {
    if (open) {
      axiosInstance.get('/permissions').then(setPermissions);
      setSelected(defaultSelected);
    }
  }, [open]);

  const toggle = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-[#2a2a3c] text-white">
        <DialogHeader>
          <DialogTitle>Chọn quyền</DialogTitle>
        </DialogHeader>

        <div className="space-y-2 max-h-[300px] overflow-y-auto">
          {permissions.map((perm) => (
            <div key={perm.id} className="flex items-center space-x-2">
              <Checkbox
                id={`perm-${perm.id}`}
                checked={selected.includes(perm.id)}
                onCheckedChange={() => toggle(perm.id)}
              />
              <label htmlFor={`perm-${perm.id}`}>{perm.name}</label>
            </div>
          ))}
        </div>

        <Button
          className="w-full mt-4 bg-[#ff6b5c]"
          onClick={() => onSubmit(selected)}
        >
          Lưu
        </Button>
      </DialogContent>
    </Dialog>
  );
}
