const https = require('https');
const fs = require('fs');
const path = require('path');

const API_KEY = 'sk_9975fa29bbb9615ddffd0857dd981688098890548b27ad96';
const VOICE_ID = '5qJjFbFKpzUf8dnyYcGV';

const sections = [
  {
    file: 'participate-healing.mp3',
    text: `Healing a Nation.

So how do we heal a nation and make its people prosperous so we can all be free to be ourselves? Through knowledge.

We all need a lesson on the human psyche. We need to understand how our own psyche develops and works. We have to start teaching this everywhere, to everyone. We have to teach it in the education system — to teachers, staff, students, and parents. We have to teach it in the judicial system — to judges, attorneys, prosecutors, police officers, to prison guards, and to inmates.

Educating a nation on how you cure evil — on how you really stop bad things from happening — will take decades. But imagine what America will look like when we all feel good about ourselves and others. Having a far more emotionally intelligent society will shrink the gap between the rich and the poor. It will lower crime rates and divorce rates, meaning stronger families. It would all around make America and the world a safer and better place to live.`
  },
  {
    file: 'participate-free.mp3',
    text: `Participation is Free!

But it will be hard work — and you will fail a lot. You cannot have success without hard work and failure, because growth comes from failure.

How? First, ask yourself "Why?" — a lot. Why do I believe this? Why do I prefer that? Why do I do this, or that? Why do I feel this emotion? Why do I feel that emotion? Do this until you realize that a large portion of who you are was determined by your environment and your experiences — and not because that's just the way it is.

Spend time every day, even if it's just for 5 minutes, enriching yourself. Here are some ways you can do that.

Meditation. Spend quiet time with yourself to develop awareness and calm your mind.

Ted Talks. Visit our Facebook page for great talks that challenge and inspire.

Follow positive hashtags on social media — such as positive vibes, GoalCast, and keeponlearningdaily.

Watch documentaries. Dream Killer, MAID, Exhibit A, Time: The Kalief Browder Story, 13th, I AM A Killer, Superhuman.

Read books. The Power of Now, The 7 Habits of Highly Effective People, Emotional Intelligence, 12 Rules for Life, Becoming Supernatural, Factfulness, Can't Hurt Me, The Subtle Art of Not Giving A F-asterisk-ck, Think Again.`
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
