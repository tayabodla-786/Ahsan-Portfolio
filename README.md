# Ahsan Zahid — Full-Stack Developer Portfolio

Single-page portfolio for **Ahsan Zahid**, built with React + Vite. The layout and design follow
[weevolveit.com](https://weevolveit.com/): floating pill nav, dotted-Earth hero globe, horizontally scrolling
five-phase method, floating "frictions" audit, curved manifesto and the "deserves to evolve" footer.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run preview  # serve the build
```

## Edit the content

Everything visitors read lives in [`src/evolve/content.js`](src/evolve/content.js): name, email,
LinkedIn, location (it drives the globe pin and the footer clock), services, the five method phases,
frictions, projects and stack. Project screenshots go in `public/projects/`.

## Structure

- `src/evolve/Evolve.jsx`: page shell (smooth scroll, scroll reveals)
- `src/evolve/Header.jsx`: pill nav with services / work / more dropdowns and the mobile sheet
- `src/evolve/Hero.jsx` + `Globe.jsx`: dotted globe (cobe), headline, stack marquee, work cards
- `src/evolve/Method.jsx`: pinned, horizontally scrolling five-phase section
- `src/evolve/Audit.jsx`: "What's slowing you down?" frictions and the curved manifesto
- `src/evolve/Footer.jsx`: talk cards, "the cure", footer columns
- `src/evolve/Background.jsx`: dot grid, starfield, scroll gauge, particle spheres
- `src/evolve/evolve.css`: tokens and all styles

## Contact

- Email: [ahsanzahid1685@gmail.com](mailto:ahsanzahid1685@gmail.com)
- LinkedIn: [muhammad-ahsan-zahid](https://www.linkedin.com/in/muhammad-ahsan-zahid-48b34640a)
