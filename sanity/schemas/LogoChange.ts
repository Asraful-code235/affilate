import { defineField, defineType } from "sanity";

export default defineType({
  name: "logo",
  title: "Logo",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "herotext",
      title: "Hero Header Text ",
      type: "string",
    }),
    defineField({
      name: "herosubtext",
      title: "Hero Subheader Text ",
      type: "string",
    }),
    defineField({
      name: "footertext",
      title: "Footer Text ",
      type: "text",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "image",
    },
  },
});
