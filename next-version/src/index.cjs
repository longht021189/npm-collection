const core = require('@actions/core')
const github = require('@actions/github')
const api = require('./api.cjs')

// const pattern = '.*(a).(b).(c)'
// const regExp = new RegExp(pattern)
// const result = regExp.exec('3141234eqwdeasa,b,c')
// console.log(result, regExp.test('3141234eqwdeasa,b,c'))

const FIRST_VERSION = '0.0.1'

const getPackages = () => {
  return []
}

const getLatestVersion = (values) => {
}

const getNextVersion = (data, pattern, groupIndex, type) => {
  if (data.length <= 0) {
    return FIRST_VERSION
  }

  const regExp = new RegExp(pattern)
  const values = []

  for (const item of data) {
    if (regExp.test(item)) {
      const result = regExp.exec(item)
      values.push(result[groupIndex])
    }
  }

  const latestVersion = getLatestVersion(values)
}

// // `who-to-greet` input defined in action metadata file
// const nameToGreet = core.getInput('who-to-greet');
// console.log(`Hello ${nameToGreet}!`);
// const time = (new Date()).toTimeString();
// core.setOutput("time", time);
// // Get the JSON webhook payload for the event that triggered the workflow
// const payload = JSON.stringify(github.context.payload, undefined, 2)
// console.log(`The event payload: ${payload}`);

const run = async () => {
  try {
    const type = core.getInput('type')
    const pattern = core.getInput('pattern')
    const groupIndex = core.getInput('group-index')
    const from = core.getInput('from')
  
    switch (from) {
      case 'tags':
        const tags = await api.getTags('rust-windowing', 'winit', pattern, process.env.GITHUB_TOKEN)
        getNextVersion(tags, pattern, groupIndex, type)
        break
  
      case 'packages':
        getNextVersion(getPackages(), pattern, groupIndex, type)
        break
  
      default:
        core.setFailed('"from" value is not supported')
        break
    }
  } catch (error) {
    core.setFailed(error);
  }
}

const cleanup = async () => {
}

const isActionPost = core.getState('isPost') === true

if (isActionPost) {
  cleanup()
} else {
  run()
}