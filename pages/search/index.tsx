import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";

function searchContent(keyworld: string) {
  return fetch(`/api/search?keyworld=${keyworld}`)
    .then((res) => res.json())
    .then((res) => res.data);
}

function useDebounce(fn: Function, delay = 300) {
  let timer: any = null;
  let fnRef = useRef(fn);

  return function debounceFn(...params: any) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => fnRef.current(...params), delay);
  };
}

function Search() {
  const queryClient = useQueryClient();
  const [keyworld, setKeyworld] = useState("");
  const searchQuery = useQuery({
    queryKey: ["search", keyworld],
    queryFn: ({ signal }) => {
      return fetch(`/api/search?keyworld=${keyworld}`, { signal })
        .then((res) => res.json())
        .then((res) => res.data);
    },
    enabled: !!keyworld,
  });

  const debounceSetKeyworld = useDebounce(setKeyworld);

  useEffect(() => {
    if (!keyworld) {
      queryClient.setQueryData(["search", keyworld], undefined);
    }
  }, [keyworld]);

  return (
    <div className="flex justify-center items-start w-screen h-screen">
      <div className="flex flex-col justify-center items-center mt-40">
        <h1 className="text-2xl mb-2">搜索内容</h1>
        <div className=" flex flex-row items-center gap-x-2 mb-4">
          <input
            onChange={(e) => {
              debounceSetKeyworld(e.target.value.trim());
            }}
            className="border border-gray-300 rounded indent-2"
            placeholder="请输入内容"
          />
        </div>

        <div className=" self-start mt-2">
          {searchQuery.isLoading && searchQuery.isPending ? (
            <p>Loading...</p>
          ) : null}

          {searchQuery.isSuccess ? (
            <div className="space-y-2">
              {searchQuery.data.map((content: any) => {
                return (
                  <div
                    className="space-y-2 border border-r-gray-200 px-2"
                    key={content.id}
                  >
                    <p className=" text-base">{content.content}</p>
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Search;
