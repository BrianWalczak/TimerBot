const { ulid } = require('ulid');

function requestFunction(type, func, args = []) {
  const id = ulid();

  return new Promise((resolve, reject) => {
    const listener = (message) => {
      if (message?.type === 'response' && message?.id === id) {
        process.removeListener('message', listener);

        if (message.error) {
          return reject(new Error(message.error));
        }

        resolve(message.data);
      }
    };

    process.on('message', listener);
    process.send({
      file: type,
      func: func,
      args: args,
      id: id
    });
  });
}

function proxyTemplate(type) {
  return new Proxy({}, {
    get(target, prop) {
      return (...args) => {
        const functionName = String(prop);

        return requestFunction(type, functionName, args);
      };
    }
  });
}

module.exports = { PayPal: proxyTemplate('paypal.js'), RateLimiter: proxyTemplate('rateLimiter.js'), Cache: proxyTemplate('cache.js'), Database: proxyTemplate('db.js') };