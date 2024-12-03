import { defineField, defineType } from "sanity";

export const projectsType = defineType({
    name: 'project',
    title: 'Project',
    type: 'document', 
    fields: [
       defineField({
        name: 'title', 
        title: 'Title',
        type: 'string',
       }), 
       defineField({
        name: 'slug',
        type: 'slug',
        title: 'Slug of Project',
        options:{
            source:'title'
        },
       }),
       defineField({
        name: 'types',
        title:'Project Type',
        type:'array',
        of:[{type:'string'}],
        options: {
          list: [
            {title: 'Design', value:'design'},
            {title: 'Art', value:'art'},
          ],
          layout: 'checkbox',
        },

       }),
       defineField({
        name:'number',
        title: 'Number', 
        type: 'string',
       }),
       defineField({
        name: 'media', 
        title: 'Hero Image', 
        type: 'file',
        options:{
            accept: 'image/*, video/*'
        }, 
        fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',

            }
          ],

       }), 
       defineField({
        name: 'images', 
        title: 'Gallery', 
        type: 'array',
        of: [
            {
                type:'image',
                options:{
                    hotspot: true,
                },
                fields: [
                    {
                      name: 'alttext',
                      type: 'string',
                      title: 'Alternative Text',

                    }
                  ]

            }, 
            {
                type: 'file',
                options:{
                    accept: 'video/*',    
                },
            },

        ],
       }),
       defineField({
        name:'heading',
        title:'Heading',
        type:'text',
       }), 
       defineField({
        name: 'year', 
        title: 'Year',
        type: 'string',

       }),
       defineField({
        name:'description', 
        title:'Description',
        type: 'text',
       }), 
       defineField({
        name: 'hero',
        title: 'Project Card Hero',
        type: 'file',
        options:{
            accept: 'image/*, video/*'
        }, 
        fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',

            }
          ],

       }),
       defineField({
        name: 'role', 
        title: 'Role', 
        type: 'array',
        of: [{type:'string'}],
       }),
       defineField({
        name:'tools',
        title: 'Tools', 
        type: 'array', 
        of: [{type:'string'}],
       }),
       defineField({
        name:'collaborators', 
        title: 'Collaborators', 
        type:'array', 
        of:[{type:'string'}], 
       }), 
       defineField({
        name: 'link', 
        title: 'Link',
        type:'array',
        of:[
            {
                type:'object',
                fields: [
                    {
                      name: 'url',
                      title: 'URL',
                      type: 'url', 
                    },
                    {
                      name: 'title',
                      title: 'Link Title',
                      type: 'string',
                    }
                  ],

            }
        ],
       }),
    ], 
})