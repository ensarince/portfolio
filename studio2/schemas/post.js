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
      type: 'array',
      name: 'images',
      of: [ // The "of"-property must be set, and it must be an array
        {
          type: 'image', // type is required
          name: 'image1',
          title: 'Image 1'
        },
        {
          type: 'image',
          name: 'image2',
          title: 'Image 2'
        },
        {
          type: 'image',
          name: 'image3',
          title: 'Image 3'
        },{
          type: 'image',
          name: 'image4',
          title: 'Image 4'
        },{
          type: 'image',
          name: 'image5',
          title: 'Image 5'
        },
      ]
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent',
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
