const https = require('https');
const fs = require('fs');
const path = require('path');

const API_KEY = 'sk_9975fa29bbb9615ddffd0857dd981688098890548b27ad96';
const VOICE_ID = '5qJjFbFKpzUf8dnyYcGV';
const OUTPUT_DIR = path.join(__dirname, 'audio');

if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const narrations = [
  {
    filename: 'prosperity-americanism.mp3',
    title: 'Americanism vs Communism',
    text: `During the Cold War, both American and Soviet societies were systematically indoctrinated to misunderstand the opposing economic system — reducing complex ideologies to simplistic caricatures to serve state power.

In the United States, Americanism was framed as a divine struggle for freedom and capitalism against godless, tyrannical communism. Schools, media, and civil drills equated free markets with liberty itself — while obscuring their tendencies toward inequality and crisis.

Meanwhile, the Soviet Union taught that state-controlled communism was the scientifically inevitable path to a classless utopia — vilifying capitalism as inherently exploitative, while masking the system's brutal inefficiency and the rise of a new oppressive party elite.

This mutual indoctrination created a profound and lasting societal ill: a financially illiterate populace. This is why it is now crucial for individuals to clearly understand the complete history of money, economics, and the financial system.

Money is not a force of nature. It is a human-made tool — and its design and control have always been a source of immense power. Understanding this history reveals that capitalism, communism, and socialism are not immutable truths but competing frameworks, each with documented flaws deliberately hidden during the Cold War.

Armed with this clarity, we can move beyond the false binaries of the twentieth century and begin designing new, more humane, and sustainable economic models — where we transition from being passive subjects of economic forces to becoming conscious architects of a system that truly serves humanity.`
  },
  {
    filename: 'prosperity-economic-model.mp3',
    title: 'Building a New Economic Model',
    text: `What if the next evolution of America wasn't about choosing between capitalism or communism — but about extracting the best ideals from both and weaving them into a model that finally serves everyone?

What if we could build a world where every person's basic needs are met — not as a privilege granted by the state, but as a foundational guarantee of human dignity? Where individual freedom, creativity, and enterprise are incentivized — allowing people to chase their dreams, whether modest or wildly ambitious? Where communities, not bureaucracies, determine what is best for the people who live within them?

This isn't utopian fantasy. It is the natural next step in human governance — and it is well within our reach.

As we enter a period of profound transition, we face an undeniable truth. The dollar, large segments of the United States government, and many of our industrial systems are approaching collapse. Not because Americans failed — but because the systems we inherited were never designed for the complexity, connectivity, and consciousness of the world we live in now.

But here is the good news. While old structures are falling apart, new, resilient, community-driven systems are already blooming. Micro-economies rooted in cooperation and local empowerment. Regenerative food and energy systems. Decentralized technologies that remove gatekeepers and redistribute power. Governance models that put decision-making back in the hands of the people most affected.

Together, these innovations point toward an emergent economic paradigm — one that harmonizes the security promised by communism with the freedom promised by capitalism, without inheriting the corruption, coercion, or exploitation that plagued either system alone.

This is not about left versus right. It is not socialism versus capitalism. It is about creating something beyond all of that — a human-centered system of governance and economics, built for a society that is ready to evolve.

The collapse is not the end. It is the clearing. It is the space we need to build what comes next. And what comes next is beautiful.`
  },
  {
    filename: 'prosperity-food-freedom.mp3',
    title: 'Food Freedom: The Foundation of a New Utopia',
    text: `Every great civilization begins with one simple truth: Whoever controls the food supply controls the people.

If we are serious about building a world where every human being is free to live with dignity, pursue their purpose, and participate in a thriving community-driven economy — then we must start at the root. Food production and consumption freedom.

Food is not just fuel. Food is autonomy. Food is culture. Food is power. And food is the first layer of sovereignty every human should possess.

Today, a handful of corporations and regulatory bodies determine what we are allowed to grow, what seeds we can access, and what foods are legal to sell, share, or even barter. This system creates dependency — not because people are incapable of feeding themselves, but because they are forbidden from doing so outside of the industrial model.

When people regain the right to grow, trade, buy, and consume food without bureaucratic interference, they reclaim the most essential form of sovereignty. And from that sovereignty, real freedom becomes possible.

We are watching the cracks form in the industrial food system — supply chain fragility, soil depletion, food deserts, contamination recalls, consolidation of farms. A society that relies entirely on centralized production is one disaster away from collapse.

Local food production — community gardens, clean family farms, regenerative agriculture, micro-farms, homesteads, and neighborhood food cooperatives — is the antidote. Local food systems don't just feed people. They fortify communities against economic shocks, political instability, and natural disasters.

When communities produce their own food, hunger disappears. Health improves. The cost of living falls. Families have bargaining power. Wealth stays local. And no one can be coerced by the threat of starvation or scarcity.

Food freedom unleashes creativity and enterprise. It reconnects humans to the land and to each other. And it is the first domino — because you cannot be truly free if the food that keeps you alive is controlled by someone else.

Food freedom makes political freedom possible. It makes economic freedom tangible. It makes human freedom non-negotiable.

This is the beginning of the new utopia — and it all begins with the soil beneath our feet.`
  }
];

function generateAudio(narration) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      text: narration.text,
      model_id: 'eleven_turbo_v2_5',
      voice_settings: {
        stability: 0.48,
        similarity_boost: 0.78,
        style: 0.28,
        use_speaker_boost: true
      }
    });

    const options = {
      hostname: 'api.elevenlabs.io',
      path: `/v1/text-to-speech/${VOICE_ID}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'xi-api-key': API_KEY,
        'Accept': 'audio/mpeg',
        'Content-Length': Buffer.byteLength(body)
      }
    };

    const req = https.request(options, (res) => {
      if (res.statusCode !== 200) {
        let err = '';
        res.on('data', c => err += c);
        res.on('end', () => reject(new Error(`HTTP ${res.statusCode}: ${err}`)));
        return;
      }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => {
        const buf = Buffer.concat(chunks);
        const out = path.join(OUTPUT_DIR, narration.filename);
        fs.writeFileSync(out, buf);
        console.log(`  ✓  ${narration.title}  →  ${narration.filename}  (${(buf.length/1024).toFixed(0)} KB)`);
        resolve(out);
      });
    });

    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function main() {
  console.log(`\nGenerating ${narrations.length} narrations — PHPF Mother Earth 2026\n`);
  for (const n of narrations) {
    process.stdout.write(`  Generating: ${n.title} ...`);
    try {
      await generateAudio(n);
    } catch (e) {
      console.error(`\n  ✗  ${n.title} failed:`, e.message);
    }
  }
  console.log('\nAll done! Files saved to: ' + OUTPUT_DIR + '\n');
}

main();
