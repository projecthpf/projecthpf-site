const https = require('https');
const fs = require('fs');
const path = require('path');

const API_KEY = 'sk_9975fa29bbb9615ddffd0857dd981688098890548b27ad96';
const VOICE_ID = '5qJjFbFKpzUf8dnyYcGV';

const sections = [
  {
    file: 'fw-intro.mp3',
    text: `Food and Water.

That's not what they're feeding us.

Anyone with eyes can see that Americans — and Western cultures as a whole — are not healthy, physically, mentally, or emotionally. The reason for this is multifaceted, but the Standard American Diet, also known as the Western Diet, plays a huge role in our unhealthiness. One can't be sure this problem was created on purpose, but it has definitely developed into a system that is used to make us addicted and sick.

Corporations, particularly in the food and pharmaceutical industries, leverage the FDA, regulations, and the Standard American Diet to maintain consumer dependence on unhealthy food and medication. The SAD — high in processed foods, sugars, and unhealthy fats — is marketed aggressively, creating addictions and leading to chronic health issues like obesity, diabetes, and heart disease.

The FDA, influenced by corporate lobbying, often approves and regulates food additives and ingredients that contribute to these health problems. Meanwhile, the healthcare system, which is deeply intertwined with pharmaceutical companies, focuses on treating symptoms with medications rather than addressing the root causes, such as poor diet and lifestyle choices. This approach keeps people reliant on prescription drugs rather than promoting long-term healing through dietary and lifestyle changes.

By keeping the public addicted to unhealthy food and dependent on medications, corporations ensure a steady stream of profit from both the food and pharmaceutical industries. This cycle not only perpetuates chronic illness but also prevents many individuals from achieving true health and well-being.

Water is no different. Municipal water supplies are treated with chlorine and fluoride — chemicals that, while intended to prevent disease, have raised significant health concerns with long-term exposure. Fluoride has been linked to thyroid disruption and neurological effects. Industrial agriculture and pharmaceutical runoff contaminate groundwater with pesticides, heavy metals, and synthetic hormones. The systems controlling our food and water supply were not designed with our health as the priority. Understanding this is the first step toward making choices that truly serve your body and your mind.`
  },
  {
    file: 'fw-sad.mp3',
    text: `The Standard American Diet.

The Standard American Diet is characterized by a high intake of processed and convenience foods, refined sugars, unhealthy fats, and sodium, while being low in fruits, vegetables, whole grains, and healthy fats. This diet is also high in calorie-dense, nutrient-poor foods that contribute to various health problems.

Key Features of the Standard American Diet.

Nutrient Deficiency. Processed foods are often stripped of essential nutrients like vitamins, minerals, and fiber during manufacturing. Many processed foods are also fortified with synthetic vitamins and minerals to replace what was lost, but these aren't always absorbed by the body as effectively as those found in whole foods.

High in Unhealthy Ingredients. Many processed foods contain high levels of added sugars, which can lead to weight gain, insulin resistance, and an increased risk of chronic diseases. Processed foods often contain trans fats and unhealthy saturated fats, which can raise bad cholesterol and lower good cholesterol, leading to heart disease. High levels of sodium are common in processed foods to enhance flavor and extend shelf life, and are linked to high blood pressure and cardiovascular problems.

Preservatives and Additives. Many processed foods contain chemical preservatives to prolong shelf life. Some of these chemicals, like nitrates and nitrites in processed meats, have been linked to cancer. Artificial flavors and colors can cause allergic reactions or other adverse health effects, especially in children.

Caloric Density and Low Satiety. Processed foods are often calorie-dense but not very filling, leading to overeating and weight gain. The lack of fiber in processed foods means they don't satisfy hunger as well as whole foods.

Impact on Metabolism and Gut Health. Processed foods often lack the fiber and nutrients necessary for a healthy gut microbiome. An unhealthy gut can lead to inflammation, immune system issues, and even mental health problems. Regular consumption of processed foods is linked to metabolic syndrome, a cluster of conditions that increase the risk of heart disease, stroke, and diabetes.

Link to Chronic Diseases. The high calorie, sugar, and fat content in processed foods contribute to obesity. High sugar and refined carbohydrates can cause spikes in blood sugar, increasing the risk of insulin resistance and type 2 diabetes. The unhealthy fats, sugars, and salt in processed foods contribute to heart disease by raising cholesterol and blood pressure.

Environmental and Ethical Concerns. The production and packaging of processed foods often involve practices that are harmful to the environment. Processed meats and other animal-based products often come from factory farms, where animals are raised in poor conditions.

While processed foods offer convenience and longer shelf life, their consumption is associated with various health risks. The SAD is associated with obesity, type 2 diabetes, heart disease, hypertension, certain cancers, and mental health disorders.

Prioritizing whole, minimally processed foods can lead to better overall health and well-being.`
  },
  {
    file: 'fw-farmtotable.mp3',
    text: `Farm to Table is Better.

Farm-to-table food offers a healthier and more sustainable option by emphasizing freshness, nutritional quality, and reduced reliance on processed ingredients. Economically, it supports local farmers, reduces transportation costs, and fosters a stronger, more resilient community. Overall, it represents a holistic approach to food that benefits both personal health and the broader economy.

Freshness and Nutrient Density. Farm-to-table food is usually consumed shortly after being harvested, which means it retains more of its natural nutrients. Vitamins and minerals can degrade over time, so fresher foods are often more nutrient-dense. Farm-to-table practices also encourage eating foods that are in season, which are typically at their peak in terms of flavor and nutritional content.

Fewer Preservatives and Additives. Farm-to-table foods are less likely to contain artificial preservatives, additives, and chemicals used to extend shelf life or enhance flavor, color, and texture in processed foods. This means fewer potential toxins and unhealthy ingredients in your diet.

Higher Quality Ingredients. These foods are more likely to be whole and unprocessed, which means they contain more fiber, vitamins, and minerals. Many farm-to-table providers use sustainable, organic, or regenerative farming methods, which can result in higher-quality, nutrient-rich soil and produce.

Reduced Exposure to Harmful Chemicals. Farm-to-table foods, especially those from organic farms, are less likely to be exposed to synthetic pesticides and fertilizers, reducing your intake of potentially harmful chemicals.

Better Flavor and Satisfaction. Fresher, locally sourced foods often have better flavor, which can lead to greater satisfaction and potentially lower the tendency to overeat or rely on less nutritious food.

Support for Local Economies and Ecosystems. Supporting local farms helps sustain small farming operations, which often use practices that are more environmentally friendly and better for the local ecosystem. Eating locally also reduces the environmental impact associated with transporting food over long distances.

Farm-to-table food is healthier because it is fresher, less processed, and often produced using more natural and sustainable methods. This results in better nutrient retention, fewer harmful additives, and a generally higher-quality diet that supports overall health and well-being.`
  },
  {
    file: 'fw-regulation.mp3',
    text: `Government Regulation Makes it Hard to Access Farm to Table Foods.

Through various policies and regulations that often favor large-scale industrial agriculture over small, local farms. Here are some of the ways this happens.

Regulatory Burden on Small Farms. Small farms often face the same regulatory requirements as large-scale industrial operations, which can be overwhelming. Compliance with food safety regulations, labeling requirements, and environmental standards can be costly and time-consuming. Obtaining organic certification or other labels that indicate sustainable practices can be expensive and complicated, deterring small farmers from pursuing these certifications.

Subsidies and Support for Industrial Agriculture. Government subsidies often favor large-scale monoculture crops like corn, soy, and wheat, which are the building blocks of processed foods. This makes processed foods cheaper and more widely available than farm-to-table options. Programs designed to protect farmers from losses often benefit large-scale operations, making it harder for small, diverse farms to thrive.

Barriers to Local Food Distribution. Local farms may face challenges in getting their products to market due to strict regulations around food distribution, such as those concerning transportation, storage, and direct sales to consumers or restaurants. In some areas, local regulations may limit where and how farmers can sell their products directly to consumers, such as at farmers markets or through Community Supported Agriculture programs.

Centralization of the Food System. The food supply chain in many countries is dominated by large corporations that control processing, distribution, and retail. This centralization makes it difficult for small farmers to get their products into mainstream markets. Large agribusinesses have significant lobbying power, influencing policies that benefit them, often at the expense of smaller, local producers.

Land and Zoning Policies. Zoning laws and land use regulations can make it difficult for small farms to operate near urban areas, where the demand for farm-to-table foods is often higher. High land prices and property taxes in many regions make it difficult for local farms to acquire or maintain farmland.

Food Safety Modernization Act Challenges. The FSMA, while designed to improve food safety, imposes stringent requirements on all food producers, regardless of size. Small farms and food producers often struggle to meet these standards due to limited resources.

Lack of Support for Local Food Infrastructure. Government investment in infrastructure, such as local food hubs, processing facilities, and distribution networks, is often insufficient. Government-funded agricultural research and extension services often focus on large-scale industrial farming techniques, providing little support for small, diversified farms.

Government policies and regulations often create obstacles for small farms and local food systems, making it harder to access farm-to-table foods. Addressing these barriers requires policy reforms that support sustainable, local food systems and reduce the regulatory and economic pressures on small farmers.`
  },
  {
    file: 'fw-access.mp3',
    text: `But Accessing Farm to Table May Be Easier Than You Think.

One. Shop at Farmers Markets. Farmers markets offer fresh, locally grown produce, meats, dairy, and other products directly from local farmers. You'll find seasonal fruits and vegetables, which are typically fresher and more nutrient-dense.

Two. Join a Community Supported Agriculture program. CSA programs allow you to subscribe to receive regular boxes of fresh produce from local farms. CSAs provide a rotating selection of seasonal produce, often delivered weekly or bi-weekly.

Three. Support Local Farms and Farm Stands. Many local farms have farm stands where you can purchase fresh produce and other products directly. Some farms offer pick-your-own options for fruits and vegetables, giving you direct access to fresh food.

Four. Grow Your Own Food. Start a small garden at home to grow your own herbs, vegetables, or fruits. Even a small plot or container garden can provide fresh, healthy produce. If you don't have space at home, look for a community garden where you can rent a plot.

Five. Eat at Farm-to-Table Restaurants. Look for restaurants that prioritize sourcing ingredients from local farms and producers. Many farm-to-table restaurants highlight seasonal menus based on what's available locally.

Six. Participate in Local Food Cooperatives. Food cooperatives often stock locally sourced products, including fresh produce, dairy, and meats. Members may have a say in the products offered and can benefit from discounts.

Seven. Order from Local Food Delivery Services. Some areas have local food delivery services that partner with farms to bring fresh, locally sourced products directly to your door.

Eight. Advocate for and Support Local Food Initiatives. Advocate for more local food initiatives in your area, such as farm-to-school programs, urban farming projects, or local food hubs. Get involved in local food advocacy groups or community discussions about food systems and sustainable agriculture.

Nine. Preserve Seasonal Foods. Learn how to preserve fruits, vegetables, and herbs when they are in season to enjoy farm-to-table quality year-round.

Accessing farm-to-table food involves connecting with local sources, whether through direct purchases at farmers markets, joining a CSA, or growing your own food. Supporting local food systems and engaging with community initiatives can also help make farm-to-table food more accessible.`
  },
  {
    file: 'fw-nonprofits.mp3',
    text: `Support Non-Profits Promoting Healthy Food Supply.

Several non-profit organizations work to make farm-to-table food more accessible by promoting local food systems, supporting sustainable agriculture, and increasing access to fresh, healthy food in communities.

FoodCorps connects kids to healthy food in schools, with a focus on hands-on learning, fostering a connection to local farms, and improving access to fresh food. They partner with schools to teach children about nutrition, help build school gardens, and incorporate farm-to-table principles into school meals.

The Farm to School Network works to bring locally sourced food into schools, promote food education, and support local farmers. They help schools implement farm-to-school programs, which connect students with fresh, local food and educate them about healthy eating.

The National Farm to School Network aims to increase access to local food and nutrition education to improve children's health, strengthen family farms, and cultivate vibrant communities. The organization provides resources, advocacy, and technical assistance to schools and communities across the country.

Slow Food USA promotes good, clean, and fair food for all by supporting local food systems and sustainable farming practices. They organize community events, educational programs, and campaigns to support local farmers and raise awareness about the benefits of farm-to-table food.

The Food Trust works to ensure that everyone has access to affordable, nutritious food and information to make healthy decisions. They run farmers markets in underserved areas, promote healthy food access in schools, and work to improve local food systems.

Wholesome Wave focuses on making fresh, local food affordable and accessible, particularly for low-income families. They provide financial incentives for purchasing fresh produce at farmers markets and partner with healthcare providers to offer prescriptions for fruits and vegetables.

Farm Aid supports family farmers in the United States, advocating for fair policies and providing resources to keep farmers on their land. They promote direct farmer-to-consumer relationships, helping to make farm-fresh food more accessible.

Food Policy Action advocates for policies that support sustainable food systems, including increased access to local and healthy food. They engage in advocacy and education efforts to influence public policy around food systems.

The Edible Schoolyard Project, founded by Alice Waters, aims to build and share an edible education curriculum for schools to integrate gardening, cooking, and nutrition into everyday learning. They provide resources and support for schools to develop gardens and kitchens that connect students with fresh, local food.

Local Food Hub partners with farmers to increase community access to local food, particularly for underserved populations. They help small farms distribute their products and work to make fresh, local food more accessible to institutions and families.

These organizations play a vital role in promoting farm-to-table initiatives, educating communities about healthy eating, and supporting local farmers to create more sustainable food systems.`
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
