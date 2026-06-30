const https = require('https');
const fs = require('fs');
const path = require('path');

const API_KEY = 'sk_9975fa29bbb9615ddffd0857dd981688098890548b27ad96';
const VOICE_ID = '5qJjFbFKpzUf8dnyYcGV';

const text = `Beyond the PRIME Act: The Food Revolution.

For generations, Americans have been told that food freedom must operate within systems designed for industrial agriculture — systems built for centralized production, mass distribution, and corporate control. While reforms like the PRIME Act represent important steps toward restoring local food sovereignty, true prosperity requires going further.

Prosperity begins when people reclaim authority over the most fundamental human necessity: food.

Across the country, a growing movement of farmers, ranchers, homesteaders, and citizens is advancing what can only be described as The Food Revolution — a peaceful revolution to restore the natural relationship between people, land, and nourishment.

The Food Emancipation Proclamation.

Led by regenerative farmer and agricultural pioneer Joel Salatin, the Food Emancipation Proclamation challenges the assumption that centralized regulation should determine how neighbors feed one another.

Salatin and countless independent producers argue that food produced responsibly, transparently, and locally should not be treated as a controlled commodity requiring industrial compliance structures. Instead, food should be governed by trust, relationship, and accountability at the community level.

The proclamation advances a simple but powerful principle: If informed adults voluntarily choose to buy food directly from a farmer, government permission should not stand between them.

This vision reframes agriculture from an industrial supply chain into a human ecosystem — where farmers steward land, communities support producers, and prosperity flows locally rather than upward into distant corporate structures.

The Food Declaration of Independence.

Complementing this movement is the Food Declaration of Independence, championed by rancher and food freedom advocate Steve Jarvis.

Jarvis calls for Americans to recognize food choice as a natural right rather than a regulated privilege. The declaration asserts that individuals possess the inherent authority to decide: what food they eat, who produces it, how it is grown or raised, and how it is exchanged within voluntary markets.

At its core, the declaration restores food to its rightful place — not as an industrial product controlled by distant institutions, but as a cornerstone of human autonomy, health, and economic resilience.

Prosperity Through Food Freedom.

Project HPF recognizes that prosperity cannot exist without food sovereignty.

When communities regain control of food systems — local economies strengthen. Small farms thrive. Health outcomes improve. Environmental stewardship becomes profitable. Families reconnect with the sources of their sustenance.

Food freedom decentralizes power. It distributes opportunity. It creates resilience against fragile global supply chains and economic instability.

Beyond legislative reform, the Food Revolution represents a cultural shift — one that honors farmers as innovators, consumers as decision-makers, and communities as capable of governing themselves.

The Project HPF Vision.

Project Healing Prosperity and Freedom supports a future where farmers and consumers engage freely through voluntary exchange. Where local food networks replace dependency on centralized systems. Where regulation protects against fraud and harm — not independence and innovation. And where prosperity grows from the ground up, literally and economically.

The Food Revolution is not merely about agriculture. It is about restoring the human right to nourish ourselves, our families, and our communities without unnecessary interference.

Because prosperity begins when people are free to feed one another.`;

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

const outputPath = path.join(__dirname, 'audio', 'prosperity-revolution.mp3');
console.log('Generating Food Revolution narration...');

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
