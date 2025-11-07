import reporter from 'cucumber-html-reporter';

reporter.generate({
  theme: 'bootstrap',
  jsonFile: 'reports/cucumber-report.json',
  output: 'reports/cucumber-report.html',
  reportSuiteAsScenarios: true,
  launchReport: true,
  metadata: {
    "Project": "Viajes Online",
    "Tester": "Jorge",
    "Platform": "Windows 10",
    "Tools": "Playwright + Cucumber + Screenplay"
  }
});
