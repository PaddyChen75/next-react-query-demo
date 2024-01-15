import type { NextApiRequest, NextApiResponse } from "next";

const articles = [
  {
    id: 1,
    title: "The Nuances of Base64 Encoding Strings in JavaScript ",
    subtitle:
      "Base64 provides a way to represent binary data in ASCII strings which may be safer to share and store in certain situations. Matt looks at how to do Base64 encoding and decoding in JavaScript and some areas where you need to take special care.",
  },
  {
    id: 2,
    title: "event.target.closest ",
    subtitle:
      " If you’ve not used closest, it’s worth being aware of this way to return the closest DOM node that matches a specified CSS selector (based upon traversal of the DOM tree up towards the root).",
  },
  {
    id: 3,
    title: "UI Component Library for Project Management and Resource Planning",
    subtitle:
      "— Level up your UI with advanced data grids, calendars, schedulers, and Gantt charts.",
  },
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const responseData = {
    code: 200,
    message: "success",
    data: articles,
  };

  setTimeout(() => {
    res.status(200).json(responseData);
  }, 1000);
}
