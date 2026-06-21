const { createReader } = require('@keystatic/core/reader');
const keystaticConfig = require('./keystatic.config').default;

const reader = createReader(process.cwd(), keystaticConfig);

async function test() {
  const execom = await reader.collections.execom.all();
  console.log("Execom members count:", execom.length);
  if (execom.length > 0) {
    console.log("First member:", execom[0]);
  }
}

test().catch(console.error);
