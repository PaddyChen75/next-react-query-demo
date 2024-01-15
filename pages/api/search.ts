import type { NextApiRequest, NextApiResponse } from "next";

interface IContent {
  id: number;
  content: string;
}

const contents: IContent[] = [
  {
    id: 1,
    content: "今天吃什么好呢？？？",
  },
  {
    id: 2,
    content: "天气☁️正不错呀",
  },
  {
    id: 3,
    content: "ReactQuery是一个优秀的状态管理库",
  },
  {
    id: 4,
    content: "我是练习时长一年半的前端",
  },
  {
    id: 5,
    content: "我喜欢React",
  },
];

interface IResponse {
  code: number;
  message: string;
  data?: IContent[];
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponse>
) {
  const { query } = req;
  if (!query.keyworld) {
    return res.status(200).json({
      code: 400,
      message: "error",
    });
  }
  const filteredContents = contents.filter((content) =>
    content.content.includes(query.keyworld as string)
  );

  const responseData = {
    code: 200,
    message: "success",
    data: filteredContents,
  };

  setTimeout(() => {
    res.status(200).json(responseData);
  }, 5000);
}
