import { defineField, defineType } from "sanity";

export default defineType({
  name: "states",
  title: "States",
  type: "document",
  fields: [
    defineField({
      name: "cityname",
      title: "Enter the State name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "cityname",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "cities",
      title: "Cities",
      type: "array",
      of: [{ type: "reference", to: { type: "city" } }],
    }),
  ],
  preview: {
    select: {
      title: "cityname",
    },
  },
});
