// store.js
import { reactive } from "vue";

export const data = reactive({
  stories: [
    {
      title: "First Story",
      parts: [
        {
          date: "July, 10, 2002",
          content: [
            "It was a dark and stormy night. People were doing stuff It was a lot of fun and they had a really good time. The end It was a dark and stormynight. People were doing stuff It was a lot of fun and they had a reallygood time. The endIt was a dark and stormy night. People were doing stuffIt was a lot of fun and they had a really good time. The endIt was a darkand stormy night. People were doing stuff It was a lot of fun and they hada really good time. The endIt was a dark and stormy night. People weredoing stuff It was a lot of fun and they had a really good time. The endItwas a dark and stormy night. People were doing stuff It was a lot of funand they had a really good time. The endIt was a dark and stormy night.People were doing stuff It was a lot of fun and they had a really goodtime. The endIt was a dark and stormy night. People were doing stuff Itwas a lot of fun and they had a really good time. The end",
            "It was a dark and stormy night. People were doing stuff It was a lot of fun and they had a really good time. The end It was a dark and stormynight. People were doing stuff It was a lot of fun and they had a reallygood time. The endIt was a dark and stormy night. People were doing stuffIt was a lot of fun and they had a really good time. The endIt was a darkand stormy night. People were doing stuff It was a lot of fun and they hada really good time. The endIt was a dark and stormy night. People weredoing stuff It was a lot of fun and they had a really good time. The endItwas a dark and stormy night. People were doing stuff It was a lot of funand they had a really good time. The endIt was a dark and stormy night.People were doing stuff It was a lot of fun and they had a really goodtime. The endIt was a dark and stormy night. People were doing stuff Itwas a lot of fun and they had a really good time. The end",
          ],
          comments: [
            {
              name: "Bobbery",
              comment: "Cool story bro",
              upvotes: 12,
            },
          ],
          upvotes: 255,
          downvotes: 10,
        },
        {
          date: "July 12, 2002",
          content: [
            "It was a dark and stormy night. People were doing stuff It was a lot of fun and they had a really good time. The end It was a dark and stormynight. People were doing stuff It was a lot of fun and they had a reallygood time. The endIt was a dark and stormy night. People were doing stuffIt was a lot of fun and they had a really good time. The endIt was a darkand stormy night. People were doing stuff It was a lot of fun and they hada really good time. The endIt was a dark and stormy night. People weredoing stuff It was a lot of fun and they had a really good time. The endItwas a dark and stormy night. People were doing stuff It was a lot of funand they had a really good time. The endIt was a dark and stormy night.People were doing stuff It was a lot of fun and they had a really goodtime. The endIt was a dark and stormy night. People were doing stuff Itwas a lot of fun and they had a really good time. The end",
            "It was a dark and stormy night. People were doing stuff It was a lot of fun and they had a really good time. The end It was a dark and stormynight. People were doing stuff It was a lot of fun and they had a reallygood time. The endIt was a dark and stormy night. People were doing stuffIt was a lot of fun and they had a really good time. The endIt was a darkand stormy night. People were doing stuff It was a lot of fun and they hada really good time. The endIt was a dark and stormy night. People weredoing stuff It was a lot of fun and they had a really good time. The endItwas a dark and stormy night. People were doing stuff It was a lot of funand they had a really good time. The endIt was a dark and stormy night.People were doing stuff It was a lot of fun and they had a really goodtime. The endIt was a dark and stormy night. People were doing stuff Itwas a lot of fun and they had a really good time. The end",
          ],
          comments: [
            {
              name: "Juneauuuu",
              comment: "That's a puppy",
              upvotes: 13,
            },
          ],
          upvotes: 255,
          downvotes: 10,
        },
      ],
    },
    {
      title: "Second Story",
      parts: [
        {
          date: "July, 10, 2002",
          content: ["first paragraph", "Second paragraph"],
          comments: [
            {
              name: "Bobbery",
              comment: "Cool story bro",
              upvotes: 10,
            },
          ],
          upvotes: 255,
          downvotes: 10,
        },
        {
          date: "July 12, 2002",
          content: ["second part first par", "sec part, sec par"],
          comments: [
            {
              name: "Juneauuuu",
              comment: "That's a puppy",
              upvotes: 12,
            },
          ],
          upvotes: 255,
          downvotes: 10,
        },
      ],
    },
  ],
});
