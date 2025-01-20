"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const API_URL = "https://jsonplaceholder.typicode.com/users";
const PAGE_SIZE = 3;
export default function UsersService() {
  const [page, setPage] = useState(1);
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const url = `${API_URL}?_page=${page}&_limit=${PAGE_SIZE}`;
  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  useEffect(() => {
    if (data) {
      setAllUsers((prevUsers) => {
        const userMap = new Map(prevUsers.map((user) => [user.id, user]));
        data.forEach((user: any) => userMap.set(user.id, user));
        return Array.from(userMap.values());
      });
    }
  }, [data]);
  const isLoadingMore = isLoading && page > 1;
  const isReachingEnd = data && data.length < PAGE_SIZE;

  const loadMore = () => setPage((prev) => prev + 1);

  // dlte user

  const deleteUser = async (userId: any) => {
    try {
      await fetch(`${API_URL}/${userId}`, {
        method: "DELETE",
      });
      setAllUsers((prevUsers) =>
        prevUsers.filter((user) => user.id !== userId)
      );
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // add user

  const addUser = async (newName: any, newEmail: any) => {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/users/`, {
        method: "POST",
        body: JSON.stringify({
          name: newName,
          email: newEmail,
          userId: 1,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      mutate();
    } catch (err) {
      console.error("Error adding post:", err);
    }
  };

  // update user

  const updateUser = async (
    userId: string,
    newName: string,
    newEmail: string
  ) => {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
        method: "PUT",
        body: JSON.stringify({
          name: newName,
          email: newEmail,
          userId: 1,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      mutate();
    } catch (err) {
      console.error("Error updating post:", err);
    }
  };
  return {
    users: allUsers,
    isLoadingMore,
    isReachingEnd,
    isLoading: isLoading && allUsers.length === 0,
    loadMore,
    isError: error,
    deleteUser,
    addUser,
    updateUser,
  };
}
