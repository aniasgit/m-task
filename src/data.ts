import { itemType, paramsType } from "./types";

export const DUMMY_DATA = {
  items: [
    {
      has_synonyms: true,
      is_moderator_only: false,
      is_required: false,
      count: 2528642,
      name: "javascript",
    },
    {
      has_synonyms: true,
      is_moderator_only: false,
      is_required: false,
      count: 2191861,
      name: "python",
    },
    {
      has_synonyms: true,
      is_moderator_only: false,
      is_required: false,
      count: 1917176,
      name: "java",
    },
    {
      has_synonyms: true,
      is_moderator_only: false,
      is_required: false,
      count: 1614869,
      name: "c#",
    },
    {
      collectives: [
        {
          tags: ["php"],
          external_links: [
            {
              type: "support",
              link: "https://stackoverflow.com/contact?topic=15",
            },
          ],
          description:
            "A collective where developers working with PHP can learn and connect about the open source scripting language.",
          link: "/collectives/php",
          name: "PHP",
          slug: "php",
        },
      ],
      has_synonyms: true,
      is_moderator_only: false,
      is_required: false,
      count: 1464369,
      name: "php",
    },
    {
      collectives: [
        {
          tags: ["ios", "android"],
          external_links: [
            {
              type: "support",
              link: "https://stackoverflow.com/contact?topic=15",
            },
          ],
          description:
            "A collective for developers who want to share their knowledge and learn more about mobile development practices and platforms",
          link: "/collectives/mobile-dev",
          name: "Mobile Development",
          slug: "mobile-dev",
        },
      ],
      has_synonyms: true,
      is_moderator_only: false,
      is_required: false,
      count: 1417139,
      name: "android",
    },
    {
      has_synonyms: true,
      is_moderator_only: false,
      is_required: false,
      count: 1187282,
      name: "html",
    },
    {
      has_synonyms: true,
      is_moderator_only: false,
      is_required: false,
      count: 1034833,
      name: "jquery",
    },
    {
      has_synonyms: true,
      is_moderator_only: false,
      is_required: false,
      count: 806665,
      name: "c++",
    },
    {
      has_synonyms: true,
      is_moderator_only: false,
      is_required: false,
      count: 804156,
      name: "css",
    },
    {
      collectives: [
        {
          tags: ["ios", "android"],
          external_links: [
            {
              type: "support",
              link: "https://stackoverflow.com/contact?topic=15",
            },
          ],
          description:
            "A collective for developers who want to share their knowledge and learn more about mobile development practices and platforms",
          link: "/collectives/mobile-dev",
          name: "Mobile Development",
          slug: "mobile-dev",
        },
      ],
      has_synonyms: true,
      is_moderator_only: false,
      is_required: false,
      count: 687204,
      name: "ios",
    },
    {
      has_synonyms: true,
      is_moderator_only: false,
      is_required: false,
      count: 670664,
      name: "sql",
    },
    {
      has_synonyms: true,
      is_moderator_only: false,
      is_required: false,
      count: 662009,
      name: "mysql",
    },
    {
      collectives: [
        {
          tags: [
            "dtplyr",
            "stringr",
            "lubridate",
            "r-raster",
            "purrr",
            "plyr",
            "tidyverse",
            "data.table",
            "readr",
            "tidyr",
            "shinydashboard",
            "r-caret",
            "shiny-server",
            "knitr",
            "rvest",
            "r",
            "rstudio",
            "forcats",
            "shiny",
            "quantmod",
            "r-package",
            "ggplot2",
            "dplyr",
            "rlang",
            "zoo",
            "shinyapps",
            "tibble",
          ],
          external_links: [
            {
              type: "support",
              link: "https://stackoverflow.com/contact?topic=15",
            },
          ],
          description:
            "A collective where data scientists and AI researchers gather to find, share, and learn about R and other subtags like knitr and dplyr.",
          link: "/collectives/r-language",
          name: "R Language",
          slug: "r-language",
        },
      ],
      has_synonyms: true,
      is_moderator_only: false,
      is_required: false,
      count: 505434,
      name: "r",
    },
    {
      has_synonyms: true,
      is_moderator_only: false,
      is_required: false,
      count: 476528,
      name: "reactjs",
    },
    {
      has_synonyms: true,
      is_moderator_only: false,
      is_required: false,
      count: 471952,
      name: "node.js",
    },
    {
      has_synonyms: true,
      is_moderator_only: false,
      is_required: false,
      count: 416672,
      name: "arrays",
    },
    {
      has_synonyms: false,
      is_moderator_only: false,
      is_required: false,
      count: 403879,
      name: "c",
    },
    {
      has_synonyms: true,
      is_moderator_only: false,
      is_required: false,
      count: 374625,
      name: "asp.net",
    },
    {
      has_synonyms: true,
      is_moderator_only: false,
      is_required: false,
      count: 360314,
      name: "json",
    },
  ],
  total: 20,
};

const compareCount = (a: itemType, b: itemType) => {
  return a.count - b.count;
};

const compareName = (a: itemType, b: itemType) => {
  const nameA = a.name.toUpperCase();
  const nameB = b.name.toUpperCase();
  if (nameA < nameB) {
    return -1;
  } else if (nameA > nameB) {
    return 1;
  }

  return 0;
};

export const getData = (params: paramsType) => {
  console.log(params);
  const items = [...DUMMY_DATA.items];

  if (params.sort === "name") {
    items.sort(compareName);
  } else if (params.sort === "popular") {
    items.sort(compareCount);
  }

  if (params.order === "desc") {
    items.reverse();
  }

  const startIndex = (params.page - 1) * params.pageSize;
  const endIndex = startIndex + params.pageSize;

  const resultItems = items.slice(startIndex, endIndex);

  console.log(resultItems);
  return { items: resultItems, total: DUMMY_DATA.items.length };
};
