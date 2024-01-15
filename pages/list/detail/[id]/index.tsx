import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React from "react";

function fetchDetail(id: number) {
  return fetch("/api/detail", {
    method: "POST",
    body: JSON.stringify({
      id,
    }),
  })
    .then((res) => res.json())
    .then((res) => res.data);
}

function Detail() {
  const { query } = useRouter();
  const queryClient = useQueryClient();
  const detailQuery = useQuery({
    queryKey: ["user", Number(query.id)],
    queryFn: () => fetchDetail(Number(query.id)),
    initialData: () => {
      const list = queryClient.getQueryData(["list"]);
      if (list) {
        const detail = (list as any[]).find(
          (item) => item.id == Number(query.id)
        );
        if (detail) return detail;
      }
    },
    staleTime: 1000 * 10,
    initialDataUpdatedAt() {
      // 获取list 查询的状态
      const queryState = queryClient.getQueryState(["list"]);
      if (queryState) {
        console.log(queryState.dataUpdatedAt, "queryState.dataUpdatedAt");
        return queryState.dataUpdatedAt;
      }
    },
  });
  return (
    <div className="p-5">
      {detailQuery.isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1 className=" text-2xl mb-5">{detailQuery.data.title}</h1>
          <p className="  text-base">{detailQuery.data.content}</p>
        </>
      )}
    </div>
  );
}

function DetailPage() {
  const { query } = useRouter();
  if (query.id) {
    return <Detail />;
  }
  return null;
}

export default DetailPage;
