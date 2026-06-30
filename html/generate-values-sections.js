const https = require('https');
const fs = require('fs');
const path = require('path');

const API_KEY = 'sk_9975fa29bbb9615ddffd0857dd981688098890548b27ad96';
const VOICE_ID = '5qJjFbFKpzUf8dnyYcGV';

const sections = [
  {
    file: 'values-intro.mp3',
    text: `Values, Morals, Character and Principles.

Morals, values, character, and principles are related concepts, but they have distinct meanings and roles in shaping our ethical framework and behavior.

Morals refer to the specific, individual beliefs and standards that guide a person's behavior or actions in terms of what is right and wrong. Morals are often deeply ingrained in an individual's conscience — focused on particular actions and behaviors, such as whether lying, stealing, or cheating is morally acceptable.

Values are broader, more abstract and encompassing than morals. They represent the fundamental beliefs and principles that are important to an individual or society, and guide decision-making and priorities in life. Values shape an individual's character and influence their moral beliefs — but they also extend to various aspects of life, including career choices, relationships, and lifestyle.

Character refers to the overall qualities and traits that define a person's moral and ethical nature. It is the sum total of an individual's behavior, values, and actions over time. Character is a reflection of how consistently a person adheres to their morals, values, and principles. A person with good character is seen as having positive qualities such as honesty, integrity, and kindness.

Principles are fundamental, often unwavering rules or guidelines that govern an individual's behavior and decision-making. These principles are typically derived from one's values and moral beliefs. Principles are more rigid and tend to be foundational to a person's ethical framework. For example, the principle of honesty might be derived from the value of truth and integrity.

Understanding and developing these traits are fundamental in achieving our goals and aspirations in life. The more we understand and develop these traits, the more happiness and peace we will experience.`
  },
  {
    file: 'values-developing.mp3',
    text: `Developing Morals, Values, Character and Principles.

Reading is important for the development of good morals, values, character, and principles for many reasons.

Exposure to Diverse Perspectives. Reading exposes individuals to a wide range of ideas, cultures, and perspectives. This exposure allows them to better understand the diversity of moral and ethical systems that exist in the world — leading to a more open and empathetic mindset, and helping individuals appreciate and respect different value systems.

Moral Dilemmas and Ethical Scenarios. Many works of literature — including novels, short stories, and non-fiction — present characters facing moral dilemmas and ethical challenges. These narratives give readers the opportunity to reflect on complex ethical issues, consider different perspectives, and develop their own moral reasoning.

Empathy Development. Reading about characters in different situations and experiencing their thoughts and emotions can enhance empathy. This emotional connection with fictional or real-life characters fosters a deeper understanding of the impact of one's actions on others — and encourages the development of a more compassionate character.

Value Exploration. Literature often explores themes related to values — such as justice, honesty, integrity, and love. Readers can reflect on these themes and consider how they relate to their own values, prompting them to reevaluate their beliefs and explore the nuances of their principles.

Character Development. Many literary works feature well-developed characters who undergo personal growth and transformation. These characters serve as models for character development and can inspire readers to strive for personal growth, resilience, and self-improvement.

Critical Thinking and Ethical Dilemmas. Reading encourages critical thinking — essential for assessing the moral and ethical dimensions of various situations. Readers can engage with ethical dilemmas in literature and develop their capacity for ethical reasoning, which extends beyond the pages and applies to real life.

Exploration of Principles. Literature often explores fundamental principles such as justice, equality, freedom, and human rights. By examining how characters grapple with these principles, readers gain insights into their significance and real-world application.

Inspiration for Personal Values. Reading can inspire individuals to develop their own values and principles based on the examples and ideas they encounter. They may draw inspiration from the characters they admire and the ethical dilemmas they navigate.

Reading enriches the mind and plays a significant role in developing an individual's morals, values, character, and principles — providing exposure to diverse perspectives, ethical dilemmas, and models of ethical behavior. Through literature, individuals have the opportunity to evolve and refine their ethical framework, contributing to personal growth and a more well-rounded ethical perspective.`
  },
  {
    file: 'values-books.mp3',
    text: `Books to Help Build Character.

The books we read shape who we become. Below is a curated collection of works that have helped millions of people develop stronger values, deepen their moral reasoning, and build lasting character.

From timeless classics like The Road Less Traveled and The Art of War, to modern guides like Emotional Intelligence and The Seven Habits of Highly Effective People — each of these books offers a unique perspective on how to live with greater intention, integrity, and purpose.

Sacred texts including the Holy Bible, the Quran, and the Bhagavad Gita have anchored the moral frameworks of billions of people across centuries and cultures. The I Ching offers timeless wisdom on navigating change with wisdom and balance.

Whether you're looking to strengthen your mindset, deepen your empathy, sharpen your thinking, or explore the spiritual foundations of ethical living — there is something in this collection for you.

Read. Reflect. Grow.`
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
