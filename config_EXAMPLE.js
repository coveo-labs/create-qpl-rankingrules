function define(name, value) {
  Object.defineProperty(exports, name, {
      value:      value,
      enumerable: true
  });
}

//   Api Key (With Admin rights), key is defined in config.js
define("apiKeyToUse", "");
// Org Id from your Coveo Org
define("orgId", "");
// The Pipeline Id to where to push the rules to
define("pipelineId", "");
