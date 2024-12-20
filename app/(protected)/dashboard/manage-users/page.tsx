import LayoutSelector from "@/components/custom/LayoutSelector";
import React, { Suspense } from "react";

import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IconPlus } from "@tabler/icons-react";
import CreateUserForm from "./CreateUserForm";
import { Button } from "@/components/ui/button";

import { Skeleton } from "@/components/ui/skeleton";
import UsersTable from "./usersTable";

const ManageUsers = async () => {

  return (
    <main className="w-full h-full bg-slate-50 ">
      <LayoutSelector layout="default">
        <section className=" p-4 overflow-y-auto w-full">
          <div className="flex flex-row justify-between pr-8">
            <h1 className="text-4xl font-bold mb-4">Users</h1>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <IconPlus className="p-0" height={17} />
                  Create user
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add a new user</DialogTitle>
                  <DialogClose asChild>
                    <CreateUserForm />
                  </DialogClose>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
          <Suspense fallback={<Skeleton />}>
            <UsersTable />
          </Suspense>
        </section>
      </LayoutSelector>
    </main>
  );
};

export default ManageUsers;
