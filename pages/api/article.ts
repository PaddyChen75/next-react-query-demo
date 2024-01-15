import type { NextApiRequest, NextApiResponse } from "next";

const articles = [
  {
    id: 1,
    title: "The Nuances of Base64 Encoding Strings in JavaScript ",
    subtitle:
      "Base64 provides a way to represent binary data in ASCII strings which may be safer to share and store in certain situations. Matt looks at how to do Base64 encoding and decoding in JavaScript and some areas where you need to take special care.",
    content: `
      As described previously, JavaScript processes strings as UTF-16. But UTF-16 strings have a unique property.

Take the cheese emoji as an example. The emoji (🧀) has a Unicode code point of 129472. Unfortunately, the maximum value for a 16-bit number is 65535! So how does UTF-16 represent this much higher number?

UTF-16 has a concept called surrogate pairs. You can think of it this way:

The first number in the pair specifies which "book" to search in. This is called a "surrogate".
The second number in the pair is the entry in the "book".
As you might imagine, it could sometimes be problematic to only have the number representing the book, but not the actual entry in that book. In UTF-16, this is known as a lone surrogate.

This is particularly challenging in JavaScript, because some APIs work despite having lone surrogates while others fail.

In this case, you're using TextDecoder when decoding back from base64. In particular, the defaults for TextDecoder specify the following:

It defaults to false, which means that the decoder substitutes malformed data with a replacement character.

That � character you observed earlier, which is represented as \uFFFD in hex, is that replacement character. In UTF-16, strings with lone surrogates are considered "malformed" or "not well formed".

There are various web standards (examples 1, 2, 3, 4) that exactly specify when a malformed string affects API behavior, but notably TextDecoder is one of those APIs. It is good practice to make sure that strings are well formed before doing text processing.
      `,
  },
  {
    id: 2,
    title: "event.target.closest ",
    subtitle:
      " If you’ve not used closest, it’s worth being aware of this way to return the closest DOM node that matches a specified CSS selector (based upon traversal of the DOM tree up towards the root).",
    content: `
      Find these particular elements in the DOM and
When the user clicks on one of them, do something.
It wasn’t just me either. I reckon that was 90% of most JavaScript on the web: progressive disclosure widgets, accordions, carousels, and so on.

That’s one of the reasons why jQuery became so popular. That first step (“find these particular elements in the DOM”) used to be a finicky affair involving getElementsByTagName, getElementById, and other long-winded DOM methods. jQuery came along and allowed us to use CSS selectors.

These days, we don’t need jQuery for that because we’ve got querySelector and querySelectorAll (and we can thank jQuery for their existence).

Let’s say you want to add some behaviour to every button element with a class of special. Or maybe you use a data- attribute instead of the class attribute; the same principle applies. You want something special to happen when the user clicks on one of those buttons.

Use querySelectorAll('button.special') to get a list of all the right elements,
Loop through the list, and
Attach addEventListener('click') to each element.
That’s fine for a while. But if you’ve got a lot of special buttons, you’ve now got a lot of event listeners. You might be asking the browser to do a lot of work.

There’s another complication. The code you’ve written runs once, when the page loads. Suppose the contents of the page have changed in the meantime. Maybe elements are swapped in and out using Ajax. If a new special button shows up on the page, it won’t have an event handler attached to it.

You can switch things around. Instead of adding lots of event handlers to lots of elements, you can add one event handler to the root element. Then figure out whether the element that just got clicked is special or not.

That’s where closest comes in. It makes this kind of event handling pretty straightforward.

To start with, attach the event listener to the document:

document.addEventListener('click', doSomethingSpecial, false);
That function doSomethingSpecial will be executed whenever the user clicks on anything. Meanwhile, if the contents of the document are updated via Ajax, no problem!

Use the closest method in combination with the target property of the event to figure out whether that click was something you’re interested in:

function doSomethingSpecial(event) {
  if (event.target.closest('button.special')) {
    // do something
  }
}
There you go. Like querySelectorAll, the closest method takes a CSS selector—thanks again, jQuery!

Oh, and if you want to reduce the nesting inside that function, you can reverse the logic and return early like this:

function doSomethingSpecial(event) {
  if (!event.target.closest('button.special')) return;
  // do something
}
There’s a similar method to closest called matches. But that will only work if the user clicks directly on the element you’re interested in. If the element is nested within other elements, matches might not work, but closest will.

Like Eric said:
      `,
  },
  {
    id: 3,
    title: "UI Component Library for Project Management and Resource Planning",
    subtitle:
      "— Level up your UI with advanced data grids, calendars, schedulers, and Gantt charts.",
    content: `
      Bryntum Grid works in all modern browsers (Chrome, Firefox, Safari, and modern Edge), whatever your target technology is.

You can use Bryntum Grid out of the box or integrate it with the frameworks of your choice and many third-party solutions. Visit the integration section of our documentation for further details:
      `,
  },
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { id } = JSON.parse(req.body);
  const article = articles.find((article) => article.id == id);
  const responseData = {
    code: 200,
    message: "success",
    data: article,
  };

  setTimeout(() => {
    res.status(200).json(responseData);
  }, 1000);
}
