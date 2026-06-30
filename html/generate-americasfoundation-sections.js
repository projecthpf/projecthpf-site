const https = require('https');
const fs = require('fs');
const path = require('path');

const API_KEY = 'sk_9975fa29bbb9615ddffd0857dd981688098890548b27ad96';
const VOICE_ID = '5qJjFbFKpzUf8dnyYcGV';

const sections = [
  {
    file: 'af-intro.mp3',
    text: `America's Foundation.

We hold these truths to be self-evident, that all men are created equal, that they are endowed by their Creator with certain unalienable Rights, that among these are Life, Liberty and the pursuit of Happiness. — The Declaration of Independence.

With an opening line like that, one would think America was founded on equal opportunity for all. But like many other government systems around the world, America was not founded on equal opportunity. It WAS built at the expense of others — of many different colors and many different ethnicities — their life, liberty, and happiness. And our government continues to operate at the expense of many people's life, liberty, and pursuit of happiness. All to give some an advantage over others.

However, like countless others of all colors and many different ethnicities since the beginning of time and all around the world, many Americans now and throughout our history have fought — and are currently fighting — for the personal freedoms of others. Not just in the military outside of our country for government and corporate benefit, but more importantly, in everyday life — by having the courage to go against government and societal norms and stand up for what they know is right for humanity as a whole.

Sometimes, for something new and beautiful to be created, we have to destroy what existed. That is the way life was designed. And thankfully the foundation on which America was built is the Declaration of Independence — which states: That to secure these rights, Governments are instituted among Men, deriving their just powers from the consent of the governed. That whenever any Form of Government becomes destructive of these ends, it is the Right of the People to alter or to abolish it, and to institute new Government.

Equal opportunity and economic freedom for all is what true freedom looks like. And we can obtain it as individuals by having the courage to go against unjust or erroneous laws even if it means suffering uncomfortable consequences. As a society we can achieve it by restating our constitution and bill of rights and by redesigning our systems of government to function as systems of governance.`
  },
  {
    file: 'af-doi.mp3',
    text: `The Declaration of Independence.

The Declaration of Independence of the United States was primarily written by Thomas Jefferson. While Jefferson is credited with drafting the majority of the text, the document underwent revisions and edits by other members of the Continental Congress before its final approval and adoption. The document was adopted by the Continental Congress on July 4, 1776, in Philadelphia, Pennsylvania.

The document announced the American colonies' intention to break away from British rule and establish an independent nation, marking a pivotal moment in American history and having a lasting impact on humanity for several reasons.

Foundation of American Values. The Declaration of Independence articulates fundamental principles that have become central to American identity — such as the belief in inalienable rights to life, liberty, and the pursuit of happiness. It underscores the importance of self-government and the consent of the governed.

Democratic Ideals. The Declaration introduced the concept that governments derive their just powers from the consent of the governed. This idea laid the groundwork for the democratic principles that underpin the U.S. political system and have inspired democratic movements globally.

Symbol of National Identity. The Declaration of Independence is a symbol of American identity and the values that the United States stands for. It is often invoked in discussions of American democracy, freedom, and individual rights.

Justification for Revolution. The Declaration provided a comprehensive list of grievances against King George III and the British government, justifying the American colonies' decision to revolt against British tyranny. The document laid out a philosophical and legal justification for the American Revolution — and provided that when a government becomes destructive of the people's rights and no longer serves their interests, it is not only the right but also the duty of the people to alter or abolish it and establish a new government.`
  },
  {
    file: 'af-resources.mp3',
    text: `Resources to Help You Learn About the Values America Was Founded On.

The Tuttle Twins is a series of children's books written by Connor Boyack and illustrated by Elijah Stanfield. The books are designed to teach children about important principles of economics, liberty, and personal responsibility. They use engaging stories and colorful illustrations to make these concepts accessible and interesting to young readers.

The Tuttle Twins series covers a range of topics, including:

Economics. The books introduce children to basic economic principles like the value of money, the concept of trade and exchange, the consequences of government intervention in markets, and the importance of entrepreneurship.

Individual Rights. They explore the idea of individual rights and freedoms, teaching children about concepts like property rights and the importance of protecting personal liberties.

Limited Government. The series emphasizes the importance of limited government and the dangers of government overreach. It introduces children to the ideas of the Founding Fathers and the principles behind the U.S. Constitution.

Free Markets. The books promote an understanding of how free markets work and why they are important for innovation, prosperity, and individual opportunity.

Critical Thinking. The Tuttle Twins books encourage critical thinking and asking questions about the world around them. They teach children to think independently and critically evaluate the actions of individuals and institutions.

The series is intended to be a resource for parents and educators who want to introduce children to these fundamental concepts in an engaging and age-appropriate way. It is often used by homeschooling parents, teachers, and others who want to instill a love of learning and an understanding of liberty and economics in young minds. The books are usually aimed at children aged 5 to 11, although older children and adults may also find them informative and enjoyable.`
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
