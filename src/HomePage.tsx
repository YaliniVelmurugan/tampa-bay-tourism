import { useState } from 'react'

type IconName =
  | 'arrow'
  | 'calendar'
  | 'chevron'
  | 'compass'
  | 'heart'
  | 'menu'
  | 'pin'
  | 'search'
  | 'sun'
  | 'wave'
  | 'x'

function Icon({ name, className = 'h-5 w-5' }: { name: IconName; className?: string }) {
  const paths: Record<IconName, React.ReactNode> = {
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    calendar: <><path d="M6 2v4M18 2v4M3 9h18" /><rect x="3" y="4" width="18" height="17" rx="2" /></>,
    chevron: <path d="m9 18 6-6-6-6" />,
    compass: <><circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" /></>,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    pin: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>,
    wave: <><path d="M3 9c3-3 6 3 9 0s6 3 9 0M3 15c3-3 6 3 9 0s6 3 9 0" /></>,
    x: <><path d="m6 6 12 12M18 6 6 18" /></>,
  }

  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  )
}

const attractions = [
  {
    category: 'WILD ENCOUNTERS',
    title: 'The Florida Aquarium',
    place: 'Channel District',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=900&q=85',
  },
  {
    category: 'LOCAL FLAVOR',
    title: 'Ybor City',
    place: 'Historic District',
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1f/A_bit_of_old_Spain_as_seen_at_Ybor_City%2C_Tampa%2C_Florida.jpg/1280px-A_bit_of_old_Spain_as_seen_at_Ybor_City%2C_Tampa%2C_Florida.jpg',
    imageCredit: 'https://commons.wikimedia.org/wiki/File:A_bit_of_old_Spain_as_seen_at_Ybor_City,_Tampa,_Florida.jpg',
  },
  {
    category: 'ON THE WATER',
    title: 'Riverwalk',
    place: 'Downtown Tampa',
    image: 'https://images.unsplash.com/photo-1602088113235-229c19758e9f?auto=format&fit=crop&w=900&q=85',
  },
]

const events = [
  { day: '25', month: 'NOV', title: 'Tampa Bay Lightning vs. Carolina Hurricanes', location: 'Benchmark International Arena', time: '7:00 PM' },
  { day: '25', month: 'NOV', title: 'Big Picture: Midnight Cowboy (1969)', location: 'Tampa Theatre', time: '7:00–9:00 PM' },
  { day: '25', month: 'NOV', title: 'Movie Night at Lower Deck: The Nightmare Before Christmas', location: 'Lower Deck', time: '8:00–10:00 PM' },
]

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [saved, setSaved] = useState<string[]>([])
  const [query, setQuery] = useState('')

  const toggleSaved = (title: string) => {
    setSaved((current) => current.includes(title) ? current.filter((item) => item !== title) : [...current, title])
  }

  const explore = () => {
    document.querySelector('#discover')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-[#f7f3ea] text-[#113b3d]">
      <header className="absolute inset-x-0 top-0 z-30">
        <div className="mx-auto flex h-24 max-w-[1440px] items-center justify-between px-5 text-white sm:px-8 lg:px-12">
          <a href="#" className="group flex items-center gap-3" aria-label="Tampa Bay home">
            <span className="grid h-11 w-11 place-items-center rounded-full border border-white/50 bg-white/10 backdrop-blur">
              <Icon name="wave" className="h-6 w-6" />
            </span>
            <span className="leading-none">
              <strong className="block font-display text-[1.35rem] font-normal tracking-wide">TAMPA BAY</strong>
              <span className="mt-1 block text-[9px] font-bold tracking-[.34em] text-white/75">FLORIDA</span>
            </span>
          </a>

          <nav className="hidden items-center gap-4 text-[10px] font-bold tracking-[.13em] lg:flex xl:gap-8 xl:text-[12px]">
            <a className="nav-link" href="#discover">THINGS TO DO</a>
            <a className="nav-link" href="/events">EVENTS</a>
            <a className="nav-link" href="/places">PLACES TO GO</a>
            <a className="nav-link" href="#plan">PLAN YOUR TRIP</a>
            <a className="nav-link" href="#about">OUR TAMPA</a>
          </nav>

          <div className="flex items-center gap-2">
            <button className="hidden h-10 items-center gap-2 rounded-full border border-white/40 px-4 text-[11px] font-bold tracking-wider transition hover:bg-white hover:text-[#113b3d] sm:flex">
              <Icon name="heart" className="h-4 w-4" />
              MY TRIP {saved.length > 0 && `(${saved.length})`}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/40 bg-black/10 lg:hidden"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
            >
              <Icon name={menuOpen ? 'x' : 'menu'} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav id="mobile-navigation" className="mx-5 rounded-2xl bg-[#f7f3ea] p-6 text-[#113b3d] shadow-2xl lg:hidden">
            {['Things to do', 'Events', 'Places to go', 'Plan your trip', 'Our Tampa'].map((item, index) => (
              <a key={item} onClick={() => setMenuOpen(false)} href={['#discover', '/events', '/places', '#plan', '#about'][index]} className="flex items-center justify-between border-b border-[#113b3d]/10 py-4 font-bold uppercase tracking-wider">
                {item}<Icon name="chevron" className="h-4 w-4" />
              </a>
            ))}
          </nav>
        )}
      </header>

      <main>
        <section className="hero relative flex min-h-[760px] items-end overflow-hidden px-5 pb-16 pt-32 text-white sm:px-8 lg:min-h-[820px] lg:px-12 lg:pb-20">
          <div className="absolute inset-0">
            <img src="/images/tampa-waterfront.png" alt="Downtown Tampa waterfront glowing at sunset" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,42,44,.78)_0%,rgba(7,37,39,.32)_50%,rgba(4,27,30,.12)_100%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(5,32,34,.62)_0%,transparent_48%,rgba(3,24,26,.35)_100%)]" />
          </div>

          <div className="relative z-10 mx-auto w-full max-w-[1344px]">
            <div className="mb-7 flex items-center gap-3 text-[11px] font-bold tracking-[.24em] text-[#ffd876]">
              <span className="h-px w-10 bg-[#ffd876]" />
              FLORIDA&apos;S MOST
            </div>
            <h1 className="max-w-3xl font-display text-[clamp(4rem,8.8vw,8.5rem)] leading-[.8] tracking-[-.045em]">
              Beautiful<br /><span className="italic text-[#ffcf63]">Tampa.</span>
            </h1>
            <p className="mt-7 max-w-lg text-base leading-7 text-white/85 sm:text-lg">
              Where waterfront days meet historic nights. Come discover a city with sunshine in its soul.
            </p>

            <div className="mt-10 flex max-w-[780px] flex-col overflow-hidden rounded-2xl bg-white p-2 text-[#113b3d] shadow-[0_20px_60px_rgba(0,0,0,.25)] sm:flex-row">
              <div className="flex flex-1 items-center gap-3 px-4 py-3">
                <Icon name="search" className="h-5 w-5 text-[#e45f3c]" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  onKeyDown={(event) => event.key === 'Enter' && explore()}
                  placeholder="What are you looking for?"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-[#113b3d]/45"
                />
              </div>
              <div className="mx-2 hidden w-px bg-[#113b3d]/10 sm:block" />
              <button onClick={explore} className="flex items-center justify-center gap-2 rounded-xl bg-[#e55e3d] px-7 py-4 text-xs font-bold tracking-[.15em] text-white transition hover:bg-[#c84b2d]">
                EXPLORE {query && 'TAMPA'} <Icon name="arrow" className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-[11px] font-bold tracking-[.14em] text-white/75">
              <span className="text-white/45">POPULAR:</span>
              <a href="#discover" className="border-b border-white/30 pb-1 hover:text-white">RIVERWALK</a>
              <a href="#discover" className="border-b border-white/30 pb-1 hover:text-white">YBOR CITY</a>
              <a href="/events" className="border-b border-white/30 pb-1 hover:text-white">THIS WEEKEND</a>
            </div>
          </div>

          <div className="absolute bottom-8 right-10 hidden items-center gap-3 text-[10px] font-bold tracking-[.18em] text-white/70 xl:flex">
            <span>SCROLL TO DISCOVER</span><span className="h-px w-14 bg-white/50" />
          </div>
        </section>

        <section id="discover" className="px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
          <div className="mx-auto max-w-[1344px]">
            <div className="grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-end">
              <div>
                <p className="eyebrow">FIND YOUR FAVORITE TAMPA</p>
                <h2 className="mt-5 max-w-xl font-display text-5xl leading-[.95] tracking-[-.03em] sm:text-6xl">
                  More than a<br /><span className="italic text-[#e55e3d]">sunny disposition.</span>
                </h2>
              </div>
              <div className="lg:pb-2">
                <p className="max-w-xl text-base leading-7 text-[#31595a]">Thrilling rides, wild encounters, Cuban culture, and sparkling water are all part of the story. Make your own Tampa Bay adventure.</p>
                <a href="#" className="mt-7 inline-flex items-center gap-3 text-xs font-bold tracking-[.16em] text-[#e55e3d]">VIEW ALL THINGS TO DO <Icon name="arrow" className="h-4 w-4" /></a>
              </div>
            </div>

            <div className="mt-14 grid gap-5 md:grid-cols-3">
              {attractions.map((item, index) => {
                const isSaved = saved.includes(item.title)
                return (
                  <article key={item.title} className={`group relative min-h-[470px] overflow-hidden rounded-[1.35rem] ${index === 1 ? 'md:translate-y-8' : ''}`}>
                    <img src={item.image} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#082f31]/90 via-transparent to-black/10" />
                    <button
                      onClick={() => toggleSaved(item.title)}
                      className={`absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full backdrop-blur transition ${isSaved ? 'bg-[#e55e3d] text-white' : 'bg-white/90 text-[#113b3d] hover:bg-white'}`}
                      aria-label={`${isSaved ? 'Remove' : 'Add'} ${item.title} ${isSaved ? 'from' : 'to'} trip`}
                    >
                      <Icon name="heart" className={`h-5 w-5 ${isSaved ? 'fill-current' : ''}`} />
                    </button>
                    <div className="absolute inset-x-0 bottom-0 p-7 text-white">
                      <p className="text-[10px] font-bold tracking-[.22em] text-[#ffcf63]">{item.category}</p>
                      <h3 className="mt-3 font-display text-3xl">{item.title}</h3>
                      <p className="mt-3 flex items-center gap-2 text-xs text-white/70"><Icon name="pin" className="h-4 w-4" />{item.place}</p>
                      {item.imageCredit && (
                        <a href={item.imageCredit} target="_blank" rel="noreferrer" className="mt-2 inline-block text-[8px] text-white/60 underline underline-offset-2">
                          Image: Tichnor Brothers Collection, Boston Public Library · CC BY-SA 4.0
                        </a>
                      )}
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section id="plan" className="bg-[#0d3d3e] px-5 py-20 text-white sm:px-8 lg:px-12">
          <div className="mx-auto grid max-w-[1344px] gap-12 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
            <div className="relative overflow-hidden rounded-[1.5rem]">
              <img src="/images/tampa-waterfront.png" alt="Boat cruising along Tampa's downtown waterfront" className="aspect-[4/3] w-full object-cover object-right" />
              <div className="absolute bottom-5 left-5 rounded-xl bg-[#ffcf63] px-5 py-3 text-[#113b3d] shadow-lg">
                <p className="text-[9px] font-bold tracking-[.18em]">RIGHT NOW IN TAMPA</p>
                <p className="mt-1 flex items-center gap-2 font-display text-2xl"><Icon name="sun" className="h-5 w-5" /> 84° & Sunny</p>
              </div>
            </div>
            <div className="lg:pl-12">
              <p className="eyebrow text-[#ffcf63] before:bg-[#ffcf63]">GOOD TO KNOW</p>
              <h2 className="mt-5 font-display text-5xl leading-none sm:text-6xl">Your trip,<br /><span className="italic text-[#ffcf63]">made easy.</span></h2>
              <p className="mt-6 max-w-lg leading-7 text-white/68">From the best time to visit to where to park, we&apos;ve gathered everything you need for an effortless escape.</p>
              <div className="mt-9 grid gap-3 sm:grid-cols-2">
                {[
                  ['compass', 'Visitor guide'],
                  ['sun', 'Weather & seasons'],
                  ['pin', 'Getting around'],
                  ['calendar', 'Plan your stay'],
                ].map(([icon, label]) => (
                  <a key={label} href="#" className="flex items-center justify-between rounded-xl border border-white/15 bg-white/[.04] p-4 transition hover:border-[#ffcf63]/70 hover:bg-white/[.08]">
                    <span className="flex items-center gap-3 text-sm font-semibold"><Icon name={icon as IconName} className="h-5 w-5 text-[#ffcf63]" />{label}</span>
                    <Icon name="chevron" className="h-4 w-4 text-white/45" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="events" className="px-5 py-24 sm:px-8 lg:px-12 lg:py-28">
          <div className="mx-auto max-w-[1344px]">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <p className="eyebrow">MARK YOUR CALENDAR</p>
                <h2 className="mt-4 font-display text-5xl transition hover:text-[#e55e3d] sm:text-6xl">
                  <a href="/events">What&apos;s happening.</a>
                </h2>
              </div>
              <a href="/events" className="inline-flex items-center gap-3 text-xs font-bold tracking-[.15em] text-[#e55e3d]">SEE ALL EVENTS <Icon name="arrow" className="h-4 w-4" /></a>
            </div>

            <div className="mt-12 divide-y divide-[#113b3d]/15 border-y border-[#113b3d]/15">
              {events.map((event) => (
                <article key={event.title} className="group grid gap-5 py-7 transition sm:grid-cols-[100px_1fr_auto] sm:items-center">
                  <div className="flex items-baseline gap-2 sm:block">
                    <span className="font-display text-4xl text-[#e55e3d]">{event.day}</span>
                    <span className="ml-2 text-[10px] font-bold tracking-[.2em]">{event.month}</span>
                  </div>
                  <div>
                    <h3 className="font-display text-2xl transition group-hover:text-[#e55e3d]"><a href="/events">{event.title}</a></h3>
                    <p className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-xs text-[#31595a]"><span>{event.location}</span><span>{event.time}</span></p>
                  </div>
                  <a href="/events" className="grid h-11 w-11 place-items-center rounded-full border border-[#113b3d]/25 transition group-hover:border-[#e55e3d] group-hover:bg-[#e55e3d] group-hover:text-white" aria-label={`View ${event.title}`}>
                    <Icon name="arrow" className="h-4 w-4" />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer id="about" className="bg-[#082f31] px-5 pb-8 pt-16 text-white sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1344px]">
          <div className="grid gap-12 border-b border-white/15 pb-14 lg:grid-cols-[1.2fr_.8fr]">
            <div>
              <p className="font-display text-4xl leading-tight sm:text-5xl">Let Tampa brighten<br />your inbox.</p>
              <p className="mt-4 text-sm text-white/60">Fresh events, local finds, and travel inspiration—sunshine included.</p>
            </div>
            <form className="self-end" onSubmit={(event) => event.preventDefault()}>
              <label className="text-[10px] font-bold tracking-[.2em] text-[#ffcf63]">YOUR EMAIL ADDRESS</label>
              <div className="mt-3 flex border-b border-white/40 pb-3">
                <input type="email" required placeholder="hello@example.com" className="flex-1 bg-transparent outline-none placeholder:text-white/35" />
                <button className="flex items-center gap-2 text-xs font-bold tracking-[.13em]">SIGN ME UP <Icon name="arrow" className="h-4 w-4" /></button>
              </div>
            </form>
          </div>
          <div className="flex flex-col gap-5 pt-7 text-[10px] font-semibold tracking-[.12em] text-white/45 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2025 TAMPA BAY VISITOR BUREAU</p>
            <div className="flex gap-6"><a href="#">PRIVACY</a><a href="#">ACCESSIBILITY</a><a href="#">CONTACT</a></div>
          </div>
        </div>
      </footer>
    </div>
  )
}
