const fs = require('fs');
const { join } = require('path');

const TYPE = (process.argv[2] || '').toLowerCase();
const NAME = (process.argv[3] || '').toLowerCase();

const TYPES = ['schema', 'interface'];
const USAGE = 'Usage: "node generate [schema|interface] [name]"'

const generate = (name, type) => {
  const basePath = join(__dirname, '../src');
  const modulePath = join(basePath, name);
  const dirPath = join(modulePath, `${type}s`);

  if (!fs.existsSync(basePath)) {
    fs.mkdirSync(basePath);
  }

  if (!fs.existsSync(modulePath)) {
    fs.mkdirSync(modulePath);
  }

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }

  const content = fs.readFileSync(join(__dirname, 'templates', `${type}.ts`), 'utf8');

  if (type === 'interface' && name.length >= 3) {
    if (name.substr('-3') === 'ies') {
      name = name.substr(0, name.length - 3) + 'y';
    } else if (name.substr(-1) === 's') {
      name = name.substr(0, name.length - 1);
    }
  }

  const filePath = join(dirPath, `${name}.${type}.ts`);
  const formattedName = name[0].toUpperCase() + name.substr(1);
  fs.writeFileSync(filePath, content.replace('___NAME___', formattedName));

  console.info('Done.');
};

if (!TYPE || !NAME || !TYPES.includes(TYPE)) {
  console.error(USAGE);
} else {
  generate(NAME, TYPE);
}

return process.exit(1);