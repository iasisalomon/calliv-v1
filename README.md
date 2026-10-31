# Calliv

A calibration-curve tool for biological sciences.

Upload the plate-reader results of an assay as a CSV. Calliv organizes the readings and plots the standards, then fits a regression model so you can pick the best curve for interpolation.

> This repository is **version 1.0**, a pure front-end Vue 2 app. In May 2021 I started a rewrite from scratch in NuxtJS; this version is kept as it was, with the limitations listed below.
    
## Why Calliv

I'm a biotechnology student aiming to work with AI and deep learning in the biological sciences. Calliv combines the two: a real lab workflow, solved with machine-learning tooling.

## What it does

In biological assays it's common to find the value of a property of a sample by interpolation. A property such as absorbance, fluorescence, radiation, electrical resistance or temperature is measured for a set of standards, which gives a calibration curve. The unknown sample is then measured and its value read off that curve.

Calliv:

1. **Reads** a CSV with the measured value of each well.
2. **Organizes** the data: subtracts the background, averages repeated readings per well and lays the results out as a plate matrix.
3. **Plots** the standards so you can spot outliers.
4. **Fits** a regression model (linear or quadratic) and reports its equation and R².

## Tech stack

- **Vue 2** + **vue-router** for the UI
- **TensorFlow.js** to fit the regression models by gradient descent
- **p5.js** to draw the points and fitted curves
- **PapaParse** (`vue-papa-parse`) to read the CSV
- **Bootstrap-Vue** for styling

## Getting started

Requirements: [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.io/).

```bash
pnpm install
```

Start the development server (it opens in your browser):

```bash
pnpm serve
```

Build for production into `dist/`:

```bash
pnpm build
```

## CSV format

- The **first row** is a header.
- Each following row is one reading. Calliv uses these columns:

| Column | Content | Example |
| --- | --- | --- |
| 1 | Well ID | `A1` |
| 2 | (not used) | |
| 3 | Measured signal | `15230` |
| 4 | Background | `120` |

The net value is `signal − background`. Rows with the same well ID are treated as repeated readings and averaged.

## Current status and limitations

- **Linear** and **quadratic** fits work.
- The x values of the standards are **hardcoded** to `0, 4.2, 9.7, 14.6, 22, 33.3, 50, 100`.
- Before fitting, values are scaled (x ÷ 100, y ÷ 100,000) to keep gradient descent stable.
- Interpolating the value of an **unknown sample is not implemented** yet; the app stops at fitting the curve.
- Data is kept in the browser's `localStorage`, so it stays on your machine.

## What I learned

- Building a Vue single-page app with components, routing and shared state
- Fitting regression models with TensorFlow.js
- Array and multidimensional-array manipulation, handling and rendering
- Object handling
- Thinking about user interface and user experience (UI/UX)

The NuxtJS rewrite added Vuex state management and server-side rendering (SSR).

## Contact

If you're a recruiter or interested in the idea, see my portfolio at [iasisalomon.pages.dev](https://iasisalomon.pages.dev).

## License

MIT. See [LICENSE](LICENSE).
