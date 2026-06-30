const https = require('https');
const fs = require('fs');
const path = require('path');

const API_KEY = 'sk_9975fa29bbb9615ddffd0857dd981688098890548b27ad96';
const VOICE_ID = '5qJjFbFKpzUf8dnyYcGV';
const OUTPUT_DIR = path.join(__dirname, 'audio');

if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const narrations = [
  {
    filename: 'mission.mp3',
    title: 'The Mission',
    text: `Every human being is created with purpose. And every person's purpose, at its core, is the same — to use whatever gift was given to you to move humanity forward, by sharing that gift with those around you, to the best of your ability, no matter what circumstances life throws at you.

Since the beginning of time, courageous, curious, and determined individuals have been doing exactly that. And the number of people moving humanity forward at the same time is growing. The larger we grow, the faster we move. And we are relentless.

It is time to move humanity into another era. An era in which we are all mindful, independent thinkers with high levels of emotional intelligence. Getting there will be hard work. It will take decades. But the reward will be profound — real freedom for all. Less crime. Stronger families. Smaller government. A closing of the gap between the rich and the poor. And the only true cure for addiction, racism, and bigotry.

This transition is already happening — through the efforts of millions of individuals and hundreds of thousands of organizations around the world, sharing what they have learned about life through whatever gift was given to them.

Healing begins when we invest in individuals. Many are suffering — but we do not have to accept that suffering as permanent. Mindfulness, awareness, and emotional intelligence — the capacity to be aware of, control, and express our emotions, and to handle our relationships with empathy and wisdom — this is how we heal society.

Our beliefs, our morals, how we perceive the world — so much of who we are is shaped by our experiences. Our experiences create our perception. But we are only one perspective out of nearly eight billion.

The most valuable thing you can possess in life is the ability to assess and override your own emotions. That comes from understanding why you feel what you feel, and why you believe what you believe.

Prosperity, too, is not all about money. It is mostly about happiness and fulfillment. Research proves that being rich does not make you happy. So how do we all become prosperous? No one can give it to you. We have to create it ourselves — through knowledge, mindfulness, independent thinking, and emotional intelligence. There is no prosperity for all without healing for all.

And freedom — real freedom — does not come from the outside. It happens within us, by allowing ourselves to be free from our own judgments of ourselves and of others. Mindfulness and emotional intelligence reduce judgment and breed love, empathy, and compassion in anyone who practices them.

You and I cannot be truly free until we allow others to be free.

The goal of this foundation is to spread good and useful knowledge, to unite the hundreds of thousands of people and organizations working tirelessly to make this country and this world a safer and better place for every single person — regardless of social status, skin color, beliefs, or circumstances.

We invite every individual to embark on this journey of learning and growing with us. We can never learn everything there is to know in a single lifetime. But together, as individuals, we will discover as much as we can.`
  },

  {
    filename: 'participate.mp3',
    title: 'Participate — Healing a Nation',
    text: `So how do we heal a nation and make its people prosperous, so we can all be free to be ourselves? Through knowledge.

We all need a lesson on the human psyche. We need to understand how our own minds develop and work. We have to start teaching this everywhere — to teachers, students, and parents in the education system, to judges, attorneys, police officers, prison guards, and inmates in the judicial system.

Educating a nation on how we truly cure suffering, how we actually stop bad things from happening at the root — that will take decades. But imagine what this country and this world will look like when we all feel good about ourselves and one another. A more emotionally intelligent society will shrink the gap between the rich and the poor. It will lower crime rates and divorce rates, building stronger families and safer communities all around.

Participation is free. But it will be hard work, and you will fail — a lot. That's okay. You cannot have success without hard work and failure, because growth comes from failure.

Start by asking yourself why — a lot. Why do I believe this? Why do I prefer that? Why do I do this, or that? Why do I feel this emotion? Keep asking until you realize that a large portion of who you are was shaped by your environment and your experiences — not because that's just the way things are.

Spend time every day enriching yourself, even if it's only five minutes. Meditate. Watch inspiring talks and documentaries. Follow communities that challenge and uplift your thinking. Read books that stretch your perspective. These are not luxuries — they are the seeds of a better world.

There are three powerful ways to participate in the community we are building together.

Through Liberate Democracy, you can have your voice heard — vote on community decisions and delegate your vote to people you trust through a transparent, participatory democratic process.

Through Buy Local, you can strengthen your local economy by supporting neighborhood businesses, keeping dollars in your community and building real prosperity from the ground up.

And through Enrich Community, you can post a need, accept a need, pledge what you can — neighbors helping neighbors through a mutual aid system where every act of giving is recognized and celebrated.

The revolution begins with you. One choice, one conversation, one small act of courage at a time.`
  },

  {
    filename: 'values.mp3',
    title: 'Values, Morals, Character and Principles',
    text: `Morals, values, character, and principles — these are related concepts, but each plays a distinct role in shaping who we are and how we move through the world.

Morals refer to the specific beliefs and standards that guide a person's behavior in terms of right and wrong. They are often deeply ingrained in an individual's conscience, focused on particular actions — whether lying, stealing, or harming others is acceptable or not.

Values are broader and more encompassing. They represent the fundamental beliefs and priorities that are important to an individual or a society, guiding decision-making across all areas of life — from career choices and relationships to how we treat strangers and spend our time.

Character is the sum total of how consistently a person adheres to their morals, values, and principles over time. A person with good character is seen as honest, integrity-driven, and kind — not occasionally, but as a way of life.

Principles are the foundational, often unwavering rules that govern our behavior and decisions. They are typically derived from our values and moral beliefs. The principle of honesty, for example, flows naturally from a deep value of truth and integrity.

Understanding and developing these traits is fundamental to achieving our goals and aspirations — and to experiencing genuine happiness and peace in life.

One of the most powerful ways to develop morals, values, character, and principles is through reading.

Reading exposes us to a wide range of ideas, cultures, and perspectives — opening our minds to the diversity of ethical systems and value frameworks that exist across the world. It presents us with moral dilemmas and ethical challenges through characters and stories, giving us the opportunity to reflect on complex issues without personal stakes.

Reading builds empathy by connecting us emotionally to experiences different from our own. It helps us explore themes of justice, honesty, love, and integrity in ways that prompt us to examine and refine our own beliefs. It models character development through characters who grow, adapt, and evolve their values over time.

Most powerfully, reading encourages critical thinking — the ability to assess and understand the moral and ethical dimensions of the situations we face in real life.

Through literature, we gain exposure to principles like equality, freedom, and human dignity — and we develop the capacity to apply those principles with wisdom and compassion in our daily lives.

Reading enriches the mind. And an enriched mind is the foundation of a more ethical, more empathetic, and more fully human life.`
  },

  {
    filename: 'governance.mp3',
    title: 'Governance',
    text: `Governance refers to the processes, structures, and mechanisms by which a group or organization is managed and directed — encompassing the activities and principles that ensure an entity functions effectively, transparently, and in accordance with its goals.

Governance applies at every level — from local communities and corporations to national governments and international institutions. And across all of these levels, the key principles of good governance remain the same: transparency, accountability, responsiveness, participation, the rule of law, and efficiency in service of the people.

Good governance is not just a management concept. It is essential for the stability and success of societies. It prevents corruption, promotes trust, and ensures that decisions are made in the best interests of all individuals — regardless of circumstances.

The history of government is a vast story spanning millennia. From tribal leadership and ancient civilizations — the monarchies of Mesopotamia and Egypt, the city-states of Greece where democracy was first born, the Roman Republic with its elected officials and checks and balances — to the feudal systems of medieval Europe and the absolute monarchies of the Renaissance — humanity has always been searching for a better way to organize itself.

The Enlightenment gave us constitutional governments and the idea of individual rights. The American Revolution produced a federal system with a separation of powers. The French Revolution spread democratic ideals across Europe. And into the twentieth century, we saw the rise and fall of totalitarian regimes, decolonization, and the birth of international institutions designed to promote cooperation across borders.

But alongside all of this history runs another story — what some call the Matrix. The reality that powerful entities — governments, corporations, and media — have long shaped what we know, what we learn, how we spend our money, and even how we think. This influence is not a conspiracy theory. It is a documented pattern. From education curricula shaped by ideology, to media owned by corporations with vested interests, to consumer culture deliberately engineered to keep us spending — the influence of concentrated power on ordinary people is real and ongoing.

Media literacy, critical thinking, and financial awareness are not luxuries. They are survival skills in the modern world.

And so we arrive at a new, radical idea for government. One built not on expanding central authority, but on returning power to the most local level possible. A system guided by the principle of subsidiarity — where matters are handled by the smallest competent authority. Where local communities have genuine autonomy. Where the central government is focused, streamlined, and accountable. Where redundancy is eliminated and transparency is not just a promise, but a practice.

This is not a perfect vision. It faces real challenges — political opposition, constitutional questions, regional disparities. But it represents something essential: the courage to imagine a better way, and the conviction that we can build it — together.`
  },

  {
    filename: 'arevolution.mp3',
    title: "It's A Revolution",
    text: `What is done, is done, and cannot be undone. But how we grow as individuals — and as communities — determines where humanity is going.

It has never been a better time to be alive for mankind. Individuals all around the globe now have access to information that can set them free. With this information, people are learning how to heal themselves, how to think for themselves — and communities are learning how to support and feed themselves. And with this new found knowledge comes courage, and sometimes outrage, leading individuals and organizations all over the world to stand up for what they know is right, regardless of the consequence or outcome.

That is the Revolution. It is the growing number of unknown people who are going against society's arbitrary norms and doing what they know is right — for themselves, for their families, and for strangers — regardless of the punishment, the consequences, or the outcome.

The image of the woman with the mask across her face, hands raised in peace, standing boldly under the words 'It's a Revolution' — was chosen with deep intention.

The mask represents the silencing, the conformity, and the dehumanization we have experienced under manipulated systems. The culture of silence, of obedience, of fear.

Her hands raised in peace remind us: this is not a violent revolution. It is a conscious uprising. One rooted in love, unity, and the courage to live in truth and stand up for our neighbors.

And her hoodie — Fuck it. Be Brave — is the call to action. It is the moment we stop waiting for permission, stop fearing rejection, and start walking in our truth — even if it shakes the ground we have been standing on.

This is not marketing. It is medicine. For those who feel disillusioned, silenced, or stuck — we are offering a mirror, a spark, and a path forward.

To be part of this revolution, you have to be an independent thinker. That means engaging in critical thinking — evaluating information logically and questioning assumptions. It means being open-minded without being spineless. It means trusting your own judgment while remaining genuinely curious about the perspectives of others.

Independent thinkers are resilient. They are empathetic. They have the intellectual integrity to revise their opinions when presented with compelling evidence. And they have the courage to stand by their convictions when the evidence is clear.

Being an independent thinker does not mean rejecting all external wisdom. It means striking the balance between listening, learning, and ultimately forming your own view — based on your own analysis, your own values, and your own conscience.

This revolution is not coming. It is already here. In kitchens and classrooms, in community gardens and town halls, in the quiet daily choices of millions of people who have decided — enough. We can do better. We will do better.

Join us.`
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
        console.log(`  ✓  ${narration.title}  →  ${narration.filename}  (${(buf.length / 1024).toFixed(0)} KB)`);
        resolve(out);
      });
    });

    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function main() {
  console.log(`\nGenerating ${narrations.length} page narrations — PHPF Mother Earth 2026\n`);
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
