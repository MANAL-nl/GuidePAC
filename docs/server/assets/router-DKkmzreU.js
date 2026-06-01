import { r as reactExports, f as functionalUpdate, a as arraysEqual, c as createLRUCache, i as isPromise, b as isRedirect, d as isNotFound, e as invariant, g as createControlledPromise, h as rootRouteId, j as isServer, k as compileDecodeCharMap, t as trimPath, l as rewriteBasepath, m as composeRewrites, p as processRouteTree, n as processRouteMasks, o as resolvePath, q as cleanPath, s as trimPathRight, u as parseHref, v as executeRewriteInput, w as isDangerousProtocol, x as redirect, y as findSingleMatch, z as deepEqual, D as DEFAULT_PROTOCOL_ALLOWLIST, A as interpolatePath, B as nullReplaceEqualDeep, C as replaceEqualDeep, E as last, F as decodePath, G as findFlatMatch, H as findRouteMatch, I as executeRewriteOutput, J as encodePathLikeUrl, K as trimPathLeft, L as joinPaths, M as useRouter, N as dummyMatchContext, O as matchContext, P as requireReactDom, Q as exactPathTest, R as removeTrailingSlash, S as React, T as jsxRuntimeExports, U as isModuleNotFoundError, V as useHydrated, W as escapeHtml, X as getAssetCrossOrigin, Y as resolveManifestAssetLink, Z as Outlet } from "./worker-entry-DaylyazV.js";
var reactUse = reactExports.use;
function useForwardedRef(ref) {
  const innerRef = reactExports.useRef(null);
  reactExports.useImperativeHandle(ref, () => innerRef.current, []);
  return innerRef;
}
function encode(obj, stringify = String) {
  const result = new URLSearchParams();
  for (const key in obj) {
    const val = obj[key];
    if (val !== void 0) result.set(key, stringify(val));
  }
  return result.toString();
}
function toValue(str) {
  if (!str) return "";
  if (str === "false") return false;
  if (str === "true") return true;
  return +str * 0 === 0 && +str + "" === str ? +str : str;
}
function decode(str) {
  const searchParams = new URLSearchParams(str);
  const result = /* @__PURE__ */ Object.create(null);
  for (const [key, value] of searchParams.entries()) {
    const previousValue = result[key];
    if (previousValue == null) result[key] = toValue(value);
    else if (Array.isArray(previousValue)) previousValue.push(toValue(value));
    else result[key] = [previousValue, toValue(value)];
  }
  return result;
}
var defaultParseSearch = parseSearchWith(JSON.parse);
var defaultStringifySearch = stringifySearchWith(JSON.stringify, JSON.parse);
function parseSearchWith(parser) {
  return (searchStr) => {
    if (searchStr[0] === "?") searchStr = searchStr.substring(1);
    const query = decode(searchStr);
    for (const key in query) {
      const value = query[key];
      if (typeof value === "string") try {
        query[key] = parser(value);
      } catch (_err) {
      }
    }
    return query;
  };
}
function stringifySearchWith(stringify, parser) {
  const hasParser = typeof parser === "function";
  function stringifyValue(val) {
    if (typeof val === "object" && val !== null) try {
      return stringify(val);
    } catch (_err) {
    }
    else if (hasParser && typeof val === "string") try {
      parser(val);
      return stringify(val);
    } catch (_err) {
    }
    return val;
  }
  return (search) => {
    const searchStr = encode(search, stringifyValue);
    return searchStr ? `?${searchStr}` : "";
  };
}
function createNonReactiveMutableStore(initialValue) {
  let value = initialValue;
  return {
    get() {
      return value;
    },
    set(nextOrUpdater) {
      value = functionalUpdate(nextOrUpdater, value);
    }
  };
}
function createNonReactiveReadonlyStore(read) {
  return { get() {
    return read();
  } };
}
function createRouterStores(initialState, config) {
  const { createMutableStore, createReadonlyStore, batch, init } = config;
  const matchStores = /* @__PURE__ */ new Map();
  const pendingMatchStores = /* @__PURE__ */ new Map();
  const cachedMatchStores = /* @__PURE__ */ new Map();
  const status = createMutableStore(initialState.status);
  const loadedAt = createMutableStore(initialState.loadedAt);
  const isLoading = createMutableStore(initialState.isLoading);
  const isTransitioning = createMutableStore(initialState.isTransitioning);
  const location = createMutableStore(initialState.location);
  const resolvedLocation = createMutableStore(initialState.resolvedLocation);
  const statusCode = createMutableStore(initialState.statusCode);
  const redirect2 = createMutableStore(initialState.redirect);
  const matchesId = createMutableStore([]);
  const pendingIds = createMutableStore([]);
  const cachedIds = createMutableStore([]);
  const matches = createReadonlyStore(() => readPoolMatches(matchStores, matchesId.get()));
  const pendingMatches = createReadonlyStore(() => readPoolMatches(pendingMatchStores, pendingIds.get()));
  const cachedMatches = createReadonlyStore(() => readPoolMatches(cachedMatchStores, cachedIds.get()));
  const firstId = createReadonlyStore(() => matchesId.get()[0]);
  const hasPending = createReadonlyStore(() => matchesId.get().some((matchId) => {
    return matchStores.get(matchId)?.get().status === "pending";
  }));
  const matchRouteDeps = createReadonlyStore(() => ({
    locationHref: location.get().href,
    resolvedLocationHref: resolvedLocation.get()?.href,
    status: status.get()
  }));
  const __store = createReadonlyStore(() => ({
    status: status.get(),
    loadedAt: loadedAt.get(),
    isLoading: isLoading.get(),
    isTransitioning: isTransitioning.get(),
    matches: matches.get(),
    location: location.get(),
    resolvedLocation: resolvedLocation.get(),
    statusCode: statusCode.get(),
    redirect: redirect2.get()
  }));
  const matchStoreByRouteIdCache = createLRUCache(64);
  function getRouteMatchStore(routeId) {
    let cached = matchStoreByRouteIdCache.get(routeId);
    if (!cached) {
      cached = createReadonlyStore(() => {
        const ids = matchesId.get();
        for (const id of ids) {
          const matchStore = matchStores.get(id);
          if (matchStore && matchStore.routeId === routeId) return matchStore.get();
        }
      });
      matchStoreByRouteIdCache.set(routeId, cached);
    }
    return cached;
  }
  const store = {
    status,
    loadedAt,
    isLoading,
    isTransitioning,
    location,
    resolvedLocation,
    statusCode,
    redirect: redirect2,
    matchesId,
    pendingIds,
    cachedIds,
    matches,
    pendingMatches,
    cachedMatches,
    firstId,
    hasPending,
    matchRouteDeps,
    matchStores,
    pendingMatchStores,
    cachedMatchStores,
    __store,
    getRouteMatchStore,
    setMatches,
    setPending,
    setCached
  };
  setMatches(initialState.matches);
  init?.(store);
  function setMatches(nextMatches) {
    reconcileMatchPool(nextMatches, matchStores, matchesId, createMutableStore, batch);
  }
  function setPending(nextMatches) {
    reconcileMatchPool(nextMatches, pendingMatchStores, pendingIds, createMutableStore, batch);
  }
  function setCached(nextMatches) {
    reconcileMatchPool(nextMatches, cachedMatchStores, cachedIds, createMutableStore, batch);
  }
  return store;
}
function readPoolMatches(pool, ids) {
  const matches = [];
  for (const id of ids) {
    const matchStore = pool.get(id);
    if (matchStore) matches.push(matchStore.get());
  }
  return matches;
}
function reconcileMatchPool(nextMatches, pool, idStore, createMutableStore, batch) {
  const nextIds = nextMatches.map((d) => d.id);
  const nextIdSet = new Set(nextIds);
  batch(() => {
    for (const id of pool.keys()) if (!nextIdSet.has(id)) pool.delete(id);
    for (const nextMatch of nextMatches) {
      const existing = pool.get(nextMatch.id);
      if (!existing) {
        const matchStore = createMutableStore(nextMatch);
        matchStore.routeId = nextMatch.routeId;
        pool.set(nextMatch.id, matchStore);
        continue;
      }
      existing.routeId = nextMatch.routeId;
      if (existing.get() !== nextMatch) existing.set(nextMatch);
    }
    if (!arraysEqual(idStore.get(), nextIds)) idStore.set(nextIds);
  });
}
var triggerOnReady = (inner) => {
  if (!inner.rendered) {
    inner.rendered = true;
    return inner.onReady?.();
  }
};
var resolvePreload = (inner, matchId) => {
  return !!(inner.preload && !inner.router.stores.matchStores.has(matchId));
};
var buildMatchContext = (inner, index, includeCurrentMatch = true) => {
  const context = { ...inner.router.options.context ?? {} };
  const end = includeCurrentMatch ? index : index - 1;
  for (let i = 0; i <= end; i++) {
    const innerMatch = inner.matches[i];
    if (!innerMatch) continue;
    const m = inner.router.getMatch(innerMatch.id);
    if (!m) continue;
    Object.assign(context, m.__routeContext, m.__beforeLoadContext);
  }
  return context;
};
var getNotFoundBoundaryIndex = (inner, err) => {
  if (!inner.matches.length) return;
  const requestedRouteId = err.routeId;
  const matchedRootIndex = inner.matches.findIndex((m) => m.routeId === inner.router.routeTree.id);
  const rootIndex = matchedRootIndex >= 0 ? matchedRootIndex : 0;
  let startIndex = requestedRouteId ? inner.matches.findIndex((match) => match.routeId === requestedRouteId) : inner.firstBadMatchIndex ?? inner.matches.length - 1;
  if (startIndex < 0) startIndex = rootIndex;
  for (let i = startIndex; i >= 0; i--) {
    const match = inner.matches[i];
    if (inner.router.looseRoutesById[match.routeId].options.notFoundComponent) return i;
  }
  return requestedRouteId ? startIndex : rootIndex;
};
var handleRedirectAndNotFound = (inner, match, err) => {
  if (!isRedirect(err) && !isNotFound(err)) return;
  if (isRedirect(err) && err.redirectHandled && !err.options.reloadDocument) throw err;
  if (match) {
    match._nonReactive.beforeLoadPromise?.resolve();
    match._nonReactive.loaderPromise?.resolve();
    match._nonReactive.beforeLoadPromise = void 0;
    match._nonReactive.loaderPromise = void 0;
    match._nonReactive.error = err;
    inner.updateMatch(match.id, (prev) => ({
      ...prev,
      status: isRedirect(err) ? "redirected" : isNotFound(err) ? "notFound" : prev.status === "pending" ? "success" : prev.status,
      context: buildMatchContext(inner, match.index),
      isFetching: false,
      error: err
    }));
    if (isNotFound(err) && !err.routeId) err.routeId = match.routeId;
    match._nonReactive.loadPromise?.resolve();
  }
  if (isRedirect(err)) {
    inner.rendered = true;
    err.options._fromLocation = inner.location;
    err.redirectHandled = true;
    err = inner.router.resolveRedirect(err);
  }
  throw err;
};
var shouldSkipLoader = (inner, matchId) => {
  const match = inner.router.getMatch(matchId);
  if (!match) return true;
  if (match.ssr === false) return true;
  return false;
};
var syncMatchContext = (inner, matchId, index) => {
  const nextContext = buildMatchContext(inner, index);
  inner.updateMatch(matchId, (prev) => {
    return {
      ...prev,
      context: nextContext
    };
  });
};
var handleSerialError = (inner, index, err, routerCode) => {
  const { id: matchId, routeId } = inner.matches[index];
  const route = inner.router.looseRoutesById[routeId];
  if (err instanceof Promise) throw err;
  err.routerCode = routerCode;
  inner.firstBadMatchIndex ??= index;
  handleRedirectAndNotFound(inner, inner.router.getMatch(matchId), err);
  try {
    route.options.onError?.(err);
  } catch (errorHandlerErr) {
    err = errorHandlerErr;
    handleRedirectAndNotFound(inner, inner.router.getMatch(matchId), err);
  }
  inner.updateMatch(matchId, (prev) => {
    prev._nonReactive.beforeLoadPromise?.resolve();
    prev._nonReactive.beforeLoadPromise = void 0;
    prev._nonReactive.loadPromise?.resolve();
    return {
      ...prev,
      error: err,
      status: "error",
      isFetching: false,
      updatedAt: Date.now(),
      abortController: new AbortController()
    };
  });
  if (!inner.preload && !isRedirect(err) && !isNotFound(err)) inner.serialError ??= err;
};
var isBeforeLoadSsr = (inner, matchId, index, route) => {
  const existingMatch = inner.router.getMatch(matchId);
  const parentMatchId = inner.matches[index - 1]?.id;
  const parentMatch = parentMatchId ? inner.router.getMatch(parentMatchId) : void 0;
  if (inner.router.isShell()) {
    existingMatch.ssr = route.id === rootRouteId;
    return;
  }
  if (parentMatch?.ssr === false) {
    existingMatch.ssr = false;
    return;
  }
  const parentOverride = (tempSsr2) => {
    if (tempSsr2 === true && parentMatch?.ssr === "data-only") return "data-only";
    return tempSsr2;
  };
  const defaultSsr = inner.router.options.defaultSsr ?? true;
  if (route.options.ssr === void 0) {
    existingMatch.ssr = parentOverride(defaultSsr);
    return;
  }
  if (typeof route.options.ssr !== "function") {
    existingMatch.ssr = parentOverride(route.options.ssr);
    return;
  }
  const { search, params } = existingMatch;
  const ssrFnContext = {
    search: makeMaybe(search, existingMatch.searchError),
    params: makeMaybe(params, existingMatch.paramsError),
    location: inner.location,
    matches: inner.matches.map((match) => ({
      index: match.index,
      pathname: match.pathname,
      fullPath: match.fullPath,
      staticData: match.staticData,
      id: match.id,
      routeId: match.routeId,
      search: makeMaybe(match.search, match.searchError),
      params: makeMaybe(match.params, match.paramsError),
      ssr: match.ssr
    }))
  };
  const tempSsr = route.options.ssr(ssrFnContext);
  if (isPromise(tempSsr)) return tempSsr.then((ssr) => {
    existingMatch.ssr = parentOverride(ssr ?? defaultSsr);
  });
  existingMatch.ssr = parentOverride(tempSsr ?? defaultSsr);
};
var setupPendingTimeout = (inner, matchId, route, match) => {
  if (match._nonReactive.pendingTimeout !== void 0) return;
  const pendingMs = route.options.pendingMs ?? inner.router.options.defaultPendingMs;
  if (!!(inner.onReady && false)) {
    const pendingTimeout = setTimeout(() => {
      triggerOnReady(inner);
    }, pendingMs);
    match._nonReactive.pendingTimeout = pendingTimeout;
  }
};
var preBeforeLoadSetup = (inner, matchId, route) => {
  const existingMatch = inner.router.getMatch(matchId);
  if (!existingMatch._nonReactive.beforeLoadPromise && !existingMatch._nonReactive.loaderPromise) return;
  setupPendingTimeout(inner, matchId, route, existingMatch);
  const then = () => {
    const match = inner.router.getMatch(matchId);
    if (match.preload && (match.status === "redirected" || match.status === "notFound")) handleRedirectAndNotFound(inner, match, match.error);
  };
  return existingMatch._nonReactive.beforeLoadPromise ? existingMatch._nonReactive.beforeLoadPromise.then(then) : then();
};
var executeBeforeLoad = (inner, matchId, index, route) => {
  const match = inner.router.getMatch(matchId);
  let prevLoadPromise = match._nonReactive.loadPromise;
  match._nonReactive.loadPromise = createControlledPromise(() => {
    prevLoadPromise?.resolve();
    prevLoadPromise = void 0;
  });
  const { paramsError, searchError } = match;
  if (paramsError) handleSerialError(inner, index, paramsError, "PARSE_PARAMS");
  if (searchError) handleSerialError(inner, index, searchError, "VALIDATE_SEARCH");
  setupPendingTimeout(inner, matchId, route, match);
  const abortController = new AbortController();
  let isPending = false;
  const pending = () => {
    if (isPending) return;
    isPending = true;
    inner.updateMatch(matchId, (prev) => ({
      ...prev,
      isFetching: "beforeLoad",
      fetchCount: prev.fetchCount + 1,
      abortController
    }));
  };
  const resolve = () => {
    match._nonReactive.beforeLoadPromise?.resolve();
    match._nonReactive.beforeLoadPromise = void 0;
    inner.updateMatch(matchId, (prev) => ({
      ...prev,
      isFetching: false
    }));
  };
  if (!route.options.beforeLoad) {
    inner.router.batch(() => {
      pending();
      resolve();
    });
    return;
  }
  match._nonReactive.beforeLoadPromise = createControlledPromise();
  const context = {
    ...buildMatchContext(inner, index, false),
    ...match.__routeContext
  };
  const { search, params, cause } = match;
  const preload = resolvePreload(inner, matchId);
  const beforeLoadFnContext = {
    search,
    abortController,
    params,
    preload,
    context,
    location: inner.location,
    navigate: (opts) => inner.router.navigate({
      ...opts,
      _fromLocation: inner.location
    }),
    buildLocation: inner.router.buildLocation,
    cause: preload ? "preload" : cause,
    matches: inner.matches,
    routeId: route.id,
    ...inner.router.options.additionalContext
  };
  const updateContext = (beforeLoadContext2) => {
    if (beforeLoadContext2 === void 0) {
      inner.router.batch(() => {
        pending();
        resolve();
      });
      return;
    }
    if (isRedirect(beforeLoadContext2) || isNotFound(beforeLoadContext2)) {
      pending();
      handleSerialError(inner, index, beforeLoadContext2, "BEFORE_LOAD");
    }
    inner.router.batch(() => {
      pending();
      inner.updateMatch(matchId, (prev) => ({
        ...prev,
        __beforeLoadContext: beforeLoadContext2
      }));
      resolve();
    });
  };
  let beforeLoadContext;
  try {
    beforeLoadContext = route.options.beforeLoad(beforeLoadFnContext);
    if (isPromise(beforeLoadContext)) {
      pending();
      return beforeLoadContext.catch((err) => {
        handleSerialError(inner, index, err, "BEFORE_LOAD");
      }).then(updateContext);
    }
  } catch (err) {
    pending();
    handleSerialError(inner, index, err, "BEFORE_LOAD");
  }
  updateContext(beforeLoadContext);
};
var handleBeforeLoad = (inner, index) => {
  const { id: matchId, routeId } = inner.matches[index];
  const route = inner.router.looseRoutesById[routeId];
  const serverSsr = () => {
    {
      const maybePromise = isBeforeLoadSsr(inner, matchId, index, route);
      if (isPromise(maybePromise)) return maybePromise.then(queueExecution);
    }
    return queueExecution();
  };
  const execute = () => executeBeforeLoad(inner, matchId, index, route);
  const queueExecution = () => {
    if (shouldSkipLoader(inner, matchId)) return;
    const result = preBeforeLoadSetup(inner, matchId, route);
    return isPromise(result) ? result.then(execute) : execute();
  };
  return serverSsr();
};
var executeHead = (inner, matchId, route) => {
  const match = inner.router.getMatch(matchId);
  if (!match) return;
  if (!route.options.head && !route.options.scripts && !route.options.headers) return;
  const assetContext = {
    ssr: inner.router.options.ssr,
    matches: inner.matches,
    match,
    params: match.params,
    loaderData: match.loaderData
  };
  return Promise.all([
    route.options.head?.(assetContext),
    route.options.scripts?.(assetContext),
    route.options.headers?.(assetContext)
  ]).then(([headFnContent, scripts, headers]) => {
    return {
      meta: headFnContent?.meta,
      links: headFnContent?.links,
      headScripts: headFnContent?.scripts,
      headers,
      scripts,
      styles: headFnContent?.styles
    };
  });
};
var getLoaderContext = (inner, matchPromises, matchId, index, route) => {
  const parentMatchPromise = matchPromises[index - 1];
  const { params, loaderDeps, abortController, cause } = inner.router.getMatch(matchId);
  const context = buildMatchContext(inner, index);
  const preload = resolvePreload(inner, matchId);
  return {
    params,
    deps: loaderDeps,
    preload: !!preload,
    parentMatchPromise,
    abortController,
    context,
    location: inner.location,
    navigate: (opts) => inner.router.navigate({
      ...opts,
      _fromLocation: inner.location
    }),
    cause: preload ? "preload" : cause,
    route,
    ...inner.router.options.additionalContext
  };
};
var runLoader = async (inner, matchPromises, matchId, index, route) => {
  try {
    const match = inner.router.getMatch(matchId);
    try {
      if (!(isServer ?? inner.router.isServer) || match.ssr === true) loadRouteChunk(route);
      const routeLoader = route.options.loader;
      const loader = typeof routeLoader === "function" ? routeLoader : routeLoader?.handler;
      const loaderResult = loader?.(getLoaderContext(inner, matchPromises, matchId, index, route));
      const loaderResultIsPromise = !!loader && isPromise(loaderResult);
      if (!!(loaderResultIsPromise || route._lazyPromise || route._componentsPromise || route.options.head || route.options.scripts || route.options.headers || match._nonReactive.minPendingPromise)) inner.updateMatch(matchId, (prev) => ({
        ...prev,
        isFetching: "loader"
      }));
      if (loader) {
        const loaderData = loaderResultIsPromise ? await loaderResult : loaderResult;
        handleRedirectAndNotFound(inner, inner.router.getMatch(matchId), loaderData);
        if (loaderData !== void 0) inner.updateMatch(matchId, (prev) => ({
          ...prev,
          loaderData
        }));
      }
      if (route._lazyPromise) await route._lazyPromise;
      const pendingPromise = match._nonReactive.minPendingPromise;
      if (pendingPromise) await pendingPromise;
      if (route._componentsPromise) await route._componentsPromise;
      inner.updateMatch(matchId, (prev) => ({
        ...prev,
        error: void 0,
        context: buildMatchContext(inner, index),
        status: "success",
        isFetching: false,
        updatedAt: Date.now()
      }));
    } catch (e) {
      let error = e;
      if (error?.name === "AbortError") {
        if (match.abortController.signal.aborted) {
          match._nonReactive.loaderPromise?.resolve();
          match._nonReactive.loaderPromise = void 0;
          return;
        }
        inner.updateMatch(matchId, (prev) => ({
          ...prev,
          status: prev.status === "pending" ? "success" : prev.status,
          isFetching: false,
          context: buildMatchContext(inner, index)
        }));
        return;
      }
      const pendingPromise = match._nonReactive.minPendingPromise;
      if (pendingPromise) await pendingPromise;
      if (isNotFound(e)) await route.options.notFoundComponent?.preload?.();
      handleRedirectAndNotFound(inner, inner.router.getMatch(matchId), e);
      try {
        route.options.onError?.(e);
      } catch (onErrorError) {
        error = onErrorError;
        handleRedirectAndNotFound(inner, inner.router.getMatch(matchId), onErrorError);
      }
      if (!isRedirect(error) && !isNotFound(error)) await loadRouteChunk(route, ["errorComponent"]);
      inner.updateMatch(matchId, (prev) => ({
        ...prev,
        error,
        context: buildMatchContext(inner, index),
        status: "error",
        isFetching: false
      }));
    }
  } catch (err) {
    const match = inner.router.getMatch(matchId);
    if (match) match._nonReactive.loaderPromise = void 0;
    handleRedirectAndNotFound(inner, match, err);
  }
};
var loadRouteMatch = async (inner, matchPromises, index) => {
  async function handleLoader(preload, prevMatch, previousRouteMatchId, match2, route2) {
    const age = Date.now() - prevMatch.updatedAt;
    const staleAge = preload ? route2.options.preloadStaleTime ?? inner.router.options.defaultPreloadStaleTime ?? 3e4 : route2.options.staleTime ?? inner.router.options.defaultStaleTime ?? 0;
    const shouldReloadOption = route2.options.shouldReload;
    const shouldReload = typeof shouldReloadOption === "function" ? shouldReloadOption(getLoaderContext(inner, matchPromises, matchId, index, route2)) : shouldReloadOption;
    const { status, invalid } = match2;
    const staleMatchShouldReload = age >= staleAge && (!!inner.forceStaleReload || match2.cause === "enter" || previousRouteMatchId !== void 0 && previousRouteMatchId !== match2.id);
    loaderShouldRunAsync = status === "success" && (invalid || (shouldReload ?? staleMatchShouldReload));
    if (preload && route2.options.preload === false) ;
    else if (loaderShouldRunAsync && !inner.sync && shouldReloadInBackground) {
      loaderIsRunningAsync = true;
      (async () => {
        try {
          await runLoader(inner, matchPromises, matchId, index, route2);
          const match3 = inner.router.getMatch(matchId);
          match3._nonReactive.loaderPromise?.resolve();
          match3._nonReactive.loadPromise?.resolve();
          match3._nonReactive.loaderPromise = void 0;
          match3._nonReactive.loadPromise = void 0;
        } catch (err) {
          if (isRedirect(err)) await inner.router.navigate(err.options);
        }
      })();
    } else if (status !== "success" || loaderShouldRunAsync) await runLoader(inner, matchPromises, matchId, index, route2);
    else syncMatchContext(inner, matchId, index);
  }
  const { id: matchId, routeId } = inner.matches[index];
  let loaderShouldRunAsync = false;
  let loaderIsRunningAsync = false;
  const route = inner.router.looseRoutesById[routeId];
  const routeLoader = route.options.loader;
  const shouldReloadInBackground = ((typeof routeLoader === "function" ? void 0 : routeLoader?.staleReloadMode) ?? inner.router.options.defaultStaleReloadMode) !== "blocking";
  if (shouldSkipLoader(inner, matchId)) {
    if (!inner.router.getMatch(matchId)) return inner.matches[index];
    syncMatchContext(inner, matchId, index);
    return inner.router.getMatch(matchId);
  } else {
    const prevMatch = inner.router.getMatch(matchId);
    const activeIdAtIndex = inner.router.stores.matchesId.get()[index];
    const previousRouteMatchId = (activeIdAtIndex && inner.router.stores.matchStores.get(activeIdAtIndex) || null)?.routeId === routeId ? activeIdAtIndex : inner.router.stores.matches.get().find((d) => d.routeId === routeId)?.id;
    const preload = resolvePreload(inner, matchId);
    if (prevMatch._nonReactive.loaderPromise) {
      if (prevMatch.status === "success" && !inner.sync && !prevMatch.preload && shouldReloadInBackground) return prevMatch;
      await prevMatch._nonReactive.loaderPromise;
      const match2 = inner.router.getMatch(matchId);
      const error = match2._nonReactive.error || match2.error;
      if (error) handleRedirectAndNotFound(inner, match2, error);
      if (match2.status === "pending") await handleLoader(preload, prevMatch, previousRouteMatchId, match2, route);
    } else {
      const nextPreload = preload && !inner.router.stores.matchStores.has(matchId);
      const match2 = inner.router.getMatch(matchId);
      match2._nonReactive.loaderPromise = createControlledPromise();
      if (nextPreload !== match2.preload) inner.updateMatch(matchId, (prev) => ({
        ...prev,
        preload: nextPreload
      }));
      await handleLoader(preload, prevMatch, previousRouteMatchId, match2, route);
    }
  }
  const match = inner.router.getMatch(matchId);
  if (!loaderIsRunningAsync) {
    match._nonReactive.loaderPromise?.resolve();
    match._nonReactive.loadPromise?.resolve();
    match._nonReactive.loadPromise = void 0;
  }
  clearTimeout(match._nonReactive.pendingTimeout);
  match._nonReactive.pendingTimeout = void 0;
  if (!loaderIsRunningAsync) match._nonReactive.loaderPromise = void 0;
  match._nonReactive.dehydrated = void 0;
  const nextIsFetching = loaderIsRunningAsync ? match.isFetching : false;
  if (nextIsFetching !== match.isFetching || match.invalid !== false) {
    inner.updateMatch(matchId, (prev) => ({
      ...prev,
      isFetching: nextIsFetching,
      invalid: false
    }));
    return inner.router.getMatch(matchId);
  } else return match;
};
async function loadMatches(arg) {
  const inner = arg;
  const matchPromises = [];
  let beforeLoadNotFound;
  for (let i = 0; i < inner.matches.length; i++) {
    try {
      const beforeLoad = handleBeforeLoad(inner, i);
      if (isPromise(beforeLoad)) await beforeLoad;
    } catch (err) {
      if (isRedirect(err)) throw err;
      if (isNotFound(err)) beforeLoadNotFound = err;
      else if (!inner.preload) throw err;
      break;
    }
    if (inner.serialError || inner.firstBadMatchIndex != null) break;
  }
  const baseMaxIndexExclusive = inner.firstBadMatchIndex ?? inner.matches.length;
  const boundaryIndex = beforeLoadNotFound && !inner.preload ? getNotFoundBoundaryIndex(inner, beforeLoadNotFound) : void 0;
  const maxIndexExclusive = beforeLoadNotFound && inner.preload ? 0 : boundaryIndex !== void 0 ? Math.min(boundaryIndex + 1, baseMaxIndexExclusive) : baseMaxIndexExclusive;
  let firstNotFound;
  let firstUnhandledRejection;
  for (let i = 0; i < maxIndexExclusive; i++) matchPromises.push(loadRouteMatch(inner, matchPromises, i));
  try {
    await Promise.all(matchPromises);
  } catch {
    const settled = await Promise.allSettled(matchPromises);
    for (const result of settled) {
      if (result.status !== "rejected") continue;
      const reason = result.reason;
      if (isRedirect(reason)) throw reason;
      if (isNotFound(reason)) firstNotFound ??= reason;
      else firstUnhandledRejection ??= reason;
    }
    if (firstUnhandledRejection !== void 0) throw firstUnhandledRejection;
  }
  const notFoundToThrow = firstNotFound ?? (beforeLoadNotFound && !inner.preload ? beforeLoadNotFound : void 0);
  let headMaxIndex = inner.firstBadMatchIndex !== void 0 ? inner.firstBadMatchIndex : inner.matches.length - 1;
  if (!notFoundToThrow && beforeLoadNotFound && inner.preload) return inner.matches;
  if (notFoundToThrow) {
    const renderedBoundaryIndex = getNotFoundBoundaryIndex(inner, notFoundToThrow);
    if (renderedBoundaryIndex === void 0) {
      invariant();
    }
    const boundaryMatch = inner.matches[renderedBoundaryIndex];
    const boundaryRoute = inner.router.looseRoutesById[boundaryMatch.routeId];
    const defaultNotFoundComponent = inner.router.options?.defaultNotFoundComponent;
    if (!boundaryRoute.options.notFoundComponent && defaultNotFoundComponent) boundaryRoute.options.notFoundComponent = defaultNotFoundComponent;
    notFoundToThrow.routeId = boundaryMatch.routeId;
    const boundaryIsRoot = boundaryMatch.routeId === inner.router.routeTree.id;
    inner.updateMatch(boundaryMatch.id, (prev) => ({
      ...prev,
      ...boundaryIsRoot ? {
        status: "success",
        globalNotFound: true,
        error: void 0
      } : {
        status: "notFound",
        error: notFoundToThrow
      },
      isFetching: false
    }));
    headMaxIndex = renderedBoundaryIndex;
    await loadRouteChunk(boundaryRoute, ["notFoundComponent"]);
  } else if (!inner.preload) {
    const rootMatch = inner.matches[0];
    if (!rootMatch.globalNotFound) {
      if (inner.router.getMatch(rootMatch.id)?.globalNotFound) inner.updateMatch(rootMatch.id, (prev) => ({
        ...prev,
        globalNotFound: false,
        error: void 0
      }));
    }
  }
  if (inner.serialError && inner.firstBadMatchIndex !== void 0) {
    const errorRoute = inner.router.looseRoutesById[inner.matches[inner.firstBadMatchIndex].routeId];
    await loadRouteChunk(errorRoute, ["errorComponent"]);
  }
  for (let i = 0; i <= headMaxIndex; i++) {
    const { id: matchId, routeId } = inner.matches[i];
    const route = inner.router.looseRoutesById[routeId];
    try {
      const headResult = executeHead(inner, matchId, route);
      if (headResult) {
        const head = await headResult;
        inner.updateMatch(matchId, (prev) => ({
          ...prev,
          ...head
        }));
      }
    } catch (err) {
      console.error(`Error executing head for route ${routeId}:`, err);
    }
  }
  const readyPromise = triggerOnReady(inner);
  if (isPromise(readyPromise)) await readyPromise;
  if (notFoundToThrow) throw notFoundToThrow;
  if (inner.serialError && !inner.preload && !inner.onReady) throw inner.serialError;
  return inner.matches;
}
function preloadRouteComponents(route, componentTypesToLoad) {
  const preloads = componentTypesToLoad.map((type) => route.options[type]?.preload?.()).filter(Boolean);
  if (preloads.length === 0) return void 0;
  return Promise.all(preloads);
}
function loadRouteChunk(route, componentTypesToLoad = componentTypes) {
  if (!route._lazyLoaded && route._lazyPromise === void 0) if (route.lazyFn) route._lazyPromise = route.lazyFn().then((lazyRoute) => {
    const { id: _id, ...options } = lazyRoute.options;
    Object.assign(route.options, options);
    route._lazyLoaded = true;
    route._lazyPromise = void 0;
  });
  else route._lazyLoaded = true;
  const runAfterLazy = () => route._componentsLoaded ? void 0 : componentTypesToLoad === componentTypes ? (() => {
    if (route._componentsPromise === void 0) {
      const componentsPromise = preloadRouteComponents(route, componentTypes);
      if (componentsPromise) route._componentsPromise = componentsPromise.then(() => {
        route._componentsLoaded = true;
        route._componentsPromise = void 0;
      });
      else route._componentsLoaded = true;
    }
    return route._componentsPromise;
  })() : preloadRouteComponents(route, componentTypesToLoad);
  return route._lazyPromise ? route._lazyPromise.then(runAfterLazy) : runAfterLazy();
}
function makeMaybe(value, error) {
  if (error) return {
    status: "error",
    error
  };
  return {
    status: "success",
    value
  };
}
function routeNeedsPreload(route) {
  for (const componentType of componentTypes) if (route.options[componentType]?.preload) return true;
  return false;
}
var componentTypes = [
  "component",
  "errorComponent",
  "pendingComponent",
  "notFoundComponent"
];
function getLocationChangeInfo(location, resolvedLocation) {
  const fromLocation = resolvedLocation;
  const toLocation = location;
  return {
    fromLocation,
    toLocation,
    pathChanged: fromLocation?.pathname !== toLocation.pathname,
    hrefChanged: fromLocation?.href !== toLocation.href,
    hashChanged: fromLocation?.hash !== toLocation.hash
  };
}
var RouterCore = class {
  /**
  * @deprecated Use the `createRouter` function instead
  */
  constructor(options, getStoreConfig) {
    this.tempLocationKey = `${Math.round(Math.random() * 1e7)}`;
    this.resetNextScroll = true;
    this.shouldViewTransition = void 0;
    this.isViewTransitionTypesSupported = void 0;
    this.subscribers = /* @__PURE__ */ new Set();
    this.isScrollRestoring = false;
    this.isScrollRestorationSetup = false;
    this.startTransition = (fn) => fn();
    this.update = (newOptions) => {
      const prevOptions = this.options;
      const prevBasepath = this.basepath ?? prevOptions?.basepath ?? "/";
      const basepathWasUnset = this.basepath === void 0;
      const prevRewriteOption = prevOptions?.rewrite;
      this.options = {
        ...prevOptions,
        ...newOptions
      };
      this.isServer = this.options.isServer ?? typeof document === "undefined";
      this.protocolAllowlist = new Set(this.options.protocolAllowlist);
      if (this.options.pathParamsAllowedCharacters) this.pathParamsDecoder = compileDecodeCharMap(this.options.pathParamsAllowedCharacters);
      if (!this.history || this.options.history && this.options.history !== this.history) if (!this.options.history) ;
      else this.history = this.options.history;
      this.origin = this.options.origin;
      if (!this.origin) this.origin = "http://localhost";
      if (this.history) this.updateLatestLocation();
      if (this.options.routeTree !== this.routeTree) {
        this.routeTree = this.options.routeTree;
        let processRouteTreeResult;
        if (globalThis.__TSR_CACHE__ && globalThis.__TSR_CACHE__.routeTree === this.routeTree) {
          const cached = globalThis.__TSR_CACHE__;
          this.resolvePathCache = cached.resolvePathCache;
          processRouteTreeResult = cached.processRouteTreeResult;
        } else {
          this.resolvePathCache = createLRUCache(1e3);
          processRouteTreeResult = this.buildRouteTree();
          if (globalThis.__TSR_CACHE__ === void 0) globalThis.__TSR_CACHE__ = {
            routeTree: this.routeTree,
            processRouteTreeResult,
            resolvePathCache: this.resolvePathCache
          };
        }
        this.setRoutes(processRouteTreeResult);
      }
      if (!this.stores && this.latestLocation) {
        const config = this.getStoreConfig(this);
        this.batch = config.batch;
        this.stores = createRouterStores(getInitialRouterState(this.latestLocation), config);
      }
      let needsLocationUpdate = false;
      const nextBasepath = this.options.basepath ?? "/";
      const nextRewriteOption = this.options.rewrite;
      if (basepathWasUnset || prevBasepath !== nextBasepath || prevRewriteOption !== nextRewriteOption) {
        this.basepath = nextBasepath;
        const rewrites = [];
        const trimmed = trimPath(nextBasepath);
        if (trimmed && trimmed !== "/") rewrites.push(rewriteBasepath({ basepath: nextBasepath }));
        if (nextRewriteOption) rewrites.push(nextRewriteOption);
        this.rewrite = rewrites.length === 0 ? void 0 : rewrites.length === 1 ? rewrites[0] : composeRewrites(rewrites);
        if (this.history) this.updateLatestLocation();
        needsLocationUpdate = true;
      }
      if (needsLocationUpdate && this.stores) this.stores.location.set(this.latestLocation);
      if (typeof window !== "undefined" && "CSS" in window && typeof window.CSS?.supports === "function") this.isViewTransitionTypesSupported = window.CSS.supports("selector(:active-view-transition-type(a)");
    };
    this.updateLatestLocation = () => {
      this.latestLocation = this.parseLocation(this.history.location, this.latestLocation);
    };
    this.buildRouteTree = () => {
      const result = processRouteTree(this.routeTree, this.options.caseSensitive, (route, i) => {
        route.init({ originalIndex: i });
      });
      if (this.options.routeMasks) processRouteMasks(this.options.routeMasks, result.processedTree);
      return result;
    };
    this.subscribe = (eventType, fn) => {
      const listener = {
        eventType,
        fn
      };
      this.subscribers.add(listener);
      return () => {
        this.subscribers.delete(listener);
      };
    };
    this.emit = (routerEvent) => {
      this.subscribers.forEach((listener) => {
        if (listener.eventType === routerEvent.type) listener.fn(routerEvent);
      });
    };
    this.parseLocation = (locationToParse, previousLocation) => {
      const parse = ({ pathname, search, hash, href, state }) => {
        if (!this.rewrite && !/[ \x00-\x1f\x7f\u0080-\uffff]/.test(pathname)) {
          const parsedSearch2 = this.options.parseSearch(search);
          const searchStr2 = this.options.stringifySearch(parsedSearch2);
          return {
            href: pathname + searchStr2 + hash,
            publicHref: pathname + searchStr2 + hash,
            pathname: decodePath(pathname).path,
            external: false,
            searchStr: searchStr2,
            search: nullReplaceEqualDeep(previousLocation?.search, parsedSearch2),
            hash: decodePath(hash.slice(1)).path,
            state: replaceEqualDeep(previousLocation?.state, state)
          };
        }
        const fullUrl = new URL(href, this.origin);
        const url = executeRewriteInput(this.rewrite, fullUrl);
        const parsedSearch = this.options.parseSearch(url.search);
        const searchStr = this.options.stringifySearch(parsedSearch);
        url.search = searchStr;
        return {
          href: url.href.replace(url.origin, ""),
          publicHref: href,
          pathname: decodePath(url.pathname).path,
          external: !!this.rewrite && url.origin !== this.origin,
          searchStr,
          search: nullReplaceEqualDeep(previousLocation?.search, parsedSearch),
          hash: decodePath(url.hash.slice(1)).path,
          state: replaceEqualDeep(previousLocation?.state, state)
        };
      };
      const location = parse(locationToParse);
      const { __tempLocation, __tempKey } = location.state;
      if (__tempLocation && (!__tempKey || __tempKey === this.tempLocationKey)) {
        const parsedTempLocation = parse(__tempLocation);
        parsedTempLocation.state.key = location.state.key;
        parsedTempLocation.state.__TSR_key = location.state.__TSR_key;
        delete parsedTempLocation.state.__tempLocation;
        return {
          ...parsedTempLocation,
          maskedLocation: location
        };
      }
      return location;
    };
    this.resolvePathWithBase = (from, path) => {
      return resolvePath({
        base: from,
        to: cleanPath(path),
        trailingSlash: this.options.trailingSlash,
        cache: this.resolvePathCache
      });
    };
    this.matchRoutes = (pathnameOrNext, locationSearchOrOpts, opts) => {
      if (typeof pathnameOrNext === "string") return this.matchRoutesInternal({
        pathname: pathnameOrNext,
        search: locationSearchOrOpts
      }, opts);
      return this.matchRoutesInternal(pathnameOrNext, locationSearchOrOpts);
    };
    this.getMatchedRoutes = (pathname) => {
      return getMatchedRoutes({
        pathname,
        routesById: this.routesById,
        processedTree: this.processedTree
      });
    };
    this.cancelMatch = (id) => {
      const match = this.getMatch(id);
      if (!match) return;
      match.abortController.abort();
      clearTimeout(match._nonReactive.pendingTimeout);
      match._nonReactive.pendingTimeout = void 0;
    };
    this.cancelMatches = () => {
      this.stores.pendingIds.get().forEach((matchId) => {
        this.cancelMatch(matchId);
      });
      this.stores.matchesId.get().forEach((matchId) => {
        if (this.stores.pendingMatchStores.has(matchId)) return;
        const match = this.stores.matchStores.get(matchId)?.get();
        if (!match) return;
        if (match.status === "pending" || match.isFetching === "loader") this.cancelMatch(matchId);
      });
    };
    this.buildLocation = (opts) => {
      const build = (dest = {}) => {
        const currentLocation = dest._fromLocation || this.pendingBuiltLocation || this.latestLocation;
        const lightweightResult = this.matchRoutesLightweight(currentLocation);
        if (dest.from && false) ;
        const defaultedFromPath = dest.unsafeRelative === "path" ? currentLocation.pathname : dest.from ?? lightweightResult.fullPath;
        const fromPath = this.resolvePathWithBase(defaultedFromPath, ".");
        const fromSearch = lightweightResult.search;
        const fromParams = Object.assign(/* @__PURE__ */ Object.create(null), lightweightResult.params);
        const nextTo = dest.to ? this.resolvePathWithBase(fromPath, `${dest.to}`) : this.resolvePathWithBase(fromPath, ".");
        const nextParams = dest.params === false || dest.params === null ? /* @__PURE__ */ Object.create(null) : (dest.params ?? true) === true ? fromParams : Object.assign(fromParams, functionalUpdate(dest.params, fromParams));
        const destMatchResult = this.getMatchedRoutes(nextTo);
        let destRoutes = destMatchResult.matchedRoutes;
        if ((!destMatchResult.foundRoute || destMatchResult.foundRoute.path !== "/" && destMatchResult.routeParams["**"]) && this.options.notFoundRoute) destRoutes = [...destRoutes, this.options.notFoundRoute];
        if (Object.keys(nextParams).length > 0) for (const route of destRoutes) {
          const fn = route.options.params?.stringify ?? route.options.stringifyParams;
          if (fn) try {
            Object.assign(nextParams, fn(nextParams));
          } catch {
          }
        }
        const nextPathname = opts.leaveParams ? nextTo : decodePath(interpolatePath({
          path: nextTo,
          params: nextParams,
          decoder: this.pathParamsDecoder,
          server: this.isServer
        }).interpolatedPath).path;
        let nextSearch = fromSearch;
        if (opts._includeValidateSearch && this.options.search?.strict) {
          const validatedSearch = {};
          destRoutes.forEach((route) => {
            if (route.options.validateSearch) try {
              Object.assign(validatedSearch, validateSearch(route.options.validateSearch, {
                ...validatedSearch,
                ...nextSearch
              }));
            } catch {
            }
          });
          nextSearch = validatedSearch;
        }
        nextSearch = applySearchMiddleware({
          search: nextSearch,
          dest,
          destRoutes,
          _includeValidateSearch: opts._includeValidateSearch
        });
        nextSearch = nullReplaceEqualDeep(fromSearch, nextSearch);
        const searchStr = this.options.stringifySearch(nextSearch);
        const hash = dest.hash === true ? currentLocation.hash : dest.hash ? functionalUpdate(dest.hash, currentLocation.hash) : void 0;
        const hashStr = hash ? `#${hash}` : "";
        let nextState = dest.state === true ? currentLocation.state : dest.state ? functionalUpdate(dest.state, currentLocation.state) : {};
        nextState = replaceEqualDeep(currentLocation.state, nextState);
        const fullPath = `${nextPathname}${searchStr}${hashStr}`;
        let href;
        let publicHref;
        let external = false;
        if (this.rewrite) {
          const url = new URL(fullPath, this.origin);
          const rewrittenUrl = executeRewriteOutput(this.rewrite, url);
          href = url.href.replace(url.origin, "");
          if (rewrittenUrl.origin !== this.origin) {
            publicHref = rewrittenUrl.href;
            external = true;
          } else publicHref = rewrittenUrl.pathname + rewrittenUrl.search + rewrittenUrl.hash;
        } else {
          href = encodePathLikeUrl(fullPath);
          publicHref = href;
        }
        return {
          publicHref,
          href,
          pathname: nextPathname,
          search: nextSearch,
          searchStr,
          state: nextState,
          hash: hash ?? "",
          external,
          unmaskOnReload: dest.unmaskOnReload
        };
      };
      const buildWithMatches = (dest = {}, maskedDest) => {
        const next = build(dest);
        let maskedNext = maskedDest ? build(maskedDest) : void 0;
        if (!maskedNext) {
          const params = /* @__PURE__ */ Object.create(null);
          if (this.options.routeMasks) {
            const match = findFlatMatch(next.pathname, this.processedTree);
            if (match) {
              Object.assign(params, match.rawParams);
              const { from: _from, params: maskParams, ...maskProps } = match.route;
              const nextParams = maskParams === false || maskParams === null ? /* @__PURE__ */ Object.create(null) : (maskParams ?? true) === true ? params : Object.assign(params, functionalUpdate(maskParams, params));
              maskedDest = {
                from: opts.from,
                ...maskProps,
                params: nextParams
              };
              maskedNext = build(maskedDest);
            }
          }
        }
        if (maskedNext) next.maskedLocation = maskedNext;
        return next;
      };
      if (opts.mask) return buildWithMatches(opts, {
        from: opts.from,
        ...opts.mask
      });
      return buildWithMatches(opts);
    };
    this.commitLocation = async ({ viewTransition, ignoreBlocker, ...next }) => {
      const isSameState = () => {
        const ignoredProps = [
          "key",
          "__TSR_key",
          "__TSR_index",
          "__hashScrollIntoViewOptions"
        ];
        ignoredProps.forEach((prop) => {
          next.state[prop] = this.latestLocation.state[prop];
        });
        const isEqual = deepEqual(next.state, this.latestLocation.state);
        ignoredProps.forEach((prop) => {
          delete next.state[prop];
        });
        return isEqual;
      };
      const isSameUrl = trimPathRight(this.latestLocation.href) === trimPathRight(next.href);
      let previousCommitPromise = this.commitLocationPromise;
      this.commitLocationPromise = createControlledPromise(() => {
        previousCommitPromise?.resolve();
        previousCommitPromise = void 0;
      });
      if (isSameUrl && isSameState()) this.load();
      else {
        let { maskedLocation, hashScrollIntoView, ...nextHistory } = next;
        if (maskedLocation) {
          nextHistory = {
            ...maskedLocation,
            state: {
              ...maskedLocation.state,
              __tempKey: void 0,
              __tempLocation: {
                ...nextHistory,
                search: nextHistory.searchStr,
                state: {
                  ...nextHistory.state,
                  __tempKey: void 0,
                  __tempLocation: void 0,
                  __TSR_key: void 0,
                  key: void 0
                }
              }
            }
          };
          if (nextHistory.unmaskOnReload ?? this.options.unmaskOnReload ?? false) nextHistory.state.__tempKey = this.tempLocationKey;
        }
        nextHistory.state.__hashScrollIntoViewOptions = hashScrollIntoView ?? this.options.defaultHashScrollIntoView ?? true;
        this.shouldViewTransition = viewTransition;
        this.history[next.replace ? "replace" : "push"](nextHistory.publicHref, nextHistory.state, { ignoreBlocker });
      }
      this.resetNextScroll = next.resetScroll ?? true;
      if (!this.history.subscribers.size) this.load();
      return this.commitLocationPromise;
    };
    this.buildAndCommitLocation = ({ replace, resetScroll, hashScrollIntoView, viewTransition, ignoreBlocker, href, ...rest } = {}) => {
      if (href) {
        const currentIndex = this.history.location.state.__TSR_index;
        const parsed = parseHref(href, { __TSR_index: replace ? currentIndex : currentIndex + 1 });
        const hrefUrl = new URL(parsed.pathname, this.origin);
        rest.to = executeRewriteInput(this.rewrite, hrefUrl).pathname;
        rest.search = this.options.parseSearch(parsed.search);
        rest.hash = parsed.hash.slice(1);
      }
      const location = this.buildLocation({
        ...rest,
        _includeValidateSearch: true
      });
      this.pendingBuiltLocation = location;
      const commitPromise = this.commitLocation({
        ...location,
        viewTransition,
        replace,
        resetScroll,
        hashScrollIntoView,
        ignoreBlocker
      });
      Promise.resolve().then(() => {
        if (this.pendingBuiltLocation === location) this.pendingBuiltLocation = void 0;
      });
      return commitPromise;
    };
    this.navigate = async ({ to, reloadDocument, href, publicHref, ...rest }) => {
      let hrefIsUrl = false;
      if (href) try {
        new URL(`${href}`);
        hrefIsUrl = true;
      } catch {
      }
      if (hrefIsUrl && !reloadDocument) reloadDocument = true;
      if (reloadDocument) {
        if (to !== void 0 || !href) {
          const location = this.buildLocation({
            to,
            ...rest
          });
          href = href ?? location.publicHref;
          publicHref = publicHref ?? location.publicHref;
        }
        const reloadHref = !hrefIsUrl && publicHref ? publicHref : href;
        if (isDangerousProtocol(reloadHref, this.protocolAllowlist)) {
          return Promise.resolve();
        }
        if (!rest.ignoreBlocker) {
          const blockers = this.history.getBlockers?.() ?? [];
          for (const blocker of blockers) if (blocker?.blockerFn) {
            if (await blocker.blockerFn({
              currentLocation: this.latestLocation,
              nextLocation: this.latestLocation,
              action: "PUSH"
            })) return Promise.resolve();
          }
        }
        if (rest.replace) window.location.replace(reloadHref);
        else window.location.href = reloadHref;
        return Promise.resolve();
      }
      return this.buildAndCommitLocation({
        ...rest,
        href,
        to,
        _isNavigate: true
      });
    };
    this.beforeLoad = () => {
      this.cancelMatches();
      this.updateLatestLocation();
      {
        const nextLocation = this.buildLocation({
          to: this.latestLocation.pathname,
          search: true,
          params: true,
          hash: true,
          state: true,
          _includeValidateSearch: true
        });
        if (this.latestLocation.publicHref !== nextLocation.publicHref) {
          const href = this.getParsedLocationHref(nextLocation);
          if (nextLocation.external) throw redirect({ href });
          else throw redirect({
            href,
            _builtLocation: nextLocation
          });
        }
      }
      const pendingMatches = this.matchRoutes(this.latestLocation);
      const nextCachedMatches = this.stores.cachedMatches.get().filter((d) => !pendingMatches.some((e) => e.id === d.id));
      this.batch(() => {
        this.stores.status.set("pending");
        this.stores.statusCode.set(200);
        this.stores.isLoading.set(true);
        this.stores.location.set(this.latestLocation);
        this.stores.setPending(pendingMatches);
        this.stores.setCached(nextCachedMatches);
      });
    };
    this.load = async (opts) => {
      let redirect2;
      let notFound;
      let loadPromise;
      const previousLocation = this.stores.resolvedLocation.get() ?? this.stores.location.get();
      loadPromise = new Promise((resolve) => {
        this.startTransition(async () => {
          try {
            this.beforeLoad();
            const next = this.latestLocation;
            const locationChangeInfo = getLocationChangeInfo(next, this.stores.resolvedLocation.get());
            if (!this.stores.redirect.get()) this.emit({
              type: "onBeforeNavigate",
              ...locationChangeInfo
            });
            this.emit({
              type: "onBeforeLoad",
              ...locationChangeInfo
            });
            await loadMatches({
              router: this,
              sync: opts?.sync,
              forceStaleReload: previousLocation.href === next.href,
              matches: this.stores.pendingMatches.get(),
              location: next,
              updateMatch: this.updateMatch,
              onReady: async () => {
                this.startTransition(() => {
                  this.startViewTransition(async () => {
                    let exitingMatches = null;
                    let hookExitingMatches = null;
                    let hookEnteringMatches = null;
                    let hookStayingMatches = null;
                    this.batch(() => {
                      const pendingMatches = this.stores.pendingMatches.get();
                      const mountPending = pendingMatches.length;
                      const currentMatches = this.stores.matches.get();
                      exitingMatches = mountPending ? currentMatches.filter((match) => !this.stores.pendingMatchStores.has(match.id)) : null;
                      const pendingRouteIds = /* @__PURE__ */ new Set();
                      for (const s of this.stores.pendingMatchStores.values()) if (s.routeId) pendingRouteIds.add(s.routeId);
                      const activeRouteIds = /* @__PURE__ */ new Set();
                      for (const s of this.stores.matchStores.values()) if (s.routeId) activeRouteIds.add(s.routeId);
                      hookExitingMatches = mountPending ? currentMatches.filter((match) => !pendingRouteIds.has(match.routeId)) : null;
                      hookEnteringMatches = mountPending ? pendingMatches.filter((match) => !activeRouteIds.has(match.routeId)) : null;
                      hookStayingMatches = mountPending ? pendingMatches.filter((match) => activeRouteIds.has(match.routeId)) : currentMatches;
                      this.stores.isLoading.set(false);
                      this.stores.loadedAt.set(Date.now());
                      if (mountPending) {
                        this.stores.setMatches(pendingMatches);
                        this.stores.setPending([]);
                        this.stores.setCached([...this.stores.cachedMatches.get(), ...exitingMatches.filter((d) => d.status !== "error" && d.status !== "notFound" && d.status !== "redirected")]);
                        this.clearExpiredCache();
                      }
                    });
                    for (const [matches, hook] of [
                      [hookExitingMatches, "onLeave"],
                      [hookEnteringMatches, "onEnter"],
                      [hookStayingMatches, "onStay"]
                    ]) {
                      if (!matches) continue;
                      for (const match of matches) this.looseRoutesById[match.routeId].options[hook]?.(match);
                    }
                  });
                });
              }
            });
          } catch (err) {
            if (isRedirect(err)) {
              redirect2 = err;
            } else if (isNotFound(err)) notFound = err;
            const nextStatusCode = redirect2 ? redirect2.status : notFound ? 404 : this.stores.matches.get().some((d) => d.status === "error") ? 500 : 200;
            this.batch(() => {
              this.stores.statusCode.set(nextStatusCode);
              this.stores.redirect.set(redirect2);
            });
          }
          if (this.latestLoadPromise === loadPromise) {
            this.commitLocationPromise?.resolve();
            this.latestLoadPromise = void 0;
            this.commitLocationPromise = void 0;
          }
          resolve();
        });
      });
      this.latestLoadPromise = loadPromise;
      await loadPromise;
      while (this.latestLoadPromise && loadPromise !== this.latestLoadPromise) await this.latestLoadPromise;
      let newStatusCode = void 0;
      if (this.hasNotFoundMatch()) newStatusCode = 404;
      else if (this.stores.matches.get().some((d) => d.status === "error")) newStatusCode = 500;
      if (newStatusCode !== void 0) this.stores.statusCode.set(newStatusCode);
    };
    this.startViewTransition = (fn) => {
      const shouldViewTransition = this.shouldViewTransition ?? this.options.defaultViewTransition;
      this.shouldViewTransition = void 0;
      if (shouldViewTransition && typeof document !== "undefined" && "startViewTransition" in document && typeof document.startViewTransition === "function") {
        let startViewTransitionParams;
        if (typeof shouldViewTransition === "object" && this.isViewTransitionTypesSupported) {
          const next = this.latestLocation;
          const prevLocation = this.stores.resolvedLocation.get();
          const resolvedViewTransitionTypes = typeof shouldViewTransition.types === "function" ? shouldViewTransition.types(getLocationChangeInfo(next, prevLocation)) : shouldViewTransition.types;
          if (resolvedViewTransitionTypes === false) {
            fn();
            return;
          }
          startViewTransitionParams = {
            update: fn,
            types: resolvedViewTransitionTypes
          };
        } else startViewTransitionParams = fn;
        document.startViewTransition(startViewTransitionParams);
      } else fn();
    };
    this.updateMatch = (id, updater) => {
      this.startTransition(() => {
        const pendingMatch = this.stores.pendingMatchStores.get(id);
        if (pendingMatch) {
          pendingMatch.set(updater);
          return;
        }
        const activeMatch = this.stores.matchStores.get(id);
        if (activeMatch) {
          activeMatch.set(updater);
          return;
        }
        const cachedMatch = this.stores.cachedMatchStores.get(id);
        if (cachedMatch) {
          const next = updater(cachedMatch.get());
          if (next.status === "redirected") {
            if (this.stores.cachedMatchStores.delete(id)) this.stores.cachedIds.set((prev) => prev.filter((matchId) => matchId !== id));
          } else cachedMatch.set(next);
        }
      });
    };
    this.getMatch = (matchId) => {
      return this.stores.cachedMatchStores.get(matchId)?.get() ?? this.stores.pendingMatchStores.get(matchId)?.get() ?? this.stores.matchStores.get(matchId)?.get();
    };
    this.invalidate = (opts) => {
      const invalidate = (d) => {
        if (opts?.filter?.(d) ?? true) return {
          ...d,
          invalid: true,
          ...opts?.forcePending || d.status === "error" || d.status === "notFound" ? {
            status: "pending",
            error: void 0
          } : void 0
        };
        return d;
      };
      this.batch(() => {
        this.stores.setMatches(this.stores.matches.get().map(invalidate));
        this.stores.setCached(this.stores.cachedMatches.get().map(invalidate));
        this.stores.setPending(this.stores.pendingMatches.get().map(invalidate));
      });
      this.shouldViewTransition = false;
      return this.load({ sync: opts?.sync });
    };
    this.getParsedLocationHref = (location) => {
      return location.publicHref || "/";
    };
    this.resolveRedirect = (redirect2) => {
      const locationHeader = redirect2.headers.get("Location");
      if (!redirect2.options.href || redirect2.options._builtLocation) {
        const location = redirect2.options._builtLocation ?? this.buildLocation(redirect2.options);
        const href = this.getParsedLocationHref(location);
        redirect2.options.href = href;
        redirect2.headers.set("Location", href);
      } else if (locationHeader) try {
        const url = new URL(locationHeader);
        if (this.origin && url.origin === this.origin) {
          const href = url.pathname + url.search + url.hash;
          redirect2.options.href = href;
          redirect2.headers.set("Location", href);
        }
      } catch {
      }
      if (redirect2.options.href && !redirect2.options._builtLocation && isDangerousProtocol(redirect2.options.href, this.protocolAllowlist)) throw new Error("Redirect blocked: unsafe protocol");
      if (!redirect2.headers.get("Location")) redirect2.headers.set("Location", redirect2.options.href);
      return redirect2;
    };
    this.clearCache = (opts) => {
      const filter = opts?.filter;
      if (filter !== void 0) this.stores.setCached(this.stores.cachedMatches.get().filter((m) => !filter(m)));
      else this.stores.setCached([]);
    };
    this.clearExpiredCache = () => {
      const now = Date.now();
      const filter = (d) => {
        const route = this.looseRoutesById[d.routeId];
        if (!route.options.loader) return true;
        const gcTime = (d.preload ? route.options.preloadGcTime ?? this.options.defaultPreloadGcTime : route.options.gcTime ?? this.options.defaultGcTime) ?? 300 * 1e3;
        if (d.status === "error") return true;
        return now - d.updatedAt >= gcTime;
      };
      this.clearCache({ filter });
    };
    this.loadRouteChunk = loadRouteChunk;
    this.preloadRoute = async (opts) => {
      const next = opts._builtLocation ?? this.buildLocation(opts);
      let matches = this.matchRoutes(next, {
        throwOnError: true,
        preload: true,
        dest: opts
      });
      const activeMatchIds = /* @__PURE__ */ new Set([...this.stores.matchesId.get(), ...this.stores.pendingIds.get()]);
      const loadedMatchIds = /* @__PURE__ */ new Set([...activeMatchIds, ...this.stores.cachedIds.get()]);
      const matchesToCache = matches.filter((match) => !loadedMatchIds.has(match.id));
      if (matchesToCache.length) {
        const cachedMatches = this.stores.cachedMatches.get();
        this.stores.setCached([...cachedMatches, ...matchesToCache]);
      }
      try {
        matches = await loadMatches({
          router: this,
          matches,
          location: next,
          preload: true,
          updateMatch: (id, updater) => {
            if (activeMatchIds.has(id)) matches = matches.map((d) => d.id === id ? updater(d) : d);
            else this.updateMatch(id, updater);
          }
        });
        return matches;
      } catch (err) {
        if (isRedirect(err)) {
          if (err.options.reloadDocument) return;
          return await this.preloadRoute({
            ...err.options,
            _fromLocation: next
          });
        }
        if (!isNotFound(err)) console.error(err);
        return;
      }
    };
    this.matchRoute = (location, opts) => {
      const matchLocation = {
        ...location,
        to: location.to ? this.resolvePathWithBase(location.from || "", location.to) : void 0,
        params: location.params || {},
        leaveParams: true
      };
      const next = this.buildLocation(matchLocation);
      if (opts?.pending && this.stores.status.get() !== "pending") return false;
      const baseLocation = (opts?.pending === void 0 ? !this.stores.isLoading.get() : opts.pending) ? this.latestLocation : this.stores.resolvedLocation.get() || this.stores.location.get();
      const match = findSingleMatch(next.pathname, opts?.caseSensitive ?? false, opts?.fuzzy ?? false, baseLocation.pathname, this.processedTree);
      if (!match) return false;
      if (location.params) {
        if (!deepEqual(match.rawParams, location.params, { partial: true })) return false;
      }
      if (opts?.includeSearch ?? true) return deepEqual(baseLocation.search, next.search, { partial: true }) ? match.rawParams : false;
      return match.rawParams;
    };
    this.hasNotFoundMatch = () => {
      return this.stores.matches.get().some((d) => d.status === "notFound" || d.globalNotFound);
    };
    this.getStoreConfig = getStoreConfig;
    this.update({
      defaultPreloadDelay: 50,
      defaultPendingMs: 1e3,
      defaultPendingMinMs: 500,
      context: void 0,
      ...options,
      caseSensitive: options.caseSensitive ?? false,
      notFoundMode: options.notFoundMode ?? "fuzzy",
      stringifySearch: options.stringifySearch ?? defaultStringifySearch,
      parseSearch: options.parseSearch ?? defaultParseSearch,
      protocolAllowlist: options.protocolAllowlist ?? DEFAULT_PROTOCOL_ALLOWLIST
    });
    if (typeof document !== "undefined") self.__TSR_ROUTER__ = this;
  }
  isShell() {
    return !!this.options.isShell;
  }
  isPrerendering() {
    return !!this.options.isPrerendering;
  }
  get state() {
    return this.stores.__store.get();
  }
  setRoutes({ routesById, routesByPath, processedTree }) {
    this.routesById = routesById;
    this.routesByPath = routesByPath;
    this.processedTree = processedTree;
    const notFoundRoute = this.options.notFoundRoute;
    if (notFoundRoute) {
      notFoundRoute.init({ originalIndex: 99999999999 });
      this.routesById[notFoundRoute.id] = notFoundRoute;
    }
  }
  get looseRoutesById() {
    return this.routesById;
  }
  getParentContext(parentMatch) {
    return !parentMatch?.id ? this.options.context ?? void 0 : parentMatch.context ?? this.options.context ?? void 0;
  }
  matchRoutesInternal(next, opts) {
    const matchedRoutesResult = this.getMatchedRoutes(next.pathname);
    const { foundRoute, routeParams, parsedParams } = matchedRoutesResult;
    let { matchedRoutes } = matchedRoutesResult;
    let isGlobalNotFound = false;
    if (foundRoute ? foundRoute.path !== "/" && routeParams["**"] : trimPathRight(next.pathname)) if (this.options.notFoundRoute) matchedRoutes = [...matchedRoutes, this.options.notFoundRoute];
    else isGlobalNotFound = true;
    const globalNotFoundRouteId = isGlobalNotFound ? findGlobalNotFoundRouteId(this.options.notFoundMode, matchedRoutes) : void 0;
    const matches = new Array(matchedRoutes.length);
    const previousActiveMatchesByRouteId = /* @__PURE__ */ new Map();
    for (const store of this.stores.matchStores.values()) if (store.routeId) previousActiveMatchesByRouteId.set(store.routeId, store.get());
    for (let index = 0; index < matchedRoutes.length; index++) {
      const route = matchedRoutes[index];
      const parentMatch = matches[index - 1];
      let preMatchSearch;
      let strictMatchSearch;
      let searchError;
      {
        const parentSearch = parentMatch?.search ?? next.search;
        const parentStrictSearch = parentMatch?._strictSearch ?? void 0;
        try {
          const strictSearch = validateSearch(route.options.validateSearch, { ...parentSearch }) ?? void 0;
          preMatchSearch = {
            ...parentSearch,
            ...strictSearch
          };
          strictMatchSearch = {
            ...parentStrictSearch,
            ...strictSearch
          };
          searchError = void 0;
        } catch (err) {
          let searchParamError = err;
          if (!(err instanceof SearchParamError)) searchParamError = new SearchParamError(err.message, { cause: err });
          if (opts?.throwOnError) throw searchParamError;
          preMatchSearch = parentSearch;
          strictMatchSearch = {};
          searchError = searchParamError;
        }
      }
      const loaderDeps = route.options.loaderDeps?.({ search: preMatchSearch }) ?? "";
      const loaderDepsHash = loaderDeps ? JSON.stringify(loaderDeps) : "";
      const { interpolatedPath, usedParams } = interpolatePath({
        path: route.fullPath,
        params: routeParams,
        decoder: this.pathParamsDecoder,
        server: this.isServer
      });
      const matchId = route.id + interpolatedPath + loaderDepsHash;
      const existingMatch = this.getMatch(matchId);
      const previousMatch = previousActiveMatchesByRouteId.get(route.id);
      const strictParams = existingMatch?._strictParams ?? usedParams;
      let paramsError = void 0;
      if (!existingMatch) try {
        extractStrictParams(route, usedParams, parsedParams, strictParams);
      } catch (err) {
        if (isNotFound(err) || isRedirect(err)) paramsError = err;
        else paramsError = new PathParamError(err.message, { cause: err });
        if (opts?.throwOnError) throw paramsError;
      }
      Object.assign(routeParams, strictParams);
      const cause = previousMatch ? "stay" : "enter";
      let match;
      if (existingMatch) match = {
        ...existingMatch,
        cause,
        params: previousMatch?.params ?? routeParams,
        _strictParams: strictParams,
        search: previousMatch ? nullReplaceEqualDeep(previousMatch.search, preMatchSearch) : nullReplaceEqualDeep(existingMatch.search, preMatchSearch),
        _strictSearch: strictMatchSearch
      };
      else {
        const status = route.options.loader || route.options.beforeLoad || route.lazyFn || routeNeedsPreload(route) ? "pending" : "success";
        match = {
          id: matchId,
          ssr: void 0,
          index,
          routeId: route.id,
          params: previousMatch?.params ?? routeParams,
          _strictParams: strictParams,
          pathname: interpolatedPath,
          updatedAt: Date.now(),
          search: previousMatch ? nullReplaceEqualDeep(previousMatch.search, preMatchSearch) : preMatchSearch,
          _strictSearch: strictMatchSearch,
          searchError: void 0,
          status,
          isFetching: false,
          error: void 0,
          paramsError,
          __routeContext: void 0,
          _nonReactive: { loadPromise: createControlledPromise() },
          __beforeLoadContext: void 0,
          context: {},
          abortController: new AbortController(),
          fetchCount: 0,
          cause,
          loaderDeps: previousMatch ? replaceEqualDeep(previousMatch.loaderDeps, loaderDeps) : loaderDeps,
          invalid: false,
          preload: false,
          links: void 0,
          scripts: void 0,
          headScripts: void 0,
          meta: void 0,
          staticData: route.options.staticData || {},
          fullPath: route.fullPath
        };
      }
      if (!opts?.preload) match.globalNotFound = globalNotFoundRouteId === route.id;
      match.searchError = searchError;
      const parentContext = this.getParentContext(parentMatch);
      match.context = {
        ...parentContext,
        ...match.__routeContext,
        ...match.__beforeLoadContext
      };
      matches[index] = match;
    }
    for (let index = 0; index < matches.length; index++) {
      const match = matches[index];
      const route = this.looseRoutesById[match.routeId];
      const existingMatch = this.getMatch(match.id);
      const previousMatch = previousActiveMatchesByRouteId.get(match.routeId);
      match.params = previousMatch ? nullReplaceEqualDeep(previousMatch.params, routeParams) : routeParams;
      if (!existingMatch) {
        const parentMatch = matches[index - 1];
        const parentContext = this.getParentContext(parentMatch);
        if (route.options.context) {
          const contextFnContext = {
            deps: match.loaderDeps,
            params: match.params,
            context: parentContext ?? {},
            location: next,
            navigate: (opts2) => this.navigate({
              ...opts2,
              _fromLocation: next
            }),
            buildLocation: this.buildLocation,
            cause: match.cause,
            abortController: match.abortController,
            preload: !!match.preload,
            matches,
            routeId: route.id
          };
          match.__routeContext = route.options.context(contextFnContext) ?? void 0;
        }
        match.context = {
          ...parentContext,
          ...match.__routeContext,
          ...match.__beforeLoadContext
        };
      }
    }
    return matches;
  }
  /**
  * Lightweight route matching for buildLocation.
  * Only computes fullPath, accumulated search, and params - skipping expensive
  * operations like AbortController, ControlledPromise, loaderDeps, and full match objects.
  */
  matchRoutesLightweight(location) {
    const { matchedRoutes, routeParams, parsedParams } = this.getMatchedRoutes(location.pathname);
    const lastRoute = last(matchedRoutes);
    const accumulatedSearch = { ...location.search };
    for (const route of matchedRoutes) try {
      Object.assign(accumulatedSearch, validateSearch(route.options.validateSearch, accumulatedSearch));
    } catch {
    }
    const lastStateMatchId = last(this.stores.matchesId.get());
    const lastStateMatch = lastStateMatchId && this.stores.matchStores.get(lastStateMatchId)?.get();
    const canReuseParams = lastStateMatch && lastStateMatch.routeId === lastRoute.id && lastStateMatch.pathname === location.pathname;
    let params;
    if (canReuseParams) params = lastStateMatch.params;
    else {
      const strictParams = Object.assign(/* @__PURE__ */ Object.create(null), routeParams);
      for (const route of matchedRoutes) try {
        extractStrictParams(route, routeParams, parsedParams ?? {}, strictParams);
      } catch {
      }
      params = strictParams;
    }
    return {
      matchedRoutes,
      fullPath: lastRoute.fullPath,
      search: accumulatedSearch,
      params
    };
  }
};
var SearchParamError = class extends Error {
};
var PathParamError = class extends Error {
};
function getInitialRouterState(location) {
  return {
    loadedAt: 0,
    isLoading: false,
    isTransitioning: false,
    status: "idle",
    resolvedLocation: void 0,
    location,
    matches: [],
    statusCode: 200
  };
}
function validateSearch(validateSearch2, input) {
  if (validateSearch2 == null) return {};
  if ("~standard" in validateSearch2) {
    const result = validateSearch2["~standard"].validate(input);
    if (result instanceof Promise) throw new SearchParamError("Async validation not supported");
    if (result.issues) throw new SearchParamError(JSON.stringify(result.issues, void 0, 2), { cause: result });
    return result.value;
  }
  if ("parse" in validateSearch2) return validateSearch2.parse(input);
  if (typeof validateSearch2 === "function") return validateSearch2(input);
  return {};
}
function getMatchedRoutes({ pathname, routesById, processedTree }) {
  const routeParams = /* @__PURE__ */ Object.create(null);
  const trimmedPath = trimPathRight(pathname);
  let foundRoute = void 0;
  let parsedParams = void 0;
  const match = findRouteMatch(trimmedPath, processedTree, true);
  if (match) {
    foundRoute = match.route;
    Object.assign(routeParams, match.rawParams);
    parsedParams = Object.assign(/* @__PURE__ */ Object.create(null), match.parsedParams);
  }
  return {
    matchedRoutes: match?.branch || [routesById["__root__"]],
    routeParams,
    foundRoute,
    parsedParams
  };
}
function applySearchMiddleware({ search, dest, destRoutes, _includeValidateSearch }) {
  return buildMiddlewareChain(destRoutes)(search, dest, _includeValidateSearch ?? false);
}
function buildMiddlewareChain(destRoutes) {
  const context = {
    dest: null,
    _includeValidateSearch: false,
    middlewares: []
  };
  for (const route of destRoutes) {
    if ("search" in route.options) {
      if (route.options.search?.middlewares) context.middlewares.push(...route.options.search.middlewares);
    } else if (route.options.preSearchFilters || route.options.postSearchFilters) {
      const legacyMiddleware = ({ search, next }) => {
        let nextSearch = search;
        if ("preSearchFilters" in route.options && route.options.preSearchFilters) nextSearch = route.options.preSearchFilters.reduce((prev, next2) => next2(prev), search);
        const result = next(nextSearch);
        if ("postSearchFilters" in route.options && route.options.postSearchFilters) return route.options.postSearchFilters.reduce((prev, next2) => next2(prev), result);
        return result;
      };
      context.middlewares.push(legacyMiddleware);
    }
    if (route.options.validateSearch) {
      const validate = ({ search, next }) => {
        const result = next(search);
        if (!context._includeValidateSearch) return result;
        try {
          return {
            ...result,
            ...validateSearch(route.options.validateSearch, result) ?? void 0
          };
        } catch {
          return result;
        }
      };
      context.middlewares.push(validate);
    }
  }
  const final = ({ search }) => {
    const dest = context.dest;
    if (!dest.search) return {};
    if (dest.search === true) return search;
    return functionalUpdate(dest.search, search);
  };
  context.middlewares.push(final);
  const applyNext = (index, currentSearch, middlewares) => {
    if (index >= middlewares.length) return currentSearch;
    const middleware = middlewares[index];
    const next = (newSearch) => {
      return applyNext(index + 1, newSearch, middlewares);
    };
    return middleware({
      search: currentSearch,
      next
    });
  };
  return function middleware(search, dest, _includeValidateSearch) {
    context.dest = dest;
    context._includeValidateSearch = _includeValidateSearch;
    return applyNext(0, search, context.middlewares);
  };
}
function findGlobalNotFoundRouteId(notFoundMode, routes) {
  if (notFoundMode !== "root") for (let i = routes.length - 1; i >= 0; i--) {
    const route = routes[i];
    if (route.children) return route.id;
  }
  return rootRouteId;
}
function extractStrictParams(route, referenceParams, parsedParams, accumulatedParams) {
  const parseParams = route.options.params?.parse ?? route.options.parseParams;
  if (parseParams) if (route.options.skipRouteOnParseError) {
    for (const key in referenceParams) if (key in parsedParams) accumulatedParams[key] = parsedParams[key];
  } else {
    const result = parseParams(accumulatedParams);
    Object.assign(accumulatedParams, result);
  }
}
var BaseRoute = class {
  get to() {
    return this._to;
  }
  get id() {
    return this._id;
  }
  get path() {
    return this._path;
  }
  get fullPath() {
    return this._fullPath;
  }
  constructor(options) {
    this.init = (opts) => {
      this.originalIndex = opts.originalIndex;
      const options2 = this.options;
      const isRoot = !options2?.path && !options2?.id;
      this.parentRoute = this.options.getParentRoute?.();
      if (isRoot) this._path = rootRouteId;
      else if (!this.parentRoute) {
        invariant();
      }
      let path = isRoot ? rootRouteId : options2?.path;
      if (path && path !== "/") path = trimPathLeft(path);
      const customId = options2?.id || path;
      let id = isRoot ? rootRouteId : joinPaths([this.parentRoute.id === "__root__" ? "" : this.parentRoute.id, customId]);
      if (path === "__root__") path = "/";
      if (id !== "__root__") id = joinPaths(["/", id]);
      const fullPath = id === "__root__" ? "/" : joinPaths([this.parentRoute.fullPath, path]);
      this._path = path;
      this._id = id;
      this._fullPath = fullPath;
      this._to = trimPathRight(fullPath);
    };
    this.addChildren = (children) => {
      return this._addFileChildren(children);
    };
    this._addFileChildren = (children) => {
      if (Array.isArray(children)) this.children = children;
      if (typeof children === "object" && children !== null) this.children = Object.values(children);
      return this;
    };
    this._addFileTypes = () => {
      return this;
    };
    this.updateLoader = (options2) => {
      Object.assign(this.options, options2);
      return this;
    };
    this.update = (options2) => {
      Object.assign(this.options, options2);
      return this;
    };
    this.lazy = (lazyFn) => {
      this.lazyFn = lazyFn;
      return this;
    };
    this.redirect = (opts) => redirect({
      from: this.fullPath,
      ...opts
    });
    this.options = options || {};
    this.isRoot = !options?.getParentRoute;
    if (options?.id && options?.path) throw new Error(`Route cannot have both an 'id' and a 'path' option.`);
  }
};
var BaseRootRoute = class extends BaseRoute {
  constructor(options) {
    super(options);
  }
};
function useMatch(opts) {
  const router2 = useRouter();
  const nearestMatchId = reactExports.useContext(opts.from ? dummyMatchContext : matchContext);
  const key = opts.from ?? nearestMatchId;
  const matchStore = key ? opts.from ? router2.stores.getRouteMatchStore(key) : router2.stores.matchStores.get(key) : void 0;
  {
    const match = matchStore?.get();
    if ((opts.shouldThrow ?? true) && !match) {
      invariant();
    }
    if (match === void 0) return;
    return opts.select ? opts.select(match) : match;
  }
}
function useLoaderData(opts) {
  return useMatch({
    from: opts.from,
    strict: opts.strict,
    structuralSharing: opts.structuralSharing,
    select: (s) => {
      return opts.select ? opts.select(s.loaderData) : s.loaderData;
    }
  });
}
function useLoaderDeps(opts) {
  const { select, ...rest } = opts;
  return useMatch({
    ...rest,
    select: (s) => {
      return select ? select(s.loaderDeps) : s.loaderDeps;
    }
  });
}
function useParams(opts) {
  return useMatch({
    from: opts.from,
    shouldThrow: opts.shouldThrow,
    structuralSharing: opts.structuralSharing,
    strict: opts.strict,
    select: (match) => {
      const params = opts.strict === false ? match.params : match._strictParams;
      return opts.select ? opts.select(params) : params;
    }
  });
}
function useSearch(opts) {
  return useMatch({
    from: opts.from,
    strict: opts.strict,
    shouldThrow: opts.shouldThrow,
    structuralSharing: opts.structuralSharing,
    select: (match) => {
      return opts.select ? opts.select(match.search) : match.search;
    }
  });
}
function useNavigate(_defaultOpts) {
  const router2 = useRouter();
  return reactExports.useCallback((options) => {
    return router2.navigate({
      ...options,
      from: options.from ?? _defaultOpts?.from
    });
  }, [_defaultOpts?.from, router2]);
}
function useRouteContext(opts) {
  return useMatch({
    ...opts,
    select: (match) => opts.select ? opts.select(match.context) : match.context
  });
}
requireReactDom();
function useLinkProps(options, forwardedRef) {
  const router2 = useRouter();
  const innerRef = useForwardedRef(forwardedRef);
  const { activeProps, inactiveProps, activeOptions, to, preload: userPreload, preloadDelay: userPreloadDelay, preloadIntentProximity: _preloadIntentProximity, hashScrollIntoView, replace, startTransition, resetScroll, viewTransition, children, target, disabled, style, className, onClick, onBlur, onFocus, onMouseEnter, onMouseLeave, onTouchStart, ignoreBlocker, params: _params, search: _search, hash: _hash, state: _state, mask: _mask, reloadDocument: _reloadDocument, unsafeRelative: _unsafeRelative, from: _from, _fromLocation, ...propsSafeToSpread } = options;
  {
    const safeInternal = isSafeInternal(to);
    if (typeof to === "string" && !safeInternal && to.indexOf(":") > -1) try {
      new URL(to);
      if (isDangerousProtocol(to, router2.protocolAllowlist)) {
        if (false) ;
        return {
          ...propsSafeToSpread,
          ref: innerRef,
          href: void 0,
          ...children && { children },
          ...target && { target },
          ...disabled && { disabled },
          ...style && { style },
          ...className && { className }
        };
      }
      return {
        ...propsSafeToSpread,
        ref: innerRef,
        href: to,
        ...children && { children },
        ...target && { target },
        ...disabled && { disabled },
        ...style && { style },
        ...className && { className }
      };
    } catch {
    }
    const next2 = router2.buildLocation({
      ...options,
      from: options.from
    });
    const hrefOption2 = getHrefOption(next2.maskedLocation ? next2.maskedLocation.publicHref : next2.publicHref, next2.maskedLocation ? next2.maskedLocation.external : next2.external, router2.history, disabled);
    const externalLink2 = (() => {
      if (hrefOption2?.external) {
        if (isDangerousProtocol(hrefOption2.href, router2.protocolAllowlist)) {
          return;
        }
        return hrefOption2.href;
      }
      if (safeInternal) return void 0;
      if (typeof to === "string" && to.indexOf(":") > -1) try {
        new URL(to);
        if (isDangerousProtocol(to, router2.protocolAllowlist)) {
          if (false) ;
          return;
        }
        return to;
      } catch {
      }
    })();
    const isActive2 = (() => {
      if (externalLink2) return false;
      const currentLocation2 = router2.stores.location.get();
      const exact = activeOptions?.exact ?? false;
      if (exact) {
        if (!exactPathTest(currentLocation2.pathname, next2.pathname, router2.basepath)) return false;
      } else {
        const currentPathSplit = removeTrailingSlash(currentLocation2.pathname, router2.basepath);
        const nextPathSplit = removeTrailingSlash(next2.pathname, router2.basepath);
        if (!(currentPathSplit.startsWith(nextPathSplit) && (currentPathSplit.length === nextPathSplit.length || currentPathSplit[nextPathSplit.length] === "/"))) return false;
      }
      if (activeOptions?.includeSearch ?? true) {
        if (currentLocation2.search !== next2.search) {
          const currentSearchEmpty = !currentLocation2.search || typeof currentLocation2.search === "object" && Object.keys(currentLocation2.search).length === 0;
          const nextSearchEmpty = !next2.search || typeof next2.search === "object" && Object.keys(next2.search).length === 0;
          if (!(currentSearchEmpty && nextSearchEmpty)) {
            if (!deepEqual(currentLocation2.search, next2.search, {
              partial: !exact,
              ignoreUndefined: !activeOptions?.explicitUndefined
            })) return false;
          }
        }
      }
      if (activeOptions?.includeHash) return false;
      return true;
    })();
    if (externalLink2) return {
      ...propsSafeToSpread,
      ref: innerRef,
      href: externalLink2,
      ...children && { children },
      ...target && { target },
      ...disabled && { disabled },
      ...style && { style },
      ...className && { className }
    };
    const resolvedActiveProps2 = isActive2 ? functionalUpdate(activeProps, {}) ?? STATIC_ACTIVE_OBJECT : STATIC_EMPTY_OBJECT;
    const resolvedInactiveProps2 = isActive2 ? STATIC_EMPTY_OBJECT : functionalUpdate(inactiveProps, {}) ?? STATIC_EMPTY_OBJECT;
    const resolvedStyle2 = (() => {
      const baseStyle = style;
      const activeStyle = resolvedActiveProps2.style;
      const inactiveStyle = resolvedInactiveProps2.style;
      if (!baseStyle && !activeStyle && !inactiveStyle) return;
      if (baseStyle && !activeStyle && !inactiveStyle) return baseStyle;
      if (!baseStyle && activeStyle && !inactiveStyle) return activeStyle;
      if (!baseStyle && !activeStyle && inactiveStyle) return inactiveStyle;
      return {
        ...baseStyle,
        ...activeStyle,
        ...inactiveStyle
      };
    })();
    const resolvedClassName2 = (() => {
      const baseClassName = className;
      const activeClassName = resolvedActiveProps2.className;
      const inactiveClassName = resolvedInactiveProps2.className;
      if (!baseClassName && !activeClassName && !inactiveClassName) return "";
      let out = "";
      if (baseClassName) out = baseClassName;
      if (activeClassName) out = out ? `${out} ${activeClassName}` : activeClassName;
      if (inactiveClassName) out = out ? `${out} ${inactiveClassName}` : inactiveClassName;
      return out;
    })();
    return {
      ...propsSafeToSpread,
      ...resolvedActiveProps2,
      ...resolvedInactiveProps2,
      href: hrefOption2?.href,
      ref: innerRef,
      disabled: !!disabled,
      target,
      ...resolvedStyle2 && { style: resolvedStyle2 },
      ...resolvedClassName2 && { className: resolvedClassName2 },
      ...disabled && STATIC_DISABLED_PROPS,
      ...isActive2 && STATIC_ACTIVE_PROPS
    };
  }
}
var STATIC_EMPTY_OBJECT = {};
var STATIC_ACTIVE_OBJECT = { className: "active" };
var STATIC_DISABLED_PROPS = {
  role: "link",
  "aria-disabled": true
};
var STATIC_ACTIVE_PROPS = {
  "data-status": "active",
  "aria-current": "page"
};
function getHrefOption(publicHref, external, history, disabled) {
  if (disabled) return void 0;
  if (external) return {
    href: publicHref,
    external: true
  };
  return {
    href: history.createHref(publicHref) || "/",
    external: false
  };
}
function isSafeInternal(to) {
  if (typeof to !== "string") return false;
  const zero = to.charCodeAt(0);
  if (zero === 47) return to.charCodeAt(1) !== 47;
  return zero === 46;
}
var Link = reactExports.forwardRef((props, ref) => {
  const { _asChild, ...rest } = props;
  const { type: _type, ...linkProps } = useLinkProps(rest, ref);
  const children = typeof rest.children === "function" ? rest.children({ isActive: linkProps["data-status"] === "active" }) : rest.children;
  if (!_asChild) {
    const { disabled: _, ...rest2 } = linkProps;
    return reactExports.createElement("a", rest2, children);
  }
  return reactExports.createElement(_asChild, linkProps, children);
});
var Route$6 = class Route extends BaseRoute {
  /**
  * @deprecated Use the `createRoute` function instead.
  */
  constructor(options) {
    super(options);
    this.useMatch = (opts) => {
      return useMatch({
        select: opts?.select,
        from: this.id,
        structuralSharing: opts?.structuralSharing
      });
    };
    this.useRouteContext = (opts) => {
      return useRouteContext({
        ...opts,
        from: this.id
      });
    };
    this.useSearch = (opts) => {
      return useSearch({
        select: opts?.select,
        structuralSharing: opts?.structuralSharing,
        from: this.id
      });
    };
    this.useParams = (opts) => {
      return useParams({
        select: opts?.select,
        structuralSharing: opts?.structuralSharing,
        from: this.id
      });
    };
    this.useLoaderDeps = (opts) => {
      return useLoaderDeps({
        ...opts,
        from: this.id
      });
    };
    this.useLoaderData = (opts) => {
      return useLoaderData({
        ...opts,
        from: this.id
      });
    };
    this.useNavigate = () => {
      return useNavigate({ from: this.fullPath });
    };
    this.Link = React.forwardRef((props, ref) => {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Link, {
        ref,
        from: this.fullPath,
        ...props
      });
    });
  }
};
function createRoute(options) {
  return new Route$6(options);
}
var RootRoute = class extends BaseRootRoute {
  /**
  * @deprecated `RootRoute` is now an internal implementation detail. Use `createRootRoute()` instead.
  */
  constructor(options) {
    super(options);
    this.useMatch = (opts) => {
      return useMatch({
        select: opts?.select,
        from: this.id,
        structuralSharing: opts?.structuralSharing
      });
    };
    this.useRouteContext = (opts) => {
      return useRouteContext({
        ...opts,
        from: this.id
      });
    };
    this.useSearch = (opts) => {
      return useSearch({
        select: opts?.select,
        structuralSharing: opts?.structuralSharing,
        from: this.id
      });
    };
    this.useParams = (opts) => {
      return useParams({
        select: opts?.select,
        structuralSharing: opts?.structuralSharing,
        from: this.id
      });
    };
    this.useLoaderDeps = (opts) => {
      return useLoaderDeps({
        ...opts,
        from: this.id
      });
    };
    this.useLoaderData = (opts) => {
      return useLoaderData({
        ...opts,
        from: this.id
      });
    };
    this.useNavigate = () => {
      return useNavigate({ from: this.fullPath });
    };
    this.Link = React.forwardRef((props, ref) => {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Link, {
        ref,
        from: this.fullPath,
        ...props
      });
    });
  }
};
function createRootRoute(options) {
  return new RootRoute(options);
}
function createFileRoute(path) {
  return new FileRoute(path, { silent: true }).createRoute;
}
var FileRoute = class {
  constructor(path, _opts) {
    this.path = path;
    this.createRoute = (options) => {
      const route = createRoute(options);
      route.isRoot = false;
      return route;
    };
    this.silent = _opts?.silent;
  }
};
function lazyRouteComponent(importer, exportName) {
  let loadPromise;
  let comp;
  let error;
  let reload;
  const load = () => {
    if (!loadPromise) loadPromise = importer().then((res) => {
      loadPromise = void 0;
      comp = res[exportName];
    }).catch((err) => {
      error = err;
      if (isModuleNotFoundError(error)) {
        if (error instanceof Error && typeof window !== "undefined" && typeof sessionStorage !== "undefined") {
          const storageKey = `tanstack_router_reload:${error.message}`;
          if (!sessionStorage.getItem(storageKey)) {
            sessionStorage.setItem(storageKey, "1");
            reload = true;
          }
        }
      }
    });
    return loadPromise;
  };
  const lazyComp = function Lazy(props) {
    if (reload) {
      window.location.reload();
      throw new Promise(() => {
      });
    }
    if (error) throw error;
    if (!comp) if (reactUse) reactUse(load());
    else throw load();
    return reactExports.createElement(comp, props);
  };
  lazyComp.preload = load;
  return lazyComp;
}
var getStoreFactory = (opts) => {
  return {
    createMutableStore: createNonReactiveMutableStore,
    createReadonlyStore: createNonReactiveReadonlyStore,
    batch: (fn) => fn()
  };
};
var createRouter = (options) => {
  return new Router(options);
};
var Router = class extends RouterCore {
  constructor(options) {
    super(options, getStoreFactory);
  }
};
function Asset({ tag, attrs, children, nonce }) {
  switch (tag) {
    case "title":
      return /* @__PURE__ */ jsxRuntimeExports.jsx("title", {
        ...attrs,
        suppressHydrationWarning: true,
        children
      });
    case "meta":
      return /* @__PURE__ */ jsxRuntimeExports.jsx("meta", {
        ...attrs,
        suppressHydrationWarning: true
      });
    case "link":
      return /* @__PURE__ */ jsxRuntimeExports.jsx("link", {
        ...attrs,
        nonce,
        suppressHydrationWarning: true
      });
    case "style":
      return /* @__PURE__ */ jsxRuntimeExports.jsx("style", {
        ...attrs,
        dangerouslySetInnerHTML: { __html: children },
        nonce
      });
    case "script":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Script, {
        attrs,
        children
      });
    default:
      return null;
  }
}
function Script({ attrs, children }) {
  useRouter();
  useHydrated();
  const dataScript = typeof attrs?.type === "string" && attrs.type !== "" && attrs.type !== "text/javascript" && attrs.type !== "module";
  reactExports.useEffect(() => {
    if (dataScript) return;
    if (attrs?.src) {
      const normSrc = (() => {
        try {
          const base = document.baseURI || window.location.href;
          return new URL(attrs.src, base).href;
        } catch {
          return attrs.src;
        }
      })();
      if (Array.from(document.querySelectorAll("script[src]")).find((el) => el.src === normSrc)) return;
      const script = document.createElement("script");
      for (const [key, value] of Object.entries(attrs)) if (key !== "suppressHydrationWarning" && value !== void 0 && value !== false) script.setAttribute(key, typeof value === "boolean" ? "" : String(value));
      document.head.appendChild(script);
      return () => {
        if (script.parentNode) script.parentNode.removeChild(script);
      };
    }
    if (typeof children === "string") {
      const typeAttr = typeof attrs?.type === "string" ? attrs.type : "text/javascript";
      const nonceAttr = typeof attrs?.nonce === "string" ? attrs.nonce : void 0;
      if (Array.from(document.querySelectorAll("script:not([src])")).find((el) => {
        if (!(el instanceof HTMLScriptElement)) return false;
        const sType = el.getAttribute("type") ?? "text/javascript";
        const sNonce = el.getAttribute("nonce") ?? void 0;
        return el.textContent === children && sType === typeAttr && sNonce === nonceAttr;
      })) return;
      const script = document.createElement("script");
      script.textContent = children;
      if (attrs) {
        for (const [key, value] of Object.entries(attrs)) if (key !== "suppressHydrationWarning" && value !== void 0 && value !== false) script.setAttribute(key, typeof value === "boolean" ? "" : String(value));
      }
      document.head.appendChild(script);
      return () => {
        if (script.parentNode) script.parentNode.removeChild(script);
      };
    }
  }, [
    attrs,
    children,
    dataScript
  ]);
  {
    if (attrs?.src) return /* @__PURE__ */ jsxRuntimeExports.jsx("script", {
      ...attrs,
      suppressHydrationWarning: true
    });
    if (typeof children === "string") return /* @__PURE__ */ jsxRuntimeExports.jsx("script", {
      ...attrs,
      dangerouslySetInnerHTML: { __html: children },
      suppressHydrationWarning: true
    });
    return null;
  }
}
function buildTagsFromMatches(router2, nonce, matches, assetCrossOrigin) {
  const routeMeta = matches.map((match) => match.meta).filter(Boolean);
  const resultMeta = [];
  const metaByAttribute = {};
  let title;
  for (let i = routeMeta.length - 1; i >= 0; i--) {
    const metas = routeMeta[i];
    for (let j = metas.length - 1; j >= 0; j--) {
      const m = metas[j];
      if (!m) continue;
      if (m.title) {
        if (!title) title = {
          tag: "title",
          children: m.title
        };
      } else if ("script:ld+json" in m) try {
        const json = JSON.stringify(m["script:ld+json"]);
        resultMeta.push({
          tag: "script",
          attrs: { type: "application/ld+json" },
          children: escapeHtml(json)
        });
      } catch {
      }
      else {
        const attribute = m.name ?? m.property;
        if (attribute) if (metaByAttribute[attribute]) continue;
        else metaByAttribute[attribute] = true;
        resultMeta.push({
          tag: "meta",
          attrs: {
            ...m,
            nonce
          }
        });
      }
    }
  }
  if (title) resultMeta.push(title);
  if (nonce) resultMeta.push({
    tag: "meta",
    attrs: {
      property: "csp-nonce",
      content: nonce
    }
  });
  resultMeta.reverse();
  const constructedLinks = matches.map((match) => match.links).filter(Boolean).flat(1).map((link) => ({
    tag: "link",
    attrs: {
      ...link,
      nonce
    }
  }));
  const manifest = router2.ssr?.manifest;
  const assetLinks = matches.map((match) => manifest?.routes[match.routeId]?.assets ?? []).filter(Boolean).flat(1).filter((asset) => asset.tag === "link").map((asset) => ({
    tag: "link",
    attrs: {
      ...asset.attrs,
      crossOrigin: getAssetCrossOrigin(assetCrossOrigin, "stylesheet") ?? asset.attrs?.crossOrigin,
      suppressHydrationWarning: true,
      nonce
    }
  }));
  const preloadLinks = [];
  matches.map((match) => router2.looseRoutesById[match.routeId]).forEach((route) => router2.ssr?.manifest?.routes[route.id]?.preloads?.filter(Boolean).forEach((preload) => {
    const preloadLink = resolveManifestAssetLink(preload);
    preloadLinks.push({
      tag: "link",
      attrs: {
        rel: "modulepreload",
        href: preloadLink.href,
        crossOrigin: getAssetCrossOrigin(assetCrossOrigin, "modulepreload") ?? preloadLink.crossOrigin,
        nonce
      }
    });
  }));
  const styles = matches.map((match) => match.styles).flat(1).filter(Boolean).map(({ children, ...attrs }) => ({
    tag: "style",
    attrs: {
      ...attrs,
      nonce
    },
    children
  }));
  const headScripts = matches.map((match) => match.headScripts).flat(1).filter(Boolean).map(({ children, ...script }) => ({
    tag: "script",
    attrs: {
      ...script,
      nonce
    },
    children
  }));
  return uniqBy([
    ...resultMeta,
    ...preloadLinks,
    ...constructedLinks,
    ...assetLinks,
    ...styles,
    ...headScripts
  ], (d) => JSON.stringify(d));
}
var useTags = (assetCrossOrigin) => {
  const router2 = useRouter();
  const nonce = router2.options.ssr?.nonce;
  return buildTagsFromMatches(router2, nonce, router2.stores.matches.get(), assetCrossOrigin);
};
function uniqBy(arr, fn) {
  const seen = /* @__PURE__ */ new Set();
  return arr.filter((item) => {
    const key = fn(item);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
function HeadContent(props) {
  const tags = useTags(props.assetCrossOrigin);
  const nonce = useRouter().options.ssr?.nonce;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: tags.map((tag) => /* @__PURE__ */ reactExports.createElement(Asset, {
    ...tag,
    key: `tsr-meta-${JSON.stringify(tag)}`,
    nonce
  })) });
}
var Scripts = () => {
  const router2 = useRouter();
  const nonce = router2.options.ssr?.nonce;
  const getAssetScripts = (matches) => {
    const assetScripts = [];
    const manifest = router2.ssr?.manifest;
    if (!manifest) return [];
    matches.map((match) => router2.looseRoutesById[match.routeId]).forEach((route) => manifest.routes[route.id]?.assets?.filter((d) => d.tag === "script").forEach((asset) => {
      assetScripts.push({
        tag: "script",
        attrs: {
          ...asset.attrs,
          nonce
        },
        children: asset.children
      });
    }));
    return assetScripts;
  };
  const getScripts = (matches) => matches.map((match) => match.scripts).flat(1).filter(Boolean).map(({ children, ...script }) => ({
    tag: "script",
    attrs: {
      ...script,
      suppressHydrationWarning: true,
      nonce
    },
    children
  }));
  {
    const activeMatches = router2.stores.matches.get();
    const assetScripts = getAssetScripts(activeMatches);
    return renderScripts(router2, getScripts(activeMatches), assetScripts);
  }
};
function renderScripts(router2, scripts, assetScripts) {
  let serverBufferedScript = void 0;
  if (router2.serverSsr) serverBufferedScript = router2.serverSsr.takeBufferedScripts();
  const allScripts = [...scripts, ...assetScripts];
  if (serverBufferedScript) allScripts.unshift(serverBufferedScript);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: allScripts.map((asset, i) => /* @__PURE__ */ reactExports.createElement(Asset, {
    ...asset,
    key: `tsr-scripts-${asset.tag}-${i}`
  })) });
}
const appCss = "/assets/styles-CG0Kqp3G.css";
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
const Route$5 = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Lovable App" },
      { name: "description", content: "Lovable Generated Project" },
      { name: "author", content: "Lovable" },
      { property: "og:title", content: "Lovable App" },
      { property: "og:description", content: "Lovable Generated Project" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" }
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {});
}
const $$splitComponentImporter$3 = () => import("./mentions-legales-yKFlfsR8.js");
const Route$4 = createFileRoute("/mentions-legales")({
  head: () => ({
    meta: [{
      title: "Mentions légales — Méthode PAC"
    }, {
      name: "robots",
      content: "noindex"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./confidentialite-CV5nI78U.js");
const Route$3 = createFileRoute("/confidentialite")({
  head: () => ({
    meta: [{
      title: "Politique de confidentialité (RGPD) — Méthode PAC"
    }, {
      name: "robots",
      content: "noindex"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./cgv-CU9BozLu.js");
const Route$2 = createFileRoute("/cgv")({
  head: () => ({
    meta: [{
      title: "Conditions Générales de Vente — Méthode PAC"
    }, {
      name: "robots",
      content: "noindex"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./_city-B5RUX-XX.js");
const Route$1 = createFileRoute("/$city")({
  head: () => ({
    meta: [{
      title: "Guide Ultime PAC — Générer des Leads Pompe à Chaleur via Google Ads"
    }, {
      name: "description",
      content: "Le guide premium pour générer 30 à 80 leads PAC qualifiés par mois à moins de 25€ via Google Ads. Templates, scripts et campagnes prêts à l'emploi."
    }, {
      property: "og:title",
      content: "Guide Ultime PAC — Leads Pompe à Chaleur via Google Ads"
    }, {
      property: "og:description",
      content: "Stop aux agrégateurs. Générez vos propres leads PAC qualifiés. Offre de lancement -76%."
    }, {
      property: "og:type",
      content: "product"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const heroBg = "/assets/pompe-a-chaleur-BVr01hFH.jpeg";
const boschLogo = "data:image/svg+xml,%3csvg%20fill='%230f172a'%20role='img'%20viewBox='0%200%2024%2024'%20xmlns='http://www.w3.org/2000/svg'%3e%3ctitle%3eBosch%3c/title%3e%3cpath%20d='M12%200C5.373%200%200%205.373%200%2012s5.373%2012%2012%2012%2012-5.373%2012-12C23.996%205.374%2018.626.004%2012%200zm0%2022.88C5.991%2022.88%201.12%2018.009%201.12%2012S5.991%201.12%2012%201.12%2022.88%205.991%2022.88%2012c-.006%206.006-4.874%2010.874-10.88%2010.88zm4.954-18.374h-.821v4.108h-8.24V4.506h-.847a8.978%208.978%200%200%200%200%2014.988h.846v-4.108h8.24v4.108h.822a8.978%208.978%200%200%200%200-14.988zM6.747%2017.876a7.86%207.86%200%200%201%200-11.752v11.752zm9.386-3.635h-8.24V9.734h8.24v4.507zm1.12%203.61V6.124a7.882%207.882%200%200%201%200%2011.727z'/%3e%3c/svg%3e";
const hitachiLogo = "data:image/svg+xml,%3csvg%20fill='%230f172a'%20role='img'%20viewBox='0%200%2024%2024'%20xmlns='http://www.w3.org/2000/svg'%3e%3ctitle%3eHitachi%3c/title%3e%3cpath%20d='M17.787%2011.41h-1.026a.852.852%200%2000-.052-.284.714.714%200%2000-.459-.427%201.417%201.417%200%2000-.913.019.89.89%200%2000-.535.542%202.318%202.318%200%2000-.04%201.425.88.88%200%2000.535.584%201.492%201.492%200%2000.977.027.705.705%200%2000.428-.384.976.976%200%2000.08-.396h1.031a2.198%202.198%200%2001-.049.351c-.09.365-.346.672-.684.814a3.254%203.254%200%2001-2.251.104c-.477-.15-.89-.493-1.054-.96a2.375%202.375%200%2001-.133-.788c0-.388.068-.764.254-1.077.192-.321.486-.569.842-.701a3.062%203.062%200%20012.318.063%201.2%201.2%200%2001.698.853c.017.076.028.156.033.235zm-3.979%202.436H12.72l-.32-.793h-1.834c-.001.001-.315.794-.319.793h-1.09l1.727-3.693c0%20.002%201.199%200%201.199%200l1.725%203.693zm5.483.001h-.977s.005-3.693%200-3.693h.977v1.477h1.976c0%20.005-.002-1.478%200-1.477h.979s.003%203.686%200%203.693h-.979v-1.626c0%20.005-1.976%200-1.976%200%20.002.007%200%201.624%200%201.626zm-18.312%200H0s.005-3.693%200-3.693h.979s-.002%201.487%200%201.477h1.976c0%20.005-.004-1.478%200-1.477h.978s.004%203.686%200%203.693h-.978v-1.626c0%20.005-1.976%200-1.976%200%200%20.007-.002%201.625%200%201.626zm7.531-.001h-.977v-3.065H6.036s.002-.626%200-.627c.002.001%203.971%200%203.971%200v.627H8.51v3.065zm-3.801-3.692h.977v3.692h-.977v-3.692zm18.312%200H24v3.692h-.979v-3.692zm-11.537.627l-.681%201.68h1.361l-.68-1.68z'/%3e%3c/svg%3e";
const mitsubishiLogo = "data:image/svg+xml,%3csvg%20fill='%230f172a'%20role='img'%20viewBox='0%200%2024%2024'%20xmlns='http://www.w3.org/2000/svg'%3e%3ctitle%3eMitsubishi%3c/title%3e%3cpath%20d='M8%2022.38H0l4-6.92h8zm8%200h8l-4-6.92h-8zm0-13.84l-4-6.92-4%206.92%204%206.92Z'/%3e%3c/svg%3e";
const panasonicLogo = "/assets/panasonic-BLWPBfXZ.svg";
const toshibaLogo = "data:image/svg+xml,%3csvg%20fill='%230f172a'%20role='img'%20viewBox='0%200%2024%2024'%20xmlns='http://www.w3.org/2000/svg'%3e%3ctitle%3eToshiba%3c/title%3e%3cpath%20d='M5.174%2010.172c-1.065%200-1.578.187-1.65%201.148a8.92%208.92%200%2000-.022.68c0%20.218.004.451.021.68.073.96.586%201.148%201.65%201.148%201.065%200%201.58-.188%201.653-1.148.018-.229.022-.462.022-.68%200-.217-.005-.451-.022-.68-.073-.96-.588-1.148-1.652-1.148zm3.79%200c-.41%200-.82.04-.985.121-.322.156-.545.38-.545%201.02%200%20.375.1.654.293.796.281.21.553.23%201.31.27.305.016.47.078.47.34%200%20.332-.294.332-.564.332-.28%200-.366-.025-.46-.096-.084-.063-.105-.176-.106-.348h-.95c0%20.487.01.884.47%201.084.41.18%201.67.18%202.048.014.328-.145.563-.337.563-.994%200-.455-.091-.735-.44-.941-.248-.147-.945-.17-1.298-.192-.258-.016-.356-.11-.356-.338%200-.297.285-.308.53-.308.202%200%20.34.018.439.105.038.039.086.099.088.307h.947c0-.408-.014-.848-.455-1.051-.175-.08-.587-.121-.998-.121zm2.206.062v3.532h.996v-1.362h1.156v1.362h.996v-3.532h-.996v1.29h-1.156v-1.29h-.996zm4.023%200v3.532h1.002v-3.532h-1.002zm1.891%200v3.532h1.887c.869%200%201.162-.376%201.162-.952%200-.401-.092-.755-.643-.894.444-.114.574-.379.574-.762%200-.776-.487-.924-1.181-.924h-1.799zm4.373%200l-1.068%203.532h1.037l.187-.655h1.16l.19.655H24l-1.07-3.532h-1.473zM0%2010.236v.881h1.055v2.65H2.11v-2.65h1.055v-.88H0zm5.174.762c.418%200%20.633.063.66.607.004.085.01.201.01.395%200%20.195-.006.31-.01.395-.027.544-.242.607-.66.607-.418%200-.633-.063-.66-.607A7.674%207.674%200%20014.506%2012c0-.194.003-.31.008-.395.027-.544.242-.607.66-.607zm12.906.045h.69c.18%200%20.293.085.293.291%200%20.176-.112.285-.293.285h-.69v-.576zm4.111.064h.006l.354%201.22h-.713l.353-1.22zm-4.11%201.207h.689c.279%200%20.337.124.337.323s-.11.32-.337.32h-.69v-.643z'/%3e%3c/svg%3e";
const avatar1 = "/assets/julien-Bl5r2s0_.jpg";
const avatar2 = "/assets/avatar-32-RE17Wd9d.jpg";
const avatar3 = "/assets/emilie-DxBtLjhB.jpg";
const avatar4 = "/assets/avatar-52-pKllYHLJ.jpg";
const mergeClasses = (...classes) => classes.filter((className, index, array) => {
  return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();
const toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const toCamelCase = (string) => string.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase()
);
const toPascalCase = (string) => {
  const camelCase = toCamelCase(string);
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};
var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
const hasA11yProp = (props) => {
  for (const prop in props) {
    if (prop.startsWith("aria-") || prop === "role" || prop === "title") {
      return true;
    }
  }
  return false;
};
const Icon = reactExports.forwardRef(
  ({
    color = "currentColor",
    size = 24,
    strokeWidth = 2,
    absoluteStrokeWidth,
    className = "",
    children,
    iconNode,
    ...rest
  }, ref) => reactExports.createElement(
    "svg",
    {
      ref,
      ...defaultAttributes,
      width: size,
      height: size,
      stroke: color,
      strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
      className: mergeClasses("lucide", className),
      ...!children && !hasA11yProp(rest) && { "aria-hidden": "true" },
      ...rest
    },
    [
      ...iconNode.map(([tag, attrs]) => reactExports.createElement(tag, attrs)),
      ...Array.isArray(children) ? children : [children]
    ]
  )
);
const createLucideIcon = (iconName, iconNode) => {
  const Component = reactExports.forwardRef(
    ({ className, ...props }, ref) => reactExports.createElement(Icon, {
      ref,
      iconNode,
      className: mergeClasses(
        `lucide-${toKebabCase(toPascalCase(iconName))}`,
        `lucide-${iconName}`,
        className
      ),
      ...props
    })
  );
  Component.displayName = toPascalCase(iconName);
  return Component;
};
const __iconNode$p = [
  [
    "path",
    {
      d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
      key: "169zse"
    }
  ]
];
const Activity = createLucideIcon("activity", __iconNode$p);
const __iconNode$o = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
const ArrowRight = createLucideIcon("arrow-right", __iconNode$o);
const __iconNode$n = [
  [
    "path",
    {
      d: "m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",
      key: "1yiouv"
    }
  ],
  ["circle", { cx: "12", cy: "8", r: "6", key: "1vp47v" }]
];
const Award = createLucideIcon("award", __iconNode$n);
const __iconNode$m = [
  ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16", key: "c24i48" }],
  ["path", { d: "M18 17V9", key: "2bz60n" }],
  ["path", { d: "M13 17V5", key: "1frdt8" }],
  ["path", { d: "M8 17v-3", key: "17ska0" }]
];
const ChartColumn = createLucideIcon("chart-column", __iconNode$m);
const __iconNode$l = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]];
const Check = createLucideIcon("check", __iconNode$l);
const __iconNode$k = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const CircleCheck = createLucideIcon("circle-check", __iconNode$k);
const __iconNode$j = [
  ["path", { d: "M12 15V3", key: "m9g1x1" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["path", { d: "m7 10 5 5 5-5", key: "brsn70" }]
];
const Download = createLucideIcon("download", __iconNode$j);
const __iconNode$i = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      key: "1oefj6"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["path", { d: "M10 9H8", key: "b1mrlr" }],
  ["path", { d: "M16 13H8", key: "t4e002" }],
  ["path", { d: "M16 17H8", key: "z1uh3a" }]
];
const FileText = createLucideIcon("file-text", __iconNode$i);
const __iconNode$h = [
  [
    "path",
    {
      d: "M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4",
      key: "1slcih"
    }
  ]
];
const Flame = createLucideIcon("flame", __iconNode$h);
const __iconNode$g = [
  ["path", { d: "M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17", key: "geh8rc" }],
  [
    "path",
    {
      d: "m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9",
      key: "1fto5m"
    }
  ],
  ["path", { d: "m2 16 6 6", key: "1pfhp9" }],
  ["circle", { cx: "16", cy: "9", r: "2.9", key: "1n0dlu" }],
  ["circle", { cx: "6", cy: "5", r: "3", key: "151irh" }]
];
const HandCoins = createLucideIcon("hand-coins", __iconNode$g);
const __iconNode$f = [
  [
    "path",
    {
      d: "M19.414 14.414C21 12.828 22 11.5 22 9.5a5.5 5.5 0 0 0-9.591-3.676.6.6 0 0 1-.818.001A5.5 5.5 0 0 0 2 9.5c0 2.3 1.5 4 3 5.5l5.535 5.362a2 2 0 0 0 2.879.052 2.12 2.12 0 0 0-.004-3 2.124 2.124 0 1 0 3-3 2.124 2.124 0 0 0 3.004 0 2 2 0 0 0 0-2.828l-1.881-1.882a2.41 2.41 0 0 0-3.409 0l-1.71 1.71a2 2 0 0 1-2.828 0 2 2 0 0 1 0-2.828l2.823-2.762",
      key: "17lmqv"
    }
  ]
];
const HeartHandshake = createLucideIcon("heart-handshake", __iconNode$f);
const __iconNode$e = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
];
const Lock = createLucideIcon("lock", __iconNode$e);
const __iconNode$d = [
  ["path", { d: "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7", key: "132q7q" }],
  ["rect", { x: "2", y: "4", width: "20", height: "16", rx: "2", key: "izxlao" }]
];
const Mail = createLucideIcon("mail", __iconNode$d);
const __iconNode$c = [
  ["path", { d: "M12.586 12.586 19 19", key: "ea5xo7" }],
  [
    "path",
    {
      d: "M3.688 3.037a.497.497 0 0 0-.651.651l6.5 15.999a.501.501 0 0 0 .947-.062l1.569-6.083a2 2 0 0 1 1.448-1.479l6.124-1.579a.5.5 0 0 0 .063-.947z",
      key: "277e5u"
    }
  ]
];
const MousePointer = createLucideIcon("mouse-pointer", __iconNode$c);
const __iconNode$b = [
  [
    "path",
    {
      d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
      key: "9njp5v"
    }
  ]
];
const Phone = createLucideIcon("phone", __iconNode$b);
const __iconNode$a = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
];
const Plus = createLucideIcon("plus", __iconNode$a);
const __iconNode$9 = [
  ["path", { d: "M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5", key: "qeys4" }],
  [
    "path",
    {
      d: "M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09",
      key: "u4xsad"
    }
  ],
  [
    "path",
    {
      d: "M9 12a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.4 22.4 0 0 1-4 2z",
      key: "676m9"
    }
  ],
  ["path", { d: "M9 12H4s.55-3.03 2-4c1.62-1.08 5 .05 5 .05", key: "92ym6u" }]
];
const Rocket = createLucideIcon("rocket", __iconNode$9);
const __iconNode$8 = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode$8);
const __iconNode$7 = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const ShieldCheck = createLucideIcon("shield-check", __iconNode$7);
const __iconNode$6 = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ]
];
const Shield = createLucideIcon("shield", __iconNode$6);
const __iconNode$5 = [
  [
    "path",
    {
      d: "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",
      key: "1s2grr"
    }
  ],
  ["path", { d: "M20 2v4", key: "1rf3ol" }],
  ["path", { d: "M22 4h-4", key: "gwowj6" }],
  ["circle", { cx: "4", cy: "20", r: "2", key: "6kqj1y" }]
];
const Sparkles = createLucideIcon("sparkles", __iconNode$5);
const __iconNode$4 = [
  [
    "path",
    {
      d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
      key: "r04s7s"
    }
  ]
];
const Star = createLucideIcon("star", __iconNode$4);
const __iconNode$3 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["circle", { cx: "12", cy: "12", r: "6", key: "1vlfrh" }],
  ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }]
];
const Target = createLucideIcon("target", __iconNode$3);
const __iconNode$2 = [
  ["path", { d: "M16 7h6v6", key: "box55l" }],
  ["path", { d: "m22 7-8.5 8.5-5-5L2 17", key: "1t1m79" }]
];
const TrendingUp = createLucideIcon("trending-up", __iconNode$2);
const __iconNode$1 = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
];
const X = createLucideIcon("x", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
];
const Zap = createLucideIcon("zap", __iconNode);
function SiteHeader() {
  const [scrolled, setScrolled] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnnouncementBar$1, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar$1, { scrolled })
  ] });
}
function AnnouncementBar$1() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-x-0 top-0 z-[60] h-12 bg-gradient-to-r from-terracotta via-terracotta to-[oklch(0.68_0.14_60)] text-terracotta-foreground text-sm md:text-base flex items-center justify-center px-4 shadow-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Rocket, { className: "size-4 md:size-5 mr-2 animate-pulse-soft text-foreground/80" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [
      "Multipliez vos chantiers PAC avec des leads ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "100% exclusifs" }),
      ", jamais revendus"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to: "/",
        hash: "formulaire",
        className: "hidden md:inline-flex items-center gap-1 ml-5 rounded-full bg-foreground/15 hover:bg-foreground/25 px-3 py-1 text-xs font-bold uppercase tracking-wider transition",
        children: [
          "Réserver mon créneau ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "size-3" })
        ]
      }
    )
  ] });
}
function Navbar$1({ scrolled }) {
  const [open, setOpen] = reactExports.useState(false);
  const links = [
    ["problemes", "Problèmes"],
    ["solution", "Solution"],
    ["contenu", "Contenu"],
    ["avis", "Avis"],
    ["offre", "Offre"],
    ["faq", "FAQ"]
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "header",
    {
      className: `fixed inset-x-0 top-12 z-50 h-28 transition-all ${scrolled ? "bg-background/85 backdrop-blur-xl border-b" : ""}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[1240px] mx-auto px-8 h-full flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-12 rounded-full bg-primary flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "size-6 text-gold" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-3xl font-bold", children: [
              "Guide",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold", children: "PAC" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "hidden md:flex items-center gap-5 lg:gap-7 text-lg font-medium text-foreground/80", children: links.map(([h, l]) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/",
              hash: h,
              className: "relative py-1 hover:text-primary transition-colors after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:w-0 after:bg-gold after:transition-all hover:after:w-full",
              children: l
            },
            h
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden lg:flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                href: "tel:+33123456789",
                className: `flex items-center gap-2 text-lg transition ${scrolled ? "text-sky hover:text-primary" : "text-primary hover:text-sky"}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "size-5" }),
                  " 01 23 45 67 89"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/",
                hash: "offre",
                className: "rounded-[100px] bg-primary text-primary-foreground px-7 h-14 flex items-center text-lg font-semibold hover:opacity-90 transition",
                children: "Obtenir le guide"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => setOpen(!open),
              className: "lg:hidden size-10 flex items-center justify-center",
              "aria-label": "Menu",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-5 h-0.5 bg-foreground transition ${open ? "rotate-45 translate-y-0.5" : ""}` })
            }
          )
        ] }),
        open && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:hidden bg-background border-b px-6 py-6 space-y-4", children: [
          links.map(([h, l]) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/",
              hash: h,
              onClick: () => setOpen(false),
              className: "block text-sm",
              children: l
            },
            h
          )),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/",
              hash: "offre",
              onClick: () => setOpen(false),
              className: "block rounded-[100px] bg-primary text-primary-foreground px-5 h-11 leading-[44px] text-center text-sm font-semibold",
              children: "Obtenir le guide"
            }
          )
        ] })
      ]
    }
  );
}
function SiteFooter() {
  const trust = [
    { icon: Lock, label: "Paiement sécurisé", desc: "SSL · Stripe" },
    { icon: ShieldCheck, label: "Garantie 30 jours", desc: "Satisfait ou remboursé" },
    { icon: HeartHandshake, label: "Accès à vie", desc: "Mises à jour incluses" },
    { icon: Award, label: "Méthode éprouvée", desc: "+312 installateurs" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "relative bg-gradient-to-b from-cream via-cream/50 to-background overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-32 -left-32 size-[420px] rounded-full bg-gold-soft/40 blur-3xl pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-32 -right-32 size-[460px] rounded-full bg-sky-soft/30 blur-3xl pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative max-w-[1240px] mx-auto px-8 pt-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3 rounded-3xl bg-background border shadow-card p-5", children: trust.map(({ icon: Icon2, label, desc }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 px-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-10 rounded-xl bg-gold-soft flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon2, { className: "size-5 text-gold" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-sm leading-tight", children: label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground truncate", children: desc })
      ] })
    ] }, label)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-[1240px] mx-auto px-8 pt-14 pb-10 grid md:grid-cols-12 gap-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "icon-tile size-11 rounded-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "size-5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-xl font-semibold", children: [
            "Méthode",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold", children: "PAC" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-base text-muted-foreground leading-relaxed max-w-md", children: "Le système d'acquisition Google Ads pour installateurs PAC qui veulent posséder leur canal de leads — moins de 25 € par lead exclusif, ROAS x4 minimum garanti." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap items-center gap-4 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: "mailto:contact@methode-pac.fr",
              className: "inline-flex items-center gap-2 text-foreground hover:text-primary transition",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "size-4 text-gold" }),
                " contact@methode-pac.fr"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: "tel:+33123456789",
              className: "inline-flex items-center gap-2 text-foreground hover:text-primary transition",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "size-4 text-gold" }),
                " 01 23 45 67 89"
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.18em] text-foreground/60 font-bold mb-4", children: "Ressources" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2.5 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FooterLink, { to: "/", hash: "contenu", label: "Sommaire du guide" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FooterLink, { to: "/", hash: "offre", label: "Tarifs" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FooterLink, { to: "/", hash: "faq", label: "Questions fréquentes" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FooterLink, { to: "/", hash: "avis", label: "Témoignages clients" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FooterLink, { to: "/", hash: "problemes", label: "Pourquoi générer ses leads" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.18em] text-foreground/60 font-bold mb-4", children: "Légal & support" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2.5 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FooterLink, { to: "/mentions-legales", label: "Mentions légales" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FooterLink, { to: "/confidentialite", label: "Politique de confidentialité (RGPD)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FooterLink, { to: "/cgv", label: "Conditions Générales de Vente" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FooterLink, { to: "/", hash: "formulaire", label: "Nous contacter" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative border-t border-border/60", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[1240px] mx-auto px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " Méthode PAC SAS · RCS Lyon B 912 345 678 — Tous droits réservés."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2", children: [
        "Conçu pour les installateurs PAC en France ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": true, children: "·" }),
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-foreground/80", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-1.5 rounded-full bg-emerald-500 animate-pulse" }),
          " Service en ligne"
        ] })
      ] })
    ] }) })
  ] });
}
function FooterLink({ to, hash, label }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Link,
    {
      to: to ?? "/",
      hash,
      className: "inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition group",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "size-3 opacity-0 -translate-x-1 transition group-hover:opacity-100 group-hover:translate-x-0" })
      ]
    }
  ) });
}
function useCity() {
  const [city, setCity] = reactExports.useState(() => readCityFromUrl());
  reactExports.useEffect(() => {
    const onPop = () => setCity(readCityFromUrl());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);
  reactExports.useEffect(() => {
    if (typeof document === "undefined") return;
    if (city) {
      document.title = `Guide PAC à ${city} — Leads Pompe à Chaleur via Google Ads`;
      setMeta(
        "description",
        `Le guide premium pour générer 30 à 80 leads PAC qualifiés/mois à ${city} via Google Ads. Templates, scripts et campagnes prêts à l'emploi.`
      );
      setMeta("og:title", `Guide PAC à ${city} — Leads Pompe à Chaleur via Google Ads`, "property");
      setMeta(
        "og:description",
        `Stop aux agrégateurs. Générez vos propres leads PAC à ${city}. Offre de lancement -76%.`,
        "property"
      );
    }
  }, [city]);
  return reactExports.useMemo(() => {
    const label = city || "France";
    const inCity = city ? `à ${city}` : "en France";
    const ofCity = city ? `de ${city}` : "de France";
    const forCity = city ? `pour ${city}` : "pour la France";
    return { city, label, inCity, ofCity, forCity };
  }, [city]);
}
const RESERVED_PATHS = /* @__PURE__ */ new Set(["mentions-legales", "confidentialite", "cgv"]);
function readCityFromUrl() {
  if (typeof window === "undefined") return "";
  const first = window.location.pathname.split("/").filter(Boolean)[0];
  if (!first || RESERVED_PATHS.has(first.toLowerCase())) return "";
  return decodeURIComponent(first).trim().split(/[\s-]+/).map((w) => w.length ? w.charAt(0).toUpperCase() + w.slice(1).toLowerCase() : w).join("-");
}
function setMeta(name, content, attr = "name") {
  let tag = document.querySelector(`meta[${attr}="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}
const dashboardImg = "/assets/analytics-bar-DZThbR9H.jpg";
const pacUnitImg = "/assets/pac-home-ChsjCzuo.jpg";
const Route2 = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Guide Ultime PAC — Générer des Leads Pompe à Chaleur via Google Ads" },
      {
        name: "description",
        content: "Le guide premium pour générer 30 à 80 leads PAC qualifiés par mois à moins de 25€ via Google Ads. Templates, scripts et campagnes prêts à l'emploi."
      },
      { property: "og:title", content: "Guide Ultime PAC — Leads Pompe à Chaleur via Google Ads" },
      {
        property: "og:description",
        content: "Stop aux agrégateurs. Générez vos propres leads PAC qualifiés. Offre de lancement -76%."
      },
      { property: "og:type", content: "product" }
    ]
  }),
  component: Landing
});
function useReveal() {
  reactExports.useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}
function Landing() {
  useReveal();
  const [scrolled, setScrolled] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnnouncementBar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, { scrolled }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Hero, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { zoom: 1.15 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(PressBar, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(PainSection, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CostComparison, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SolutionSection, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(BenefitsSection, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ContentsSection, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ForWhomSection, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TestimonialsSection, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(OfferSection, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(GuaranteesSection, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaqSection, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FinalCta, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(MobileStickyCta, {})
  ] });
}
function AnnouncementBar() {
  const [days, setDays] = reactExports.useState(null);
  reactExports.useEffect(() => {
    const t = (/* @__PURE__ */ new Date("2026-12-31")).getTime();
    setDays(Math.ceil((t - Date.now()) / 864e5));
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-x-0 top-0 z-[60] h-12 bg-gradient-to-r from-terracotta via-terracotta to-[oklch(0.68_0.14_60)] text-terracotta-foreground text-sm md:text-base flex items-center justify-center px-4 shadow-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Rocket, { className: "size-4 md:size-5 mr-2 animate-pulse-soft text-foreground/80" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [
      "Multipliez vos chantiers PAC avec des leads ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "100% exclusifs" }),
      ", jamais revendus"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "a",
      {
        href: "#formulaire",
        className: "hidden md:inline-flex items-center gap-1 ml-5 rounded-full bg-foreground/15 hover:bg-foreground/25 px-3 py-1 text-xs font-bold uppercase tracking-wider transition",
        children: [
          "Réserver mon créneau ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "size-3" })
        ]
      }
    )
  ] });
}
function Navbar({ scrolled }) {
  const [open, setOpen] = reactExports.useState(false);
  const links = [
    ["#problemes", "Problèmes"],
    ["#solution", "Solution"],
    ["#contenu", "Contenu"],
    ["#avis", "Avis"],
    ["#offre", "Offre"],
    ["#faq", "FAQ"]
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "header",
    {
      className: `fixed inset-x-0 top-12 z-50 h-28 transition-all ${scrolled ? "bg-background/85 backdrop-blur-xl border-b" : ""}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-full px-[0.7cm] h-full flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "#", className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-12 rounded-full bg-primary flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "size-6 text-gold" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-3xl font-bold", children: [
              "Guide",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold", children: "PAC" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "hidden md:flex items-center gap-5 lg:gap-7 text-lg font-medium text-foreground/80", children: links.map(([h, l]) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: h,
              className: "relative py-1 hover:text-primary transition-colors after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:w-0 after:bg-gold after:transition-all hover:after:w-full",
              children: l
            },
            h
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden lg:flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                href: "tel:+33123456789",
                className: `inline-flex items-center gap-2 rounded-[100px] border-2 px-5 h-12 text-lg font-semibold transition shadow-card hover:-translate-y-0.5 ${scrolled ? "border-sky/40 text-sky bg-sky-soft/30 hover:bg-sky-soft/60 hover:border-sky" : "border-primary/30 text-primary bg-primary/5 hover:bg-primary/10 hover:border-primary"}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "size-5" }),
                  " 01 23 45 67 89"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: "#offre",
                className: "rounded-[100px] bg-primary text-primary-foreground px-7 h-14 flex items-center text-lg font-semibold hover:opacity-90 transition",
                children: "Obtenir le guide"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => setOpen(!open),
              className: "lg:hidden size-10 flex items-center justify-center",
              "aria-label": "Menu",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-5 h-0.5 bg-foreground transition ${open ? "rotate-45 translate-y-0.5" : ""}` })
            }
          )
        ] }),
        open && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:hidden bg-background border-b px-6 py-6 space-y-4", children: [
          links.map(([h, l]) => /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: h, onClick: () => setOpen(false), className: "block text-sm", children: l }, h)),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: "#offre",
              className: "block rounded-[100px] bg-primary text-primary-foreground px-5 h-11 leading-[44px] text-center text-sm font-semibold",
              children: "Obtenir le guide"
            }
          )
        ] })
      ]
    }
  );
}
function Hero() {
  const { city, inCity } = useCity();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative isolate pt-48 lg:pt-52 pb-10 lg:pb-14 overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: heroBg,
        alt: "",
        "aria-hidden": "true",
        className: "absolute inset-0 w-full h-full object-cover object-center z-0"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-background/80 via-background/45 to-background/15 z-0" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-20 -right-20 size-[500px] rounded-full bg-gold-soft/50 blur-3xl z-0" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 -left-32 size-[400px] rounded-full bg-sky-soft/40 blur-3xl z-0" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-0 bottom-0 h-48 lg:h-64 bg-gradient-to-b from-transparent via-cream/60 to-cream z-[1] pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "relative z-10 max-w-full px-[0.7cm] grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-12 items-start",
        style: { zoom: 0.92 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "reveal", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-4xl md:text-5xl lg:text-7xl leading-[1.05] font-bold [text-shadow:0_2px_18px_rgba(255,255,255,0.85),0_1px_3px_rgba(255,255,255,0.95)]", children: [
              "Générer des leads",
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx("em", { className: "text-primary not-italic", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic", children: "pompe à chaleur" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              city ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                "à ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary animate-pulse-soft", children: city }),
                "."
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary animate-pulse-soft", children: "qualifiés" }),
                "."
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-6 text-xl text-foreground/90 max-w-xl [text-shadow:0_1px_10px_rgba(255,255,255,0.9)]", children: [
              "Générez vos propres leads PAC ",
              inCity,
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "100% exclusifs à ~25€" }),
              " ",
              "via Google Ads — au lieu de payer ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-terracotta", children: "80€/lead à vie" }),
              " à des agrégateurs qui les revendent à 5 confrères."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-8 space-y-3.5 [&_span]:[text-shadow:0_1px_8px_rgba(255,255,255,0.85)]", children: [
              "Templates Google Ads prêts à l'emploi : PAC air/eau (panier élevé), air/air, RGE, MaPrimeRénov'",
              "200+ intent keywords ciblés sur les requêtes des prospects PAC en France",
              "Méthode Quality Score qui réduit votre CPL de 60% en 6 semaines",
              "Setup tracking complet pour piloter votre ROAS au centime près",
              "Méthode appliquée par 47 installateurs · 312 acheteurs · ROAS x4 mini"
            ].map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-0.5 size-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "size-4 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: b })
            ] }, b)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-wrap items-center gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "a",
                {
                  href: "#offre",
                  className: "rounded-[100px] bg-terracotta text-terracotta-foreground px-10 h-16 flex items-center gap-2 font-semibold text-xl shadow-elevated hover:-translate-y-0.5 transition",
                  children: [
                    "Générer mes 1ers leads ",
                    city ? `à ${city}` : "en 14 jours",
                    " — 47€ ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "size-4" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: "#contenu",
                  className: "text-xl text-foreground hover:text-primary transition underline underline-offset-4 font-medium",
                  children: "Voir le sommaire"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex items-center gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex -space-x-2", children: [avatar1, avatar2, avatar3, avatar4].map((src, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src,
                  alt: "",
                  className: "size-11 rounded-full ring-2 ring-background object-cover shadow-card"
                },
                i
              )) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex", children: [1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "size-4 text-gold fill-current" }, i)) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-base text-foreground", children: "4,9/5" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-foreground font-medium mt-0.5", children: "+312 avis · Google & Trustpilot" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(LeadForm, {})
        ]
      }
    )
  ] });
}
function LeadForm() {
  const [submitted, setSubmitted] = reactExports.useState(false);
  const [step, setStep] = reactExports.useState(1);
  const [form, setForm] = reactExports.useState({
    // step 1
    company: "",
    sector: "",
    profile: "",
    // step 2
    civility: "",
    name: "",
    email: "",
    phoneCountry: "+33",
    phone: "",
    needs: ""
  });
  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const canNext1 = form.company && form.sector && form.profile;
  const sectors = [
    "Pompe à chaleur (PAC air/eau)",
    "Pompe à chaleur (PAC air/air)",
    "Photovoltaïque / Solaire",
    "Isolation thermique",
    "Chaudière & chauffage",
    "Ballon thermodynamique",
    "Climatisation",
    "Rénovation énergétique globale",
    "Borne de recharge VE",
    "Autre"
  ];
  const dialCodes = [
    { code: "+33", label: "🇫🇷 France (+33)" },
    { code: "+32", label: "🇧🇪 Belgique (+32)" },
    { code: "+41", label: "🇨🇭 Suisse (+41)" },
    { code: "+352", label: "🇱🇺 Luxembourg (+352)" },
    { code: "+1", label: "🇨🇦 Canada / 🇺🇸 USA (+1)" },
    { code: "+44", label: "🇬🇧 Royaume-Uni (+44)" },
    { code: "+49", label: "🇩🇪 Allemagne (+49)" },
    { code: "+34", label: "🇪🇸 Espagne (+34)" },
    { code: "+39", label: "🇮🇹 Italie (+39)" },
    { code: "+351", label: "🇵🇹 Portugal (+351)" },
    { code: "+31", label: "🇳🇱 Pays-Bas (+31)" },
    { code: "+43", label: "🇦🇹 Autriche (+43)" },
    { code: "+45", label: "🇩🇰 Danemark (+45)" },
    { code: "+46", label: "🇸🇪 Suède (+46)" },
    { code: "+47", label: "🇳🇴 Norvège (+47)" },
    { code: "+358", label: "🇫🇮 Finlande (+358)" },
    { code: "+353", label: "🇮🇪 Irlande (+353)" },
    { code: "+30", label: "🇬🇷 Grèce (+30)" },
    { code: "+48", label: "🇵🇱 Pologne (+48)" },
    { code: "+420", label: "🇨🇿 Tchéquie (+420)" },
    { code: "+36", label: "🇭🇺 Hongrie (+36)" },
    { code: "+40", label: "🇷🇴 Roumanie (+40)" },
    { code: "+212", label: "🇲🇦 Maroc (+212)" },
    { code: "+213", label: "🇩🇿 Algérie (+213)" },
    { code: "+216", label: "🇹🇳 Tunisie (+216)" },
    { code: "+221", label: "🇸🇳 Sénégal (+221)" },
    { code: "+225", label: "🇨🇮 Côte d'Ivoire (+225)" },
    { code: "+237", label: "🇨🇲 Cameroun (+237)" },
    { code: "+971", label: "🇦🇪 Émirats (+971)" },
    { code: "+966", label: "🇸🇦 Arabie Saoudite (+966)" },
    { code: "+90", label: "🇹🇷 Turquie (+90)" },
    { code: "+7", label: "🇷🇺 Russie (+7)" },
    { code: "+86", label: "🇨🇳 Chine (+86)" },
    { code: "+81", label: "🇯🇵 Japon (+81)" },
    { code: "+82", label: "🇰🇷 Corée du Sud (+82)" },
    { code: "+91", label: "🇮🇳 Inde (+91)" },
    { code: "+61", label: "🇦🇺 Australie (+61)" },
    { code: "+55", label: "🇧🇷 Brésil (+55)" },
    { code: "+52", label: "🇲🇽 Mexique (+52)" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { id: "formulaire", className: "relative reveal scroll-mt-24 lg:mt-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -inset-6 bg-gradient-to-br from-gold-soft via-transparent to-sky-soft blur-2xl -z-10" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl bg-background border shadow-elevated overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-cream px-8 py-7 border-b", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg uppercase tracking-wider text-gold font-semibold", children: "Une question ? On vous répond sous 24h" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "mt-2 font-display text-4xl font-bold", children: [
          step === 1 && "Parlez-nous de votre activité",
          step === 2 && "Vos coordonnées"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 h-1.5 rounded-full bg-background overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-gold transition-all duration-500", style: { width: `${step / 2 * 100}%` } }) })
      ] }),
      submitted ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-10 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-14 mx-auto rounded-full bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "size-7 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "mt-4 font-display text-2xl", children: [
          "Merci ",
          form.name.split(" ")[0],
          " !"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xl text-muted-foreground", children: "Nous revenons vers vous sous 24h." })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "form",
        {
          onSubmit: (e) => {
            e.preventDefault();
            if (step < 2) return;
            setSubmitted(true);
          },
          className: "p-8 space-y-4",
          children: [
            step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Société", value: form.company, onChange: (v) => update("company", v), required: true }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "select",
                {
                  required: true,
                  value: form.sector,
                  onChange: (e) => update("sector", e.target.value),
                  className: "w-full h-14 rounded-[100px] border bg-cream/50 px-6 text-lg outline-none focus:border-primary",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Secteur d'activité…" }),
                    sectors.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: s }, s))
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "select",
                {
                  required: true,
                  value: form.profile,
                  onChange: (e) => update("profile", e.target.value),
                  className: "w-full h-14 rounded-[100px] border bg-cream/50 px-6 text-lg outline-none focus:border-primary",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Vous êtes…" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Installateur PAC" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Entrepreneur" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Agence marketing" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Commercial énergétique" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Autre" })
                  ]
                }
              )
            ] }),
            step === 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "select",
                {
                  required: true,
                  value: form.civility,
                  onChange: (e) => update("civility", e.target.value),
                  className: "w-full h-14 rounded-[100px] border bg-cream/50 px-6 text-lg outline-none focus:border-primary",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Civilité…" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "M." }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Mme" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Nom et prénom", value: form.name, onChange: (v) => update("name", v), required: true }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  placeholder: "Email",
                  type: "email",
                  value: form.email,
                  onChange: (v) => update("email", v),
                  required: true
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "select",
                  {
                    value: form.phoneCountry,
                    onChange: (e) => update("phoneCountry", e.target.value),
                    className: "h-14 w-36 rounded-[100px] border bg-cream/50 px-4 text-lg outline-none focus:border-primary",
                    children: dialCodes.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: d.code, children: d.label }, d.code))
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "tel",
                    placeholder: "Téléphone",
                    value: form.phone,
                    onChange: (e) => update("phone", e.target.value),
                    required: true,
                    maxLength: 20,
                    className: "flex-1 h-14 rounded-[100px] border bg-cream/50 px-6 text-lg outline-none focus:border-primary"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "textarea",
                {
                  required: true,
                  rows: 4,
                  value: form.needs,
                  onChange: (e) => update("needs", e.target.value),
                  placeholder: "Décrivez vos besoins",
                  maxLength: 1e3,
                  className: "w-full rounded-2xl border bg-cream/50 px-6 py-4 text-lg outline-none focus:border-primary resize-none"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-2", children: [
              step > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setStep(step - 1),
                  className: "h-16 px-7 rounded-[100px] border text-lg font-semibold hover:bg-cream/60 transition",
                  children: "Retour"
                }
              ),
              step < 2 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  disabled: !canNext1,
                  onClick: () => setStep(step + 1),
                  className: "flex-1 h-16 rounded-[100px] bg-primary text-primary-foreground text-lg font-semibold flex items-center justify-center gap-2 shadow-elevated hover:opacity-95 transition disabled:opacity-40 disabled:cursor-not-allowed",
                  children: [
                    "Continuer ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "size-5" })
                  ]
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "submit",
                  className: "flex-1 h-16 rounded-[100px] bg-terracotta text-terracotta-foreground text-lg font-semibold flex items-center justify-center gap-2 shadow-elevated hover:opacity-95 transition",
                  children: [
                    "Envoyer ma demande ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "size-5" })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 pt-3 border-t mt-5 text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "size-5 text-gold" }),
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg", children: "Données sécurisées · Sans spam" }),
              "            "
            ] })
          ]
        }
      )
    ] })
  ] });
}
function Input({
  value,
  onChange,
  ...rest
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "input",
    {
      ...rest,
      value,
      onChange: (e) => onChange(e.target.value),
      className: "w-full h-14 rounded-[100px] border bg-cream/50 px-6 text-lg outline-none focus:border-primary transition"
    }
  );
}
function PressBar() {
  const { inCity } = useCity();
  const brands = [
    { name: "Daikin", textClass: "font-sans font-black tracking-tight text-[#0089cd]" },
    { name: "Mitsubishi Electric", logo: mitsubishiLogo },
    { name: "Atlantic", textClass: "font-display italic font-semibold text-[#005ca9]" },
    { name: "Panasonic", logo: panasonicLogo },
    { name: "Viessmann", textClass: "font-sans font-bold uppercase tracking-tight text-[#e2001a]" },
    { name: "Bosch", logo: boschLogo },
    { name: "De Dietrich", textClass: "font-display font-semibold text-[#9d1c20]" },
    { name: "Hitachi", logo: hitachiLogo },
    { name: "Vaillant", textClass: "font-sans font-bold uppercase tracking-wider text-[#006633]" },
    { name: "Toshiba", logo: toshibaLogo },
    { name: "Saunier Duval", textClass: "font-display font-medium text-[#0066b1]" },
    { name: "Stiebel Eltron", textClass: "font-sans font-bold uppercase tracking-tight text-[#e30613]" }
  ];
  const stats = [
    { v: "312", l: "installateurs accompagnés" },
    { v: "—76%", l: "sur le CPL moyen" },
    { v: "x4", l: "ROAS minimum garanti" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-gradient-to-b from-cream via-background to-background py-7 lg:py-9 overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-full px-[0.7cm]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row md:items-center md:justify-between gap-8 md:gap-12 reveal", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 rounded-[100px] bg-gold-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-wider", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "size-5 text-gold" }),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base", children: "Réseau & marques de confiance" }),
            "            "
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-5 font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05]", children: [
            "+312 installateurs PAC ",
            inCity,
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx("em", { className: "italic text-primary", children: "déploient déjà la méthode." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-5 text-lg text-muted-foreground max-w-2xl", children: [
            "Artisans RGE QualiPAC, PME chauffagistes et agences énergies pilotent leur acquisition ",
            inCity,
            " en autonomie sur les plus grandes marques du marché PAC — CPL moyen sous les 25€."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: "#formulaire",
            className: "rounded-[100px] bg-terracotta text-terracotta-foreground px-8 h-16 inline-flex items-center gap-2 font-semibold text-lg shadow-elevated hover:-translate-y-0.5 transition shrink-0 self-start md:self-center",
            children: [
              "Demander un audit leads PAC ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "size-5" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 grid grid-cols-3 gap-4 reveal", children: stats.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-background border shadow-card p-6 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-3xl md:text-4xl font-bold text-gold", children: s.v }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-xs md:text-sm text-muted-foreground", children: s.l })
      ] }, s.l)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 lg:mt-16 relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-cream/95 to-transparent z-10" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-cream/95 to-transparent z-10" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex w-max gap-6 lg:gap-8 animate-marquee-ltr", children: [...brands, ...brands].map((b, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "shrink-0 h-20 lg:h-24 min-w-[180px] lg:min-w-[220px] px-8 rounded-2xl bg-background border shadow-card flex items-center justify-center hover:-translate-y-1 hover:shadow-elevated transition",
          children: b.logo ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: b.logo, alt: b.name, className: "max-h-10 lg:max-h-12 w-auto object-contain", loading: "lazy" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-xl lg:text-2xl whitespace-nowrap ${b.textClass}`, children: b.name })
        },
        i
      )) })
    ] })
  ] });
}
function PainSection() {
  const pains = [
    {
      t: "Le même lead vendu à 5 concurrents",
      d: "Vous appelez un prospect qui vient de raccrocher avec 4 confrères. Taux de signature divisé par 5."
    },
    {
      t: "80€ à 200€ par lead chez les agrégateurs",
      d: "Sur 100 leads achetés à 80€ = 8 000€/mois. Et vous repartirez à zéro le mois prochain."
    },
    {
      t: "Vous payez à vie, sans rien posséder",
      d: "Vous ne construisez aucun actif. Aucune base prospects, aucune data, aucun canal qui vous appartient."
    },
    {
      t: "Vos campagnes Google Ads brûlent du budget",
      d: "Sans structure SKAG ni tracking GA4, votre CPL explose et vous tirez le frein avant d'avoir compris."
    },
    {
      t: "Vous subissez les prix imposés par les apporteurs",
      d: "Le prix du lead monte chaque trimestre. Vous absorbez ou vous perdez le canal — pas le choix."
    },
    {
      t: "Aucune visibilité sur votre ROAS réel",
      d: "Vous savez que vous payez, vous ne savez pas ce que ça rapporte vraiment. Décisions à l'aveugle."
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "problemes", className: "py-7 lg:py-9 bg-background pattern-dots", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-full px-[0.7cm]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center max-w-3xl mx-auto reveal", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "eyebrow eyebrow-terracotta", children: "Le vrai problème" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-3 font-display text-3xl md:text-5xl font-bold", children: [
        "Acheter ses leads,",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("em", { className: "italic text-terracotta", children: "c'est louer son acquisition." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto", children: "Tant que vous achetez vos leads, vous serez locataire de votre carnet de commandes. Le jour où vous arrêtez de payer, le canal s'éteint. Et chaque lead coûte de plus en plus cher." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5", children: pains.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "reveal surface-card p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "icon-tile icon-tile-terracotta size-11 rounded-2xl mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-bold mb-2 leading-snug", children: p.t }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base text-muted-foreground leading-relaxed", children: p.d })
    ] }, p.t)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 text-center reveal", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "a",
      {
        href: "#offre",
        className: "inline-flex items-center gap-2 rounded-[100px] bg-primary text-primary-foreground px-8 h-14 font-semibold text-base shadow-elevated hover:-translate-y-0.5 transition",
        children: [
          "Reprendre le contrôle — 47€ ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "size-4" })
        ]
      }
    ) })
  ] }) });
}
function CostComparison() {
  const rows = [
    { l: "Coût par lead", a: "80 € – 200 €", b: "≈ 25 €", winner: "b" },
    { l: "Exclusivité du lead", a: "Vendu à 4-5 confrères", b: "100 % exclusif", winner: "b" },
    { l: "Taux de signature moyen", a: "8 – 12 %", b: "26 – 32 %", winner: "b" },
    { l: "Contrôle du canal", a: "Aucun (prix imposés)", b: "Total (vos campagnes)", winner: "b" },
    { l: "Actif construit dans le temps", a: "Aucun", b: "Compte Ads + audience + data", winner: "b" },
    { l: "Coût annuel pour 60 leads/mois", a: "≈ 57 600 €", b: "≈ 18 000 € + 47 € (guide)", winner: "b" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-7 lg:py-9 bg-cream", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-full px-[0.7cm]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center max-w-3xl mx-auto reveal", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "eyebrow eyebrow-terracotta", children: "Le vrai coût" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-3 font-display text-3xl md:text-5xl font-bold", children: [
        "Acheter ou générer :",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("em", { className: "italic text-primary", children: "39 600 € d'écart par an." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto", children: "Sur 60 leads PAC par mois (volume réaliste pour un installateur RGE actif), voilà ce que vous payez selon le canal — et ce que vous construisez (ou pas) en parallèle." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 reveal rounded-3xl bg-background border shadow-elevated overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[1.3fr_1fr_1fr] text-sm min-w-[640px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 lg:p-6 border-b bg-cream/50 font-semibold text-foreground/70 uppercase tracking-wider text-[11px]", children: "Comparatif" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 lg:p-6 border-b border-l bg-terracotta-soft/50 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-terracotta font-bold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-3.5" }),
          " Agrégateurs"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-sm md:text-base font-semibold", children: "Acheter ses leads" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 lg:p-6 border-b border-l bg-primary/10 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-primary font-bold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "size-3.5" }),
          " Méthode du guide"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-sm md:text-base font-semibold", children: "Générer ses leads" })
      ] }),
      rows.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "contents", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `p-4 lg:p-6 ${i < rows.length - 1 ? "border-b" : ""} font-medium text-foreground/85 text-xs md:text-sm`,
            children: r.l
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `p-4 lg:p-6 border-l ${i < rows.length - 1 ? "border-b" : ""} text-center text-terracotta text-xs md:text-sm`,
            children: r.a
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `p-4 lg:p-6 border-l ${i < rows.length - 1 ? "border-b" : ""} text-center font-semibold text-primary text-xs md:text-sm`,
            children: r.b
          }
        )
      ] }, r.l))
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 grid md:grid-cols-3 gap-4 reveal", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-background border p-5 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: "Vous payez" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 font-display text-3xl font-bold text-terracotta", children: "57 600 €/an" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-1", children: "Aux agrégateurs · 60 leads/mois × 80€" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-background border p-5 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: "Vous payez" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 font-display text-3xl font-bold text-primary", children: "18 000 €/an" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-1", children: "À Google Ads · 60 leads/mois × 25€" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-gold-soft border-2 border-gold p-5 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-wider text-foreground/70 font-semibold", children: "Vous économisez" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 font-display text-3xl font-bold text-foreground", children: "39 600 €/an" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-foreground/70 mt-1", children: "+ vous gardez le contrôle de votre acquisition" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 text-center reveal", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "a",
        {
          href: "#offre",
          className: "inline-flex items-center gap-2 rounded-[100px] bg-terracotta text-terracotta-foreground px-8 h-14 font-semibold text-base shadow-elevated hover:-translate-y-0.5 transition",
          children: [
            "Récupérer 39 600 €/an — Accéder au guide à 47€ ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "size-4" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-xs text-muted-foreground", children: "Garantie 30 jours · Accès à vie · Paiement sécurisé" })
    ] })
  ] }) });
}
function SolutionSection() {
  const steps = [
    {
      i: Search,
      t: "Capter les requêtes air/eau à panier élevé",
      d: "Cartographie des 200+ keywords les plus rentables — focus PAC air/eau (panier 12-18 k€), RGE QualiPAC, MaPrimeRénov' rénovation globale. Vous tapez là où l'intent achat est le plus fort."
    },
    {
      i: Target,
      t: "Structure SKAG → Quality Score 9-10/10",
      d: "Single Keyword Ad Group : 1 keyword = 1 groupe = 1 annonce ultra-pertinente. Google récompense par un CPC divisé par 2 et plus d'impressions sur les mêmes budgets."
    },
    {
      i: MousePointer,
      t: "Landing page qui convertit 1 visiteur sur 5",
      d: "Templates clé-en-main : formulaire 4 champs, social proof RGE, simulateur d'aides MaPrimeRénov'. Taux de conversion moyen 18% — vs 3-5% pour une page générique."
    },
    {
      i: ChartColumn,
      t: "Tracking GA4 : votre vrai CPL au centime",
      d: "Setup complet GA4 + conversions Google Ads + appels téléphoniques. Vous voyez quel keyword génère un client, lequel brûle votre budget — et vous pilotez à la donnée, pas à l'intuition."
    },
    {
      i: FileText,
      t: "Scripts qui économisent 8h/semaine",
      d: "Pause auto des keywords non rentables, alerte budget, exclusion des recherches polluées, ajustement d'enchères horaire. Votre compte tourne en background pendant que vous posez vos PAC."
    },
    {
      i: TrendingUp,
      t: "Scale de 10 à 80 leads/mois en 90 jours",
      d: "Méthodologie pour passer de la première campagne validée au volume sérieux, sans exploser le CPL. Quand acheter du Performance Max, quand ouvrir une nouvelle zone géographique."
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "solution", className: "py-7 lg:py-9 bg-cream", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-full px-[0.7cm]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-14 items-center reveal", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "eyebrow", children: "La solution" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-3 font-display text-3xl md:text-5xl font-bold leading-[1.1]", children: [
          "6 piliers pour devenir",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("em", { className: "italic text-primary", children: "propriétaire de votre acquisition." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-base text-muted-foreground leading-relaxed max-w-xl", children: "Système reproductible, testé sur 47 installateurs PAC. Aucune compétence Google Ads requise au départ — templates, scripts et campagnes prêts à importer." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -inset-4 bg-gradient-to-br from-gold-soft via-transparent to-sky-soft blur-3xl -z-10" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-2xl overflow-hidden border shadow-elevated bg-background", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: dashboardImg,
              alt: "Dashboard analytics — pilotage CPL/ROAS Google Ads",
              loading: "lazy",
              className: "w-full h-auto object-cover"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-background/90 backdrop-blur-sm px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider shadow-card", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-1.5 rounded-full bg-emerald-500 animate-pulse" }),
            " Cockpit Google Ads"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground italic", children: "Votre tracking GA4 + Google Ads après setup — vous pilotez à la donnée, pas à l'intuition." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6", children: steps.map(({ i: Icon2, t, d }, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "reveal surface-card p-7 relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-5 right-5 font-display text-3xl font-bold text-gold/25 leading-none", children: String(idx + 1).padStart(2, "0") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "icon-tile mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon2, { className: "size-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-bold leading-snug", children: t }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-base text-muted-foreground leading-relaxed", children: d })
    ] }, t)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 text-center reveal", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "a",
        {
          href: "#offre",
          className: "inline-flex items-center gap-2 rounded-[100px] bg-primary text-primary-foreground px-8 h-14 font-semibold text-base shadow-elevated hover:-translate-y-0.5 transition",
          children: [
            "Démarrer la méthode — 47€ ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "size-4" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-xs text-muted-foreground", children: "Garantie 30 jours · Accès à vie · Mises à jour incluses" })
    ] })
  ] }) });
}
function BenefitsSection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-7 lg:py-9 bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-full px-[0.7cm]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center max-w-3xl mx-auto reveal", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "eyebrow", children: "Résultats" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-3 font-display text-3xl md:text-5xl font-bold", children: [
        "Ce que vous obtenez",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("em", { className: "italic text-primary", children: "en moins de 30 jours." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-6", children: [
      {
        v: 25,
        suf: "€",
        l: "CPL moyen",
        d: "Par lead PAC 100% exclusif — vs 80-200€ chez les agrégateurs où le lead est revendu 5×."
      },
      {
        v: 26,
        suf: "%",
        l: "Taux de RDV",
        d: "Sur 100 leads exclusifs, ~26 décrochent un RDV qualifié (vs 8-12% sur leads partagés)."
      },
      {
        v: 80,
        suf: "/mois",
        l: "Leads qualifiés",
        d: "Volume atteignable avec ~3 000€/mois de budget Ads, focus PAC air/eau et MaPrimeRénov'."
      },
      {
        v: 4,
        suf: "x",
        l: "ROAS minimum",
        d: "Retour sur investissement publicitaire constaté en 90 jours sur 47 installateurs."
      }
    ].map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "reveal surface-card p-7 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-5xl lg:text-6xl font-bold bg-gradient-to-br from-gold to-terracotta bg-clip-text text-transparent leading-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Counter, { to: b.v, suffix: b.suf }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 font-semibold text-base", children: b.l }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-base text-muted-foreground leading-relaxed", children: b.d })
    ] }, b.l)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 text-center reveal", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "a",
      {
        href: "#offre",
        className: "inline-flex items-center gap-2 rounded-[100px] bg-terracotta text-terracotta-foreground px-8 h-14 font-semibold text-base shadow-elevated hover:-translate-y-0.5 transition",
        children: [
          "Activer ma machine à leads — 47€ ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "size-4" })
        ]
      }
    ) })
  ] }) });
}
function Counter({ to, suffix = "" }) {
  const [n, setN] = reactExports.useState(0);
  reactExports.useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (t) => {
      const p = Math.min((t - start) / 1400, 1);
      setN(Math.floor(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    n.toLocaleString("fr-FR"),
    suffix
  ] });
}
function ContentsSection() {
  const chapters = [
    "Identifier les 3 requêtes PAC qui génèrent 80% des leads en France",
    "Cartographier les 47 micro-moments d'achat d'un prospect PAC",
    "Bâtir une structure SKAG qui fait passer le Quality Score à 9-10/10",
    "200+ intent keywords clé-en-main : air/eau, air/air, RGE, MaPrimeRénov'",
    "Rédiger des annonces qui doublent votre CTR (+150% en moyenne)",
    "Concevoir une landing page qui convertit 1 visiteur sur 5 en lead qualifié",
    "Setup tracking complet pour connaître votre vrai CPL au centime près",
    "Smart Bidding ou enchères manuelles : quand utiliser chaque levier",
    "Économiser 8h/semaine grâce aux audits et scripts d'automatisation",
    "Scaling : passer de 10 à 80 leads/mois en 90 jours sans exploser le CPL"
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "contenu", className: "py-7 lg:py-9 bg-cream", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-full px-[0.7cm]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center reveal", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "eyebrow", children: "Sommaire" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-3 font-display text-3xl md:text-5xl font-bold", children: [
        "10 chapitres,",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("em", { className: "italic text-primary", children: "200 pages actionnables." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 grid md:grid-cols-2 gap-x-8", children: chapters.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "reveal flex items-start gap-4 py-5 border-b", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-2xl text-gold w-10 shrink-0", children: String(i + 1).padStart(2, "0") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base pt-1", children: c })
    ] }, c)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 reveal rounded-3xl bg-background border shadow-card p-8 lg:p-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 rounded-[100px] bg-gold-soft px-4 py-1.5 text-xs font-medium", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "size-3.5 text-gold" }),
          " Bonus inclus"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Valeur estimée 290€ — offerts" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-4 font-display text-2xl md:text-3xl font-bold", children: "+ 5 ressources offertes" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-6 grid md:grid-cols-2 gap-x-8 gap-y-3 text-base", children: [
        "Template Google Sheets de pilotage CPL/ROAS",
        "Pack de 12 visuels d'annonces PAC (Canva)",
        "Script d'appel commercial pour qualifier un lead",
        "Checklist d'audit Google Ads en 47 points",
        "Accès au groupe privé d'installateurs (350+ membres)"
      ].map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "size-4 text-primary mt-0.5 shrink-0" }),
        b
      ] }, b)) })
    ] })
  ] }) });
}
function ForWhomSection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-7 lg:py-9 bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-full px-[0.7cm]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-[auto_1fr] gap-8 lg:gap-12 items-center reveal", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative shrink-0 mx-auto lg:mx-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -inset-3 bg-gradient-to-br from-gold-soft via-transparent to-sky-soft blur-2xl -z-10" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: pacUnitImg,
            alt: "Pompe à chaleur air/eau installée chez un client",
            loading: "lazy",
            className: "w-56 h-56 lg:w-64 lg:h-64 rounded-3xl object-cover shadow-elevated border-4 border-background"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "absolute -bottom-3 -right-3 inline-flex items-center gap-1.5 rounded-full bg-primary text-primary-foreground px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider shadow-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "size-3 text-gold" }),
          " Air/eau · RGE"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center lg:text-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "eyebrow", children: "Pour qui ?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-3 font-display text-3xl md:text-5xl font-bold leading-[1.1]", children: [
          "Ce guide vous correspond",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("em", { className: "italic text-primary", children: "si vous êtes…" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-base text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0", children: "Pensé pour les artisans et PME qui posent des PAC chaque semaine et veulent arrêter de subir le prix imposé par les agrégateurs." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 grid md:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "reveal relative rounded-3xl bg-background border-2 border-primary/15 p-8 lg:p-10 shadow-card hover:shadow-elevated transition", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute -top-3 left-8 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider shadow-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "size-3.5" }),
          " Pour vous"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-2 font-display text-2xl lg:text-3xl font-bold", children: "C'est pour vous si…" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-6 space-y-3.5 text-base", children: [
          "Installateur PAC (artisan, PME, RGE QualiPAC)",
          "Agence marketing spécialisée énergies renouvelables",
          "Commercial qui veut maîtriser son acquisition",
          "Entrepreneur du secteur énergie / rénovation"
        ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3 items-start", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-0.5 size-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "size-3 text-primary", strokeWidth: 3 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "leading-relaxed", children: s })
        ] }, s)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "reveal relative rounded-3xl bg-background border-2 border-terracotta/15 p-8 lg:p-10 shadow-card hover:shadow-elevated transition", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute -top-3 left-8 inline-flex items-center gap-2 rounded-full bg-terracotta text-terracotta-foreground px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider shadow-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-3.5" }),
          " Pas pour vous"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-2 font-display text-2xl lg:text-3xl font-bold", children: "Passez votre chemin si…" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-6 space-y-3.5 text-base", children: [
          'Vous cherchez une solution "magique" sans effort',
          "Vous refusez d'investir 1 500€/mois minimum en Ads",
          "Vous ne traitez pas vos leads en moins de 24h",
          "Vous n'avez aucune intention de tester Google Ads"
        ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3 items-start", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-0.5 size-5 rounded-full bg-terracotta/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-3 text-terracotta", strokeWidth: 3 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "leading-relaxed", children: s })
        ] }, s)) })
      ] })
    ] })
  ] }) });
}
function TestimonialsSection() {
  const items = [
    {
      name: "Antoine Caron",
      role: "Gérant · RGE QualiPAC",
      company: "ThermiBat Atlantique",
      city: "Nantes (44)",
      avatar: avatar2,
      duration: "Après 4 mois",
      quote: "Avant le guide, je payais 145€ par lead chez les agrégateurs et la moitié finissait dans le mur — déjà revendu à 4 confrères. En 4 mois sur Google Ads, j'ai généré 820 leads exclusifs et signé 119 installations PAC. Mon CA installation a doublé sans embaucher de commercial. La structure SKAG m'a fait passer le Quality Score de 4/10 à 9/10 en 6 semaines.",
      stats: [
        { v: "22€", l: "CPL moyen" },
        { v: "820", l: "leads en 4 mois" },
        { v: "119", l: "installations" }
      ]
    },
    {
      name: "Émilie Garnier",
      role: "Directrice acquisition",
      company: "Habitat & Énergie Studio",
      city: "Toulouse (31)",
      avatar: avatar3,
      duration: "Après 6 mois",
      quote: "On gère 8 comptes installateurs PAC pour des artisans RGE. Avant la méthode, on bricolait — chaque compte avait sa logique, impossible à industrialiser. Avec les templates et les scripts du guide, on a divisé le temps de gestion par 3 et tous nos clients sont passés au-dessus d'un ROAS de 4. Un client est même à 6,8.",
      stats: [
        { v: "19€", l: "CPL moyen" },
        { v: "x4,8", l: "ROAS moyen" },
        { v: "8", l: "installateurs gérés" }
      ]
    },
    {
      name: "Bruno Vasseur",
      role: "Dirigeant · PME chauffagiste",
      company: "ChaufThermic Est",
      city: "Strasbourg (67)",
      avatar: avatar4,
      duration: "Après 90 jours",
      quote: "J'avais arrêté Google Ads après avoir cramé 4 000€ sans signer un seul chantier. Le guide m'a fait comprendre que je tournais sur des keywords trop larges sans tracking conversion. En appliquant le setup GA4 + le SKAG sur 12 keywords ciblés air/eau, je génère 30 leads PAC qualifiés/mois et j'ai signé 41 PAC sur le trimestre.",
      stats: [
        { v: "27€", l: "CPL moyen" },
        { v: "30", l: "leads/mois" },
        { v: "41", l: "PAC posées (T1)" }
      ]
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "avis", className: "py-7 lg:py-9 bg-cream", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-full px-[0.7cm]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center reveal", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "eyebrow", children: "Témoignages vérifiés" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-3 font-display text-3xl md:text-5xl font-bold", children: [
        "Ils génèrent leurs leads PAC",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("em", { className: "italic text-primary", children: "en autonomie." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 reveal rounded-3xl bg-background border shadow-elevated overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-[1fr_1.4fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary text-primary-foreground p-8 lg:p-10 relative overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-20 -right-20 size-60 rounded-full bg-gold/20 blur-3xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative inline-flex items-center gap-2 rounded-[100px] bg-gold text-foreground px-3 py-1 text-[10px] font-bold uppercase tracking-wider", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "size-3" }),
          " Cas client détaillé"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "relative mt-5 font-display text-2xl lg:text-3xl font-bold leading-tight", children: "Énergie Confort Sud" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "relative mt-1 text-sm text-primary-foreground/80", children: "Marseille (13) · 5 artisans · RGE QualiPAC" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-8 space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] uppercase tracking-wider text-primary-foreground/60 font-semibold", children: "Avant" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-base leading-relaxed text-primary-foreground/90", children: "145 €/lead chez agrégateurs · 8% de signature · 6 100 €/mois en achat de leads · CA installation en stagnation depuis 18 mois." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px bg-primary-foreground/20" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] uppercase tracking-wider text-gold font-bold", children: "Après — 4 mois" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-base leading-relaxed", children: "22 €/lead Google Ads · 27% de signature · 820 leads exclusifs · 119 PAC posées · CA installation × 2,1." })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 lg:p-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-cream p-4 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-wider text-muted-foreground font-semibold", children: "CPL" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 font-display text-2xl font-bold text-terracotta line-through", children: "145€" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-3xl font-bold text-gold", children: "22€" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-cream p-4 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-wider text-muted-foreground font-semibold", children: "Leads/mois" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 font-display text-2xl font-bold text-terracotta line-through", children: "42" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-3xl font-bold text-gold", children: "205" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-cream p-4 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-wider text-muted-foreground font-semibold", children: "Signature" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 font-display text-2xl font-bold text-terracotta line-through", children: "8%" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-3xl font-bold text-gold", children: "27%" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-6 text-base leading-relaxed", children: [
          "« J'avais arrêté de croire au Google Ads après deux tentatives ratées. Le guide m'a fait réaliser que je tournais sans tracking GA4 et sans structure SKAG. En 6 semaines, on est passé de 4/10 à 9/10 de Quality Score. ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Aujourd'hui, je signe 30 PAC/mois en moyenne et le canal m'appartient." }),
          " »"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 pt-5 border-t flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: avatar1,
              alt: "",
              className: "size-12 rounded-full object-cover ring-2 ring-background shadow-card"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold", children: "Julien Marchand" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Gérant · Énergie Confort Sud · Marseille · RGE QualiPAC" })
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 text-center text-base text-muted-foreground reveal", children: "Et 311 autres installateurs PAC obtiennent des résultats du même ordre. Voici 3 d'entre eux :" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 grid md:grid-cols-3 gap-6", children: items.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "reveal rounded-3xl bg-background p-7 shadow-card hover:shadow-elevated transition flex flex-col",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex", children: [1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "size-4 text-gold fill-current" }, i)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: t.duration })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-5 text-base leading-relaxed text-foreground/90", children: [
            "« ",
            t.quote,
            " »"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 grid grid-cols-3 gap-2", children: t.stats.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-cream p-3 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-lg font-bold text-gold", children: s.v }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground leading-tight mt-0.5", children: s.l })
          ] }, s.l)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 pt-5 border-t flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: t.avatar,
                alt: "",
                className: "size-12 rounded-full object-cover ring-2 ring-background shadow-card shrink-0"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-sm truncate", children: t.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground truncate", children: t.role }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-primary font-medium truncate", children: [
                t.company,
                " · ",
                t.city
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded-full bg-sky-soft text-sky px-2 py-1 text-[10px] font-medium shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "size-3" }),
              " Vérifié"
            ] })
          ] })
        ]
      },
      t.name
    )) })
  ] }) });
}
function OfferSection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "offre", className: "py-7 lg:py-9 bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-full px-[0.7cm]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "reveal rounded-[32px] bg-primary text-primary-foreground p-10 lg:p-14 text-center relative overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/90" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-20 -right-20 size-80 rounded-full bg-gold/20 blur-3xl" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 rounded-[100px] bg-gold text-foreground px-4 py-1.5 text-xs font-bold uppercase tracking-wide", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "size-3.5" }),
        " Offre de lancement —76% · Durée limitée"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-6 font-display text-3xl md:text-5xl font-bold", children: [
        "Le Guide Ultime PAC",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("em", { className: "italic text-gold", children: "+ 5 bonus inclus." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex items-center justify-center gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl text-primary-foreground/50 line-through", children: "197€" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-7xl md:text-8xl font-bold text-gold", children: "47€" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-primary-foreground/80", children: "Paiement unique · Accès à vie · TVA incluse" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-5 inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/15 text-primary-foreground px-4 py-1.5 text-sm font-semibold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "size-4 text-gold" }),
        "Offre en quantité limitée — réservée aux installateurs PAC"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "a",
        {
          href: "#formulaire",
          className: "mt-8 inline-flex items-center gap-2 rounded-[100px] bg-terracotta text-terracotta-foreground px-9 h-16 font-semibold text-lg shadow-elevated hover:-translate-y-0.5 transition",
          children: [
            "Accéder au guide — Premiers leads en 14 jours ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "size-5" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-xs text-primary-foreground/70", children: "🔒 Paiement sécurisé · ⏱ Accès immédiat · 🛡 Garantie 30 jours satisfait ou remboursé" })
    ] })
  ] }) }) });
}
function GuaranteesSection() {
  const items = [
    {
      i: HandCoins,
      t: "Garantie 30 jours",
      d: "Pas convaincu ? Remboursement intégral sans justification dans les 30 jours."
    },
    {
      i: ShieldCheck,
      t: "Méthode éprouvée",
      d: "Testée sur 47 installateurs PAC. ROAS x4 minimum constaté en 90 jours."
    },
    {
      i: HeartHandshake,
      t: "Accès à vie & MAJ",
      d: "Toutes les mises à jour 2026, 2027 et au-delà incluses dans votre achat."
    },
    { i: Award, t: "Support prioritaire", d: "Accès au groupe privé + réponse à vos questions techniques sous 48h." }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-7 lg:py-9 bg-cream", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-full px-[0.7cm]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center reveal", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "eyebrow", children: "Notre engagement" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-3 font-display text-3xl md:text-5xl font-bold", children: [
        "Investissement",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("em", { className: "italic text-primary", children: "sans aucun risque." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-5", children: items.map(({ i: Icon2, t, d }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "reveal surface-card p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "icon-tile icon-tile-terracotta mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon2, { className: "size-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-bold leading-snug", children: t }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-base text-muted-foreground leading-relaxed", children: d })
    ] }, t)) })
  ] }) });
}
function FaqSection() {
  const items = [
    {
      q: "Combien de temps pour générer mes premiers leads ?",
      a: "Les premiers leads PAC qualifiés arrivent dès la 2ème semaine de campagne, le temps que Google Ads collecte les premières conversions et apprenne à optimiser. Comptez 4 à 6 semaines pour atteindre votre rythme de croisière (30-50 leads/mois selon zone et budget). Le ROAS x4 est généralement consolidé entre 60 et 90 jours, après l'optimisation du Quality Score, l'exclusion des mauvaises requêtes et le réglage des enchères. Mathieu (Lyon) a généré ses 50 premiers leads dès le 1er mois ; Karim (Lille) a mis 11 semaines car son secteur est plus concurrentiel."
    },
    {
      q: "Quel budget Google Ads minimum dois-je prévoir ?",
      a: "Comptez 1 500€/mois minimum pour valider sérieusement la méthode (ce qui correspond à environ 60 leads/mois à 25€). Pour atteindre 80 leads/mois, prévoyez 2 500-3 000€/mois. Le guide contient un calculateur de budget qui ajuste ces chiffres selon : votre zone géographique (Île-de-France 30% plus cher que la province), votre saisonnalité (sept-mars = pic de demande), et votre offre (PAC air/eau plus chère que air/air). Sous 1 000€/mois, le volume est trop faible pour que Smart Bidding apprenne correctement."
    },
    {
      q: "Est-ce adapté si je n'y connais rien en Google Ads ?",
      a: "Oui — le guide est conçu pour des installateurs PAC qui n'ont jamais créé de compte Google Ads. Le chapitre 3 démarre étape par étape : création du compte, configuration MCC si vous gérez plusieurs campagnes, paramètres essentiels (UA-bidding, géolocalisation, langues, exclusions IP). Vous recevez aussi 6 templates de campagnes importables directement dans Google Ads Editor en 1 clic — pas besoin de tout coder vous-même. Comptez 4 à 6h pour configurer votre 1ère campagne en suivant le guide. Aucune compétence technique préalable requise."
    },
    {
      q: "Et si la méthode ne fonctionne pas pour moi ?",
      a: "Vous bénéficiez d'une garantie satisfait ou remboursé de 30 jours sans justification. Envoyez simplement un email à support@guidepac.fr avec votre numéro de commande — remboursement sous 5 jours ouvrés sur le moyen de paiement utilisé. C'est cette garantie qui rassure 92% de nos acheteurs : si la méthode ne colle pas à votre situation, vous ne perdez rien. Note : sur 312 acheteurs, moins de 4% ont demandé un remboursement à ce jour."
    },
    {
      q: "Le guide est-il à jour avec les dernières évolutions Google Ads ?",
      a: "Oui — édition mise à jour en novembre 2026, intégrant : Performance Max et ses nouveaux signaux d'audience, le Smart Bidding cible CPA et tROAS, les nouvelles policies Google sur les annonces énergétiques (RGE, MaPrimeRénov'), la fin progressive des cookies tiers et le tracking GA4 enhanced conversions. Vous bénéficiez de toutes les futures mises à jour gratuitement (édition 2027 incluse). Les changements majeurs sont notifiés par email aux acheteurs."
    },
    {
      q: "Y a-t-il un accompagnement inclus ?",
      a: "Oui, à plusieurs niveaux : (1) accès au groupe privé Slack de 350+ installateurs RGE qui partagent leurs setups, retours d'optimisation et campagnes en cours ; (2) support email prioritaire avec réponse sous 48h pour vos questions techniques ; (3) 2 sessions Q&A live par mois avec l'équipe (replay disponible). Un accompagnement individuel 1:1 (audit de compte + 4 sessions de coaching) est proposé en option à 890€ pour ceux qui veulent aller plus vite."
    },
    {
      q: "La méthode fonctionne-t-elle dans toutes les zones géographiques ?",
      a: "Oui, dans toute la France métropolitaine, Belgique, Suisse, Luxembourg. Le CPL varie selon la concurrence locale : ~22€ en zones rurales (Bretagne, Occitanie, Nouvelle-Aquitaine), ~30€ en zones urbaines tendues (Île-de-France, PACA). Le guide contient une cartographie des 13 régions françaises avec CPL moyen, taux de conversion observés et stratégies d'enchères recommandées par zone. Les DROM-COM nécessitent quelques ajustements (couverts dans un addendum)."
    },
    {
      q: "Quels secteurs sont couverts ?",
      a: "Tout l'écosystème rénovation énergétique : PAC air/eau, PAC air/air, ballon thermodynamique, climatisation réversible, chaudière biomasse, photovoltaïque résidentiel, isolation thermique, MaPrimeRénov' rénovation globale, borne de recharge VE. La méthode SKAG s'adapte à n'importe quel secteur où l'intent client passe par Google. Si votre activité n'est pas listée, contactez-nous : on indique avant achat si la méthode est applicable à votre cas."
    },
    {
      q: "Combien de campagnes prêtes à l'emploi sont incluses ?",
      a: "Le pack contient 6 templates importables directement dans Google Ads Editor (.csv) : campagne PAC air/eau MaPrimeRénov', campagne PAC air/air installation, campagne RGE QualiPAC chaudière, campagne ballon thermodynamique, campagne climatisation réversible, campagne reciblage Performance Max. Chaque template inclut : structure SKAG complète, 200+ keywords recommandés, 8 variations d'annonces RSA, extensions et audiences pré-configurées. Comptez 30 minutes par campagne pour personnaliser et lancer."
    }
  ];
  const [open, setOpen] = reactExports.useState(0);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "faq", className: "py-7 lg:py-9 bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-full px-[0.7cm]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center reveal", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "eyebrow", children: "Questions fréquentes" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-3 font-display text-3xl md:text-5xl font-bold", children: [
        "Tout ce que vous",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("em", { className: "italic text-primary", children: "souhaitez savoir." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 space-y-3", children: items.map((it, i) => {
      const isOpen = open === i;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `reveal rounded-2xl bg-background border overflow-hidden transition-all ${isOpen ? "shadow-elevated border-gold/30" : "shadow-card hover:border-foreground/15"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: () => setOpen(isOpen ? -1 : i),
                "aria-expanded": isOpen,
                className: "w-full flex items-center justify-between gap-4 p-6 text-left",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-base md:text-lg leading-snug", children: it.q }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `size-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${isOpen ? "bg-primary text-primary-foreground rotate-45 shadow-card" : "bg-cream border border-border"}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "size-4" })
                    }
                  )
                ]
              }
            ),
            isOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 pb-6 text-base text-muted-foreground leading-relaxed border-t pt-5 mt-1", children: it.a })
          ]
        },
        it.q
      );
    }) })
  ] }) });
}
function FinalCta() {
  const { city, inCity } = useCity();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-7 lg:py-9 bg-cream", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-full px-[0.7cm] text-center reveal", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "eyebrow", children: "Prêt à passer à l'action ?" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-4 font-display text-3xl md:text-5xl font-bold", children: [
      "Arrêtez de louer",
      /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("em", { className: "italic text-terracotta", children: "votre carnet de commandes." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-5 text-base text-muted-foreground leading-relaxed max-w-xl mx-auto", children: [
      "47€ aujourd'hui pour économiser ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "39 600 €/an" }),
      " et reprendre le contrôle de votre acquisition ",
      inCity,
      ". Premiers leads exclusifs sous 14 jours."
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "a",
      {
        href: "#offre",
        className: "mt-10 inline-flex items-center gap-2 rounded-[100px] bg-terracotta text-terracotta-foreground px-9 h-16 font-semibold text-lg shadow-elevated hover:-translate-y-0.5 transition",
        children: [
          city ? `Générer mes leads à ${city}` : "Générer mes leads exclusifs",
          " — 47€",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "size-5" })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-6 text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "size-3.5 text-sky" }),
        " Paiement sécurisé"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "size-3.5 text-sky" }),
        " Accès immédiat"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "size-3.5 text-sky" }),
        " Garantie 30 jours"
      ] })
    ] })
  ] }) });
}
function MobileStickyCta() {
  const [show, setShow] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "aria-hidden": !show,
      className: `md:hidden fixed inset-x-0 bottom-0 z-[55] transition-transform duration-400 ${show ? "translate-y-0" : "translate-y-full"}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-3 mb-3 rounded-[100px] bg-background/95 backdrop-blur-xl border shadow-elevated p-1.5 flex gap-2 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: "tel:+33123456789",
            "aria-label": "Appeler",
            className: "size-12 rounded-full bg-cream flex items-center justify-center shrink-0",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "size-4 text-sky" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: "#offre",
            className: "flex-1 h-12 rounded-[100px] bg-terracotta text-terracotta-foreground font-semibold text-sm flex items-center justify-center gap-2",
            children: [
              "Obtenir le guide — 47€ ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "size-4" })
            ]
          }
        )
      ] })
    }
  );
}
const MentionsLegalesRoute = Route$4.update({
  id: "/mentions-legales",
  path: "/mentions-legales",
  getParentRoute: () => Route$5
});
const ConfidentialiteRoute = Route$3.update({
  id: "/confidentialite",
  path: "/confidentialite",
  getParentRoute: () => Route$5
});
const CgvRoute = Route$2.update({
  id: "/cgv",
  path: "/cgv",
  getParentRoute: () => Route$5
});
const CityRoute = Route$1.update({
  id: "/$city",
  path: "/$city",
  getParentRoute: () => Route$5
});
const IndexRoute = Route2.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$5
});
const rootRouteChildren = {
  IndexRoute,
  CityRoute,
  CgvRoute,
  ConfidentialiteRoute,
  MentionsLegalesRoute
};
const routeTree = Route$5._addFileChildren(rootRouteChildren)._addFileTypes();
function DefaultErrorComponent({ error, reset }) {
  const router2 = useRouter();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        className: "h-8 w-8 text-destructive",
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
          }
        )
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold tracking-tight text-foreground", children: "Something went wrong" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "An unexpected error occurred. Please try again." }),
    false,
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex items-center justify-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const getRouter = () => {
  const router2 = createRouter({
    routeTree,
    context: {},
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    defaultErrorComponent: DefaultErrorComponent
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  ArrowRight as A,
  Link as L,
  Mail as M,
  SiteHeader as S,
  SiteFooter as a,
  ShieldCheck as b,
  createLucideIcon as c,
  Landing as d,
  router as r
};
