import { useState } from "react";
import { restaurantImageCredits, type RestaurantImageCreditId } from "./restaurantImageCredits";
import { foodCategories, neighborhoodAreas, restaurants, type Restaurant } from "./restaurantData";

type IconName = "arrow" | "chevron" | "menu" | "pin" | "restaurant" | "search" | "wave" | "x";

function Icon({ name, className = "h-5 w-5" }: { name: IconName; className?: string }) {
  const paths: Record<IconName, React.ReactNode> = {
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),
    chevron: <path d="m9 18 6-6-6-6" />,
    menu: (
      <>
        <path d="M4 7h16M4 12h16M4 17h16" />
      </>
    ),
    restaurant: (
      <>
        <path d="M5 3v6m4-6v6M3 6h8m-4 3v12" />
        <path d="M17 21V3c2 1.5 3 4 3 7v3h-3" />
      </>
    ),
    pin: (
      <>
        <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    wave: (
      <>
        <path d="M3 9c3-3 6 3 9 0s6 3 9 0M3 15c3-3 6 3 9 0s6 3 9 0" />
      </>
    ),
    x: (
      <>
        <path d="m6 6 12 12M18 6 6 18" />
      </>
    ),
  };

  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

const categories = [
  "Restaurants",
  "Theme parks",
  "Nature",
  "Shopping",
  "Entertainment",
  "Hospitality",
  "Family fun",
];

function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const image = restaurantImageCredits[restaurant.imageCredits[activeImageIndex]];

  function changeImage(direction: number) {
    setActiveImageIndex((currentIndex) => {
      return (
        (currentIndex + direction + restaurant.imageCredits.length) % restaurant.imageCredits.length
      );
    });
  }

  return (
    <article className="flex min-h-[460px] flex-col overflow-hidden rounded-[1.25rem] border border-[#113b3d]/12 bg-white transition hover:-translate-y-1 hover:border-[#e55e3d]/45 hover:shadow-[0_18px_40px_rgba(17,59,61,.09)]">
      <div
        className="relative h-52 shrink-0 overflow-hidden bg-[#d8dfd9]"
        role="group"
        aria-label={`${restaurant.name} photos`}
        aria-roledescription="carousel"
      >
        <img
          src={image.src}
          alt={image.alt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
        <span className="absolute bottom-3 left-3 rounded-full bg-[#082f31]/85 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[.12em] text-white">
          {image.isVenuePhoto ? "Venue photo" : "Representative image"}
        </span>
        <button
          type="button"
          onClick={() => changeImage(-1)}
          aria-label={`Previous image for ${restaurant.name}`}
          className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-[#113b3d] shadow transition hover:bg-white"
        >
          <Icon name="chevron" className="h-5 w-5 rotate-180" />
        </button>
        <button
          type="button"
          onClick={() => changeImage(1)}
          aria-label={`Next image for ${restaurant.name}`}
          className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-[#113b3d] shadow transition hover:bg-white"
        >
          <Icon name="chevron" className="h-5 w-5" />
        </button>
        <span
          className="absolute bottom-3 right-3 rounded-full bg-[#082f31]/85 px-3 py-1.5 text-[10px] font-bold text-white"
          aria-live="polite"
          aria-atomic="true"
        >
          {activeImageIndex + 1} / {restaurant.imageCredits.length}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="rounded-full bg-[#e55e3d]/10 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[.13em] text-[#bd482f]">
            {restaurant.foodCategories.join(" · ")}
          </span>
          <span className="flex items-center gap-1.5 text-[10px] font-semibold tracking-[.08em] text-[#31595a]">
            <Icon name="pin" className="h-3.5 w-3.5 text-[#e55e3d]" />
            {restaurant.area}
          </span>
        </div>
        <h3 className="mt-6 font-display text-2xl leading-tight">{restaurant.name}</h3>
        <p className="mt-3 flex-1 text-sm leading-6 text-[#31595a]">{restaurant.description}</p>
        <p className="mt-3 flex items-start gap-2 text-xs leading-5 text-[#31595a]">
          <Icon name="pin" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#e55e3d]" />
          {restaurant.address}
        </p>
        <a
          href={restaurant.url}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex items-center gap-2 text-[10px] font-bold tracking-[.14em] text-[#e55e3d] hover:text-[#bd482f]"
        >
          LEARN MORE <Icon name="arrow" className="h-4 w-4" />
        </a>
      </div>
    </article>
  );
}

export default function PlacesPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedFoodCategory, setSelectedFoodCategory] = useState("all");
  const [selectedNeighborhood, setSelectedNeighborhood] = useState("all");

  const imageCreditIds = Array.from(
    new Set(restaurants.flatMap((restaurant) => restaurant.imageCredits)),
  );
  const searchTerm = query.trim().toLowerCase();
  const filteredRestaurants = restaurants.filter((restaurant) => {
    const matchesQuery =
      !searchTerm ||
      `${restaurant.name} ${restaurant.neighborhood} ${restaurant.area} ${restaurant.cuisine} ${restaurant.address} ${restaurant.foodCategories.join(" ")} ${restaurant.description}`
        .toLowerCase()
        .includes(searchTerm);
    const matchesFoodCategory =
      selectedFoodCategory === "all" ||
      restaurant.foodCategories.some((category) => category === selectedFoodCategory);
    const matchesNeighborhood =
      selectedNeighborhood === "all" || restaurant.area === selectedNeighborhood;

    return matchesQuery && matchesFoodCategory && matchesNeighborhood;
  });

  return (
    <div className="min-h-screen bg-[#f7f3ea] text-[#113b3d]">
      <header className="absolute inset-x-0 top-0 z-30">
        <div className="mx-auto flex h-24 max-w-[1440px] items-center justify-between px-5 text-white sm:px-8 lg:px-12">
          <a href="/" className="group flex items-center gap-3" aria-label="Tampa Bay home">
            <span className="grid h-11 w-11 place-items-center rounded-full border border-white/50 bg-white/10 backdrop-blur">
              <Icon name="wave" className="h-6 w-6" />
            </span>
            <span className="leading-none">
              <strong className="block font-display text-[1.35rem] font-normal tracking-wide">
                TAMPA BAY
              </strong>
              <span className="mt-1 block text-[9px] font-bold tracking-[.34em] text-white/75">
                FLORIDA
              </span>
            </span>
          </a>
          <nav className="hidden items-center gap-4 text-[10px] font-bold tracking-[.13em] lg:flex xl:gap-8 xl:text-[12px]">
            <a className="nav-link" href="/#discover">
              THINGS TO DO
            </a>
            <a className="nav-link" href="/events">
              EVENTS
            </a>
            <a className="nav-link text-[#ffcf63]" href="/places" aria-current="page">
              PLACES TO GO
            </a>
            <a className="nav-link" href="/#plan">
              PLAN YOUR TRIP
            </a>
            <a className="nav-link" href="/#about">
              OUR TAMPA
            </a>
          </nav>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="grid h-11 w-11 place-items-center rounded-full border border-white/40 bg-black/10 lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            <Icon name={menuOpen ? "x" : "menu"} />
          </button>
        </div>
        {menuOpen && (
          <nav
            id="mobile-navigation"
            className="mx-5 rounded-2xl bg-[#f7f3ea] p-6 text-[#113b3d] shadow-2xl lg:hidden"
          >
            {[
              ["Things to do", "/#discover"],
              ["Events", "/events"],
              ["Places to go", "/places"],
              ["Plan your trip", "/#plan"],
              ["Our Tampa", "/#about"],
            ].map(([label, href]) => (
              <a
                key={label}
                onClick={() => setMenuOpen(false)}
                href={href}
                className="flex items-center justify-between border-b border-[#113b3d]/10 py-4 font-bold uppercase tracking-wider"
              >
                {label}
                <Icon name="chevron" className="h-4 w-4" />
              </a>
            ))}
          </nav>
        )}
      </header>

      <main>
        <section className="relative flex min-h-[560px] items-end overflow-hidden px-5 pb-16 pt-32 text-white sm:px-8 lg:min-h-[620px] lg:px-12 lg:pb-20">
          <div className="absolute inset-0">
            <img src="/images/tampa-waterfront.png" alt="" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,42,44,.78)_0%,rgba(7,37,39,.32)_55%,rgba(4,27,30,.12)_100%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(5,32,34,.68)_0%,transparent_60%,rgba(3,24,26,.35)_100%)]" />
          </div>
          <div className="relative z-10 mx-auto w-full max-w-[1344px]">
            <p className="mb-6 flex items-center gap-3 text-[11px] font-bold tracking-[.24em] text-[#ffd876]">
              <span className="h-px w-10 bg-[#ffd876]" />
              DISCOVER TAMPA BAY
            </p>
            <h1 className="max-w-3xl font-display text-[clamp(3.8rem,8vw,7.5rem)] leading-[.88] tracking-[-.045em]">
              Places to
              <br />
              <span className="italic text-[#ffcf63]">go.</span>
            </h1>
            <p className="mt-7 max-w-lg text-base leading-7 text-white/85 sm:text-lg">
              Find a little inspiration for your next Tampa Bay adventure.
            </p>
            <a
              href="#categories"
              className="mt-8 inline-flex items-center gap-3 rounded-xl bg-[#e55e3d] px-6 py-4 text-xs font-bold tracking-[.15em] text-white transition hover:bg-[#c84b2d]"
            >
              BROWSE CATEGORIES <Icon name="chevron" className="h-4 w-4" />
            </a>
          </div>
        </section>

        <section id="categories" className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="mx-auto max-w-[1344px]">
            <div className="max-w-2xl">
              <p className="eyebrow">FIND YOUR TAMPA</p>
              <h2 className="mt-5 font-display text-5xl leading-[.95] tracking-[-.03em] sm:text-6xl">
                What are you
                <br />
                <span className="italic text-[#e55e3d]">in the mood for?</span>
              </h2>
              <p className="mt-6 max-w-xl text-base leading-7 text-[#31595a]">
                Explore Tampa Bay by the experiences you love.
              </p>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((category, index) => {
                const cardClassName =
                  "group relative flex min-h-52 flex-col justify-between overflow-hidden rounded-[1.35rem] border border-[#113b3d]/12 bg-white/65 p-7 transition duration-300 hover:-translate-y-1 hover:border-[#e55e3d]/50 hover:shadow-[0_18px_40px_rgba(17,59,61,.09)]";
                const cardContent = (
                  <>
                    {category === "Restaurants" ? (
                      <span className="grid h-12 w-12 place-items-center rounded-full bg-[#e55e3d]/10 text-[#e55e3d]">
                        <Icon name="restaurant" className="h-6 w-6" />
                      </span>
                    ) : (
                      <span className="font-display text-4xl italic text-[#e55e3d]/65">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    )}
                    <h3 className="font-display text-3xl tracking-[-.02em] transition group-hover:text-[#e55e3d]">
                      {category}
                    </h3>
                    <span
                      className="absolute -right-7 -top-8 h-28 w-28 rounded-full border border-[#ffcf63]/55 transition group-hover:scale-125"
                      aria-hidden="true"
                    />
                  </>
                );

                return category === "Restaurants" ? (
                  <a
                    key={category}
                    href="#restaurants"
                    className={cardClassName}
                    aria-label="Browse Tampa restaurants"
                  >
                    {cardContent}
                  </a>
                ) : (
                  <article key={category} className={cardClassName}>
                    {cardContent}
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="restaurants" className="bg-white/45 px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="mx-auto max-w-[1344px]">
            <p className="eyebrow">TAMPA BAY DINING</p>
            <h2 className="mt-5 max-w-2xl font-display text-5xl leading-[.95] tracking-[-.03em] sm:text-6xl">
              A table for
              <br />
              <span className="italic text-[#e55e3d]">every appetite.</span>
            </h2>
            <p className="mt-6 max-w-xl text-base leading-7 text-[#31595a]">
              Search local favorites or narrow the list by food category and area.
            </p>
            <div className="mt-10 grid gap-4 lg:grid-cols-[1.4fr_1fr_1fr]">
              <label className="block">
                <span className="mb-2 block text-[10px] font-bold tracking-[.15em] text-[#31595a]">
                  SEARCH
                </span>
                <span className="flex h-14 items-center gap-3 rounded-xl border border-[#113b3d]/15 bg-white px-4 focus-within:border-[#e55e3d]">
                  <Icon name="search" className="h-5 w-5 shrink-0 text-[#e55e3d]" />
                  <input
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Restaurant, cuisine, or area"
                    className="w-full bg-transparent text-sm outline-none placeholder:text-[#31595a]/55"
                  />
                </span>
              </label>
              <label className="block">
                <span className="mb-2 block text-[10px] font-bold tracking-[.15em] text-[#31595a]">
                  FOOD CATEGORY
                </span>
                <select
                  value={selectedFoodCategory}
                  onChange={(event) => setSelectedFoodCategory(event.target.value)}
                  className="h-14 w-full rounded-xl border border-[#113b3d]/15 bg-white px-4 text-sm outline-none transition focus:border-[#e55e3d]"
                >
                  <option value="all">All categories</option>
                  {foodCategories.map((foodCategory) => (
                    <option key={foodCategory} value={foodCategory}>
                      {foodCategory}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="mb-2 block text-[10px] font-bold tracking-[.15em] text-[#31595a]">
                  NEIGHBORHOOD AREA
                </span>
                <select
                  value={selectedNeighborhood}
                  onChange={(event) => setSelectedNeighborhood(event.target.value)}
                  className="h-14 w-full rounded-xl border border-[#113b3d]/15 bg-white px-4 text-sm outline-none transition focus:border-[#e55e3d]"
                >
                  <option value="all">All areas</option>
                  {neighborhoodAreas.map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="mt-9 flex items-center justify-between border-b border-[#113b3d]/15 pb-4">
              <p
                className="text-[11px] font-bold tracking-[.13em] text-[#31595a]"
                aria-live="polite"
              >
                {filteredRestaurants.length}{" "}
                {filteredRestaurants.length === 1 ? "RESTAURANT" : "RESTAURANTS"}
              </p>
            </div>

            {filteredRestaurants.length > 0 ? (
              <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {filteredRestaurants.map((restaurant) => (
                  <RestaurantCard key={restaurant.name} restaurant={restaurant} />
                ))}
              </div>
            ) : (
              <div className="mt-5 rounded-2xl border border-[#113b3d]/12 bg-white p-8 text-center">
                <h3 className="font-display text-2xl">No restaurants found</h3>
                <p className="mt-2 text-sm text-[#31595a]">
                  Try another search or clear the selected filters.
                </p>
                <button
                  onClick={() => {
                    setQuery("");
                    setSelectedFoodCategory("all");
                    setSelectedNeighborhood("all");
                  }}
                  className="mt-5 rounded-full bg-[#113b3d] px-5 py-3 text-[10px] font-bold tracking-[.12em] text-white transition hover:bg-[#e55e3d]"
                >
                  CLEAR FILTERS
                </button>
              </div>
            )}

            <div className="mt-16 border-t border-[#113b3d]/15 pt-8">
              <h3 className="font-display text-2xl">Image credits</h3>
              <p className="mt-2 max-w-3xl text-xs leading-5 text-[#31595a]">
                Only Columbia Restaurant's facade photo depicts a listed venue; all other images are
                representative. Images are resized and cropped for the card layout. Please follow
                each license when reusing an image. CC BY-SA assets remain under their listed
                share-alike license.
              </p>
              <ul className="mt-5 grid gap-3 text-xs leading-5 text-[#31595a] sm:grid-cols-2">
                {imageCreditIds.map((imageCreditId) => {
                  const credit = restaurantImageCredits[imageCreditId];

                  return (
                    <li key={imageCreditId}>
                      <a
                        href={credit.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="underline decoration-[#e55e3d]/50 underline-offset-2 hover:text-[#e55e3d]"
                      >
                        “{credit.title}”
                      </a>{" "}
                      by{" "}
                      <a
                        href={credit.creatorUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="underline decoration-[#e55e3d]/50 underline-offset-2 hover:text-[#e55e3d]"
                      >
                        {credit.creator}
                      </a>
                      {" · "}
                      <a
                        href={credit.licenseUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="underline decoration-[#e55e3d]/50 underline-offset-2 hover:text-[#e55e3d]"
                      >
                        {credit.license}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#082f31] px-5 py-8 text-white sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1344px] flex-col gap-5 text-[10px] font-semibold tracking-[.12em] text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <a href="/" className="font-display text-lg tracking-normal text-white">
            TAMPA BAY · FLORIDA
          </a>
          <p>© 2025 TAMPA BAY VISITOR BUREAU</p>
          <div className="flex gap-6">
            <a href="/#about">CONTACT</a>
            <a href="/#about">ACCESSIBILITY</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
