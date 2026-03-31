import { client, urlFor } from "@/sanity/client";
import Image from "next/image";
import Link from "next/link";
import { Calendar, CheckCircle, XCircle } from "lucide-react";
import { notFound } from "next/navigation";

// 1. Fetch the specific event
async function getEvent(slug: string) {
  const query = `*[_type == "event" && slug.current == $slug][0] {
    title,
    date,
    image,
    description,
    isRegistrationOpen,
    registrationLink
  }`;
  
  // This passes the slug correctly to Sanity
  const event = await client.fetch(query, { slug });
  return event;
}

// 2. The Page Component (Fixed for Next.js 15)
export default async function EventDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  
  // Await the params to get the slug
  const { slug } = await params; 
  
  const event = await getEvent(slug);

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Event Not Found</h1>
        <p className="text-gray-600 mb-8">The event you are looking for does not exist or has been removed.</p>
        <Link href="/events" className="text-blue-600 hover:underline">
          &larr; Back to Events
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        
        {/* Event Image */}
        {event.image && (
          <div className="relative h-64 sm:h-96 w-full">
            <Image
              src={urlFor(event.image).url()}
              alt={event.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        <div className="p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 md:mb-0">
              {event.title}
            </h1>
            
            <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${
              event.isRegistrationOpen 
                ? "bg-green-100 text-green-800" 
                : "bg-red-100 text-red-800"
            }`}>
              {event.isRegistrationOpen ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" /> Open
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 mr-2" /> Closed
                </>
              )}
            </span>
          </div>

          <div className="flex items-center text-gray-500 mb-8">
            <Calendar className="w-5 h-5 mr-2" />
            <span className="text-lg font-medium">
              {new Date(event.date).toLocaleDateString("en-IN", {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>

          <div className="prose max-w-none text-gray-700 leading-relaxed mb-10">
            <p className="whitespace-pre-line">{event.description}</p>
          </div>

          {event.isRegistrationOpen && event.registrationLink && (
            <div className="border-t pt-8">
              <Link
                href={event.registrationLink}
                target="_blank"
                className="block w-full text-center bg-blue-600 text-white font-bold py-4 px-8 rounded-xl hover:bg-blue-700 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Register Now
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}