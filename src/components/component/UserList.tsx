"use client";

import { Card, CardContent } from "@/components/ui/card";
import UsersService from "@/lib/hooks";
import { Button } from "../ui/button";
import NotFound from "./Not-Found";
import PageLoader from "./PageLoader";
import Link from "next/link";
import FormPage from "./Form";
import { useState } from "react";

export default function UserList() {
  const [editUserId, setEditUserId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const {
    users,
    isError,
    isLoading,
    isLoadingMore,
    isReachingEnd,
    loadMore,
    deleteUser,
    addUser,
    updateUser,
  } = UsersService();

  if (isError)
    return (
      <div>
        <NotFound />
      </div>
    );
  if (isLoading)
    return (
      <div>
        <PageLoader />
      </div>
    );

  const filteredUsers = users.filter((user: any) =>
    `${user.name} ${user.email}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-[1100px] mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center uppercase">
        Users List
      </h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search users by name or email"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div>
        <FormPage
          newName={newName}
          setNewName={setNewName}
          newEmail={newEmail}
          setNewEmail={setNewEmail}
          addUser={addUser}
          editUserId={editUserId}
          updateUser={updateUser}
        />
      </div>
      <div className="space-y-3">
        {filteredUsers.map((user: any) => {
          return (
            <Card key={user.id}>
              <CardContent className="p-4">
                <Link href={`/users/${user.id}`}>
                  <h2 className="text-xl font-semibold">{user.name}</h2>
                  <p className="text-gray-600">{user.email}</p>
                  <p className="text-sm text-gray-500">{user.company.name}</p>
                </Link>
                <span className="space-x-2 space-y-2">
                  <Button onClick={() => deleteUser(user.id)}>Delete</Button>
                  <Button
                    type="button"
                    onClick={() => {
                      setNewName(user.name);
                      setNewEmail(user.email);
                      setEditUserId(user.id);
                    }}
                  >
                    Edit Post
                  </Button>
                </span>
              </CardContent>
            </Card>
          );
        })}
      </div>
      {!isReachingEnd && (
        <div className="mt-4 text-center">
          <Button onClick={loadMore} disabled={isLoadingMore}>
            {isLoadingMore ? "Loading..." : "Load More"}
          </Button>
        </div>
      )}
    </div>
  );
}
