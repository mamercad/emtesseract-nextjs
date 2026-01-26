'use client';

import React, { useState } from 'react';

interface GeneratedContent {
  campaign?: {
    title: string;
    setting: string;
    synopsis: string;
    npcs: string[];
    quests: string[];
    encounters: string[];
  };
  characters?: Array<{
    name: string;
    race: string;
    class: string;
    background: string;
    stats: {
      str: number;
      dex: number;
      con: number;
      int: number;
      wis: number;
      cha: number;
    };
    skills: string[];
    equipment: string[];
  }>;
  sessionNotes?: string;
}

export default function DnDGenerator() {
  const [generationType, setGenerationType] = useState<'campaign' | 'character' | 'both'>('both');
  const [campaignTheme, setCampaignTheme] = useState('');
  const [characterCount, setCharacterCount] = useState(4);
  const [difficulty, setDifficulty] = useState('medium');
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState<GeneratedContent | null>(null);
  const [error, setError] = useState('');

  const generateContent = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/generate-dnd', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: generationType,
          theme: campaignTheme || 'fantasy adventure',
          characterCount,
          difficulty
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate content');
      }

      const data = await response.json();
      setGenerated(data);
    } catch (err) {
      setError('Failed to generate D&D content. Make sure the API is configured.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const printContent = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Branding Header */}
        <div className="text-center mb-6 print:mb-2">
          <a href="/" className="inline-block print:hidden hover:opacity-80 transition-opacity">
            <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2" style={{ fontFamily: 'monospace' }}>
              emtesseract
            </div>
          </a>
          <div className="hidden print:block text-2xl font-bold text-gray-800 mb-2" style={{ fontFamily: 'monospace' }}>
            emtesseract
          </div>
        </div>

        <h1 className="text-5xl font-bold text-white mb-2 text-center print:text-gray-900">
          🎲 D&D Campaign Generator 🐉
        </h1>
        <p className="text-xl text-purple-200 mb-8 text-center print:text-gray-600">
          AI-Powered Dungeons & Dragons Content Creator
        </p>

        {!generated ? (
          <div className="bg-white rounded-lg shadow-2xl p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              What would you like to generate?
            </h2>

            <div className="space-y-6">
              {/* Generation Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Generation Type
                </label>
                <div className="grid grid-cols-3 gap-4">
                  <button
                    onClick={() => setGenerationType('campaign')}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      generationType === 'campaign'
                        ? 'border-purple-600 bg-purple-50'
                        : 'border-gray-300 hover:border-purple-400'
                    }`}
                  >
                    <div className="text-3xl mb-2">📜</div>
                    <div className="font-semibold">Campaign Only</div>
                    <div className="text-sm text-gray-600">DM materials</div>
                  </button>
                  <button
                    onClick={() => setGenerationType('character')}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      generationType === 'character'
                        ? 'border-purple-600 bg-purple-50'
                        : 'border-gray-300 hover:border-purple-400'
                    }`}
                  >
                    <div className="text-3xl mb-2">⚔️</div>
                    <div className="font-semibold">Characters Only</div>
                    <div className="text-sm text-gray-600">Player sheets</div>
                  </button>
                  <button
                    onClick={() => setGenerationType('both')}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      generationType === 'both'
                        ? 'border-purple-600 bg-purple-50'
                        : 'border-gray-300 hover:border-purple-400'
                    }`}
                  >
                    <div className="text-3xl mb-2">🎲</div>
                    <div className="font-semibold">Complete Set</div>
                    <div className="text-sm text-gray-600">Everything</div>
                  </button>
                </div>
              </div>

              {/* Campaign Theme */}
              {(generationType === 'campaign' || generationType === 'both') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Campaign Theme / Setting
                  </label>
                  <input
                    type="text"
                    value={campaignTheme}
                    onChange={(e) => setCampaignTheme(e.target.value)}
                    placeholder="e.g., Dark fantasy with undead, High magic academy, Pirate adventure..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Leave blank for a random theme
                  </p>
                </div>
              )}

              {/* Character Count */}
              {(generationType === 'character' || generationType === 'both') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Player Characters: {characterCount}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="8"
                    value={characterCount}
                    onChange={(e) => setCharacterCount(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>1 player</span>
                    <span>8 players</span>
                  </div>
                </div>
              )}

              {/* Difficulty */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Difficulty Level
                </label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                >
                  <option value="easy">Easy - New Players</option>
                  <option value="medium">Medium - Balanced</option>
                  <option value="hard">Hard - Experienced Players</option>
                  <option value="deadly">Deadly - Veterans Only</option>
                </select>
              </div>

              {/* Generate Button */}
              <button
                onClick={generateContent}
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 text-white font-bold py-4 px-8 rounded-lg text-xl shadow-lg hover:from-purple-600 hover:via-pink-600 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {loading ? (
                  <>
                    <span className="inline-block animate-spin mr-2">⚙️</span>
                    Generating your adventure...
                  </>
                ) : (
                  <>
                    ✨ Generate D&D Content
                  </>
                )}
              </button>

              {error && (
                <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Print Button */}
            <div className="flex gap-4 print:hidden">
              <button
                onClick={printContent}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all"
              >
                🖨️ Print All Documents
              </button>
              <button
                onClick={() => setGenerated(null)}
                className="bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 hover:from-purple-600 hover:via-pink-600 hover:to-cyan-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all"
              >
                ← Generate New Content
              </button>
            </div>

            {/* Campaign Content */}
            {generated.campaign && (
              <div className="bg-white rounded-lg shadow-xl p-8 page-break">
                <h2 className="text-3xl font-bold mb-6 text-purple-900 border-b-4 border-purple-600 pb-2">
                  📜 Campaign: {generated.campaign.title}
                </h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Setting</h3>
                    <p className="text-gray-700">{generated.campaign.setting}</p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Synopsis</h3>
                    <p className="text-gray-700 whitespace-pre-line">{generated.campaign.synopsis}</p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Key NPCs</h3>
                    <ul className="list-disc list-inside space-y-2">
                      {generated.campaign.npcs.map((npc, i) => (
                        <li key={i} className="text-gray-700">{npc}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Main Quests</h3>
                    <ol className="list-decimal list-inside space-y-2">
                      {generated.campaign.quests.map((quest, i) => (
                        <li key={i} className="text-gray-700">{quest}</li>
                      ))}
                    </ol>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Sample Encounters</h3>
                    <div className="space-y-3">
                      {generated.campaign.encounters.map((encounter, i) => (
                        <div key={i} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                          <p className="text-gray-700">{encounter}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Character Sheets */}
            {generated.characters && generated.characters.map((char, index) => (
              <div key={index} className="bg-white rounded-lg shadow-xl p-8 page-break">
                <h2 className="text-3xl font-bold mb-6 text-indigo-900 border-b-4 border-indigo-600 pb-2">
                  ⚔️ Character Sheet #{index + 1}
                </h2>

                <div className="grid grid-cols-3 gap-6 mb-6">
                  {/* Character Portrait */}
                  <div className="col-span-1">
                    <div className="border-4 border-gray-300 rounded-lg p-4 bg-gray-50 h-48 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-6xl mb-2">
                          {(char.class.toLowerCase().includes('fighter') || char.class.toLowerCase().includes('warrior')) && '⚔️'}
                          {(char.class.toLowerCase().includes('ranger') || char.class.toLowerCase().includes('archer')) && '🏹'}
                          {(char.class.toLowerCase().includes('wizard') || char.class.toLowerCase().includes('sorcerer') || char.class.toLowerCase().includes('mage')) && '⚡'}
                          {(char.class.toLowerCase().includes('cleric') || char.class.toLowerCase().includes('priest')) && '✨'}
                          {(char.class.toLowerCase().includes('rogue') || char.class.toLowerCase().includes('thief')) && '🗡️'}
                          {(char.class.toLowerCase().includes('paladin') || char.class.toLowerCase().includes('knight')) && '🛡️'}
                          {(char.class.toLowerCase().includes('druid') || char.class.toLowerCase().includes('shaman')) && '🌿'}
                          {(char.class.toLowerCase().includes('bard') || char.class.toLowerCase().includes('musician')) && '🎵'}
                          {(char.class.toLowerCase().includes('barbarian') || char.class.toLowerCase().includes('berserker')) && '🪓'}
                          {(char.class.toLowerCase().includes('warlock') || char.class.toLowerCase().includes('witch')) && '🔮'}
                          {!(char.class.toLowerCase().match(/fighter|warrior|ranger|archer|wizard|sorcerer|mage|cleric|priest|rogue|thief|paladin|knight|druid|shaman|bard|musician|barbarian|berserker|warlock|witch/)) && '🎲'}
                        </div>
                        <p className="text-xs text-gray-500 mt-2">Character Portrait</p>
                      </div>
                    </div>
                  </div>

                  {/* Character Info */}
                  <div className="col-span-2">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">Character Info</h3>
                    <div className="space-y-2">
                      <p><span className="font-semibold">Name:</span> {char.name}</p>
                      <p><span className="font-semibold">Race:</span> {char.race}</p>
                      <p><span className="font-semibold">Class:</span> {char.class}</p>
                      <p><span className="font-semibold">Background:</span> {char.background}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div></div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">Ability Scores</h3>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-red-50 p-3 rounded border border-red-300 text-center">
                        <div className="text-xs text-gray-600">STR</div>
                        <div className="text-2xl font-bold">{char.stats.str}</div>
                        <div className="text-xs text-gray-600">+{Math.floor((char.stats.str - 10) / 2)}</div>
                      </div>
                      <div className="bg-green-50 p-3 rounded border border-green-300 text-center">
                        <div className="text-xs text-gray-600">DEX</div>
                        <div className="text-2xl font-bold">{char.stats.dex}</div>
                        <div className="text-xs text-gray-600">+{Math.floor((char.stats.dex - 10) / 2)}</div>
                      </div>
                      <div className="bg-blue-50 p-3 rounded border border-blue-300 text-center">
                        <div className="text-xs text-gray-600">CON</div>
                        <div className="text-2xl font-bold">{char.stats.con}</div>
                        <div className="text-xs text-gray-600">+{Math.floor((char.stats.con - 10) / 2)}</div>
                      </div>
                      <div className="bg-purple-50 p-3 rounded border border-purple-300 text-center">
                        <div className="text-xs text-gray-600">INT</div>
                        <div className="text-2xl font-bold">{char.stats.int}</div>
                        <div className="text-xs text-gray-600">+{Math.floor((char.stats.int - 10) / 2)}</div>
                      </div>
                      <div className="bg-yellow-50 p-3 rounded border border-yellow-300 text-center">
                        <div className="text-xs text-gray-600">WIS</div>
                        <div className="text-2xl font-bold">{char.stats.wis}</div>
                        <div className="text-xs text-gray-600">+{Math.floor((char.stats.wis - 10) / 2)}</div>
                      </div>
                      <div className="bg-pink-50 p-3 rounded border border-pink-300 text-center">
                        <div className="text-xs text-gray-600">CHA</div>
                        <div className="text-2xl font-bold">{char.stats.cha}</div>
                        <div className="text-xs text-gray-600">+{Math.floor((char.stats.cha - 10) / 2)}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">Proficient Skills</h3>
                    <ul className="list-disc list-inside space-y-1">
                      {char.skills.map((skill, i) => (
                        <li key={i} className="text-gray-700">{skill}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">Starting Equipment</h3>
                    <ul className="list-disc list-inside space-y-1">
                      {char.equipment.map((item, i) => (
                        <li key={i} className="text-gray-700">{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <footer className="mt-12 text-center print:hidden">
          <div className="border-t border-purple-400 pt-6">
            <p className="text-purple-200 mb-2">Created with</p>
            <a href="/" className="inline-block hover:opacity-80 transition-opacity">
              <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent" style={{ fontFamily: 'monospace' }}>
                emtesseract
              </div>
            </a>
            <p className="text-purple-300 text-sm mt-2">Building the future of games, one pixel at a time.</p>
          </div>
        </footer>

        {/* Print Footer */}
        <div className="hidden print:block text-center mt-8 text-gray-600 text-sm">
          <p>Generated by emtesseract D&D Campaign Generator</p>
          <p className="text-xs mt-1">https://emtesseract.com/dnd-generator</p>
        </div>
      </div>

      <style jsx global>{`
        @media print {
          /* Hide non-printable elements */
          .print\\:hidden {
            display: none !important;
          }
          
          /* Page breaks */
          .page-break {
            page-break-after: always;
            page-break-inside: avoid;
          }
          
          /* Force white backgrounds everywhere */
          body,
          div,
          section,
          .bg-gradient-to-br,
          .bg-white,
          .bg-gray-50,
          .bg-red-50,
          .bg-green-50,
          .bg-blue-50,
          .bg-purple-50,
          .bg-yellow-50,
          .bg-pink-50 {
            background: white !important;
            background-color: white !important;
            background-image: none !important;
          }
          
          /* Force black text everywhere */
          *,
          h1, h2, h3, h4, h5, h6,
          p, li, span, div,
          .text-white,
          .text-gray-700,
          .text-gray-800,
          .text-purple-900,
          .text-indigo-900 {
            color: black !important;
          }
          
          /* Keep borders subtle gray */
          .border,
          .border-purple-600,
          .border-indigo-600,
          .border-gray-200,
          [class*="border-"] {
            border-color: #e5e7eb !important;
          }
          
          /* Ability score boxes - keep subtle backgrounds */
          .bg-red-50 { background: #fee !important; }
          .bg-green-50 { background: #efe !important; }
          .bg-blue-50 { background: #eef !important; }
          .bg-purple-50 { background: #fef !important; }
          .bg-yellow-50 { background: #ffe !important; }
          .bg-pink-50 { background: #fee !important; }
          
          /* Reset color adjustments */
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          /* Page margins */
          @page {
            margin: 0.75in;
            size: letter;
          }
        }
      `}</style>
    </div>
  );
}
