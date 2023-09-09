import { defineField, defineType } from "sanity";

export default defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "url",
      title: "Affiliation URL",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: { type: "author" },
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mainImage",
      title: "Main image",
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "photos",
      title: "Photos",
      type: "array",
      of: [{ type: "image" }],
      options: {
        layout: "grid",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "cities",
      title: "Cities",
      type: "array",
      of: [{ type: "reference", to: { type: "city" } }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "states",
      title: "States",
      type: "array",
      of: [{ type: "reference", to: { type: "states" } }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "accessibility",
      title: "Property Accessibility",
      type: "array",
      of: [{ type: "reference", to: { type: "propertyaccessibility" } }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "averageRating",
      title: "AverageRating",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "stars",
      title: "Stars",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "rooms",
      title: "Rooms",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "checkIn",
      title: "Check-in Date",
      type: "datetime",
    }),
    defineField({
      name: "checkOut",
      title: "Check-out Date",
      type: "datetime",
    }),

    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    // defineField({
    //   name: 'body',
    //   title: 'Body',
    //   type: 'blockContent',
    // }),
  ],

  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "mainImage",
    },
    prepare(selection) {
      const { author } = selection;
      return { ...selection, subtitle: author && `by ${author}` };
    },
  },
});
