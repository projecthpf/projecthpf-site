const https = require('https');
const fs = require('fs');
const path = require('path');

const API_KEY = 'sk_9975fa29bbb9615ddffd0857dd981688098890548b27ad96';
const VOICE_ID = '5qJjFbFKpzUf8dnyYcGV';

const text = `Why the PRIME Act Is Imperative to Building Our New Utopia.

If food freedom is the foundation of a new utopia, then the PRIME Act — the Processing Revival and Intrastate Meat Exemption Act — is one of the most important legislative tools we have for making that vision a reality. Right now. Within the current system.

The PRIME Act would allow small farms and ranches to have their animals processed at small, USDA-exempt custom slaughterhouses and sell that meat directly to consumers, restaurants, grocery stores, and institutions — all within their own state — without requiring federal USDA inspection of the slaughter facility.

This is not a radical idea. It is a restoration of the kind of local food systems that sustained communities for generations, before industrial consolidation stripped them bare.

What the PRIME Act Does.

Under current federal law, meat sold to consumers must be processed in a USDA-inspected facility. This sounds reasonable — until you understand that there are only about 800 federally inspected beef slaughterhouses left in the entire United States. And a handful of corporations control most of them.

The result? Small farmers who raise ethical, clean, pasture-raised animals are forced to drive hundreds of miles to a USDA facility. They wait months for a processing slot — often twelve to eighteen months out. They pay rates designed for industrial scale, not small family farms. And they lose control over their product quality and handling.

The PRIME Act removes this stranglehold. It restores states' rights to allow intrastate meat sales from custom-exempt processors — giving small farmers a viable path to market and giving consumers access to locally raised meat they can trust.

Seven Reasons the PRIME Act Is Essential to Our New World.

One. It Rebuilds Local Economies. When small farms can sell directly within their state, money circulates locally. Every dollar spent at a local farm stays in the community — it pays local workers, funds local suppliers, and builds local wealth instead of being siphoned to distant corporations. The PRIME Act would catalyze new small-scale processing facilities, rural jobs and apprenticeships, new farm-to-table supply chains, stronger local tax bases, and thriving rural communities instead of dying ones.

Two. It Ends Industrial Food Dependence. Today's industrial meat system is deeply fragile. COVID-19 exposed this when just a handful of plant closures caused nationwide meat shortages overnight. The PRIME Act decentralizes meat production — creating hundreds of small, resilient, community-based supply nodes instead of a handful of corporate choke points. A decentralized food system cannot be shut down by one disease outbreak, one corporate decision, or one federal policy failure. It is inherently more resilient — and more just.

Three. It Makes Ethical Regenerative Farming Viable. The small farmers raising cattle on open pasture, pigs in the woods, and chickens on clean land are doing the work of healing the earth. But they cannot compete when the system demands they process through industrial facilities that were built for factory farming scale. The PRIME Act levels the playing field. It makes regenerative agriculture economically viable — giving ethical farmers a real market and giving the planet a chance to heal through the very act of local food production.

Four. It Honors Consumer Choice and Personal Sovereignty. In a free society, adults should have the right to choose where their food comes from. They should be able to walk up to a local farmer, know how the animal was raised, watch it processed if they wish, and bring that meat home — without a federal bureaucracy standing in between. The PRIME Act says: People have the right to make informed food choices. It restores the most fundamental marketplace — the direct relationship between a producer and a consumer — which is the backbone of any community economy.

Five. It Reinforces Our New Governance Model. One of the core principles of the new economic paradigm we are building is that governance should be as local as possible. Decisions about food — what is safe, what is allowed, what standards apply — should be made at the state and community level, not handed down by Washington bureaucracies that serve corporate interests. The PRIME Act is a direct expression of this principle. It says: States know their farmers. Communities know their food. Let them decide.

Six. It Reduces the Cost of Real Food for Everyday People. One of the cruelest ironies of the industrial food system is that the cheapest, most accessible food is often the worst for you — while clean, ethical, local food is priced out of reach for working families. The PRIME Act changes this dynamic. When small processors can legally operate and sell locally, transportation costs drop, middlemen are eliminated, competition increases at the local level, and prices fall while quality rises. Real food becomes accessible food. That is a cornerstone of genuine prosperity.

Seven. It Is the First Domino in Ending Corporate Capture of Food. The industrial food system did not become dominant because it was better. It became dominant because regulatory structures — written largely by lobbyists — made small-scale competition impossible. The PRIME Act begins to dismantle this structure — not by tearing everything down, but by opening a door that has been deliberately locked.

Once that door opens, it creates precedent. It proves the model works. It shows communities that local food systems are viable, safe, and superior. And it builds the political and economic infrastructure for deeper change: raw milk freedom, heirloom seed protections, local food labeling rights, and community food sovereignty ordinances that put power back in the hands of people.

The PRIME Act is not just a farm bill. It is a declaration of food sovereignty.

It says that in our new model, the local farmer has a right to a market. The conscious consumer has a right to choose. The community has a right to build its own food economy. And no corporation or federal agency has the right to stand in between a person and the food that sustains them.

In the world we are building, the PRIME Act is not optional. It is foundational. It is a vote for local economies over corporate monopolies. A vote for regenerative agriculture over industrial destruction. A vote for personal sovereignty over bureaucratic control. A vote for community resilience over systemic fragility. A vote for real food for all people — not just for those who can afford the premium.

Pass the PRIME Act. Feed the people. Build the utopia.`;

const body = JSON.stringify({
  text: text,
  model_id: 'eleven_turbo_v2_5',
  voice_settings: { stability: 0.5, similarity_boost: 0.75 }
});

const options = {
  hostname: 'api.elevenlabs.io',
  path: `/v1/text-to-speech/${VOICE_ID}`,
  method: 'POST',
  headers: {
    'xi-api-key': API_KEY,
    'Content-Type': 'application/json',
    'Accept': 'audio/mpeg',
    'Content-Length': Buffer.byteLength(body)
  }
};

const outputPath = path.join(__dirname, 'audio', 'prosperity-prime-act.mp3');
console.log('Generating PRIME Act narration...');

const req = https.request(options, (res) => {
  if (res.statusCode !== 200) {
    let err = '';
    res.on('data', d => err += d);
    res.on('end', () => { console.error('Error', res.statusCode, err); process.exit(1); });
    return;
  }
  const out = fs.createWriteStream(outputPath);
  res.pipe(out);
  out.on('finish', () => {
    const size = fs.statSync(outputPath).size;
    console.log(`Done! Saved to ${outputPath} (${Math.round(size/1024)} KB)`);
  });
});

req.on('error', (e) => { console.error('Request error:', e); process.exit(1); });
req.write(body);
req.end();
