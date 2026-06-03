import React from "react";
import UserItem from "./UserItem";
import { useGetUsers } from "@/hooks/useUsers";
import { Loader } from "lucide-react";

type User = {
  id: string;
  name: string;
  image: string;
  places: string[];
};

const UserList = () => {
  const { data: userList, isLoading, isError } = useGetUsers();

  const items = userList?.data;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center text-xl gap-4">
        <Loader /> Loading...{" "}
      </div>
    );
  }
  if (isError || !userList) {
    return <div>Something went wrong.</div>;
  }
  if (items?.length === 0) {
    return (
      <div className="flex items-center justify-center">No users found.</div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item: User) => (
        <UserItem
          key={item.id}
          id={item.id}
          image={item.image}
          name={item.name}
          placeCount={item.places.length}
        />
      ))}
    </div>
  );
};

export default UserList;
