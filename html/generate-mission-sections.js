const https = require('https');
const fs = require('fs');
const path = require('path');

const API_KEY = 'sk_9975fa29bbb9615ddffd0857dd981688098890548b27ad96';
const VOICE_ID = '5qJjFbFKpzUf8dnyYcGV';

const sections = [
  {
    file: 'mission-intro.mp3',
    text: `The Mission.

Building a better society through investing in individuals.

Every human being is created with purpose. Every person's purpose is the same — to use whatever gift was given to you to progress humanity forward by sharing your gift with those around you to the best of your ability, no matter what circumstances life throws at you. And since the beginning of time, courageous, curious, and determined individuals have been moving humanity forward. More importantly, the number of people moving humanity forward at the same time is growing, and the larger we grow the faster we grow. And we are relentless in our efforts.

It is time to move humanity forward into another era. An era in which we are all mindful, independent thinkers who have high levels of emotional intelligence. Getting there will be hard work and it will take decades, but the reward will be great. It will mean real freedom for all. Freedom for us all to make decisions for ourselves. It will mean less crime, stronger families, and smaller government. It is the only way we reduce the prison population and shrink the gap between the rich and the poor. It is the only way to cure the addiction crisis. And it is the only way to cure racism and bigotry.

This transition is already happening with the efforts of millions of individuals and hundreds of thousands of organizations around the world who are sharing what they have learned about life through whatever gift was given to them.

Individuals in local and state governments should be focused on redesigning the criminal justice and education systems. In the education system, we need to focus less on forcing children to learn specific subjects, and focus more on the individual child. In the judicial system, we need less regulation and punishment, and more compassion, understanding, and teaching.

We need companies, organizations, and individuals to implement anything, anywhere, that will increase levels of mindfulness, emotional intelligence, and unconditional love — which will foster healing, prosperity, and freedom for all.

The goal of this foundation is to spread good and useful knowledge, and to unite the hundreds of thousands of people and organizations who are working tirelessly to make this country, and the world, a safer and better place for every single person — no matter what their social status, skin color, beliefs, or how bad their crime.

We want to invite every single individual to embark on a journey of learning and growing with us. We can never learn everything there is to know in a single lifetime, but together as individuals we'll discover as much as we can.`
  },
  {
    file: 'mission-healing.mp3',
    text: `Healing America by Investing in Individuals.

Many are suffering — but we do not have to.

Mindfulness, awareness, and emotional intelligence — or the capacity to be aware of, control, and express our emotions, and to handle interpersonal relationships judiciously and empathetically — is how we heal society.

Our beliefs, our morals, how we perceive situations, our political affiliations, and so much of who we are is shaped by our experiences in life. Our experiences create our perception. But we are only one perspective of 7.9 billion.

The most valuable thing you can possess in life is the ability to assess and override your emotions. That comes with understanding why you feel the way you feel, and believe the things you believe.`
  },
  {
    file: 'mission-prosperity.mp3',
    text: `Prosperity for All.

Being prosperous isn't all about money.

It's mostly about happiness and fulfillment. The research proves that being rich doesn't make you happy. So how do we all become prosperous? No one can give you prosperity. We have to create prosperity for ourselves.

To do that, we all have to know that happiness and fulfillment come from within. And then we have to know how to achieve it — in spite of our external environment.

Prosperity is achieved through knowledge, mindfulness, independent thinking, and emotional intelligence.

There is no prosperity for all without healing for all.`
  },
  {
    file: 'mission-freedom.mp3',
    text: `Freedom For All.

The rule of law only works if the individual follows it — and we only follow what we believe we should. If you see it as unfair, you won't believe in it.

Most of us can identify at least one thing that we believe society is trying to restrict us from or force on us — either by law or social norms. On the flip side, most of us are okay with forcing our beliefs on others.

For many of us, our belief systems are arbitrary. Most people do not take the time to validate or disprove their knowledge. Likely because we are products of a public education system that trained us to accept knowledge without question. Our beliefs are nothing more than a compilation of our own experiences and perceptions.

It's when we venture outside our own experience and perceptions that we learn and grow the most.

Real freedom in life happens within us — by allowing ourselves to be free from our own judgements of ourselves and others.

Mindfulness and emotional intelligence reduces judgement and breeds love, empathy, and compassion in any individual who practices it.

You and I cannot be free until we can allow others to be free.`
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
