"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCreateWorkSpaceModal } from "../store/use-create-workspace-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateWorkSpace } from "../api/use-create-workspace";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const CreateWorkSpaceModal = () => {
  const router = useRouter();
  const [open, setOpen] = useCreateWorkSpaceModal();
  const [name, setName] = useState("");

  const { mutate, data, error, isPending, isError, isSuccess, isSettled } =
    useCreateWorkSpace();

  const handleClose = () => {
    setOpen(false);
    setName("");
  };

  const handleSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutate(
      { name },
      {
        onSuccess(id) {
          router.push(`workspace/${id}`);
          handleClose();
          toast.success("Workspace created !");
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a workspace</DialogTitle>
        </DialogHeader>

        <form className="space-y-4" onSubmit={handleSumbit}>
          <Input
            value={name}
            disabled={isPending}
            required
            autoFocus
            minLength={3}
            onChange={(e) => setName(e.target.value)}
            placeholder="WorkSpace name e.g. 'Work' 'Personal' 'Home' "
          />

          <div className="flex justify-end">
            <Button disabled={isPending}>Create</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
