// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

// FIXME: edit lines with comment #COVERAGE when new version of karma coverage will really enforce coverage level

module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine", "@angular-devkit/build-angular"],
    plugins: [
      require("karma-jasmine"),
      require("karma-chrome-launcher"),
      require("karma-jasmine-html-reporter"),
      // #COVERAGE replace next line with `require('karma-coverage'),`
      require("karma-coverage-istanbul-reporter"),
      require("@angular-devkit/build-angular/plugins/karma"),
    ],
    client: {
      jasmine: {
        // you can add configuration options for Jasmine here
        // the possible options are listed at https://jasmine.github.io/api/edge/Configuration.html
        // for example, you can disable the random execution with `random: false`
        // or set a specific seed with `seed: 4321`
      },
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
    },
    jasmineHtmlReporter: {
      suppressAll: true, // removes the duplicated traces
    },
    reporters: ["progress", "kjhtml"], // #COVERAGE add 'coverage' to the array
    // #COVERAGE uncomment next block
    // coverageReporter: {
    //   includeAllSource: true,
    //   dir: require("path").join(__dirname, "./coverage/overkill-todolist"),
    //   subdir: ".",
    //   reporters: [
    //     { type: "text-summary" },
    //     { type: "lcov", subdir: "lcov" },
    //     { type: "cobertura", subdir: "cobertura" },
    //   ],
    //   check: {
    //     global: {
    //       statements: 99,
    //       branches: 99,
    //       functions: 99,
    //       lines: 99,
    //     },
    //     each: {
    //       statements: 99,
    //       branches: 99,
    //       functions: 99,
    //       lines: 99,
    //     },
    //   },
    // },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ["Chrome"],
    singleRun: true,
    restartOnFileChange: false,
    // #COVERAGE : remove next block
    coverageIstanbulReporter: {
      reports: ["text-summary", "lcov", "cobertura"],
      fixWebpackSourcePaths: true,
      thresholds: {
        statements: 100,
        lines: 100,
        branches: 100,
        functions: 100,
      },
    },
    browsers: ["ChromeHeadlessCI"],
    customLaunchers: {
      ChromeHeadlessCI: {
        base: "ChromeHeadless",
        flags: ["--no-sandbox"],
      },
    },
  });
};
