/* ============================================================
   BABU'S BIRTHDAY WORLD — SCRIPT
   ------------------------------------------------------------
   Everything personal lives in config.js. This file renders it,
   handles the modals, the song, the ambient sound,
   the envelope, the confetti, and the little interactions.
   ============================================================ */

(() => {
  "use strict";

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const esc = (value) =>
    String(value ?? "").replace(/[&<>"']/g, (character) => {
      const entities = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      };
      return entities[character];
    });

  const setText = (id, value) => {
    if (value === undefined || value === null) return;
    const element = document.getElementById(id);
    if (element) element.textContent = value;
  };

  const paragraphs = (items) =>
    (items || []).map((item) => `<p>${esc(item)}</p>`).join("");

  const mod = (value, length) => ((value % length) + length) % length;

  const formatTime = (seconds) => {
    if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const remainder = Math.floor(seconds % 60);
    return `${minutes}:${String(remainder).padStart(2, "0")}`;
  };

  const state = {
    galleryPhotos: [],
    activeLightbox: 0
  };

  let lastFocused = null;
  let modalOnClose = null;
  let ambient = null;
  let ambientOn = false;

  /* ----------------------------------------------------------
     RENDER THE WORDS
     ---------------------------------------------------------- */
  function renderText() {
    const { names, birthday, hero, memories, reasons, surprises, letter, wish } = CONFIG;

    document.title = `Happy Birthday, ${names.him} ♡`;
    setText("navBrand", names.him);
    setText("footerName", names.him);
    setText("footerSignature", names.signature);

    const initial = String(names.her || "K").trim().charAt(0).toUpperCase() || "K";
    $$(".envelope__seal, .letter-paper__seal").forEach((seal) => {
      seal.textContent = initial;
    });

    setText("heroName", `My ${names.him}!`);
    setText("heroIntro", hero.intro);
    setText("heroSignature", `with my whole heart, ${names.her} ♡`);
    setText("heroDate", birthday.display);
    setText("heroDateLabel", birthday.label);
    setText("heroButtonLabel", hero.button);
    setText("heroLetterLabel", hero.letterButton);
    setText("heroScroll", hero.scroll);

    setText("memoriesIntro", memories.intro);
    setText("moreMemoryLabel", memories.hiddenButton);

    setText("reasonsIntro", reasons.intro);
    setText("reasonsClosing", reasons.closing);
    setText("reasonsSignature", `— ${names.her} ♡`);

    setText("surprisesIntro", surprises.intro);

    setText("letterIntro", letter.intro);
    setText("envelopeLabel", letter.envelopeLabel);
    setText("envelopeHint", letter.envelopeHint);
    setText("letterDate", birthday.display);
    setText("letterHeading", letter.heading);
    setText("letterBody", "");

    const letterBody = $("#letterBody");
    if (letterBody) letterBody.innerHTML = paragraphs(letter.paragraphs);

    setText("letterClosing", letter.closing);
    setText("letterSignature", letter.signature);
    setText("letterPS", letter.ps || "");
    setText("closeLetter", letter.closeLabel);

    const ps = $("#letterPS");
    if (ps && !letter.ps) ps.hidden = true;

    setText("wishIntro", wish.intro);
    setText("wishButtonLabel", wish.button);
    setText("wishMessageText", wish.message);
    setText("wishSignature", wish.signature);
  }

  /* ----------------------------------------------------------
     GALLERY
     ---------------------------------------------------------- */
  function polaroidElement(photo, index) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "polaroid";
    button.dataset.index = String(index);
    button.setAttribute("aria-label", `Open memory: ${photo.caption || "photo"}`);

    button.innerHTML = `
      <img src="${esc(photo.src)}" alt="${esc(photo.alt)}"
           width="${Number(photo.width) || 1200}"
           height="${Number(photo.height) || 900}"
           loading="lazy" decoding="async">
      ${photo.caption ? `<span class="polaroid__caption">${esc(photo.caption)}</span>` : ""}
      ${photo.meta ? `<span class="polaroid__meta">${esc(photo.meta)}</span>` : ""}
      <span class="polaroid__view" aria-hidden="true">↗</span>
    `;

    button.addEventListener("click", () => openLightbox(index));
    return button;
  }

  function renderGallery() {
    state.galleryPhotos = CONFIG.memories.photos.map((photo) => ({ ...photo }));
    const gallery = $("#gallery");
    if (!gallery) return;

    gallery.innerHTML = "";
    state.galleryPhotos.forEach((photo, index) => {
      gallery.appendChild(polaroidElement(photo, index));
    });

    const moreButton = $("#moreMemory");
    if (moreButton && !CONFIG.memories.hidden) {
      moreButton.hidden = true;
    }
  }

  function revealHiddenMemory() {
    const moreButton = $("#moreMemory");
    if (!moreButton || !CONFIG.memories.hidden) return;
    if (moreButton.dataset.revealed === "true") return;

    const index = state.galleryPhotos.length;
    const photo = { ...CONFIG.memories.hidden };
    state.galleryPhotos.push(photo);

    const gallery = $("#gallery");
    const button = polaroidElement(photo, index);
    button.classList.add("polaroid--in");
    gallery.appendChild(button);

    moreButton.dataset.revealed = "true";
    moreButton.setAttribute("aria-expanded", "true");
    moreButton.hidden = true;

    const note = $("#moreMemoryNote");
    if (note) {
      note.hidden = false;
      note.textContent = CONFIG.memories.hiddenNote;
    }

    window.setTimeout(() => {
      button.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "center"
      });
      button.focus({ preventScroll: true });
    }, 120);
  }

  /* ----------------------------------------------------------
     WHY I LOVE YOU
     ---------------------------------------------------------- */
  const heartPath =
    "M50 88 C50 88 6 60 6 32 C6 14 22 6 36 6 C44 6 50 12 50 12 C50 12 56 6 64 6 C78 6 94 14 94 32 C94 60 50 88 50 88 Z";

  function renderReasons() {
    const hearts = $("#hearts");
    if (!hearts) return;

    hearts.innerHTML = CONFIG.reasons.items
      .map(
        (item, index) => `
        <button class="heart-card" type="button" data-index="${index}"
                aria-label="Open reason: ${esc(item.title)}">
          <svg class="heart-card__shape" viewBox="0 0 100 94" aria-hidden="true" focusable="false">
            <path d="${heartPath}"></path>
          </svg>
          <span class="heart-card__title">${esc(item.title)}</span>
        </button>
      `
      )
      .join("");

    $$(".heart-card", hearts).forEach((button) => {
      button.addEventListener("click", () => openReason(Number(button.dataset.index)));
    });
  }

  function openReason(index) {
    const item = CONFIG.reasons.items[index];
    if (!item) return;

    openModal(`
      <div class="reason-modal">
        <div class="reason-modal__heart" aria-hidden="true">♡</div>
        <p class="modal__eyebrow">A reason, just for you</p>
        <h2 class="modal__title" id="modalTitle">${esc(item.title)}</h2>
        <p class="reason-modal__message">${esc(item.message)}</p>
        <p class="modal__signature">— ${esc(CONFIG.names.her)} ♡</p>
      </div>
    `);
  }

  /* ----------------------------------------------------------
     SURPRISE ROOM
     ---------------------------------------------------------- */
  function renderSurprises() {
    const grid = $("#surpriseGrid");
    if (!grid) return;

    grid.innerHTML = CONFIG.surprises.cards
      .map(
        (card) => `
        <button class="surprise-card" type="button" data-surprise="${esc(card.id)}"
                aria-label="Open surprise: ${esc(card.title)}">
          <span class="surprise-card__top">
            <span class="surprise-card__number">${esc(card.number)}</span>
            <span class="surprise-card__icon" aria-hidden="true">${esc(card.icon)}</span>
          </span>
          <span class="surprise-card__content">
            <span class="surprise-card__title">${esc(card.title)}</span>
            <span class="surprise-card__text">${esc(card.text)}</span>
            <span class="surprise-card__open">Open</span>
          </span>
        </button>
      `
      )
      .join("");

    $$(".surprise-card", grid).forEach((button) => {
      button.addEventListener("click", () => openSurprise(button.dataset.surprise));
    });
  }

  function openSurprise(id) {
    if (id === "secret") {
      openLetterModal(CONFIG.surprises.secret, "A little secret, just for you");
    } else if (id === "song") {
      openSongModal();
    } else if (id === "open-when") {
      openLetterModal(CONFIG.surprises.openWhen, "For the days you need me close");
    } else if (id === "wish") {
      openWishModal();
    }
  }

  function openLetterModal(data, eyebrow) {
    openModal(
      `
      <div class="modal-letter">
        <p class="modal__eyebrow">${esc(eyebrow)}</p>
        <h2 class="modal__title" id="modalTitle">${esc(data.title)}</h2>
        <p class="modal__greeting">${esc(data.greeting)}</p>
        <div class="modal__prose">${paragraphs(data.body)}</div>
        <p class="modal__signature">${esc(data.signature)}</p>
      </div>
      `,
      { theme: "paper" }
    );
  }

  /* ----------------------------------------------------------
     PHOTO LIGHTBOX
     ---------------------------------------------------------- */
  function openLightbox(index) {
    if (!state.galleryPhotos.length) return;
    state.activeLightbox = mod(index, state.galleryPhotos.length);

    openModal(
      `
      <div class="lightbox">
        <h2 class="sr-only" id="modalTitle">A photo memory</h2>
        <div class="lightbox__stage" id="lightboxStage"></div>
        <div class="lightbox__info" id="lightboxInfo"></div>
        <div class="lightbox__nav">
          <button type="button" id="lightboxPrev" aria-label="Previous memory">←</button>
          <span class="lightbox__counter" id="lightboxCounter" aria-live="polite"></span>
          <button type="button" id="lightboxNext" aria-label="Next memory">→</button>
        </div>
      </div>
      `,
      { theme: "lightbox" }
    );

    updateLightbox();

    const previous = $("#lightboxPrev");
    const next = $("#lightboxNext");
    if (previous) previous.addEventListener("click", () => showLightbox(state.activeLightbox - 1));
    if (next) next.addEventListener("click", () => showLightbox(state.activeLightbox + 1));
  }

  function updateLightbox() {
    const photo = state.galleryPhotos[state.activeLightbox];
    const stage = $("#lightboxStage");
    const info = $("#lightboxInfo");
    const counter = $("#lightboxCounter");
    if (!photo || !stage || !info || !counter) return;

    stage.innerHTML = `<img src="${esc(photo.src)}" alt="${esc(photo.alt)}" decoding="async">`;
    info.innerHTML = `
      ${photo.caption ? `<p class="lightbox__caption">${esc(photo.caption)}</p>` : ""}
      ${photo.meta ? `<p class="lightbox__meta">${esc(photo.meta)}</p>` : ""}
    `;
    counter.textContent = `${state.activeLightbox + 1} / ${state.galleryPhotos.length}`;
  }

  function showLightbox(index) {
    if (!state.galleryPhotos.length) return;
    state.activeLightbox = mod(index, state.galleryPhotos.length);
    updateLightbox();
  }

  /* ----------------------------------------------------------
     MODAL SHELL
     ---------------------------------------------------------- */
  function openModal(content, options = {}) {
    const modal = $("#modal");
    const panel = $("#modalPanel");
    const body = $("#modalBody");
    if (!modal || !panel || !body) return;
    if (modal.open) return;

    lastFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;

    panel.className = "modal__panel";
    if (options.theme === "paper") panel.classList.add("modal__panel--paper");
    if (options.theme === "lightbox") panel.classList.add("modal__panel--lightbox");

    body.innerHTML = content;
    modalOnClose = typeof options.onClose === "function" ? options.onClose : null;

    document.body.classList.add("modal-open");
    modal.showModal();
    panel.scrollTop = 0;

    if (options.focus) {
      const target = $(options.focus);
      if (target) {
        window.setTimeout(() => target.focus({ preventScroll: true }), 50);
      }
    }
  }

  function handleModalClose() {
    document.body.classList.remove("modal-open");

    if (modalOnClose) {
      try {
        modalOnClose();
      } catch (error) {
        /* keep the little world running even if a cleanup fails */
      }
      modalOnClose = null;
    }

    const target = lastFocused;
    lastFocused = null;
    if (target && document.contains(target)) {
      target.focus({ preventScroll: true });
    }
  }

  /* ----------------------------------------------------------
     OUR SONG
     ---------------------------------------------------------- */
  function openSongModal() {
    const song = CONFIG.surprises.song;
    const audio = $("#ourSongAudio");
    if (audio && song.src && audio.getAttribute("src") !== song.src) {
      audio.src = song.src;
    }

    openModal(
      `
      <div class="song-modal">
        <p class="modal__eyebrow">For the two of us</p>
        <h2 class="modal__title" id="modalTitle">${esc(song.title)}</h2>
        <div class="song-modal__disc" id="songDisc" aria-hidden="true"><span>♫</span></div>
        <p class="song-modal__title">${esc(song.songTitle)}</p>
        <p class="song-modal__artist">${esc(song.artist)}</p>

        <div class="player">
          <button class="player__play" id="songPlay" type="button" aria-label="Play our song">▶</button>
          <div class="player__track">
            <input class="player__seek" id="songSeek" type="range" min="0" max="100" value="0" step="0.1" aria-label="Seek through our song">
            <div class="player__time">
              <span id="songCurrent">0:00</span>
              <span id="songDuration">0:00</span>
            </div>
          </div>
        </div>

        <p class="song-modal__note">${esc(song.note)}</p>
        ${
          song.link
            ? `<a class="song-modal__link" href="${esc(song.link)}" target="_blank" rel="noopener noreferrer">${esc(song.linkLabel || "Open the playlist")}</a>`
            : ""
        }
        <p class="modal__signature">${esc(song.signature)}</p>
      </div>
      `,
      {
        onClose: () => {
          if (audio) audio.pause();
        }
      }
    );

    initSongPlayer();
  }

  function initSongPlayer() {
    const audio = $("#ourSongAudio");
    const play = $("#songPlay");
    const seek = $("#songSeek");
    const current = $("#songCurrent");
    const duration = $("#songDuration");
    const disc = $("#songDisc");
    if (!audio || !play || !seek) return;

    const setPlayState = (playing) => {
      play.textContent = playing ? "❚❚" : "▶";
      play.setAttribute("aria-label", playing ? "Pause our song" : "Play our song");
      if (disc) disc.classList.toggle("is-playing", playing);
    };

    const update = () => {
      const total = Number.isFinite(audio.duration) ? audio.duration : 0;
      seek.max = total || 100;
      if (total > 0) seek.value = String(audio.currentTime);
      if (current) current.textContent = formatTime(audio.currentTime);
      if (duration) duration.textContent = formatTime(total);
    };

    play.addEventListener("click", () => {
      if (audio.paused) {
        audio.play().catch(() => setPlayState(false));
      } else {
        audio.pause();
      }
    });

    audio.onplay = () => setPlayState(true);
    audio.onpause = () => setPlayState(false);
    audio.onended = () => setPlayState(false);
    audio.ontimeupdate = update;
    audio.onloadedmetadata = update;

    seek.addEventListener("input", () => {
      if (Number.isFinite(audio.duration)) {
        audio.currentTime = Number(seek.value);
      }
    });

    update();
    setPlayState(!audio.paused);
  }

  /* ----------------------------------------------------------
     THE BIRTHDAY WISH
     ---------------------------------------------------------- */
  function openWishModal() {
    const wish = CONFIG.surprises.wish;

    openModal(`
      <div class="wish-modal">
        <p class="modal__eyebrow">Close your eyes</p>
        <h2 class="modal__title" id="modalTitle">${esc(wish.title)}</h2>
        <p class="wish-modal__prompt">${esc(wish.prompt)}</p>

        <button class="wish-star" id="wishStar" type="button" aria-label="${esc(wish.starLabel)}">
          <span class="wish-star__icon" aria-hidden="true">✦</span>
          <span class="wish-star__label">${esc(wish.starLabel)}</span>
        </button>

        <div class="wish-modal__message" id="wishStarMessage" hidden aria-live="polite">
          <p>${esc(wish.message)}</p>
          <p class="wish-modal__signature">${esc(wish.signature)}</p>
        </div>

        <canvas class="wish-modal__confetti" id="wishModalConfetti" aria-hidden="true"></canvas>
      </div>
    `);

    const star = $("#wishStar");
    if (!star) return;

    star.addEventListener("click", () => {
      star.classList.add("is-done");
      star.disabled = true;
      star.setAttribute("aria-label", "Wish made");
      const label = $(".wish-star__label", star);
      if (label) label.textContent = "Wish made ♡";

      const message = $("#wishStarMessage");
      if (message) message.hidden = false;

      const canvas = $("#wishModalConfetti");
      const panel = $("#modalPanel");
      if (canvas && panel) {
        const starRect = star.getBoundingClientRect();
        const canvasRect = canvas.getBoundingClientRect();
        launchConfetti(canvas, {
          count: 80,
          duration: 3600,
          origin: {
            x: starRect.left + starRect.width / 2 - canvasRect.left,
            y: starRect.top + starRect.height / 2 - canvasRect.top
          }
        });
        spawnHearts(panel, 12);
      }

      window.setTimeout(() => {
        if (message) {
          message.scrollIntoView({
            behavior: reduceMotion ? "auto" : "smooth",
            block: "nearest"
          });
        }
      }, 150);
    });
  }

  /* ----------------------------------------------------------
     THE SEALED ENVELOPE
     ---------------------------------------------------------- */
  function openEnvelope() {
    const scene = $("#envelopeScene");
    const button = $("#envelopeButton");
    const article = $("#letterArticle");
    if (!scene || !button || !article || scene.classList.contains("is-open")) return;

    scene.classList.add("is-open");
    button.setAttribute("aria-expanded", "true");
    article.hidden = false;
    article.focus({ preventScroll: true });

    window.setTimeout(() => {
      article.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start"
      });
    }, 420);
  }

  function closeEnvelope() {
    const scene = $("#envelopeScene");
    const button = $("#envelopeButton");
    const article = $("#letterArticle");
    if (!scene || !button || !article) return;

    article.hidden = true;
    scene.classList.remove("is-open");
    button.setAttribute("aria-expanded", "false");

    window.setTimeout(() => {
      button.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "center"
      });
      button.focus({ preventScroll: true });
    }, 80);
  }

  /* ----------------------------------------------------------
     MAKE A WISH (the final section)
     ---------------------------------------------------------- */
  function makeWish() {
    const message = $("#wishMessage");
    const button = $("#wishButton");
    if (!message || !button) return;

    message.hidden = false;

    const label = $("#wishButtonLabel");
    if (label) label.textContent = CONFIG.wish.again;

    const canvas = $("#confettiCanvas");
    if (canvas) {
      const rect = button.getBoundingClientRect();
      launchConfetti(canvas, {
        count: 140,
        duration: 5200,
        origin: {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2
        }
      });
      spawnHearts($("#heartsLayer"), 18);
    }

    window.setTimeout(() => {
      message.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "nearest"
      });
    }, 120);
  }

  /* ----------------------------------------------------------
     NAVIGATION & SCROLL PROGRESS
     ---------------------------------------------------------- */
  function setupNav() {
    const nav = $("#nav");
    const toggle = $("#navToggle");
    const links = $("#navLinks");
    const progress = $("#scrollProgress");
    if (!nav || !toggle || !links) return;

    const menuLabel = $(".sr-only", toggle);

    const closeMenu = () => {
      links.classList.remove("is-open");
      toggle.classList.remove("is-open");
      nav.classList.remove("is-menu-open");
      document.body.classList.remove("menu-open");
      toggle.setAttribute("aria-expanded", "false");
      if (menuLabel) menuLabel.textContent = "Open menu";
    };

    const openMenu = () => {
      links.classList.add("is-open");
      toggle.classList.add("is-open");
      nav.classList.add("is-menu-open");
      document.body.classList.add("menu-open");
      toggle.setAttribute("aria-expanded", "true");
      if (menuLabel) menuLabel.textContent = "Close menu";
    };

    toggle.addEventListener("click", () => {
      if (links.classList.contains("is-open")) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    $$("a", links).forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && links.classList.contains("is-open")) {
        closeMenu();
      }
    });

    const desktop = window.matchMedia("(min-width: 901px)");
    if (desktop.addEventListener) {
      desktop.addEventListener("change", (event) => {
        if (event.matches) closeMenu();
      });
    }

    let ticking = false;

    const updateScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      nav.classList.toggle("is-scrolled", scrollTop > 30);

      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      if (progress) {
        progress.style.width = `${Math.min(100, Math.max(0, percent))}%`;
      }

      ticking = false;
    };

    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          ticking = true;
          window.requestAnimationFrame(updateScroll);
        }
      },
      { passive: true }
    );

    window.addEventListener("resize", updateScroll, { passive: true });
    updateScroll();

    if ("IntersectionObserver" in window) {
      const navLinks = $$("a", links);
      const sectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const id = entry.target.id;
            navLinks.forEach((link) => {
              const active = link.getAttribute("href") === `#${id}`;
              link.classList.toggle("is-active", active);
              if (active) {
                link.setAttribute("aria-current", "location");
              } else {
                link.removeAttribute("aria-current");
              }
            });
          });
        },
        { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
      );

      $$("main section[id]").forEach((section) => sectionObserver.observe(section));
    }
  }

  /* ----------------------------------------------------------
     GENTLE AMBIENT MUSIC (generated, never autoplayed)
     ---------------------------------------------------------- */
  function createAmbient() {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return null;

    const ctx = new AudioContextClass();
    const master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 1800;
    filter.Q.value = 0.4;
    filter.connect(master);

    // A soft, continuous bass drone.
    const drone = ctx.createOscillator();
    drone.type = "sine";
    drone.frequency.value = 130.81;
    const droneGain = ctx.createGain();
    droneGain.gain.value = 0.05;
    drone.connect(droneGain);
    droneGain.connect(filter);
    drone.start();

    // A gentle, repeating pentatonic melody.
    const melody = [523.25, 659.25, 783.99, 659.25, 523.25, 392.0, 523.25, 0];
    const noteDuration = 0.42;
    let step = 0;
    let nextNoteTime = ctx.currentTime + 0.15;

    function scheduleNote(time, frequency) {
      if (!frequency) return;
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = frequency;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.0001, time);
      gain.gain.exponentialRampToValueAtTime(0.11, time + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + noteDuration);

      osc.connect(gain);
      gain.connect(filter);
      osc.start(time);
      osc.stop(time + noteDuration + 0.05);
    }

    function scheduler() {
      while (nextNoteTime < ctx.currentTime + 0.6) {
        const frequency = melody[step % melody.length];
        scheduleNote(nextNoteTime, frequency);
        nextNoteTime += noteDuration;
        step += 1;
      }
    }

    scheduler();
    const intervalId = window.setInterval(scheduler, 200);

    return { ctx, master, nodes: [drone], intervalId };
  }

  function fadeAmbient(target, seconds) {
    if (!ambient) return;
    const now = ambient.ctx.currentTime;
    const gain = ambient.master.gain;
    gain.cancelScheduledValues(now);
    gain.setValueAtTime(gain.value, now);
    gain.linearRampToValueAtTime(target, now + seconds);
  }

  function setupSound() {
    const button = $("#soundToggle");
    const label = $("#soundLabel");
    if (!button) return;

    if (!CONFIG.ambient || CONFIG.ambient.enabled === false) {
      button.hidden = true;
      return;
    }

    const useFile = !!CONFIG.ambient.src;
    const audio = useFile ? $("#ambientAudio") : null;
    if (useFile && audio && CONFIG.ambient.src) {
      if (audio.getAttribute("src") !== CONFIG.ambient.src) audio.src = CONFIG.ambient.src;
      audio.loop = true;
    }

    button.addEventListener("click", () => {
      ambientOn = !ambientOn;

      if (ambientOn) {
        button.classList.add("is-on");
        button.setAttribute("aria-pressed", "true");
        button.setAttribute("title", "Gentle ambient music on");
        if (label) label.textContent = "Sound on";

        if (useFile && audio) {
          const target = Number(CONFIG.ambient.volume) || 0.35;
          audio.volume = 0;
          const playPromise = audio.play();
          if (playPromise && typeof playPromise.then === "function") {
            playPromise.catch(() => {});
          }
          const start = performance.now();
          const duration = 1400;
          const fadeIn = (now) => {
            if (!ambientOn) return;
            const t = Math.max(0, Math.min(1, (now - start) / duration));
            audio.volume = Math.max(0, Math.min(1, target * t));
            if (t < 1) requestAnimationFrame(fadeIn);
          };
          requestAnimationFrame(fadeIn);
        } else {
          if (!ambient) ambient = createAmbient();
          if (!ambient) {
            button.hidden = true;
            ambientOn = false;
            return;
          }
          ambient.ctx.resume().catch(() => {});
          fadeAmbient(CONFIG.ambient.volume, 2.4);
        }
      } else {
        button.classList.remove("is-on");
        button.setAttribute("aria-pressed", "false");
        button.setAttribute("title", "Gentle ambient music off");
        if (label) label.textContent = "Sound off";

        if (useFile && audio) {
          const startVolume = audio.volume;
          const start = performance.now();
          const duration = 900;
          const fadeOut = (now) => {
            if (ambientOn) return;
            const t = Math.max(0, Math.min(1, (now - start) / duration));
            audio.volume = Math.max(0, Math.min(1, startVolume * (1 - t)));
            if (t < 1) {
              requestAnimationFrame(fadeOut);
            } else {
              audio.pause();
            }
          };
          requestAnimationFrame(fadeOut);
        } else {
          fadeAmbient(0, 1.1);
          window.setTimeout(() => {
            if (!ambientOn && ambient) {
              ambient.ctx.suspend().catch(() => {});
            }
          }, 1250);
        }
      }
    });
  }

  /* ----------------------------------------------------------
     THE NIGHT SKY
     ---------------------------------------------------------- */
  function setupStars() {
    const canvas = $("#starCanvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let stars = [];
    let shooting = null;
    let nextShooting = performance.now() + 4200;
    let raf = 0;
    let running = false;
    let lastFrame = 0;

    const starColours = [
      "rgba(255, 250, 244, ",
      "rgba(240, 184, 200, ",
      "rgba(236, 211, 163, "
    ];

    function makeStars() {
      const count = Math.max(80, Math.min(240, Math.round((width * height) / 8200)));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.35 + 0.35,
        alpha: Math.random() * 0.55 + 0.25,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.85 + 0.35,
        colour: starColours[Math.random() > 0.78 ? (Math.random() > 0.5 ? 1 : 2) : 0]
      }));
    }

    function paintStars(now, animate) {
      ctx.clearRect(0, 0, width, height);

      stars.forEach((star) => {
        const shimmer = animate
          ? 0.6 + 0.4 * Math.sin(now * 0.0009 * star.speed + star.phase)
          : 0.82;
        const alpha = Math.min(1, star.alpha * shimmer);

        ctx.beginPath();
        ctx.fillStyle = `${star.colour}${alpha.toFixed(3)})`;
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();

        if (star.radius > 1.1) {
          ctx.beginPath();
          ctx.fillStyle = `${star.colour}${(alpha * 0.18).toFixed(3)})`;
          ctx.arc(star.x, star.y, star.radius * 3.2, 0, Math.PI * 2);
          ctx.fill();
        }
      });
    }

    function paintShooting(delta) {
      if (!shooting) return;

      shooting.x += shooting.vx * delta;
      shooting.y += shooting.vy * delta;
      shooting.life += delta;

      const remaining = 1 - shooting.life / shooting.ttl;
      if (remaining <= 0) {
        shooting = null;
        return;
      }

      const tailX = shooting.x - shooting.vx * 16;
      const tailY = shooting.y - shooting.vy * 16;
      const gradient = ctx.createLinearGradient(shooting.x, shooting.y, tailX, tailY);
      gradient.addColorStop(0, `rgba(255, 250, 244, ${0.9 * remaining})`);
      gradient.addColorStop(0.35, `rgba(240, 184, 200, ${0.55 * remaining})`);
      gradient.addColorStop(1, "rgba(240, 184, 200, 0)");

      ctx.beginPath();
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 1.4;
      ctx.lineCap = "round";
      ctx.moveTo(shooting.x, shooting.y);
      ctx.lineTo(tailX, tailY);
      ctx.stroke();
    }

    function frame(now) {
      if (!running) return;

      const delta = Math.min(48, now - (lastFrame || now)) / 16.67;
      lastFrame = now;

      paintStars(now, true);

      if (!shooting && now > nextShooting) {
        shooting = {
          x: width * (0.15 + Math.random() * 0.55),
          y: height * (0.05 + Math.random() * 0.3),
          vx: 4.6 + Math.random() * 2.4,
          vy: 2.1 + Math.random() * 1.2,
          life: 0,
          ttl: 900 + Math.random() * 500
        };
        nextShooting = now + 6500 + Math.random() * 9000;
      }

      paintShooting(delta);
      raf = window.requestAnimationFrame(frame);
    }

    function start() {
      if (running || reduceMotion) return;
      running = true;
      lastFrame = 0;
      raf = window.requestAnimationFrame(frame);
    }

    function stop() {
      running = false;
      if (raf) window.cancelAnimationFrame(raf);
      raf = 0;
    }

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      makeStars();
      shooting = null;

      if (reduceMotion) {
        paintStars(0, false);
      } else {
        paintStars(performance.now(), true);
      }
    }

    let resizeTimer = 0;
    window.addEventListener(
      "resize",
      () => {
        window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(resize, 180);
      },
      { passive: true }
    );

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        stop();
      } else {
        start();
      }
    });

    resize();
    start();
  }

  /* ----------------------------------------------------------
     CONFETTI
     ---------------------------------------------------------- */
  function launchConfetti(canvas, options = {}) {
    if (!canvas || reduceMotion) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const existing = Number(canvas.dataset.raf || 0);
    if (existing) window.cancelAnimationFrame(existing);

    const rect = canvas.getBoundingClientRect();
    const width = rect.width || window.innerWidth;
    const height = rect.height || window.innerHeight;
    if (!width || !height) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const origin = options.origin || { x: width / 2, y: height * 0.42 };
    const count = Math.max(20, Number(options.count) || 110);
    const duration = Math.max(1400, Number(options.duration) || 4600);
    const colours = ["#d9b679", "#ecd3a3", "#f0b8c8", "#f8d8e2", "#f7efe4", "#a9536f", "#c9a0dc"];
    const shapes = ["heart", "heart", "circle", "rect", "sparkle"];

    const pieces = Array.from({ length: count }, () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2.2 + Math.random() * 7.4;
      return {
        x: origin.x + (Math.random() - 0.5) * 18,
        y: origin.y + (Math.random() - 0.5) * 18,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2.6,
        size: 3 + Math.random() * 6,
        colour: colours[Math.floor(Math.random() * colours.length)],
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        rotation: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.35,
        sway: Math.random() * Math.PI * 2
      };
    });

    const start = performance.now();
    let previous = 0;
    let raf = 0;

    const paintHeart = (size) => {
      ctx.beginPath();
      ctx.moveTo(0, size * 0.32);
      ctx.bezierCurveTo(-size * 0.12, size * 0.16, -size * 0.52, size * 0.02, -size * 0.52, -size * 0.24);
      ctx.bezierCurveTo(-size * 0.52, -size * 0.5, -size * 0.2, -size * 0.56, 0, -size * 0.28);
      ctx.bezierCurveTo(size * 0.2, -size * 0.56, size * 0.52, -size * 0.5, size * 0.52, -size * 0.24);
      ctx.bezierCurveTo(size * 0.52, size * 0.02, size * 0.12, size * 0.16, 0, size * 0.32);
      ctx.closePath();
      ctx.fill();
    };

    const paintSparkle = (size) => {
      ctx.beginPath();
      for (let point = 0; point < 8; point += 1) {
        const radius = point % 2 === 0 ? size * 1.1 : size * 0.3;
        const angle = (point / 8) * Math.PI * 2 - Math.PI / 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        if (point === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fill();
    };

    const frame = (now) => {
      const elapsed = now - start;
      const delta = Math.min(46, now - (previous || now)) / 16.67;
      previous = now;

      const fadeStart = duration * 0.62;
      const fade = elapsed < fadeStart ? 1 : Math.max(0, 1 - (elapsed - fadeStart) / (duration - fadeStart));

      ctx.clearRect(0, 0, width, height);

      pieces.forEach((piece) => {
        piece.vy += 0.105 * delta;
        piece.vx *= 0.994;
        piece.vy *= 0.995;
        piece.x += piece.vx * delta;
        piece.y += piece.vy * delta;
        piece.rotation += piece.spin * delta;
        piece.sway += 0.06 * delta;

        const sway = Math.sin(piece.sway) * 0.55;
        ctx.save();
        ctx.globalAlpha = fade;
        ctx.translate(piece.x + sway, piece.y);
        ctx.rotate(piece.rotation);
        ctx.fillStyle = piece.colour;

        if (piece.shape === "heart") {
          paintHeart(piece.size);
        } else if (piece.shape === "circle") {
          ctx.beginPath();
          ctx.arc(0, 0, piece.size * 0.48, 0, Math.PI * 2);
          ctx.fill();
        } else if (piece.shape === "sparkle") {
          paintSparkle(piece.size * 0.6);
        } else {
          ctx.fillRect(-piece.size * 0.45, -piece.size * 0.2, piece.size * 0.9, piece.size * 0.4);
        }

        ctx.restore();
      });

      if (elapsed < duration) {
        raf = window.requestAnimationFrame(frame);
        canvas.dataset.raf = String(raf);
      } else {
        ctx.clearRect(0, 0, width, height);
        canvas.dataset.raf = "";
      }
    };

    raf = window.requestAnimationFrame(frame);
    canvas.dataset.raf = String(raf);
  }

  /* ----------------------------------------------------------
     FLOATING HEARTS
     ---------------------------------------------------------- */
  function spawnHearts(container, count = 12) {
    if (!container || reduceMotion) return;

    const symbols = ["♡", "♥", "♡", "✦", "♡"];
    const colours = ["#f0b8c8", "#f8d8e2", "#d9b679", "#ecd3a3", "#ffffff"];
    const total = Math.max(1, Math.min(40, count));
    const created = [];

    for (let index = 0; index < total; index += 1) {
      const heart = document.createElement("span");
      heart.className = "floating-heart";
      heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      heart.style.left = `${2 + Math.random() * 96}%`;
      heart.style.setProperty("--size", `${0.7 + Math.random() * 1.5}rem`);
      heart.style.setProperty("--duration", `${3.8 + Math.random() * 3.4}s`);
      heart.style.setProperty("--rot", `${-35 + Math.random() * 70}deg`);
      heart.style.setProperty("--color", colours[Math.floor(Math.random() * colours.length)]);
      heart.style.animationDelay = `${Math.random() * 0.55}s`;
      heart.addEventListener("animationend", () => heart.remove(), { once: true });
      container.appendChild(heart);
      created.push(heart);
    }

    window.setTimeout(() => {
      created.forEach((heart) => {
        if (heart.isConnected) heart.remove();
      });
    }, 8500);
  }

  /* ----------------------------------------------------------
     MODAL EVENTS
     ---------------------------------------------------------- */
  function setupModal() {
    const modal = $("#modal");
    if (!modal) return;

    const close = $("#modalClose");
    if (close) {
      close.addEventListener("click", () => modal.close());
    }

    modal.addEventListener("click", (event) => {
      if (event.target === modal) modal.close();
    });

    modal.addEventListener("close", handleModalClose);

    document.addEventListener("keydown", (event) => {
      if (!modal.open) return;
      const panel = $("#modalPanel");
      if (!panel || !panel.classList.contains("modal__panel--lightbox")) return;

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        showLightbox(state.activeLightbox - 1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        showLightbox(state.activeLightbox + 1);
      }
    });
  }

  /* ----------------------------------------------------------
     SCROLL REVEALS
     ---------------------------------------------------------- */
  function setupReveals() {
    ["#gallery", "#hearts", "#surpriseGrid", "#envelopeScene", ".wish-stage", ".gallery__more"].forEach(
      (selector) => {
        const element = $(selector);
        if (element) element.classList.add("reveal");
      }
    );

    const items = $$(".reveal");
    if (reduceMotion || !("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -8% 0px" }
    );

    items.forEach((item) => observer.observe(item));
  }

  /* ----------------------------------------------------------
     START THE LITTLE WORLD
     ---------------------------------------------------------- */
  function init() {
    renderText();
    renderGallery();
    renderReasons();
    renderSurprises();

    const moreMemory = $("#moreMemory");
    if (moreMemory) moreMemory.addEventListener("click", revealHiddenMemory);

    const envelope = $("#envelopeButton");
    if (envelope) envelope.addEventListener("click", openEnvelope);

    const closeLetter = $("#closeLetter");
    if (closeLetter) closeLetter.addEventListener("click", closeEnvelope);

    const wishButton = $("#wishButton");
    if (wishButton) wishButton.addEventListener("click", makeWish);

    const audio = $("#ourSongAudio");
    const song = CONFIG.surprises && CONFIG.surprises.song;
    if (audio && song && song.src && audio.getAttribute("src") !== song.src) {
      audio.src = song.src;
    }

    setupModal();
    setupNav();
    setupSound();
    setupStars();
    setupReveals();

    document.body.classList.add("js-ready");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }

})();
