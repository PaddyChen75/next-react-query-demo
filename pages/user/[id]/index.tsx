import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

function User() {
  const { query } = useRouter();
  const userQuery = useQuery({
    queryKey: ["user", query.id],
    queryFn: () =>
      fetch("/api/user", {
        method: "POST",
        body: JSON.stringify({
          id: query.id,
        }),
      })
        .then((res: any) => {
          return res.json();
        })
        .then((res) => res.data),
    staleTime: 1000 * 10, // 5秒后数据将过期
    placeholderData: {
      id: "--",
      name: "--",
      age: "--",
    },
  });

  return (
    <div className="p-5">
      <h1 className=" text-2xl mb-5">user info</h1>
      <div>
        {userQuery.isLoading ? (
          <p>Loading....</p>
        ) : (
          <div className="p-4 border border-gray-200 w-64 flex flex-col justify-center">
            <div className="text-wrap w-64">name: {userQuery.data.name}</div>
            <div className="text-wrap w-64">age: {userQuery.data.age}</div>
          </div>
        )}
      </div>
    </div>
  );
}

function UserPage() {
  const { query } = useRouter();
  if (query.id) {
    return <User />;
  }
  return null;
}

export default UserPage;
