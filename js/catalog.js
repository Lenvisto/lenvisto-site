/* Lenvisto Books & Comics: preview catalog.
   ONE data structure for every title. Each title sets:
     format:   "book" (reader shows text) or "comic" (reader shows a vertical stack of image panels)
     chapters: its own list, any length. free: true = first chapter/episode (preview art for comics); all story text is coming soon.
   3D VERSION. Cover art: assets/covers-3d/<id>.webp/.jpg (480x720 portrait) and <id>-300.*.
   Cropped from owner-supplied original 3D-style images; title text is overlaid in HTML/CSS.
   Comic episode 1 may list "art" panels (assets/covers-3d/panels/...), shown only as a preview-art teaser.
   PREVIEW: all titles are samples and every chapter is coming soon. No story text is published. Nothing can be bought yet. */
window.LV_CATALOG = {
  titles: [
    {
      id: "lantern-keeper", format: "book", title: "The Lantern Keeper", author: "Sample Author",
      genre: "Fantasy adventure", age: "Ages 10+",
      blurb: "On a windy island, a girl named Wren inherits the old lighthouse and finds that its lantern can light up memories as well as ships. Sample title, coming soon.",
      cover: { a: "#FF6B5B", b: "#FFC93C", ink: "#2B1B3D", motif: "sun" },
      chapters: [
        { title: "The Last Ferry", free: true },
        { title: "Salt on the Stairs", free: false },
        { title: "A Light That Remembers", free: false },
        { title: "Storm Season", free: false },
        { title: "The Keeper's Choice", free: false }
      ]
    },
    {
      id: "skyline-couriers", format: "comic", title: "Skyline Couriers", author: "Sample Artist",
      genre: "Action comic", age: "Ages 12+",
      blurb: "Two rooftop couriers race across a floating city to deliver packages nobody else dares to carry. Sample comic, coming soon.",
      cover: { a: "#2EC4B6", b: "#3A86FF", ink: "#10213F", motif: "burst" },
      chapters: [
        { title: "Episode 1: First Drop", free: true, art: [
            { src: "assets/covers-3d/panels/skyline-couriers-1", w: 800, h: 450, alt: "Two couriers leap over a sunset city" },
            { src: "assets/covers-3d/panels/skyline-couriers-2", w: 800, h: 1000, alt: "A courier grins mid-jump on a hoverboard" },
            { src: "assets/covers-3d/panels/skyline-couriers-3", w: 800, h: 1000, alt: "The second courier flies with a parcel" },
            { src: "assets/covers-3d/panels/skyline-couriers-4", w: 800, h: 579, alt: "Domes and towers of the city" },
            { src: "assets/covers-3d/panels/skyline-couriers-5", w: 800, h: 477, alt: "The glowing hoverboard up close" }
          ] },
        { title: "Episode 2: Wrong Address", free: false },
        { title: "Episode 3: Thunder Lane", free: false },
        { title: "Episode 4: Zero Gravity Rush", free: false }
      ]
    },
    {
      id: "harbor-notes", format: "book", title: "Notes from the Harbor", author: "Sample Author",
      genre: "Cozy mystery", age: "All ages",
      blurb: "A bakery owner keeps finding mysterious notes tucked inside the morning bread orders. Sample title, coming soon.",
      cover: { a: "#7B5CFF", b: "#5BC0EB", ink: "#1C1446", motif: "waves" },
      chapters: [
        { title: "Flour and Fog", free: true },
        { title: "The Second Note", free: false },
        { title: "Low Tide Clues", free: false },
        { title: "The Baker's Dozen", free: false },
        { title: "Lighthouse Breakfast", free: false },
        { title: "Everything Rises", free: false }
      ]
    },
    {
      id: "pixel-and-pine", format: "comic", title: "Pixel & Pine", author: "Sample Artist",
      genre: "Funny animal comic", age: "All ages",
      blurb: "A robot raccoon and a very serious pine tree start the forest's first newspaper. Sample comic, coming soon.",
      cover: { a: "#FFD23F", b: "#06D6A0", ink: "#1E2A1A", motif: "dots" },
      chapters: [
        { title: "Issue 1: Extra! Extra!", free: true, art: [
            { src: "assets/covers-3d/panels/pixel-and-pine-1", w: 800, h: 450, alt: "A robot and a raccoon in a sunny meadow" },
            { src: "assets/covers-3d/panels/pixel-and-pine-2", w: 800, h: 705, alt: "The robot smiles" },
            { src: "assets/covers-3d/panels/pixel-and-pine-3", w: 800, h: 909, alt: "The raccoon laughs, wearing a pine cone hat" },
            { src: "assets/covers-3d/panels/pixel-and-pine-4", w: 640, h: 1080, alt: "Mushrooms and a butterfly" }
          ] },
        { title: "Issue 2: The Acorn Scoop", free: false },
        { title: "Issue 3: Weather Report", free: false }
      ]
    },
    {
      id: "cartographers-daughter", format: "book", title: "The Cartographer's Daughter", author: "Sample Author",
      genre: "Historical adventure", age: "Teen & up",
      blurb: "When her mother's last map turns out to be blank, Ines sets out to fill it in herself. Sample title, coming soon.",
      cover: { a: "#06D6A0", b: "#118AB2", ink: "#0B2530", motif: "mountains" },
      chapters: [
        { title: "The Blank Map", free: true },
        { title: "North by Lantern", free: false },
        { title: "The River Without a Name", free: false },
        { title: "Ink and Weather", free: false }
      ]
    },
    {
      id: "orbit-street", format: "comic", title: "Orbit Street", author: "Sample Artist",
      genre: "Sci-fi slice of life", age: "Ages 10+",
      blurb: "Life on the only street that circles a tiny moon: lost cats, low gravity and very long walks home. Sample comic, coming soon.",
      cover: { a: "#F15BB5", b: "#9B5DE5", ink: "#2A0F3A", motif: "planet" },
      chapters: [
        { title: "Episode 1: Moving Day", free: true, art: [
            { src: "assets/covers-3d/panels/orbit-street-1", w: 800, h: 450, alt: "A kid waves on a street beside a ringed planet" },
            { src: "assets/covers-3d/panels/orbit-street-2", w: 800, h: 1140, alt: "The kid waves hello" },
            { src: "assets/covers-3d/panels/orbit-street-3", w: 600, h: 600, alt: "A little robot floats nearby" },
            { src: "assets/covers-3d/panels/orbit-street-4", w: 800, h: 626, alt: "The ringed planet in the sky" },
            { src: "assets/covers-3d/panels/orbit-street-5", w: 800, h: 952, alt: "Round houses along the street" }
          ] },
        { title: "Episode 2: The Cat in Orbit", free: false },
        { title: "Episode 3: Block Party", free: false },
        { title: "Episode 4: Eclipse Night", free: false },
        { title: "Episode 5: Long Way Home", free: false }
      ]
    }
  ],
  /* Token packs: coming soon. No prices yet. */
  packs: [
    { id: "p50",  tokens: 50,  label: "Starter" },
    { id: "p120", tokens: 120, label: "Reader" },
    { id: "p260", tokens: 260, label: "Bookworm" },
    { id: "p700", tokens: 700, label: "Super Fan" }
  ]
};
