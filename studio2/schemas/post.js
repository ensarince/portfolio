export default {
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: {type: 'author'},
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          name: 'image',
          title: 'Image',
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'description',
              title: 'description',
              type: 'string',
            },
          ],
        },
      ],
    }
/*     {
      name: 'images',
      title: 'Images',
      type: 'array',
      options: {
        hotspot: true,
      },
      of: [{ type: 'image'}],
    } */
    ,{
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      options: {
        dateFormat: 'DD/MM/YYYY,',
        timeFormat: 'h:ma',
      },
    },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent',
      options: {
        dateFormat: 'YYYY-MM-DD',
      },
    },
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author} = selection
      return Object.assign({}, selection, {
        subtitle: author && `by ${author}`,
      })
    },
  },
}
