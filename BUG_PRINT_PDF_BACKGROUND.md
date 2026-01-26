# BUG: D&D Generator Print/PDF Export Shows Blue Gradient Background

**Status:** OPEN  
**Priority:** HIGH  
**Affected Pages:** `/dnd-demo`, `/dnd-generator`  
**Reported:** 2026-01-25  
**Browser:** Safari on macOS  

## Problem

When printing the D&D Generator pages or saving as PDF, the output shows a **blue/purple gradient background** instead of white, making the content unreadable.

**Expected:** White background with black text  
**Actual:** Blue gradient background (from-purple-900 via-blue-900 to-indigo-900)

## Evidence

- Print preview shows correctly (white background)
- Actual PDF export shows blue gradient
- User confirmed issue persists across multiple fix attempts
- Screenshot: User provided PDF showing solid blue pages

## What We've Tried

### Attempt 1: CSS Override
```css
@media print {
  body { background: white !important; }
  .bg-gradient-to-br { background: white !important; }
}
```
**Result:** Failed - gradient still printed

### Attempt 2: Force Color Adjustment
```css
@media print {
  * {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
}
```
**Result:** Failed - no change

### Attempt 3: Separate Fixed Backgrounds
```jsx
{/* Screen only */}
<div className="fixed inset-0 bg-gradient-to-br ... print:hidden" />

{/* Print only */}
<div className="hidden print:block fixed inset-0 bg-white" />
```
**Result:** Failed - gradient still appeared in PDF

### Attempt 4: Nuclear CSS Reset
```css
@media print {
  * {
    margin: 0 !important;
    padding: 0 !important;
    background: none !important;
    background-color: transparent !important;
    background-image: none !important;
  }
  html, body {
    background: #fff !important;
  }
}
```
**Result:** Failed - gradient STILL prints

## Technical Details

**Framework:** Next.js 16.1.4  
**Styling:** Tailwind CSS  
**Build:** Static export (SSG)  
**Deployment:** Cloudflare Pages  

**Gradient Classes:**
```
bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900
```

**Browser Behavior:**
- Print preview renders correctly (uses screen CSS + print overrides)
- PDF export uses different rendering engine (ignores print CSS?)
- Safari on macOS confirmed affected

## Suspected Causes

1. **Tailwind gradient utilities** may use `-webkit-` prefixed properties that aren't properly reset
2. **Cloudflare Pages build** might be processing CSS differently
3. **Next.js static export** may not include full print CSS
4. **Safari PDF renderer** has known issues with complex CSS gradients
5. **Fixed positioning** of gradient layer may be causing z-index issues in print

## Reproduction Steps

1. Visit https://emtesseract.com/dnd-demo
2. Open print dialog (Cmd+P)
3. Select "Save as PDF"
4. Observe: Pages are solid blue instead of white

## Workarounds Considered

### Option A: Server-Side PDF Generation
- Use Puppeteer/Playwright to generate PDFs
- Add API endpoint: `/api/generate-pdf`
- Full control over rendering
- **Downside:** Requires backend, higher cost

### Option B: Client-Side PDF Library
- Use jsPDF or pdfmake
- Generate PDF from data directly
- No print CSS issues
- **Downside:** Need to rebuild entire layout in PDF library

### Option C: Separate Print Page
- Create `/dnd-demo/print` route
- Completely different HTML/CSS optimized for print
- No gradient, minimal styling
- **Downside:** Duplicate code

### Option D: Remove Gradient
- Just use solid background color or white
- Simplest solution
- **Downside:** Less visually appealing on screen

## Recommended Solution

**Short-term:** Option D - Remove gradient, use solid color  
**Long-term:** Option B - Implement proper PDF generation library

## Files Affected

- `/app/dnd-demo/page.tsx`
- `/app/dnd-generator/page.tsx`

## Next Steps

1. Test in other browsers (Chrome, Firefox) to isolate Safari issue
2. Check Tailwind compilation output for gradient CSS
3. Inspect actual PDF source to see what CSS is being applied
4. Consider removing gradient entirely for print-focused pages
5. Implement Option B (PDF library) if professional PDFs are critical

## References

- [CSS Print Issues with Gradients](https://stackoverflow.com/questions/tagged/css-print+gradient)
- [Tailwind Print Utilities](https://tailwindcss.com/docs/customizing-colors#using-css-variables)
- [Next.js Static Export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [jsPDF Documentation](https://github.com/parallax/jsPDF)

## Owner

**Assigned to:** Mark Mercado  
**Expected Fix Date:** TBD  

---

**Notes:**
This is a known limitation of browser print CSS. May require architectural change rather than CSS fix.
