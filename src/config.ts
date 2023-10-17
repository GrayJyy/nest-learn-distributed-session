import { readFileSync } from 'fs';
import { join } from 'path';
import * as yaml from 'js-yaml';

const YOUR_ENV_FILE = 'env.yaml';
export default () => {
  const _data = readFileSync(join(process.cwd(), YOUR_ENV_FILE), 'utf8');
  return yaml.load(_data);
};
