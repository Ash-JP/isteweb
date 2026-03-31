import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'gallery',
    title: 'Gallery',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Image Title',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: [
                    { title: 'Workshop', value: 'Workshop' },
                    { title: 'Hackathon', value: 'Hackathon' },
                    { title: 'Team Building', value: 'Team Building' },
                    { title: 'Conference', value: 'Conference' },
                    { title: 'Other', value: 'Other' },
                ],
            },
            initialValue: 'Other',
        }),
        defineField({
            name: 'image',
            title: 'Wait, a Photo?',
            type: 'image',
            options: { hotspot: true },
            fields: [
                {
                    name: 'alt',
                    title: 'Alternative Text',
                    type: 'string',
                    validation: (rule) => rule.required(),
                }
            ],
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'date',
            title: 'Date Taken',
            type: 'date',
            options: {
                dateFormat: 'YYYY-MM-DD',
            },
            initialValue: () => new Date().toISOString().split('T')[0],
        }),
    ],
})
