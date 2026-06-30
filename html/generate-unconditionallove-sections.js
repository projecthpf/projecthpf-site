const https = require('https');
const fs = require('fs');
const path = require('path');

const API_KEY = 'sk_9975fa29bbb9615ddffd0857dd981688098890548b27ad96';
const VOICE_ID = '5qJjFbFKpzUf8dnyYcGV';

const sections = [
  {
    file: 'unconditionallove-conditional.mp3',
    text: `Conditional vs. Unconditional Love.

Most of the love we are taught to give and receive is conditional. It comes with invisible terms: I will love you if you behave the way I expect. I will love you as long as you agree with me. I will love you when you succeed. This kind of love is really approval — and it withdraws itself whenever its conditions are not met.

Conditional love feels like love. But it creates anxiety, people-pleasing, fear of rejection, and a constant need to perform for others. Relationships built on conditional love are fragile. The moment someone fails to meet the unspoken terms, the love contracts or disappears entirely.

Unconditional love operates differently. It does not mean tolerating harmful behavior or abandoning healthy boundaries. It means that your care for another human being does not depend on whether they live up to your expectations. You can set a firm boundary with someone and still love them. You can disagree with someone deeply and still wish them well. You can walk away from a relationship and still hold no hatred in your heart.

Conditional love creates dependency and fear — unconditional love creates security and freedom. Conditional love is transactional — unconditional love is generous. Conditional love feeds the ego — unconditional love dissolves it. Conditional love divides — unconditional love unites.

The shift from conditional to unconditional love is not a single moment. It is a practice — a daily choice to see the humanity in others even when it is difficult, and to extend the same grace to yourself that you would give to someone you deeply cherish.`
  },
  {
    file: 'unconditionallove-self.mp3',
    text: `Self-Love: Where It Begins.

You cannot give what you do not have. This is the most overlooked truth about love.

Many of us were never taught to love ourselves. We were taught to be humble — which too often got translated into self-criticism. We were taught to put others first — which too often meant abandoning our own needs entirely. We were taught that self-love was selfish — when in reality, the absence of self-love is one of the primary sources of human suffering and dysfunction.

When we do not love ourselves unconditionally, we look to others to fill that void. We seek validation, approval, and reassurance from relationships, achievements, and possessions. And when those external sources inevitably fall short, we feel empty, resentful, or unworthy. The cycle repeats.

Unconditional self-love is not arrogance. It is not self-indulgence. It is the radical acceptance of yourself as a human being — flawed, growing, worthy of care — regardless of your productivity, your past, your failures, or what others think of you.

When you genuinely love yourself, several things shift: You stop needing others to validate your worth — and your relationships become freer and more authentic. You stop punishing yourself for mistakes — and you learn from them faster. You stop tolerating treatment that diminishes you — because you know what you deserve. You have more to give — because you are no longer running on empty. You extend more compassion to others — because you have learned to extend it to yourself.

Self-love begins with a simple, daily practice: speak to yourself the way you would speak to someone you love. Notice the inner critic. Question its assumptions. Replace harsh judgment with honest compassion. It does not happen overnight — but it is one of the most transformative journeys a human being can take.`
  },
  {
    file: 'unconditionallove-cultivate.mp3',
    text: `How to Cultivate Unconditional Love.

Unconditional love is a skill. Like any skill, it deepens with practice, patience, and intention. Here are some of the most powerful ways to cultivate it in your daily life.

Practice forgiveness — starting with yourself. Forgiveness is not condoning harm. It is the decision to stop carrying the weight of it. Every grudge you hold costs you energy. Every act of forgiveness frees you. Begin with the hardest person to forgive: yourself.

Catch your judgements. Notice when you judge others — their choices, their appearance, their beliefs. Ask yourself: what does this judgment say about what I fear or reject in myself? Judgment is almost always a mirror. Unconditional love begins when we look in it honestly.

Extend compassion to people you disagree with. You do not have to agree with someone to recognize their humanity. Every person on earth is navigating their own wounds, fears, and conditioned beliefs. This does not excuse harmful behavior — but understanding it is the beginning of compassion.

Listen without an agenda. One of the most profound acts of love is to truly listen — without preparing your response, without waiting to be right, without judging. Being truly heard is one of the deepest human needs. Give that gift generously.

Love as a daily choice. Unconditional love is not a feeling that arrives and stays. It is a choice, renewed moment by moment. Some moments will be easy. Others will require everything you have. Choose it anyway — especially in those moments.

Study those who embody it. Eckhart Tolle, Deepak Chopra, Thich Nhat Hanh, Ram Dass, and many others have spent their lives teaching the art of unconditional love and presence. Read their work. Listen to their teachings. Let their wisdom inform your practice.

Meditate on loving-kindness. The Buddhist practice of metta — loving-kindness meditation — is one of the most scientifically validated tools for expanding compassion. Begin with yourself, then extend outward to loved ones, strangers, and eventually those you find most difficult.

The world changes one heart at a time. Yours is the one you have direct access to. When you commit to loving unconditionally — yourself, the people around you, the stranger you pass on the street — you become a force for healing in a world that desperately needs it.`
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
