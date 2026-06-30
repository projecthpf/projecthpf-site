const https = require('https');
const fs = require('fs');
const path = require('path');

const API_KEY = 'sk_9975fa29bbb9615ddffd0857dd981688098890548b27ad96';
const VOICE_ID = '5qJjFbFKpzUf8dnyYcGV';

const text = `The History of Money.

Money didn't begin the way most people imagine. It didn't start with barter. It didn't start with coins. And it definitely didn't start as a neutral tool of exchange.

The real history of money shows exactly why our financial system operates the way it does today — and why it so often benefits those who create and control the money, rather than the people who actually provide the value.

Before money, societies used trust, reciprocity, and community accounting. Early humans didn't trade goats for baskets or barter goods every day like school textbooks claim. Everyday life worked more like: I helped you this week, you'll help me next month. Your family fed mine last season; we'll return the favor. You built my shelter, I'll help you hunt.

Anthropologists call this gift economies and social credit systems. Value wasn't tracked in dollars or tokens — it lived in relationships. Barter only happened between strangers or enemies. So money didn't arise because barter failed. It arose because societies grew beyond immediate personal trust.

Money Began as a Tool of Rulers. Not People.

The first true money didn't come from markets. It came from governments, temples, and kings who needed a way to tax people, organize labor, fund armies, control resources, and standardize power.

The oldest known money: clay tablets in Mesopotamia — modern-day Iraq — around 3000 to 3500 BCE. These tablets recorded debts, obligations, temple offerings, taxes, and contracts.

In other words, money started as a system of IOUs enforced by authority — not as coins passed between ordinary people.

Coins Were Invented for War.

Coins didn't appear until about 600 to 700 BCE, in Lydia — modern Turkey. And they weren't created to make shopping easier. They were created because rulers needed to pay soldiers, buy supplies, control trade, and centralize power.

Armies don't work on credit. They need a token they can spend anywhere. So governments minted coins, paid their armies with those coins, required the population to pay taxes in those same coins, and forced everyone into a money economy they controlled.

This is the origin of state-backed currency. Money became valuable not because of gold, but because you had to give it back to the ruler every tax season — or face consequences.

Banks Were Originally Vaults for the Elite.

Temples and palaces stored grain, gold, and other wealth. Eventually, they issued receipts — early forms of paper money. Later, merchant bankers in Italy and the Middle East created loans, interest, bills of exchange, promissory notes, and checks.

The wealthy didn't want to carry gold everywhere, so they created documents that represented gold. The documents started circulating as money. By the 1600s and 1700s, European states realized they could issue limitless paper money backed by nothing but trust and law. This is the moment money truly became a tool of power — not metal.

Modern Money Is Simply Debt.

In today's world: 97% of money is created digitally. It's created as loans by private banks. When a bank issues a loan, it creates new money. When the loan is repaid, the money disappears — but the interest does not disappear. So the system always requires more debt to function.

This is why the economy must always grow. Growth equals more debt equals more money in circulation. And this explains why prices go up, debt is permanent, wealth concentrates, and the system always favors lenders over workers.

The Stock Market Is Built on Short-Term Profit, Not Long-Term Wellbeing.

Public companies are judged quarterly. Every 90 days, they must prove — at all costs — that they made more. More revenue. More growth. More market share. So what gets rewarded? Cutting labor costs. Shrinking product quality while raising prices. Buying back shares instead of innovating. Lobbying for laws that protect monopolies. Extracting as much as possible from workers, customers, and the environment.

In this model, a CEO who poisons a river but boosts the stock price is a hero. A CEO who invests in community, quality, and sustainability — even if it increases long-term value — is punished. This is how we ended up with: Workers who can't afford the products they make. Housing markets priced out of reach. Healthcare treated as a profit center. Food systems focused on ultra-processed addiction instead of nutrition. Companies that grow bigger but contribute less.

This is not failing. This is what the system was designed to select for.

Financial Markets Treat Human Need as a Commodity.

Food, shelter, medicine, education — these are basic human necessities. But in a market system driven by speculation, they become investment vehicles. When human need becomes a commodity, scarcity becomes profitable. Rents rise because investors can profit from housing shortages. Food prices rise because volatility makes money for traders. Medicine prices rise because monopolies maximize shareholder return. College tuition rises because debt is a trillion-dollar asset class.

Incentives drive outcomes. And our incentives reward scarcity, not abundance.

The System Concentrates Wealth Until Democracy Breaks.

Wealth naturally flows upward in any interest-bearing, debt-based system. Those who start with capital can multiply it. Those who don't must borrow it. Borrowers pay the lenders. Lenders accumulate power. Power rewrites laws in its favor.

Over decades, the compounding effect creates a world where a handful of firms own most corporations, a handful of landlords own most housing, a handful of banks control most assets, and a handful of political donors influence most policy.

Once wealth concentrates, democracy becomes a formality. The rules are written by beneficiaries of the system — not the people living inside it.

A System That Rewards Negative Values Creates a Culture of Negative Values.

Our financial system rewards greed, extraction, exploitation, secrecy, monopoly, manipulation, short-term gain, and externalizing harm. And when you reward something, you get more of it. We are training generations to compete instead of collaborate, hoard instead of share, exploit opportunities instead of solving problems, and protect wealth instead of contributing to society.

A society built on toxic incentives will produce toxic outcomes.

Where This Leads If We Do Nothing.

If we stay on this path, the conclusion is not a mystery. It is a mathematical certainty: Wealth inequality will continue to widen. Social trust will continue to collapse. Essential systems — healthcare, housing, water, energy — will fail more often. Governments will tighten control to manage instability. Crime, hopelessness, and polarization will rise. And eventually, the social fabric will rip.

Civilizations have collapsed for these reasons throughout history. We're not immune.

Why We Must Build a New Financial Model.

A healthy economic system must reward what strengthens society: creating real value, healing communities, building resilient local economies, supporting families, nourishing the environment, increasing quality not quantity, sharing knowledge, and investing in long-term stability.

Right now, none of that gets rewarded. In fact, doing the right thing often gets punished.

Systems produce exactly the outcomes they are designed for. If we want different outcomes, we must design different systems.

The new model must disconnect basic human needs from speculative markets, incentivize contribution not extraction, reward long-term community value not short-term shareholder value, create local economies not centralized control, encourage abundance not artificial scarcity, provide pathways for ordinary people to thrive without debt slavery, and shift profit from being the purpose to being a byproduct of beneficial work.

If we don't build this, the current system will continue eroding everything stable, humane, and meaningful — until there is nothing left to save.

But if we do build it, we can create something rare in human history: an economic system that makes the thriving of people, communities, and the planet the most profitable path.`;

const body = JSON.stringify({
  text,
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

const outputPath = path.join(__dirname, 'audio', 'money-history.mp3');
console.log('Generating money-history.mp3...');

const req = https.request(options, (res) => {
  if (res.statusCode !== 200) {
    let err = '';
    res.on('data', d => err += d);
    res.on('end', () => { console.error('Error:', res.statusCode, err); });
    return;
  }
  const out = fs.createWriteStream(outputPath);
  res.pipe(out);
  out.on('finish', () => {
    const size = fs.statSync(outputPath).size;
    console.log(`✓ money-history.mp3 (${Math.round(size/1024)} KB)`);
  });
});
req.on('error', console.error);
req.write(body);
req.end();
