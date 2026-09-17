(function () {
  const root = document.documentElement;
  const app = document.querySelector(".uimi-app");
  root.removeAttribute("data-uimi-theme");

  const themes = {
    midnight: { font: "inter", display: "inter" },
    apricot: { font: "inter", display: "inter" },
    pastel: { font: "inter", display: "inter" },
  };
  const palettes = Object.keys(themes);
  const savedPalette = localStorage.getItem("uimi-palette");
  const initialPalette = palettes.includes(savedPalette) ? savedPalette : "apricot";

  const applyPalette = (id) => {
    const next = palettes.includes(id) ? id : "apricot";
    root.setAttribute("data-uimi-palette", next);
    localStorage.setItem("uimi-palette", next);
    document.querySelectorAll("[data-uimi-palette-select]").forEach((select) => {
      select.value = next;
    });
    localStorage.removeItem("uimi-paint-map");
    if (typeof window.__UIMI_CLEAR_PAINT__ === "function") {
      window.__UIMI_CLEAR_PAINT__();
    } else {
      document.getElementById("uimi-paint-sheet") && (document.getElementById("uimi-paint-sheet").textContent = "");
    }
  };

  const fontIds = ["inter", "cooper-hewitt"];
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

  const pages = ["login-1", "login-2", "dashboard-1", "dashboard-2", "dashboard-3", "buttons-1", "buttons-2", "buttons-3", "cards", "tables", "notifications", "badges", "charts", "forms", "tabs", "settings"];
  const loginPages = ["login-1", "login-2"];
  const workspacePages = pages.filter((id) => !loginPages.includes(id));
  const pageAliases = { login: "login-1", signin: "login-1", auth: "login-1", dashboard: "dashboard-1", accounts: "tables", kit: "settings", use: "dashboard-1", usage: "dashboard-1", top: "dashboard-1", buttons: "buttons-1" };
  const pageLabels = {
    "login-1": "Login 1",
    "login-2": "Login 2",
    "dashboard-1": "Dashboard 1",
    "dashboard-2": "Dashboard 2",
    "dashboard-3": "Dashboard 3",
    "buttons-1": "Button 1",
    "buttons-2": "Button 2",
    "buttons-3": "Button 3",
    cards: "Cards",
    tables: "Tables",
    notifications: "Notifications",
    badges: "Badges",
    charts: "Charts",
    forms: "Forms",
    tabs: "Tabs",
    settings: "Settings",
  };
  const pageGroups = {
    "login-1": "Login",
    "login-2": "Login",
    "dashboard-1": "Dashboard",
    "dashboard-2": "Dashboard",
    "dashboard-3": "Dashboard",
    "buttons-1": "Components",
    "buttons-2": "Components",
    "buttons-3": "Components",
    cards: "Components",
    tables: "Components",
    notifications: "Components",
    badges: "Components",
    charts: "Components",
    forms: "Components",
    tabs: "Components",
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

  const showPage = (id) => {
    const next = pages.includes(id) ? id : pageFromHash();
    root.setAttribute("data-uimi-session", readSession() ? "in" : "out");
    document.querySelectorAll("[data-uimi-page]").forEach((page) => {
      page.hidden = page.dataset.uimiPage !== next;
    });
    document.querySelectorAll(".uimi-nav a[href^='#']").forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${next}`);
    });
    document.querySelectorAll("[data-uimi-crumb]").forEach((crumb) => {
      crumb.textContent = pageLabels[next];
    });
    document.querySelectorAll("[data-uimi-crumb-group]").forEach((group) => {
      group.hidden = !pageGroups[next];
    });
    document.querySelectorAll("[data-uimi-crumb-parent]").forEach((parent) => {
      parent.textContent = pageGroups[next] || "";
    });
    document.querySelectorAll(".uimi-nav-group").forEach((group) => {
      if (group.querySelector("a.is-active")) group.open = true;
    });
    document.querySelectorAll(".uimi-navbar-links .uimi-nav-sub").forEach((group) => {
      group.open = false;
    });
    closeNotify();
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

  document.querySelectorAll("[data-uimi-login]").forEach((loginForm) => {
    const loginMsg = loginForm.querySelector("[data-uimi-login-msg]");
  const setLoginMsg = (text, ok = false) => {
    if (!loginMsg) return;
    loginMsg.hidden = !text;
    loginMsg.textContent = text || "";
    loginMsg.classList.toggle("is-ok", Boolean(ok));
  };
    loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(loginForm);
    const email = String(data.get("email") || "").trim();
    const password = String(data.get("password") || "");
    const remember = data.get("remember") === "on";
      if (email.toLowerCase() !== "m.islam@uimi.com") {
        setLoginMsg("Use m.islam@uimi.com for the demo.");
      return;
    }
    if (password.toLowerCase() !== "uimi") {
      setLoginMsg("Password is incorrect. Use uimi for the demo.");
      return;
    }
    setLoginMsg("");
    writeSession(true, remember);
      location.hash = "dashboard-1";
  });
    loginForm.querySelector("[data-uimi-forgot]")?.addEventListener("click", () => {
    setLoginMsg("Ask your admin to reset it. Demo password is uimi.", true);
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
      closeNotify();
      if (open) {
        panel.hidden = false;
        button.setAttribute("aria-expanded", "true");
      }
    });
    panel.addEventListener("click", (event) => event.stopPropagation());
  });

  const eventFrom = (event) => {
    const target = event.target;
    if (target instanceof Element) return target;
    const node = event.composedPath().find((item) => item && item.nodeType === 1);
    return node || null;
  };

  document.addEventListener("click", (event) => {
    if (!eventFrom(event)?.closest(".uimi-notify")) closeNotify();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeNotify();
  });

  const chartTypes = ["bar", "line", "area", "donut", "stacked"];
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

  const chartSeries = (index) =>
    `var(--uimi-chart-${(index % 10) + 1}, var(--uimi-chart-fill, var(--uimi-primary)))`;
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
          return `<path d="${pieSlice(50, 50, 42, start, end)}" fill="${chartFill(index)}"></path>`;
        })
        .join("");
      const legend = slices
        .map((value, index) => `<li><i style="background:${chartFill(index)}"></i>${labels[index]} · ${Math.round((value / total) * 100)}%</li>`)
        .join("");
      el.innerHTML = `<svg viewBox="0 0 100 100" role="img" aria-label="Donut chart">${paths}<circle class="uimi-chart-hole" cx="50" cy="50" r="24"></circle></svg><ul class="uimi-chart-legend">${legend}</ul>`;
      return;
    }

    if (type === "stacked") {
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
      if (!columns.length) {
        el.innerHTML = "";
        return;
      }
      const labels = Array.from({ length: columns.length }, (_, index) => namedLabels[index] || `Q${index + 1}`);
      const series = parseChartNames(el.dataset.uimiChartSeries, seriesCount);
      const stackMax = Math.max(...columns.map((col) => col.reduce((sum, value) => sum + value, 0)), 1);
      const plotH = height - pad * 2;
      const plotW = width - pad * 2;
      const gap = 2.4;
      const barW = (plotW - gap * (columns.length - 1)) / columns.length;
      const grid = chartGrid(width, height, pad);
      const uid = `uimi-stack-${++chartSeq}`;
      const clips = [];
      const bars = columns
        .map((col, colIndex) => {
          const x = pad + colIndex * (barW + gap);
          const total = col.reduce((sum, value) => sum + value, 0);
          const barH = Math.max((total / stackMax) * plotH, 1.5);
          const yTop = height - pad - barH;
          const clipId = `${uid}-${colIndex}`;
          clips.push(
            `<clipPath id="${clipId}"><rect x="${x.toFixed(1)}" y="${yTop.toFixed(1)}" width="${barW.toFixed(1)}" height="${barH.toFixed(1)}" rx="1.6"/></clipPath>`
          );
          let y = height - pad;
          const rects = col
            .map((value, seriesIndex) => {
              const h = (value / stackMax) * plotH;
              if (h <= 0) return "";
              y -= h;
              return `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${barW.toFixed(1)}" height="${h.toFixed(1)}" fill="${chartFill(seriesIndex)}"></rect>`;
            })
            .join("");
          return `<g clip-path="url(#${clipId})">${rects}</g>`;
        })
        .join("");
      const axis = labels.map((label) => `<span>${label}</span>`).join("");
      const legend = series.map((name, index) => `<li><i style="background:${chartFill(index)}"></i>${name}</li>`).join("");
      el.style.setProperty("--uimi-chart-cols", String(columns.length));
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

    if (type === "line") {
      const dots = points
        .map(([x, y]) => `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.4" fill="currentColor"></circle>`)
        .join("");
      el.innerHTML = `<svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" role="img" aria-label="Line chart">${grid}<polyline fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round" points="${pts}"></polyline>${dots}</svg>`;
      return;
    }

    if (type === "area") {
      const first = points[0];
      const last = points[points.length - 1];
      const area = `M ${first[0].toFixed(1)} ${height - pad} L ${pts} L ${last[0].toFixed(1)} ${height - pad} Z`;
      el.innerHTML = `<svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" role="img" aria-label="Area chart">${grid}<path d="${area}" fill="currentColor" opacity="0.18"></path><polyline fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round" points="${pts}"></polyline></svg>`;
      return;
    }

    const gap = 2.4;
    const barW = (plotW - gap * (values.length - 1)) / values.length;
    const bars = values
      .map((value, index) => {
        const barH = Math.max((value / max) * plotH, 1.5);
        const x = pad + index * (barW + gap);
        const y = height - pad - barH;
        return `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${barW.toFixed(1)}" height="${barH.toFixed(1)}" rx="1.6" fill="${chartBarFill(index)}"></rect>`;
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
      const palette = root.getAttribute("data-uimi-palette") || "apricot";
      const font = root.getAttribute("data-uimi-font") || "inter";
      const display = root.getAttribute("data-uimi-display") || font;
      return `data-uimi-shell="${shell}" data-uimi-palette="${palette}" data-uimi-font="${font}" data-uimi-display="${display}"`;
    };

    const currentPageMarkup = () => {
      const page = document.querySelector(".uimi-page:not([hidden])");
      if (!page) return "";
      const source = page.querySelector(".uimi-auth") || page;
      const clone = source.cloneNode(true);
      clone.removeAttribute("hidden");
      clone.removeAttribute("data-uimi-page");
      clone.querySelectorAll("[data-uimi-copy-page], .uimi-snippet, .uimi-note").forEach((el) => el.remove());
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
      const page = document.querySelector(".uimi-page:not([hidden])")?.getAttribute("data-uimi-page");
      const shape = page === "buttons-2" ? " uimi-btn--square" : page === "buttons-3" ? " uimi-btn--pill" : "";
      return `<button class="uimi-btn uimi-btn--primary${shape}">Save changes</button>`;
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

    document.querySelectorAll('[data-uimi-page^="buttons"] .uimi-cluster .uimi-btn').forEach((btn) => {
      btn.addEventListener("click", () => {
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

    const PAINT_COLORS = {
      floral_white: {
        DEFAULT: "#f7f4ea",
        100: "#463b1a",
        200: "#8b7735",
        300: "#c2ab5e",
        400: "#dccfa3",
        500: "#f7f4ea",
        600: "#f8f6ed",
        700: "#faf8f2",
        800: "#fcfaf6",
        900: "#fdfdfb",
      },
      lavender: {
        DEFAULT: "#ded9e2",
        100: "#2d2732",
        200: "#5a4d64",
        300: "#877595",
        400: "#b2a7bc",
        500: "#ded9e2",
        600: "#e5e1e8",
        700: "#ebe9ee",
        800: "#f2f0f3",
        900: "#f8f8f9",
      },
      periwinkle: {
        DEFAULT: "#c0b9dd",
        100: "#201b37",
        200: "#40356e",
        300: "#6150a5",
        400: "#9083c3",
        500: "#c0b9dd",
        600: "#cec8e4",
        700: "#dad6eb",
        800: "#e6e3f2",
        900: "#f3f1f8",
      },
      wisteria_blue: {
        DEFAULT: "#80a1d4",
        100: "#111f33",
        200: "#233e66",
        300: "#345c99",
        400: "#4f7dc3",
        500: "#80a1d4",
        600: "#9bb5dd",
        700: "#b4c8e5",
        800: "#cddaee",
        900: "#e6edf6",
      },
      pearl_aqua: {
        DEFAULT: "#75c9c8",
        100: "#122e2d",
        200: "#235b5a",
        300: "#358987",
        400: "#47b6b4",
        500: "#75c9c8",
        600: "#8fd4d2",
        700: "#abdede",
        800: "#c7e9e9",
        900: "#e3f4f4",
      },
      gray: {
        50: "#f9fafb",
        100: "#f3f4f6",
        200: "#e5e7eb",
        300: "#d1d5db",
        400: "#9ca3af",
        500: "#6b7280",
        600: "#4b5563",
        700: "#374151",
        800: "#1f2937",
        900: "#111827",
        950: "#030712",
      },
      slate: {
        50: "#f8fafc",
        100: "#f1f5f9",
        200: "#e2e8f0",
        300: "#cbd5e1",
        400: "#94a3b8",
        500: "#64748b",
        600: "#475569",
        700: "#334155",
        800: "#1e293b",
        900: "#0f172a",
      },
      zinc: {
        50: "#fafafa",
        100: "#f4f4f5",
        200: "#e4e4e7",
        300: "#d4d4d8",
        400: "#a1a1aa",
        500: "#71717a",
        600: "#52525b",
        700: "#3f3f46",
        800: "#27272a",
        900: "#18181b",
      },
      stone: {
        50: "#fafaf9",
        100: "#f5f5f4",
        200: "#e7e5e4",
        300: "#d6d3d1",
        400: "#a8a29e",
        500: "#78716c",
        600: "#57534e",
        700: "#44403c",
        800: "#292524",
        900: "#1c1917",
      },
      red: {
        50: "#fef2f2",
        100: "#fee2e2",
        200: "#fecaca",
        300: "#fca5a5",
        400: "#f87171",
        500: "#ef4444",
        600: "#dc2626",
        700: "#b91c1c",
        800: "#991b1b",
        900: "#7f1d1d",
      },
      orange: {
        50: "#fff7ed",
        100: "#ffedd5",
        200: "#fed7aa",
        300: "#fdba74",
        400: "#fb923c",
        500: "#f97316",
        600: "#ea580c",
        700: "#c2410c",
        800: "#9a3412",
        900: "#7c2d12",
      },
      amber: {
        50: "#fffbeb",
        100: "#fef3c7",
        200: "#fde68a",
        300: "#fcd34d",
        400: "#fbbf24",
        500: "#f59e0b",
        600: "#d97706",
        700: "#b45309",
        800: "#92400e",
        900: "#78350f",
      },
      yellow: {
        50: "#fefce8",
        100: "#fef9c3",
        200: "#fef08a",
        300: "#fde047",
        400: "#facc15",
        500: "#eab308",
        600: "#ca8a04",
        700: "#a16207",
        800: "#854d0e",
        900: "#713f12",
      },
      lime: {
        50: "#f7fee7",
        100: "#ecfccb",
        200: "#d9f99d",
        300: "#bef264",
        400: "#a3e635",
        500: "#84cc16",
        600: "#65a30d",
        700: "#4d7c0f",
        800: "#3f6212",
        900: "#365314",
      },
      green: {
        50: "#f0fdf4",
        100: "#dcfce7",
        200: "#bbf7d0",
        300: "#86efac",
        400: "#4ade80",
        500: "#22c55e",
        600: "#16a34a",
        700: "#15803d",
        800: "#166534",
        900: "#14532d",
      },
      emerald: {
        50: "#ecfdf5",
        100: "#d1fae5",
        200: "#a7f3d0",
        300: "#6ee7b7",
        400: "#34d399",
        500: "#10b981",
        600: "#059669",
        700: "#047857",
        800: "#065f46",
        900: "#064e3b",
      },
      teal: {
        50: "#f0fdfa",
        100: "#ccfbf1",
        200: "#99f6e4",
        300: "#5eead4",
        400: "#2dd4bf",
        500: "#14b8a6",
        600: "#0d9488",
        700: "#0f766e",
        800: "#115e59",
        900: "#134e4a",
      },
      cyan: {
        50: "#ecfeff",
        100: "#cffafe",
        200: "#a5f3fc",
        300: "#67e8f9",
        400: "#22d3ee",
        500: "#06b6d4",
        600: "#0891b2",
        700: "#0e7490",
        800: "#155e75",
        900: "#164e63",
      },
      sky: {
        50: "#f0f9ff",
        100: "#e0f2fe",
        200: "#bae6fd",
        300: "#7dd3fc",
        400: "#38bdf8",
        500: "#0ea5e9",
        600: "#0284c7",
        700: "#0369a1",
        800: "#075985",
        900: "#0c4a6e",
      },
      blue: {
        50: "#eff6ff",
        100: "#dbeafe",
        200: "#bfdbfe",
        300: "#93c5fd",
        400: "#60a5fa",
        500: "#3b82f6",
        600: "#2563eb",
        700: "#1d4ed8",
        800: "#1e40af",
        900: "#1e3a8a",
      },
      indigo: {
        50: "#eef2ff",
        100: "#e0e7ff",
        200: "#c7d2fe",
        300: "#a5b4fc",
        400: "#818cf8",
        500: "#6366f1",
        600: "#4f46e5",
        700: "#4338ca",
        800: "#3730a3",
        900: "#312e81",
      },
      violet: {
        50: "#f5f3ff",
        100: "#ede9fe",
        200: "#ddd6fe",
        300: "#c4b5fd",
        400: "#a78bfa",
        500: "#8b5cf6",
        600: "#7c3aed",
        700: "#6d28d9",
        800: "#5b21b6",
        900: "#4c1d95",
      },
      purple: {
        50: "#faf5ff",
        100: "#f3e8ff",
        200: "#e9d5ff",
        300: "#d8b4fe",
        400: "#c084fc",
        500: "#a855f7",
        600: "#9333ea",
        700: "#7e22ce",
        800: "#6b21a8",
        900: "#581c87",
      },
      fuchsia: {
        50: "#fdf4ff",
        100: "#fae8ff",
        200: "#f5d0fe",
        300: "#f0abfc",
        400: "#e879f9",
        500: "#d946ef",
        600: "#c026d3",
        700: "#a21caf",
        800: "#86198f",
        900: "#701a75",
      },
      pink: {
        50: "#fdf2f8",
        100: "#fce7f3",
        200: "#fbcfe8",
        300: "#f9a8d4",
        400: "#f472b6",
        500: "#ec4899",
        600: "#db2777",
        700: "#be185d",
        800: "#9d174d",
        900: "#831843",
      },
      rose: {
        50: "#fff1f2",
        100: "#ffe4e6",
        200: "#fecdd3",
        300: "#fda4af",
        400: "#fb7185",
        500: "#f43f5e",
        600: "#e11d48",
        700: "#be123c",
        800: "#9f1239",
        900: "#881337",
      },
      black_white: {
        white: "#ffffff",
        snow: "#fafafa",
        mist: "#f5f5f5",
        silver: "#c0c0c0",
        ash: "#808080",
        charcoal: "#36454f",
        ink: "#0a0a0a",
        black: "#000000",
        transparent: "transparent",
      },
    };

    const PAINT_PROPS = [
      { id: "background", label: "fill" },
      { id: "border-color", label: "border" },
    ];
    const PAINT_KEY = "uimi-paint-map";
    const paintSheet = document.createElement("style");
    paintSheet.id = "uimi-paint-sheet";
    document.head.appendChild(paintSheet);

    const clonePaintMap = (map) => JSON.parse(JSON.stringify(map || {}));

    const stripFontColors = (map) => {
      const next = {};
      Object.entries(map || {}).forEach(([id, styles]) => {
        const cleaned = { ...(styles || {}) };
        delete cleaned.color;
        if (Object.keys(cleaned).length) next[id] = cleaned;
      });
      return next;
    };

    const loadPaintMap = () => {
      try {
        return stripFontColors(JSON.parse(localStorage.getItem(PAINT_KEY) || "{}") || {});
      } catch {
        return {};
      }
    };

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
    let paintTarget = null;
    let paintProp = "background";
    let paintDrag = null;

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
      paintSaved = stripFontColors(clonePaintMap(paintMap));
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
      [".uimi-crumbs", "shell-crumbs"],
      [".uimi-help", "shell-help"],

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

      ['[data-uimi-page="dashboard-1"] .uimi-banner', "dash1-banner"],
      ['[data-uimi-page="dashboard-1"] .uimi-card', "dash1-card"],
      ['[data-uimi-page="dashboard-1"] .uimi-btn', "dash1-btn"],
      ['[data-uimi-page="dashboard-1"] .uimi-stat', "dash1-stat"],
      ['[data-uimi-page="dashboard-2"] .uimi-page-head', "dash2-head"],
      ['[data-uimi-page="dashboard-2"] .uimi-card', "dash2-card"],
      ['[data-uimi-page="dashboard-2"] .uimi-btn', "dash2-btn"],
      ['[data-uimi-page="dashboard-3"] .uimi-page-head', "dash3-head"],
      ['[data-uimi-page="dashboard-3"] .uimi-card', "dash3-card"],
      ['[data-uimi-page="dashboard-3"] .uimi-btn', "dash3-btn"],

      ['[data-uimi-page^="buttons"] .uimi-card', "buttons-card"],
      ['[data-uimi-page^="buttons"] .uimi-note', "buttons-note"],
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
      "dash1-banner": "login1-brand",
      "dash1-card": "login1-card",
      "dash1-btn": "login1-card-btn",
      "dash2-head": "login1-card",
      "dash2-card": "login1-card",
      "dash2-btn": "login1-card-btn",
      "dash3-head": "login1-card",
      "dash3-card": "login1-card",
      "dash3-btn": "login1-card-btn",
      "buttons-card": "login1-card",
      "buttons-note": "login1-brand",
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
        next["shell-main"] = {
          background: mixHex(source["login1-shell"].background || source["login1-card"].background, source["login1-card"].background || "#ffffff", 0.55),
        };
      }
      paintMap = stripFontColors(next);
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
    popover.innerHTML = `
      <div class="uimi-paint-pop__head" data-uimi-paint-drag>
        <span class="uimi-paint-pop__grip" aria-hidden="true"></span>
        <strong data-uimi-paint-target-label>Element</strong>
        <button type="button" class="uimi-paint-pop__close" data-uimi-paint-close aria-label="Close">×</button>
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
    Object.entries(PAINT_COLORS).forEach(([family, shades]) => {
      const row = document.createElement("div");
      row.className = "uimi-paint-pop__family";
      row.innerHTML = `<span class="uimi-paint-pop__family-name">${family.replace(/_/g, " ")}</span>`;
      const chips = document.createElement("div");
      chips.className = "uimi-paint-pop__chips";
      Object.entries(shades).forEach(([step, hex]) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "uimi-paint-pop__chip";
        if (hex === "transparent") {
          btn.classList.add("is-transparent");
        } else {
          btn.style.background = hex;
        }
        btn.title = `${family} ${step} ${hex}`;
        btn.setAttribute("aria-label", `${family} ${step} ${hex}`);
        btn.dataset.hex = hex;
        chips.appendChild(btn);
      });
      row.appendChild(chips);
      swatchRoot.appendChild(row);
    });

    const clearPaintPreview = () => {
      previewSheet.textContent = "";
    };

    const showPaintPreview = (hex) => {
      if (!paintTarget || !hex) {
        clearPaintPreview();
        return;
      }
      const id = ensurePaintId(paintTarget);
      previewSheet.textContent = `[data-uimi-paint="${id}"]{${paintDeclsFor({ [paintProp]: hex })}}`;
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

    const syncPaintChips = () => {
      if (!paintTarget) return;
      const id = paintTarget.dataset.uimiPaint;
      const current = paintMap[id]?.[paintProp];
      popover.querySelectorAll(".uimi-paint-pop__chip").forEach((chip) => {
        chip.setAttribute("aria-pressed", String(chip.dataset.hex === current));
      });
    };

    const closePaintPop = () => {
      clearPaintPreview();
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
      showPaintPreview(chip.dataset.hex);
    });

    swatchRoot.addEventListener("pointerleave", clearPaintPreview);

    swatchRoot.addEventListener("click", (event) => {
      const chip = event.target.closest(".uimi-paint-pop__chip");
      if (!chip || !paintTarget) return;
      const id = ensurePaintId(paintTarget);
      pushPaintHistory();
      paintMap[id] = { ...(paintMap[id] || {}), [paintProp]: chip.dataset.hex };
      clearPaintPreview();
      renderPaintSheet();
      syncPaintChips();
    });

    document.addEventListener(
      "click",
      (event) => {
        if (root.getAttribute("data-uimi-paint-mode") !== "on") return;
        if (event.target.closest(".uimi-studio, .uimi-paint-pop")) return;
        const el = event.target.closest("[data-uimi-paint], .uimi-app .uimi-card, .uimi-app .uimi-btn, .uimi-app .uimi-auth, .uimi-app .uimi-auth-brand, .uimi-app .uimi-auth-card, .uimi-app .uimi-auth-bar, .uimi-app .uimi-banner, .uimi-app .uimi-sidebar, .uimi-app .uimi-navbar, .uimi-app .uimi-topbar, .uimi-app .uimi-input, .uimi-app .uimi-note, .uimi-app .uimi-alert, .uimi-app .uimi-badge, .uimi-app .uimi-table, .uimi-app .uimi-display, .uimi-app .uimi-kicker, .uimi-app .uimi-muted, .uimi-app .uimi-label, .uimi-app .uimi-link, .uimi-app .uimi-mark");
        if (!el || el.closest(".uimi-studio")) return;
        event.preventDefault();
        event.stopPropagation();
        openPaintPop(el, event);
      },
      true
    );

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closePaintPop();
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
      if (!paintIsDirty()) return;
      event.preventDefault();
      event.returnValue = "";
    });
  }

  document.querySelectorAll(".uimi-chart").forEach((chart) => {
    if (!chart.querySelector("svg")) renderChart(chart);
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
