'use client';

import React from 'react';

const demoContent = {
  campaign: {
    title: "Shadows of the Crimson Moon",
    setting: "The kingdom of Astoria has fallen into chaos as a blood-red moon hangs perpetually in the sky. Ancient evils stir beneath the earth, and the dead no longer rest peacefully. The capital city of Silverhaven stands as one of the last bastions of civilization, protected by a fading magical barrier.",
    synopsis: `Five years ago, the Crimson Moon appeared without warning, bathing the land in eerie red light. Since that fateful night, the dead have begun rising from their graves, drawn by a mysterious force emanating from the Shadowfell Mountains to the north. King Aldric III disappeared on an expedition to investigate the phenomenon, leaving his daughter, Princess Elara, to rule in his stead.

The party begins their journey in Silverhaven, where they've been recruited by the Royal Mages' Council to investigate recent attacks on outlying villages. These settlements report not only undead incursions but strange cultists wearing crimson robes, performing dark rituals beneath the light of the cursed moon.

As the adventurers delve deeper into the mystery, they'll discover that the Crimson Moon is actually a tear in reality created by the Cult of the Eternal Night. The cult seeks to merge the Material Plane with the Shadowfell, granting them immortality and dominion over both the living and the dead. Their leader, the Lich Lord Malazar, was once King Aldric's most trusted advisor.

The party must gather three ancient artifacts scattered across Astoria: the Sunblade of Dawn (hidden in the Temple of Light), the Mirror of Truth (held by the vampire lord Count Draven), and the Crown of Stars (lost in the ruins of the First Kingdom). Only by combining these artifacts can they close the rift and restore the natural order—but doing so will require confronting both Malazar and the terrifying entity he's summoned from beyond.`,
    npcs: [
      "Princess Elara Silverhaven - Young ruler of Astoria, determined but inexperienced, secretly studying necromancy to fight fire with fire",
      "Archmage Thornwick - Ancient elf, head of the Mages' Council, knows more about the Crimson Moon than he admits",
      "Captain Sera Ironheart - Grizzled human warrior, leads the Silver Guard, lost her family to the undead",
      "Brother Fenwick - Halfling cleric of the Sun God, provides sanctuary and healing, has visions of the future",
      "Lich Lord Malazar - Former royal advisor, now undead lich leading the Cult of the Eternal Night"
    ],
    quests: [
      "The Village of Thornwood - Investigate reports of undead attacks and discover the first crimson-robed cultist. Rescue survivors and obtain a mysterious ritual dagger.",
      "The Temple of Light - Journey through the cursed Whispering Woods to reach the abandoned temple. Fight through shadow demons to claim the Sunblade of Dawn.",
      "Negotiating with the Dead - Seek an audience with Count Draven in his castle. Either negotiate for the Mirror of Truth or take it by force after uncovering his connection to the cult.",
      "Ruins of the First Kingdom - Explore ancient underground ruins filled with traps and guardians. Solve puzzles left by the original kings to reach the Crown of Stars.",
      "Assault on Shadowfell Tower - Lead a combined force of the Silver Guard and allied NPCs in a final assault on Malazar's stronghold. Seal the rift before the planes merge permanently."
    ],
    encounters: [
      "Encounter 1: Ambush at Crossroads - 8 zombies, 2 ghasts, 1 crimson cultist (CR 3). Terrain: Abandoned waystation with collapsing walls providing cover. Cultist attempts to escape to warn others.",
      "Encounter 2: Shadow Demons in the Temple - 3 shadow demons, spectral guardians testing worthiness (CR 5). Terrain: Sacred chamber with pools of holy water that damage undead. Demons phase through walls.",
      "Encounter 3: Count Draven's Court - Count Draven (vampire), 4 vampire spawn, 12 wolf thralls (CR 8). Terrain: Grand ballroom with chandelier (can be dropped), mirrors (Draven avoids them), windows (vulnerability to sunlight if broken).",
      "Encounter 4: The Risen Army - 20 skeletons, 10 zombies, 3 wights, 1 bone golem (CR 6). Terrain: Ruins with elevated positions, crumbling pillars for cover. Wights command the mindless undead tactically.",
      "Encounter 5: Malazar's Final Stand - Lich Lord Malazar, 2 death knights, waves of summoned shadows (CR 12). Multi-phase fight: Malazar in his tower, phylactery must be destroyed simultaneously as the rift is sealed. Environmental hazard: energy from the rift deals damage each round, intensifying over time."
    ]
  },
  characters: [
    {
      name: "Thrain Ironforge",
      race: "Mountain Dwarf",
      class: "Fighter (Battle Master)",
      background: "Soldier - Former member of the Ironpeak Legion",
      stats: { str: 16, dex: 12, con: 16, int: 10, wis: 14, cha: 8 },
      skills: ["Athletics", "Intimidation", "Perception", "Survival"],
      equipment: ["Warhammer", "Chain mail", "Shield with dwarven clan crest", "Crossbow with 20 bolts", "Adventurer's pack", "Military rank insignia"]
    },
    {
      name: "Lyra Moonshadow",
      race: "Wood Elf",
      class: "Ranger (Hunter)",
      background: "Outlander - Grew up in the Whispering Woods",
      stats: { str: 12, dex: 17, con: 14, int: 11, wis: 15, cha: 10 },
      skills: ["Animal Handling", "Nature", "Stealth", "Survival"],
      equipment: ["Longbow", "Quiver with 40 arrows", "Two shortswords", "Studded leather armor", "Traveler's pack", "Herbalism kit"]
    },
    {
      name: "Zephyr Stormwind",
      race: "Air Genasi",
      class: "Sorcerer (Storm Sorcery)",
      background: "Sage - Studied at the Academy of Elemental Arts",
      stats: { str: 8, dex: 14, con: 13, int: 14, wis: 10, cha: 17 },
      skills: ["Arcana", "History", "Insight", "Persuasion"],
      equipment: ["Quarterstaff", "Component pouch", "Scholar's pack", "Spellbook", "Arcane focus (crystal orb)", "Fine clothes"]
    },
    {
      name: "Sister Mercy",
      race: "Human",
      class: "Cleric (Life Domain)",
      background: "Acolyte - Devoted to the Sun God",
      stats: { str: 14, dex: 10, con: 15, int: 12, wis: 17, cha: 13 },
      skills: ["Insight", "Medicine", "Persuasion", "Religion"],
      equipment: ["Warhammer (holy symbol engraved)", "Scale mail", "Shield", "Holy symbol of the Sun God", "Priest's pack", "Healer's kit"]
    }
  ]
};

export default function DnDDemo() {
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

        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-900 p-4 mb-6 rounded print:hidden">
          <p className="font-bold">📋 Demo Preview</p>
          <p>This is a sample of what the D&D Generator creates. The actual generator uses AI to create custom content based on your preferences!</p>
          <a href="/dnd-generator" className="underline font-semibold">Try the real generator →</a>
        </div>

        <h1 className="text-5xl font-bold text-white mb-2 text-center print:text-gray-900">
          🎲 D&D Campaign Generator 🐉
        </h1>
        <p className="text-xl text-purple-200 mb-8 text-center print:text-gray-600">
          Sample Generated Content
        </p>

        <div className="space-y-8">
          {/* Print Button */}
          <div className="flex gap-4 print:hidden">
            <button
              onClick={printContent}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all"
            >
              🖨️ Print All Documents
            </button>
            <a
              href="/dnd-generator"
              className="bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 hover:from-purple-600 hover:via-pink-600 hover:to-cyan-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all"
            >
              ✨ Generate Your Own Campaign
            </a>
          </div>

          {/* Campaign Content */}
          <div className="bg-white rounded-lg shadow-xl p-8 page-break">
            <h2 className="text-3xl font-bold mb-6 text-purple-900 border-b-4 border-purple-600 pb-2">
              📜 Campaign: {demoContent.campaign.title}
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Setting</h3>
                <p className="text-gray-700">{demoContent.campaign.setting}</p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Synopsis</h3>
                <p className="text-gray-700 whitespace-pre-line">{demoContent.campaign.synopsis}</p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Key NPCs</h3>
                <ul className="list-disc list-inside space-y-2">
                  {demoContent.campaign.npcs.map((npc, i) => (
                    <li key={i} className="text-gray-700">{npc}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Main Quests</h3>
                <ol className="list-decimal list-inside space-y-2">
                  {demoContent.campaign.quests.map((quest, i) => (
                    <li key={i} className="text-gray-700">{quest}</li>
                  ))}
                </ol>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Sample Encounters</h3>
                <div className="space-y-3">
                  {demoContent.campaign.encounters.map((encounter, i) => (
                    <div key={i} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <p className="text-gray-700">{encounter}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Character Sheets */}
          {demoContent.characters.map((char, index) => (
            <div key={index} className="bg-white rounded-lg shadow-xl p-8 page-break">
              <h2 className="text-3xl font-bold mb-6 text-indigo-900 border-b-4 border-indigo-600 pb-2">
                ⚔️ Character Sheet #{index + 1}
              </h2>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Character Info</h3>
                  <div className="space-y-2">
                    <p><span className="font-semibold">Name:</span> {char.name}</p>
                    <p><span className="font-semibold">Race:</span> {char.race}</p>
                    <p><span className="font-semibold">Class:</span> {char.class}</p>
                    <p><span className="font-semibold">Background:</span> {char.background}</p>
                  </div>
                </div>

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
          .print\\:hidden {
            display: none !important;
          }
          .page-break {
            page-break-after: always;
          }
          body {
            background: white !important;
          }
          .bg-gradient-to-br {
            background: white !important;
          }
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}</style>
    </div>
  );
}
