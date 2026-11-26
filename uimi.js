(function () {
  const root = document.documentElement;
  const app = document.querySelector(".uimi-app");
  root.removeAttribute("data-uimi-theme");

  const themes = {
    midnight: { font: "inter", display: "inter" },
    apricot: { font: "inter", display: "inter" },
    pastel: { font: "inter", display: "inter" },
    "lavender-mist": { font: "inter", display: "inter" },
  };
  const palettes = Object.keys(themes);
  if (localStorage.getItem("uimi-theme-set") !== "lavender-mist") {
    localStorage.setItem("uimi-palette", "lavender-mist");
    localStorage.setItem("uimi-theme-set", "lavender-mist");
  }
  const savedPalette = localStorage.getItem("uimi-palette");
  const initialPalette = palettes.includes(savedPalette) ? savedPalette : "lavender-mist";

  const applyPalette = (id) => {
    const next = palettes.includes(id) ? id : "lavender-mist";
    const prev =
      root.getAttribute("data-uimi-palette") || localStorage.getItem("uimi-palette") || "";
    const changed = Boolean(prev) && prev !== next;
    root.setAttribute("data-uimi-palette", next);
    localStorage.setItem("uimi-palette", next);
    document.querySelectorAll("[data-uimi-palette-select]").forEach((select) => {
      select.value = next;
    });
    document.querySelectorAll("[data-uimi-theme-choice]").forEach((button) => {
      const on = button.getAttribute("data-uimi-theme-choice") === next;
      button.setAttribute("aria-pressed", String(on));
    });
    // Only wipe paint/move when the user switches themes — not on every page load.
    // Glass mode is independent of palette (like iPhone LG on/off) — keep map, sync backdrop.
    if (!changed) return;
    localStorage.removeItem("uimi-paint-map");
    localStorage.removeItem("uimi-move-map");
    if (typeof window.__UIMI_CLEAR_PAINT__ === "function") {
      window.__UIMI_CLEAR_PAINT__();
    } else {
      const paintSheetEl = document.getElementById("uimi-paint-sheet");
      if (paintSheetEl) paintSheetEl.textContent = "";
    }
    const moveSheetEl = document.getElementById("uimi-move-sheet");
    if (moveSheetEl) moveSheetEl.textContent = "";
    if (typeof window.__UIMI_CLEAR_MOVE__ === "function") window.__UIMI_CLEAR_MOVE__();
    if (typeof window.__UIMI_SYNC_GLASS_BG__ === "function") window.__UIMI_SYNC_GLASS_BG__();
    if (typeof window.__UIMI_SYNC_GLASS_INK__ === "function") window.__UIMI_SYNC_GLASS_INK__();
  };

  const fontIds = ["inter", "cooper-hewitt", "poppins"];
  const savedFont = localStorage.getItem("uimi-font");
  const savedDisplay = localStorage.getItem("uimi-font-display");
  const initialFont = fontIds.includes(savedFont) ? savedFont : "inter";
  const initialDisplay = fontIds.includes(savedDisplay) ? savedDisplay : "inter";

  const applyFont = (id) => {
    const next = fontIds.includes(id) ? id : "inter";
    root.setAttribute("data-uimi-font", next);
    localStorage.setItem("uimi-font", next);
    document.querySelectorAll("[data-uimi-font-select]").forEach((select) => {
      select.value = next;
      select.dispatchEvent(new Event("uimi:sync"));
    });
    document.querySelectorAll("[data-uimi-font-choice]").forEach((button) => {
      const on = button.dataset.uimiFontChoice === next;
      button.setAttribute("aria-pressed", String(on));
      button.setAttribute("aria-selected", String(on));
    });
  };

  const applyDisplay = (id) => {
    const next = fontIds.includes(id) ? id : "inter";
    root.setAttribute("data-uimi-display", next);
    localStorage.setItem("uimi-font-display", next);
    document.querySelectorAll("[data-uimi-display-select]").forEach((select) => {
      select.value = next;
      select.dispatchEvent(new Event("uimi:sync"));
    });
    document.querySelectorAll("[data-uimi-display-choice]").forEach((button) => {
      const on = button.dataset.uimiDisplayChoice === next;
      button.setAttribute("aria-pressed", String(on));
      button.setAttribute("aria-selected", String(on));
    });
  };

  applyPalette(initialPalette);
  applyFont(initialFont);
  applyDisplay(initialDisplay);
  document.querySelectorAll("[data-uimi-palette-select]").forEach((select) => {
    select.addEventListener("change", () => applyPalette(select.value));
  });
  document.querySelectorAll("[data-uimi-font-select]").forEach((select) => {
    select.addEventListener("change", () => applyFont(select.value));
  });
  document.querySelectorAll("[data-uimi-font-choice]").forEach((button) => {
    button.addEventListener("click", () => applyFont(button.dataset.uimiFontChoice));
  });
  document.querySelectorAll("[data-uimi-display-select]").forEach((select) => {
    select.addEventListener("change", () => applyDisplay(select.value));
  });
  document.querySelectorAll("[data-uimi-display-choice]").forEach((button) => {
    button.addEventListener("click", () => applyDisplay(button.dataset.uimiDisplayChoice));
  });

  const shells = ["sidebar", "navbar"];
  const savedShell = localStorage.getItem("uimi-shell");
  const initialShell = shells.includes(savedShell) ? savedShell : "sidebar";

  const applyShell = (id) => {
    const next = shells.includes(id) ? id : "sidebar";
    root.setAttribute("data-uimi-shell", next);
    localStorage.setItem("uimi-shell", next);
    app?.classList.remove("is-open");
    document.querySelectorAll("[data-uimi-shell-choice]").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.uimiShellChoice === next));
    });
  };

  applyShell(initialShell);
  document.querySelectorAll("[data-uimi-shell-choice]").forEach((button) => {
    button.addEventListener("click", () => applyShell(button.dataset.uimiShellChoice));
  });

  const stacks = ["html", "react", "vue", "svelte"];
  const savedStack = localStorage.getItem("uimi-stack");
  const initialStack = stacks.includes(savedStack) ? savedStack : "html";

  const toJsx = (html) =>
    String(html || "")
      .replace(/\sclass=/g, " className=")
      .replace(/\sfor=/g, " htmlFor=");

  const toMarkup = (html, stack) => {
    const source = String(html || "").trim();
    if (stack === "react") return toJsx(source);
    if (stack === "vue") return `<template>\n  ${source}\n</template>`;
    return source;
  };

  const paintMarkup = (stack) => {
    document.querySelectorAll(".uimi-snippet code").forEach((el) => {
      const source = el.getAttribute("data-uimi-markup") || el.textContent.trim();
      if (!el.hasAttribute("data-uimi-markup")) el.setAttribute("data-uimi-markup", source);
      el.textContent = toMarkup(source, stack);
    });
  };

  const applyStack = (id) => {
    const next = stacks.includes(id) ? id : "html";
    root.setAttribute("data-uimi-stack", next);
    localStorage.setItem("uimi-stack", next);
    paintMarkup(next);
    document.querySelectorAll("[data-uimi-stack-select]").forEach((select) => {
      select.value = next;
      select.dispatchEvent(new Event("uimi:sync"));
    });
  };

  applyStack(initialStack);
  document.querySelectorAll("[data-uimi-stack-select]").forEach((select) => {
    select.addEventListener("change", () => applyStack(select.value));
  });

  document.querySelectorAll("[data-uimi-sidebar-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      app?.classList.toggle("is-open");
    });
  });

  const sessionKey = "uimi-session";
  const readSession = () =>
    localStorage.getItem(sessionKey) === "in" || sessionStorage.getItem(sessionKey) === "in";
  const writeSession = (signedIn, remember = true) => {
    localStorage.removeItem(sessionKey);
    sessionStorage.removeItem(sessionKey);
    if (signedIn) (remember ? localStorage : sessionStorage).setItem(sessionKey, "in");
    root.setAttribute("data-uimi-session", signedIn ? "in" : "out");
  };
  writeSession(readSession(), localStorage.getItem(sessionKey) === "in");

  const pages = ["login-1", "login-2", "dashboard-1", "dashboard-2", "dashboard-3", "buttons", "cards", "tables", "notifications", "badges", "charts", "forms", "tabs", "settings"];
  const loginPages = ["login-1", "login-2"];
  const workspacePages = pages.filter((id) => !loginPages.includes(id));
  const pageAliases = {
    login: "login-1",
    signin: "login-1",
    auth: "login-1",
    dashboard: "dashboard-1",
    accounts: "tables",
    kit: "settings",
    use: "dashboard-1",
    usage: "dashboard-1",
    top: "dashboard-1",
    buttons: "buttons",
    "buttons-1": "buttons",
    "buttons-2": "buttons",
    "buttons-3": "buttons",
  };
  const pageLabels = {
    "login-1": "Login 1",
    "login-2": "Login 2",
    "dashboard-1": "Dashboard 1",
    "dashboard-2": "Dashboard 2",
    "dashboard-3": "Dashboard 3",
    buttons: "Buttons",
    cards: "Cards",
    tables: "Tables",
    notifications: "Notifications",
    badges: "Badges",
    charts: "Charts",
    forms: "Forms",
    tabs: "Tabs",
    settings: "Settings",
  };
  const pageFromHash = () => {
    const signedIn = readSession();
    const raw = (location.hash || (signedIn ? "#dashboard-1" : "#login-1")).replace("#", "");
    const id = pageAliases[raw] || raw;
    if (!signedIn) return loginPages.includes(id) ? id : "login-1";
    return pages.includes(id) ? id : "dashboard-1";
  };

  const closeNotify = () => {
    document.querySelectorAll(".uimi-notify-panel").forEach((panel) => {
      panel.hidden = true;
    });
    document.querySelectorAll("[data-uimi-notify-toggle]").forEach((button) => {
      button.setAttribute("aria-expanded", "false");
    });
  };

  const closeTheme = () => {
    document.querySelectorAll(".uimi-theme-panel").forEach((panel) => {
      panel.hidden = true;
    });
    document.querySelectorAll("[data-uimi-theme-toggle]").forEach((button) => {
      button.setAttribute("aria-expanded", "false");
    });
  };

  const closeChromeMenus = () => {
    closeNotify();
    closeTheme();
  };

  const showPage = (id) => {
    const next = pages.includes(id) ? id : pageFromHash();
    root.setAttribute("data-uimi-session", readSession() ? "in" : "out");
    document.querySelectorAll("[data-uimi-page]").forEach((page) => {
      page.hidden = page.dataset.uimiPage !== next;
    });
    document.querySelectorAll(".uimi-nav a[href^='#']").forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${next}`);
    });
    document.querySelectorAll(".uimi-nav-group").forEach((group) => {
      if (group.querySelector("a.is-active")) group.open = true;
    });
    document.querySelectorAll(".uimi-navbar-links .uimi-nav-sub").forEach((group) => {
      group.open = false;
    });
    closeChromeMenus();
    app?.classList.remove("is-open");
    window.scrollTo(0, 0);
    document.title = pageLabels[next] || "Console";
    document.querySelectorAll("[data-uimi-copy-page]").forEach((button) => {
      button.hidden = !(loginPages.includes(next) || next.startsWith("dashboard-"));
    });
  };

  const syncPage = () => {
    const next = pageFromHash();
    if (location.hash !== `#${next}`) {
      history.replaceState(null, "", `#${next}`);
    }
    showPage(next);
  };

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const raw = (link.getAttribute("href") || "").replace("#", "");
      const page = pageAliases[raw] || raw;
      if (!pages.includes(page)) return;
      event.preventDefault();
      app?.classList.remove("is-open");
      if (location.hash === `#${page}`) {
        showPage(page);
        return;
      }
      location.hash = page;
    });
  });

  window.addEventListener("hashchange", syncPage);
  syncPage();

  const demoEmail = "m.islam@uimi.com";
  const demoPassword = "uimi";

  document.querySelectorAll("[data-uimi-login]").forEach((loginForm) => {
    const loginMsg = loginForm.querySelector("[data-uimi-login-msg]");
    const emailInput = loginForm.querySelector('input[name="email"]');
    const passwordInput = loginForm.querySelector('input[name="password"]');
    const fillDemoCreds = () => {
      if (emailInput) emailInput.value = demoEmail;
      if (passwordInput) passwordInput.value = demoPassword;
    };
    fillDemoCreds();
    const setLoginMsg = (text, ok = false) => {
      if (!loginMsg) return;
      loginMsg.hidden = !text;
      loginMsg.textContent = text || "";
      loginMsg.classList.toggle("is-ok", Boolean(ok));
    };
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(loginForm);
      const remember = data.get("remember") === "on";
      setLoginMsg("");
      writeSession(true, remember);
      location.hash = "dashboard-1";
    });
    loginForm.querySelector("[data-uimi-forgot]")?.addEventListener("click", () => {
      setLoginMsg("Ask your admin to reset it.", true);
    });
  });
  document.querySelectorAll("[data-uimi-sign-out]").forEach((button) => {
    button.addEventListener("click", () => {
      writeSession(false);
      location.hash = "login-1";
    });
  });

  document.querySelectorAll(".uimi-notify").forEach((root) => {
    const button = root.querySelector("[data-uimi-notify-toggle]");
    const panel = root.querySelector(".uimi-notify-panel");
    if (!button || !panel) return;
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const open = panel.hidden;
      closeChromeMenus();
      if (open) {
        panel.hidden = false;
        button.setAttribute("aria-expanded", "true");
      }
    });
    panel.addEventListener("click", (event) => event.stopPropagation());
  });

  document.querySelectorAll(".uimi-theme").forEach((root) => {
    const button = root.querySelector("[data-uimi-theme-toggle]");
    const panel = root.querySelector(".uimi-theme-panel");
    if (!button || !panel) return;
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const open = panel.hidden;
      closeChromeMenus();
      if (open) {
        panel.hidden = false;
        button.setAttribute("aria-expanded", "true");
      }
    });
    panel.addEventListener("click", (event) => event.stopPropagation());
  });

  document.querySelectorAll("[data-uimi-theme-choice]").forEach((button) => {
    button.addEventListener("click", () => {
      applyPalette(button.getAttribute("data-uimi-theme-choice"));
      closeTheme();
    });
  });

  const eventFrom = (event) => {
    const target = event.target;
    if (target instanceof Element) return target;
    const node = event.composedPath().find((item) => item && item.nodeType === 1);
    return node || null;
  };

  document.addEventListener("click", (event) => {
    const from = eventFrom(event);
    if (!from?.closest(".uimi-notify")) closeNotify();
    if (!from?.closest(".uimi-theme")) closeTheme();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeChromeMenus();
  });

  const chartTypes = ["bar", "hbar", "grouped", "line", "area", "spark", "donut", "pie", "gauge", "stacked"];
  const chartColors = ["primary", "navy", "success", "warn", "info", "ink"];
  let chartSeq = 0;

  const parseChartValues = (el) =>
    (el.dataset.uimiChartValues || "")
      .split(",")
      .map((item) => Number(item.trim()))
      .filter((value) => Number.isFinite(value) && value >= 0);

  const parseChartNames = (value, count, fallback = "Series") => {
    const labels = (value || "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
    return Array.from({ length: count }, (_, index) => labels[index] || `${fallback} ${index + 1}`);
  };

  const parseChartLabels = (el, count) => parseChartNames(el.dataset.uimiChartLabels, count);

  /* Theme series 1–10; mono charts use --uimi-chart-fill (accent / data-uimi-chart-color). */
  const chartSeries = (index) =>
    `var(--uimi-chart-${(index % 10) + 1}, var(--uimi-chart-fill, var(--uimi-chart-accent, var(--uimi-primary))))`;
  const chartAccent = () => `var(--uimi-chart-fill, var(--uimi-chart-accent, var(--uimi-primary)))`;
  const chartFill = (index) => chartSeries(index);
  const chartBarFill = (index) => chartSeries(index);

  const groupChartValues = (values, count = 4) => {
    if (values.length <= count) return values;
    const size = Math.ceil(values.length / count);
    return Array.from({ length: count }, (_, index) =>
      values.slice(index * size, (index + 1) * size).reduce((sum, value) => sum + value, 0)
    );
  };

  const chartGrid = (width, height, pad) => {
    const lines = [0.25, 0.5, 0.75, 1]
      .map((part) => {
        const y = (height - pad - part * (height - pad * 2)).toFixed(1);
        return `<line class="uimi-chart-grid" x1="${pad}" x2="${width - pad}" y1="${y}" y2="${y}"/>`;
      })
      .join("");
    return `<g fill="none">${lines}</g>`;
  };

  const polar = (cx, cy, radius, angle) => {
    const rad = ((angle - 90) * Math.PI) / 180;
    return [cx + radius * Math.cos(rad), cy + radius * Math.sin(rad)];
  };

  const pieSlice = (cx, cy, radius, start, end) => {
    const [x1, y1] = polar(cx, cy, radius, start);
    const [x2, y2] = polar(cx, cy, radius, end);
    const large = end - start > 180 ? 1 : 0;
    return `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${large} 1 ${x2} ${y2} Z`;
  };

  const arcPath = (cx, cy, radius, start, end) => {
    const [x1, y1] = polar(cx, cy, radius, start);
    const [x2, y2] = polar(cx, cy, radius, end);
    const large = end - start > 180 ? 1 : 0;
    return `M ${x1.toFixed(1)} ${y1.toFixed(1)} A ${radius} ${radius} 0 ${large} 1 ${x2.toFixed(1)} ${y2.toFixed(1)}`;
  };

  const chartColumns = (el, values) => {
    const namedSeries = (el.dataset.uimiChartSeries || "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
    const namedLabels = (el.dataset.uimiChartLabels || "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
    let seriesCount = namedSeries.length;
    if (!seriesCount && namedLabels.length && values.length % namedLabels.length === 0) {
      seriesCount = values.length / namedLabels.length;
    }
    if (!seriesCount) seriesCount = Math.min(3, values.length);
    const columns = [];
    for (let i = 0; i + seriesCount <= values.length; i += seriesCount) {
      columns.push(values.slice(i, i + seriesCount));
    }
    if (!columns.length) return null;
    return {
      columns,
      seriesCount,
      labels: Array.from({ length: columns.length }, (_, index) => namedLabels[index] || `Q${index + 1}`),
      series: parseChartNames(el.dataset.uimiChartSeries, seriesCount),
    };
  };

  const renderPieLike = (el, values, { hole = false, label = "Pie chart" } = {}) => {
    const slices = groupChartValues(values, Math.min(10, values.length));
    const total = slices.reduce((sum, value) => sum + value, 0) || 1;
    const labels = parseChartLabels(el, slices.length);
    let angle = 0;
    const paths = slices
      .map((value, index) => {
        const sweep = (value / total) * 360;
        const start = angle;
        const end = angle + Math.max(sweep, 0.01);
        angle = end;
        return `<path class="uimi-chart-mark" d="${pieSlice(50, 50, 42, start, end)}" fill="${chartFill(index)}"></path>`;
      })
      .join("");
    const legend = slices
      .map((value, index) => `<li><i style="background:${chartFill(index)}"></i>${labels[index]} · ${Math.round((value / total) * 100)}%</li>`)
      .join("");
    const holeMark = hole ? `<circle class="uimi-chart-hole" cx="50" cy="50" r="24"></circle>` : "";
    el.innerHTML = `<svg viewBox="0 0 100 100" role="img" aria-label="${label}">${paths}${holeMark}</svg><ul class="uimi-chart-legend">${legend}</ul>`;
  };

  const renderChart = (el) => {
    const type = chartTypes.includes(el.dataset.uimiChartType) ? el.dataset.uimiChartType : "bar";
    const color = chartColors.includes(el.dataset.uimiChartColor) ? el.dataset.uimiChartColor : "primary";
    el.dataset.uimiChartType = type;
    el.dataset.uimiChartColor = color;
    const values = parseChartValues(el);
    if (!values.length) {
      el.innerHTML = "";
      return;
    }
    const width = 240;
    const height = 120;
    const pad = 10;
    const max = Math.max(...values, 1);

    if (type === "donut") {
      renderPieLike(el, values, { hole: true, label: "Donut chart" });
      return;
    }

    if (type === "pie") {
      renderPieLike(el, values, { hole: false, label: "Pie chart" });
      return;
    }

    if (type === "hbar") {
      const labels = parseChartLabels(el, values.length);
      const rows = values
        .map((value, index) => {
          const pct = Math.max((value / max) * 100, 1.5);
          return `<li><span class="uimi-chart-hbar__label">${labels[index]}</span><span class="uimi-chart-hbar__track"><i style="width:${pct.toFixed(1)}%;background:${chartBarFill(index)}"></i></span><span class="uimi-chart-hbar__value">${value}</span></li>`;
        })
        .join("");
      el.innerHTML = `<ul class="uimi-chart-hbar" role="img" aria-label="Horizontal bar chart">${rows}</ul>`;
      return;
    }

    if (type === "gauge") {
      const value = values[0];
      const ceiling = values[1] > 0 ? values[1] : 100;
      const pct = Math.max(0, Math.min(100, (value / ceiling) * 100));
      const sweep = (pct / 100) * 270;
      const start = 225;
      const end = start + sweep;
      const track = arcPath(50, 54, 34, 225, 495);
      const valueArc = pct > 0 ? arcPath(50, 54, 34, start, end) : "";
      const label = (el.dataset.uimiChartLabels || "").split(",")[0]?.trim() || "Score";
      el.innerHTML = `<div class="uimi-chart-gauge"><svg viewBox="0 0 100 100" role="img" aria-label="Gauge chart"><path class="uimi-chart-gauge__track" d="${track}" fill="none" stroke-width="10" stroke-linecap="round"></path>${valueArc ? `<path class="uimi-chart-gauge__value" d="${valueArc}" fill="none" stroke="${chartAccent()}" stroke-width="10" stroke-linecap="round"></path>` : ""}</svg><div class="uimi-chart-gauge__readout"><strong>${Math.round(pct)}%</strong><span>${label}</span></div></div>`;
      return;
    }

    if (type === "stacked" || type === "grouped") {
      const packed = chartColumns(el, values);
      if (!packed) {
        el.innerHTML = "";
        return;
      }
      const { columns, seriesCount, labels, series } = packed;
      const plotH = height - pad * 2;
      const plotW = width - pad * 2;
      const gap = 2.4;
      const groupW = (plotW - gap * (columns.length - 1)) / columns.length;
      const grid = chartGrid(width, height, pad);
      const legend = series.map((name, index) => `<li><i style="background:${chartFill(index)}"></i>${name}</li>`).join("");
      const axis = labels.map((label) => `<span>${label}</span>`).join("");
      el.style.setProperty("--uimi-chart-cols", String(columns.length));

      if (type === "grouped") {
        const innerGap = 1.2;
        const barW = (groupW - innerGap * (seriesCount - 1)) / seriesCount;
        const groupMax = Math.max(...columns.flat(), 1);
        const bars = columns
          .map((col, colIndex) => {
            const groupX = pad + colIndex * (groupW + gap);
            return col
              .map((value, seriesIndex) => {
                const barH = Math.max((value / groupMax) * plotH, 1.5);
                const x = groupX + seriesIndex * (barW + innerGap);
                const y = height - pad - barH;
                return `<rect class="uimi-chart-mark" x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${barW.toFixed(1)}" height="${barH.toFixed(1)}" rx="1.6" fill="${chartFill(seriesIndex)}"></rect>`;
              })
              .join("");
          })
          .join("");
        el.innerHTML = `<svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" role="img" aria-label="Grouped bar chart">${grid}${bars}</svg><div class="uimi-chart-axis">${axis}</div><ul class="uimi-chart-legend">${legend}</ul>`;
        return;
      }

      const stackMax = Math.max(...columns.map((col) => col.reduce((sum, value) => sum + value, 0)), 1);
      const uid = `uimi-stack-${++chartSeq}`;
      const clips = [];
      const bars = columns
        .map((col, colIndex) => {
          const x = pad + colIndex * (groupW + gap);
          const total = col.reduce((sum, value) => sum + value, 0);
          const barH = Math.max((total / stackMax) * plotH, 1.5);
          const yTop = height - pad - barH;
          const clipId = `${uid}-${colIndex}`;
          clips.push(
            `<clipPath id="${clipId}"><rect x="${x.toFixed(1)}" y="${yTop.toFixed(1)}" width="${groupW.toFixed(1)}" height="${barH.toFixed(1)}" rx="1.6"/></clipPath>`
          );
          let y = height - pad;
          const rects = col
            .map((value, seriesIndex) => {
              const h = (value / stackMax) * plotH;
              if (h <= 0) return "";
              y -= h;
              return `<rect class="uimi-chart-mark" x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${groupW.toFixed(1)}" height="${h.toFixed(1)}" fill="${chartFill(seriesIndex)}"></rect>`;
            })
            .join("");
          return `<g clip-path="url(#${clipId})">${rects}</g>`;
        })
        .join("");
      el.innerHTML = `<svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" role="img" aria-label="Stacked bar chart"><defs>${clips.join("")}</defs>${grid}${bars}</svg><div class="uimi-chart-axis">${axis}</div><ul class="uimi-chart-legend">${legend}</ul>`;
      return;
    }

    const plotH = height - pad * 2;
    const plotW = width - pad * 2;
    const points = values.map((value, index) => {
      const x = pad + (values.length === 1 ? plotW / 2 : (index / (values.length - 1)) * plotW);
      const y = height - pad - (value / max) * plotH;
      return [x, y];
    });
    const pts = points.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
    const grid = chartGrid(width, height, pad);

    if (type === "line" || type === "spark") {
      const stroke = type === "spark" ? "2" : "2.4";
      const accent = chartAccent();
      const dots =
        type === "line"
          ? points
              .map(([x, y]) => `<circle class="uimi-chart-mark" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.4" fill="${accent}"></circle>`)
              .join("")
          : "";
      const gridMark = type === "line" ? grid : "";
      el.innerHTML = `<svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" role="img" aria-label="${type === "spark" ? "Sparkline" : "Line chart"}">${gridMark}<polyline class="uimi-chart-stroke" fill="none" stroke="${accent}" stroke-width="${stroke}" stroke-linejoin="round" stroke-linecap="round" points="${pts}"></polyline>${dots}</svg>`;
      return;
    }

    if (type === "area") {
      const first = points[0];
      const last = points[points.length - 1];
      const area = `M ${first[0].toFixed(1)} ${height - pad} L ${pts} L ${last[0].toFixed(1)} ${height - pad} Z`;
      const accent = chartAccent();
      el.innerHTML = `<svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" role="img" aria-label="Area chart">${grid}<path class="uimi-chart-area" d="${area}" fill="${accent}" opacity="0.18"></path><polyline class="uimi-chart-stroke" fill="none" stroke="${accent}" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round" points="${pts}"></polyline></svg>`;
      return;
    }

    const gap = 2.4;
    const barW = (plotW - gap * (values.length - 1)) / values.length;
    const bars = values
      .map((value, index) => {
        const barH = Math.max((value / max) * plotH, 1.5);
        const x = pad + index * (barW + gap);
        const y = height - pad - barH;
        return `<rect class="uimi-chart-mark" x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${barW.toFixed(1)}" height="${barH.toFixed(1)}" rx="1.6" fill="${chartBarFill(index)}"></rect>`;
      })
      .join("");
    el.innerHTML = `<svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" role="img" aria-label="Bar chart">${grid}${bars}</svg>`;
  };

  if (document.querySelector(".uimi-studio")) {
    const copyText = (text) => {
      const fallback = () => {
        const field = document.createElement("textarea");
        field.value = text;
        field.setAttribute("readonly", "");
        field.style.cssText = "position:fixed;left:-9999px;top:0";
        document.body.appendChild(field);
        field.select();
        const ok = document.execCommand("copy");
        field.remove();
        if (!ok) throw new Error("copy failed");
      };
      if (!navigator.clipboard || !navigator.clipboard.writeText) {
        fallback();
        return Promise.resolve();
      }
      return navigator.clipboard.writeText(text).catch(() => fallback());
    };

    const flashCopied = (button) => {
      const prior = button.textContent;
      button.textContent = "Copied";
      window.setTimeout(() => {
        button.textContent = prior;
      }, 1400);
    };

    const setupAttrs = () => {
      const shell = root.getAttribute("data-uimi-shell") || "sidebar";
      const palette = root.getAttribute("data-uimi-palette") || "lavender-mist";
      const font = root.getAttribute("data-uimi-font") || "inter";
      const display = root.getAttribute("data-uimi-display") || font;
      const glass = root.getAttribute("data-uimi-glass") === "on" ? "on" : "off";
      return `data-uimi-shell="${shell}" data-uimi-palette="${palette}" data-uimi-font="${font}" data-uimi-display="${display}" data-uimi-glass="${glass}"`;
    };

    const currentPageMarkup = () => {
      const page = document.querySelector(".uimi-page:not([hidden])");
      if (!page) return "";
      const source = page.querySelector(".uimi-auth") || page;
      const clone = source.cloneNode(true);
      clone.removeAttribute("hidden");
      clone.removeAttribute("data-uimi-page");
      clone
        .querySelectorAll(
          '[data-uimi-kit="authoring"], [data-uimi-kit="catalog"], [data-uimi-copy-page], .uimi-studio, .uimi-paint-pop, .uimi-glass-gear, .uimi-glass-modal, .uimi-copy-fab, .uimi-snippet, .uimi-note, .uimi-kit-mark'
        )
        .forEach((el) => el.remove());
      clone.querySelectorAll(".uimi-mark").forEach((el) => {
        el.classList.remove("uimi-kit-mark");
        el.replaceChildren();
      });
      clone.querySelectorAll("[data-uimi-login-msg]").forEach((el) => el.remove());
      clone.querySelectorAll("[data-uimi-chart]").forEach((el) => el.replaceChildren());
      clone.querySelectorAll("input:not([type='checkbox'])").forEach((el) => el.removeAttribute("value"));
      clone.querySelectorAll("p.uimi-muted").forEach((el) => {
        if (/demo account/i.test(el.textContent || "")) el.remove();
      });
      return clone.outerHTML.replace(/></g, ">\n<");
    };

    const wrapSetup = (html) => {
      const markup = String(html || "").trim();
      const attrs = setupAttrs();
      const stack = root.getAttribute("data-uimi-stack") || "html";
      const name = /uimi-auth/.test(markup)
        ? "LoginPage"
        : /uimi-banner|uimi-page-head/.test(markup)
          ? "DashboardPage"
          : /uimi-btn/.test(markup)
            ? "SaveButton"
            : "Example";
      if (stack === "react") {
        return `import "./uimi.css";\n\n<html ${attrs}>\n\nexport function ${name}() {\n  return (\n${toJsx(markup)}\n  );\n}\n`;
      }
      if (stack === "vue") {
        return `<script setup>\nimport "./uimi.css";\n</script>\n\n<html ${attrs}>\n\n<template>\n  ${markup}\n</template>\n`;
      }
      if (stack === "svelte") {
        return `<script>\n  import "./uimi.css";\n</script>\n\n<html ${attrs}>\n\n${markup}\n`;
      }
      return `<html ${attrs}>\n<link rel="stylesheet" href="uimi.css" />\n${markup}\n`;
    };

    const pageButton = () => {
      const picked = document.querySelector('[data-uimi-page^="buttons"]:not([hidden]) .uimi-cluster .uimi-btn.is-picked');
      if (picked) return sampleMarkup(picked);
      return `<button class="uimi-btn uimi-btn--primary">Save</button>`;
    };

    const sampleMarkup = (btn) => {
      const classes = [...btn.classList]
        .filter((name) => name === "uimi-btn" || (name.startsWith("uimi-btn--") && name !== "is-picked"))
        .join(" ");
      const label = (btn.querySelector(".uimi-btn__flip-text") || btn).textContent.replace(/\s+/g, " ").trim();
      return `<button class="${classes}">${label}</button>`;
    };

    let pickedButton = null;
    const pickButton = (btn) => {
      pickedButton = btn;
      document.querySelectorAll(".uimi-cluster .uimi-btn.is-picked").forEach((el) => el.classList.remove("is-picked"));
      btn.classList.add("is-picked");
    };

    const livePick = () => {
      if (!pickedButton || !document.contains(pickedButton)) return null;
      if (pickedButton.closest(".uimi-page")?.hidden) return null;
      return pickedButton;
    };

    const setupSnippet = () => {
      const pick = livePick();
      if (pick) return wrapSetup(sampleMarkup(pick));
      const page = document.querySelector(".uimi-page:not([hidden])")?.getAttribute("data-uimi-page") || "";
      if (loginPages.includes(page) || page.startsWith("dashboard-")) return wrapSetup(currentPageMarkup());
      return wrapSetup(pageButton());
    };

    const BTN_SIZE_CLASSES = ["uimi-btn--lg", "uimi-btn--md", "uimi-btn--sm"];
    const applyCardPreviewSize = (card, sizeClass) => {
      if (!card) return;
      card.querySelectorAll(".uimi-cluster .uimi-btn").forEach((el) => {
        if (el.closest(".uimi-snippet")) return;
        if (el.closest("[data-uimi-btn-sizes]")) return;
        BTN_SIZE_CLASSES.forEach((name) => el.classList.remove(name));
        if (sizeClass) el.classList.add(sizeClass);
      });
      card.querySelectorAll("[data-uimi-btn-sizes] .uimi-btn").forEach((el) => {
        const match = sizeClass && el.classList.contains(sizeClass);
        el.classList.toggle("is-size-active", Boolean(match));
        el.setAttribute("aria-pressed", match ? "true" : "false");
      });
    };

    document.querySelectorAll('[data-uimi-page^="buttons"] .uimi-cluster .uimi-btn').forEach((btn) => {
      btn.addEventListener("click", () => {
        const sizes = btn.closest("[data-uimi-btn-sizes]");
        if (sizes) {
          const sizeClass = BTN_SIZE_CLASSES.find((name) => btn.classList.contains(name)) || null;
          applyCardPreviewSize(btn.closest(".uimi-card"), sizeClass);
        }
        pickButton(btn);
        copyText(setupSnippet()).catch(() => {});
      });
    });

    document.querySelectorAll("[data-uimi-copy]").forEach((button) => {
      button.addEventListener("click", () => {
        const code = button.closest(".uimi-snippet")?.querySelector("code");
        const html = (button.getAttribute("data-uimi-copy") || code?.getAttribute("data-uimi-markup") || code?.textContent || "").trim();
        copyText(wrapSetup(html)).then(() => flashCopied(button));
      });
    });
    document.querySelectorAll("[data-uimi-copy-page]").forEach((button) => {
      button.addEventListener("click", () => {
        copyText(wrapSetup(currentPageMarkup())).then(() => {
          button.classList.add("is-copied");
          const prior = button.getAttribute("aria-label");
          button.setAttribute("aria-label", "Copied");
          window.setTimeout(() => {
            button.classList.remove("is-copied");
            button.setAttribute("aria-label", prior || "Copy layout");
          }, 1400);
        });
      });
    });

    // Grouped by similar hue; shades ordered dark → light
    const PAINT_COLORS = {
      Cream: {
        Wheat: "#e6d5b8",
        Sand: "#fcf1d0",
        Ivory: "#fcf2e5",
        Shell: "#fff8f0",
        Soft: "#f9f7f7",
        Snow: "#ffffff",
      },
      Clay: {
        Ink: "#2c1810",
        Cocoa: "#4b2e2b",
        Char: "#524646",
        Walnut: "#8c5a3c",
        Tan: "#c08552",
        Stone: "#a8a492",
        Ash: "#c9c2b2",
      },
      Amber: {
        Bronze: "#c9922a",
        Gold: "#f9b637",
        Butter: "#fcbf49",
        Honey: "#ffdd9c",
        Cream: "#ffebb8",
        Pale: "#fff6d9",
      },
      Flame: {
        Fire: "#e73f1e",
        Terra: "#ec5b38",
        Flame: "#fb6c00",
        Orange: "#f77f00",
        Peach: "#ff9f5a",
        Apricot: "#ffc08a",
      },
      Rose: {
        Plum: "#601d49",
        Wine: "#8b1e3d",
        Crimson: "#d62828",
        Berry: "#bd5579",
        Blush: "#ea9d9d",
        Mist: "#f5d0d0",
      },
      Iris: {
        Violet: "#4a4de0",
        Indigo: "#6367ff",
        Periwinkle: "#8494ff",
        Lilac: "#c9beff",
        Bloom: "#ffdbfd",
        Haze: "#ebe4ff",
      },
      Paper: {
        Marine: "#003049",
        Night: "#112d4e",
        Ocean: "#1a5276",
        Steel: "#3f72af",
        Sky: "#7ba3d4",
        Fog: "#dbe2ef",
        Cloud: "#eef2f7",
      },
      Abyss: {
        Void: "#010736",
        Deep: "#0d1c42",
        Cove: "#22396f",
        Mid: "#2f4a8a",
        Soft: "#4a6aad",
      },
      Mint: {
        Sea: "#3d9ca3",
        Teal: "#71c9ce",
        Aqua: "#a6e3e9",
        Frost: "#cbf1f5",
        Ice: "#e3fdfd",
        Foam: "#f0fffe",
      },
    };

    const PAINT_PROPS = [
      { id: "background", label: "fill" },
      { id: "color", label: "text" },
      { id: "border-color", label: "border" },
    ];
    const PAINT_KEY = "uimi-paint-map";
    const SWATCH_KEY = "uimi-paint-swatches";
    const paintSheet = document.createElement("style");
    paintSheet.id = "uimi-paint-sheet";
    document.head.appendChild(paintSheet);

    const clonePaintMap = (map) => JSON.parse(JSON.stringify(map || {}));

    const normalizeSwatchHex = (value) => {
      if (!value) return null;
      const raw = String(typeof value === "string" ? value : value.hex || "")
        .trim()
        .toLowerCase();
      if (/^#[0-9a-f]{6}$/.test(raw)) return raw;
      if (/^#[0-9a-f]{3}$/.test(raw)) {
        return `#${raw[1]}${raw[1]}${raw[2]}${raw[2]}${raw[3]}${raw[3]}`;
      }
      return null;
    };

    const loadPaintMap = () => {
      try {
        return JSON.parse(localStorage.getItem(PAINT_KEY) || "{}") || {};
      } catch {
        return {};
      }
    };

    const loadCustomSwatches = () => {
      try {
        const raw = JSON.parse(localStorage.getItem(SWATCH_KEY) || "[]");
        if (!Array.isArray(raw)) return [];
        const seen = new Set();
        const list = [];
        raw.forEach((item) => {
          const hex = normalizeSwatchHex(item);
          if (!hex || seen.has(hex)) return;
          seen.add(hex);
          list.push(hex);
        });
        return list;
      } catch {
        return [];
      }
    };

    const saveCustomSwatches = (list) => {
      try {
        const clean = (list || []).map(normalizeSwatchHex).filter(Boolean);
        localStorage.setItem(SWATCH_KEY, JSON.stringify(clean));
        return clean;
      } catch {
        return list || [];
      }
    };

    let customSwatches = loadCustomSwatches();
    let paintSaved = clonePaintMap(loadPaintMap());
    let paintMap = clonePaintMap(paintSaved);
    let paintHistory = [];

    window.__UIMI_CLEAR_PAINT__ = () => {
      paintSaved = {};
      paintMap = {};
      paintHistory = [];
      localStorage.removeItem(PAINT_KEY);
      paintSheet.textContent = "";
      refreshPaintUi();
    };
    window.__UIMI_SWATCHES__ = () => customSwatches.slice();
    let paintTarget = null;
    let paintProp = "background";
    let paintDrag = null;
    let paintSampleProp = null;
    let paintClipboard = null;

    // Drop any previously saved font colors
    localStorage.setItem(PAINT_KEY, JSON.stringify(paintSaved));

    const paintIsDirty = () => JSON.stringify(paintMap) !== JSON.stringify(paintSaved);

    const refreshPaintUi = () => {
      const count = Object.keys(paintMap).length;
      const dirty = paintIsDirty();
      window.__UIMI_PAINT__ = clonePaintMap(paintSaved);
      window.__UIMI_PAINT_DRAFT__ = clonePaintMap(paintMap);
      document.querySelectorAll("[data-uimi-paint-count]").forEach((el) => {
        el.textContent = `${count} pick${count === 1 ? "" : "s"}`;
      });
      document.querySelectorAll("[data-uimi-paint-status]").forEach((el) => {
        el.hidden = !dirty;
      });
      document.querySelectorAll("[data-uimi-paint-save]").forEach((btn) => {
        btn.disabled = !dirty;
      });
      document.querySelectorAll("[data-uimi-paint-undo]").forEach((btn) => {
        btn.disabled = paintHistory.length === 0;
      });
    };

    const paintDeclsFor = (styles) => {
      const decls = [];
      Object.entries(styles || {}).forEach(([prop, value]) => {
        if (!value) return;
        if (prop === "border-color") {
          decls.push(`border-color:${value} !important`);
          decls.push("border-style:solid !important");
          decls.push("border-width:1px !important");
        } else if (prop === "background") {
          decls.push(`background-color:${value} !important`);
          decls.push("background-image:none !important");
          decls.push(`background:${value} !important`);
        } else if (prop === "color") {
          decls.push(`color:${value} !important`);
          decls.push(`-webkit-text-fill-color:${value} !important`);
        } else {
          decls.push(`${prop}:${value} !important`);
        }
      });
      return decls.join(";");
    };

    const renderPaintSheet = () => {
      const rules = Object.entries(paintMap).map(([id, styles]) => {
        const decls = paintDeclsFor(styles);
        return decls ? `[data-uimi-paint="${id}"]{${decls}}` : "";
      });
      paintSheet.textContent = rules.filter(Boolean).join("\n");
      refreshPaintUi();
    };

    const pushPaintHistory = () => {
      paintHistory.push(clonePaintMap(paintMap));
      if (paintHistory.length > 80) paintHistory.shift();
    };

    const persistPaint = () => {
      paintSaved = clonePaintMap(paintMap);
      paintMap = clonePaintMap(paintSaved);
      localStorage.setItem(PAINT_KEY, JSON.stringify(paintSaved));
      paintHistory = [];
      refreshPaintUi();
      document.querySelectorAll("[data-uimi-paint-save]").forEach((btn) => {
        const prior = btn.textContent;
        btn.textContent = "Saved";
        window.setTimeout(() => {
          btn.textContent = prior;
        }, 1400);
      });
    };

    const revertPaint = () => {
      paintMap = clonePaintMap(paintSaved);
      paintHistory = [];
      renderPaintSheet();
    };

    const undoPaint = () => {
      if (!paintHistory.length) return;
      paintMap = paintHistory.pop();
      renderPaintSheet();
    };

    const PAINT_SEEDS = [
      [".uimi-sidebar", "shell-sidebar"],
      [".uimi-navbar", "shell-navbar"],
      [".uimi-topbar", "shell-topbar"],
      [".uimi-main", "shell-main"],
      [".uimi-body", "shell-body"],

      ['[data-uimi-page="login-1"] .uimi-auth--split', "login1-shell"],
      ['[data-uimi-page="login-1"] .uimi-auth-brand', "login1-brand"],
      ['[data-uimi-page="login-1"] .uimi-auth-card', "login1-card"],
      ['[data-uimi-page="login-1"] .uimi-auth-card .uimi-kicker', "login1-card-kicker"],
      ['[data-uimi-page="login-1"] .uimi-auth-card .uimi-display', "login1-card-title"],
      ['[data-uimi-page="login-1"] .uimi-auth-card .uimi-label', "login1-card-label"],
      ['[data-uimi-page="login-1"] .uimi-auth-card .uimi-input', "login1-card-input"],
      ['[data-uimi-page="login-1"] .uimi-auth-card .uimi-btn', "login1-card-btn"],
      ['[data-uimi-page="login-1"] .uimi-auth-card .uimi-link', "login1-card-link"],
      ['[data-uimi-page="login-1"] .uimi-auth-brand .uimi-display', "login1-brand-title"],
      ['[data-uimi-page="login-1"] .uimi-auth-brand .uimi-kicker', "login1-brand-kicker"],
      ['[data-uimi-page="login-1"] .uimi-auth-brand > p:not(.uimi-kicker)', "login1-brand-copy"],
      ['[data-uimi-page="login-1"] .uimi-mark', "login1-mark"],

      ['[data-uimi-page="login-2"] .uimi-auth--center', "login2-shell"],
      ['[data-uimi-page="login-2"] .uimi-auth-card', "login2-card"],
      ['[data-uimi-page="login-2"] .uimi-auth-card .uimi-kicker', "login2-card-kicker"],
      ['[data-uimi-page="login-2"] .uimi-auth-card .uimi-display', "login2-card-title"],
      ['[data-uimi-page="login-2"] .uimi-auth-card .uimi-label', "login2-card-label"],
      ['[data-uimi-page="login-2"] .uimi-auth-card .uimi-input', "login2-card-input"],
      ['[data-uimi-page="login-2"] .uimi-auth-card .uimi-btn', "login2-card-btn"],
      ['[data-uimi-page="login-2"] .uimi-auth-card .uimi-link', "login2-card-link"],
      ['[data-uimi-page="login-2"] .uimi-mark', "login2-mark"],

      ['[data-uimi-page="dashboard-1"]', "dash1-page"],
      ['[data-uimi-page="dashboard-1"] .uimi-banner', "dash1-banner"],
      ['[data-uimi-page="dashboard-1"] .uimi-card', "dash1-card"],
      ['[data-uimi-page="dashboard-1"] .uimi-btn', "dash1-btn"],
      ['[data-uimi-page="dashboard-1"] .uimi-stat', "dash1-stat"],
      ['[data-uimi-page="dashboard-2"]', "dash2-page"],
      ['[data-uimi-page="dashboard-2"] .uimi-page-head', "dash2-head"],
      ['[data-uimi-page="dashboard-2"] .uimi-card', "dash2-card"],
      ['[data-uimi-page="dashboard-2"] .uimi-btn', "dash2-btn"],
      ['[data-uimi-page="dashboard-3"]', "dash3-page"],
      ['[data-uimi-page="dashboard-3"] .uimi-page-head', "dash3-head"],
      ['[data-uimi-page="dashboard-3"] .uimi-card', "dash3-card"],
      ['[data-uimi-page="dashboard-3"] .uimi-btn', "dash3-btn"],

      ['[data-uimi-page^="buttons"] .uimi-card', "buttons-card"],
      ['[data-uimi-page^="buttons"] .uimi-btn--primary', "buttons-primary"],
      ['[data-uimi-page^="buttons"] .uimi-btn--ghost', "buttons-ghost"],
      ['[data-uimi-page="cards"] .uimi-card', "cards-card"],
      ['[data-uimi-page="cards"] .uimi-note', "cards-note"],
      ['[data-uimi-page="tables"] .uimi-card', "tables-card"],
      ['[data-uimi-page="tables"] .uimi-table', "tables-table"],
      ['[data-uimi-page="charts"] .uimi-card', "charts-card"],
      ['[data-uimi-page="notifications"] .uimi-card', "notify-card"],
      ['[data-uimi-page="notifications"] .uimi-alert', "notify-alert"],
      ['[data-uimi-page="badges"] .uimi-card', "badges-card"],
      ['[data-uimi-page="badges"] .uimi-badge', "badges-badge"],
      ['[data-uimi-page="forms"] .uimi-card', "forms-card"],
      ['[data-uimi-page="forms"] .uimi-input', "forms-input"],
      ['[data-uimi-page="tabs"] .uimi-card', "tabs-card"],
      ['[data-uimi-page="settings"] .uimi-card', "settings-card"],

      [".uimi-btn--primary", "btn-primary"],
      [".uimi-btn--ghost", "btn-ghost"],
      [".uimi-card", "card"],
      [".uimi-note", "note"],
      [".uimi-banner", "banner"],
      [".uimi-input", "input"],
      [".uimi-table", "table"],
      [".uimi-badge", "badge"],
      [".uimi-alert", "alert"],
    ];

    const LOGIN1_LOCK_MAP = {
      "login2-shell": "login1-shell",
      "login2-card": "login1-card",
      "login2-card-kicker": "login1-card-kicker",
      "login2-card-title": "login1-card-title",
      "login2-card-label": "login1-card-label",
      "login2-card-input": "login1-card-input",
      "login2-card-btn": "login1-card-btn",
      "login2-card-link": "login1-card-link",
      "login2-mark": "login1-mark",
      "dash1-page": "login1-shell",
      "dash1-banner": "login1-brand",
      "dash1-card": "login1-card",
      "dash1-btn": "login1-card-btn",
      "dash2-page": "login1-card",
      "dash2-head": "login1-card",
      "dash2-card": "login1-card",
      "dash2-btn": "login1-card-btn",
      "dash3-page": "login1-brand",
      "dash3-head": "login1-card",
      "dash3-card": "login1-card",
      "dash3-btn": "login1-card-btn",
      "buttons-card": "login1-card",
      "buttons-primary": "login1-card-btn",
      "cards-card": "login1-card",
      "cards-note": "login1-brand",
      "tables-card": "login1-card",
      "charts-card": "login1-card",
      "notify-card": "login1-card",
      "badges-card": "login1-card",
      "forms-card": "login1-card",
      "forms-input": "login1-card-input",
      "tabs-card": "login1-card",
      "settings-card": "login1-card",
      "btn-primary": "login1-card-btn",
      "card": "login1-card",
      "note": "login1-brand",
      "banner": "login1-brand",
      "input": "login1-card-input",
      "shell-sidebar": "login1-brand",
      "shell-navbar": "login1-brand",
    };

    const hexToRgb = (hex) => {
      const raw = String(hex || "").replace("#", "");
      if (raw.length !== 3 && raw.length !== 6) return null;
      const full = raw.length === 3 ? raw.split("").map((c) => c + c).join("") : raw;
      return {
        r: parseInt(full.slice(0, 2), 16),
        g: parseInt(full.slice(2, 4), 16),
        b: parseInt(full.slice(4, 6), 16),
      };
    };

    const rgbToHex = ({ r, g, b }) => {
      const to = (n) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, "0");
      return `#${to(r)}${to(g)}${to(b)}`;
    };

    const complementaryHex = (hex) => {
      const rgb = hexToRgb(hex);
      if (!rgb) return hex;
      return rgbToHex({ r: 255 - rgb.r, g: 255 - rgb.g, b: 255 - rgb.b });
    };

    const mixHex = (a, b, amount = 0.35) => {
      const left = hexToRgb(a);
      const right = hexToRgb(b);
      if (!left || !right) return a;
      return rgbToHex({
        r: left.r + (right.r - left.r) * amount,
        g: left.g + (right.g - left.g) * amount,
        b: left.b + (right.b - left.b) * amount,
      });
    };

    const uniqueLogin1Colors = (map) => {
      const colors = [];
      Object.entries(map || {}).forEach(([id, styles]) => {
        if (!id.startsWith("login1-")) return;
        Object.values(styles || {}).forEach((value) => {
          if (!value || value === "transparent") return;
          if (!colors.includes(value)) colors.push(value);
        });
      });
      return colors;
    };

    const styleFromSource = (sourceStyles, colors, index) => {
      if (!sourceStyles) return null;
      const next = { ...sourceStyles };
      if (!colors.length) return next;
      // If the source page has few colors, nudge shell/banner targets toward a complement.
      if (colors.length < 3 && next.background) {
        const base = next.background;
        const alt = complementaryHex(base);
        next.background = index % 2 === 0 ? base : mixHex(base, alt, 0.28);
      }
      if (colors.length < 3 && next["border-color"]) {
        next["border-color"] = mixHex(next["border-color"], colors[0], 0.2);
      }
      return next;
    };

    const lockFromLogin1 = () => {
      const source = clonePaintMap(paintIsDirty() ? paintMap : paintSaved);
      const loginColors = uniqueLogin1Colors(source);
      if (!Object.keys(source).some((id) => id.startsWith("login1-"))) {
        window.alert("Paint and Save Login 1 first, then lock.");
        return false;
      }
      pushPaintHistory();
      const next = clonePaintMap(source);
      Object.entries(LOGIN1_LOCK_MAP).forEach(([targetId, sourceId], index) => {
        const from = source[sourceId];
        if (!from) return;
        next[targetId] = styleFromSource(from, loginColors, index);
      });
      // Shared shell uses brand/chrome from login1 when present.
      if (source["login1-brand"]) next["shell-sidebar"] = { ...source["login1-brand"] };
      if (source["login1-brand"]) next["shell-navbar"] = { ...source["login1-brand"] };
      if (source["login1-card"]) next["shell-topbar"] = { ...source["login1-card"] };
      if (source["login1-shell"] && source["login1-card"]) {
        const mainBg = mixHex(
          source["login1-shell"].background || source["login1-card"].background,
          source["login1-card"].background || "#ffffff",
          0.55
        );
        next["shell-main"] = { background: mainBg };
        // Each dashboard keeps its own page fill (lock seeds them; paint can diverge)
        if (!next["dash1-page"]?.background) next["dash1-page"] = { background: mainBg };
        if (!next["dash2-page"]?.background) {
          next["dash2-page"] = {
            background: mixHex(mainBg, source["login1-card"].background || "#ffffff", 0.35),
          };
        }
        if (!next["dash3-page"]?.background) {
          next["dash3-page"] = {
            background: mixHex(mainBg, source["login1-brand"]?.background || mainBg, 0.25),
          };
        }
      }
      paintMap = next;
      renderPaintSheet();
      window.__UIMI_PAINT_LOCK__ = {
        from: "login-1",
        colors: loginColors,
        map: clonePaintMap(paintMap),
      };
      return true;
    };

    const seedPaintTargets = () => {
      PAINT_SEEDS.forEach(([selector, id]) => {
        document.querySelectorAll(selector).forEach((el, index) => {
          if (el.closest(".uimi-studio")) return;
          if (el.dataset.uimiPaint) return;
          el.dataset.uimiPaint = index === 0 || selector.includes("uimi-page") ? id : `${id}-${index + 1}`;
        });
      });
    };

    const ensurePaintId = (el) => {
      if (el.dataset.uimiPaint) return el.dataset.uimiPaint;
      const page = el.closest("[data-uimi-page]")?.dataset.uimiPage || "shell";
      const cls = [...el.classList].find((name) => name.startsWith("uimi-")) || el.tagName.toLowerCase();
      const siblings = [...document.querySelectorAll(`[data-uimi-paint^="${page}:${cls}"]`)].length;
      const id = `${page}:${cls}${siblings ? `-${siblings + 1}` : ""}`;
      el.dataset.uimiPaint = id;
      return id;
    };

    const previewSheet = document.createElement("style");
    previewSheet.id = "uimi-paint-preview";
    document.head.appendChild(previewSheet);

    const popover = document.createElement("div");
    popover.className = "uimi-paint-pop";
    popover.hidden = true;
    popover.setAttribute("data-uimi-kit", "authoring");
    popover.innerHTML = `
      <div class="uimi-paint-pop__head" data-uimi-paint-drag>
        <span class="uimi-paint-pop__grip" aria-hidden="true"></span>
        <strong data-uimi-paint-target-label>Element</strong>
        <button type="button" class="uimi-paint-pop__close" data-uimi-paint-close aria-label="Close">×</button>
        </div>
      <div class="uimi-paint-pop__wheels">
        <label class="uimi-paint-pop__wheel">
          <span>Background</span>
          <span class="uimi-paint-pop__wheel-row">
            <input type="color" data-uimi-paint-wheel="background" value="#ffffff" />
            <button type="button" class="uimi-paint-pop__dropper" data-uimi-paint-dropper="background" title="Sample background from another element" aria-label="Sample background from another element" aria-pressed="false">↘</button>
          </span>
        </label>
        <label class="uimi-paint-pop__wheel">
          <span>Foreground</span>
          <span class="uimi-paint-pop__wheel-row">
            <input type="color" data-uimi-paint-wheel="color" value="#000000" />
            <button type="button" class="uimi-paint-pop__dropper" data-uimi-paint-dropper="color" title="Sample text color from another element" aria-label="Sample text color from another element" aria-pressed="false">↘</button>
          </span>
        </label>
      </div>
      <div class="uimi-paint-pop__clip" hidden>
        <code class="uimi-paint-pop__clip-hex" data-uimi-paint-clip-hex title="Click to apply · double-click to add swatch"></code>
        <button type="button" class="uimi-paint-pop__clip-add" data-uimi-paint-swatch-add title="Add to swatches" aria-label="Add to swatches">＋</button>
      </div>
      <div class="uimi-paint-pop__props" role="tablist">
        ${PAINT_PROPS.map(
          (prop) =>
            `<button type="button" class="uimi-paint-pop__prop" data-uimi-paint-prop="${prop.id}" aria-pressed="${prop.id === "background"}">${prop.label}</button>`
        ).join("")}
        </div>
      <div class="uimi-paint-pop__swatches" data-uimi-paint-swatches></div>
      <div class="uimi-paint-pop__foot">
        <button type="button" data-uimi-paint-clear-one>Reset</button>
          </div>
    `;
    document.body.appendChild(popover);

    const swatchRoot = popover.querySelector("[data-uimi-paint-swatches]");

    const makeSwatchChip = (name, hex) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "uimi-paint-pop__chip";
      const swatch = document.createElement("span");
      swatch.className = "uimi-paint-pop__chip-swatch";
      if (hex === "transparent") {
        swatch.classList.add("is-transparent");
      } else {
        swatch.style.setProperty("background-color", hex, "important");
      }
      const label = document.createElement("span");
      label.className = "uimi-paint-pop__chip-name";
      label.textContent = name;
      btn.appendChild(swatch);
      btn.appendChild(label);
      btn.title = `${name} ${hex}`;
      btn.setAttribute("aria-label", `${name} ${hex}`);
      btn.dataset.hex = hex;
      btn.dataset.name = name;
      return btn;
    };

    const renderPaintSwatches = () => {
      swatchRoot.innerHTML = "";
      const families = {};
      if (customSwatches.length) {
        families.Saved = {};
        customSwatches.forEach((hex) => {
          families.Saved[hex.slice(1).toUpperCase()] = hex;
        });
      }
      Object.assign(families, PAINT_COLORS);
      Object.entries(families).forEach(([family, shades]) => {
        const row = document.createElement("div");
        row.className = "uimi-paint-pop__family";
        row.innerHTML = `<span class="uimi-paint-pop__family-name">${family}</span>`;
        const chips = document.createElement("div");
        chips.className = "uimi-paint-pop__chips";
        Object.entries(shades).forEach(([name, hex]) => {
          chips.appendChild(makeSwatchChip(name, hex));
        });
        row.appendChild(chips);
        swatchRoot.appendChild(row);
      });
    };

    const currentPaintHex = () => {
      if (paintClipboard) return toWheelHex(paintClipboard, null);
      const wheel = popover.querySelector(`[data-uimi-paint-wheel="${paintProp === "color" ? "color" : "background"}"]`);
      if (wheel?.value) return toWheelHex(wheel.value, null);
      if (!paintTarget) return null;
      const id = paintTarget.dataset.uimiPaint;
      const saved = paintMap[id]?.[paintProp];
      return toWheelHex(saved, null);
    };

    let syncPaintChipsRef = () => {};

    const addClipboardToSwatch = () => {
      const hex = normalizeSwatchHex(currentPaintHex());
      if (!hex) return false;
      if (customSwatches.includes(hex)) {
        syncClipAddButton();
        return false;
      }
      customSwatches = saveCustomSwatches([hex, ...customSwatches]);
      paintClipboard = hex;
      const row = popover.querySelector(".uimi-paint-pop__clip");
      const hexLabel = popover.querySelector("[data-uimi-paint-clip-hex]");
      if (row) row.hidden = false;
      if (hexLabel) {
        hexLabel.textContent = hex;
        hexLabel.dataset.hex = hex;
      }
      copyText(hex).catch(() => {});
      renderPaintSwatches();
      syncPaintChipsRef();
      syncClipAddButton();
      swatchRoot.querySelector(".uimi-paint-pop__family")?.scrollIntoView({ block: "nearest" });
      return true;
    };

    const syncClipAddButton = () => {
      const addBtn = popover.querySelector("[data-uimi-paint-swatch-add]");
      if (!addBtn) return;
      const hex = currentPaintHex();
      const alreadySaved = Boolean(hex && customSwatches.includes(hex));
      addBtn.disabled = !hex || alreadySaved;
      addBtn.title = !hex
        ? "Pick or sample a color first"
        : alreadySaved
          ? "Already in Saved"
          : `Add ${hex} to swatches`;
    };

    const clearPaintPreview = () => {
      previewSheet.textContent = "";
    };

    const showPaintPreview = (hex, prop = paintProp) => {
      if (!paintTarget || !hex) {
        clearPaintPreview();
        return;
      }
      const id = ensurePaintId(paintTarget);
      const styles = { ...(paintMap[id] || {}), [prop]: hex };
      previewSheet.textContent = `[data-uimi-paint="${id}"]{${paintDeclsFor(styles)}}`;
    };

    let paintLiveStarted = false;

    const livePaintValue = (prop, hex) => {
      if (!paintTarget || !hex || !prop) return;
      const id = ensurePaintId(paintTarget);
      if (!paintLiveStarted) {
        pushPaintHistory();
        paintLiveStarted = true;
      }
      paintMap[id] = { ...(paintMap[id] || {}), [prop]: hex };
      clearPaintPreview();
      renderPaintSheet();
      const wheelHex = /^#[0-9a-f]{6}$/i.test(hex) ? hex.toLowerCase() : null;
      if (wheelHex) {
        if (prop === "border-color" || prop === "background" || prop === "color") {
          popover.querySelectorAll("[data-uimi-paint-wheel]").forEach((wheel) => {
            wheel.value = wheelHex;
          });
        }
      }
      popover.querySelectorAll(".uimi-paint-pop__chip").forEach((chip) => {
        chip.setAttribute("aria-pressed", String(prop === paintProp && chip.dataset.hex === hex));
      });
      setPaintClipboard(hex);
    };

    const endLivePaint = () => {
      paintLiveStarted = false;
    };

    const placePaintPop = (preferredX, preferredY, { flip = false } = {}) => {
      popover.hidden = false;
      const rect = popover.getBoundingClientRect();
      const pad = 8;
      let x = preferredX;
      let y = preferredY;
      if (flip && y + rect.height > window.innerHeight - pad) y = preferredY - rect.height - 12;
      if (x + rect.width > window.innerWidth - pad) x = window.innerWidth - rect.width - pad;
      if (y + rect.height > window.innerHeight - pad) y = window.innerHeight - rect.height - pad;
      if (x < pad) x = pad;
      if (y < pad) y = pad;
      popover.style.left = `${Math.round(x)}px`;
      popover.style.top = `${Math.round(y)}px`;
    };

    const toWheelHex = (value, fallback = "#ffffff") => {
      if (!value || value === "transparent") return fallback;
      const raw = String(value).trim().toLowerCase();
      if (/^#[0-9a-f]{6}$/i.test(raw)) return raw;
      if (/^#[0-9a-f]{3}$/i.test(raw)) {
        const rgb = hexToRgb(raw);
        return rgb ? rgbToHex(rgb) : fallback;
      }
      // rgb(255, 0, 0) / rgba(255, 0, 0, 1) / rgb(255 0 0 / 1)
      const match = raw.match(
        /rgba?\(\s*([\d.]+)\s*[,/\s]\s*([\d.]+)\s*[,/\s]\s*([\d.]+)/i
      );
      if (match) {
        return rgbToHex({
          r: Number(match[1]),
          g: Number(match[2]),
          b: Number(match[3]),
        });
      }
      return fallback;
    };

    customSwatches = loadCustomSwatches();
    renderPaintSwatches();

    const syncPaintChips = () => {
      if (!paintTarget) return;
      const id = paintTarget.dataset.uimiPaint;
      const current = paintMap[id]?.[paintProp];
      popover.querySelectorAll(".uimi-paint-pop__chip").forEach((chip) => {
        chip.setAttribute("aria-pressed", String(chip.dataset.hex === current));
      });
      syncPaintWheels();
    };
    syncPaintChipsRef = syncPaintChips;

    const syncPaintWheels = () => {
      if (!paintTarget) return;
      const id = paintTarget.dataset.uimiPaint;
      const styles = paintMap[id] || {};
      const computed = window.getComputedStyle(paintTarget);
      const bgWheel = popover.querySelector('[data-uimi-paint-wheel="background"]');
      const fgWheel = popover.querySelector('[data-uimi-paint-wheel="color"]');
      let active;
      if (paintProp === "color") {
        active = toWheelHex(styles.color || computed.color, "#000000");
      } else if (paintProp === "border-color") {
        active = toWheelHex(styles["border-color"] || computed.borderColor, "#000000");
      } else {
        active = toWheelHex(styles.background || computed.backgroundColor, "#ffffff");
      }
      if (bgWheel) bgWheel.value = active;
      if (fgWheel) fgWheel.value = active;
      if (active) setPaintClipboard(active);
      else syncClipAddButton();
    };

    const setSampleMode = (prop) => {
      paintSampleProp = prop || null;
      root.setAttribute("data-uimi-paint-sample", paintSampleProp || "");
      popover.querySelectorAll("[data-uimi-paint-dropper]").forEach((btn) => {
        const on = btn.dataset.uimiPaintDropper === paintSampleProp;
        btn.setAttribute("aria-pressed", String(on));
      });
    };

    const clearSampleMode = () => setSampleMode(null);

    const sampleColorFromElement = (el, prop) => {
      if (!el) return null;
      const computed = window.getComputedStyle(el);
      if (prop === "color") return toWheelHex(computed.color, "#000000");
      let node = el;
      for (let i = 0; i < 8 && node; i += 1) {
        const bg = window.getComputedStyle(node).backgroundColor;
        if (bg && bg !== "transparent" && !/^rgba\(\s*0\s*,\s*0\s*,\s*0\s*,\s*0\s*\)$/i.test(bg)) {
          return toWheelHex(bg, "#ffffff");
        }
        node = node.parentElement;
      }
      return toWheelHex(computed.backgroundColor, "#ffffff");
    };

    const setPaintClipboard = (hex) => {
      const normalized = toWheelHex(hex, null);
      paintClipboard = normalized || null;
      const row = popover.querySelector(".uimi-paint-pop__clip");
      const hexLabel = popover.querySelector("[data-uimi-paint-clip-hex]");
      if (!row || !hexLabel) return;
      if (!paintClipboard) {
        row.hidden = true;
        hexLabel.textContent = "";
        syncClipAddButton();
        return;
      }
      row.hidden = false;
      hexLabel.textContent = paintClipboard;
      hexLabel.dataset.hex = paintClipboard;
      copyText(paintClipboard).catch(() => {});
      syncClipAddButton();
    };

    const applyPaintValue = (prop, hex) => {
      if (!paintTarget || !hex) return;
      const id = ensurePaintId(paintTarget);
      pushPaintHistory();
      paintMap[id] = { ...(paintMap[id] || {}), [prop]: hex };
      clearPaintPreview();
      renderPaintSheet();
      syncPaintChips();
    };

    const closePaintPop = () => {
      clearPaintPreview();
      endLivePaint();
      clearSampleMode();
      popover.hidden = true;
      paintTarget = null;
      paintDrag = null;
      document.querySelectorAll(".uimi-paint-hot").forEach((el) => el.classList.remove("uimi-paint-hot"));
    };

    const openPaintPop = (el, event) => {
      clearPaintPreview();
      paintTarget = el;
      const id = ensurePaintId(el);
      document.querySelectorAll(".uimi-paint-hot").forEach((node) => node.classList.remove("uimi-paint-hot"));
      el.classList.add("uimi-paint-hot");
      popover.querySelector("[data-uimi-paint-target-label]").textContent = id;
      syncPaintChips();
      placePaintPop(event.clientX + 12, event.clientY + 12, { flip: true });
    };

    const setPaintMode = (on) => {
      if (on && typeof window.__UIMI_SET_MOVE_MODE__ === "function") {
        window.__UIMI_SET_MOVE_MODE__(false);
      }
      if (on && typeof window.__UIMI_HIDE_GLASS_UI__ === "function") {
        window.__UIMI_HIDE_GLASS_UI__();
      }
      if (!on && paintIsDirty()) {
        revertPaint();
        if (typeof clearPaintPreview === "function") clearPaintPreview();
        if (typeof closePaintPop === "function") closePaintPop();
      }
      root.setAttribute("data-uimi-paint-mode", on ? "on" : "off");
      document.querySelectorAll("[data-uimi-paint-toggle]").forEach((btn) => {
        btn.setAttribute("aria-pressed", String(on));
        btn.textContent = on ? "On" : "Off";
      });
      if (!on && typeof closePaintPop === "function") closePaintPop();
    };

    seedPaintTargets();
    renderPaintSheet();
    setPaintMode(false);

    document.querySelectorAll("[data-uimi-paint-toggle]").forEach((btn) => {
      btn.addEventListener("click", () => {
        setPaintMode(root.getAttribute("data-uimi-paint-mode") !== "on");
      });
    });

    document.querySelectorAll("[data-uimi-paint-save]").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (!paintIsDirty()) return;
        persistPaint();
      });
    });

    document.querySelectorAll("[data-uimi-paint-lock]").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (!lockFromLogin1()) return;
        const prior = btn.textContent;
        btn.textContent = "Locked";
        window.setTimeout(() => {
          btn.textContent = prior;
        }, 1400);
      });
    });

    document.querySelectorAll("[data-uimi-paint-undo]").forEach((btn) => {
      btn.addEventListener("click", () => {
        undoPaint();
        if (typeof clearPaintPreview === "function") clearPaintPreview();
        if (typeof syncPaintChips === "function") syncPaintChips();
      });
    });

    document.querySelectorAll("[data-uimi-paint-clear]").forEach((btn) => {
      btn.addEventListener("click", () => {
        pushPaintHistory();
        paintMap = {};
        clearPaintPreview();
        renderPaintSheet();
        closePaintPop();
      });
    });

    document.querySelectorAll("[data-uimi-paint-copy]").forEach((btn) => {
      btn.addEventListener("click", () => {
        copyText(JSON.stringify(paintMap, null, 2))
          .then(() => flashCopied(btn))
          .catch(() => {});
      });
    });

    popover.querySelectorAll("[data-uimi-paint-prop]").forEach((btn) => {
      btn.addEventListener("click", () => {
        clearPaintPreview();
        paintProp = btn.dataset.uimiPaintProp;
        popover.querySelectorAll("[data-uimi-paint-prop]").forEach((item) => {
          item.setAttribute("aria-pressed", String(item === btn));
        });
        syncPaintChips();
      });
    });

    popover.querySelectorAll("[data-uimi-paint-wheel]").forEach((input) => {
      input.addEventListener("pointerdown", () => {
        paintLiveStarted = false;
      });
      input.addEventListener("input", () => {
        if (!paintTarget) return;
        // Keep fill / text / border selection — wheels only pick the color
        livePaintValue(paintProp, input.value);
      });
      input.addEventListener("change", () => {
        endLivePaint();
      });
    });

    popover.querySelectorAll("[data-uimi-paint-dropper]").forEach((btn) => {
      btn.addEventListener("click", async (event) => {
        event.preventDefault();
        event.stopPropagation();
        const sampleFrom = btn.dataset.uimiPaintDropper;
        if (!sampleFrom || !paintTarget) return;
        if (window.EyeDropper) {
          try {
            const result = await new window.EyeDropper().open();
            const hex = toWheelHex(result.sRGBHex, "#ffffff");
            setPaintClipboard(hex);
            applyPaintValue(paintProp, hex);
            clearSampleMode();
            return;
          } catch {
            /* user cancelled — fall through to element sample */
          }
        }
        setSampleMode(paintSampleProp === sampleFrom ? null : sampleFrom);
      });
    });

    popover.querySelector("[data-uimi-paint-clip-hex]")?.addEventListener("click", () => {
      if (!paintClipboard || !paintTarget) return;
      applyPaintValue(paintProp, paintClipboard);
    });

    popover.querySelector("[data-uimi-paint-clip-hex]")?.addEventListener("dblclick", (event) => {
      event.preventDefault();
      event.stopPropagation();
      addClipboardToSwatch();
    });

    popover.querySelector("[data-uimi-paint-swatch-add]")?.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      addClipboardToSwatch();
    });

    popover.querySelector("[data-uimi-paint-close]")?.addEventListener("click", closePaintPop);
    popover.querySelector("[data-uimi-paint-clear-one]")?.addEventListener("click", () => {
      if (!paintTarget) return;
      const id = paintTarget.dataset.uimiPaint;
      pushPaintHistory();
      delete paintMap[id];
      clearPaintPreview();
      renderPaintSheet();
      closePaintPop();
    });

    const dragHandle = popover.querySelector("[data-uimi-paint-drag]");
    dragHandle?.addEventListener("pointerdown", (event) => {
      if (event.target.closest("[data-uimi-paint-close]")) return;
      event.preventDefault();
      const rect = popover.getBoundingClientRect();
      paintDrag = {
        offsetX: event.clientX - rect.left,
        offsetY: event.clientY - rect.top,
        pointerId: event.pointerId,
      };
      dragHandle.setPointerCapture?.(event.pointerId);
      popover.classList.add("is-dragging");
    });

    const movePaintPop = (event) => {
      if (!paintDrag) return;
      placePaintPop(event.clientX - paintDrag.offsetX, event.clientY - paintDrag.offsetY);
    };

    const endPaintDrag = () => {
      if (!paintDrag) return;
      paintDrag = null;
      popover.classList.remove("is-dragging");
    };

    window.addEventListener("pointermove", movePaintPop);
    window.addEventListener("pointerup", endPaintDrag);
    window.addEventListener("pointercancel", endPaintDrag);

    swatchRoot.addEventListener("pointerover", (event) => {
      const chip = event.target.closest(".uimi-paint-pop__chip");
      if (!chip || !paintTarget) return;
      showPaintPreview(chip.dataset.hex, paintProp);
    });

    swatchRoot.addEventListener("pointerleave", clearPaintPreview);

    swatchRoot.addEventListener("click", (event) => {
      const chip = event.target.closest(".uimi-paint-pop__chip");
      if (!chip || !paintTarget) return;
      endLivePaint();
      applyPaintValue(paintProp, chip.dataset.hex);
    });

    document.addEventListener(
      "click",
      (event) => {
        if (root.getAttribute("data-uimi-paint-mode") !== "on") return;
        if (root.getAttribute("data-uimi-move-mode") === "on") return;
        if (event.target.closest(".uimi-studio, .uimi-paint-pop")) return;
        let el = event.target.closest(".uimi-app *");
        if (!el || el.closest(".uimi-studio") || el.classList.contains("uimi-app")) return;
        if (el.classList.contains("uimi-auth-slant") || el.closest(".uimi-auth-slant")) {
          el = el.closest(".uimi-auth-brand") || el;
        }
        if (el.closest("svg")) {
          el = el.closest("[data-uimi-paint], .uimi-chart, .uimi-icon, .uimi-mark, .uimi-btn, .uimi-card") || el;
        }
        event.preventDefault();
        event.stopPropagation();
        if (paintSampleProp && paintTarget) {
          const hex = sampleColorFromElement(el, paintSampleProp);
          if (hex) {
            setPaintClipboard(hex);
            applyPaintValue(paintProp, hex);
          }
          clearSampleMode();
          return;
        }
        openPaintPop(el, event);
      },
      true
    );

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        if (paintSampleProp) {
          clearSampleMode();
          return;
        }
        closePaintPop();
      }
      const mod = event.metaKey || event.ctrlKey;
      if (mod && event.key.toLowerCase() === "z" && !event.shiftKey) {
        if (paintHistory.length) {
          event.preventDefault();
          undoPaint();
        }
      }
      if (mod && event.key.toLowerCase() === "s") {
        if (paintIsDirty()) {
          event.preventDefault();
          persistPaint();
        }
      }
    });

    window.addEventListener("beforeunload", (event) => {
      if (!paintIsDirty() && !(typeof moveIsDirty === "function" && moveIsDirty())) return;
      event.preventDefault();
      event.returnValue = "";
    });

    const MOVE_KEY = "uimi-move-map";
    const moveSheet = document.createElement("style");
    moveSheet.id = "uimi-move-sheet";
    document.head.appendChild(moveSheet);

    const loadMoveMap = () => {
      try {
        return JSON.parse(localStorage.getItem(MOVE_KEY) || "{}") || {};
      } catch {
        return {};
      }
    };

    let moveSaved = clonePaintMap(loadMoveMap());
    let moveMap = clonePaintMap(moveSaved);
    let moveHistory = [];
    let moveDrag = null;

    const moveIsDirty = () => JSON.stringify(moveMap) !== JSON.stringify(moveSaved);

    const refreshMoveUi = () => {
      const count = Object.keys(moveMap).length;
      const dirty = moveIsDirty();
      window.__UIMI_MOVE__ = clonePaintMap(moveSaved);
      window.__UIMI_MOVE_DRAFT__ = clonePaintMap(moveMap);
      document.querySelectorAll("[data-uimi-move-count]").forEach((el) => {
        el.textContent = `${count} move${count === 1 ? "" : "s"}`;
      });
      document.querySelectorAll("[data-uimi-move-status]").forEach((el) => {
        el.hidden = !dirty;
      });
      document.querySelectorAll("[data-uimi-move-save]").forEach((btn) => {
        btn.disabled = !dirty;
      });
      document.querySelectorAll("[data-uimi-move-undo]").forEach((btn) => {
        btn.disabled = moveHistory.length === 0;
      });
    };

    const renderMoveSheet = () => {
      const rules = Object.entries(moveMap).map(([id, pos]) => {
        if (!pos) return "";
        const x = Number(pos.x) || 0;
        const y = Number(pos.y) || 0;
        if (!x && !y) return "";
        return `[data-uimi-paint="${id}"]{position:relative !important;left:${x}px !important;top:${y}px !important;z-index:6 !important;}`;
      });
      moveSheet.textContent = rules.filter(Boolean).join("\n");
      refreshMoveUi();
    };

    const pushMoveHistory = () => {
      moveHistory.push(clonePaintMap(moveMap));
      if (moveHistory.length > 80) moveHistory.shift();
    };

    const persistMove = () => {
      moveSaved = clonePaintMap(moveMap);
      moveMap = clonePaintMap(moveSaved);
      try {
        localStorage.setItem(MOVE_KEY, JSON.stringify(moveSaved));
      } catch {
        /* ignore quota / private mode */
      }
      moveHistory = [];
      renderMoveSheet();
      document.querySelectorAll("[data-uimi-move-save]").forEach((btn) => {
        const prior = btn.textContent;
        btn.textContent = "Saved";
        window.setTimeout(() => {
          btn.textContent = prior;
        }, 1400);
      });
    };

    const revertMove = () => {
      moveMap = clonePaintMap(moveSaved);
      moveHistory = [];
      renderMoveSheet();
    };

    const undoMove = () => {
      if (!moveHistory.length) return;
      moveMap = moveHistory.pop();
      renderMoveSheet();
    };

    const paintPathFor = (el) => {
      if (!el || el.nodeType !== 1) return "";
      const parts = [];
      let node = el;
      while (node && node.nodeType === 1 && parts.length < 10) {
        if (node.id) {
          parts.unshift(`#${CSS.escape(node.id)}`);
          break;
        }
        const parent = node.parentElement;
        if (!parent) {
          parts.unshift(node.tagName.toLowerCase());
          break;
        }
        const index = [...parent.children].indexOf(node) + 1;
        parts.unshift(`${node.tagName.toLowerCase()}:nth-child(${index})`);
        node = parent;
        if (node.classList?.contains("uimi-app")) {
          parts.unshift(".uimi-app");
          break;
        }
      }
      return parts.join(">");
    };

    const hydrateMoveTargets = () => {
      seedPaintTargets();
      Object.entries(moveMap).forEach(([id, pos]) => {
        if (document.querySelector(`[data-uimi-paint="${id}"]`)) return;
        const sel = pos?.sel;
        if (!sel) return;
        try {
          const el = document.querySelector(sel);
          if (el && !el.closest(".uimi-studio")) {
            el.dataset.uimiPaint = id;
          }
        } catch {
          /* invalid selector */
        }
      });
    };

    const setMoveMode = (on) => {
      // Keep positions: save drafts when leaving Move instead of discarding
      if (!on && moveIsDirty()) {
        persistMove();
      }
      if (on) setPaintMode(false);
      if (on && typeof window.__UIMI_HIDE_GLASS_UI__ === "function") {
        window.__UIMI_HIDE_GLASS_UI__();
      }
      root.setAttribute("data-uimi-move-mode", on ? "on" : "off");
      document.querySelectorAll("[data-uimi-move-toggle]").forEach((btn) => {
        btn.setAttribute("aria-pressed", String(on));
        btn.textContent = on ? "On" : "Off";
      });
      if (!on) {
        moveDrag = null;
        document.querySelectorAll(".uimi-move-hot").forEach((el) => el.classList.remove("uimi-move-hot"));
        hydrateMoveTargets();
        renderMoveSheet();
      }
    };
    window.__UIMI_SET_MOVE_MODE__ = setMoveMode;
    window.__UIMI_CLEAR_MOVE__ = () => {
      moveSaved = {};
      moveMap = {};
      moveHistory = [];
      localStorage.removeItem(MOVE_KEY);
      moveSheet.textContent = "";
      refreshMoveUi();
    };

    hydrateMoveTargets();
    renderMoveSheet();
    setMoveMode(false);

    document.querySelectorAll("[data-uimi-move-toggle]").forEach((btn) => {
      btn.addEventListener("click", () => {
        setMoveMode(root.getAttribute("data-uimi-move-mode") !== "on");
      });
    });

    document.querySelectorAll("[data-uimi-move-save]").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (!moveIsDirty()) return;
        persistMove();
      });
    });

    document.querySelectorAll("[data-uimi-move-undo]").forEach((btn) => {
      btn.addEventListener("click", () => undoMove());
    });

    document.querySelectorAll("[data-uimi-move-clear]").forEach((btn) => {
      btn.addEventListener("click", () => {
        pushMoveHistory();
        moveMap = {};
        moveSaved = {};
        try {
          localStorage.removeItem(MOVE_KEY);
        } catch {
          /* ignore */
        }
        renderMoveSheet();
      });
    });

    document.addEventListener(
      "pointerdown",
      (event) => {
        if (root.getAttribute("data-uimi-move-mode") !== "on") return;
        if (event.button !== 0) return;
        if (event.target.closest(".uimi-studio, .uimi-paint-pop")) return;
        let el = event.target.closest(".uimi-app *");
        if (!el || el.closest(".uimi-studio") || el.classList.contains("uimi-app")) return;
        if (el.classList.contains("uimi-auth-slant") || el.closest(".uimi-auth-slant")) {
          el = el.closest(".uimi-auth-brand") || el;
        }
        if (el.closest("svg")) {
          el = el.closest("[data-uimi-paint], .uimi-chart, .uimi-icon, .uimi-mark, .uimi-btn, .uimi-card") || el;
        }
        event.preventDefault();
        const id = ensurePaintId(el);
        const current = moveMap[id] || { x: 0, y: 0 };
        pushMoveHistory();
        moveDrag = {
          el,
          id,
          sel: paintPathFor(el),
          startX: event.clientX,
          startY: event.clientY,
          originX: Number(current.x) || 0,
          originY: Number(current.y) || 0,
          moved: false,
          historyPushed: true,
        };
        document.querySelectorAll(".uimi-move-hot").forEach((node) => node.classList.remove("uimi-move-hot"));
        el.classList.add("uimi-move-hot");
        el.setPointerCapture?.(event.pointerId);
      },
      true
    );

    window.addEventListener("pointermove", (event) => {
      if (!moveDrag) return;
      const dx = event.clientX - moveDrag.startX;
      const dy = event.clientY - moveDrag.startY;
      if (Math.abs(dx) > 2 || Math.abs(dy) > 2) moveDrag.moved = true;
      const x = Math.round(moveDrag.originX + dx);
      const y = Math.round(moveDrag.originY + dy);
      moveMap[moveDrag.id] = { x, y, sel: moveDrag.sel || paintPathFor(moveDrag.el) };
      renderMoveSheet();
    });

    window.addEventListener("pointerup", () => {
      if (!moveDrag) return;
      if (!moveDrag.moved && moveDrag.historyPushed) {
        // No drag — drop empty history entry
        moveHistory.pop();
      } else if (moveDrag.moved) {
        const final = moveMap[moveDrag.id] || { x: 0, y: 0 };
        if (!final.x && !final.y) delete moveMap[moveDrag.id];
        else {
          moveMap[moveDrag.id] = {
            x: Number(final.x) || 0,
            y: Number(final.y) || 0,
            sel: final.sel || moveDrag.sel || paintPathFor(moveDrag.el),
          };
        }
        renderMoveSheet();
      }
      moveDrag.el?.classList.remove("uimi-move-hot");
      moveDrag = null;
    });

    window.addEventListener("pointercancel", () => {
      if (!moveDrag) return;
      if (moveDrag.historyPushed) {
        undoMove();
      }
      moveDrag.el?.classList.remove("uimi-move-hot");
      moveDrag = null;
    });

    const GLASS_MAP_KEY = "uimi-glass-map";
    const GLASS_MODE_KEY = "uimi-glass-mode";
    const GLASS_BG_KEY = "uimi-glass-bg";
    const GLASS_BG_IDS = ["mist", "porcelain", "slate", "graphite"];
    const GLASS_BG_PAIR = { mist: "slate", porcelain: "graphite", slate: "mist", graphite: "porcelain" };
    const isDarkPalette = () => root.getAttribute("data-uimi-palette") === "midnight";
    const defaultGlassBg = () => (isDarkPalette() ? "slate" : "mist");
    // Default chrome when turning Glass On with an empty map (iPhone-like master switch)
    const GLASS_DEFAULT_KEYS = [
      "uimi-card",
      "uimi-navbar",
      "uimi-sidebar",
      "uimi-auth-card",
      "uimi-banner",
      "uimi-stat",
      "uimi-table-wrap",
      "uimi-notify-panel",
    ];
    // Optical presets from shayxo LiquidGlass research table
    // https://liquidglass.shayxo.dev/research/parameters/
    // Mapped into UIMi CSS slider units (blur px, tint %, specular 0–100, etc.)
    const GLASS_PRESET_KEYS = ["regular", "clear", "chrome", "thick"];
    const GLASS_PRESET_OPTICS = [
      "thickness",
      "bezel",
      "ior",
      "scale",
      "blur",
      "specular",
      "specSat",
      "tint",
      "tintColor",
      "innerColor",
      "innerBlur",
      "innerSpread",
      "outerBlur",
      "depth",
      "refract",
    ];
    const glassPresets = {
      regular: {
        thickness: 45,
        bezel: 18,
        ior: 1.5,
        scale: 1,
        blur: 10,
        specular: 55,
        specSat: 160,
        tint: 10,
        tintColor: "#ffffff",
        innerColor: "#0f1624",
        innerBlur: 14,
        innerSpread: -5,
        outerBlur: 18,
        depth: 35,
        refract: 12,
      },
      clear: {
        thickness: 40,
        bezel: 16,
        ior: 1.5,
        scale: 1,
        blur: 4,
        specular: 70,
        specSat: 170,
        tint: 4,
        tintColor: "#ffffff",
        innerColor: "#0f1624",
        innerBlur: 10,
        innerSpread: -4,
        outerBlur: 14,
        depth: 40,
        refract: 14,
      },
      chrome: {
        thickness: 30,
        bezel: 12,
        ior: 1.5,
        scale: 1,
        blur: 14,
        specular: 50,
        specSat: 140,
        tint: 11,
        tintColor: "#ffffff",
        innerColor: "#0f1624",
        innerBlur: 10,
        innerSpread: -4,
        outerBlur: 12,
        depth: 22,
        refract: 8,
      },
      thick: {
        thickness: 70,
        bezel: 24,
        ior: 1.5,
        scale: 1.05,
        blur: 16,
        specular: 45,
        specSat: 170,
        tint: 13,
        tintColor: "#ffffff",
        innerColor: "#0f1624",
        innerBlur: 20,
        innerSpread: -6,
        outerBlur: 28,
        depth: 55,
        refract: 10,
      },
    };
    const themeInkHex = () => {
      try {
        const raw = getComputedStyle(root).getPropertyValue("--uimi-ink").trim();
        const hex = toWheelHex(raw, "");
        if (/^#[0-9a-f]{6}$/i.test(hex)) return hex;
      } catch {
        /* fall through */
      }
      return isDarkPalette() ? "#e8eef8" : "#111111";
    };
    const glassDefaults = {
      radius: 4,
      textColor: themeInkHex(),
      ...glassPresets.regular,
    };
    const GLASS_COLOR_PARAMS = new Set(["tintColor", "innerColor", "textColor"]);
    const GLASS_SURFACES =
      ".uimi-card, .uimi-btn, .uimi-banner, .uimi-note, .uimi-alert, .uimi-auth-card, .uimi-auth-brand, .uimi-sidebar, .uimi-navbar, .uimi-stat, .uimi-input, .uimi-badge, .uimi-table-wrap, .uimi-notify-panel, .uimi-page";
    const GLASS_CLASS_PRIORITY = [
      "uimi-btn--primary",
      "uimi-btn--info",
      "uimi-btn--success",
      "uimi-btn--warning",
      "uimi-btn--danger",
      "uimi-btn--ghost",
      "uimi-btn",
      "uimi-card",
      "uimi-banner",
      "uimi-note",
      "uimi-alert",
      "uimi-auth-card",
      "uimi-auth-brand",
      "uimi-sidebar",
      "uimi-navbar",
      "uimi-stat",
      "uimi-input",
      "uimi-badge",
      "uimi-table-wrap",
      "uimi-notify-panel",
      "uimi-page",
    ];

    const loadGlassMap = () => {
      try {
        const raw = JSON.parse(localStorage.getItem(GLASS_MAP_KEY) || "{}");
        if (!raw || typeof raw !== "object" || Array.isArray(raw)) return {};
        // Drop legacy paint-id entries
        const next = {};
        Object.entries(raw).forEach(([key, value]) => {
          if (!key || key.includes(":") || !value || typeof value !== "object" || value.sel) return;
          next[key] = { ...glassDefaults, ...value };
        });
        return next;
      } catch {
        return {};
      }
    };

    let glassMap = loadGlassMap();
    let glassMode = localStorage.getItem(GLASS_MODE_KEY) === "on" ? "on" : "off";
    let glassTarget = null;
    let glassClassKey = "";
    let glassDraft = { ...glassDefaults };
    let glassDrag = null;
    let glassPanelPos = null;

    const glassSheet = document.createElement("style");
    glassSheet.id = "uimi-glass-sheet";
    document.head.appendChild(glassSheet);

    const gear = document.createElement("button");
    gear.type = "button";
    gear.className = "uimi-glass-gear";
    gear.hidden = true;
    gear.setAttribute("data-uimi-kit", "authoring");
    gear.setAttribute("aria-label", "Liquid glass settings");
    gear.innerHTML = '<span class="uimi-icon uimi-icon-settings" aria-hidden="true"></span>';
    document.body.appendChild(gear);

    const modal = document.createElement("div");
    modal.className = "uimi-glass-modal";
    modal.hidden = true;
    modal.setAttribute("data-uimi-kit", "authoring");
    modal.innerHTML = `
      <div class="uimi-glass-modal__panel" role="dialog" aria-modal="true" aria-labelledby="uimi-glass-title">
        <div class="uimi-glass-modal__head" data-uimi-glass-drag>
          <span class="uimi-glass-modal__grip" aria-hidden="true"></span>
          <div>
            <strong id="uimi-glass-title">Liquid Glass</strong>
            <span data-uimi-glass-class></span>
          </div>
          <button type="button" class="uimi-glass-modal__close" data-uimi-glass-close aria-label="Close">×</button>
        </div>
        <div class="uimi-glass-modal__rows">
          <div class="uimi-glass-modal__section">Preset</div>
          <div class="uimi-glass-modal__presets" role="group" aria-label="Liquid Glass presets">
            <button type="button" class="uimi-glass-modal__preset" data-uimi-glass-preset="regular" aria-pressed="true">Regular</button>
            <button type="button" class="uimi-glass-modal__preset" data-uimi-glass-preset="clear" aria-pressed="false">Clear</button>
            <button type="button" class="uimi-glass-modal__preset" data-uimi-glass-preset="chrome" aria-pressed="false">Chrome</button>
            <button type="button" class="uimi-glass-modal__preset" data-uimi-glass-preset="thick" aria-pressed="false">Thick</button>
          </div>

          <!-- Customization controls hidden for now
          <div class="uimi-glass-modal__section">Shape</div>
          <label class="uimi-glass-modal__row"><span>Radius</span><input type="range" data-uimi-glass-param="radius" min="0" max="48" step="1" /><output data-uimi-glass-out="radius"></output></label>

          <div class="uimi-glass-modal__section">Refraction</div>
          <label class="uimi-glass-modal__row"><span>Thickness</span><input type="range" data-uimi-glass-param="thickness" min="10" max="100" step="1" /><output data-uimi-glass-out="thickness"></output></label>
          <label class="uimi-glass-modal__row"><span>Bezel</span><input type="range" data-uimi-glass-param="bezel" min="0" max="100" step="1" /><output data-uimi-glass-out="bezel"></output></label>
          <label class="uimi-glass-modal__row"><span>IOR</span><input type="range" data-uimi-glass-param="ior" min="1" max="3" step="0.05" /><output data-uimi-glass-out="ior"></output></label>
          <label class="uimi-glass-modal__row"><span>Scale</span><input type="range" data-uimi-glass-param="scale" min="0.5" max="2" step="0.05" /><output data-uimi-glass-out="scale"></output></label>
          <label class="uimi-glass-modal__row"><span>Lens</span><input type="range" data-uimi-glass-param="refract" min="0" max="24" step="1" /><output data-uimi-glass-out="refract"></output></label>

          <div class="uimi-glass-modal__section">Appearance</div>
          <label class="uimi-glass-modal__row"><span>Blur</span><input type="range" data-uimi-glass-param="blur" min="4" max="48" step="1" /><output data-uimi-glass-out="blur"></output></label>
          <label class="uimi-glass-modal__row"><span>Spec op</span><input type="range" data-uimi-glass-param="specular" min="0" max="100" step="1" /><output data-uimi-glass-out="specular"></output></label>
          <label class="uimi-glass-modal__row"><span>Spec sat</span><input type="range" data-uimi-glass-param="specSat" min="50" max="300" step="5" /><output data-uimi-glass-out="specSat"></output></label>
          <label class="uimi-glass-modal__row"><span>Depth</span><input type="range" data-uimi-glass-param="depth" min="0" max="100" step="1" /><output data-uimi-glass-out="depth"></output></label>
          <label class="uimi-glass-modal__row"><span>Text</span><input type="color" data-uimi-glass-param="textColor" /><output data-uimi-glass-out="textColor"></output></label>

          <div class="uimi-glass-modal__section">Inner shadow</div>
          <label class="uimi-glass-modal__row"><span>Color</span><input type="color" data-uimi-glass-param="innerColor" /><output data-uimi-glass-out="innerColor"></output></label>
          <label class="uimi-glass-modal__row"><span>Blur</span><input type="range" data-uimi-glass-param="innerBlur" min="0" max="48" step="1" /><output data-uimi-glass-out="innerBlur"></output></label>
          <label class="uimi-glass-modal__row"><span>Spread</span><input type="range" data-uimi-glass-param="innerSpread" min="-20" max="20" step="1" /><output data-uimi-glass-out="innerSpread"></output></label>

          <div class="uimi-glass-modal__section">Tint</div>
          <label class="uimi-glass-modal__row"><span>Color</span><input type="color" data-uimi-glass-param="tintColor" /><output data-uimi-glass-out="tintColor"></output></label>
          <label class="uimi-glass-modal__row"><span>Opacity</span><input type="range" data-uimi-glass-param="tint" min="0" max="40" step="1" /><output data-uimi-glass-out="tint"></output></label>

          <div class="uimi-glass-modal__section">Outer shadow</div>
          <label class="uimi-glass-modal__row"><span>Blur</span><input type="range" data-uimi-glass-param="outerBlur" min="0" max="64" step="1" /><output data-uimi-glass-out="outerBlur"></output></label>

          <div class="uimi-glass-modal__section">Background</div>
          <div class="uimi-glass-modal__bg" role="group" aria-label="Glass background">
            <button type="button" class="uimi-glass-modal__bg-btn" data-uimi-glass-bg="mist" aria-pressed="false"><span class="uimi-glass-modal__bg-swatch" aria-hidden="true"></span><span>Mist · cool</span></button>
            <button type="button" class="uimi-glass-modal__bg-btn" data-uimi-glass-bg="porcelain" aria-pressed="false"><span class="uimi-glass-modal__bg-swatch" aria-hidden="true"></span><span>Porcelain · warm</span></button>
            <button type="button" class="uimi-glass-modal__bg-btn" data-uimi-glass-bg="slate" aria-pressed="false"><span class="uimi-glass-modal__bg-swatch" aria-hidden="true"></span><span>Slate · cool</span></button>
            <button type="button" class="uimi-glass-modal__bg-btn" data-uimi-glass-bg="graphite" aria-pressed="false"><span class="uimi-glass-modal__bg-swatch" aria-hidden="true"></span><span>Graphite · warm</span></button>
          </div>
          -->
        </div>
        <div class="uimi-glass-modal__foot">
          <button type="button" data-uimi-glass-apply>Apply to class</button>
          <button type="button" data-uimi-glass-apply-all>Apply to all</button>
          <button type="button" data-uimi-glass-remove>Remove</button>
          <button type="button" data-uimi-glass-defaults>Defaults</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    const hexToRgbTriplet = (hex) => {
      const rgb = hexToRgb(hex);
      if (!rgb) return "255, 255, 255";
      return `${rgb.r}, ${rgb.g}, ${rgb.b}`;
    };

    const settingsToVars = (settings) => {
      const nativeRadius =
        typeof settings.radiusValue === "string" && settings.radiusValue.trim()
          ? settings.radiusValue.trim()
          : "";
      const radius =
        settings.radius === "native" && nativeRadius
          ? nativeRadius
          : `${Math.max(0, Number(settings.radius) || 0)}px`;
      const thickness = Math.max(0, Math.min(100, Number(settings.thickness) || 0)) / 100;
      const bezel = Math.max(0, Math.min(100, Number(settings.bezel) || 0)) / 100;
      const ior = Math.max(1, Math.min(3, Number(settings.ior) || glassDefaults.ior));
      const scale = Math.max(0.5, Math.min(2, Number(settings.scale) || 1));
      const blur = Math.max(4, Number(settings.blur) || glassDefaults.blur);
      const tint = Math.max(0, Math.min(100, Number(settings.tint) || 0));
      const specular = Math.max(0, Math.min(100, Number(settings.specular) || 0)) / 100;
      const specSat = Math.max(0.5, Math.min(3, (Number(settings.specSat) || glassDefaults.specSat) / 100));
      const depth = Math.max(0, Math.min(100, Number(settings.depth) || 0)) / 100;
      const refract = Math.max(0, Math.min(24, Number(settings.refract) || 0));
      const tintColor = /^#[0-9a-f]{6}$/i.test(settings.tintColor) ? settings.tintColor : glassDefaults.tintColor;
      const textColor = /^#[0-9a-f]{6}$/i.test(settings.textColor) ? settings.textColor : glassDefaults.textColor;
      const innerColor = /^#[0-9a-f]{6}$/i.test(settings.innerColor) ? settings.innerColor : glassDefaults.innerColor;
      const innerBlur = Math.max(0, Number(settings.innerBlur) || 0);
      const innerSpread = Number(settings.innerSpread) || 0;
      const outerBlur = Math.max(0, Number(settings.outerBlur) || 0);
      return {
        "--uimi-glass-radius": radius,
        "--uimi-glass-thickness": String(thickness),
        "--uimi-glass-bezel": String(bezel),
        "--uimi-glass-ior": String(ior),
        "--uimi-glass-scale": String(scale),
        "--uimi-glass-blur": `${blur}px`,
        "--uimi-glass-tint-opacity": String(tint / 100),
        "--uimi-glass-tint": hexToRgbTriplet(tintColor),
        "--uimi-glass-text": textColor,
        "--uimi-glass-text-shadow": "none",
        "--uimi-glass-specular": String(specular),
        "--uimi-glass-spec-sat": String(specSat),
        "--uimi-glass-depth": String(depth),
        "--uimi-glass-stroke": String(0.22 + bezel * 0.35 + specular * 0.2),
        "--uimi-glass-shadow": String(0.1 + depth * 0.22 + outerBlur / 200),
        "--uimi-glass-saturate": String(1.15 + ior * 0.18 + refract * 0.03 + specular * 0.12),
        "--uimi-glass-brightness": String(1.02 + specular * 0.1 + thickness * 0.04),
        "--uimi-glass-contrast": String(1.01 + depth * 0.05 + (ior - 1) * 0.04 + refract * 0.01),
        "--uimi-glass-refract": String(refract),
        "--uimi-glass-inner-color": hexToRgbTriplet(innerColor),
        "--uimi-glass-inner-blur": `${innerBlur}px`,
        "--uimi-glass-inner-spread": `${innerSpread}px`,
        "--uimi-glass-outer-blur": `${outerBlur}px`,
      };
    };

    const persistGlassMap = () => {
      localStorage.setItem(GLASS_MAP_KEY, JSON.stringify(glassMap));
    };

    const syncGlassBgButtons = (id) => {
      modal.querySelectorAll("[data-uimi-glass-bg]").forEach((btn) => {
        btn.setAttribute("aria-pressed", String(btn.dataset.uimiGlassBg === id));
      });
    };

    const applyGlassBg = (id, { persist = true } = {}) => {
      const next = GLASS_BG_IDS.includes(id) ? id : defaultGlassBg();
      root.setAttribute("data-uimi-glass-bg", next);
      if (persist) localStorage.setItem(GLASS_BG_KEY, next);
      syncGlassBgButtons(next);
      return next;
    };

    const loadGlassBg = () => {
      const saved = localStorage.getItem(GLASS_BG_KEY);
      return GLASS_BG_IDS.includes(saved) ? saved : defaultGlassBg();
    };

    const remapGlassBgForPalette = () => {
      const saved = localStorage.getItem(GLASS_BG_KEY);
      if (!GLASS_BG_IDS.includes(saved)) {
        applyGlassBg(defaultGlassBg());
        return;
      }
      const darkBg = saved === "slate" || saved === "graphite";
      if (isDarkPalette() && !darkBg) applyGlassBg(GLASS_BG_PAIR[saved] || "slate");
      else if (!isDarkPalette() && darkBg) applyGlassBg(GLASS_BG_PAIR[saved] || "mist");
      else applyGlassBg(saved);
    };

    const syncGlassModeButtons = () => {
      document.querySelectorAll("[data-uimi-glass-mode]").forEach((btn) => {
        btn.setAttribute("aria-pressed", btn.dataset.uimiGlassMode === glassMode ? "true" : "false");
      });
    };

    const refreshGlassCount = () => {
      const count = Object.keys(glassMap).length;
      const active = glassMode === "on" && count > 0;
      root.setAttribute("data-uimi-glass", glassMode);
      root.setAttribute("data-uimi-has-glass", active ? "on" : "off");
      document.querySelectorAll("[data-uimi-glass-count]").forEach((el) => {
        el.textContent = glassMode === "off" ? "off" : `${count} glass`;
      });
      syncGlassModeButtons();
    };

    const renderGlassSheet = () => {
      if (glassMode !== "on") {
        glassSheet.textContent = "";
        refreshGlassCount();
        return;
      }
      const rules = Object.entries(glassMap).map(([key, settings]) => {
        const vars = settingsToVars(settings);
        const decls = Object.entries(vars)
          .map(([name, value]) => `${name}:${value}`)
          .join(";");
        return `.uimi-app .${CSS.escape(key)}.uimi-glass{${decls}}`;
      });
      glassSheet.textContent = rules.join("\n");
      refreshGlassCount();
    };

    const stripGlassClasses = () => {
      document.querySelectorAll(".uimi-app .uimi-glass").forEach((el) => el.classList.remove("uimi-glass"));
      document.querySelectorAll(".uimi-glass-hot").forEach((el) => el.classList.remove("uimi-glass-hot"));
      hideGlassGear();
      closeGlassModal({ revert: false });
    };

    const seedDefaultGlassMap = () => {
      GLASS_DEFAULT_KEYS.forEach((key) => {
        const els = targetsForClass(key).filter((el) => !isNestedGlassChild(el));
        if (!els.length) return;
        glassMap[key] = tailorGlassForClass(key, glassPresets.regular, els[0]);
      });
      persistGlassMap();
    };

    const setGlassMode = (next, { seed = true } = {}) => {
      glassMode = next === "on" ? "on" : "off";
      localStorage.setItem(GLASS_MODE_KEY, glassMode);
      root.setAttribute("data-uimi-glass", glassMode);
      if (glassMode === "off") {
        stripGlassClasses();
        renderGlassSheet();
        return;
      }
      if (seed && !Object.keys(glassMap).length) seedDefaultGlassMap();
      hydrateGlassTargets();
    };

    const resolveGlassSurface = (el) => {
      if (!el || !el.closest) return null;
      if (el.closest(".uimi-studio, .uimi-paint-pop, .uimi-glass-gear, .uimi-glass-modal, .uimi-copy-fab")) return null;
      let node = el.closest(".uimi-app *");
      if (!node || node.classList.contains("uimi-app")) return null;
      if (node.classList.contains("uimi-auth-slant") || node.closest(".uimi-auth-slant")) {
        node = node.closest(".uimi-auth-brand") || node;
      }
      if (node.closest("svg")) {
        node = node.closest(GLASS_SURFACES) || node.closest("[data-uimi-paint], .uimi-btn, .uimi-card") || node;
      }
      return node.closest(GLASS_SURFACES) || node;
    };

    const glassClassFor = (el) => {
      for (const name of GLASS_CLASS_PRIORITY) {
        if (el.classList.contains(name)) return name;
      }
      const uimi = [...el.classList].find((name) => name.startsWith("uimi-") && name !== "uimi-glass");
      return uimi || el.tagName.toLowerCase();
    };

    const targetsForClass = (key) => {
      try {
        return [...document.querySelectorAll(`.uimi-app .${CSS.escape(key)}`)];
      } catch {
        return [];
      }
    };

    const applyClassGlass = (key, settings, { persist = true } = {}) => {
      if (!key) return;
      if (glassMode !== "on") {
        glassMode = "on";
        localStorage.setItem(GLASS_MODE_KEY, "on");
        root.setAttribute("data-uimi-glass", "on");
        syncGlassModeButtons();
      }
      glassMap[key] = { ...glassDefaults, ...settings };
      targetsForClass(key).forEach((el) => el.classList.add("uimi-glass"));
      renderGlassSheet();
      if (persist) persistGlassMap();
    };

    // Panels/shell that own nested controls — don't double-glass children inside these
    const GLASS_NEST_HOSTS =
      ".uimi-card, .uimi-banner, .uimi-note, .uimi-alert, .uimi-auth-card, .uimi-auth-brand, .uimi-table-wrap, .uimi-notify-panel, .uimi-stat, .uimi-sidebar, .uimi-navbar";
    // Theme chrome for Apply to all — skip page wrappers (they swallow every child)
    const GLASS_APPLY_ALL_SURFACES =
      ".uimi-card, .uimi-btn, .uimi-banner, .uimi-note, .uimi-alert, .uimi-auth-card, .uimi-auth-brand, .uimi-sidebar, .uimi-navbar, .uimi-stat, .uimi-input, .uimi-badge, .uimi-table-wrap, .uimi-notify-panel";
    const GLASS_COMPACT_RE = /^(uimi-btn|uimi-badge|uimi-input|uimi-stat)/;

    const isNestedGlassChild = (el) => {
      const host = el.parentElement?.closest(GLASS_NEST_HOSTS);
      return Boolean(host && host !== el);
    };

    const readNativeRadius = (el) => {
      try {
        const value = getComputedStyle(el).borderRadius;
        return value && value !== "0px" ? value : "0px";
      } catch {
        return "0px";
      }
    };

    const readNativeTextColor = (el) => {
      const fallback = themeInkHex();
      if (!el) return fallback;
      const hadGlass = el.classList.contains("uimi-glass");
      if (hadGlass) el.classList.remove("uimi-glass");
      let hex = fallback;
      try {
        hex = toWheelHex(getComputedStyle(el).color, fallback);
      } catch {
        hex = fallback;
      }
      if (hadGlass) el.classList.add("uimi-glass");
      // If sampled color fights the theme (e.g. leftover black on midnight), prefer ink
      const ink = fallback;
      const sampled = hexToRgb(hex);
      const inkRgb = hexToRgb(ink);
      if (sampled && inkRgb) {
        const sampleLuma = (0.2126 * sampled.r + 0.7152 * sampled.g + 0.0722 * sampled.b) / 255;
        const inkLuma = (0.2126 * inkRgb.r + 0.7152 * inkRgb.g + 0.0722 * inkRgb.b) / 255;
        if (Math.abs(sampleLuma - inkLuma) > 0.45) return ink;
      }
      return hex;
    };

    const remapGlassInkForPalette = () => {
      const ink = themeInkHex();
      glassDefaults.textColor = ink;
      let changed = false;
      Object.keys(glassMap).forEach((key) => {
        const els = targetsForClass(key);
        const next = els[0] ? readNativeTextColor(els[0]) : ink;
        if (glassMap[key]?.textColor !== next) {
          glassMap[key] = { ...glassMap[key], textColor: next };
          changed = true;
        }
      });
      if (glassDraft) glassDraft.textColor = ink;
      if (changed) persistGlassMap();
      if (glassMode === "on") renderGlassSheet();
    };

    const tailorGlassForClass = (key, settings, sampleEl) => {
      const next = { ...glassDefaults, ...settings };
      next.radius = "native";
      next.radiusValue = sampleEl ? readNativeRadius(sampleEl) : next.radiusValue || "0px";
      next.textColor = sampleEl ? readNativeTextColor(sampleEl) : next.textColor || glassDefaults.textColor;
      if (GLASS_COMPACT_RE.test(key)) {
        next.blur = Math.min(Number(next.blur) || glassDefaults.blur, 16);
        next.outerBlur = Math.min(Number(next.outerBlur) || glassDefaults.outerBlur, 18);
        next.innerBlur = Math.min(Number(next.innerBlur) || glassDefaults.innerBlur, 12);
        next.refract = Math.min(Number(next.refract) || glassDefaults.refract, 8);
      }
      return next;
    };

    const applyAllGlass = (settings, { persist = true } = {}) => {
      if (glassMode !== "on") {
        glassMode = "on";
        localStorage.setItem(GLASS_MODE_KEY, "on");
        root.setAttribute("data-uimi-glass", "on");
        syncGlassModeButtons();
      }
      document.querySelectorAll(".uimi-app .uimi-glass").forEach((el) => el.classList.remove("uimi-glass"));
      glassMap = {};

      const roots = [...document.querySelectorAll(`.uimi-app ${GLASS_APPLY_ALL_SURFACES}`)].filter(
        (el) => !isNestedGlassChild(el)
      );
      const groups = new Map();
      roots.forEach((el) => {
        const key = glassClassFor(el);
        if (!key) return;
        if (!groups.has(key)) groups.set(key, []);
        groups.get(key).push(el);
      });

      groups.forEach((els, key) => {
        glassMap[key] = tailorGlassForClass(key, settings, els[0]);
        els.forEach((el) => el.classList.add("uimi-glass"));
      });

      renderGlassSheet();
      if (persist) persistGlassMap();
    };

    const removeClassGlass = (key) => {
      if (!key || !glassMap[key]) return;
      delete glassMap[key];
      targetsForClass(key).forEach((el) => el.classList.remove("uimi-glass"));
      renderGlassSheet();
      persistGlassMap();
    };

    const hydrateGlassTargets = () => {
      if (glassMode !== "on") {
        stripGlassClasses();
        renderGlassSheet();
        return;
      }
      document.querySelectorAll(".uimi-app .uimi-glass").forEach((el) => {
        const key = glassClassFor(el);
        if (!glassMap[key]) el.classList.remove("uimi-glass");
      });
      let patched = false;
      Object.keys(glassMap).forEach((key) => {
        const els = targetsForClass(key);
        if (!/^#[0-9a-f]{6}$/i.test(glassMap[key]?.textColor) && els[0]) {
          glassMap[key] = {
            ...glassMap[key],
            textColor: readNativeTextColor(els[0]),
          };
          patched = true;
        }
        els.forEach((el) => el.classList.add("uimi-glass"));
      });
      renderGlassSheet();
      if (patched) persistGlassMap();
    };

    const clearGlass = () => {
      glassMap = {};
      localStorage.removeItem(GLASS_MAP_KEY);
      document.querySelectorAll(".uimi-glass").forEach((el) => el.classList.remove("uimi-glass"));
      document.querySelectorAll(".uimi-glass-hot").forEach((el) => el.classList.remove("uimi-glass-hot"));
      hideGlassGear();
      closeGlassModal({ revert: false });
      renderGlassSheet();
      applyGlassBg(loadGlassBg());
    };

    const hideGlassGear = () => {
      gear.hidden = true;
      document.querySelectorAll(".uimi-glass-hot").forEach((el) => el.classList.remove("uimi-glass-hot"));
    };

    const placeGlassGear = (el) => {
      if (!el) return hideGlassGear();
      glassTarget = el;
      glassClassKey = glassClassFor(el);
      document.querySelectorAll(".uimi-glass-hot").forEach((node) => node.classList.remove("uimi-glass-hot"));
      el.classList.add("uimi-glass-hot");
      const rect = el.getBoundingClientRect();
      const size = 34;
      let left = rect.right - size / 2;
      let top = rect.top - size / 2;
      left = Math.min(window.innerWidth - size - 8, Math.max(8, left));
      top = Math.min(window.innerHeight - size - 8, Math.max(8, top));
      gear.style.left = `${Math.round(left)}px`;
      gear.style.top = `${Math.round(top)}px`;
      gear.hidden = false;
      gear.dataset.glassClass = glassClassKey;
      gear.title = `Liquid glass · ${glassClassKey}`;
    };

    const matchGlassPreset = (settings) => {
      const hit = GLASS_PRESET_KEYS.find((id) => {
        const preset = glassPresets[id];
        return GLASS_PRESET_OPTICS.every((key) => {
          const a = settings[key];
          const b = preset[key];
          if (typeof b === "number") return Number(a) === b;
          return String(a || "").toLowerCase() === String(b).toLowerCase();
        });
      });
      return hit || "";
    };

    const syncGlassPresetButtons = () => {
      const active = matchGlassPreset(glassDraft);
      modal.querySelectorAll("[data-uimi-glass-preset]").forEach((btn) => {
        btn.setAttribute("aria-pressed", btn.dataset.uimiGlassPreset === active ? "true" : "false");
      });
    };

    const applyGlassPreset = (id) => {
      const preset = glassPresets[id];
      if (!preset) return;
      glassDraft = {
        ...glassDraft,
        ...preset,
        radius: glassDraft.radius,
        textColor: glassDraft.textColor,
      };
      syncGlassModalFields();
      livePreviewGlass();
    };

    const syncGlassModalFields = () => {
      modal.querySelectorAll("[data-uimi-glass-param]").forEach((input) => {
        const key = input.dataset.uimiGlassParam;
        if (!(key in glassDraft)) return;
        input.value = glassDraft[key];
      });
      modal.querySelectorAll("[data-uimi-glass-out]").forEach((out) => {
        const key = out.dataset.uimiGlassOut;
        const value = glassDraft[key];
        if (key === "tint") out.textContent = `${value}%`;
        else if (key === "ior" || key === "scale") out.textContent = Number(value).toFixed(2);
        else if (key === "specSat") out.textContent = String(value);
        else if (GLASS_COLOR_PARAMS.has(key)) out.textContent = String(value).toUpperCase();
        else out.textContent = String(value);
      });
      const label = modal.querySelector("[data-uimi-glass-class]");
      if (label) label.textContent = glassClassKey ? `.${glassClassKey}` : "";
      syncGlassPresetButtons();
    };

    const livePreviewGlass = () => {
      if (!glassClassKey) return;
      applyClassGlass(glassClassKey, glassDraft, { persist: false });
    };

    const glassPanel = () => modal.querySelector(".uimi-glass-modal__panel");

    const placeGlassPanel = (preferredX, preferredY) => {
      const panel = glassPanel();
      if (!panel) return;
      modal.hidden = false;
      const rect = panel.getBoundingClientRect();
      const pad = 8;
      let x = preferredX;
      let y = preferredY;
      if (x + rect.width > window.innerWidth - pad) x = window.innerWidth - rect.width - pad;
      if (y + rect.height > window.innerHeight - pad) y = window.innerHeight - rect.height - pad;
      if (x < pad) x = pad;
      if (y < pad) y = pad;
      const next = { x: Math.round(x), y: Math.round(y) };
      glassPanelPos = next;
      panel.style.left = `${next.x}px`;
      panel.style.top = `${next.y}px`;
    };

    const defaultGlassPanelPos = () => {
      const gearRect = gear.getBoundingClientRect();
      const panel = glassPanel();
      const width = panel?.offsetWidth || 300;
      const pad = 12;
      let x = gearRect.right + pad;
      if (x + width > window.innerWidth - pad) x = gearRect.left - width - pad;
      if (x < pad) x = pad;
      return { x, y: Math.max(pad, Math.min(gearRect.top, window.innerHeight - pad - 80)) };
    };

    const closeGlassModal = ({ revert = true } = {}) => {
      glassDrag = null;
      glassPanel()?.classList.remove("is-dragging");
      modal.hidden = true;
      if (revert) {
        glassMap = loadGlassMap();
        hydrateGlassTargets();
      }
    };

    const openGlassModal = () => {
      if (!glassTarget || !glassClassKey) return;
      const saved = glassMap[glassClassKey] || {};
      glassDraft = { ...glassDefaults, ...saved };
      if (glassDraft.radius === "native") {
        const parsed = parseFloat(String(glassDraft.radiusValue || ""));
        glassDraft.radius = Number.isFinite(parsed)
          ? Math.max(0, Math.min(48, Math.round(parsed > 64 ? 48 : parsed)))
          : glassDefaults.radius;
      }
      delete glassDraft.radiusValue;
      if (!saved.textColor) {
        glassDraft.textColor = readNativeTextColor(glassTarget);
      }
      syncGlassModalFields();
      syncGlassBgButtons(loadGlassBg());
      applyClassGlass(glassClassKey, glassDraft, { persist: false });
      const pos = glassPanelPos || defaultGlassPanelPos();
      placeGlassPanel(pos.x, pos.y);
    };

    window.__UIMI_HIDE_GLASS_UI__ = () => {
      hideGlassGear();
      closeGlassModal({ revert: true });
    };

    window.__UIMI_SYNC_GLASS_BG__ = () => remapGlassBgForPalette();

    const designBusy = () =>
      root.getAttribute("data-uimi-paint-mode") === "on" || root.getAttribute("data-uimi-move-mode") === "on";

    const selectGlassElement = (event) => {
      if (glassMode !== "on") return;
      if (designBusy()) return;
      if (event.target.closest(".uimi-studio, .uimi-paint-pop, .uimi-glass-gear, .uimi-glass-modal, .uimi-copy-fab")) return;
      const surface = resolveGlassSurface(event.target);
      if (!surface) {
        if (!event.target.closest(".uimi-glass-hot")) hideGlassGear();
        return;
      }
      placeGlassGear(surface);
    };

    window.__UIMI_CLEAR_GLASS__ = clearGlass;
    window.__UIMI_SET_GLASS_MODE__ = setGlassMode;
    window.__UIMI_SYNC_GLASS_INK__ = remapGlassInkForPalette;

    applyGlassBg(loadGlassBg());
    remapGlassInkForPalette();
    setGlassMode(glassMode, { seed: false });

    document.querySelectorAll("[data-uimi-glass-mode]").forEach((btn) => {
      btn.addEventListener("click", () => setGlassMode(btn.dataset.uimiGlassMode));
    });

    document.querySelectorAll("[data-uimi-glass-clear]").forEach((btn) => {
      btn.addEventListener("click", () => clearGlass());
    });

    modal.querySelectorAll("[data-uimi-glass-bg]").forEach((btn) => {
      btn.addEventListener("click", () => {
        applyGlassBg(btn.dataset.uimiGlassBg);
      });
    });

    gear.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      openGlassModal();
    });

    modal.querySelector("[data-uimi-glass-drag]")?.addEventListener("pointerdown", (event) => {
      if (event.target.closest("[data-uimi-glass-close]")) return;
      const panel = glassPanel();
      if (!panel) return;
      event.preventDefault();
      const rect = panel.getBoundingClientRect();
      glassDrag = {
        offsetX: event.clientX - rect.left,
        offsetY: event.clientY - rect.top,
      };
      event.currentTarget.setPointerCapture?.(event.pointerId);
      panel.classList.add("is-dragging");
    });

    const moveGlassPanel = (event) => {
      if (!glassDrag) return;
      placeGlassPanel(event.clientX - glassDrag.offsetX, event.clientY - glassDrag.offsetY);
    };

    const endGlassDrag = () => {
      if (!glassDrag) return;
      glassDrag = null;
      glassPanel()?.classList.remove("is-dragging");
    };

    window.addEventListener("pointermove", moveGlassPanel);
    window.addEventListener("pointerup", endGlassDrag);
    window.addEventListener("pointercancel", endGlassDrag);

    document.addEventListener(
      "pointerdown",
      (event) => {
        if (modal.hidden || glassDrag) return;
        if (event.target.closest(".uimi-glass-modal__panel, .uimi-glass-gear")) return;
        closeGlassModal({ revert: true });
      },
      true
    );

    modal.querySelector("[data-uimi-glass-close]")?.addEventListener("click", () => closeGlassModal({ revert: true }));

    modal.querySelector("[data-uimi-glass-apply]")?.addEventListener("click", () => {
      if (!glassClassKey) return;
      applyClassGlass(glassClassKey, glassDraft, { persist: true });
      closeGlassModal({ revert: false });
    });

    modal.querySelector("[data-uimi-glass-apply-all]")?.addEventListener("click", () => {
      applyAllGlass(glassDraft, { persist: true });
      closeGlassModal({ revert: false });
    });

    modal.querySelector("[data-uimi-glass-remove]")?.addEventListener("click", () => {
      if (!glassClassKey) return;
      removeClassGlass(glassClassKey);
      closeGlassModal({ revert: false });
    });

    modal.querySelector("[data-uimi-glass-defaults]")?.addEventListener("click", () => {
      glassDraft = {
        ...glassDefaults,
        radius: glassDraft.radius,
        textColor: glassDraft.textColor,
      };
      syncGlassModalFields();
      livePreviewGlass();
    });

    modal.querySelectorAll("[data-uimi-glass-preset]").forEach((btn) => {
      btn.addEventListener("click", () => {
        applyGlassPreset(btn.dataset.uimiGlassPreset);
      });
    });

    modal.querySelectorAll("[data-uimi-glass-param]").forEach((input) => {
      const sync = () => {
        const key = input.dataset.uimiGlassParam;
        if (!key) return;
        glassDraft[key] = GLASS_COLOR_PARAMS.has(key) ? input.value : Number(input.value);
        syncGlassModalFields();
        livePreviewGlass();
      };
      input.addEventListener("input", sync);
      input.addEventListener("change", sync);
    });

    document.addEventListener("click", selectGlassElement, true);

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        if (!modal.hidden) closeGlassModal({ revert: true });
        else hideGlassGear();
      }
    });

    window.addEventListener("resize", () => {
      if (glassTarget && !gear.hidden) placeGlassGear(glassTarget);
    });
  }

  document.querySelectorAll(".uimi-chart").forEach((chart) => {
    if (!chart.childElementCount) renderChart(chart);
  });

  document.querySelectorAll(".uimi-btn--flip").forEach((btn) => {
    if (btn.querySelector(".uimi-btn__flip-text")) return;
    let shell = btn.querySelector(".uimi-btn__flip");
    if (!shell) {
      shell = document.createElement("span");
      shell.className = "uimi-btn__flip";
      while (btn.firstChild) shell.appendChild(btn.firstChild);
      btn.appendChild(shell);
    }
    const text = document.createElement("span");
    text.className = "uimi-btn__flip-text";
    while (shell.firstChild) text.appendChild(shell.firstChild);
    shell.appendChild(text);
  });

  document.querySelectorAll("[data-uimi-liquid-group]").forEach((group) => {
    group.addEventListener("click", (event) => {
      const btn = event.target.closest(".uimi-btn--liquid");
      if (!btn || !group.contains(btn)) return;
      group.querySelectorAll(".uimi-btn--liquid").forEach((el) => {
        el.classList.remove("is-active");
        el.setAttribute("aria-pressed", "false");
      });
      btn.classList.add("is-active");
      btn.setAttribute("aria-pressed", "true");
    });
  });

  document.querySelectorAll("[data-uimi-pager]").forEach((pager) => {
    pager.addEventListener("click", (event) => {
      const pagesBtns = [...pager.querySelectorAll(".uimi-pager-page")];
      if (!pagesBtns.length) return;
      const current = pagesBtns.findIndex((btn) => btn.classList.contains("is-active"));
      const target = event.target.closest("button");
      if (!target || !pager.contains(target)) return;
      let next = current < 0 ? 0 : current;
      if (target.classList.contains("uimi-pager-page")) {
        next = pagesBtns.indexOf(target);
      } else if (/next/i.test(target.textContent || "")) {
        next = Math.min(pagesBtns.length - 1, current + 1);
      } else if (/previous/i.test(target.textContent || "")) {
        next = Math.max(0, current - 1);
      } else {
        return;
      }
      pagesBtns.forEach((btn, index) => btn.classList.toggle("is-active", index === next));
      pager.querySelectorAll(".uimi-btn").forEach((btn) => {
        if (/previous/i.test(btn.textContent || "")) btn.disabled = next === 0;
        if (/next/i.test(btn.textContent || "")) btn.disabled = next === pagesBtns.length - 1;
      });
    });
  });

  document.querySelectorAll("[data-uimi-tabs]").forEach((root) => {
    const buttons = [...root.querySelectorAll(".uimi-tab")];
    let panels = [...root.querySelectorAll("[data-uimi-panel]")];
    if (!panels.length && root.parentElement) {
      panels = [...root.parentElement.querySelectorAll(":scope > [data-uimi-panel]")];
    }

    const activate = (button) => {
      buttons.forEach((item) => {
        const on = item === button;
        item.setAttribute("aria-selected", String(on));
        item.tabIndex = on ? 0 : -1;
      });
      panels.forEach((panel) => {
        panel.hidden = panel.dataset.uimiPanel !== button.dataset.tab;
      });
    };

    buttons.forEach((button) => {
      button.setAttribute("role", "tab");
      if (!button.querySelector(".uimi-tab__label")) {
        const label = document.createElement("span");
        label.className = "uimi-tab__label";
        while (button.firstChild) label.appendChild(button.firstChild);
        button.appendChild(label);
      }
      button.addEventListener("click", () => activate(button));
      button.addEventListener("keydown", (event) => {
        if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
        event.preventDefault();
        const index = buttons.indexOf(button);
        const dir = event.key === "ArrowRight" ? 1 : -1;
        const next = buttons[(index + dir + buttons.length) % buttons.length];
        next.focus();
        activate(next);
      });
    });
  });

  const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const YEAR_FROM = 1990;
  const YEAR_TO = 2040;
  const chevron = (dir) =>
    `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="${dir === "prev" ? "M15 6 9 12l6 6" : "M9 6l6 6-6 6"}"/></svg>`;
  const sameDay = (a, b) =>
    a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  const formatPretty = (date) => `${date.getDate()} ${MONTHS[date.getMonth()].slice(0, 3)} ${date.getFullYear()}`;
  const parsePretty = (value) => {
    const match = String(value).match(/^(\d{1,2}) ([A-Za-z]{3}) (\d{4})$/);
    if (!match) return null;
    const month = MONTHS.findIndex((name) => name.slice(0, 3) === match[2]);
    if (month < 0) return null;
    return new Date(Number(match[3]), month, Number(match[1]));
  };
  const clampDate = (year, month, day) => {
    const last = new Date(year, month + 1, 0).getDate();
    return new Date(year, month, Math.min(day, last));
  };
  const yearList = (include) => {
    const years = [];
    for (let year = YEAR_FROM; year <= YEAR_TO; year += 1) years.push(year);
    if (include && !years.includes(include)) years.push(include);
    years.sort((a, b) => a - b);
    return years;
  };
  const fillSelect = (select, values, current) => {
    select.replaceChildren();
    values.forEach(([value, label]) => {
      const option = document.createElement("option");
      option.value = String(value);
      option.textContent = label;
      if (value === current) option.selected = true;
      select.append(option);
    });
  };
  const calendarSelect = (className, ariaLabel, values, current, onChange) => {
    const select = document.createElement("select");
    select.className = `uimi-calendar__select ${className}`;
    select.setAttribute("aria-label", ariaLabel);
    fillSelect(select, values, current);
    const stop = (event) => event.stopPropagation();
    select.addEventListener("mousedown", stop);
    select.addEventListener("click", stop);
    select.addEventListener("change", (event) => {
      event.stopPropagation();
      onChange(select.value);
    });
    return select;
  };

  const closePopovers = (except) => {
    document.querySelectorAll("[data-uimi-dropdown]").forEach((root) => {
      if (root === except) return;
      const menu = root.querySelector(".uimi-dropdown__menu");
      const trigger = root.querySelector(".uimi-dropdown__trigger");
      if (menu) menu.hidden = true;
      trigger?.setAttribute("aria-expanded", "false");
    });
    document.querySelectorAll("[data-uimi-datepicker]").forEach((root) => {
      if (root === except || (except && root.contains(except))) return;
      const calendar = root.querySelector(".uimi-calendar");
      if (calendar) calendar.hidden = true;
    });
  };

  const bindDropdown = (root) => {
    if (!root || root.dataset.uimiBound === "true") return;
    const trigger = root.querySelector(".uimi-dropdown__trigger");
    const menu = root.querySelector(".uimi-dropdown__menu");
    if (!trigger || !menu) return;
    root.dataset.uimiBound = "true";
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      const next = menu.hidden;
      closePopovers(root);
      menu.hidden = !next;
      trigger.setAttribute("aria-expanded", String(next));
    });
    if (root.querySelector("select.uimi-select--native")) return;
    menu.querySelectorAll(".uimi-dropdown__item").forEach((item) => {
      item.addEventListener("click", () => {
        menu.querySelectorAll(".uimi-dropdown__item").forEach((option) => {
          option.setAttribute("aria-selected", String(option === item));
        });
        trigger.textContent = item.textContent.trim();
        menu.hidden = true;
        trigger.setAttribute("aria-expanded", "false");
      });
    });
  };

  const upgradeSelect = (select) => {
    if (!select || select.dataset.uimiUpgraded === "true") return;
    if (select.closest("[data-uimi-dropdown]")) return;
    select.dataset.uimiUpgraded = "true";

    const wrap = document.createElement("div");
    wrap.className = "uimi-dropdown";
    wrap.setAttribute("data-uimi-dropdown", "");
    if (select.classList.contains("uimi-select--compact")) wrap.classList.add("uimi-dropdown--compact");
    select.parentNode.insertBefore(wrap, select);

    const trigger = document.createElement("button");
    trigger.type = "button";
    trigger.className = `${select.className} uimi-dropdown__trigger`;
    trigger.setAttribute("aria-haspopup", "listbox");
    trigger.setAttribute("aria-expanded", "false");
    const labelled = select.getAttribute("aria-label");
    if (labelled) trigger.setAttribute("aria-label", labelled);

    const menu = document.createElement("div");
    menu.className = "uimi-dropdown__menu";
    menu.setAttribute("role", "listbox");
    menu.hidden = true;

    select.classList.add("uimi-select--native");
    select.tabIndex = -1;
    select.setAttribute("aria-hidden", "true");
    wrap.append(select, trigger, menu);

    const paint = () => {
      const chosen = select.selectedOptions[0];
      trigger.textContent = chosen ? chosen.textContent : "";
      menu.replaceChildren();
      [...select.options].forEach((option, index) => {
        const item = document.createElement("button");
        item.type = "button";
        item.className = "uimi-dropdown__item";
        item.setAttribute("role", "option");
        item.setAttribute("data-value", option.value);
        item.setAttribute("aria-selected", String(option.selected));
        item.textContent = option.textContent;
        item.addEventListener("click", (event) => {
          event.stopPropagation();
          select.selectedIndex = index;
          select.dispatchEvent(new Event("change", { bubbles: true }));
          paint();
          menu.hidden = true;
          trigger.setAttribute("aria-expanded", "false");
        });
        menu.append(item);
      });
    };

    paint();
    select.addEventListener("change", paint);
    select.addEventListener("uimi:sync", paint);
    const observer = new MutationObserver(paint);
    observer.observe(select, { childList: true });

    const label = wrap.closest("label");
    if (label) {
      label.addEventListener("click", (event) => {
        if (event.target.closest(".uimi-dropdown__trigger, .uimi-dropdown__menu")) return;
        event.preventDefault();
        trigger.click();
      });
    }

    bindDropdown(wrap);
  };

  const paintCalendar = (host, view, selected, onPick, onView) => {
    const year = view.getFullYear();
    const month = view.getMonth();
    const start = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevDays = new Date(year, month, 0).getDate();
    const today = new Date();
    const go = (nextView) => onView(nextView);
    host.replaceChildren();

    const head = document.createElement("div");
    head.className = "uimi-calendar__head";
    const prev = document.createElement("button");
    prev.type = "button";
    prev.className = "uimi-icon-btn";
    prev.setAttribute("aria-label", "Previous month");
    prev.innerHTML = chevron("prev");
    prev.addEventListener("click", (event) => {
      event.stopPropagation();
      go(new Date(year, month - 1, 1));
    });
    const pickers = document.createElement("div");
    pickers.className = "uimi-calendar__pickers";
    pickers.append(
      calendarSelect(
        "uimi-calendar__select--month",
        "Month",
        MONTHS.map((name, index) => [index, name]),
        month,
        (value) => go(new Date(year, Number(value), 1))
      ),
      calendarSelect(
        "uimi-calendar__select--year",
        "Year",
        yearList(year).map((item) => [item, String(item)]),
        year,
        (value) => go(new Date(Number(value), month, 1))
      )
    );
    const next = document.createElement("button");
    next.type = "button";
    next.className = "uimi-icon-btn";
    next.setAttribute("aria-label", "Next month");
    next.innerHTML = chevron("next");
    next.addEventListener("click", (event) => {
      event.stopPropagation();
      go(new Date(year, month + 1, 1));
    });
    head.append(prev, next);

    const week = document.createElement("div");
    week.className = "uimi-calendar__week";
    WEEKDAYS.forEach((day) => {
      const label = document.createElement("span");
      label.textContent = day;
      week.append(label);
    });

    const grid = document.createElement("div");
    grid.className = "uimi-calendar__grid";
    for (let index = 0; index < 42; index += 1) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "uimi-calendar__day";
      let date;
      if (index < start) {
        date = new Date(year, month - 1, prevDays - start + index + 1);
        button.classList.add("is-muted");
      } else if (index >= start + daysInMonth) {
        date = new Date(year, month + 1, index - start - daysInMonth + 1);
        button.classList.add("is-muted");
      } else {
        date = new Date(year, month, index - start + 1);
      }
      button.textContent = String(date.getDate());
      if (sameDay(date, today)) button.classList.add("is-today");
      if (sameDay(date, selected)) button.classList.add("is-selected");
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        onPick(date);
      });
      grid.append(button);
    }

    host.append(head, pickers, week, grid);
    host.querySelectorAll("select").forEach(upgradeSelect);
  };

  document.querySelectorAll("[data-uimi-calendar]").forEach((host) => {
    let selected = new Date();
    let view = new Date(selected.getFullYear(), selected.getMonth(), 1);
    const draw = () =>
      paintCalendar(
        host,
        view,
        selected,
        (date) => {
          selected = date;
          view = new Date(date.getFullYear(), date.getMonth(), 1);
          draw();
        },
        (next) => {
          view = next;
          draw();
        }
      );
    draw();
  });

  document.querySelectorAll("[data-uimi-datepicker]").forEach((root) => {
    const input = root.querySelector(".uimi-input");
    const toggle = root.querySelector(".uimi-datepicker__btn");
    const calendar = root.querySelector(".uimi-calendar");
    if (!input || !calendar) return;
    let selected = parsePretty(input.value) || new Date();
    let view = new Date(selected.getFullYear(), selected.getMonth(), 1);
    const draw = () =>
      paintCalendar(
        calendar,
        view,
        selected,
        (date) => {
          selected = date;
          view = new Date(date.getFullYear(), date.getMonth(), 1);
          input.value = formatPretty(date);
          calendar.hidden = true;
          draw();
        },
        (next) => {
          view = next;
          draw();
        }
      );
    draw();
    const open = () => {
      closePopovers(root);
      calendar.hidden = !calendar.hidden;
      if (!calendar.hidden) {
        view = new Date(selected.getFullYear(), selected.getMonth(), 1);
        draw();
      }
    };
    input.addEventListener("click", open);
    toggle?.addEventListener("click", (event) => {
      event.preventDefault();
      open();
    });
  });

  document.querySelectorAll("[data-uimi-dateparts]").forEach((root) => {
    const daySelect = root.querySelector('[data-part="day"]');
    const monthSelect = root.querySelector('[data-part="month"]');
    const yearSelect = root.querySelector('[data-part="year"]');
    if (!daySelect || !monthSelect || !yearSelect) return;
    let selected = parsePretty(root.getAttribute("data-value") || "") || new Date();
    const draw = () => {
      const year = selected.getFullYear();
      const month = selected.getMonth();
      const last = new Date(year, month + 1, 0).getDate();
      const days = [];
      for (let day = 1; day <= last; day += 1) days.push([day, String(day)]);
      fillSelect(daySelect, days, selected.getDate());
      fillSelect(
        monthSelect,
        MONTHS.map((name, index) => [index, name]),
        month
      );
      fillSelect(
        yearSelect,
        yearList(year).map((item) => [item, String(item)]),
        year
      );
      root.setAttribute("data-value", formatPretty(selected));
    };
    const commit = (year, month, day) => {
      selected = clampDate(year, month, day);
      draw();
    };
    daySelect.addEventListener("change", () => commit(selected.getFullYear(), selected.getMonth(), Number(daySelect.value)));
    monthSelect.addEventListener("change", () => commit(selected.getFullYear(), Number(monthSelect.value), selected.getDate()));
    yearSelect.addEventListener("change", () => commit(Number(yearSelect.value), selected.getMonth(), selected.getDate()));
    draw();
  });

  document.querySelectorAll("select.uimi-select, select.uimi-calendar__select").forEach(upgradeSelect);
  document.querySelectorAll("[data-uimi-dropdown]").forEach(bindDropdown);

  document.addEventListener("click", (event) => {
    if (event.target.closest("[data-uimi-dropdown], [data-uimi-datepicker]")) return;
    closePopovers();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closePopovers();
  });
})();
