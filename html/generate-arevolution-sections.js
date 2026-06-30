const https = require('https');
const fs = require('fs');
const path = require('path');

const API_KEY = 'sk_9975fa29bbb9615ddffd0857dd981688098890548b27ad96';
const VOICE_ID = '5qJjFbFKpzUf8dnyYcGV';

const sections = [
  {
    file: 'arevolution-intro.mp3',
    text: `It's A Revolution.

What is done, is done, and cannot be undone — but how we grow as individuals and as communities determines where humanity is going.

It's never been a better time to be alive for mankind. Individuals all around the globe have access to information that can set them free, and more and more people are gaining access every day. With this information, individuals are learning how to do all sorts of things — from healing themselves, to thinking for themselves — leading to communities learning how to support themselves and feed themselves.

With this new-found information comes courage and outrage, leading to individuals and organizations all over the country and the world standing up for what they know is right, regardless of the consequence or outcome.

Change is coming. It has been in the process for centuries, thanks to many, many courageous men and women — some well known, like Jesus and Martin Luther King Jr., a lot more less known, and countless unknown — like the people who took in Jews or African Americans at great risk to their own lives and their families' lives.

And that is the Revolution. It's the growing number of unknown people who are going against society's arbitrary norms and doing what they know is right — for them, their families, and strangers — regardless of the punishment, consequences, or outcome.`
  },
  {
    file: 'arevolution-represent.mp3',
    text: `What Does It Represent?

The language and imagery we use here are deliberately provocative — and for good reason. We aren't trying to make everyone comfortable. We're trying to wake people up.

The image of the woman with the mask across her face, hands raised in peace, and the hoodie that reads "Fuck it. Be Brave," standing boldly under the words "It's a Revolution!" — was chosen with deep intention.

The mask represents the silencing, conformity, and dehumanization we've experienced under manipulated systems — from food and healthcare control, to pandemic control, to social pressure, to political fear. It's about the broader culture of silence and obedience.

Her hands raised in peace remind us: this is not a violent revolution. It's a conscious uprising. One rooted in love, unity, and the courage to live in truth and stand up for our neighbors.

The phrase "It's a Revolution" between her arms is about more than systems change — it's about the internal, conscious shift that must happen in each of us.

A revolution of values. Of awareness. Of spirit.

And her hoodie — "Fuck it. Be Brave" — is the call to action. It's the moment we stop waiting for permission, stop fearing rejection, and start walking in our truth — even if it shakes the ground we've been standing on.

This is not marketing. It's medicine. For those who feel disillusioned, silenced, or stuck — we're offering a mirror, a spark, and a path forward. Some will turn away. But those who are ready will lean in. And they are who we are here for. The others will jump on the bandwagon in due time, when their suffering forces them to face reality — just as it has so many of us.`
  },
  {
    file: 'arevolution-thinker.mp3',
    text: `You Can Be Part of The Revolution.

To be part of this revolution, you have to be an independent thinker.

Being an independent thinker means having the ability and willingness to form your own opinions, make decisions, and analyze information without relying solely on external influences — such as societal norms, peer pressure, or authority figures. Independent thinkers are characterized by several key traits:

Critical Thinking. Independent thinkers evaluate information, arguments, and evidence in a logical and rational manner. They question assumptions and avoid accepting information at face value.

Open-Mindedness. While independent thinkers are not swayed by external pressures, they are open to considering different perspectives and viewpoints. They are willing to explore new ideas and are not rigid or dogmatic in their thinking.

Self-Reliance. Independent thinkers trust their own judgment and are comfortable making decisions based on their own analysis and values.

Curiosity. Independent thinkers have a natural curiosity and a thirst for knowledge. They actively seek out information and are eager to learn — which helps them form well-informed opinions.

Individuality. Independent thinkers embrace their uniqueness and do not conform to societal expectations or groupthink. They are comfortable expressing their individuality and may hold unconventional views if they believe them to be valid.

Confidence. Independent thinkers have confidence in their ability to think critically and make informed decisions. They are not easily swayed by peer pressure or the fear of dissenting from popular opinion.

Problem-Solving. They excel at problem-solving because they can approach issues from multiple angles and consider a variety of solutions before making a decision.

Resilience. Independent thinkers are often more resilient in the face of adversity or criticism because they are secure in their ability to think for themselves and stand by their convictions.

Empathy. While independent thinkers have their own opinions, they also understand and empathize with the perspectives and experiences of others. They can engage in constructive dialogue and consider alternative viewpoints.

Intellectual Integrity. They value intellectual honesty and are willing to revise their opinions if presented with compelling evidence or arguments that challenge their beliefs.

Being an independent thinker doesn't mean rejecting all external input or disregarding expertise. It means striking a balance between listening to others, seeking information, and ultimately making decisions and forming opinions based on your own judgment and analysis. Independent thinking is a valuable skill that can lead to personal growth, innovation, and a deeper understanding of the world.`
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
