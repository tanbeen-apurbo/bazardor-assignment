# 🛒 বাজার দর | BazarDor

> **প্রয়োজনীয় পণ্যের দাম এক নজরে।**  
> বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের আজকের বাজারদর, দামের ওঠানামা এবং বাজারভিত্তিক তুলনা—একটি responsive, বাংলা-প্রথম ওয়েব অ্যাপে।

<p align="center">
  <strong>Live prices · Bengali-first UI · Market comparison</strong>
</p>

---

## ✨ About the project

**বাজার দর (BazarDor)** is a market-price dashboard built as a responsive Next.js app. It retrieves product and category information from the BazarDor API and presents prices in Bengali numerals, with clear indicators for daily price changes.

The interface is designed for mobile, tablet, and desktop, with a soft green visual theme inspired by the project’s Figma design.

## 🌿 Features

- **Daily price ticker** with product names, current prices, units, and change indicators.
- **Home price overview** with the six largest price rises, six largest falls, and the full product list.
- **Responsive product cards** showing Bengali prices and units, with links to product details.
- **Product detail pages** with minimum, maximum, and average prices and market-by-market information when the API provides it.
- **Category browsing and sorting** by default order or price, from low to high and high to low.
- **Authentication with Better Auth** using email/password and Google or GitHub sign-in.
- **Profile management** with a separate name-update page and sign-out action.
- **Loading feedback and friendly not-found pages** for a smoother browsing experience.
- **Responsive Bengali interface** with clear labels and touch-friendly controls.

## 🧰 Technology

| Technology | Use |
| --- | --- |
| [Next.js](https://nextjs.org/) 16 | App Router, server-rendered pages, and routing |
| [React](https://react.dev/) 19 | User interface |
| [Tailwind CSS](https://tailwindcss.com/) 4 | Responsive styling |
| [Better Auth](https://www.better-auth.com/) | Email/password and social authentication |
| [MongoDB](https://www.mongodb.com/) | Authentication data storage |
| [react-hot-toast](https://react-hot-toast.com/) | Success and error notifications |
| [react-fast-marquee](https://www.npmjs.com/package/react-fast-marquee) | Ticker dependency |

## 🗂️ Main routes

| Route | Page |
| --- | --- |
| `/` | Home, price overview, and all products |
| `/category/[slug]` | Products in a category, with sorting |
| `/product/[slug]` | Product price and market details; intended for signed-in users |
| `/sign-in` | Sign-in form and social sign-in options |
| `/sign-up` | Registration form and social sign-up options |
| `/profile` | Account details and sign-out |
| `/profile/update` | Profile name update form |

## 🔌 Data source

The app reads product and category data from the BazarDor API. Product information includes fields such as the Bengali product name, category, unit, current price, price-change direction and percentage, and market prices.

- **Products:** `https://api.abcz.workers.dev/api/bazardor/products`
- **Categories:** `https://openapi.programming-hero.com/api/bazardor/categories`

The assignment API also provides product filtering and single-item endpoints. See the project brief for available alternatives and endpoint formats.

## 🚀 Run locally

### Requirements

- Node.js compatible with the installed Next.js version
- npm
- MongoDB connection string
- Google and GitHub OAuth credentials for social sign-in

### 1. Install dependencies

```bash
npm install
```

### 2. Set environment variables

Create a `.env` file in the project root. Keep real credentials private and do not commit this file.

```env
BETTER_AUTH_SECRET=replace-with-a-long-random-secret
BETTER_AUTH_URL=http://localhost:3000
MONGODB_URL=mongodb+srv://<username>:<password>@<cluster>/<database>
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

For Google and GitHub OAuth, register the local and deployed callback URLs in each provider’s developer settings. The production `BETTER_AUTH_URL` must use your deployed HTTPS origin.

### 3. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 📜 Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Create a production build |
| `npm run start` | Run the production build locally |
| `npm run lint` | Run ESLint |

## ☁️ Deploy

This project can be deployed to [Vercel](https://vercel.com/). Import the Git repository, add the environment variables above in the project’s Vercel settings, and deploy using the Next.js defaults. After deployment, update `BETTER_AUTH_URL` and the Google/GitHub OAuth callback settings to use the production domain.

Before sharing the deployment, verify the home page, category sorting, product details, sign-up, sign-in, OAuth callbacks, profile update, and refresh behavior on dynamic routes.

## 🎨 Design direction

The visual system uses a calm, light-green background, white-green surfaces, dark text, and a market-green accent. Bengali copy, price indicators, rounded product cards, responsive grids, and compact navigation keep the information easy to scan across screen sizes.

---

<p align="center">
  <strong>বাজার দর</strong><br />
  প্রয়োজনীয় পণ্যের দাম এক নজরে।
</p>
