import { config, fields, collection, singleton } from '@keystatic/core';

const isDev = process.env.NODE_ENV === 'development';

const generateYears = () => {
  const years = [];
  for (let i = 2024; i <= 2100; i++) {
    years.push({ label: `${i}-${i + 1}`, value: `${i}-${(i + 1).toString().slice(2)}` });
  }
  return years;
};
const yearOptions = generateYears();

export default config({
  ui: {
    brand: { 
      name: 'ISTE CEAL Admin',
      href: '/keystatic'
    },
  },
  storage: isDev 
    ? { kind: 'local' }
    : {
        kind: 'github',
        repo: 'Ash-JP/isteweb',
      },
  collections: {
    events: collection({
      label: 'Events',
      slugField: 'title',
      path: 'src/content/events/*',
      format: { data: 'json' },
      schema: {
        title: fields.slug({ name: { label: 'Event Name' } }),
        year: fields.select({
          label: 'Academic Year',
          options: yearOptions,
          defaultValue: '2024-25',
        }),
        date: fields.date({ label: 'Event Date' }),
        cloudinaryUrl: fields.text({ 
          label: 'Cloudinary Image URL', 
          description: 'Upload your image to Cloudinary and paste the link here.'
        }),
        description: fields.text({ label: 'Description', multiline: true }),
        isRegistrationOpen: fields.checkbox({ label: 'Registration Open?', defaultValue: false }),
        status: fields.select({
          label: 'Event Status',
          options: [
            { label: 'Upcoming', value: 'upcoming' },
            { label: 'Ongoing', value: 'ongoing' },
            { label: 'Completed', value: 'completed' },
          ],
          defaultValue: 'upcoming'
        }),
        featured: fields.checkbox({ label: 'Feature this event?', defaultValue: false }),
        isCountdownEvent: fields.checkbox({ label: 'Show in Countdown Section?', defaultValue: false }),
        registrationLink: fields.text({ label: 'Registration Link' }),
      },
    }),
    execom: collection({
      label: 'Execom Members',
      slugField: 'name',
      path: 'src/content/execom/*',
      format: { data: 'json' },
      schema: {
        name: fields.slug({ name: { label: 'Name' } }),
        role: fields.select({
          label: 'Role',
          options: [
            { label: 'Faculty Advisor', value: 'faculty-advisor' },
            { label: 'Mentor', value: 'mentor' },
            { label: 'Chairperson', value: 'chairperson' },
            { label: 'Vice Chairperson', value: 'vice-chairperson' },
            { label: 'Secretary', value: 'secretary' },
            { label: 'Vice Secretary', value: 'vice-secretary' },
            { label: 'Tech Lead', value: 'tech-lead' },
            { label: 'Developer', value: 'developer' },
            { label: 'Content Writer', value: 'content-writer' },
            { label: 'Documentation Lead', value: 'documentation-lead' },
            { label: 'Media Team', value: 'media-team' },
            { label: 'Design Team', value: 'design-team' },
            { label: 'Event Coordinator', value: 'event-coordinator' },
            { label: 'Treasurer', value: 'treasurer' },
            { label: 'Membership Developer', value: 'membership-developer' },
            { label: 'Community Rep', value: 'community-rep' },
            { label: 'Volunteer', value: 'volunteer' },
            { label: 'Member', value: 'member' },
            { label: 'Other (Custom)', value: 'other' },
          ],
          defaultValue: 'member',
        }),
        customRole: fields.text({ label: 'Custom Role Title (Only if "Other" is selected above)' }),
        year: fields.select({ label: 'Academic Year', options: yearOptions, defaultValue: '2024-25' }),
        cloudinaryUrl: fields.text({ label: 'Profile Photo (Cloudinary URL)' }),
        email: fields.text({ label: 'Email' }),
        linkedin: fields.text({ label: 'LinkedIn URL' }),
        github: fields.text({ label: 'GitHub URL' }),
        instagram: fields.text({ label: 'Instagram URL' }),
      },
    }),
    gallery: collection({
      label: 'Gallery',
      slugField: 'title',
      path: 'src/content/gallery/*',
      format: { data: 'json' },
      schema: {
        title: fields.slug({ name: { label: 'Image Title' } }),
        category: fields.select({
          label: 'Category',
          options: [
            { label: 'Workshop', value: 'Workshop' },
            { label: 'Hackathon', value: 'Hackathon' },
            { label: 'Team Building', value: 'Team Building' },
            { label: 'Conference', value: 'Conference' },
            { label: 'Other', value: 'Other' },
          ],
          defaultValue: 'Other'
        }),
        cloudinaryUrl: fields.text({ label: 'Image (Cloudinary URL)' }),
        date: fields.date({ label: 'Date Taken' }),
      },
    }),
  },
  singletons: {
    homepage: singleton({
      label: 'Homepage Settings',
      path: 'src/content/homepage',
      format: { data: 'json' },
      schema: {
        countdownEventSlug: fields.text({ label: 'Countdown Event Slug' }),
      },
    }),
  },
});
