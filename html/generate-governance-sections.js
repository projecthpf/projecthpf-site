const https = require('https');
const fs = require('fs');
const path = require('path');

const API_KEY = 'sk_9975fa29bbb9615ddffd0857dd981688098890548b27ad96';
const VOICE_ID = '5qJjFbFKpzUf8dnyYcGV';

const sections = [
  {
    file: 'governance-intro.mp3',
    text: `Governance.

Governance refers to the processes, structures, and mechanisms by which a group or organization — such as a government, company, or institution — is managed and directed. It encompasses a wide range of activities and principles aimed at ensuring that an entity functions effectively, transparently, and in accordance with its goals and objectives.

Governance can apply to various levels and types of organizations, including:

Government Governance: In the context of a government, governance refers to the way a country or region is administered and how decisions are made and implemented. It involves the functioning of political institutions, the rule of law, public policies, and the relationship between the government and its citizens.

Corporate Governance: In the business world, corporate governance pertains to the framework of rules, practices, and processes by which a company is directed and controlled. It includes the roles and responsibilities of the board of directors, management, shareholders, and other stakeholders.

Nonprofit Governance: Nonprofit organizations, including charities and NGOs, have their own governance structures. Nonprofit governance involves the management of resources, adherence to regulatory requirements, and the pursuit of their missions while being accountable to donors and the public.

International Governance: This refers to the management and regulation of global issues that transcend national boundaries, such as international diplomacy, trade agreements, and efforts to address global challenges like climate change or pandemics.

Key principles of good governance often include:

Transparency — openness and clarity in decision-making processes, making information accessible to stakeholders.

Accountability — holding individuals and organizations responsible for their actions and decisions, often involving mechanisms for oversight and consequences for wrongdoing.

Responsiveness — being responsive to the needs and concerns of stakeholders, whether they are citizens, shareholders, or members of a community.

Participation — involving stakeholders in the decision-making process, ensuring that diverse perspectives are considered.

Rule of Law — upholding the principles of justice and fairness, where laws and regulations are applied consistently and impartially.

Efficiency and Effectiveness — ensuring that resources are used efficiently to achieve desired outcomes and goals.

Good governance is essential for the stability and success of organizations and societies. It should help prevent corruption, promote trust and confidence, and ensure that decisions are made in the best interests of all individuals regardless of any negative circumstances.`
  },
  {
    file: 'governance-history.mp3',
    text: `A Brief History of Government.

The history of government is a vast and complex topic that spans millennia and varies greatly across different cultures and regions. Government has evolved significantly throughout history, with various forms and systems emerging in response to the needs and circumstances of societies. Here is a broad overview:

Early Forms of Governance. The earliest human societies organized themselves with some form of leadership or governance structure, often based on tribal or kinship ties. These early forms of governance were typically small-scale and decentralized.

Ancient Civilizations. The development of complex civilizations, such as those in Mesopotamia, Egypt, the Indus Valley, and China, gave rise to more centralized and bureaucratic forms of government. These governments often included monarchies, city-states, and empires with rulers who held significant power.

Ancient Greece and Democracy. Ancient Greece is often credited with the development of democratic governance. In Athens, for example, the concept of democracy emerged in the 5th century BCE, where citizens had a direct role in decision-making through an assembly.

Roman Republic and Empire. The Roman Republic, established in the 6th century BCE, featured a system of elected officials and checks and balances. It later transitioned into the Roman Empire, characterized by a centralized autocracy.

Feudalism. In medieval Europe, feudalism became a dominant form of governance. Feudal societies were hierarchical, with kings and nobility holding land in exchange for military service and loyalty.

Monarchies and Absolute Rule. Many European countries during the Middle Ages and Renaissance were ruled by absolute monarchs, where the king or queen held significant power. Examples include Louis XIV of France and the Tudor monarchs of England.

Enlightenment and Constitutionalism. The Enlightenment in the 17th and 18th centuries contributed to the development of constitutional governments and the idea of individual rights. The English Civil War, Glorious Revolution, and the writings of philosophers like John Locke influenced the shift toward constitutional monarchy and democracy.

American Revolution and Democracy. The American Revolution led to the establishment of the United States and its Constitution, which introduced the concept of a federal system with a separation of powers and a Bill of Rights. It served as a model for many other nations.

French Revolution and European Changes. The French Revolution sparked significant political upheaval in Europe and the spread of democratic ideals.

19th and 20th Century Transformations. These centuries witnessed the spread of democracy, decolonization, the rise of totalitarian regimes like fascism and communism, and the development of international organizations like the United Nations.

Contemporary Government. Today, governments come in various forms, including democracies, authoritarian regimes, monarchies, and more. Many nations have adopted constitutions and systems of governance that reflect a balance between central authority and individual rights.

The history of government is marked by a continual evolution of governance structures, ideologies, and forms, shaped by cultural, social, economic, and political factors. The diversity of government systems across the world highlights the complexity and richness of humanity's history.`
  },
  {
    file: 'governance-matrix.mp3',
    text: `The Matrix.

"They" — the establishment — big corporations, the government, and the media — are educating, or indoctrinating, "us," society, to work for or otherwise serve "them": government and big business. For a very long time, "they" have controlled everything. From what we know, what we learn, and how we learn, to how we spend our money, what we spend our money on, and how we can earn it. The matrix that is the establishment is primarily money driven. It is important to acknowledge and discuss the influence powerful entities, including governments, corporations, and media, have on society's education, consumption patterns, perspectives, decision-making, and ability to think for ourselves.

Some ways the establishment manipulates society's perspectives and interests:

Power and Influence. Powerful entities, such as governments and large corporations, exert significant influence over various aspects of society, including education, media, and consumer behavior. The extent and nature of this influence can be a subject of debate — but the fact that it is happening is certain.

Education. Governments have and do play an impactful role in shaping and controlling society's perspectives through education curricula, funding, and laws. Concerns about education systems being used to promote certain ideologies or interests are not new — but they have recently led to a growing revolution in the education world.

Media Influence. Many media outlets are owned by large corporations that have a direct interest in influencing perspectives and consumption. Many media outlets also get the majority of their "facts" from government sources. Concerns about media bias and concentration of media ownership have been raised in societies all around the world. Media literacy and critical thinking skills are important for individuals to evaluate information from diverse sources.

Consumerism. Big corporations and governments are deliberately developing a consumer culture. The impact of advertising and marketing on consumer behavior is a subject of study in sociology and economics — but it should be a part of every individual's learning journey.

Economic Interests. Governments both need money to operate, and print and control the flow of money.

It's crucial for individuals to engage in critical thinking and seek well-researched and balanced sources of information when exploring these topics. It is important to question the influence of powerful entities on society — but it is also essential to avoid falling into conspiratorial thinking.`
  },
  {
    file: 'governance-radical.mp3',
    text: `A New, Radical Idea For Government.

Give the land back to indigenous cultures that it was stolen from so they can teach us all how to live. Just kidding! Unfortunately we'll never get everyone to agree to that — but we do have to come up with a better way to do things.

We absolutely need governing systems — but we absolutely cannot continue to sustain big government. Creating a new approach to government that addresses the need for governance while mitigating the challenges of sustaining big government is a significant and complex endeavor. But it can be done.

One radical approach is the decentralization of government power, with a focus on local and community-driven decision-making. This approach envisions a system where smaller, more nimble governing bodies handle most day-to-day governance issues, while a limited central authority deals with broader national or international matters. Here are some elements of such a system:

Subsidiarity. The principle of subsidiarity would be a guiding force. This means that matters should be handled at the most local level possible.

Local Empowerment. Communities and local governments would have a high degree of autonomy to make decisions on matters that directly affect their residents.

Streamlined Central Authority. The central government would have a more focused role, dealing primarily with issues that require a nationwide or international approach.

Elimination of Redundancy. Streamlining the system would help reduce redundancy and bureaucracy. Functions performed more efficiently at the local level would not be duplicated at the national level.

Transparency and Accountability. Decentralized government allows for more transparency and accountability mechanisms to ensure that local governments make decisions in the best interests of their communities.

Balanced Funding. Funding and taxation would need to be restructured to support this decentralized system — but would allow for local governments to collect and better use taxes for local needs, while deciding what portion would be allocated for overarching national interests.

This approach would aim to reduce the size and scope of a centralized government while ensuring that essential functions are still addressed. It would promote local responsiveness, reduce bureaucracy, and empower communities to have a more direct say in their governance.

Implementing such a radical idea would likely face considerable challenges, including the need for constitutional changes, political opposition, and the potential for disparities among regions. It would require a carefully planned transition and ongoing evaluation to ensure its effectiveness and fairness.

Nonetheless, it represents a novel approach to addressing the tension between the need for governance and the desire to limit the size of government.`
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
