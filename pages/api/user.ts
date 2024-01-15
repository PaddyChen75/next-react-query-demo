import type { NextApiRequest, NextApiResponse } from "next";

interface UserInfo {
  name: string;
  age: number;
  id: number;
}

interface IResponse {
  code: number;
  message: string;
  data?: UserInfo;
}

const users: UserInfo[] = [
  {
    id: 1,
    name: "paddychen1",
    age: 25,
  },
  {
    id: 2,
    name: "paddychen2",
    age: 26,
  },
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponse>
) {
  const body = JSON.parse(req.body);
  const user = users.find((user) => user.id === Number(body.id));
  let responseData: IResponse = {
    code: 400,
    message: "Not Data",
  };

  if (user) {
    responseData = {
      code: 200,
      message: "success",
      data: user,
    };
  }

  setTimeout(() => {
    res.status(200).json(responseData);
  }, 1000);
}
