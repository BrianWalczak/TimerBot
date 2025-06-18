const chalk = require('chalk');
const localCache = new Map();

setInterval(() => {
	const now = Date.now();
	for (const [key, value] of localCache) {
		if (value.expiresAt && now >= value.expiresAt) {
			localCache.delete(key);
		}
	}
}, 5000);

function getCache(flow, key = null) {
  const cache = localCache.get(flow);

  if (!cache || (cache.expiresAt && cache.expiresAt < Date.now())) {
    localCache.delete(flow);
    return null;
  }

  return key ? (cache[key] ?? null) : cache;
}

function setCache(flow, data, expires = null) {
  const cache = { ...data };
  if(expires !== null && !isNaN(expires)) {
    cache.expiresAt = (Date.now() + expires);
  }
  return localCache.set(flow, cache);
}

function isCache(flow, key = null) {
    const cache = localCache.get(flow);
    let keyValid = !key ? true : (cache && key in cache);
    
    return !!cache && (!cache.expiresAt || cache.expiresAt > Date.now()) && keyValid;
}

function clearCache(flow, key = null) {    
    if (key) {
        const cache = localCache.get(flow);
        if (cache && key in cache) {
            delete cache[key];

            if (Object.keys(cache).length === 0) {
                return localCache.delete(flow);
            } else {
                return localCache.set(flow, cache);
            }
        }
    } else {
        return localCache.delete(flow);
    }
}

console.log(`${chalk.blue('[CACHE]')} Successfully loaded the local cache module.`);
module.exports = { setCache, getCache, isCache, clearCache };