/* Pure Vanilla JS Application for «Тёплое с мягким» (Vanilka)
 * Zero dependencies — full offline PWA, GitHub Pages multi-app isolation,
 * accidental reload guard, Web Audio tactile feedback, and all 5 game screens.
 */
(function () {
  "use strict";

  var DATA = window.TSM_DATA;
  if (!DATA) {
    console.error("TSM_DATA is missing. Ensure data.js is loaded before app.js.");
    return;
  }

  // Strictly isolated storage keys so other apps on username.github.io/* are never affected
  var STORAGE_KEY = "tsm_vanilka_teploe_state_v1";
  var PAGE_STORAGE_KEY = "tsm_vanilka_teploe_page_v1";
  var PREV_PAGE_STORAGE_KEY = "tsm_vanilka_teploe_prev_page_v1";
  var LAST_PLAY_PAGE_STORAGE_KEY = "tsm_vanilka_teploe_last_play_page_v1";

  var VALID_PAGES = ["setup", "task", "board", "scoring", "rules"];
  var NON_RULES_PAGES = ["setup", "task", "board", "scoring"];
  var PLAY_PAGES = ["task", "board", "scoring"];

  var SPLIT_OPTIONS = [6, 5, 4, 3, 2, 1, 0];
  var PLAYER_DELTA_BUTTONS = [-1, 1, 2, 3];
  var COOP_TALK_DELTA_BUTTONS = [-1, 1, 2, 4, 6];
  var COOP_MIND_DELTA_BUTTONS = [-1, 1, 2, 3, 5];
  var MODE_ORDER = ["competitive", "coop_talk", "coop_mind"];

  // Inline crisp SVG icons (zero external icon libraries)
  var ICONS = {
    book: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>',
    volOn: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>',
    volOff: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>',
    plus: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
    trash: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>',
    play: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 4 20 12 6 20 6 4"/></svg>',
    reset: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>',
    undo: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11"/></svg>',
    alert: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
    repeat: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>',
    shuffle: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/></svg>',
    dice: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.2" fill="currentColor"/><circle cx="15.5" cy="8.5" r="1.2" fill="currentColor"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/><circle cx="8.5" cy="15.5" r="1.2" fill="currentColor"/><circle cx="15.5" cy="15.5" r="1.2" fill="currentColor"/></svg>',
    eye: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
    eyeOff: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>',
    arrowRight: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>',
    arrowLeft: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>',
    arrowDown: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>',
    check: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
    lock: '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
    download: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
    logout: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>',
    close: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
    trophy: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>',
    chevronDown: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>',
    chevronUp: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>'
  };

  // ---------- Safe HTML Escaping ----------
  function escapeHtml(str) {
    if (str === null || str === undefined) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  // ---------- Web Audio Tactile Sound Engine ----------
  var audioCtx = null;

  function getAudioContext() {
    if (!audioCtx && typeof window !== "undefined") {
      var Ctx = window.AudioContext || window.webkitAudioContext;
      if (Ctx) {
        try {
          audioCtx = new Ctx();
        } catch (e) {
          audioCtx = null;
        }
      }
    }
    if (audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume().catch(function () {});
    }
    return audioCtx;
  }

  function triggerVibrate(pattern) {
    try {
      if (typeof navigator !== "undefined" && typeof navigator.vibrate === "function") {
        navigator.vibrate(pattern);
      }
    } catch (e) {}
  }

  function vibrateTap(ms) {
    triggerVibrate(typeof ms === "number" ? ms : 12);
  }

  function vibrateLock() {
    triggerVibrate([16, 26, 20]);
  }

  function playDiscClick(enabled) {
    triggerVibrate(12);
    if (!enabled) return;
    var ctx = getAudioContext();
    if (!ctx) return;
    try {
      var osc = ctx.createOscillator();
      var gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(520, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(190, ctx.currentTime + 0.045);
      gain.gain.setValueAtTime(0.11, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.055);
    } catch (e) {}
  }

  function playCardFlip(enabled) {
    triggerVibrate([14, 22, 14]);
    if (!enabled) return;
    var ctx = getAudioContext();
    if (!ctx) return;
    try {
      var osc = ctx.createOscillator();
      var gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(280, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(420, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.07, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.095);
    } catch (e) {}
  }

  function playScoreChime(enabled, positive) {
    triggerVibrate(positive ? [28, 40, 28, 40, 65] : [35, 35]);
    if (!enabled) return;
    var ctx = getAudioContext();
    if (!ctx) return;
    try {
      var now = ctx.currentTime;
      var notes = positive ? [523.25, 659.25, 783.99] : [330, 261.63];
      for (var i = 0; i < notes.length; i++) {
        var osc = ctx.createOscillator();
        var gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(notes[i], now + i * 0.07);
        gain.gain.setValueAtTime(0.08, now + i * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.07 + 0.18);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.07);
        osc.stop(now + i * 0.07 + 0.2);
      }
    } catch (e) {}
  }

  // ---------- Deck & State Helpers ----------
  function shuffleArray(items) {
    var arr = items.slice();
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = arr[i];
      arr[i] = arr[j];
      arr[j] = tmp;
    }
    return arr;
  }

  function createDefaultPlayers() {
    var names = ["Аня", "Вова", "Маша", "Олег"];
    return names.map(function (name, idx) {
      return {
        id: "player-" + (idx + 1),
        name: name,
        color: DATA.PLAYER_COLORS[idx % DATA.PLAYER_COLORS.length].hex,
        score: 0
      };
    });
  }

  function drawFromIds(queue, count, allIds, excludeIds) {
    var excluded = excludeIds || [];
    var pool = queue.slice();
    var drawn = [];

    while (drawn.length < count) {
      if (pool.length === 0) {
        var candidates = allIds.filter(function (id) {
          return drawn.indexOf(id) === -1 && excluded.indexOf(id) === -1;
        });
        pool = shuffleArray(candidates.length > 0 ? candidates : allIds);
      }
      var nextId = pool.shift();
      if (nextId && drawn.indexOf(nextId) === -1) {
        drawn.push(nextId);
      }
    }

    return { drawn: drawn, nextQueue: pool };
  }

  function buildCardMap(list) {
    var map = {};
    for (var i = 0; i < list.length; i++) {
      map[list[i].id] = list[i];
    }
    return map;
  }

  function buildBoardSlots(defIds, defMap) {
    var slots = [];
    for (var i = 0; i < 5; i++) {
      var leftCard = defMap[defIds[i * 2]] || DATA.BASE_DEFINITION_CARDS[i * 2];
      var rightCard = defMap[defIds[i * 2 + 1]] || DATA.BASE_DEFINITION_CARDS[i * 2 + 1];
      slots.push({
        slotIndex: i,
        leftCard: leftCard,
        rightCard: rightCard,
        leftCount: null,
        locked: false
      });
    }
    return slots;
  }

  function createInitialState(language, customTasks, customDefs) {
    var lang = language === "en" ? "en" : "ru";
    var cTasks = customTasks || [];
    var cDefs = customDefs || [];
    var allTasks = cTasks.concat(DATA.BASE_TASK_CARDS);
    var allDefs = cDefs.concat(DATA.BASE_DEFINITION_CARDS);
    var taskMap = buildCardMap(allTasks);
    var defMap = buildCardMap(allDefs);

    var shuffledTaskIds = shuffleArray(allTasks.map(function (t) { return t.id; }));
    var shuffledDefIds = shuffleArray(allDefs.map(function (d) { return d.id; }));
    var firstTaskId = shuffledTaskIds.shift() || DATA.BASE_TASK_CARDS[0].id;
    var defDraw = drawFromIds(
      shuffledDefIds,
      10,
      allDefs.map(function (d) { return d.id; }),
      []
    );

    var players = createDefaultPlayers();
    var mode = "competitive";

    return {
      language: lang,
      mode: mode,
      players: players,
      teamScore: 0,
      gameStarted: false,
      gameFinished: false,
      currentRound: 1,
      totalRounds: DATA.getRoundsForGame(mode, players.length),
      currentTurnInGame: 1,
      presenterIndex: 0,
      cardSide: "A",
      cardsUsedCount: 0,
      activeTaskCard: taskMap[firstTaskId] || DATA.BASE_TASK_CARDS[0],
      secretWordNumber: null,
      boardSlots: buildBoardSlots(defDraw.drawn, defMap),
      taskDeckIds: shuffledTaskIds,
      definitionDeckIds: defDraw.nextQueue,
      customTasks: cTasks,
      customDefinitions: cDefs,
      currentTurnDeltas: {},
      currentTurnTeamDelta: 0,
      history: [],
      soundEnabled: true
    };
  }

  function resetSlots(slots) {
    return slots.map(function (s) {
      return {
        slotIndex: s.slotIndex,
        leftCard: s.leftCard,
        rightCard: s.rightCard,
        leftCount: null,
        locked: false
      };
    });
  }

  function hydrateCards(parsed) {
    var baseTaskMap = buildCardMap(DATA.BASE_TASK_CARDS);
    var baseDefMap = buildCardMap(DATA.BASE_DEFINITION_CARDS);

    parsed.language = parsed.language === "en" ? "en" : "ru";
    parsed.cardSide = parsed.cardSide === "B" ? "B" : "A";
    parsed.cardsUsedCount =
      parsed.cardsUsedCount === 0 || parsed.cardsUsedCount === 1
        ? parsed.cardsUsedCount
        : parsed.cardSide === "B"
          ? 1
          : 0;
    parsed.activeTaskCard = baseTaskMap[parsed.activeTaskCard.id] || parsed.activeTaskCard;
    parsed.boardSlots = parsed.boardSlots.map(function (slot) {
      return {
        slotIndex: slot.slotIndex,
        leftCard: baseDefMap[slot.leftCard.id] || slot.leftCard,
        rightCard: baseDefMap[slot.rightCard.id] || slot.rightCard,
        leftCount: typeof slot.leftCount === "number" ? slot.leftCount : null,
        locked: Boolean(slot.locked)
      };
    });
    parsed.customTasks = Array.isArray(parsed.customTasks) ? parsed.customTasks : [];
    parsed.customDefinitions = Array.isArray(parsed.customDefinitions) ? parsed.customDefinitions : [];
    parsed.currentTurnDeltas = parsed.currentTurnDeltas || {};
    parsed.currentTurnTeamDelta = typeof parsed.currentTurnTeamDelta === "number" ? parsed.currentTurnTeamDelta : 0;
    parsed.history = Array.isArray(parsed.history) ? parsed.history : [];
    return parsed;
  }

  function loadSavedState() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return createInitialState("ru", [], []);
      var parsed = JSON.parse(raw);
      if (
        !parsed ||
        !Array.isArray(parsed.players) ||
        parsed.players.length < 2 ||
        !Array.isArray(parsed.boardSlots) ||
        parsed.boardSlots.length !== 5 ||
        !parsed.activeTaskCard
      ) {
        return createInitialState("ru", [], []);
      }
      return hydrateCards(parsed);
    } catch (e) {
      return createInitialState("ru", [], []);
    }
  }

  function loadStoredPage(key, allowed, fallback) {
    try {
      var saved = localStorage.getItem(key);
      if (saved && allowed.indexOf(saved) !== -1) {
        return saved;
      }
    } catch (e) {}
    return fallback;
  }

  // ---------- Application Runtime State ----------
  var state = loadSavedState();
  var activePage = loadStoredPage(PAGE_STORAGE_KEY, VALID_PAGES, "setup");
  var previousPage = loadStoredPage(PREV_PAGE_STORAGE_KEY, NON_RULES_PAGES, "setup");
  var lastPlayPage = loadStoredPage(LAST_PLAY_PAGE_STORAGE_KEY, PLAY_PAGES, "task");

  // Ephemeral UI state
  var ui = {
    exitModalOpen: false,
    iosModalOpen: false,
    taskPeeking: false,
    taskManualPickerOpen: false,
    boardPeekSecret: false,
    scoringWordRevealed: false,
    scoringConfirmAdvance: false,
    scoringRulesOpenMobile: false,
    scoringHistoryOpenMobile: false,
    rulesTab: "rules",
    savedToast: null,
    confirmReinstall: false,
    reinstalling: false
  };
  var allowIntentionalReload = false;

  // Screen Wake Lock manager (keeps mobile screen awake during active play screens)
  var wakeLockSentinel = null;

  function shouldKeepScreenAwake() {
    return PLAY_PAGES.indexOf(activePage) !== -1 && !state.gameFinished;
  }

  function releaseWakeLock() {
    var sentinel = wakeLockSentinel;
    wakeLockSentinel = null;
    if (sentinel) {
      try {
        sentinel.release().catch(function () {});
      } catch (e) {}
    }
  }

  function syncWakeLock() {
    if (!shouldKeepScreenAwake()) {
      releaseWakeLock();
      return;
    }
    if (document.visibilityState !== "visible") return;
    if (wakeLockSentinel && !wakeLockSentinel.released) return;
    if (!navigator.wakeLock || typeof navigator.wakeLock.request !== "function") return;

    navigator.wakeLock
      .request("screen")
      .then(function (sentinel) {
        if (!shouldKeepScreenAwake()) {
          sentinel.release().catch(function () {});
          return;
        }
        wakeLockSentinel = sentinel;
        sentinel.addEventListener("release", function () {
          if (wakeLockSentinel === sentinel) {
            wakeLockSentinel = null;
          }
        });
      })
      .catch(function () {
        // Ignore battery-saver / unsupported browser denials
      });
  }

  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "visible") {
      syncWakeLock();
    }
  });

  // PWA Install State
  var pwa = {
    deferredPrompt: null,
    isInstalled:
      (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) ||
      Boolean(window.navigator.standalone),
    isIOS:
      /iPad|iPhone|iPod/.test(window.navigator.userAgent) ||
      (window.navigator.platform === "MacIntel" && window.navigator.maxTouchPoints > 1)
  };

  // DOM References
  var elLogoBtn = document.getElementById("logo-btn");
  var elBrandTitle = document.getElementById("brand-title");
  var elLangBtn = document.getElementById("lang-btn");
  var elRulesBtn = document.getElementById("rules-btn");
  var elContextStrip = document.getElementById("context-strip");
  var elMain = document.getElementById("main-content");
  var elExitModal = document.getElementById("exit-modal");
  var elExitModalCard = document.getElementById("exit-modal-card");
  var elIosModal = document.getElementById("ios-modal");
  var elIosModalCard = document.getElementById("ios-modal-card");
  var elOfflineToast = document.getElementById("offline-toast");

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {}
  }

  function savePage() {
    try {
      localStorage.setItem(PAGE_STORAGE_KEY, activePage);
      localStorage.setItem(PREV_PAGE_STORAGE_KEY, previousPage);
      localStorage.setItem(LAST_PLAY_PAGE_STORAGE_KEY, lastPlayPage);
    } catch (e) {}
  }

  function getT() {
    return DATA.getTranslations(state.language);
  }

  function scrollToId(id, block) {
    requestAnimationFrame(function () {
      var target = document.getElementById(id);
      if (target && target.scrollIntoView) {
        target.scrollIntoView({ behavior: "smooth", block: block || "center" });
      }
    });
  }

  function setPage(nextPage, skipScroll) {
    if (activePage !== "rules" && nextPage === "rules") {
      previousPage = activePage;
    }
    if (PLAY_PAGES.indexOf(nextPage) !== -1) {
      lastPlayPage = nextPage;
    }
    if (nextPage !== "scoring") {
      ui.scoringConfirmAdvance = false;
    }
    activePage = nextPage;
    savePage();
    syncWakeLock();
    renderAll();
    if (nextPage === "board") {
      var activeSlotIdx = findActiveSlotIndex();
      if (activeSlotIdx > 0) {
        scrollToId("board-slot-" + activeSlotIdx, "center");
      } else if (!skipScroll) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else if (!skipScroll) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function findActiveSlotIndex() {
    for (var i = 0; i < state.boardSlots.length; i++) {
      if (!state.boardSlots[i].locked) return i;
    }
    return -1;
  }

  function formatDelta(val) {
    return val > 0 ? "+" + val : String(val);
  }

  // ---------- Game Actions ----------
  function toggleLanguage() {
    state.language = state.language === "ru" ? "en" : "ru";
    saveState();
    renderAll();
  }

  function toggleRulesPage() {
    if (activePage === "rules") {
      setPage(previousPage === "rules" ? "setup" : previousPage);
    } else {
      previousPage = activePage;
      setPage("rules");
    }
  }

  function toggleSound() {
    state.soundEnabled = !state.soundEnabled;
    saveState();
    renderContextStrip();
  }

  function setMode(mode) {
    if (state.gameStarted && !state.gameFinished) return;
    state.mode = mode;
    if (mode === "competitive" && state.players.length < 3) {
      var prefix = state.language === "en" ? "Player" : "Игрок";
      state.players.push({
        id: "player-" + Date.now(),
        name: prefix + " " + (state.players.length + 1),
        color: DATA.PLAYER_COLORS[state.players.length % DATA.PLAYER_COLORS.length].hex,
        score: 0
      });
    }
    state.totalRounds = DATA.getRoundsForGame(state.mode, state.players.length);
    saveState();
    renderAll();
  }

  function addPlayer() {
    if (state.gameStarted && !state.gameFinished) return;
    if (state.players.length >= 8) return;
    var used = {};
    for (var i = 0; i < state.players.length; i++) {
      used[state.players[i].color] = true;
    }
    var nextColor = DATA.PLAYER_COLORS[state.players.length % DATA.PLAYER_COLORS.length].hex;
    for (var c = 0; c < DATA.PLAYER_COLORS.length; c++) {
      if (!used[DATA.PLAYER_COLORS[c].hex]) {
        nextColor = DATA.PLAYER_COLORS[c].hex;
        break;
      }
    }
    var prefix = state.language === "en" ? "Player" : "Игрок";
    var newId = "player-" + Date.now() + "-" + state.players.length;
    state.players.push({
      id: newId,
      name: prefix + " " + (state.players.length + 1),
      color: nextColor,
      score: 0
    });
    state.totalRounds = DATA.getRoundsForGame(state.mode, state.players.length);
    saveState();
    renderAll();
    scrollToId("setup-players-end", "center");
  }

  function removePlayer(id) {
    if (state.gameStarted && !state.gameFinished) return;
    var minPlayers = state.mode === "competitive" ? 3 : 2;
    if (state.players.length <= minPlayers) return;
    state.players = state.players.filter(function (p) { return p.id !== id; });
    state.presenterIndex = state.presenterIndex % state.players.length;
    delete state.currentTurnDeltas[id];
    state.totalRounds = DATA.getRoundsForGame(state.mode, state.players.length);
    saveState();
    renderAll();
  }

  function cyclePlayerColor(id) {
    for (var i = 0; i < state.players.length; i++) {
      if (state.players[i].id === id) {
        var idx = -1;
        for (var c = 0; c < DATA.PLAYER_COLORS.length; c++) {
          if (DATA.PLAYER_COLORS[c].hex === state.players[i].color) {
            idx = c;
            break;
          }
        }
        state.players[i].color = DATA.PLAYER_COLORS[(idx + 1) % DATA.PLAYER_COLORS.length].hex;
        break;
      }
    }
    saveState();
    renderAll();
  }

  function startNewGame() {
    var allTasks = state.customTasks.concat(DATA.BASE_TASK_CARDS);
    var allDefs = state.customDefinitions.concat(DATA.BASE_DEFINITION_CARDS);
    var taskMap = buildCardMap(allTasks);
    var defMap = buildCardMap(allDefs);

    var shuffledTaskIds = shuffleArray(allTasks.map(function (t) { return t.id; }));
    var shuffledDefIds = shuffleArray(allDefs.map(function (d) { return d.id; }));
    var firstTaskId = shuffledTaskIds.shift() || DATA.BASE_TASK_CARDS[0].id;
    var defDraw = drawFromIds(
      shuffledDefIds,
      10,
      allDefs.map(function (d) { return d.id; }),
      []
    );

    var prefix = state.language === "en" ? "Player" : "Игрок";
    state.players = state.players.map(function (p, idx) {
      return {
        id: p.id,
        name: (p.name || "").trim() || prefix + " " + (idx + 1),
        color: p.color,
        score: 0
      };
    });

    state.teamScore = 0;
    state.gameStarted = true;
    state.gameFinished = false;
    state.currentRound = 1;
    state.totalRounds = DATA.getRoundsForGame(state.mode, state.players.length);
    state.currentTurnInGame = 1;
    state.presenterIndex = 0;
    state.cardSide = "A";
    state.cardsUsedCount = 0;
    state.activeTaskCard = taskMap[firstTaskId] || DATA.BASE_TASK_CARDS[0];
    state.secretWordNumber = null;
    state.boardSlots = buildBoardSlots(defDraw.drawn, defMap);
    state.taskDeckIds = shuffledTaskIds;
    state.definitionDeckIds = defDraw.nextQueue;
    state.currentTurnDeltas = {};
    state.currentTurnTeamDelta = 0;
    state.history = [];

    ui.taskPeeking = false;
    ui.taskManualPickerOpen = false;
    ui.boardPeekSecret = false;
    ui.scoringWordRevealed = false;
    ui.scoringConfirmAdvance = false;

    playCardFlip(state.soundEnabled);
    saveState();
    setPage("task");
  }

  function resetMatch() {
    state.players = state.players.map(function (p) {
      return { id: p.id, name: p.name, color: p.color, score: 0 };
    });
    state.teamScore = 0;
    state.gameStarted = false;
    state.gameFinished = false;
    state.currentRound = 1;
    state.totalRounds = DATA.getRoundsForGame(state.mode, state.players.length);
    state.currentTurnInGame = 1;
    state.presenterIndex = 0;
    state.cardSide = "A";
    state.cardsUsedCount = 0;
    state.secretWordNumber = null;
    state.boardSlots = resetSlots(state.boardSlots);
    state.currentTurnDeltas = {};
    state.currentTurnTeamDelta = 0;
    state.history = [];

    ui.taskPeeking = false;
    ui.taskManualPickerOpen = false;
    ui.boardPeekSecret = false;
    ui.scoringWordRevealed = false;
    ui.scoringConfirmAdvance = false;
    lastPlayPage = "task";

    saveState();
    savePage();
    syncWakeLock();
    renderAll();
  }

  function exitToSetup(resetProgress) {
    ui.exitModalOpen = false;
    if (resetProgress) {
      resetMatch();
    }
    setPage("setup");
  }

  function drawNewTaskCard() {
    var allTasks = state.customTasks.concat(DATA.BASE_TASK_CARDS);
    var taskMap = buildCardMap(allTasks);
    var res = drawFromIds(
      state.taskDeckIds,
      1,
      allTasks.map(function (t) { return t.id; }),
      [state.activeTaskCard.id]
    );
    state.activeTaskCard = taskMap[res.drawn[0]] || DATA.BASE_TASK_CARDS[0];
    state.taskDeckIds = res.nextQueue;
    state.secretWordNumber = null;
    state.boardSlots = resetSlots(state.boardSlots);
    ui.taskPeeking = false;
    ui.boardPeekSecret = false;
    playCardFlip(state.soundEnabled);
    saveState();
    renderAll();
  }

  function flipCardsSide() {
    state.cardSide = state.cardSide === "A" ? "B" : "A";
    state.secretWordNumber = null;
    state.boardSlots = resetSlots(state.boardSlots);
    ui.taskPeeking = false;
    ui.boardPeekSecret = false;
    playCardFlip(state.soundEnabled);
    saveState();
    renderAll();
  }

  function drawRandomSecretWord() {
    state.secretWordNumber = Math.floor(Math.random() * 5) + 1;
    ui.taskPeeking = true;
    ui.taskManualPickerOpen = false;
    playDiscClick(state.soundEnabled);
    saveState();
    renderAll();
    scrollToId("task-secret-section", "center");
  }

  function setManualSecretWord(num) {
    state.secretWordNumber = num;
    ui.taskPeeking = false;
    ui.taskManualPickerOpen = false;
    playDiscClick(state.soundEnabled);
    saveState();
    renderAll();
    scrollToId("task-next-btn", "center");
  }

  function setSlotDiscSplit(slotIndex, leftCount) {
    var slot = state.boardSlots[slotIndex];
    if (!slot || slot.locked) return;
    if (slot.leftCount === leftCount) return;
    slot.leftCount = leftCount;
    playDiscClick(state.soundEnabled);
    saveState();
    renderBoardSlotOnly(slotIndex);
  }

  function lockSlotAndScroll(slotIndex) {
    var slot = state.boardSlots[slotIndex];
    if (!slot || slot.locked || slot.leftCount === null) return;
    slot.locked = true;
    playDiscClick(state.soundEnabled);
    vibrateLock();
    saveState();
    renderMain();
    if (slotIndex < 4) {
      scrollToId("board-slot-" + (slotIndex + 1), "center");
    } else {
      scrollToId("board-scoring-cta", "center");
    }
  }

  function unlockLastSlot() {
    var lastLockedIndex = -1;
    for (var i = state.boardSlots.length - 1; i >= 0; i--) {
      if (state.boardSlots[i].locked) {
        lastLockedIndex = i;
        break;
      }
    }
    if (lastLockedIndex === -1) return;
    state.boardSlots[lastLockedIndex].locked = false;
    vibrateTap(10);
    saveState();
    renderMain();
    scrollToId("board-slot-" + lastLockedIndex, "center");
  }

  function adjustPlayerTurnScore(playerId, delta) {
    for (var i = 0; i < state.players.length; i++) {
      var p = state.players[i];
      if (p.id === playerId) {
        var nextScore = Math.max(0, p.score + delta);
        var actualDelta = nextScore - p.score;
        if (actualDelta === 0) return;
        p.score = nextScore;
        state.currentTurnDeltas[playerId] = (state.currentTurnDeltas[playerId] || 0) + actualDelta;
        ui.scoringConfirmAdvance = false;
        playDiscClick(state.soundEnabled);
        saveState();
        renderAll();
        return;
      }
    }
  }

  function adjustTeamTurnScore(delta) {
    var nextScore = Math.max(0, state.teamScore + delta);
    var actualDelta = nextScore - state.teamScore;
    if (actualDelta === 0) return;
    state.teamScore = nextScore;
    state.currentTurnTeamDelta += actualDelta;
    ui.scoringConfirmAdvance = false;
    playDiscClick(state.soundEnabled);
    saveState();
    renderAll();
  }

  function resetCurrentTurnDeltas() {
    playCardFlip(state.soundEnabled);
    if (state.mode === "competitive") {
      for (var i = 0; i < state.players.length; i++) {
        var p = state.players[i];
        var d = state.currentTurnDeltas[p.id] || 0;
        p.score = Math.max(0, p.score - d);
      }
      state.currentTurnDeltas = {};
    } else {
      state.teamScore = Math.max(0, state.teamScore - state.currentTurnTeamDelta);
      state.currentTurnTeamDelta = 0;
    }
    saveState();
    renderAll();
  }

  function completeTurnAndAdvance() {
    var presenter = state.players[state.presenterIndex];
    var words = DATA.getTaskWords(state.activeTaskCard, state.cardSide, state.language);
    var secretWord =
      state.secretWordNumber !== null
        ? words[state.secretWordNumber - 1] || "#" + state.secretWordNumber
        : "—";

    var pointsSummary = "0";
    if (state.mode === "competitive") {
      var sum = 0;
      var keys = Object.keys(state.currentTurnDeltas);
      for (var k = 0; k < keys.length; k++) {
        sum += state.currentTurnDeltas[keys[k]] || 0;
      }
      pointsSummary = (sum > 0 ? "+" : "") + sum;
    } else {
      pointsSummary = (state.currentTurnTeamDelta > 0 ? "+" : "") + state.currentTurnTeamDelta;
    }

    state.history.unshift({
      turnNumber: state.currentTurnInGame,
      roundNumber: state.currentRound,
      presenterName: presenter ? presenter.name : "—",
      secretWord: secretWord,
      secretWordNumber: state.secretWordNumber,
      cardSide: state.cardSide,
      pointsSummary: pointsSummary
    });

    ui.scoringWordRevealed = false;
    ui.scoringConfirmAdvance = false;
    ui.boardPeekSecret = false;
    ui.taskPeeking = false;

    var totalTurns = state.totalRounds * state.players.length;
    if (state.currentTurnInGame >= totalTurns) {
      state.currentTurnDeltas = {};
      state.currentTurnTeamDelta = 0;
      state.gameFinished = true;
      playScoreChime(state.soundEnabled, true);
      saveState();
      syncWakeLock();
      renderAll();
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    var nextTurn = state.currentTurnInGame + 1;
    var nextPresenterIndex = (state.presenterIndex + 1) % state.players.length;
    var nextRound = Math.floor((nextTurn - 1) / state.players.length) + 1;

    if (state.cardsUsedCount === 0) {
      state.currentTurnInGame = nextTurn;
      state.currentRound = nextRound;
      state.presenterIndex = nextPresenterIndex;
      state.cardSide = state.cardSide === "A" ? "B" : "A";
      state.cardsUsedCount = 1;
      state.secretWordNumber = null;
      state.boardSlots = resetSlots(state.boardSlots);
      state.currentTurnDeltas = {};
      state.currentTurnTeamDelta = 0;
    } else {
      var allTasks = state.customTasks.concat(DATA.BASE_TASK_CARDS);
      var allDefs = state.customDefinitions.concat(DATA.BASE_DEFINITION_CARDS);
      var taskMap = buildCardMap(allTasks);
      var defMap = buildCardMap(allDefs);

      var taskDraw = drawFromIds(
        state.taskDeckIds,
        1,
        allTasks.map(function (t) { return t.id; }),
        [state.activeTaskCard.id]
      );
      var currentDefIds = [];
      for (var i = 0; i < state.boardSlots.length; i++) {
        currentDefIds.push(state.boardSlots[i].leftCard.id);
        currentDefIds.push(state.boardSlots[i].rightCard.id);
      }
      var defDraw = drawFromIds(
        state.definitionDeckIds,
        10,
        allDefs.map(function (d) { return d.id; }),
        currentDefIds
      );

      state.currentTurnInGame = nextTurn;
      state.currentRound = nextRound;
      state.presenterIndex = nextPresenterIndex;
      state.cardSide = "A";
      state.cardsUsedCount = 0;
      state.activeTaskCard = taskMap[taskDraw.drawn[0]] || DATA.BASE_TASK_CARDS[0];
      state.taskDeckIds = taskDraw.nextQueue;
      state.secretWordNumber = null;
      state.boardSlots = buildBoardSlots(defDraw.drawn, defMap);
      state.definitionDeckIds = defDraw.nextQueue;
      state.currentTurnDeltas = {};
      state.currentTurnTeamDelta = 0;
    }

    playCardFlip(state.soundEnabled);
    saveState();
    setPage("task");
  }

  function addCustomDefinitionCard(sideA, sideB) {
    var card = {
      id: "custom-def-" + Date.now(),
      sideA: sideA,
      sideB: sideB,
      isCustom: true
    };
    state.customDefinitions.unshift(card);
    state.definitionDeckIds.unshift(card.id);
    saveState();
    showSavedToast(getT().defSavedToast);
    renderMain();
  }

  function addCustomTaskCard(sideA, sideB) {
    var card = {
      id: "custom-task-" + Date.now(),
      sideA: sideA,
      sideB: sideB,
      isCustom: true
    };
    state.customTasks.unshift(card);
    state.taskDeckIds.unshift(card.id);
    saveState();
    showSavedToast(getT().taskSavedToast);
    renderMain();
  }

  function deleteCustomCard(type, id) {
    if (type === "task") {
      state.customTasks = state.customTasks.filter(function (c) { return c.id !== id; });
      state.taskDeckIds = state.taskDeckIds.filter(function (cid) { return cid !== id; });
    } else {
      state.customDefinitions = state.customDefinitions.filter(function (c) { return c.id !== id; });
      state.definitionDeckIds = state.definitionDeckIds.filter(function (cid) { return cid !== id; });
    }
    saveState();
    renderMain();
  }

  var toastTimer = null;
  function showSavedToast(msg) {
    ui.savedToast = msg;
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      ui.savedToast = null;
      if (activePage === "rules" && ui.rulesTab === "decks") {
        renderMain();
      }
    }, 2600);
  }

  // ---------- Safe App Reinstall (Preserves Saves & Other GitHub Pages Apps) ----------
  function reinstallApp() {
    if (!navigator.onLine) {
      ui.confirmReinstall = false;
      renderMain();
      return;
    }
    vibrateLock();
    ui.reinstalling = true;
    allowIntentionalReload = true;
    renderMain();

    var tasks = [];
    try {
      if ("serviceWorker" in navigator) {
        tasks.push(
          navigator.serviceWorker
            .getRegistration("./")
            .then(function (reg) {
              return reg ? reg.unregister() : false;
            })
            .catch(function () {})
        );
      }
      if ("caches" in window) {
        tasks.push(
          caches
            .keys()
            .then(function (keys) {
              return Promise.all(
                keys
                  .filter(function (k) {
                    return k.indexOf("teploe-s-myagkim-vanilka-") === 0;
                  })
                  .map(function (k) {
                    return caches.delete(k);
                  })
              );
            })
            .catch(function () {})
        );
      }
    } catch (e) {}

    Promise.all(tasks).finally(function () {
      window.location.reload();
    });
  }

  // ---------- PWA Install Helpers ----------
  function canShowInstallButton() {
    if (pwa.isInstalled) return false;
    return Boolean(pwa.deferredPrompt) || pwa.isIOS;
  }

  function triggerInstall() {
    if (pwa.deferredPrompt) {
      var promptEvent = pwa.deferredPrompt;
      pwa.deferredPrompt = null;
      promptEvent.prompt();
      promptEvent.userChoice
        .then(function (choice) {
          if (choice && choice.outcome === "accepted") {
            pwa.isInstalled = true;
          }
          renderAll();
        })
        .catch(function () {
          renderAll();
        });
    } else if (pwa.isIOS) {
      ui.exitModalOpen = false;
      ui.iosModalOpen = true;
      renderModals();
    }
  }

  function renderInstallBtnHtml(fullWidth) {
    if (!canShowInstallButton()) return "";
    var t = getT();
    var label = pwa.deferredPrompt ? t.installAppBtn : t.installIOSBtn;
    var cls = fullWidth ? "btn btn-navy btn-full" : "btn btn-navy";
    return (
      '<button type="button" class="' + cls + '" data-action="pwa-install" style="min-height:42px;padding:8px 14px;font-size:12px;">' +
      ICONS.download +
      "<span>" + escapeHtml(label) + "</span></button>"
    );
  }

  // ---------- Render Header, Context Strip, Modals, Offline Toast ----------
  function renderHeader() {
    var t = getT();
    document.documentElement.lang = state.language;
    document.title =
      state.language === "en"
        ? "Warm & Soft — Digital Board Companion"
        : "Тёплое с мягким — Цифровой планшет";

    elBrandTitle.textContent = t.brand;
    elLangBtn.textContent = state.language === "ru" ? "RU" : "EN";
    elLangBtn.setAttribute(
      "aria-label",
      state.language === "ru" ? "Switch to English" : "Переключить на русский"
    );

    var isOnRules = activePage === "rules";
    elRulesBtn.className = "btn-rules" + (isOnRules ? " is-active" : "");
    elRulesBtn.innerHTML = ICONS.book + "<span>" + escapeHtml(isOnRules ? t.backToGameBtn : t.rulesBtn) + "</span>";
  }

  function renderContextStrip() {
    var t = getT();
    var show = activePage !== "setup" && activePage !== "rules";
    if (!show) {
      elContextStrip.classList.add("hidden");
      elContextStrip.innerHTML = "";
      return;
    }

    var presenter = state.players[state.presenterIndex];
    var totalTurns = state.totalRounds * state.players.length;
    var sideText = state.cardSide === "A" ? t.sideA : t.sideB;

    var teamPart =
      state.mode !== "competitive"
        ? '<span class="mono" style="font-weight:700;color:#2563eb;">' +
          escapeHtml(t.teamScore) +
          ": " +
          state.teamScore +
          "</span>"
        : "";

    elContextStrip.classList.remove("hidden");
    elContextStrip.innerHTML =
      '<div class="container context-inner">' +
      '  <div class="context-left tabular">' +
      '    <strong style="color:#13294b;">' + escapeHtml(t.turn) + " " + state.currentTurnInGame + "/" + totalTurns + "</strong>" +
      '    <span aria-hidden="true">·</span>' +
      '    <span style="overflow:hidden;text-overflow:ellipsis;">' + escapeHtml(t.presenter) + ': <strong style="color:#0f172a;">' + escapeHtml(presenter ? presenter.name : "") + "</strong></span>" +
      '    <span aria-hidden="true">·</span>' +
      '    <span>' + escapeHtml(t.round) + " " + state.currentRound + "/" + state.totalRounds + " · " + escapeHtml(t.sideLabel) + " " + escapeHtml(sideText) + "</span>" +
      "  </div>" +
      '  <div class="context-right">' +
      teamPart +
      '    <button type="button" class="sound-btn" data-action="toggle-sound" aria-label="' + escapeHtml(state.soundEnabled ? t.soundOff : t.soundOn) + '">' +
      (state.soundEnabled ? ICONS.volOn : ICONS.volOff) +
      "    </button>" +
      "  </div>" +
      "</div>";
  }

  function renderModals() {
    var t = getT();

    if (ui.exitModalOpen) {
      elExitModal.classList.remove("hidden");
      var resetBtn = state.gameStarted
        ? '<button type="button" class="btn btn-danger-soft btn-full" data-action="exit-reset">' +
          ICONS.reset +
          "<span>" + escapeHtml(t.exitAndReset) + "</span></button>"
        : "";

      elExitModalCard.innerHTML =
        '<div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px;">' +
        '  <div class="stack-sm" style="gap:6px;">' +
        '    <h2 id="exit-modal-title" class="page-title" style="font-size:20px;">' + escapeHtml(t.exitModalTitle) + "</h2>" +
        '    <p style="font-size:13px;line-height:1.5;color:#475569;">' + escapeHtml(t.exitModalBody) + "</p>" +
        "  </div>" +
        '  <button type="button" class="icon-btn" data-action="close-exit" aria-label="' + escapeHtml(t.stayInGame) + '">' + ICONS.close + "</button>" +
        "</div>" +
        '<div class="stack-sm">' +
        '  <button type="button" class="btn btn-navy btn-full" data-action="exit-menu">' +
        ICONS.logout +
        "    <span>" + escapeHtml(t.exitToMenu) + "</span>" +
        "  </button>" +
        resetBtn +
        renderInstallBtnHtml(true) +
        '  <button type="button" class="btn btn-soft btn-full" data-action="close-exit">' + escapeHtml(t.stayInGame) + "</button>" +
        "</div>";
    } else {
      elExitModal.classList.add("hidden");
      elExitModalCard.innerHTML = "";
    }

    if (ui.iosModalOpen) {
      elIosModal.classList.remove("hidden");
      elIosModalCard.innerHTML =
        '<div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px;">' +
        '  <h2 id="ios-modal-title" class="page-title" style="font-size:19px;">' + escapeHtml(t.iosInstallTitle) + "</h2>" +
        '  <button type="button" class="icon-btn" data-action="close-ios" aria-label="' + escapeHtml(t.closeBtn) + '">' + ICONS.close + "</button>" +
        "</div>" +
        '<ol class="stack-sm" style="font-size:14px;line-height:1.5;color:#334155;">' +
        '  <li style="display:flex;gap:10px;align-items:flex-start;"><strong style="color:#13294b;">1.</strong><span>' + escapeHtml(t.iosInstallStep1) + "</span></li>" +
        '  <li style="display:flex;gap:10px;align-items:flex-start;"><strong style="color:#13294b;">2.</strong><span>' + escapeHtml(t.iosInstallStep2) + "</span></li>" +
        '  <li style="display:flex;gap:10px;align-items:flex-start;"><strong style="color:#13294b;">3.</strong><span>' + escapeHtml(t.iosInstallStep3) + "</span></li>" +
        "</ol>" +
        '<button type="button" class="btn btn-navy btn-full" data-action="close-ios">' + escapeHtml(t.closeBtn) + "</button>";
    } else {
      elIosModal.classList.add("hidden");
      elIosModalCard.innerHTML = "";
    }
  }

  function renderOfflineToast() {
    var t = getT();
    if (!navigator.onLine) {
      elOfflineToast.textContent = t.offlineReadyText;
      elOfflineToast.classList.remove("hidden");
    } else {
      elOfflineToast.classList.add("hidden");
    }
  }

  // ---------- Page 1: Setup ----------
  function renderSetupPage() {
    var t = getT();
    var minPlayers = state.mode === "competitive" ? 3 : 2;
    var roundsCount = DATA.getRoundsForGame(state.mode, state.players.length);
    var totalTurns = roundsCount * state.players.length;
    var yellowBonuses = DATA.getYellowBoardBonuses(state.players.length);
    var isMatchActive = state.gameStarted && !state.gameFinished;

    var continueBtn = isMatchActive
      ? '<button type="button" class="btn btn-outline" data-action="goto-page" data-page="' + escapeHtml(lastPlayPage) + '" style="min-height:42px;padding:8px 14px;font-size:13px;">' +
        escapeHtml(t.continueTurn) +
        "</button>"
      : "";

    var activeLockBanner = isMatchActive
      ? '<div class="notice-amber">' +
        '  <span style="flex:1;min-width:200px;">' + escapeHtml(t.activeGameLockHint) + "</span>" +
        '  <button type="button" class="btn btn-outline" data-action="reset-match" style="min-height:36px;padding:6px 12px;font-size:12px;border-color:#fcd34d;color:#78350f;">' +
        ICONS.reset +
        "    <span>" + escapeHtml(t.resetMatchBtn) + "</span>" +
        "  </button>" +
        "</div>"
      : "";

    var modesHtml = MODE_ORDER.map(function (modeId) {
      var m = t.modes[modeId];
      var selected = state.mode === modeId;
      return (
        '<button type="button" class="mode-btn' + (selected ? " selected" : "") + '" data-action="set-mode" data-mode="' + modeId + '"' + (isMatchActive ? " disabled" : "") + ">" +
        '  <div class="mode-head">' +
        '    <span class="mode-title">' + escapeHtml(m.title) + "</span>" +
        '    <span class="mode-hint">' + escapeHtml(m.playersHint) + "</span>" +
        "  </div>" +
        '  <p class="mode-desc">' + escapeHtml(m.summary) + "</p>" +
        "</button>"
      );
    }).join("");

    var playersHtml = state.players
      .map(function (player, idx) {
        var disableRemove = isMatchActive || state.players.length <= minPlayers ? " disabled" : "";
        return (
          '<div class="player-row">' +
          '  <button type="button" class="color-badge" style="background:' + escapeHtml(player.color) + ';" data-action="cycle-color" data-id="' + escapeHtml(player.id) + '" title="' + escapeHtml(t.colorTip) + '">' + (idx + 1) + "</button>" +
          '  <input type="text" class="text-input" maxlength="22" value="' + escapeHtml(player.name) + '" placeholder="' + escapeHtml(t.playerPlaceholder + " " + (idx + 1)) + '" data-player-input="' + escapeHtml(player.id) + '" />' +
          '  <button type="button" class="icon-btn" data-action="remove-player" data-id="' + escapeHtml(player.id) + '"' + disableRemove + ' aria-label="Remove">' + ICONS.trash + "</button>" +
          "</div>"
        );
      })
      .join("");

    var bonusLine =
      state.mode === "coop_talk"
        ? escapeHtml(t.blueBoardBonuses)
        : escapeHtml(t.yellowBoardBonuses + ": " + yellowBonuses.join(" · "));

    elMain.innerHTML =
      '<div class="stack-lg">' +
      '  <section class="setup-top">' +
      "    <div>" +
      '      <h1 class="page-title">' + escapeHtml(t.setupTitle) + "</h1>" +
      '      <p class="muted tabular" style="margin-top:3px;">' +
      roundsCount + " " + escapeHtml(DATA.pluralize(roundsCount, "round", state.language)) + " · " +
      totalTurns + " " + escapeHtml(DATA.pluralize(totalTurns, "turn", state.language)) +
      "</p>" +
      "    </div>" +
      '    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">' +
      renderInstallBtnHtml(false) +
      continueBtn +
      "    </div>" +
      "  </section>" +
      activeLockBanner +
      '  <div class="grid-main">' +
      '    <section class="stack-sm">' +
      '      <h2 class="section-title">' + escapeHtml(t.gameModeHeading) + "</h2>" +
      modesHtml +
      "    </section>" +
      '    <section class="card stack-md">' +
      '      <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;">' +
      "        <div>" +
      '          <h2 class="section-title">' + escapeHtml(t.playersHeading) + " (" + state.players.length + ")</h2>" +
      '          <p class="muted tabular" style="margin-top:2px;">' + bonusLine + "</p>" +
      "        </div>" +
      '        <button type="button" class="btn btn-yellow" data-action="add-player"' + (isMatchActive || state.players.length >= 8 ? " disabled" : "") + ' style="min-height:42px;padding:8px 12px;font-size:12px;">' +
      ICONS.plus +
      "          <span>" + escapeHtml(t.addPlayer) + "</span>" +
      "        </button>" +
      "      </div>" +
      "      <div>" + playersHtml + '<div id="setup-players-end"></div></div>' +
      '      <button type="button" class="btn btn-pink btn-full" data-action="start-game">' +
      ICONS.play +
      "        <span>" + escapeHtml(isMatchActive ? t.startNewGameBtn : t.startGame) + "</span>" +
      "      </button>" +
      "    </section>" +
      "  </div>" +
      "</div>";
  }

  // ---------- Page 2: Task Card ----------
  function renderTaskPage() {
    var t = getT();
    var presenter = state.players[state.presenterIndex];
    var words = DATA.getTaskWords(state.activeTaskCard, state.cardSide, state.language);
    var curSideLabel = state.cardSide === "A" ? t.sideA : t.sideB;
    var oppSideLabel = state.cardSide === "A" ? t.sideB : t.sideA;

    var wordsHtml = words
      .map(function (word, idx) {
        var num = idx + 1;
        var isSecret = ui.taskPeeking && state.secretWordNumber === num;
        return (
          '<li class="task-word-item' + (isSecret ? " is-secret" : "") + '">' +
          '  <span class="task-word-num tabular">' + num + "</span>" +
          '  <span class="task-word-text">' + escapeHtml(word) + "</span>" +
          (isSecret ? '<span style="margin-left:auto;font-size:12px;font-weight:700;white-space:nowrap;flex-shrink:0;">' + escapeHtml(t.secretPickedBadge) + "</span>" : "") +
          "</li>"
        );
      })
      .join("");

    var secretBodyHtml = "";
    if (state.secretWordNumber === null) {
      secretBodyHtml =
        '<button type="button" class="btn btn-pink btn-full" data-action="draw-secret">' +
        ICONS.dice +
        "  <span>" + escapeHtml(t.drawRandomBtn) + "</span>" +
        "</button>";
    } else {
      var secretWordText = words[state.secretWordNumber - 1] || "";
      secretBodyHtml =
        '<div class="stack-sm">' +
        '  <div class="secret-box' + (ui.taskPeeking ? " is-open" : "") + '">' +
        (ui.taskPeeking
          ? '<div style="font-size:12px;font-weight:700;color:#f4c430;">' + escapeHtml(t.youExplainLabel) + " #" + state.secretWordNumber + "</div>" +
            '<div class="font-display" style="font-size:24px;font-weight:800;margin-top:4px;overflow-wrap:break-word;">' + escapeHtml(secretWordText) + "</div>"
          : '<div class="font-display" style="font-size:14px;font-weight:800;padding:4px 0;">' + escapeHtml(t.tokenFaceDownTitle) + "</div>") +
        "  </div>" +
        '  <div class="grid-2btn">' +
        '    <button type="button" class="btn ' + (ui.taskPeeking ? "btn-navy" : "btn-blue") + '" data-action="toggle-task-peek" style="font-size:13px;padding:10px 12px;">' +
        (ui.taskPeeking ? ICONS.eyeOff : ICONS.eye) +
        "      <span>" + escapeHtml(ui.taskPeeking ? t.hideWordBtn : t.peekWordBtn) + "</span>" +
        "    </button>" +
        '    <button type="button" class="btn btn-outline" data-action="draw-secret" style="font-size:13px;padding:10px 12px;">' +
        ICONS.reset +
        "      <span>" + escapeHtml(t.redrawBtn) + "</span>" +
        "    </button>" +
        "  </div>" +
        "</div>";
    }

    var manualButtonsHtml = ui.taskManualPickerOpen
      ? '<div class="grid-5btn" style="margin-top:8px;">' +
        [1, 2, 3, 4, 5]
          .map(function (num) {
            var active = state.secretWordNumber === num;
            return (
              '<button type="button" class="btn ' + (active ? "btn-pink" : "btn-soft") + '" data-action="pick-secret" data-num="' + num + '" style="min-height:44px;padding:0;font-size:16px;">' +
              num +
              "</button>"
            );
          })
          .join("") +
        "</div>"
      : "";

    elMain.innerHTML =
      '<div class="grid-main">' +
      '  <div class="navy-card">' +
      '    <div class="task-card-header">' +
      '      <div style="display:flex;align-items:center;gap:8px;min-width:0;">' +
      '        <span class="font-display" style="font-size:14px;font-weight:800;color:#f4c430;white-space:nowrap;">' + escapeHtml(t.sideLabel + " " + curSideLabel) + "</span>" +
      '        <span class="tabular" style="font-size:12px;color:#94a3b8;">· ' + state.taskDeckIds.length + " " + escapeHtml(DATA.pluralize(state.taskDeckIds.length, "card", state.language)) + "</span>" +
      "      </div>" +
      '      <div style="display:flex;align-items:center;gap:6px;flex-shrink:0;">' +
      '        <button type="button" class="btn-card-action" data-action="flip-side">' +
      '          <span style="color:#f4c430;display:inline-flex;">' + ICONS.repeat + "</span>" +
      "          <span>" + escapeHtml(t.flipSideBtn + " " + oppSideLabel) + "</span>" +
      "        </button>" +
      '        <button type="button" class="btn-card-action" data-action="new-task-card">' +
      '          <span style="color:#f4c430;display:inline-flex;">' + ICONS.shuffle + "</span>" +
      "          <span>" + escapeHtml(t.otherCardBtn) + "</span>" +
      "        </button>" +
      "      </div>" +
      "    </div>" +
      '    <ol class="task-words-list">' + wordsHtml + "</ol>" +
      "  </div>" +
      '  <div id="task-secret-section" class="stack-md">' +
      '    <div class="card stack-md">' +
      '      <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;">' +
      '        <div style="min-width:0;">' +
      '          <h2 class="section-title">' + escapeHtml(t.secretTokenTitle) + "</h2>" +
      '          <p class="muted" style="margin-top:2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + escapeHtml(t.secretTokenHintPrefix) + ' <strong style="color:#0f172a;">' + escapeHtml(presenter ? presenter.name : "") + "</strong></p>" +
      "        </div>" +
      '        <span class="color-badge" style="background:' + escapeHtml(presenter ? presenter.color : "#13294b") + ';cursor:default;">' + (state.presenterIndex + 1) + "</span>" +
      "      </div>" +
      secretBodyHtml +
      '      <div style="padding-top:8px;border-top:1px solid #f1f5f9;">' +
      '        <button type="button" class="btn btn-ghost" data-action="toggle-manual-picker" style="padding:4px 0;min-height:34px;justify-content:flex-start;">' +
      escapeHtml(ui.taskManualPickerOpen ? t.manualPickToggleHide : t.manualPickToggleShow) +
      "        </button>" +
      manualButtonsHtml +
      "      </div>" +
      "    </div>" +
      '    <button type="button" id="task-next-btn" class="btn btn-navy btn-full" data-action="goto-board">' +
      "      <span>" + escapeHtml(t.goToBoardBtn) + "</span>" +
      ICONS.arrowRight +
      "    </button>" +
      "  </div>" +
      "</div>";
  }

  // ---------- Page 3: Explanation Board ----------
  function renderDiscsHtml(leftCount) {
    if (leftCount === null) {
      var six = "";
      for (var i = 0; i < 6; i++) {
        six += '<span class="disc"></span>';
      }
      return '<div class="disc-center-group">' + six + "</div>";
    }
    var leftHtml = "";
    var rightHtml = "";
    for (var l = 0; l < leftCount; l++) {
      leftHtml += '<span class="disc"></span>';
    }
    for (var r = 0; r < 6 - leftCount; r++) {
      rightHtml += '<span class="disc"></span>';
    }
    return (
      '<div class="disc-split-group">' +
      '  <div class="disc-cluster">' + leftHtml + "</div>" +
      '  <div class="disc-cluster">' + rightHtml + "</div>" +
      "</div>"
    );
  }

  function formatSlotAriaText(slot, leftLabel, rightLabel, t) {
    if (slot.leftCount === null) {
      return t.centeredLabel;
    }
    return slot.leftCount + " " + leftLabel + ", " + (6 - slot.leftCount) + " " + rightLabel;
  }

  function formatSlotCenterMetaHtml(slot, idx, t) {
    if (slot.locked) {
      return '<span style="display:inline-flex;align-items:center;gap:4px;color:#6ee7b7;font-weight:700;">' + ICONS.lock + escapeHtml(t.lockedLabel) + "</span>";
    }
    if (slot.leftCount === null) {
      return "<span>" + escapeHtml(t.centeredLabel) + "</span>";
    }
    return "<span>" + escapeHtml(t.rowLabel + " " + (idx + 1)) + "</span>";
  }

  function formatLockBtnContent(slot, idx, t) {
    if (slot.leftCount === null) {
      return "<span>" + escapeHtml(t.distributePrompt) + "</span>";
    }
    if (idx === 4) {
      return ICONS.check + "<span>" + escapeHtml(t.lockLastRow) + "</span>";
    }
    return "<span>" + escapeHtml(t.lockRowPrefix + " " + (idx + 1) + " " + t.lockRowSuffix) + "</span>" + ICONS.arrowDown;
  }

  function renderSlotInnerHtml(slot, idx, activeSlotIndex) {
    var t = getT();
    var isActive = idx === activeSlotIndex;
    var canEdit = isActive && !slot.locked;
    var leftLabel = DATA.getDefinitionText(slot.leftCard, state.cardSide, state.language);
    var rightLabel = DATA.getDefinitionText(slot.rightCard, state.cardSide, state.language);

    var centerMeta = formatSlotCenterMetaHtml(slot, idx, t);
    var ariaValueText = formatSlotAriaText(slot, leftLabel, rightLabel, t);

    var activeControls = "";
    if (canEdit) {
      var splitBtns = SPLIT_OPTIONS.map(function (lv) {
        var selected = slot.leftCount === lv;
        return (
          '<button type="button" class="split-btn' + (selected ? " selected" : "") + '" data-action="slot-split" data-slot="' + idx + '" data-left="' + lv + '">' +
          lv + ":" + (6 - lv) +
          "</button>"
        );
      }).join("");

      activeControls =
        '<div style="padding:2px 2px 4px;">' +
        '  <div class="split-grid">' + splitBtns + "</div>" +
        '  <button type="button" class="btn btn-yellow btn-full" data-action="lock-slot" data-slot="' + idx + '"' + (slot.leftCount === null ? " disabled" : "") + ' style="margin-top:8px;min-height:44px;font-size:13px;">' +
        formatLockBtnContent(slot, idx, t) +
        "  </button>" +
        "</div>";
    }

    return (
      '<div class="slot-bar' + (isActive ? " is-active" : "") + '">' +
      '  <button type="button" class="def-card-btn" data-action="nudge-left" data-slot="' + idx + '"' + (!canEdit ? " disabled" : "") + ">" + escapeHtml(leftLabel) + "</button>" +
      '  <div class="groove-col">' +
      '    <div class="disc-groove' + (canEdit ? " editable" : "") + '" data-groove-slot="' + idx + '"' + (canEdit ? ' tabindex="0"' : "") + ' role="slider" aria-label="' + escapeHtml(leftLabel + " — " + rightLabel) + '" aria-valuemin="0" aria-valuemax="6" aria-valuenow="' + (slot.leftCount === null ? 3 : slot.leftCount) + '" aria-valuetext="' + escapeHtml(ariaValueText) + '">' +
      renderDiscsHtml(slot.leftCount) +
      "    </div>" +
      '    <div class="groove-meta mono">' +
      '      <span data-slot-left>' + (slot.leftCount === null ? "—" : slot.leftCount) + "</span>" +
      '      <span data-slot-center style="font-family:var(--font-sans);font-size:10px;color:#94a3b8;">' + centerMeta + "</span>" +
      '      <span data-slot-right>' + (slot.leftCount === null ? "—" : 6 - slot.leftCount) + "</span>" +
      "    </div>" +
      "  </div>" +
      '  <button type="button" class="def-card-btn" data-action="nudge-right" data-slot="' + idx + '"' + (!canEdit ? " disabled" : "") + ">" + escapeHtml(rightLabel) + "</button>" +
      "</div>" +
      activeControls
    );
  }

  // Update slot DOM in-place so pointer capture on [data-groove-slot] is NEVER broken during drag!
  function renderBoardSlotOnly(slotIndex) {
    var slotWrap = document.getElementById("board-slot-" + slotIndex);
    var slot = state.boardSlots[slotIndex];
    if (!slotWrap || !slot) {
      renderMain();
      return;
    }

    var groove = slotWrap.querySelector("[data-groove-slot]");
    if (!groove) {
      renderMain();
      return;
    }

    var t = getT();
    var leftLabel = DATA.getDefinitionText(slot.leftCard, state.cardSide, state.language);
    var rightLabel = DATA.getDefinitionText(slot.rightCard, state.cardSide, state.language);

    groove.innerHTML = renderDiscsHtml(slot.leftCount);
    groove.setAttribute("aria-valuenow", String(slot.leftCount === null ? 3 : slot.leftCount));
    groove.setAttribute("aria-valuetext", formatSlotAriaText(slot, leftLabel, rightLabel, t));

    var leftSpan = slotWrap.querySelector("[data-slot-left]");
    var centerSpan = slotWrap.querySelector("[data-slot-center]");
    var rightSpan = slotWrap.querySelector("[data-slot-right]");
    if (leftSpan) leftSpan.textContent = slot.leftCount === null ? "—" : String(slot.leftCount);
    if (centerSpan) centerSpan.innerHTML = formatSlotCenterMetaHtml(slot, slotIndex, t);
    if (rightSpan) rightSpan.textContent = slot.leftCount === null ? "—" : String(6 - slot.leftCount);

    var splitButtons = slotWrap.querySelectorAll('[data-action="slot-split"]');
    for (var i = 0; i < splitButtons.length; i++) {
      var lv = Number(splitButtons[i].getAttribute("data-left"));
      if (slot.leftCount === lv) {
        splitButtons[i].classList.add("selected");
      } else {
        splitButtons[i].classList.remove("selected");
      }
    }

    var lockBtn = slotWrap.querySelector('[data-action="lock-slot"]');
    if (lockBtn) {
      lockBtn.disabled = slot.leftCount === null;
      lockBtn.innerHTML = formatLockBtnContent(slot, slotIndex, t);
    }
  }

  function renderBoardPage() {
    var t = getT();
    var words = DATA.getTaskWords(state.activeTaskCard, state.cardSide, state.language);
    var activeSlotIndex = findActiveSlotIndex();
    var lockedCount = state.boardSlots.filter(function (s) { return s.locked; }).length;
    var allDone = lockedCount === 5;

    var pinnedWordsHtml = words
      .map(function (w, i) {
        var isSecret = ui.boardPeekSecret && state.secretWordNumber === i + 1;
        return (
          '<li class="pinned-word' + (isSecret ? " is-secret" : "") + '">' +
          '  <span class="pinned-num">' + (i + 1) + ".</span>" +
          "  <span>" + escapeHtml(w) + "</span>" +
          "</li>"
        );
      })
      .join("");

    var peekMiniBtn =
      state.secretWordNumber !== null
        ? '<button type="button" class="peek-mini-btn' + (ui.boardPeekSecret ? " active" : "") + '" data-action="toggle-board-peek" aria-label="' + escapeHtml(ui.boardPeekSecret ? t.hidePresenterWord : t.peekPresenterWord) + '">' +
          (ui.boardPeekSecret ? ICONS.eyeOff : ICONS.eye) +
          "</button>"
        : "";

    var slotsHtml = state.boardSlots
      .map(function (slot, idx) {
        var isWaiting = activeSlotIndex !== -1 && idx > activeSlotIndex;
        var arrow =
          idx < 4
            ? '<div class="arrow-sep' + (slot.locked ? " done" : "") + '" aria-hidden="true">↓</div>'
            : "";
        return (
          '<div id="board-slot-' + idx + '" class="slot-wrap' + (isWaiting ? " is-waiting" : "") + '">' +
          renderSlotInnerHtml(slot, idx, activeSlotIndex) +
          "</div>" +
          arrow
        );
      })
      .join("");

    var desktopWordsHtml = words
      .map(function (w, idx) {
        var isSecret = ui.boardPeekSecret && state.secretWordNumber === idx + 1;
        return (
          '<li style="display:flex;align-items:center;gap:10px;padding:8px 10px;border-radius:12px;font-size:14px;font-weight:700;' +
          (isSecret ? "background:#e03a88;color:#ffffff;" : "background:#f8fafc;color:#1e293b;") +
          '">' +
          '  <span class="mono" style="width:24px;height:24px;border-radius:8px;display:inline-flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;' +
          (isSecret ? "background:#ffffff;color:#e03a88;" : "background:#13294b;color:#f4c430;") +
          '">' + (idx + 1) + "</span>" +
          "  <span>" + escapeHtml(w) + "</span>" +
          "</li>"
        );
      })
      .join("");

    var desktopPeekBtn =
      state.secretWordNumber !== null
        ? '<button type="button" class="btn btn-soft btn-full" data-action="toggle-board-peek" style="min-height:40px;font-size:12px;margin-top:10px;">' +
          (ui.boardPeekSecret ? ICONS.eyeOff : ICONS.eye) +
          "<span>" + escapeHtml(ui.boardPeekSecret ? t.hidePresenterWord : t.peekPresenterWord) + "</span></button>"
        : "";

    var undoRowBtn =
      lockedCount > 0
        ? '<button type="button" class="btn-board-undo" data-action="unlock-last-slot">' +
          ICONS.undo +
          "<span>" + escapeHtml(t.undoLastRowBtn) + "</span></button>"
        : "";

    elMain.innerHTML =
      '<div class="stack-md">' +
      '  <div class="pinned-words-bar">' +
      '    <ol class="pinned-words-list">' + pinnedWordsHtml + "</ol>" +
      peekMiniBtn +
      "  </div>" +
      '  <div class="grid-main grid-board">' +
      '    <div class="navy-card" style="padding:10px;">' +
      '      <div class="board-head">' +
      '        <div style="display:flex;align-items:center;gap:8px;">' +
      '          <span class="font-display" style="font-weight:800;color:#ffffff;font-size:14px;">' + escapeHtml(t.boardTitle) + "</span>" +
      '          <span class="mono" style="font-weight:700;color:#f4c430;">' + escapeHtml(allDone ? t.all5Filled : lockedCount + "/5") + "</span>" +
      "        </div>" +
      undoRowBtn +
      "      </div>" +
      '      <div class="stack-sm" style="gap:4px;">' + slotsHtml + "</div>" +
      "    </div>" +
      '    <aside class="desktop-sidebar">' +
      '      <div class="card desktop-words-box">' +
      '        <ol class="stack-sm" style="gap:6px;">' + desktopWordsHtml + "</ol>" +
      desktopPeekBtn +
      "      </div>" +
      '      <div id="board-scoring-cta" class="stack-sm" style="scroll-margin-top:130px;">' +
      '        <button type="button" class="btn ' + (allDone ? "btn-pink" : "btn-navy") + ' btn-full" data-action="goto-page" data-page="scoring">' +
      "          <span>" + escapeHtml(t.goToScoringBtn) + "</span>" +
      ICONS.arrowRight +
      "        </button>" +
      '        <button type="button" class="btn btn-ghost btn-full" data-action="goto-page" data-page="task">' +
      ICONS.arrowLeft +
      "          <span>" + escapeHtml(t.backToTaskBtn) + "</span>" +
      "        </button>" +
      "      </div>" +
      "    </aside>" +
      "  </div>" +
      "</div>";
  }

  // ---------- Page 4: Scoring & End Screen ----------
  function renderScoringRulesBullets() {
    var t = getT();
    var items = [];
    if (state.mode === "competitive") {
      items = [t.compRule1, t.compRule2, t.compRule3, t.compRule4];
    } else if (state.mode === "coop_talk") {
      items = [t.coopTalkRule1, t.coopTalkRule2, t.coopTalkRule3];
    } else {
      items = [t.coopMindRule1, t.coopMindRule2, t.coopMindRule3];
    }
    return (
      '<ul class="rules-bullets">' +
      items.map(function (line) { return "<li>" + escapeHtml(line) + "</li>"; }).join("") +
      "</ul>"
    );
  }

  function renderScoringPage() {
    var t = getT();
    var totalTurns = state.totalRounds * state.players.length;

    // End of game screen
    if (state.gameFinished) {
      var sorted = state.players.slice().sort(function (a, b) { return b.score - a.score; });
      var topScore = sorted[0] ? sorted[0].score : 0;
      var winners = sorted.filter(function (p) { return p.score === topScore; });

      var coopTier =
        state.mode !== "competitive"
          ? DATA.getCoopRank(state.mode, state.players.length, state.teamScore)
          : null;
      var clampedCount = Math.max(2, Math.min(8, state.players.length));
      var coopTable =
        state.mode === "coop_talk"
          ? DATA.COOP_TALK_TABLE[clampedCount]
          : state.mode === "coop_mind"
            ? DATA.COOP_MIND_TABLE[clampedCount]
            : null;

      var heroBody = "";
      if (state.mode === "competitive") {
        var winHeadline =
          winners.length > 1
            ? t.tiePrefix + " " + winners.map(function (w) { return w.name; }).join(" " + t.andWord + " ")
            : t.winnerPrefix + " " + (winners[0] ? winners[0].name : "");
        heroBody =
          '<h1 class="font-display" style="font-size:28px;font-weight:800;">' + escapeHtml(winHeadline) + "</h1>" +
          '<p class="tabular" style="font-size:14px;color:#cbd5e1;margin-top:6px;">' +
          escapeHtml(t.leaderResultPrefix) +
          ' <strong style="color:#ffffff;">' + topScore + " " + escapeHtml(DATA.pluralize(topScore, "point", state.language)) + "</strong> · " +
          state.totalRounds + " " + escapeHtml(DATA.pluralize(state.totalRounds, "round", state.language)) + " (" +
          totalTurns + " " + escapeHtml(DATA.pluralize(totalTurns, "turn", state.language)) + ")</p>";
      } else {
        heroBody =
          '<h1 class="font-display" style="font-size:28px;font-weight:800;color:#f4c430;">' +
          escapeHtml(coopTier ? t.coopRanks[coopTier.rank - 1] : "") +
          "</h1>" +
          '<p class="tabular" style="font-size:15px;color:#e2e8f0;margin-top:6px;">' +
          escapeHtml(t.teamScoredPrefix) +
          ' <strong class="mono" style="color:#ffffff;font-size:20px;">' + state.teamScore + "</strong> " +
          escapeHtml(DATA.pluralize(state.teamScore, "point", state.language)) + " · " +
          state.players.length + " " + escapeHtml(DATA.pluralize(state.players.length, "player", state.language)) + "</p>";
      }

      var bottomCard = "";
      if (state.mode === "competitive") {
        bottomCard =
          '<section class="card stack-sm">' +
          '  <h2 class="section-title">' + escapeHtml(t.finalTableTitle) + "</h2>" +
          "  <div>" +
          sorted
            .map(function (p, idx) {
              return (
                '<div class="player-row" style="justify-content:space-between;">' +
                '  <div style="display:flex;align-items:center;gap:10px;">' +
                '    <span class="mono" style="width:24px;font-weight:700;color:#94a3b8;">' + (idx + 1) + ".</span>" +
                '    <span class="color-badge" style="background:' + escapeHtml(p.color) + ';width:32px;height:32px;cursor:default;">' + escapeHtml((p.name || "?").slice(0, 1).toUpperCase()) + "</span>" +
                '    <strong style="font-size:15px;">' + escapeHtml(p.name) + "</strong>" +
                "  </div>" +
                '  <span class="mono" style="font-size:18px;font-weight:800;color:#13294b;">' + p.score + "</span>" +
                "</div>"
              );
            })
            .join("") +
          "  </div>" +
          "</section>";
      } else if (coopTable) {
        bottomCard =
          '<section class="card stack-sm">' +
          '  <h2 class="section-title">' + escapeHtml(t.coopResultTitle) + " (" + state.players.length + " " + escapeHtml(DATA.pluralize(state.players.length, "player", state.language)) + ")</h2>" +
          '  <div class="stack-sm" style="gap:6px;">' +
          coopTable
            .map(function (tier) {
              var active = coopTier && coopTier.rank === tier.rank;
              var range = tier.maxScore === null ? tier.minScore + "+" : tier.minScore + "–" + tier.maxScore;
              return (
                '<div style="display:flex;align-items:center;justify-content:space-between;gap:12px;padding:10px 12px;border-radius:12px;' +
                (active ? "background:#13294b;color:#ffffff;" : "background:#f8fafc;color:#334155;") +
                '">' +
                '  <span style="font-size:13px;font-weight:' + (active ? "800;color:#f4c430;" : "600;") + '">' + escapeHtml(t.coopRanks[tier.rank - 1]) + "</span>" +
                '  <span class="mono" style="font-size:13px;font-weight:800;flex-shrink:0;">' + range + "</span>" +
                "</div>"
              );
            })
            .join("") +
          "  </div>" +
          "</section>";
      }

      elMain.innerHTML =
        '<div class="stack-lg">' +
        '  <section class="navy-card stack-md" style="padding:24px;">' +
        '    <div style="display:flex;align-items:center;gap:10px;color:#f4c430;font-weight:700;font-size:14px;">' +
        ICONS.trophy +
        "      <span>" + escapeHtml(t.gameFinishedBadge) + "</span>" +
        "    </div>" +
        "    <div>" + heroBody + "</div>" +
        '    <div style="display:flex;flex-wrap:wrap;gap:10px;padding-top:6px;">' +
        '      <button type="button" class="btn btn-pink" data-action="start-game">' + escapeHtml(t.playAgainBtn) + "</button>" +
        '      <button type="button" class="btn" data-action="goto-page" data-page="setup" style="background:rgba(255,255,255,0.14);color:#ffffff;">' + escapeHtml(t.changeSettingsBtn) + "</button>" +
        "    </div>" +
        "  </section>" +
        bottomCard +
        "</div>";
      return;
    }

    // Active Scoring Screen
    var presenter = state.players[state.presenterIndex];
    var words = DATA.getTaskWords(state.activeTaskCard, state.cardSide, state.language);
    var yellowBonuses = DATA.getYellowBoardBonuses(state.players.length);

    var hasAnyDeltas =
      state.mode === "competitive"
        ? Object.keys(state.currentTurnDeltas).some(function (k) { return (state.currentTurnDeltas[k] || 0) !== 0; })
        : state.currentTurnTeamDelta !== 0;

    var revealLeft = "";
    if (state.secretWordNumber === null) {
      revealLeft = '<p style="font-size:12px;color:#cbd5e1;margin-top:3px;">' + escapeHtml(t.secretNotChosen) + "</p>";
    } else if (ui.scoringWordRevealed) {
      revealLeft =
        '<div class="font-display" style="font-size:21px;font-weight:800;color:#f4c430;margin-top:2px;">#' +
        state.secretWordNumber +
        " — " +
        escapeHtml(words[state.secretWordNumber - 1] || "") +
        "</div>";
    } else {
      revealLeft = '<div class="font-display" style="font-size:15px;font-weight:800;margin-top:2px;">' + escapeHtml(t.tokenFaceDownTitle) + "</div>";
    }

    var revealBtn =
      state.secretWordNumber !== null
        ? '<button type="button" class="btn ' + (ui.scoringWordRevealed ? "" : "btn-yellow") + '" data-action="toggle-scoring-reveal" style="' +
          (ui.scoringWordRevealed ? "background:rgba(255,255,255,0.16);color:#ffffff;" : "") +
          'min-height:42px;padding:8px 13px;font-size:12px;flex-shrink:0;">' +
          (ui.scoringWordRevealed ? ICONS.eyeOff : ICONS.eye) +
          "<span>" + escapeHtml(ui.scoringWordRevealed ? t.hideShort : t.revealSecretBtn) + "</span></button>"
        : "";

    var resetTurnBtn = hasAnyDeltas
      ? '<button type="button" class="btn btn-soft" data-action="reset-turn-deltas" style="min-height:36px;padding:6px 10px;font-size:12px;">' +
        ICONS.reset +
        "<span>" + escapeHtml(t.resetTurnDeltasBtn) + "</span></button>"
      : "";

    var scorePanelHtml = "";
    if (state.mode === "competitive") {
      var rowsHtml = state.players
        .map(function (player, idx) {
          var isPres = idx === state.presenterIndex;
          var delta = state.currentTurnDeltas[player.id] || 0;
          var deltaCls = delta > 0 ? "pos" : delta < 0 ? "neg" : "zero";

          var btnsHtml = PLAYER_DELTA_BUTTONS.map(function (d) {
            var cls =
              d < 0
                ? "delta-minus"
                : d === 1
                  ? "delta-p1"
                  : d === 2
                    ? "delta-p2"
                    : "delta-p3";
            var disabled = d < 0 && player.score <= 0 ? " disabled" : "";
            return (
              '<button type="button" class="delta-btn ' + cls + '" data-action="adj-player" data-id="' + escapeHtml(player.id) + '" data-delta="' + d + '"' + disabled + ">" +
              (d > 0 ? "+" + d : String(d)) +
              "</button>"
            );
          }).join("");

          return (
            '<div class="score-row">' +
            '  <div class="score-row-top">' +
            '    <div style="display:flex;align-items:center;gap:10px;min-width:0;">' +
            '      <span class="color-badge" style="background:' + escapeHtml(player.color) + ';width:32px;height:32px;font-size:13px;cursor:default;">' + (idx + 1) + "</span>" +
            '      <div style="min-width:0;">' +
            '        <div style="font-size:15px;font-weight:700;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + escapeHtml(player.name) + "</div>" +
            (isPres ? '<div style="font-size:11px;font-weight:700;color:#e03a88;">' + escapeHtml(t.presenter) + "</div>" : "") +
            "      </div>" +
            "    </div>" +
            '    <div class="score-metrics tabular">' +
            "      <div>" +
            '        <div style="font-size:10px;color:#94a3b8;">' + escapeHtml(t.thisTurnCol) + "</div>" +
            '        <div class="mono ' + deltaCls + '" style="font-size:14px;font-weight:800;">' + formatDelta(delta) + "</div>" +
            "      </div>" +
            '      <div style="min-width:38px;">' +
            '        <div style="font-size:10px;color:#94a3b8;">' + escapeHtml(t.totalCol) + "</div>" +
            '        <div class="mono" style="font-size:21px;font-weight:800;color:#13294b;">' + player.score + "</div>" +
            "      </div>" +
            "    </div>" +
            "  </div>" +
            '  <div class="delta-grid-4">' + btnsHtml + "</div>" +
            "</div>"
          );
        })
        .join("");

      scorePanelHtml =
        '<section id="score-table-section" class="card stack-md" style="scroll-margin-top:76px;">' +
        '  <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;">' +
        "    <div>" +
        '      <h1 class="section-title" style="font-size:18px;">' + escapeHtml(t.scoreTableTitle) + "</h1>" +
        '      <p class="muted tabular">' + escapeHtml(t.yellowBoardBonuses + ": " + yellowBonuses.join(" · ")) + "</p>" +
        "    </div>" +
        resetTurnBtn +
        "  </div>" +
        "  <div>" + rowsHtml + "</div>" +
        "</section>";
    } else {
      var teamBtns = state.mode === "coop_talk" ? COOP_TALK_DELTA_BUTTONS : COOP_MIND_DELTA_BUTTONS;
      var curRank = DATA.getCoopRank(state.mode, state.players.length, state.teamScore);
      var tdCls = state.currentTurnTeamDelta > 0 ? "pos" : state.currentTurnTeamDelta < 0 ? "neg" : "zero";

      var teamBtnsHtml = teamBtns
        .map(function (d) {
          var cls = d < 0 ? "delta-minus" : d >= 4 ? "delta-blue" : "delta-p1";
          var disabled = d < 0 && state.teamScore <= 0 ? " disabled" : "";
          return (
            '<button type="button" class="delta-btn ' + cls + '" data-action="adj-team" data-delta="' + d + '"' + disabled + ">" +
            (d > 0 ? "+" + d : String(d)) +
            "</button>"
          );
        })
        .join("");

      scorePanelHtml =
        '<section id="score-table-section" class="card stack-md" style="scroll-margin-top:76px;">' +
        '  <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:10px;">' +
        "    <div>" +
        '      <h1 class="section-title" style="font-size:18px;">' + escapeHtml(t.teamPanelTitle) + "</h1>" +
        '      <p class="muted tabular">' + escapeHtml(state.mode === "coop_talk" ? t.blueBoardBonuses : t.yellowBoardBonuses + ": " + yellowBonuses.join(" · ")) + "</p>" +
        "    </div>" +
        resetTurnBtn +
        "  </div>" +
        '  <div class="coop-score-box tabular">' +
        "    <div>" +
        '      <div class="muted">' + escapeHtml(t.thisTurnCol) + "</div>" +
        '      <div class="mono ' + tdCls + '" style="font-size:30px;font-weight:800;margin-top:2px;">' + formatDelta(state.currentTurnTeamDelta) + "</div>" +
        "    </div>" +
        '    <div style="text-align:right;">' +
        '      <div class="muted">' + escapeHtml(t.totalCol) + "</div>" +
        '      <div class="mono" style="font-size:30px;font-weight:800;color:#13294b;margin-top:2px;">' + state.teamScore + "</div>" +
        "    </div>" +
        "  </div>" +
        '  <div class="delta-grid-5">' + teamBtnsHtml + "</div>" +
        '  <div style="padding-top:10px;border-top:1px solid #f1f5f9;">' +
        '    <div class="muted">' + escapeHtml(t.currentRankLabel) + "</div>" +
        '    <div class="font-display" style="font-size:15px;font-weight:800;color:#2563eb;margin-top:2px;">' + escapeHtml(t.coopRanks[curRank.rank - 1]) + "</div>" +
        "  </div>" +
        "</section>";
    }

    var isFinal = state.currentTurnInGame >= totalTurns;
    var nextSideLabel = state.cardSide === "A" ? t.sideB : t.sideA;
    var nextHint = isFinal
      ? t.turnCompleteHintFinal
      : state.cardsUsedCount === 0
        ? t.turnCompleteHintFlipPrefix + " " + nextSideLabel + "."
        : t.turnCompleteHintDraw;

    var isUnrevealed = state.secretWordNumber !== null && !ui.scoringWordRevealed;
    var confirmMessage =
      isUnrevealed && !hasAnyDeltas
        ? t.confirmNextTurnBoth
        : isUnrevealed
          ? t.confirmNextTurnUnrevealed
          : t.confirmNextTurnNoPoints;

    var nextTurnCtaHtml = ui.scoringConfirmAdvance
      ? '<div class="confirm-card">' +
        '  <div style="display:flex;align-items:flex-start;gap:10px;">' +
        '    <span style="color:#d97706;flex-shrink:0;margin-top:2px;">' + ICONS.alert + "</span>" +
        '    <p style="font-size:13px;font-weight:600;line-height:1.4;">' + escapeHtml(confirmMessage) + "</p>" +
        "  </div>" +
        '  <div class="grid-2btn">' +
        '    <button type="button" class="btn btn-outline" data-action="cancel-next-turn" style="border-color:#fcd34d;font-size:13px;">' + escapeHtml(t.cancelBtn) + "</button>" +
        '    <button type="button" class="btn btn-pink" data-action="confirm-next-turn" style="font-size:13px;">' + escapeHtml(t.confirmNextTurnBtn) + "</button>" +
        "  </div>" +
        "</div>"
      : '<button type="button" class="btn btn-pink btn-full" data-action="next-turn">' +
        "  <span>" + escapeHtml(isFinal ? t.finishGameBtn : t.nextTurnBtn) + "</span>" +
        ICONS.arrowRight +
        "</button>";

    var historySection = "";
    if (state.history.length > 0) {
      var histItems = state.history
        .map(function (item) {
          return (
            '<div class="player-row" style="justify-content:space-between;font-size:12px;">' +
            '  <div style="min-width:0;">' +
            '    <div style="font-weight:700;color:#1e293b;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' +
            escapeHtml(t.turn + " " + item.turnNumber + " · " + item.presenterName + " — «" + item.secretWord + "»") +
            "    </div>" +
            '    <div class="muted tabular">' + escapeHtml(t.round + " " + item.roundNumber + " · " + t.sideLabel + " " + (item.cardSide === "A" ? t.sideA : t.sideB)) + "</div>" +
            "  </div>" +
            '  <span class="mono" style="font-weight:800;color:#13294b;flex-shrink:0;">' + escapeHtml(item.pointsSummary) + "</span>" +
            "</div>"
          );
        })
        .join("");

      historySection =
        '<section class="accordion-card">' +
        '  <button type="button" class="accordion-trigger" data-action="toggle-history-acc">' +
        "    <span>" + escapeHtml(t.historyTitle) + " (" + state.history.length + ")</span>" +
        '    <span class="accordion-chevron">' + (ui.scoringHistoryOpenMobile ? ICONS.chevronUp : ICONS.chevronDown) + "</span>" +
        "  </button>" +
        '  <div class="accordion-body' + (ui.scoringHistoryOpenMobile ? "" : " mobile-collapsed hidden") + '" style="max-height:260px;overflow-y:auto;">' +
        histItems +
        "  </div>" +
        "</section>";
    }

    elMain.innerHTML =
      '<div class="grid-main">' +
      '  <div class="stack-md">' +
      '    <section class="reveal-bar">' +
      '      <div style="min-width:0;">' +
      '        <div style="font-size:11px;color:#cbd5e1;font-weight:600;">' + escapeHtml(t.revealSecretTitle + " · " + (presenter ? presenter.name : "")) + "</div>" +
      revealLeft +
      "      </div>" +
      revealBtn +
      "    </section>" +
      scorePanelHtml +
      '    <div class="stack-sm">' +
      nextTurnCtaHtml +
      '      <p class="muted" style="text-align:center;padding:0 8px;">' + escapeHtml(nextHint) + "</p>" +
      '      <button type="button" class="btn btn-ghost btn-full" data-action="goto-page" data-page="board">' +
      ICONS.arrowLeft +
      "        <span>" + escapeHtml(t.backToBoardBtn) + "</span>" +
      "      </button>" +
      "    </div>" +
      "  </div>" +
      '  <aside class="stack-md">' +
      '    <section class="accordion-card">' +
      '      <button type="button" class="accordion-trigger" data-action="toggle-rules-acc">' +
      "        <span>" + escapeHtml(t.scoringRulesTitle + " · " + t.modes[state.mode].title) + "</span>" +
      '        <span class="accordion-chevron">' + (ui.scoringRulesOpenMobile ? ICONS.chevronUp : ICONS.chevronDown) + "</span>" +
      "      </button>" +
      '      <div class="accordion-body' + (ui.scoringRulesOpenMobile ? "" : " mobile-collapsed hidden") + '">' +
      renderScoringRulesBullets() +
      "      </div>" +
      "    </section>" +
      historySection +
      "  </aside>" +
      "</div>";
  }

  // ---------- Page 5: Rules & Custom Decks ----------
  function renderCoopTableHtml(title, tableData) {
    var t = getT();
    var counts = [2, 3, 4, 5, 6, 7, 8];
    var headerCols = counts
      .map(function (n) {
        return '<th class="mono" style="color:#13294b;">' + n + " " + escapeHtml(t.tablePlayersShort) + "</th>";
      })
      .join("");

    var bodyRows = [0, 1, 2, 3, 4]
      .map(function (rowIdx) {
        var cells = counts
          .map(function (n) {
            var cell = tableData[n][rowIdx];
            var txt = cell.maxScore === null ? cell.minScore + "+" : cell.minScore + "–" + cell.maxScore;
            return '<td class="mono">' + txt + "</td>";
          })
          .join("");
        return "<tr><td style=\"font-weight:600;color:#1e293b;\">" + escapeHtml(t.coopRanks[rowIdx]) + "</td>" + cells + "</tr>";
      })
      .join("");

    return (
      '<section class="card stack-sm">' +
      '  <h2 class="section-title">' + escapeHtml(title) + "</h2>" +
      '  <div class="table-scroll">' +
      '    <table class="coop-table">' +
      "      <thead><tr><th>" + escapeHtml(t.tableResultCol) + "</th>" + headerCols + "</tr></thead>" +
      "      <tbody>" + bodyRows + "</tbody>" +
      "    </table>" +
      "  </div>" +
      "</section>"
    );
  }

  function renderRulesPage() {
    var t = getT();
    var tabButtons = [
      { id: "rules", label: t.tabRules },
      { id: "tables", label: t.tabTables },
      { id: "decks", label: t.tabDecks }
    ]
      .map(function (item) {
        return (
          '<button type="button" class="tab-btn' + (ui.rulesTab === item.id ? " active" : "") + '" data-action="set-rules-tab" data-tab="' + item.id + '">' +
          escapeHtml(item.label) +
          "</button>"
        );
      })
      .join("");

    var bodyHtml = "";
    if (ui.rulesTab === "rules") {
      bodyHtml =
        '<div class="grid-2col">' +
        '  <article class="card stack-sm">' +
        '    <h2 class="section-title">' + escapeHtml(t.rulesSec1Title) + "</h2>" +
        '    <ol class="stack-sm" style="font-size:14px;line-height:1.5;color:#334155;">' +
        t.rulesSec1Items
          .map(function (it) {
            return '<li><strong style="color:#13294b;">' + escapeHtml(it.label) + "</strong> " + escapeHtml(it.text) + "</li>";
          })
          .join("") +
        "    </ol>" +
        "  </article>" +
        '  <article class="card stack-sm">' +
        '    <h2 class="section-title">' + escapeHtml(t.rulesSec2Title) + "</h2>" +
        '    <ul class="stack-sm" style="font-size:14px;line-height:1.5;color:#334155;">' +
        t.rulesSec2Items
          .map(function (it) {
            return '<li><strong style="color:#13294b;">' + escapeHtml(it.label) + "</strong> " + escapeHtml(it.text) + "</li>";
          })
          .join("") +
        "    </ul>" +
        "  </article>" +
        '  <article class="card stack-sm" style="grid-column:1 / -1;">' +
        '    <h2 class="section-title">' + escapeHtml(t.rulesSec3Title) + "</h2>" +
        '    <div class="grid-2col" style="font-size:14px;line-height:1.5;color:#334155;">' +
        '      <div class="stack-sm" style="gap:6px;">' +
        '        <h3 class="font-display" style="font-size:15px;font-weight:800;color:#2563eb;">' + escapeHtml(t.rulesCoopTalkTitle) + "</h3>" +
        "        <p>" + escapeHtml(t.rulesCoopTalkDesc) + "</p>" +
        "      </div>" +
        '      <div class="stack-sm" style="gap:6px;">' +
        '        <h3 class="font-display" style="font-size:15px;font-weight:800;color:#e03a88;">' + escapeHtml(t.rulesCoopMindTitle) + "</h3>" +
        "        <p>" + escapeHtml(t.rulesCoopMindDesc) + "</p>" +
        "      </div>" +
        "    </div>" +
        "  </article>" +
        "</div>";
    } else if (ui.rulesTab === "tables") {
      bodyHtml =
        '<div class="stack-lg">' +
        renderCoopTableHtml(t.tableTalkTitle, DATA.COOP_TALK_TABLE) +
        renderCoopTableHtml(t.tableMindTitle, DATA.COOP_MIND_TABLE) +
        "</div>";
    } else {
      var totalDefs = DATA.BASE_DEFINITION_CARDS.length + state.customDefinitions.length;
      var totalTasks = DATA.BASE_TASK_CARDS.length + state.customTasks.length;

      var customDefsList = state.customDefinitions.length
        ? '<div style="padding-top:10px;border-top:1px solid #f1f5f9;">' +
          state.customDefinitions
            .map(function (c) {
              return (
                '<div class="player-row" style="justify-content:space-between;font-size:13px;">' +
                '  <span style="font-weight:600;">' + escapeHtml(c.sideA + " / " + c.sideB) + "</span>" +
                '  <button type="button" class="icon-btn" data-action="del-custom" data-type="definition" data-id="' + escapeHtml(c.id) + '" aria-label="Delete">' + ICONS.trash + "</button>" +
                "</div>"
              );
            })
            .join("") +
          "</div>"
        : "";

      var customTasksList = state.customTasks.length
        ? '<div style="padding-top:10px;border-top:1px solid #f1f5f9;">' +
          state.customTasks
            .map(function (c) {
              return (
                '<div class="player-row" style="justify-content:space-between;font-size:13px;">' +
                '  <span style="font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + escapeHtml(t.sideA + ": " + c.sideA.join(", ")) + "</span>" +
                '  <button type="button" class="icon-btn" data-action="del-custom" data-type="task" data-id="' + escapeHtml(c.id) + '" aria-label="Delete">' + ICONS.trash + "</button>" +
                "</div>"
              );
            })
            .join("") +
          "</div>"
        : "";

      var taskInputsA = [1, 2, 3, 4, 5]
        .map(function (n) {
          return '<input type="text" required name="taskA' + n + '" class="text-input" placeholder="' + escapeHtml(t.wordPlaceholder + " " + n) + '" />';
        })
        .join("");

      var taskInputsB = [1, 2, 3, 4, 5]
        .map(function (n) {
          return '<input type="text" required name="taskB' + n + '" class="text-input" placeholder="' + escapeHtml(t.wordPlaceholder + " " + n) + '" />';
        })
        .join("");

      bodyHtml =
        '<div class="stack-lg">' +
        '  <div class="grid-2btn" style="gap:12px;">' +
        '    <div class="card">' +
        '      <div class="muted">' + escapeHtml(t.defDeckCardTitle) + "</div>" +
        '      <div class="mono" style="font-size:26px;font-weight:800;color:#13294b;margin-top:4px;">' + totalDefs + "</div>" +
        '      <div class="muted tabular">' + totalDefs * 2 + " " + escapeHtml(DATA.pluralize(totalDefs * 2, "side", state.language)) + " (" + escapeHtml(t.customWord) + ": " + state.customDefinitions.length + ")</div>" +
        "    </div>" +
        '    <div class="card">' +
        '      <div class="muted">' + escapeHtml(t.taskDeckCardTitle) + "</div>" +
        '      <div class="mono" style="font-size:26px;font-weight:800;color:#13294b;margin-top:4px;">' + totalTasks + "</div>" +
        '      <div class="muted tabular">' + totalTasks * 10 + " " + escapeHtml(DATA.pluralize(totalTasks * 10, "word", state.language)) + " (" + escapeHtml(t.customWord) + ": " + state.customTasks.length + ")</div>" +
        "    </div>" +
        "  </div>" +
        (ui.savedToast ? '<div class="toast-success">' + escapeHtml(ui.savedToast) + "</div>" : "") +
        '  <div class="grid-2col">' +
        '    <form id="custom-def-form" class="card stack-md">' +
        "      <div>" +
        '        <h2 class="section-title">' + escapeHtml(t.addDefTitle) + "</h2>" +
        '        <p class="muted" style="margin-top:2px;">' + escapeHtml(t.addDefDesc) + "</p>" +
        "      </div>" +
        '      <div class="grid-2btn" style="gap:10px;">' +
        '        <label class="stack-sm" style="gap:4px;">' +
        '          <span class="muted" style="font-weight:600;">' + escapeHtml(t.sideAInput) + "</span>" +
        '          <input type="text" required name="defA" class="text-input" placeholder="' + escapeHtml(t.defPlaceholderA) + '" />' +
        "        </label>" +
        '        <label class="stack-sm" style="gap:4px;">' +
        '          <span class="muted" style="font-weight:600;">' + escapeHtml(t.sideBInput) + "</span>" +
        '          <input type="text" required name="defB" class="text-input" placeholder="' + escapeHtml(t.defPlaceholderB) + '" />' +
        "        </label>" +
        "      </div>" +
        '      <button type="submit" class="btn btn-yellow btn-full">' + ICONS.plus + "<span>" + escapeHtml(t.addDefBtn) + "</span></button>" +
        customDefsList +
        "    </form>" +
        '    <form id="custom-task-form" class="card stack-md">' +
        "      <div>" +
        '        <h2 class="section-title">' + escapeHtml(t.addTaskTitle) + "</h2>" +
        '        <p class="muted" style="margin-top:2px;">' + escapeHtml(t.addTaskDesc) + "</p>" +
        "      </div>" +
        '      <div class="grid-2btn" style="gap:12px;">' +
        '        <div class="stack-sm" style="gap:8px;">' +
        '          <div style="font-size:12px;font-weight:700;color:#13294b;">' + escapeHtml(t.sideAInput) + " (1–5)</div>" +
        taskInputsA +
        "        </div>" +
        '        <div class="stack-sm" style="gap:8px;">' +
        '          <div style="font-size:12px;font-weight:700;color:#13294b;">' + escapeHtml(t.sideBInput) + " (1–5)</div>" +
        taskInputsB +
        "        </div>" +
        "      </div>" +
        '      <button type="submit" class="btn btn-navy btn-full">' + ICONS.plus + "<span>" + escapeHtml(t.addTaskBtn) + "</span></button>" +
        customTasksList +
        "    </form>" +
        "  </div>" +
        "</div>";
    }

    var isOnline = navigator.onLine;
    var reinstallBtnsHtml =
      !ui.confirmReinstall || !isOnline
        ? '<button type="button" class="btn btn-soft" data-action="ask-reinstall"' + (!isOnline ? " disabled" : "") + ' style="font-size:13px;">' +
          ICONS.reset +
          "<span>" + escapeHtml(t.reinstallBtn) + "</span></button>"
        : '<div style="display:flex;flex-wrap:wrap;gap:8px;">' +
          '  <button type="button" class="btn btn-navy" data-action="confirm-reinstall"' + (ui.reinstalling ? " disabled" : "") + ' style="font-size:13px;">' +
          ICONS.reset +
          "    <span>" + escapeHtml(ui.reinstalling ? t.reinstallProgress : t.reinstallConfirmBtn) + "</span>" +
          "  </button>" +
          '  <button type="button" class="btn btn-soft" data-action="cancel-reinstall"' + (ui.reinstalling ? " disabled" : "") + ' style="font-size:13px;">' +
          escapeHtml(t.reinstallCancelBtn) +
          "  </button>" +
          "</div>";

    var offlineReinstallWarning = !isOnline
      ? '<p style="font-size:12px;font-weight:600;color:#b45309;margin-top:4px;">' + escapeHtml(t.reinstallOfflineHint) + "</p>"
      : "";

    elMain.innerHTML =
      '<div class="stack-lg">' +
      '  <section class="setup-top" style="padding-bottom:12px;border-bottom:1px solid #e2e8f0;">' +
      '    <h1 class="page-title">' + escapeHtml(t.rulesPageTitle) + "</h1>" +
      '    <div class="tabs-bar">' + tabButtons + "</div>" +
      "  </section>" +
      bodyHtml +
      '  <section class="card setup-top" style="gap:14px;">' +
      '    <div class="stack-sm" style="gap:4px;max-width:560px;">' +
      '      <h2 class="section-title">' + escapeHtml(t.reinstallTitle) + "</h2>" +
      '      <p class="muted" style="line-height:1.45;">' + escapeHtml(t.reinstallDesc) + "</p>" +
      offlineReinstallWarning +
      "    </div>" +
      '    <div style="flex-shrink:0;">' + reinstallBtnsHtml + "</div>" +
      "  </section>" +
      "</div>";
  }

  function renderMain() {
    if (activePage === "setup") {
      renderSetupPage();
    } else if (activePage === "task") {
      renderTaskPage();
    } else if (activePage === "board") {
      renderBoardPage();
    } else if (activePage === "scoring") {
      renderScoringPage();
    } else if (activePage === "rules") {
      renderRulesPage();
    } else {
      renderSetupPage();
    }
  }

  function renderAll() {
    renderHeader();
    renderContextStrip();
    renderMain();
    renderModals();
    renderOfflineToast();
  }

  // ---------- Global Delegated Event Handlers ----------
  elLogoBtn.addEventListener("click", function () {
    ui.exitModalOpen = true;
    renderModals();
  });

  elLangBtn.addEventListener("click", toggleLanguage);
  elRulesBtn.addEventListener("click", toggleRulesPage);

  // Close modals on backdrop click or Escape
  elExitModal.addEventListener("click", function (e) {
    if (e.target === elExitModal) {
      ui.exitModalOpen = false;
      renderModals();
    }
  });
  elIosModal.addEventListener("click", function (e) {
    if (e.target === elIosModal) {
      ui.iosModalOpen = false;
      renderModals();
    }
  });

  window.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      if (ui.exitModalOpen || ui.iosModalOpen) {
        ui.exitModalOpen = false;
        ui.iosModalOpen = false;
        renderModals();
      }
    }
  });

  // Delegated click handler across app shell
  document.getElementById("app").addEventListener("click", function (e) {
    var target = e.target;
    if (!target || !target.closest) return;
    var btn = target.closest("[data-action]");
    if (!btn || btn.disabled) return;

    var action = btn.getAttribute("data-action");

    switch (action) {
      case "toggle-sound":
        toggleSound();
        break;
      case "pwa-install":
        triggerInstall();
        break;
      case "close-exit":
        ui.exitModalOpen = false;
        renderModals();
        break;
      case "exit-menu":
        exitToSetup(false);
        break;
      case "exit-reset":
        exitToSetup(true);
        break;
      case "close-ios":
        ui.iosModalOpen = false;
        renderModals();
        break;
      case "goto-page":
        setPage(btn.getAttribute("data-page") || "setup");
        break;
      case "goto-board":
        ui.taskPeeking = false;
        setPage("board");
        break;
      case "set-mode":
        setMode(btn.getAttribute("data-mode"));
        break;
      case "add-player":
        addPlayer();
        break;
      case "remove-player":
        removePlayer(btn.getAttribute("data-id"));
        break;
      case "cycle-color":
        cyclePlayerColor(btn.getAttribute("data-id"));
        break;
      case "reset-match":
        resetMatch();
        break;
      case "start-game":
        startNewGame();
        break;
      case "flip-side":
        flipCardsSide();
        break;
      case "new-task-card":
        drawNewTaskCard();
        break;
      case "draw-secret":
        drawRandomSecretWord();
        break;
      case "toggle-task-peek":
        ui.taskPeeking = !ui.taskPeeking;
        vibrateTap(12);
        renderMain();
        break;
      case "toggle-manual-picker":
        ui.taskManualPickerOpen = !ui.taskManualPickerOpen;
        renderMain();
        if (ui.taskManualPickerOpen) {
          scrollToId("task-secret-section", "center");
        }
        break;
      case "pick-secret":
        setManualSecretWord(Number(btn.getAttribute("data-num")));
        break;
      case "toggle-board-peek":
        ui.boardPeekSecret = !ui.boardPeekSecret;
        vibrateTap(10);
        renderMain();
        break;
      case "slot-split":
        setSlotDiscSplit(Number(btn.getAttribute("data-slot")), Number(btn.getAttribute("data-left")));
        break;
      case "nudge-left": {
        var sIdxL = Number(btn.getAttribute("data-slot"));
        var slotL = state.boardSlots[sIdxL];
        if (slotL && !slotL.locked) {
          var nextL = slotL.leftCount === null ? 6 : Math.min(6, slotL.leftCount + 1);
          setSlotDiscSplit(sIdxL, nextL);
        }
        break;
      }
      case "nudge-right": {
        var sIdxR = Number(btn.getAttribute("data-slot"));
        var slotR = state.boardSlots[sIdxR];
        if (slotR && !slotR.locked) {
          var nextR = slotR.leftCount === null ? 0 : Math.max(0, slotR.leftCount - 1);
          setSlotDiscSplit(sIdxR, nextR);
        }
        break;
      }
      case "lock-slot":
        lockSlotAndScroll(Number(btn.getAttribute("data-slot")));
        break;
      case "unlock-last-slot":
        unlockLastSlot();
        break;
      case "toggle-scoring-reveal":
        ui.scoringWordRevealed = !ui.scoringWordRevealed;
        if (ui.scoringWordRevealed) {
          ui.scoringConfirmAdvance = false;
        }
        vibrateTap(ui.scoringWordRevealed ? 18 : 10);
        renderMain();
        if (ui.scoringWordRevealed) {
          scrollToId("score-table-section", "start");
        }
        break;
      case "adj-player":
        adjustPlayerTurnScore(btn.getAttribute("data-id"), Number(btn.getAttribute("data-delta")));
        break;
      case "adj-team":
        adjustTeamTurnScore(Number(btn.getAttribute("data-delta")));
        break;
      case "reset-turn-deltas":
        resetCurrentTurnDeltas();
        break;
      case "next-turn": {
        var hasDeltas =
          state.mode === "competitive"
            ? Object.keys(state.currentTurnDeltas).some(function (k) { return (state.currentTurnDeltas[k] || 0) !== 0; })
            : state.currentTurnTeamDelta !== 0;
        var wordUnrevealed = state.secretWordNumber !== null && !ui.scoringWordRevealed;
        if ((wordUnrevealed || !hasDeltas) && !ui.scoringConfirmAdvance) {
          vibrateTap(12);
          ui.scoringConfirmAdvance = true;
          renderMain();
        } else {
          completeTurnAndAdvance();
        }
        break;
      }
      case "cancel-next-turn":
        ui.scoringConfirmAdvance = false;
        renderMain();
        break;
      case "confirm-next-turn":
        completeTurnAndAdvance();
        break;
      case "toggle-rules-acc":
        ui.scoringRulesOpenMobile = !ui.scoringRulesOpenMobile;
        renderMain();
        break;
      case "toggle-history-acc":
        ui.scoringHistoryOpenMobile = !ui.scoringHistoryOpenMobile;
        renderMain();
        break;
      case "set-rules-tab":
        ui.rulesTab = btn.getAttribute("data-tab") || "rules";
        renderMain();
        window.scrollTo({ top: 0, behavior: "smooth" });
        break;
      case "del-custom":
        deleteCustomCard(btn.getAttribute("data-type"), btn.getAttribute("data-id"));
        break;
      case "ask-reinstall":
        if (!navigator.onLine) break;
        vibrateTap(12);
        ui.confirmReinstall = true;
        renderMain();
        break;
      case "cancel-reinstall":
        vibrateTap(8);
        ui.confirmReinstall = false;
        renderMain();
        break;
      case "confirm-reinstall":
        reinstallApp();
        break;
    }
  });

  // Update player names in-place without re-rendering DOM (keeps focus & keyboard open!)
  elMain.addEventListener("input", function (e) {
    var input = e.target;
    if (!input || !input.getAttribute) return;
    var pid = input.getAttribute("data-player-input");
    if (!pid) return;
    for (var i = 0; i < state.players.length; i++) {
      if (state.players[i].id === pid) {
        state.players[i].name = input.value;
        saveState();
        break;
      }
    }
  });

  // Custom deck forms submit handler
  elMain.addEventListener("submit", function (e) {
    var form = e.target;
    if (!form) return;
    if (form.id === "custom-def-form") {
      e.preventDefault();
      var fd = new FormData(form);
      var a = String(fd.get("defA") || "").trim();
      var b = String(fd.get("defB") || "").trim();
      if (!a || !b) return;
      addCustomDefinitionCard(a, b);
    } else if (form.id === "custom-task-form") {
      e.preventDefault();
      var ft = new FormData(form);
      var sideA = [];
      var sideB = [];
      for (var i = 1; i <= 5; i++) {
        var wa = String(ft.get("taskA" + i) || "").trim();
        var wb = String(ft.get("taskB" + i) || "").trim();
        if (!wa || !wb) return;
        sideA.push(wa);
        sideB.push(wb);
      }
      addCustomTaskCard(sideA, sideB);
    }
  });

  // Pointer drag on explanation board disc grooves
  var activeDragSlot = null;

  function applyGroovePointer(grooveEl, clientX) {
    var slotIdx = Number(grooveEl.getAttribute("data-groove-slot"));
    var activeSlotIndex = findActiveSlotIndex();
    if (slotIdx !== activeSlotIndex) return;
    var rect = grooveEl.getBoundingClientRect();
    if (rect.width <= 0) return;
    var ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    var leftCount = Math.round((1 - ratio) * 6);
    setSlotDiscSplit(slotIdx, leftCount);
  }

  elMain.addEventListener("pointerdown", function (e) {
    var groove = e.target && e.target.closest ? e.target.closest("[data-groove-slot]") : null;
    if (!groove || !groove.classList.contains("editable")) return;
    activeDragSlot = Number(groove.getAttribute("data-groove-slot"));
    try {
      groove.setPointerCapture(e.pointerId);
    } catch (err) {}
    applyGroovePointer(groove, e.clientX);
  });

  elMain.addEventListener("pointermove", function (e) {
    if (activeDragSlot === null) return;
    var groove = elMain.querySelector('[data-groove-slot="' + activeDragSlot + '"]');
    if (!groove || !groove.classList.contains("editable")) {
      activeDragSlot = null;
      return;
    }
    applyGroovePointer(groove, e.clientX);
  });

  window.addEventListener("pointerup", function () {
    activeDragSlot = null;
  });
  window.addEventListener("pointercancel", function () {
    activeDragSlot = null;
  });

  // Keyboard support on explanation board disc grooves (ArrowLeft / ArrowRight / Home / End)
  elMain.addEventListener("keydown", function (e) {
    var groove = e.target && e.target.closest ? e.target.closest("[data-groove-slot]") : null;
    if (!groove || !groove.classList.contains("editable")) return;
    var slotIdx = Number(groove.getAttribute("data-groove-slot"));
    var slot = state.boardSlots[slotIdx];
    if (!slot || slot.locked) return;
    var cur = slot.leftCount === null ? 3 : slot.leftCount;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setSlotDiscSplit(slotIdx, Math.min(6, cur + 1));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setSlotDiscSplit(slotIdx, Math.max(0, cur - 1));
    } else if (e.key === "Home") {
      e.preventDefault();
      setSlotDiscSplit(slotIdx, 6);
    } else if (e.key === "End") {
      e.preventDefault();
      setSlotDiscSplit(slotIdx, 0);
    }
  });

  // ---------- Accidental Reload / Tab-Close Protection ----------
  window.addEventListener("beforeunload", function (e) {
    if (allowIntentionalReload) return;
    if (state.gameStarted && !state.gameFinished) {
      e.preventDefault();
      e.returnValue = "";
    }
  });

  // ---------- Online / Offline & PWA Install Events ----------
  function handleConnectivityChange() {
    if (!navigator.onLine) {
      ui.confirmReinstall = false;
    }
    renderOfflineToast();
    if (activePage === "rules") {
      renderMain();
    }
  }

  window.addEventListener("online", handleConnectivityChange);
  window.addEventListener("offline", handleConnectivityChange);

  window.addEventListener("beforeinstallprompt", function (e) {
    e.preventDefault();
    pwa.deferredPrompt = e;
    renderAll();
  });

  window.addEventListener("appinstalled", function () {
    pwa.isInstalled = true;
    pwa.deferredPrompt = null;
    renderAll();
  });

  // ---------- Isolated Service Worker Registration (GitHub Pages Safe) ----------
  if ("serviceWorker" in navigator && (window.location.protocol === "https:" || window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")) {
    window.addEventListener("load", function () {
      navigator.serviceWorker
        .register("./sw.js", { scope: "./" })
        .catch(function (err) {
          console.warn("Service Worker registration skipped:", err);
        });
    });
  }

  // Initial render & wake lock sync
  syncWakeLock();
  renderAll();
})();
