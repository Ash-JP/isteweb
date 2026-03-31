import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'homepage',
    title: 'Homepage',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Page Title',
            type: 'string',
            hidden: true,
            initialValue: 'Homepage Settings'
        }),
        defineField({
            name: 'countdownEvent',
            title: 'Countdown Event',
            type: 'reference',
            to: [{ type: 'event' }],
            description: 'Select the event to show in the countdown section. If left empty, the next upcoming event will be shown.',
        })
    ]
})
