import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'execom',
  title: 'Execom Members',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      options: {
        list: [
          { title: 'Faculty Advisor', value: 'faculty-advisor' },
          { title: 'Mentor', value: 'mentor' },
          { title: 'Chairperson', value: 'chairperson' },
          { title: 'Vice Chairperson', value: 'vice-chairperson' },
          { title: 'Secretary', value: 'secretary' },
          { title: 'Joint Secretary', value: 'joint-secretary' },
          { title: 'Treasurer', value: 'treasurer' },
          { title: 'Tech Lead', value: 'tech-lead' },
          { title: 'Event Coordinator', value: 'event-coordinator' },
          { title: 'Design Lead', value: 'design-lead' },
          { title: 'Media Lead', value: 'media-lead' },
          { title: 'Content Writer', value: 'content-writer' },
          { title: 'Community Rep', value: 'community-rep' },
          { title: 'Documentation Team', value: 'documentation-team' },
          { title: 'Membership Developer', value: 'membership-developer' },
          { title: 'Volunteer', value: 'volunteer' },
          { title: 'Member', value: 'member' },
        ]
      }
    }),
    defineField({
      name: 'year',
      title: 'Academic Year',
      type: 'string',
      options: {
        list: [
          { title: '2020-2021', value: '2020-21' },
          { title: '2021-2022', value: '2021-22' },
          { title: '2022-2023', value: '2022-23' },
          { title: '2023-2024', value: '2023-24' },
          { title: '2024-2025', value: '2024-25' },
          { title: '2025-2026', value: '2025-26' },
          { title: '2026-2027', value: '2026-27' },
          { title: '2027-2028', value: '2027-28' },
          { title: '2028-2029', value: '2028-29' },
          { title: '2029-2030', value: '2029-30' },
          { title: '2030-2031', value: '2030-31' },
          { title: '2031-2032', value: '2031-32' },
          { title: '2032-2033', value: '2032-33' },
          { title: '2033-2034', value: '2033-34' },
          { title: '2034-2035', value: '2034-35' },
        ],
      },
    }),
    defineField({
      name: 'image',
      title: 'Profile Photo',
      type: 'image',
      options: { hotspot: true }
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'linkedin',
      title: 'LinkedIn URL',
      type: 'url',
    }),
    defineField({
      name: 'github',
      title: 'GitHub URL',
      type: 'url',
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram URL',
      type: 'url',
    }),
  ],
})