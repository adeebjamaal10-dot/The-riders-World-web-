# The Global Horse Atlas 🌍🐎

> **The International Encyclopedia of Horse Breeds & Equestrian Heritage**  
> An authoritative, peer-reviewed global atlas documenting 243 horse breeds and landrace populations across 6 continents, featuring interactive cartography, conformational analyses, saddle tree geometry, and 30 equestrian heritage monographs.

Presented in scientific collaboration with official **Research Partner & Information Provider**:  
[**Sorenta Saddlery Atelier**](https://sorenta-saddlery.com/) — *Dedicated to anatomical saddle tree engineering, unrestricted scapular movement, and equine back health worldwide.*

---

## Key Features

- **The World Horse Map**: High-contrast interactive cartographic distribution of 243 horse populations mapped precisely to their native continents and regional habitats.
- **Master Breeds Register (243 Verified Breeds)**: Detailed biometric heights (hands & cm), structural conformation, temperament, genetic origins, and conservation statuses.
- **Biomechanics & Saddle Tree Geometry**: Anatomical wither profiles, dorsal spine clearance protocols, and tree angles co-curated with **Sorenta Saddlery**.
- **Breed Comparison Engine**: Side-by-side multi-parameter matrix comparing biometric measurements, draft power, speed, agility, and saddle requirements.
- **Heritage Library**: 30 comprehensive monographs detailing equestrian archaeology, ancient cavalry warfare, and landrace conservation.
- **Multilingual Support**: Instant localization in English (`en`), French (`fr`), and German (`de`).
- **Clean Editorial Design**: Minimalist high-contrast aesthetic with deep black typography on pure white background.

---

## Tech Stack

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Tooling**: [Vite 8](https://vite.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons & Animation**: [Lucide React](https://lucide.dev/), [Motion](https://motion.dev/)
- **Zero-Dependency Asset Architecture**: Images and world map backed by local assets and inline Base64 fallbacks for 100% uptime on static CDNs.

---

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. Start the local development server
npm run dev
# The app will be running at http://localhost:3000

# 3. Test production build
npm run build

# 4. Preview production build locally
npm run preview
```

---

## Deploying to Cloudflare Pages 🚀

This repository is pre-configured and 100% ready for deployment on **Cloudflare Pages**.

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit: The Global Horse Atlas"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git push -u origin main
```

### Step 2: Connect to Cloudflare Pages
1. Log in to your [Cloudflare Dashboard](https://dash.cloudflare.com/) and navigate to **Workers & Pages**.
2. Click **Create Application** > **Pages** > **Connect to Git**.
3. Select your newly created GitHub repository.
4. Set the build configuration:
   - **Framework preset**: `Vite` (or `None`)
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `/` *(leave empty or default)*
5. Click **Save and Deploy**.

> **Note on Redirects**: This application uses client-side hash routing (`#catalog`, `#map`, `#sponsor`, etc.). No `_redirects` file is required, preventing circular redirect loops on Cloudflare Pages.

---

## Research Collaboration

- **Official Research Partner & Info Provider**: [Sorenta Saddlery](https://sorenta-saddlery.com/)
- **Taxonomic Standard**: *Equus caballus* (FAO DAD-IS & ISO Standards)
- **License**: Educational open-access resource for equine welfare.
