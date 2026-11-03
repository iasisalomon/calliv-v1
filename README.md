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

The format follows a plate-reader export:

- Values separated by **semicolons** (`;`). Decimal **commas** (`-1530,5`) are accepted.
- The **first row** is a header, and the file ends with a newline.
- Each following row is one reading of one well:

| Column | Content | Example |
| --- | --- | --- |
| 1 | Well ID | `A1` |
| 2 | Reading cycle (not used in calculations) | `1` |
| 3 | Measured signal | `22002,5` |
| 4 | Background | `2944` |

The net value is `signal − background`. Rows with the same well ID are treated as repeated readings and averaged. The plate is read in rows of 4 wells (`A1`–`A4`, `B1`–`B4`, …). The **standards go in column 2** (`A2`–`H2`), one per hardcoded x value, and the lowest value in column 1 is subtracted as the blank.

## How it works, screen by screen

The top bar links the three screens: **Upload CSV File**, **Process Data** and **Fit Regression**. Each screen saves its results to the browser's `localStorage`, and the next screen reads them from there. Opening a screen before its data exists shows a "No data yet" message with a link back to the upload page.

### 1. Upload CSV File (`/`)

Where the data comes in.

- **Choose File** reads the CSV in the browser with PapaParse. Decimal commas are converted to dots.
- **Subir** (upload) shows the raw file as a table: the header row becomes the table header, and every reading is one row.
- **Procesar** (process) saves the file name, header and rows, then opens **Process Data**.

Below the upload box, a link downloads the sample CSV.

### 2. Process Data (`/datosprocesados`)

All the processing happens when this screen opens. Four tabs show each step:

| Tab | What it shows | How it's calculated |
| --- | --- | --- |
| **Sorted Data** | The readings, sorted by well | Rows sorted by well ID, so the repeated readings of a well are grouped together |
| **Net Amounts** | One row per well: the net value of each reading, then their **Average** | `signal − background` for each reading (column 3 − column 4), averaged per well |
| **Native Matrix** | The averages laid out like the plate | Rows `A`–`H`, columns `1`–`4` |
| **Zero Adjusted Matrix** | The plate after the blank is removed | The lowest average in column 1 is the blank. It's subtracted from every well, and any result below 0 is shown as 0 |

The blank-subtraction rule explains why some wells read 0. With the sample data, A1 is the blank (`−1827.1`), so A1 becomes 0. A2 reads even lower (`−2205.6`), so its result is negative and is clamped to 0. B1 and B2 read above the blank and stay positive.

The zero-adjusted matrix is what the next screen fits.

### 3. Fit Regression (`/curvas`)

Fits a curve to the standards and plots it.

- **The data points:** the standards are the zero-adjusted values in **column 2** (`A2`–`H2`). Each one is paired with a hardcoded x value: `0, 4.2, 9.7, 14.6, 22, 33.3, 50, 100`.
- **The fit:** TensorFlow.js runs 1000 steps of gradient descent to minimize the mean squared error. Values are scaled first (x ÷ 100, y ÷ 100,000) to keep the steps stable.
- **The selector** switches between fits:
  - **1**: linear, `y = mx + b`
  - **2**: quadratic, `y = ax² + bx + c`
- **Above the graph:** the fitted equation and its **R²**, the share of the variation in the data the curve explains. 1 is a perfect fit.
- **The graph:** the standards are red dots and the fitted curve is a blue line, both in the scaled units. A dot far from the line is a likely outlier.

The fit starts from random coefficients, so the numbers change slightly every time the page loads.

## Try it with the sample data

[`public/raw_data.csv`](public/raw_data.csv) is a real plate read: 32 wells (`A1`–`H4`), each read over 3 cycles.

1. Start the app with `pnpm serve`. It opens at the **Upload CSV File** page.
2. Download the sample with the **Download the sample CSV** link under the upload box (or use `public/raw_data.csv`), click **Choose File** and select it.
3. Click **Subir** (upload). The raw readings appear in a table under the file name.
4. Click **Procesar** (process). The **Process Data** page opens. Go through its four tabs.
5. Click **Fit Regression** in the top bar. Use the selector to switch between the linear (**1**) and quadratic (**2**) fits.

What to check:

- The blue curve passes close to the red dots in both fits.
- The quadratic R² is equal to or higher than the linear R².
- The fit starts from random values, so the coefficients change slightly every time you reload.

To start over with a clean state, clear the site's `localStorage` (browser DevTools → Application → Local Storage) and upload the file again.

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
