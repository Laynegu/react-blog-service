/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1612002429991_1224';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  // 配置数据库
  config.mysql = {
    // database configuration
    client: {
      // host
      host: 'localhost',
      // port
      port: '3306',
      // username
      user: 'root',
      // password
      password: '1997010500gu',
      // database
      database: 'blog',
    },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false,
  };

  // 设置安全
  config.security = {
    csrf: {
      enable: false
    },
    domainWhiteList: ['*'],
  };

  // 设置session
  config.session = {
    maxAge: 1000 * 3600 * 12,
    // httpOnly: false,
  };

  // 设置jwt
  exports.jwt = {
    secret: "123456" //自己设置的值
  };

  // 配置跨域
  config.cors = {
    origin: 'http://localhost:3000',
    credentials: true,      //允许cookies可以跨域
    allowMethods: 'GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS'
  };

  return {
    ...config,
    ...userConfig,
  };
};
