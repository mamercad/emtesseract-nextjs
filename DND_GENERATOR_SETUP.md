# D&D Campaign Generator Setup

The D&D Generator uses OpenAI's GPT-4 to create campaign content and character sheets.

## Setup Instructions

### 1. Get an OpenAI API Key

1. Go to https://platform.openai.com/api-keys
2. Sign in or create an account
3. Click "Create new secret key"
4. Copy the key (starts with `sk-proj-...`)

### 2. Add API Key to Project

Create a file called `.env.local` in the project root:

```bash
OPENAI_API_KEY=sk-proj-your-actual-key-here
```

**Important:** Never commit `.env.local` to git! It's already in `.gitignore`.

### 3. Install Dependencies (if needed)

```bash
npm install
```

### 4. Run Development Server

```bash
npm run dev
```

Visit http://localhost:3000/dnd-generator

### 5. Deploy to Production

When deploying to Cloudflare Pages:

1. Go to your Cloudflare Pages dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add: `OPENAI_API_KEY` with your key value

## Features

### Campaign Generation
- Campaign title and setting
- Story synopsis (4-5 paragraphs)
- Key NPCs with roles
- Main quest lines
- Sample combat encounters

### Character Generation
- Full character sheets (1-8 characters)
- Race, class, background
- Ability scores with modifiers
- Proficient skills
- Starting equipment

### Print Support
- Print button generates printable PDFs
- Each campaign/character on separate page
- Professional formatting for tabletop use

## Cost Estimate

Using GPT-4:
- Campaign only: ~$0.05-0.10 per generation
- Characters only: ~$0.03-0.05 per generation  
- Full set: ~$0.08-0.15 per generation

Monitor your usage at: https://platform.openai.com/usage

## Customization Options

- **Theme/Setting:** Describe any campaign theme (e.g., "dark fantasy with undead", "high seas pirate adventure")
- **Character Count:** 1-8 player characters
- **Difficulty:** Easy, Medium, Hard, Deadly
- **Generation Type:** Campaign only, Characters only, or Both

## Troubleshooting

**Error: "OpenAI API key not configured"**
- Make sure `.env.local` exists with your API key
- Restart the development server after adding the key

**Error: "Failed to generate content"**
- Check your OpenAI API key is valid
- Ensure you have API credits available
- Check browser console for detailed errors

**Empty or broken output**
- Try regenerating
- Check that your API key has GPT-4 access
- Ensure your OpenAI account is in good standing

## Example Themes

Try these campaign themes:
- "Cosmic horror in a Victorian city"
- "Post-apocalyptic magic wasteland"
- "Underwater civilization vs. surface world"
- "Time-traveling adventurers fixing history"
- "Fairy tale world gone dark"
- "Space opera with magic instead of technology"
