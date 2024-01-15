import type { NextApiRequest, NextApiResponse } from "next";

interface ListItem {
  id: number;
  title: string;
  content: string;
}

interface IResponse {
  code: number;
  message: string;
  data?: ListItem[];
}

const list: ListItem[] = [
  {
    id: 1,
    title: "今天大事件11111111111",
    content:
      "事件的具体内容..............................................................",
  },
  {
    id: 2,
    title: "今天大事件22222222222",
    content:
      "事件的具体内容..............................................................",
  },
  {
    id: 3,
    title: "今天大事件333333333333",
    content:
      "事件的具体内容..............................................................",
  },
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponse>
) {
  const responseData = {
    code: 200,
    message: "success",
    data: list,
  };

  setTimeout(() => {
    res.status(200).json(responseData);
  }, 1000);
}
