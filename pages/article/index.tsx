import { useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";

function Articles() {
  const queryClient = useQueryClient();
  const articlesQuery = useQuery({
    queryKey: ["article"],
    queryFn: () =>
      fetch("/api/articles", {
        method: "POST",
      })
        .then((res) => res.json())
        .then((res) => res.data),
    staleTime: 1000 * 60,
  });

  // 发起预请求
  const prefetchArticle = (id: number) => {
    queryClient.prefetchQuery({
      queryKey: ["article", String(id)],
      queryFn: () =>
        fetch("/api/article", {
          method: "POST",
          body: JSON.stringify({
            id,
          }),
        })
          .then((res) => res.json())
          .then((res) => res.data),
      staleTime: 1000 * 60,
    });
  };
  return (
    <div>
      {articlesQuery.isLoading ? (
        <p>Loading....</p>
      ) : (
        <>
          {articlesQuery.data.map((article: any) => {
            return (
              <Link
                href={{
                  pathname: "/article/[id]",
                  query: {
                    id: article.id,
                  },
                }}
                key={article.id}
              >
                <div
                  onMouseEnter={() => {
                    prefetchArticle(article.id);
                  }}
                  className="px-5 py-3 border rounded border-gray-200 cursor-pointer"
                >
                  <div className=" text-xl">title: {article.title}</div>
                  <div className=" text-base text-gray-500 line-clamp-2 text-ellipsis">
                    title: {article.title}
                  </div>
                </div>
              </Link>
            );
          })}
        </>
      )}
    </div>
  );
}

export default Articles;
