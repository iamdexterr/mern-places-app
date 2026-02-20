import React from "react";
import UserItem from "./UserItem";

const UserList = ({ items }: { items: any[] }) => {
  if (items.length === 0) {
    return (
      <div className="flex items-center justify-center">No users found.</div>
    );
  }

  return items.map((item) => (
    <UserItem
      key={item.id}
      id={item.id}
      image={item.image}
      name={item.name}
      placeCount={item.places}
    />
  ));
};

export default UserList;
