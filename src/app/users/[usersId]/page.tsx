"use client";

import NotFound from "@/components/component/Not-Found";
import PageLoader from "@/components/component/PageLoader";
import { Card, CardContent } from "@/components/ui/card";
import { useParams } from "next/navigation";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const API_URL = "https://jsonplaceholder.typicode.com/users";

export default function UserDynamicPage(props: any) {
  const { data, error, isValidating } = useSWR(
    `${API_URL}/${props.params.usersId}`,
    fetcher
  );
  const { usersId } = useParams();
  console.log(usersId);
  console.log(data);
  console.log(error);
  console.log(props.params.postssId);
  if (isValidating)
    return (
      <div>
        <PageLoader />
      </div>
    );
  if (error || !data)
    return (
      <div>
        <NotFound />
      </div>
    );

  return (
    <div className="max-w-[1100px] mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center uppercase">
        Users List
      </h1>
      <div className="space-y-3">
        <Card key={data?.id}>
          <CardContent className="p-4">
            <h2 className="text-lg text-gray-800 font-semibold">
              Name:{" "}
              <span className="text-base text-gray-600 font-medium">
                {data?.name}
              </span>
            </h2>
            <p className="text-lg text-gray-800 font-semibold">
              Email:{" "}
              <span className="text-base text-gray-600 font-medium">
                {data?.email}
              </span>
            </p>
            <p className="text-lg text-gray-800 font-semibold">
              Company Name:{" "}
              <span className="text-base text-gray-600 font-medium">
                {data?.company?.name}
              </span>
            </p>
            <p className="text-lg text-gray-800 font-semibold">
              Website:{" "}
              <span className="text-base text-gray-600 font-medium">
                {data?.website}
              </span>
            </p>
            <p className="text-lg text-gray-800 font-semibold">
              Phone Number:{" "}
              <span className="text-base text-gray-600 font-medium">
                {data?.phone}
              </span>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
