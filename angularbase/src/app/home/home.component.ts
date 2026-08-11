import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Component, ChangeDetectionStrategy } from "@angular/core";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class HomeComponent {
  npmVersion = "???";
  extensions = `{
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=827846
  "recommendations": [
    "angular.ng-template",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "SonarSource.sonarlint-vscode",
    "stringham.move-ts",
    "eamodio.gitlens",
    "mikehanson.auto-barrel",
    "thorstenrintelen.angular-spec-generator",
    "cyrilletuzi.angular-schematics",
    "alexiv.vscode-angular2-files",
    "mikael.angular-beastcode"
  ]
}`;
  settings = `{
    "editor.codeActionsOnSave": {
      "source.organizeImports": "explicit"
    },
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "prettier.useEditorConfig": false,
    "prettier.useTabs": false,    
    "[typescript]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode",
      "editor.codeActionsOnSave": {
      "source.fixAll.eslint": "explicit"
    },    
    },
    "[html]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode",
      "editor.codeActionsOnSave": {
      "source.fixAll.eslint": "explicit"
    }
    },
    "git.ignoreLimitWarning": true,    
}`;
  eslintconfig = `
  const eslint = require("@eslint/js");
  const tseslint = require("typescript-eslint");
  const angular = require("angular-eslint");
  const olbeslint = require('@olb/eslint-config');
  
  module.exports = tseslint.config(
    ...olbeslint.configs.recommended,
    {
      files: ["**/*.ts"],
      extends: [],    
      rules: {
        "@angular-eslint/directive-selector": [
          "error",
          {
            type: "attribute",
            prefix: "meinProjektPrefix",
            style: "camelCase",
          },
        ],
        "@angular-eslint/component-selector": [
          "error",
          {
            type: "element",
            prefix: "meinProjektPrefix",
            style: "kebab-case",
          },
        ],
      },
    },
    {
      files: ["**/*.html"],
      extends: [],
      rules: {},
    }
  );`;

  karmaconfig = `
  // Karma configuration file, see link for more information
  // https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma'),
      require('karma-sonarqube-reporter')
    ],
    client: {
      jasmine: {
        // you can add configuration options for Jasmine here
        // the possible options are listed at https://jasmine.github.io/api/edge/Configuration.html
        // for example, you can disable the random execution with 'random: false'
        // or set a specific seed with 'seed: 4321'
      },
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    jasmineHtmlReporter: {
      suppressAll: true // removes the duplicated traces
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/olb/demo'),
      subdir: '.',
      reporters: [{ type: 'lcov' }, { type: 'text-summary' }]
    },
    sonarqubeReporter: {
      basePath: 'src/app', // test files folder
      filePattern: '**/*spec.ts', // test files glob pattern
      encoding: 'utf-8', // test files encoding
      outputFolder: 'reports', // report destination
      legacyMode: false, // report for Sonarqube < 6.2 (disabled)
      reportName: function (metadata) {
        // report name callback, but accepts also a
        // string (file name) to generate a single file
        /**
         * Report metadata array:
         * - metadata[0] = browser name
         * - metadata[1] = browser version
         * - metadata[2] = plataform name
         * - metadata[3] = plataform version
         */
        return 'sonarqube_report.xml';
      }
    },
    reporters: ['progress', 'kjhtml', 'coverage', 'sonarqube'],
    browsers: ['Chrome'],
    customLaunchers: {
      Headless: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--disable-setuid-sandbox']
      },
      Standard: {
        base: 'Chrome',
        flags: ['-disable-search-engine-choice-screen']
      }
    },
    singleRun: false,
    restartOnFileChange: true
  });
};
  `;

  sonarconfig = `'sonarlint.connectedMode.project': {
  'connectionId': 'https-sonar-olb-de',
  'projectKey': 'MEIN-SONAR-PROJEKT-KEY'
}  
  `;

  constructor(private http: HttpClient) {
    this.http.get<NexusResult>("/nexus/service/rest/v1/search/assets?sort=version&direction=desc&repository=npm-hosted&name=angular-base").subscribe(result => {
      for (const item of result.items) {
        if (item.npm.version.length < 10) {
          // longer version numbers have snapshot suffix
          this.npmVersion = item.npm.version;
          break;
        }
      }
    });
  }

  public throwTestError() {
    const err = new HttpErrorResponse({
      error: {
        detail: "Das ist ein Test Http-Error im Fuß der Anwendung"
      },
      headers: undefined,
      status: 400,
      statusText: "400er Http Fehler",
      url: ""
    });
    throw err;
  }
}

interface NexusResult {
  items: NexusItem[];
}

interface NexusItem {
  npm: NpmVersion;
}

interface NpmVersion {
  name: string;
  version: string;
}
