const path = require('path');
const {
  sortDependencies,
  installDependencies,
  runLintFix,
  printMessage,
} = require('./utils');
const pkg = require('./package.json');
const templateVersion = pkg.version;
module.exports = {
  metalsmith: {},
  helpers: {
    if_or (v1, v2, options) {
      if (v1 || v2) {
        return options.fn(this)
      }
      return options.inverse(this)
    },
    template_version () {
      return templateVersion
    },
  },
  prompts: {
    name: {
      type: 'string',
      required: true,
      message: 'Project name',
    },
    description: {
      type: 'string',
      required: false,
      message: 'Project description',
      default: 'A react project',
    },
    author: {
      type: 'string',
      message: 'Author',
    },
    style: {
      type: 'confirm',
      message: 'Use css preprocessing for your style code?'
    },
    styleConfig: {
      when: 'style',
      type: 'list',
      message: 'Pick an css preprocessing preset',
      choices: [
        {
          name: 'scss',
          value: 'scss',
          short: 'scss',
        },
        {
          name: 'less',
          value: 'less',
          short: 'less',
        },
        {
          name: 'stylus',
          value: 'stylus',
          short: 'stylus',
        },
        {
          name: 'none (configure it yourself)',
          value: 'none',
          short: 'none',
        },
      ]
    },
    stylelint: {
      type: 'confirm',
      message: 'Use stylelint for your style code?'
    },
    lint: {
      type: 'confirm',
      message: 'Use ESLint to lint your code?',
    },
    lintConfig: {
      when: 'lint',
      type: 'list',
      message: 'Pick an ESLint preset',
      choices: [
        {
          name: 'React app (https://github.com/facebookincubator/create-react-app)',
          value: 'ReactApp',
          short: 'ReactApp',
        },
        {
          name: 'Airbnb (https://github.com/airbnb/javascript)',
          value: 'airbnb',
          short: 'Airbnb',
        },
        {
          name: 'Standard (https://github.com/standard/standard)',
          value: 'standard',
          short: 'Standard',
        },
        {
          name: 'none (configure it yourself)',
          value: 'none',
          short: 'none',
        },
      ],
    },
    state: {
      "type": "list",
      "message": "state manage for your app",
      "choices": [
        {
          "name": "Redux (https://github.com/reactjs/redux)",
          "value": "redux",
          "short": "redux"
        },
        {
          "name": "Mobx (https://github.com/mobxjs/mobx)",
          "value": "mobx",
          "short": "mobx"
        }
      ]
    },
    unit: {
      type: 'confirm',
      message: 'Set up unit tests',
    },
    runner: {
      when: 'unit',
      type: 'list',
      message: 'Pick a test runner',
      choices: [
        {
          name: 'Jest',
          value: 'jest',
          short: 'jest',
        },
        {
          name: 'Karma and Mocha',
          value: 'karma',
          short: 'karma',
        },
        {
          name: 'none (configure it yourself)',
          value: 'noTest',
          short: 'noTest',
        },
      ],
    },
    e2e: {
      type: 'confirm',
      message: 'Setup e2e tests with Nightwatch?',
    },
    port: {
      "type": "number",
      "required": false,
      "message": "client port",
      "default": 3000
    },
    autoInstall: {
      type: 'list',
      message:
        'Should we run `npm install` for you after the project has been created? (recommended)',
      choices: [
        {
          name: 'Yes, use NPM',
          value: 'npm',
          short: 'npm',
        },
        {
          name: 'Yes, use Yarn',
          value: 'yarn',
          short: 'yarn',
        },
        {
          name: 'No, I will handle that myself',
          value: false,
          short: 'no',
        },
      ],
    },
  },
  filters: {
    '.eslintrc.js': 'lint',
    '.eslintignore': 'lint',
    '.stylelintrc': 'stylelint',
    'src/redux/**/*': "state === 'redux'",
    'src/mobx/**/*': "state === 'mobx'",
    'config/test.env.js': 'unit || e2e',
    'test/unit/**/*': 'unit',
    'test/unit/jest.conf.js': "unit && runner === 'jest'",
    'test/unit/setup.js': "unit && runner === 'jest'"
  },
  complete: function (data, {chalk}) {
    const green = chalk.green;
    sortDependencies(data, green);
    const cwd = path.join(process.cwd(), data.inPlace ? '' : data.destDirName);
    if (data.autoInstall) {
      installDependencies(cwd, data.autoInstall, green)
        .then(() => {
          return runLintFix(cwd, data, green);
        })
        .then(() => {
          printMessage(data, green);
        })
        .catch(e => {
          console.log(chalk.red('Error:'), e);
        })
    } else {
      printMessage(data, chalk);
    }
  }
};
