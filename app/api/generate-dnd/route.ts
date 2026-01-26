import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { type, theme, characterCount, difficulty } = await request.json();
    
    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: `You are an expert Dungeon Master and D&D campaign designer. Generate creative, balanced, and engaging D&D 5e content. Return ONLY valid JSON with no markdown formatting.`
          },
          {
            role: 'user',
            content: generatePrompt(type, theme, characterCount, difficulty)
          }
        ],
        temperature: 0.8,
        max_tokens: 3000
      })
    });

    if (!response.ok) {
      throw new Error('OpenAI API request failed');
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    // Parse the JSON response
    const generatedContent = JSON.parse(content);
    
    return NextResponse.json(generatedContent);
  } catch (error) {
    console.error('Error generating D&D content:', error);
    return NextResponse.json(
      { error: 'Failed to generate content' },
      { status: 500 }
    );
  }
}

function generatePrompt(type: string, theme: string, characterCount: number, difficulty: string): string {
  const themeText = theme || 'a classic fantasy adventure';
  
  if (type === 'campaign') {
    return `Generate a D&D 5e campaign for ${difficulty} difficulty with the theme: "${themeText}".

Return a JSON object with this exact structure:
{
  "campaign": {
    "title": "campaign name",
    "setting": "brief setting description (2-3 sentences)",
    "synopsis": "campaign story overview (4-5 paragraphs)",
    "npcs": ["NPC 1: name and role", "NPC 2: name and role", "NPC 3: name and role", "NPC 4: name and role"],
    "quests": ["Quest 1 description", "Quest 2 description", "Quest 3 description"],
    "encounters": ["Encounter 1 details with enemies and difficulty", "Encounter 2 details", "Encounter 3 details"]
  }
}`;
  }
  
  if (type === 'character') {
    return `Generate ${characterCount} diverse D&D 5e player characters for a ${difficulty} campaign.

Return a JSON object with this exact structure:
{
  "characters": [
    {
      "name": "character name",
      "race": "D&D race",
      "class": "D&D class",
      "background": "character background",
      "stats": {
        "str": 10-18,
        "dex": 10-18,
        "con": 10-18,
        "int": 10-18,
        "wis": 10-18,
        "cha": 10-18
      },
      "skills": ["skill 1", "skill 2", "skill 3", "skill 4"],
      "equipment": ["item 1", "item 2", "item 3", "item 4", "item 5"]
    }
  ]
}

Generate ${characterCount} characters with varied races, classes, and playstyles.`;
  }
  
  // type === 'both'
  return `Generate a complete D&D 5e campaign with ${characterCount} player characters for ${difficulty} difficulty.
Theme: "${themeText}"

Return a JSON object with this exact structure:
{
  "campaign": {
    "title": "campaign name",
    "setting": "brief setting description (2-3 sentences)",
    "synopsis": "campaign story overview (4-5 paragraphs)",
    "npcs": ["NPC 1: name and role", "NPC 2: name and role", "NPC 3: name and role", "NPC 4: name and role"],
    "quests": ["Quest 1 description", "Quest 2 description", "Quest 3 description"],
    "encounters": ["Encounter 1 details with enemies and difficulty", "Encounter 2 details", "Encounter 3 details"]
  },
  "characters": [
    {
      "name": "character name",
      "race": "D&D race",
      "class": "D&D class",
      "background": "character background",
      "stats": {
        "str": 10-18,
        "dex": 10-18,
        "con": 10-18,
        "int": 10-18,
        "wis": 10-18,
        "cha": 10-18
      },
      "skills": ["skill 1", "skill 2", "skill 3", "skill 4"],
      "equipment": ["item 1", "item 2", "item 3", "item 4", "item 5"]
    }
  ]
}

Generate ${characterCount} diverse characters that fit the campaign theme.`;
}
