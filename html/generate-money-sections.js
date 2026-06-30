const https = require('https');
const fs = require('fs');
const path = require('path');

const API_KEY = 'sk_9975fa29bbb9615ddffd0857dd981688098890548b27ad96';
const VOICE_ID = '5qJjFbFKpzUf8dnyYcGV';

const sections = [
  {
    file: 'money-intro.mp3',
    text: `Money.

Money does in fact grow on trees — almost literally and certainly figuratively. Trees are a resource that provides value; all a person has to do is mine it for its resource, meaning convert it to money. In fact, anything that provides value is a form of money. And thank God for that, because governments all around the globe are and have been burning money at least as fast as they can create it — to distribute it to us and then tax it from us. Humanity has to get a handle on how very many governments spend and deliberately waste taxpayers' hard-earned money — or we have to create systems outside of government that are more responsible and reliable. To do that, a lot more individuals need to understand what money is, how to earn it, and the ways in which governments create, tax, and spend money.

Money is a medium of exchange and a store of value accepted in transactions for goods, services, or the settlement of debts. It serves as a unit of account, allowing people to measure the value of different goods and services in a common and easily understandable way. Money has taken various forms throughout history, including physical objects like coins and banknotes, as well as digital and electronic representations in modern economies. Money has evolved over time into different types and forms, including:

One. Commodity Money. In the past, money often had intrinsic value, such as gold, silver, or other valuable commodities. These items were used as both money and valuable resources. Sweden — currently ranked the freest nation — is still on the gold standard.

Two. Fiat Money. In modern economies, most money is fiat money. It has no intrinsic value and is not backed by a physical commodity. Instead, its value is derived from the trust and confidence of the people who use it. Governments typically issue fiat money and regulate its supply.

Three. Digital Money. In the digital age, a significant portion of money exists in electronic or digital form. Bank deposits, credit card balances, and digital wallets are all examples of digital money.

Four. Cryptocurrencies. A relatively new form of digital money, cryptocurrencies like Bitcoin and Ethereum are decentralized digital currencies that use cryptography for security and operate on blockchain technology.

The specific forms of money used in an economy can vary, and different societies and time periods have used various forms to meet their economic needs. The key is that money serves as a means of exchange, a unit of account, and a store of value, facilitating economic transactions and trade.`
  },
  {
    file: 'money-created.mp3',
    text: `How Money Is Created.

Money is created through various processes, depending on the type of money and the financial system in place. Here are the primary ways in which money is created:

One. Central Bank Money Creation — also known as High-Powered Money. Central banks, like the Federal Reserve in the United States or the European Central Bank in the Eurozone, have the authority to create money at the highest level of the monetary system. Central banks typically create money in two main ways.

Open Market Operations: Central banks buy or sell government securities — usually bonds — in the open market to influence the money supply. When a central bank buys government securities, it injects money into the economy, increasing the money supply. When it sells securities, it withdraws money from the economy, decreasing the money supply.

Reserve Requirements: Central banks can also influence the money supply by changing reserve requirements for commercial banks. Lowering reserve requirements allows banks to lend more money, increasing the money supply, while raising reserve requirements restricts lending and reduces the money supply.

Two. Commercial Bank Money Creation — also known as Fractional Reserve Banking. The majority of the money supply in modern economies is created by commercial banks through a process called fractional reserve banking. Here's how it works:

When you deposit money in a bank, the bank is required to hold a fraction of that deposit — a reserve — in cash or as deposits with the central bank. The rest can be lent out to borrowers.

Banks make loans to individuals, businesses, and other entities using the deposits they hold. When a bank issues a loan, it creates a new deposit in the borrower's account. This is essentially the creation of new money because it's a promise to pay the borrower, and that promise can be used as money.

This process can continue as borrowers spend the loaned money, and the recipients of that spending deposit it in their own bank accounts. Banks can then lend out a portion of these new deposits, creating more money.

The total money supply increases as this process continues, with the amount of money created being influenced by the reserve requirements set by the central bank.

Three. Government Money Creation — also known as Seigniorage. Governments can also create money by directly printing physical currency, such as coins and banknotes. The difference between the face value of the currency and the cost of producing it represents seigniorage revenue, which effectively creates money. However, in modern economies, physical currency constitutes a relatively small portion of the overall money supply, and most money is in digital or electronic form.

Four. Digital and Electronic Money Creation. In today's digital age, money creation often involves electronic or digital forms of money. When banks make digital transfers — such as when you make a payment using your debit card — it involves the creation of digital money within the banking system.

It's important to note that money creation is subject to various regulations and controls by central banks and governments. They aim to manage the money supply to control inflation, stabilize the economy, and ensure the stability of the financial system. The process of money creation can vary from one country to another based on their monetary and banking systems.`
  },
  {
    file: 'money-tax.mp3',
    text: `Taxation.

The specific ways in which citizens are taxed can vary significantly from one country to another and even within different regions or states of a single country. There are also various types of taxes at different levels of government — federal, state, and local. Governments have made taxation a complex and complicated subject. But one thing that is widely understood: individuals are heavily taxed on both the money they earn and the money they spend.

Here are some common ways in which citizens are taxed:

One. Income Tax. This is one of the most common forms of taxation. Individuals pay a percentage of their income to the government. Income tax rates can vary based on the level of income and other factors.

Two. Payroll Tax. These taxes are typically withheld from an employee's paycheck and include Social Security and Medicare taxes in the United States.

Three. Sales Tax. This is a consumption tax applied to the sale of goods and services. The tax rate can vary by location and the type of item or service being purchased.

Four. Property Tax. Homeowners and property owners pay taxes on the assessed value of their properties. These taxes are typically used to fund local services such as schools and infrastructure.

Five. Capital Gains Tax. This tax is levied on the profit made from the sale of assets like stocks, real estate, or other investments.

Six. Corporate Tax. Corporations pay taxes on their profits. Shareholders may also be subject to taxes on dividends and capital gains.

Seven. Estate Tax. Also known as an inheritance tax, this is a tax on the transfer of wealth from a deceased person to their heirs or beneficiaries.

Eight. Excise Tax. These are taxes imposed on specific goods or activities, such as gasoline, tobacco, alcohol, or gambling.

Nine. Property Transfer Tax. This tax is applied when real property changes hands, such as during the sale of a house.

Ten. Vehicle Registration and Fuel Tax. Taxes on vehicle registration, as well as taxes on gasoline and diesel fuel, help fund transportation infrastructure.

Eleven. Sin Taxes. These are taxes on products that are considered harmful, such as cigarettes and alcohol, to discourage their consumption.

Twelve. Import and Customs Duties. Taxes levied on imported goods, which are usually paid by the importer.

Thirteen. Gift Tax. Some countries have a tax on large gifts given during a person's lifetime.

Fourteen. Value-Added Tax, or Goods and Services Tax. These are consumption taxes applied at each stage of production and distribution. Consumers ultimately bear the burden of these taxes.

Fifteen. Local Taxes. Depending on the jurisdiction, there may be additional local taxes, such as municipal income taxes or special assessments.

Sixteen. Wealth Tax. In some countries, there are taxes on the net wealth or assets of individuals.

Seventeen. Environmental Taxes. Taxes aimed at discouraging activities harmful to the environment, such as carbon taxes.

Eighteen. Tourist and Hotel Taxes. Taxes applied to services used by tourists, such as hotel stays or airline tickets.

Nineteen. Digital Taxes. Some countries have introduced taxes on digital services and products.

Many individuals around the world agree: governments are taking far more of citizens' hard-earned money than they are entitled to, and citizens are not reaping the benefits.`
  },
  {
    file: 'money-burn.mp3',
    text: `Burning Money.

Government waste is a subject of concern and criticism in many countries, including the United States. Opinions about what constitutes "waste" can vary widely, and what one person considers wasteful spending, another may see as a necessary or valuable government program. However, governments around the world are burning through money faster than they can create it or tax it. Here are some common areas and examples where the U.S. government has and is wasting money:

One. Military Spending. Expensive weapon systems, overruns on defense contracts, maintaining a large number of military bases both domestically and abroad, and deliberate disposal of goods to keep drawing from the budget.

Two. Government Contracts. There have been instances of government contracts that have run significantly over budget or failed to deliver promised results. This includes high-profile cases like the F-35 Joint Strike Fighter program.

Three. Bureaucratic Inefficiency. Government agencies can be inefficient and overly bureaucratic, leading to unnecessary costs and delays in delivering services.

Four. Subsidies and Corporate Welfare. Government subsidies, tax breaks, and incentives provided to corporations and industries often do not provide a sufficient return on investment or benefit the public.

Five. Healthcare Costs. Concerns about the high cost of healthcare in the U.S. often point to inefficiencies and administrative overhead in government healthcare programs like Medicare and Medicaid.

Six. Pork Barrel Spending. Earmarks and pet projects inserted into legislation by lawmakers for their constituencies or special interests have been criticized as wasteful.

Seven. Redundant Programs. Critics argue that the government funds multiple programs that serve similar purposes, leading to duplication of efforts and inefficiency.

Eight. Social Programs. Many argue that social welfare programs, while well-intentioned, have inefficiencies and fail to deliver meaningful results in reducing poverty or improving outcomes.

It's important to recognize that government spending is a complex issue, and policymakers often have different perspectives on what constitutes necessary expenditures based on their own biases or self-interest.`
  },
  {
    file: 'money-freedom.mp3',
    text: `Economic Freedom and What You Can Do.

Economic freedom is the ability to produce, trade, and consume without coercion — to keep the fruits of your labor and make decisions about your own resources. It is one of the most powerful predictors of prosperity, health outcomes, and quality of life. Countries with higher economic freedom consistently outperform those with heavy state control on virtually every measure of human well-being.

Real economic freedom starts with financial literacy. Here are some of the most impactful things you can do:

One. Learn how money actually works. Most people go through life without ever understanding inflation, compound interest, or how central banks operate. This ignorance is costly — and it's not an accident that financial literacy is rarely taught in public schools.

Two. Spend locally. Every dollar spent at a locally owned business recirculates in your community far more than dollars spent at national chains. Buy local food, services, and products wherever you can. This is one of the most direct forms of economic activism.

Three. Reduce dependency on debt. Consumer debt is one of the primary mechanisms by which wealth transfers from working people to financial institutions. Live below your means, build an emergency fund, and pay off high-interest debt as aggressively as possible.

Four. Invest in real assets. Savings held purely in cash lose value to inflation over time. Educate yourself on index funds, real estate, commodities, and other vehicles that historically preserve and grow purchasing power.

Five. Explore decentralized alternatives. Cryptocurrencies and decentralized finance represent an attempt to build financial systems outside of centralized government and banking control. They are volatile and still maturing — but they point toward a future where individuals have more sovereignty over their own wealth.

Six. Support policy reform. Advocate for tax simplification, government spending accountability, Federal Reserve transparency, and policies that genuinely support small businesses and individual economic mobility.

Seven. Build multiple income streams. A single employer and a single paycheck is a fragile position. Skills, side income, and entrepreneurship are among the most powerful tools for financial resilience and independence.

The gap between the rich and the poor is not inevitable — it is a policy outcome. And policy outcomes can be changed. The more economically literate and engaged we are as individuals, the more power we collectively have to build a fairer system.`
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
