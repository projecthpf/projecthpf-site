const https = require('https');
const fs = require('fs');
const path = require('path');

const API_KEY = 'sk_9975fa29bbb9615ddffd0857dd981688098890548b27ad96';
const VOICE_ID = '5qJjFbFKpzUf8dnyYcGV';

const sections = [
  {
    file: 'life-intro.mp3',
    text: `Life is incredibly complicated and complex. It is this and it is that. It appears that life may be infinite; going on forever. New forms of life come and old ones go but life marches on.

Humanity is making new discoveries and learning new things about how interconnected all life is at rapid speeds right now. However, new information, no matter how concrete, does not necessarily equal fact to most of society.

For society as a whole, there are only two guarantees in life: change and physical death. Everything else is subject to new information and interpretation.

Virtually all of us are automatically conditioned to live life the way others around us do. It's part of how we were designed to learn and grow.

How then do we determine if we are doing life the way we were designed, both as individuals and as a humanity?

Some of us will question our conditioning and will look for answers in religion, social groups, or other ideologies. Fewer of us will also look within for answers. However, to truly serve our purpose as we were designed, we must look within.

Although all human beings are 99.9% identical in their genetic makeup we are all individually, incredibly unique. And not just in our outward appearances but also inward; our personalities and how we experience life is unique to each individual. Our inward experience is our clue to discovering our purpose in life so we have to examine our thoughts and explore our curiosities.

Life is dangerous and death is almost always a split second away. No one can protect you from life better than you; so we have to be willing to take responsibility for all aspects of our own lives; anything that affects our life is our responsibility.

If life is in fact infinite, then this human experience of life is incredibly short even if we live to be 100. Why waste it living a life that you're not happy with?`
  },
  {
    file: 'life-film.mp3',
    text: `An Interesting Film to Broaden Your Perspective of Life.

"The Reality of Truth" is a captivating documentary film that embarks on an extraordinary exploration of consciousness, spirituality, and the powerful potential within each of us to transform our lives. In this thought-provoking journey, viewers are taken on a mesmerizing expedition across the globe, as renowned author and visionary filmmaker Mike Zapolin, alongside actress and activist Michelle Rodriguez, delve into ancient wisdom traditions, psychedelic experiences, and innovative therapies to unlock the secrets of human consciousness.

Drawing upon the insights of luminaries like Deepak Chopra, Ram Dass, and Sri Sri Ravi Shankar, this documentary challenges conventional thinking and invites us to expand our understanding of reality. Through personal stories, expert interviews, and breathtaking visuals, "The Reality of Truth" reveals the interconnectedness of all things and the potential for personal transformation through self-discovery and spiritual awakening.

From the remote jungles of Peru, where ancient shamanic practices are revived, to the cutting-edge therapies that utilize plant medicines, this film bridges the gap between ancient wisdom and modern science. It explores the transformative power of meditation, the healing potential of psychedelic substances, and the integration of these experiences into our everyday lives.

As the journey unfolds, viewers are invited to question their own perceptions of reality and to consider the profound impact of consciousness on our physical and mental well-being. With each step, "The Reality of Truth" encourages us to embark on a personal quest for truth, authenticity, and self-realization.

By shining a light on the depths of human consciousness, this documentary film challenges us to reevaluate our own beliefs, fears, and limitations. It reminds us that there is a reality beyond the surface, waiting to be discovered and embraced. Join us on this awe-inspiring expedition as we transcend the boundaries of our minds and dive headfirst into "The Reality of Truth."`
  }
];

function generate(section) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      text: section.text,
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
    const outputPath = path.join(__dirname, 'audio', section.file);
    console.log(`Generating ${section.file}...`);
    const req = https.request(options, (res) => {
      if (res.statusCode !== 200) {
        let err = '';
        res.on('data', d => err += d);
        res.on('end', () => { console.error(`Error ${section.file}:`, res.statusCode, err); reject(err); });
        return;
      }
      const out = fs.createWriteStream(outputPath);
      res.pipe(out);
      out.on('finish', () => {
        const size = fs.statSync(outputPath).size;
        console.log(`✓ ${section.file} (${Math.round(size/1024)} KB)`);
        resolve();
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

(async () => {
  for (const s of sections) {
    await generate(s);
  }
  console.log('All done!');
})();
