import { useMemo, useState } from 'react'

type IconName = 'arrow' | 'calendar' | 'chevron' | 'pin' | 'search' | 'wave'

function Icon({ name, className = 'h-5 w-5' }: { name: IconName; className?: string }) {
  const paths: Record<IconName, React.ReactNode> = {
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    calendar: <><path d="M6 2v4M18 2v4M3 9h18" /><rect x="3" y="4" width="18" height="17" rx="2" /></>,
    chevron: <path d="m9 18 6-6-6-6" />,
    pin: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    wave: <><path d="M3 9c3-3 6 3 9 0s6 3 9 0M3 15c3-3 6 3 9 0s6 3 9 0" /></>,
  }

  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  )
}

type EventItem = {
  day: string
  lastDay?: string
  weekday: string
  date: string
  time: string
  title: string
  venue: string
  price?: string
  description: string
  image: string
  url: string
}

const events: EventItem[] = [
  {
    day: '25', weekday: 'WED', date: 'Nov 25', time: '7:00 PM',
    title: 'Tampa Bay Lightning vs. Carolina Hurricanes',
    venue: 'Benchmark International Arena · Tampa',
    description: 'Come cheer on the Lightning as they take on the Carolina Hurricanes.',
    image: 'https://thatssotampa.com/wp-content/uploads/2024/03/423249448_10161556265748641_691108566078644159_n.jpg',
    url: 'https://thatssotampa.com/event/tampa-bay-lightning-vs-carolina-hurricanes/',
  },
  {
    day: '25', weekday: 'WED', date: 'Nov 25', time: '7:00–9:00 PM',
    title: 'Big Picture: Midnight Cowboy (1969)',
    venue: 'Tampa Theatre · Downtown Tampa', price: '$10–$13',
    description: 'Catch the 1969 classic on the big screen at the historic Tampa Theatre.',
    image: 'https://thatssotampa.com/wp-content/uploads/2026/11/midnightcowboy_fb.jpg',
    url: 'https://thatssotampa.com/event/big-picture-midnight-cowboy-1969/',
  },
  {
    day: '25', weekday: 'WED', date: 'Nov 25', time: '8:00–10:00 PM',
    title: 'Movie Night at Lower Deck: The Nightmare Before Christmas',
    venue: 'Lower Deck · Harbour Island', price: 'Free',
    description: 'Movie night on the deck with fresh popcorn, movie snacks, and waterfront views.',
    image: 'https://thatssotampa.com/wp-content/uploads/2026/10/Movie-Night-at-Lower-Deck-The-Nightmare-Before-Christmas.jpg',
    url: 'https://thatssotampa.com/event/movie-night-at-lower-deck-the-nightmare-before-christmas/',
  },
  {
    day: '26', weekday: 'THU', date: 'Nov 26', time: '10:00 AM–9:00 PM',
    title: 'Thanksgiving Three-Course Chef’s Feast',
    venue: 'Rusty Pelican Tampa · Rocky Point', price: '$30–$89',
    description: 'Celebrate Thanksgiving with a waterfront chef’s feast, seasonal favorites, and holiday desserts.',
    image: 'https://thatssotampa.com/wp-content/uploads/2026/10/RPT_Thanksgiving_1-scaled.jpg',
    url: 'https://thatssotampa.com/event/thanksgiving-three-course-chefs-feast/',
  },
  {
    day: '26', weekday: 'THU', date: 'Nov 26', time: '11:00 AM–10:00 PM',
    title: 'Celebrate Thanksgiving at Che Vita',
    venue: 'Che Vita Tampa · Downtown', price: '$55',
    description: 'Leave the cooking to the team at Che Vita and gather around the table for Thanksgiving.',
    image: 'https://thatssotampa.com/wp-content/uploads/2026/10/Che-Vita-Thanksgiving-Carousel-Insta-Post.jpg',
    url: 'https://thatssotampa.com/event/celebrate-thanksgiving-at-che-vita/',
  },
  {
    day: '26', weekday: 'THU', date: 'Nov 26', time: '2:00–8:00 PM',
    title: 'Thanksgiving Feast at Hotel Haya',
    venue: 'Flor Fina · Ybor City', price: '$25–$85',
    description: 'Enjoy a festive holiday spread with roasted turkey, prime rib, seasonal sides, and dessert.',
    image: 'https://thatssotampa.com/wp-content/uploads/2026/11/Screenshot-2026-11-03-123045.jpg',
    url: 'https://thatssotampa.com/event/thanksgiving-feast-at-hotel-haya/',
  },
  {
    day: '27', lastDay: '28', weekday: 'FRI', date: 'Nov 27–28', time: 'Multiple showtimes',
    title: 'Red Grant',
    venue: 'Funny Bone Comedy Club · Ybor City', price: '$32',
    description: 'Comedian Red Grant brings his high-energy stand-up to Tampa for a weekend of shows.',
    image: 'https://thatssotampa.com/wp-content/uploads/2026/09/image-94.jpg',
    url: 'https://thatssotampa.com/event/red-grant/',
  },
  {
    day: '27', lastDay: '29', weekday: 'FRI', date: 'Nov 27–29', time: 'All day',
    title: 'The Doll Lady Estate Sale — A Lifetime Collection',
    venue: '3312 W Barcelona St · South Tampa', price: '$1',
    description: 'Explore a three-day collection of vintage jewelry, watches, art, collectibles, and more.',
    image: 'https://thatssotampa.com/wp-content/uploads/2026/11/flyer-v2-1.jpg',
    url: 'https://thatssotampa.com/event/the-doll-lady-estate-sale-a-lifetime-collection/',
  },
  {
    day: '27', lastDay: '29', weekday: 'FRI', date: 'Nov 27–29', time: 'All day',
    title: 'Sanding Ovations 2026',
    venue: 'Treasure Island Beach · Treasure Island',
    description: 'Watch master sculptors transform sand and water into extraordinary works of art.',
    image: 'https://thatssotampa.com/wp-content/uploads/2026/11/Sanding-Ovations-2026-VRQlzp.png',
    url: 'https://thatssotampa.com/event/sanding-ovations-2026/',
  },
  {
    day: '27', weekday: 'FRI', date: 'Nov 27', time: '3:00 PM',
    title: 'Tampa Bay Lightning vs. Ottawa Senators',
    venue: 'Benchmark International Arena · Tampa',
    description: 'Cheer on the Bolts as Tampa Bay faces the Ottawa Senators.',
    image: 'https://thatssotampa.com/wp-content/uploads/2024/03/423249448_10161556265748641_691108566078644159_n.jpg',
    url: 'https://thatssotampa.com/event/tampa-bay-lightning-vs-ottawa-senators/',
  },
  {
    day: '27', weekday: 'FRI', date: 'Nov 27', time: '6:00 PM',
    title: 'Christmas Tree Lighting at Dinosaur World',
    venue: 'Dinosaur World · Plant City', price: 'Free',
    description: 'Kick off the holiday season with an outdoor tree lighting and a visit from Santa.',
    image: 'https://thatssotampa.com/wp-content/uploads/2026/11/Glowing-Rainbow-Christmas-Tree-at-Dusk_2.jpg',
    url: 'https://thatssotampa.com/event/christmas-tree-lighting-at-dinosaur-world/',
  },
  {
    day: '28', weekday: 'SAT', date: 'Nov 28', time: 'All day',
    title: 'Small Business Saturday at Hyde Park Village',
    venue: 'Hyde Park Village · South Tampa',
    description: 'Shop local boutiques, restaurants, and specialty shops during this neighborhood celebration.',
    image: 'https://thatssotampa.com/wp-content/uploads/2026/11/small-biz-saturday.jpg',
    url: 'https://thatssotampa.com/event/small-business-saturday-at-hyde-park-village/',
  },
  {
    day: '28', lastDay: '29', weekday: 'SAT', date: 'Nov 28–29', time: 'All day',
    title: 'Shopapalooza Festival',
    venue: 'Vinoy Park · St. Petersburg',
    description: 'Spend the weekend shopping local makers and independent businesses along the waterfront.',
    image: 'https://thatssotampa.com/wp-content/uploads/2026/09/palooza-1_orig-ZBvv7Z.jpg',
    url: 'https://thatssotampa.com/event/shopapalooza-festival/',
  },
  {
    day: '28', weekday: 'SAT', date: 'Nov 28', time: '8:00–10:00 AM',
    title: 'Motors on MacDill',
    venue: '1983 · South Tampa', price: 'Free',
    description: 'Start Saturday with classic cruisers, custom builds, breakfast, and complimentary coffee.',
    image: 'https://thatssotampa.com/wp-content/uploads/2026/10/Motors-on-MacDill.jpg',
    url: 'https://thatssotampa.com/event/motors-on-macdill-2/',
  },
  {
    day: '28', weekday: 'SAT', date: 'Nov 28', time: '10:00–11:30 AM',
    title: 'West Tampa Black History Walking Tour',
    venue: 'Bob Buckhorn River Center · Downtown', price: '$25',
    description: 'Explore West Tampa’s Black history with local historian Fred Hearns.',
    image: 'https://thatssotampa.com/wp-content/uploads/2026/11/Blowing-the-Man-Down-South-by-George-White-16.jpg',
    url: 'https://thatssotampa.com/event/west-tampa-black-history-walking-tour/',
  },
  {
    day: '28', weekday: 'SAT', date: 'Nov 28', time: '10:00 AM–2:00 PM',
    title: 'Sunshine Market at Midtown Tampa',
    venue: 'Midtown Commons · Midtown Tampa', price: 'Free',
    description: 'Browse local makers, fresh food, art, jewelry, and more, with live music on the green.',
    image: 'https://thatssotampa.com/wp-content/uploads/2024/12/https___cdn.evbuc_.com_images_836405429_153964055593_1_original-e1733759230462.jpg',
    url: 'https://thatssotampa.com/event/sunshine-market-at-midtown-tampa/2026-11-28/',
  },
  {
    day: '28', weekday: 'SAT', date: 'Nov 28', time: '10:00 AM–2:00 PM',
    title: 'Family Day: Director’s Cut',
    venue: 'Tampa Bay History Center · Water Street', price: '$18.95',
    description: 'Get hands-on with the creative techniques behind filmmaking, from Foley to costume design.',
    image: 'https://thatssotampa.com/wp-content/uploads/2026/10/Directors-Cut-Family-Day_1920x1080-WEB-SAFE.jpg',
    url: 'https://thatssotampa.com/event/family-day-directors-cut/',
  },
  {
    day: '28', weekday: 'SAT', date: 'Nov 28', time: '10:00 AM–3:00 PM',
    title: 'Fall Into Fashion Event',
    venue: 'Westchase Town Center · Westchase', price: 'Free',
    description: 'Discover a curated mix of fashion, jewelry, plants, pets, and holiday finds from local makers.',
    image: 'https://thatssotampa.com/wp-content/uploads/2026/11/Fall-Into-Fashion-4.jpg',
    url: 'https://thatssotampa.com/event/fall-into-fashion-event/',
  },
  {
    day: '28', weekday: 'SAT', date: 'Nov 28', time: '10:00 AM–4:00 PM',
    title: 'Handcrafted for Good',
    venue: 'Florida School of Woodwork · Tampa Heights', price: 'Free',
    description: 'Meet local makers and explore woodworking, creativity, and craft at this open-house fundraiser.',
    image: 'https://thatssotampa.com/wp-content/uploads/2026/11/Handcrafted-for-Good-Flyer-copy.jpg',
    url: 'https://thatssotampa.com/event/handcrafted-for-good/',
  },
  {
    day: '28', weekday: 'SAT', date: 'Nov 28', time: '10:00 AM–5:00 PM',
    title: 'Heights Holiday Small Business Saturday Tour',
    venue: 'The Disco Dolls Studio · Tampa Heights', price: 'Free',
    description: 'Pick up a shopping passport and tour neighborhood businesses while supporting local shops.',
    image: 'https://thatssotampa.com/wp-content/uploads/2026/11/smallbusiness.jpg',
    url: 'https://thatssotampa.com/event/heights-holiday-small-business-saturday-tour/',
  },
]

const dates = [
  { day: '25', weekday: 'WED', label: 'Wed, Nov 25' },
  { day: '26', weekday: 'THU', label: 'Thu, Nov 26' },
  { day: '27', weekday: 'FRI', label: 'Fri, Nov 27' },
  { day: '28', weekday: 'SAT', label: 'Sat, Nov 28' },
  { day: '29', weekday: 'SUN', label: 'Sun, Nov 29' },
]

export default function EventsPage() {
  const [query, setQuery] = useState('')
  const [selectedDate, setSelectedDate] = useState('all')
  const [freeOnly, setFreeOnly] = useState(false)
  const [view, setView] = useState<'list' | 'calendar'>('list')

  const filteredEvents = useMemo(() => {
    const searchTerm = query.trim().toLowerCase()
    return events.filter((event) => {
      const matchesQuery = !searchTerm || `${event.title} ${event.venue} ${event.description}`.toLowerCase().includes(searchTerm)
      const matchesDate = selectedDate === 'all' || Number(event.day) <= Number(selectedDate) && Number(event.lastDay ?? event.day) >= Number(selectedDate)
      const matchesPrice = !freeOnly || event.price === 'Free'
      return matchesQuery && matchesDate && matchesPrice
    })
  }, [freeOnly, query, selectedDate])

  const groupedEvents = dates.map((date) => ({
    ...date,
    events: filteredEvents.filter((event) => selectedDate === 'all'
      ? event.day === date.day
      : selectedDate === date.day && Number(event.day) <= Number(date.day) && Number(event.lastDay ?? event.day) >= Number(date.day)),
  })).filter((date) => date.events.length > 0)

  return (
    <div className="min-h-screen bg-[#f7f3ea] text-[#113b3d]">
      <header className="absolute inset-x-0 top-0 z-30">
        <div className="mx-auto flex h-24 max-w-[1440px] items-center justify-between px-5 text-white sm:px-8 lg:px-12">
          <a href="/" className="group flex items-center gap-3" aria-label="Tampa Bay home">
            <span className="grid h-11 w-11 place-items-center rounded-full border border-white/50 bg-white/10 backdrop-blur">
              <Icon name="wave" className="h-6 w-6" />
            </span>
            <span className="leading-none">
              <strong className="block font-display text-[1.35rem] font-normal tracking-wide">TAMPA BAY</strong>
              <span className="mt-1 block text-[9px] font-bold tracking-[.34em] text-white/75">FLORIDA</span>
            </span>
          </a>
          <nav className="hidden items-center gap-8 text-[12px] font-bold tracking-[.13em] lg:flex">
            <a className="nav-link" href="/#discover">THINGS TO DO</a>
            <a className="nav-link text-[#ffcf63]" href="/events" aria-current="page">EVENTS</a>
            <a className="nav-link" href="/#plan">PLAN YOUR TRIP</a>
            <a className="nav-link" href="/#about">OUR TAMPA</a>
          </nav>
          <div className="flex items-center gap-2">
            <a href="https://thatssotampa.com/event-submissions/" target="_blank" rel="noreferrer" className="hidden h-10 items-center gap-2 rounded-full border border-white/40 px-4 text-[11px] font-bold tracking-wider transition hover:bg-white hover:text-[#113b3d] sm:flex">
              SUBMIT AN EVENT <Icon name="arrow" className="h-3.5 w-3.5" />
            </a>
            <a href="#events" className="grid h-11 w-11 place-items-center rounded-full border border-white/40 bg-black/10 lg:hidden" aria-label="Browse events">
              <Icon name="calendar" className="h-4 w-4" />
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="hero relative flex min-h-[620px] items-end overflow-hidden px-5 pb-12 pt-32 text-white sm:px-8 lg:px-12 lg:pb-16">
          <div className="absolute inset-0">
            <img src="/images/tampa-waterfront.png" alt="" className="h-full w-full object-cover object-center" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,42,44,.78)_0%,rgba(7,37,39,.32)_50%,rgba(4,27,30,.12)_100%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(5,32,34,.62)_0%,transparent_48%,rgba(3,24,26,.35)_100%)]" />
          </div>
          <div className="relative z-10 mx-auto flex w-full max-w-[1344px] flex-col justify-between gap-10 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="flex items-center gap-3 text-[10px] font-bold tracking-[.24em] text-[#ffcf63]"><span className="h-px w-8 bg-[#ffcf63]" />WHAT&apos;S ON IN TAMPA BAY</p>
              <h1 className="mt-5 font-display text-[clamp(3.2rem,7vw,6.1rem)] leading-[.9] tracking-[-.045em]">Make room for<br /><span className="italic text-[#ffcf63]">a good time.</span></h1>
              <p className="mt-6 max-w-lg text-sm leading-6 text-white/75 sm:text-base">From game nights to neighborhood markets, find your next Tampa Bay moment.</p>
            </div>
            <div className="flex items-center gap-4 border-t border-white/25 pt-5 md:border-l md:border-t-0 md:pl-8 md:pt-0">
              <span className="grid h-12 w-12 place-items-center rounded-full border border-[#ffcf63]/60 text-[#ffcf63]"><Icon name="calendar" /></span>
              <div>
                <p className="text-[9px] font-bold tracking-[.18em] text-white/55">UP NEXT</p>
                <p className="mt-1 font-display text-2xl">November 25–29</p>
                <p className="mt-1 text-xs text-white/60">20 ways to get out and explore</p>
              </div>
            </div>
          </div>
        </section>

        <section id="events" className="px-5 py-12 sm:px-8 sm:py-16">
          <div className="mx-auto max-w-[1240px]">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <p className="eyebrow">YOUR LOCAL EVENT GUIDE</p>
                <h2 className="mt-4 font-display text-4xl tracking-[-.025em] sm:text-5xl">Events in Tampa Bay</h2>
                <p className="mt-3 text-sm text-[#31595a]">Find something good happening around the bay.</p>
              </div>
              <div className="flex items-center gap-1 self-start rounded-full border border-[#123b3d]/15 bg-white p-1 md:self-auto" aria-label="Event view">
                <button onClick={() => setView('list')} className={`rounded-full px-4 py-2 text-[10px] font-bold tracking-[.1em] transition ${view === 'list' ? 'bg-[#123b3d] text-white' : 'text-[#123b3d]/65 hover:text-[#123b3d]'}`} aria-pressed={view === 'list'}>LIST</button>
                <button onClick={() => setView('calendar')} className={`rounded-full px-4 py-2 text-[10px] font-bold tracking-[.1em] transition ${view === 'calendar' ? 'bg-[#123b3d] text-white' : 'text-[#123b3d]/65 hover:text-[#123b3d]'}`} aria-pressed={view === 'calendar'}>BY DATE</button>
              </div>
            </div>

            <div className="mt-8 grid gap-3 rounded-2xl border border-[#123b3d]/10 bg-white p-3 shadow-[0_8px_30px_rgba(17,59,61,.04)] md:grid-cols-[1fr_auto] md:items-center md:p-4">
              <label className="flex min-h-12 items-center gap-3 rounded-xl bg-[#faf8f2] px-4">
                <Icon name="search" className="h-5 w-5 shrink-0 text-[#e55e3d]" />
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search events, places, or neighborhoods"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-[#123b3d]/45"
                  aria-label="Search events"
                />
              </label>
              <label className="flex min-h-12 cursor-pointer items-center gap-2 rounded-xl px-3 text-xs font-semibold text-[#31595a]">
                <input type="checkbox" checked={freeOnly} onChange={(event) => setFreeOnly(event.target.checked)} className="h-4 w-4 accent-[#e55e3d]" />
                Free events
              </label>
              <div className="flex flex-wrap gap-2 border-t border-[#123b3d]/10 pt-3 md:col-span-2 md:pt-4">
                <button onClick={() => setSelectedDate('all')} className={`rounded-full px-4 py-2 text-[10px] font-bold tracking-[.08em] transition ${selectedDate === 'all' ? 'bg-[#ffcf63] text-[#123b3d]' : 'bg-[#faf8f2] text-[#31595a] hover:bg-[#f1ece0]'}`} aria-pressed={selectedDate === 'all'}>ALL DATES</button>
                {dates.map((date) => (
                  <button key={date.day} onClick={() => setSelectedDate(date.day)} className={`rounded-full px-4 py-2 text-[10px] font-bold tracking-[.08em] transition ${selectedDate === date.day ? 'bg-[#ffcf63] text-[#123b3d]' : 'bg-[#faf8f2] text-[#31595a] hover:bg-[#f1ece0]'}`} aria-pressed={selectedDate === date.day}>{date.label}</button>
                ))}
                {(query || selectedDate !== 'all' || freeOnly) && (
                  <button onClick={() => { setQuery(''); setSelectedDate('all'); setFreeOnly(false) }} className="ml-auto px-3 py-2 text-[10px] font-bold tracking-[.08em] text-[#e55e3d] hover:underline">CLEAR FILTERS</button>
                )}
              </div>
            </div>

            <div className="mb-5 mt-8 flex items-center justify-between">
              <p className="text-xs text-[#31595a]"><strong className="text-[#123b3d]">{filteredEvents.length}</strong> events to explore</p>
              <p className="hidden text-[10px] font-bold tracking-[.16em] text-[#31595a]/65 sm:block">TAMPA BAY · NOVEMBER 2026</p>
            </div>

            {filteredEvents.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-[#123b3d]/20 bg-white px-6 py-16 text-center">
                <p className="font-display text-2xl">No events found</p>
                <p className="mt-2 text-sm text-[#31595a]">Try a different search or clear your filters.</p>
                <button onClick={() => { setQuery(''); setSelectedDate('all'); setFreeOnly(false) }} className="mt-5 rounded-full bg-[#123b3d] px-5 py-3 text-[10px] font-bold tracking-[.12em] text-white">SHOW ALL EVENTS</button>
              </div>
            ) : view === 'list' ? (
              <div className="space-y-9">
                {groupedEvents.map((group) => (
                  <section key={group.day} aria-labelledby={`date-${group.day}`}>
                    <div className="mb-3 flex items-center gap-3">
                      <h3 id={`date-${group.day}`} className="font-display text-xl">{group.label}</h3>
                      <span className="h-px flex-1 bg-[#123b3d]/10" />
                      <span className="text-[9px] font-bold tracking-[.12em] text-[#31595a]/60">{group.events.length} {group.events.length === 1 ? 'EVENT' : 'EVENTS'}</span>
                    </div>
                    <div className="space-y-3">
                      {group.events.map((event) => (
                        <article key={event.title} className="group grid overflow-hidden rounded-2xl border border-[#123b3d]/10 bg-white transition hover:border-[#e55e3d]/35 hover:shadow-[0_12px_35px_rgba(17,59,61,.08)] sm:grid-cols-[170px_1fr] lg:grid-cols-[170px_1fr_auto]">
                          <a href={event.url} target="_blank" rel="noreferrer" className="relative block min-h-[190px] overflow-hidden bg-[#e8e2d5] sm:min-h-[170px]" aria-label={`Details for ${event.title}`}>
                            <img src={event.image} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                            <span className="absolute left-3 top-3 rounded-full bg-[#fffdf8]/95 px-3 py-1.5 text-[9px] font-bold tracking-[.08em] text-[#123b3d]">{event.price ?? 'EVENT'}</span>
                          </a>
                          <div className="flex flex-col justify-center p-5 sm:p-6">
                            <p className="text-[10px] font-bold tracking-[.12em] text-[#e55e3d]">{event.date} <span className="mx-1 text-[#123b3d]/30">·</span> {event.time}</p>
                            <h4 className="mt-2 font-display text-2xl leading-tight transition group-hover:text-[#e55e3d] sm:text-[1.7rem]">
                              <a href={event.url} target="_blank" rel="noreferrer">{event.title}</a>
                            </h4>
                            <p className="mt-2 flex items-center gap-2 text-xs text-[#31595a]"><Icon name="pin" className="h-3.5 w-3.5 shrink-0 text-[#e55e3d]" />{event.venue}</p>
                            <p className="mt-3 line-clamp-2 max-w-3xl text-sm leading-6 text-[#31595a]/80">{event.description}</p>
                          </div>
                          <a href={event.url} target="_blank" rel="noreferrer" className="hidden items-center justify-center self-center rounded-full border border-[#123b3d]/20 p-3 text-[#123b3d] transition hover:border-[#e55e3d] hover:bg-[#e55e3d] hover:text-white lg:mr-6 lg:flex" aria-label={`More about ${event.title}`}>
                            <Icon name="arrow" className="h-4 w-4" />
                          </a>
                        </article>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {groupedEvents.map((group) => (
                  <section key={group.day} className="rounded-2xl border border-[#123b3d]/10 bg-white p-5">
                    <div className="flex items-baseline justify-between border-b border-[#123b3d]/10 pb-4">
                      <h3 className="font-display text-xl">{group.label}</h3>
                      <span className="text-[9px] font-bold tracking-[.1em] text-[#e55e3d]">{group.events.length} EVENTS</span>
                    </div>
                    <div className="divide-y divide-[#123b3d]/10">
                      {group.events.map((event) => (
                        <a key={event.title} href={event.url} target="_blank" rel="noreferrer" className="group block py-4">
                          <p className="text-[9px] font-bold tracking-[.1em] text-[#e55e3d]">{event.time}</p>
                          <p className="mt-1 font-display text-lg leading-tight transition group-hover:text-[#e55e3d]">{event.title}</p>
                          <p className="mt-1 text-[11px] text-[#31595a]">{event.venue}</p>
                        </a>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            )}
          </div>
        </section>

        <section id="about" className="bg-[#f0eadc] px-5 py-12 sm:px-8">
          <div className="mx-auto flex max-w-[1240px] flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <p className="font-display text-2xl">Make a weekend of it.</p>
              <p className="mt-1 text-sm text-[#31595a]">Plan ahead, bring your people, and see where Tampa takes you.</p>
            </div>
            <a href="#events" className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[.12em] text-[#e55e3d]">BACK TO EVENTS <Icon name="arrow" className="h-4 w-4" /></a>
          </div>
        </section>
      </main>

      <footer className="bg-[#082f31] px-5 py-7 text-white/60 sm:px-8">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-3 text-[10px] font-semibold tracking-[.12em] sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 TAMPA BAY · YOUR LOCAL EVENT GUIDE</p>
          <a href="https://thatssotampa.com/events/" target="_blank" rel="noreferrer" className="transition hover:text-white">EVENT DETAILS SOURCED FROM THAT&apos;S SO TAMPA ↗</a>
        </div>
      </footer>
    </div>
  )
}
