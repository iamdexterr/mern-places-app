import React from "react";
import { Link } from "react-router";

const UserItem = ({
  id,
  image,
  name,
  placeCount,
}: {
  id: string;
  image: string;
  name: string;
  placeCount: number;
}) => {
  return (
    <Link to={`/${id}/places`} className="block">
      <div className="flex items-start gap-4 p-5 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
        <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 border-2 border-gray-200 bg-gray-100 flex items-center justify-center">
          {image ? (
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-xl font-medium text-gray-500">
              {name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2)}
            </span>
          )}
        </div>
        <div className="flex flex-col flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <h2 className="text-lg font-semibold text-gray-900 truncate">
              {name}
            </h2>
          </div>
          <p className="text-sm text-gray-500 mt-0.5">
            {placeCount} {placeCount === 1 ? "Place" : "Places"}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default UserItem;
