import {
  Config,
  SharedConfig,
  FrontendConfig,
  OpenapiSchema,
} from './src/types';
import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import os from 'os';
import { warn } from 'console';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const exampleFrontendConfigPath = path.join(
  __dirname,
  'src',
  'examples',
  'config',
  'frontend.yaml'
);

const appName = 'uirpsoftball';
const exampleSharedConfigFilename = 'shared.yaml';

const _frontendConfigPath = process.env.FRONTEND_CONFIG_PATH || null;
const _sharedConfigPath = process.env.SHARED_CONFIG_PATH || null;
const _appEnv = process.env.APP_ENV || null;
const _configEnvDir = process.env.CONFIG_ENV_DIR || null;

function userConfigDir(appName: string): string {
  const home = os.homedir();
  const platform = os.platform();

  if (platform === 'win32') {
    const appData =
      process.env.LOCALAPPDATA || path.join(home, 'AppData', 'Local');
    return path.join(appData, appName);
  } else if (platform === 'darwin') {
    return path.join(home, 'Library', 'Application Support', appName);
  } else {
    return path.join(home, '.config', appName);
  }
}

function convertEnvPathToAbsolute(rootDir: string, a: string): string {
  if (path.isAbsolute(a)) {
    return a;
  } else {
    return path.resolve(rootDir, a);
  }
}

function processExplicitConfigPath(configPath: string | null): string | null {
  if (configPath === null) {
    return null;
  } else {
    const absPath = convertEnvPathToAbsolute(process.cwd(), configPath);

    if (!fs.existsSync(absPath)) {
      throw new Error(
        `Config path ${absPath} does not exist. Please create it or specify a different one.`
      );
    }

    return absPath;
  }
}

let frontendConfigPath = processExplicitConfigPath(_frontendConfigPath);
let sharedConfigPath = processExplicitConfigPath(_sharedConfigPath);

if (frontendConfigPath === null || sharedConfigPath === null) {
  let configEnvDir: string;

  if (_configEnvDir != null) {
    configEnvDir = convertEnvPathToAbsolute(process.cwd(), _configEnvDir);
  } else {
    const configDir = userConfigDir(appName);
    if (_appEnv != null) {
      configEnvDir = path.join(configDir, _appEnv);
    } else {
      configEnvDir = path.join(configDir, 'dev');
      warn(
        'Neither APP_ENV nor CONFIG_ENV_DIR is set. Defaulting to dev environment.'
      );
    }
  }

  if (!fs.existsSync(configEnvDir)) {
    fs.mkdirSync(configEnvDir, { recursive: true });
    warn(`Config directory ${configEnvDir} does not exist. Creating it.`);
  }

  if (frontendConfigPath === null) {
    frontendConfigPath = path.join(
      configEnvDir,
      path.basename(exampleFrontendConfigPath)
    );
    if (!fs.existsSync(frontendConfigPath)) {
      fs.copyFileSync(exampleFrontendConfigPath, frontendConfigPath);
      warn(
        `Frontend config file ${frontendConfigPath} does not exist. Creating it.`
      );
    }
  }

  if (sharedConfigPath === null) {
    sharedConfigPath = path.join(configEnvDir, exampleSharedConfigFilename);
    if (!fs.existsSync(sharedConfigPath)) {
      throw new Error(
        `Shared config file ${sharedConfigPath} does not exist. Please create it or specify a different location. Example file is found in the backend repository`
      );
    }
  }
}

function loadSharedConfig(): SharedConfig {
  const file = fs.readFileSync(sharedConfigPath!, 'utf8');
  return yaml.load(file) as SharedConfig;
}

const sharedConfig = loadSharedConfig();

function loadFrontendConfig(): FrontendConfig {
  const file = fs.readFileSync(frontendConfigPath!, 'utf8');
  return yaml.load(file) as FrontendConfig;
}

const frontendConfig = loadFrontendConfig();

const openapiSchemaPath = convertEnvPathToAbsolute(
  process.cwd(),
  frontendConfig.OPENAPI_SCHEMA_PATH
);

const openapiSchema: OpenapiSchema = JSON.parse(
  fs.readFileSync(openapiSchemaPath, 'utf8')
);

export const importedConfig: Config = {
  backendUrl: sharedConfig.BACKEND_URL,
  frontendUrl: sharedConfig.FRONTEND_URL,
  vite: frontendConfig.VITE,
  openapiSchemaPath: openapiSchemaPath,
  openapiSchema: openapiSchema,
  unknownColor: frontendConfig.UNKNOWN_COLOR,
  defaultNGamesPerRound: frontendConfig.DEFAULT_N_GAMES_PER_ROUND,
  defaultNRounds: frontendConfig.DEFAULT_N_ROUNDS,
  defaultNDivisions: frontendConfig.DEFAULT_N_DIVISIONS,
  defaultNTeamsPerDivision: frontendConfig.DEFAULT_N_TEAMS_PER_DIVISION,
  defaultNDivisionsPerGame: frontendConfig.DEFAULT_N_DIVISIONS_PER_GAME,
};
