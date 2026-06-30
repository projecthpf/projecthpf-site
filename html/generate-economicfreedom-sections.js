const https = require('https');
const fs = require('fs');
const path = require('path');

const API_KEY = 'sk_9975fa29bbb9615ddffd0857dd981688098890548b27ad96';
const VOICE_ID = '5qJjFbFKpzUf8dnyYcGV';

const sections = [
  {
    file: 'ef-intro.mp3',
    text: `What is economic freedom? Wikipedia says it's the ability of people in a society to take economic actions. But that doesn't fully explain it.

The Heritage Foundation — a non-profit organization founded to promote public policies that align with free enterprise, limited government, and individual freedom — says economic freedom is the fundamental right of every human to control his or her own labor and property. Still, that doesn't fully explain it.

Economic freedom is best understood through the work of The Fraser Institute, a Canadian non-profit founded to improve the quality of life by studying and measuring the effects of government policies, entrepreneurship, and choice. Their research shows that economic freedom is inseparable from personal freedom — and that nations with more of it consistently have higher incomes, longer lives, and more opportunity for everyone.

The Fraser Institute ranks the United States the 7th freest nation. The Heritage Foundation ranks the United States the 25th freest nation — down from 20th in 2021. Their 2022 Index of Economic Freedom documents a worldwide decline in economic freedom, with the largest drop in average scores ever recorded.

Every human being deserves the freedom to feed themselves and improve their property by whatever means they know — without first paying the government, or any other organization or person, to do so.`
  },
  {
    file: 'ef-pillars.mp3',
    text: `The Five Pillars of Economic Freedom.

The Fraser Institute measures economic freedom across five broad areas. Together they form the foundation of a free economy — and their presence or absence predicts almost everything about a nation's prosperity and wellbeing.

One. Size of Government. Economic freedom requires that individuals — not governments — make most economic decisions. When governments spend, tax, and redistribute at high levels, individuals lose control over their own resources. Countries with smaller, more limited governments consistently rank higher in economic freedom and quality of life.

Two. Legal System and Property Rights. A free economy depends on impartial courts, rule of law, and the protection of property rights. When contracts aren't enforced, property can be seized, and courts favor the powerful over the people, economic freedom collapses. Secure property rights are the bedrock of investment, innovation, and prosperity.

Three. Sound Money. Inflation is a hidden tax. When governments print money recklessly, the purchasing power of every dollar you've earned and saved diminishes. Sound money — stable, predictable, not subject to political manipulation — protects ordinary people from having their wealth silently stolen.

Four. Freedom to Trade Internationally. Voluntary exchange creates wealth. When governments restrict trade through tariffs, quotas, and regulations, they limit the ability of individuals and businesses to access the best products and markets. Open trade raises living standards and keeps prices competitive.

Five. Regulation. Excessive regulation raises the cost of doing business, stifles entrepreneurship, and protects entrenched interests at the expense of newcomers and consumers. Economic freedom requires that regulations be reasonable, transparent, and applied equally — not used as tools of control or cronyism.

Countries that score highest across all five pillars — like Switzerland, Singapore, New Zealand, and Canada — have higher average incomes, lower poverty rates, longer life expectancies, and more political freedom than those that score lowest. This is not a coincidence. It is a pattern so consistent that it constitutes one of the most reliable findings in social science.`
  },
  {
    file: 'ef-matters.mp3',
    text: `Why Economic Freedom Matters.

Economic freedom is one of the most powerful predictors of prosperity, health outcomes, and quality of life. The data is unambiguous: people in economically free nations live longer, earn more, experience less poverty, and have greater access to education and opportunity than those in economically restricted nations.

But economic freedom is not just about wealth. It is about dignity. When you control the fruits of your labor, you control your life. When government or powerful institutions control the terms of your economic participation, they control your choices, your opportunities, and ultimately your freedom as a human being.

Here is what the research consistently shows about the most economically free nations:

Per capita income is seven times higher than in the least free nations.

The poorest ten percent earn three times more than the poorest ten percent in unfree nations.

Life expectancy is nearly a decade longer.

Civil and political liberties are significantly stronger.

Environmental quality and access to clean water are measurably better.

Women's economic rights and opportunities are far more developed.

Happiness and life satisfaction scores are consistently higher.

The argument that restricting economic freedom helps the poor is contradicted by every major dataset. The nations that have lifted the most people out of poverty have done so by expanding economic freedom — not by limiting it. Economic freedom and human flourishing are not in tension. They go hand in hand.`
  },
  {
    file: 'ef-action.mp3',
    text: `What You Can Do.

Economic freedom doesn't protect itself. It has to be understood, valued, and actively defended — by individuals, communities, and voters. Here is what you can do right now.

One. Learn how money actually works. Most people go through life without understanding inflation, compound interest, or how central banks create and destroy purchasing power. This ignorance is costly — and it's no accident that financial literacy is rarely taught in public schools.

Two. Spend locally. Every dollar spent at a locally owned business recirculates in your community far more than dollars spent at national chains. Buying local is one of the most direct forms of economic activism available to every person, every day.

Three. Reduce dependency on debt. Consumer debt is one of the primary mechanisms by which wealth transfers from working people to financial institutions. Live below your means, build an emergency fund, and pay off high-interest debt as aggressively as possible.

Four. Invest in real assets. Savings held in cash lose value to inflation over time. Educate yourself on index funds, real estate, commodities, and other vehicles that historically preserve and grow purchasing power.

Five. Build multiple income streams. A single employer and a single paycheck is a fragile position. Skills, side income, and entrepreneurship are among the most powerful tools for financial resilience and independence.

Six. Know your economic freedom score. Look up your country's ranking on the Fraser Institute's Economic Freedom of the World report and the Heritage Foundation's Index of Economic Freedom. Understand what drives those scores — and vote accordingly.

Seven. Support policy reform. Advocate for tax simplification, government spending accountability, Federal Reserve transparency, and policies that genuinely support small businesses and individual economic mobility. Show up for school board meetings, city council meetings, and elections at every level.

Eight. Talk about it. Economic freedom is not a partisan issue — it is a human issue. Share what you learn. Have the conversations. The most powerful force for change is an informed and engaged citizenry.

The gap between the rich and the poor is not inevitable. It is a policy outcome — and policy outcomes can be changed. The more economically literate and engaged we are as individuals, the more power we collectively have to build a freer and fairer system.`
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
