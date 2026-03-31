import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'event',
  title: 'Events',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Event Name',
      type: 'string',
    }),
    // IMPROVED SLUG FIELD
    defineField({
      name: 'slug',
      title: 'Slug (URL ID)',
      type: 'slug',
      options: {
        source: 'title', // Automatically generates from the title
        maxLength: 96,
      },
      validation: (rule) => rule.required(), // Forces you to have one
    }),
    defineField({
      name: 'year',
      title: 'Academic Year',
      type: 'string',
      options: {
        list: [
          { title: '2023-2024', value: '2023-24' },
          { title: '2024-2025', value: '2024-25' },
          { title: '2025-2026', value: '2025-26' },
        ],
      },
    }),
    defineField({
      name: 'date',
      title: 'Event Date',
      type: 'datetime',
    }),
    defineField({
      name: 'image',
      title: 'Event Poster',
      type: 'image',
      options: { hotspot: true }
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'isRegistrationOpen',
      title: 'Registration Open?',
      type: 'boolean',
      initialValue: false
    }),
    defineField({
      name: 'status',
      title: 'Event Status',
      type: 'string',
      options: {
        list: [
          { title: 'Upcoming', value: 'upcoming' },
          { title: 'Ongoing', value: 'ongoing' },
          { title: 'Completed', value: 'completed' },
        ],
        layout: 'radio'
      },
      initialValue: 'upcoming'
    }),
    defineField({
      name: 'featured',
      title: 'Feature this event?',
      type: 'boolean',
      description: 'If true, this event will appear in the Hero section',
      initialValue: false
    }),
    defineField({
      name: 'isCountdownEvent',
      title: 'Show in Countdown Section?',
      type: 'boolean',
      description: 'If true, this event will appear in the Homepage Countdown section (Only one should be active)',
      initialValue: false
    }),
    defineField({
      name: 'registrationLink',
      title: 'Registration Link',
      type: 'url',
    }),
  ],
})