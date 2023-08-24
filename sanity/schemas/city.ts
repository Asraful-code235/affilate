import { defineField, defineType } from "sanity";

export default defineType({
  name: "city",
  title: "Cities",
  type: "document",
  fields: [
    defineField({
      name: "cityname",
      title: "Enter the city name",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "cityname",
        maxLength: 96,
      },
    }),
  ],
  preview: {
    select: {
      title: "cityname",
    },
  },
});
