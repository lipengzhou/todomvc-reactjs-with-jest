module.exports = {
  roots: ['<rootDir>/src'],
  // 测试覆盖率统计
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!src/**/*.d.ts'],

  // 运行测试之前准备的内容
  setupFiles: ['react-app-polyfill/jsdom'],

  // 测试环境创建好后执行数组中的文件
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],

  // 配置需要测试的文件路径
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}'
  ],

  // 测试运行环境
  testEnvironment: 'jsdom',

  //
  testRunner:
    'C:\\Users\\lpz\\Projects\\todomvc-reactjs-with-jest\\node_modules\\jest-circus\\runner.js',

  // 资源转换配置
  transform: {
    '^.+\\.(js|jsx|mjs|cjs|ts|tsx)$': '<rootDir>/config/jest/babelTransform.js',
    '^.+\\.css$': '<rootDir>/config/jest/cssTransform.js',
    '^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)':
      '<rootDir>/config/jest/fileTransform.js'
  },

  // 这里的文件不做转换
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$',
    '^.+\\.module\\.(css|sass|scss)$'
  ],

  // 配置模块查找路径
  modulePaths: [],

  //
  moduleNameMapper: {
    '^react-native$': 'react-native-web',
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy'
  },

  // 模块扩展名补齐规则
  moduleFileExtensions: [
    'web.js',
    'js',
    'web.ts',
    'ts',
    'web.tsx',
    'tsx',
    'json',
    'web.jsx',
    'jsx',
    'node'
  ],

  // watch 模式插件
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname'
  ],
  resetMocks: true
}
