import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";

function fetchList() {
  return fetch("/api/list")
    .then((res) => res.json())
    .then((res) => res.data);
}

function List() {
  const listQuery = useQuery({
    queryKey: ["list"],
    queryFn: fetchList,
    staleTime: 1000 * 10,
  });

  return (
    <div>
      {listQuery.isLoading ? (
        <p>Loding....</p>
      ) : (
        <div>
          {listQuery.data.map((item: any) => {
            return (
              <Link
                href={{
                  pathname: "/list/detail/[id]",
                  query: {
                    id: item.id,
                  },
                }}
                key={item.id}
              >
                <div className=" border-solid border border-gray-200 py-2 cursor-pointer px-5">
                  <div>title: {item.title}</div>
                  <div>content: {item.content}</div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default List;
