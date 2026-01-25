# emtesseract Marketing Website (Next.js)

**Cyberpunk/glitch aesthetic brand kit applied**

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Fonts:** JetBrains Mono (monospace) + Inter (sans-serif)

## Features

✅ Animated glitch morph logo (M → tesseract)  
✅ RGB splitting effects (cyan/magenta)  
✅ Scan lines overlay  
✅ Cyberpunk aesthetic  
✅ Fully responsive  
✅ Fast & smooth animations  
✅ Type-safe  

## Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import in Vercel
3. Deploy automatically

### GitHub Pages (Static Export)
```bash
# Update next.config.js for static export
npm run build
# Deploy the `out/` directory
```

## Brand Kit

The animated logo component is at: `components/GlitchMorphLogo.tsx`

**Brand Colors:**
- Cyan: `#00FFFF`
- Magenta: `#FF00FF`
- Black: `#0a0a0a`

**Typography:**
- Headings: JetBrains Mono (monospace)
- Body: Inter (sans-serif)

## Structure

```
emtesseract-nextjs/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Homepage
│   └── globals.css         # Global styles
├── components/
│   └── GlitchMorphLogo.tsx # Animated logo
├── public/                 # Static assets
└── tailwind.config.ts      # Tailwind configuration
```

## URL

- **Local:** http://localhost:3000
- **Production:** TBD

---

**Created:** 2026-01-25  
**Family:** Mark, Mary, Mark Jr (Buddy), Jude
