import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React from "react";

function Article() {
  const {
    query: { id },
  } = useRouter();
  const articleQuery = useQuery({
    queryKey: ["article", id],
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
  return (
    <div className="px-5 py-3">
      {articleQuery.isLoading ? (
        <div>Loading....</div>
      ) : (
        <>
          <div className="text-2xl mb-6">{articleQuery.data.title}</div>
          <div className="text-base">{articleQuery.data.content}</div>
        </>
      )}
    </div>
  );
}

function ArticlePage() {
  const { query } = useRouter();
  if (query.id) {
    return <Article />;
  }
  return null;
}

export default ArticlePage;
