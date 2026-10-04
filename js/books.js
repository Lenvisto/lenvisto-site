/* Lenvisto Books & Comics PREVIEW. Vanilla JS, no network calls, no storage, no accounts, no payments.
   Free first chapters are readable. Every other chapter and all token packs show "Coming soon". */
(function () {
  "use strict";
  var C = window.LV_CATALOG;
  function $(sel, root) { return (root || document).querySelector(sel); }
  function esc(t) { return String(t).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function param(n) { return new URLSearchParams(location.search).get(n); }
  function byId(id) { for (var i = 0; i < C.titles.length; i++) if (C.titles[i].id === id) return C.titles[i]; return null; }
  function isFree(ch) { return ch.free === true; }
  var SOON = '<span class="pill pill--soon">Coming soon</span>';

  function cover(t, big) {
    var base = "assets/covers-3d/" + t.id;
    var sizes = big ? "(min-width: 820px) 340px, 80vw" : "(min-width: 760px) 340px, 46vw";
    return '<span class="cover cover--' + t.format + '">' +
      '<picture><source type="image/webp" srcset="' + base + '-300.webp 300w, ' + base + '.webp 480w" sizes="' + sizes + '">' +
      '<img src="' + base + '-300.jpg" srcset="' + base + '-300.jpg 300w, ' + base + '.jpg 480w" sizes="' + sizes + '" width="480" height="720" alt="Original sample 3D-style cover art for ' + esc(t.title) + '"' + (big ? "" : ' loading="lazy"') + '></picture>' +
      '<span class="cover__title' + (t.title.length > 20 ? " cover__title--long" : "") + '" aria-hidden="true">' + esc(t.title) + '</span>' +
      '<span class="cover__sample">SAMPLE TITLE</span></span>';
  }

  function formatBadge(t) { return '<span class="fmt fmt--' + t.format + '">' + (t.format === "comic" ? "Comic" : "Book") + "</span>"; }

  function formatBadge(t) { return '<span class="fmt fmt--' + t.format + '">' + (t.format === "comic" ? "Comic" : "Book") + "</span>"; }

  var pages = {
    catalog: function () {
      var grid = $("#catalog-grid"), filter = "all";
      function draw() {
        grid.innerHTML = C.titles.filter(function (t) { return filter === "all" || t.format === filter; }).map(function (t) {
          return '<a class="cover-card" href="book.html?id=' + t.id + '">' + cover(t) +
            '<span class="cover-card__body">' + formatBadge(t) + '<strong class="cover-card__title">' + esc(t.title) + '</strong>' +
            '<span class="cover-card__meta">' + esc(t.genre) + " · " + t.chapters.length + (t.format === "comic" ? " episodes" : " chapters") + '</span>' +
            '<span class="sample-tag">SAMPLE TITLE</span></span></a>';
        }).join("");
      }
      document.querySelectorAll("[data-filter]").forEach(function (b) {
        b.addEventListener("click", function () {
          filter = b.getAttribute("data-filter");
          document.querySelectorAll("[data-filter]").forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
          draw();
        });
      });
      draw();
    },

    book: function () {
      var t = byId(param("id")) || C.titles[0];
      document.title = t.title + " (sample) | Lenvisto Books & Comics preview";
      $("#book-cover").innerHTML = cover(t, true);
      $("#book-title").textContent = t.title;
      $("#book-meta").innerHTML = formatBadge(t) + '<span class="sample-tag">SAMPLE TITLE</span><span class="muted">' + esc(t.author) + " · " + esc(t.genre) + " · " + esc(t.age) + "</span>";
      $("#book-blurb").textContent = t.blurb;
      $("#start-reading").setAttribute("href", "reader.html?id=" + t.id + "&ch=1");
      $("#chapters-heading").textContent = t.format === "comic" ? "Episodes" : "Chapters";
      $("#chapter-list").innerHTML = t.chapters.map(function (ch, i) {
        var inner = '<span class="chapter-row__n">' + (i + 1) + '</span><span class="chapter-row__t">' + esc(ch.title) + "</span>";
        if (isFree(ch)) return '<li><a class="chapter-row" href="reader.html?id=' + t.id + "&ch=" + (i + 1) + '">' + inner + '<span class="pill pill--free">FREE <small>(sample)</small></span></a></li>';
        return '<li><span class="chapter-row chapter-row--soon">' + inner + SOON + "</span></li>";
      }).join("");
    },

    reader: function () {
      var t = byId(param("id")) || C.titles[0];
      var n = Math.min(Math.max(parseInt(param("ch"), 10) || 1, 1), t.chapters.length), i = n - 1, ch = t.chapters[i];
      document.title = ch.title + " · " + t.title + " (sample) | Lenvisto";
      $("#r-book").textContent = t.title; $("#r-book").setAttribute("href", "book.html?id=" + t.id);
      $("#r-chapter").textContent = (t.format === "comic" ? "" : "Chapter " + n + ": ") + ch.title;
      $("#r-count").textContent = n + " of " + t.chapters.length;
      document.querySelectorAll("[data-prev]").forEach(function (a) { if (n > 1) a.setAttribute("href", "reader.html?id=" + t.id + "&ch=" + (n - 1)); else { a.removeAttribute("href"); a.setAttribute("aria-disabled", "true"); } });
      document.querySelectorAll("[data-next]").forEach(function (a) { if (n < t.chapters.length) a.setAttribute("href", "reader.html?id=" + t.id + "&ch=" + (n + 1)); else { a.removeAttribute("href"); a.setAttribute("aria-disabled", "true"); } });
      document.querySelectorAll("[data-toc]").forEach(function (a) { a.setAttribute("href", "book.html?id=" + t.id); });
      var page = $("#reader-page");
      if (!isFree(ch)) {
        page.innerHTML = '<div class="locked" role="region" aria-labelledby="soon-h"><h2 id="soon-h">Coming soon</h2>' +
          "<p><strong>" + esc(ch.title) + "</strong> is not available yet. In this preview, only the first " + (t.format === "comic" ? "episode" : "chapter") + " of each sample title can be read.</p>" +
          '<p class="locked__soon" aria-hidden="true">Coming soon</p>' +
          '<p><a href="book.html?id=' + t.id + '">Back to ' + esc(t.title) + "</a></p></div>";
        return;
      }
      page.innerHTML = '<p class="sample-note">Sample placeholder ' + (t.format === "comic" ? "art" : "text") + ". Not a real story.</p>" + (t.format === "comic" ? panels(t, ch) : prose(n));
    },

    packs: function () {
      $("#pack-grid").innerHTML = C.packs.map(function (p) {
        return '<article class="pack">' + '<h2 class="pack__label">' + esc(p.label) + '</h2><p class="pack__tokens"><span>' + p.tokens + "</span> tokens</p>" +
          '<p class="pack__soon">Coming soon</p></article>';
      }).join("");
    }
  };

  var LOREM = ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis dapibus, posuere velit aliquet. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.",
    "Cras mattis consectetur purus sit amet fermentum. Donec ullamcorper nulla non metus auctor fringilla. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.",
    "Aenean lacinia bibendum nulla sed consectetur. Curabitur blandit tempus porttitor. Nullam quis risus eget urna mollis ornare vel eu leo. Maecenas faucibus mollis interdum.",
    "Etiam porta sem malesuada magna mollis euismod. Sed posuere consectetur est at lobortis. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.",
    "Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Nulla vitae elit libero, a pharetra augue. Fusce dapibus, tellus ac cursus commodo."];
  function prose(n) {
    var out = "";
    for (var k = 0; k < 8; k++) out += "<p>" + LOREM[(k + n) % LOREM.length] + " " + LOREM[(k + n + 2) % LOREM.length] + "</p>";
    return '<div class="prose">' + out + "</div>";
  }
  function panels(t, ch) {
    if (ch.art) {
      return '<div class="panels">' + ch.art.map(function (pn, k) {
        return '<figure class="panel panel--art' + (k % 2 ? " panel--tilt" : "") + '"><picture><source type="image/webp" srcset="' + pn.src + '-400.webp 400w, ' + pn.src + '.webp ' + pn.w + 'w" sizes="(min-width: 700px) 640px, 92vw">' +
          '<img src="' + pn.src + '-400.jpg" srcset="' + pn.src + '-400.jpg 400w, ' + pn.src + '.jpg ' + pn.w + 'w" sizes="(min-width: 700px) 640px, 92vw" width="' + pn.w + '" height="' + pn.h + '" alt="' + esc(pn.alt) + ' (sample art)"' + (k > 1 ? ' loading="lazy"' : "") + '></picture>' +
          (pn.say ? '<figcaption class="say say--' + (pn.at || "tl") + '">' + esc(pn.say) + "</figcaption>" : "") + "</figure>";
      }).join("") + "</div>";
    }
    var cols = ["#BDE3FF", "#FFD9C2", "#FFF1A8", "#E3D7FF", "#C9F3E1", "#FFD6E7"], out = "";
    var lines = ["Lorem ipsum!", "Dolor sit amet?", "Consectetur!", "Whoa!", "Vivamus!", "Ut enim!", "Fin... for now."];
    for (var k = 0; k < (ch.panels || 4); k++) {
      var H = k % 3 === 1 ? 900 : 520, cx = k % 2 ? 560 : 240, cy = H * 0.62, rays = "";
      for (var r = 0; r < 36; r += 2) {
        var a1 = r * Math.PI / 18, a2 = (r + 1) * Math.PI / 18;
        rays += '<polygon points="' + cx + "," + cy + " " + (cx + 1400 * Math.cos(a1)).toFixed(0) + "," + (cy + 1400 * Math.sin(a1)).toFixed(0) + " " + (cx + 1400 * Math.cos(a2)).toFixed(0) + "," + (cy + 1400 * Math.sin(a2)).toFixed(0) + '" fill="#fff" opacity=".18"/>';
      }
      out += '<figure class="panel' + (k % 2 ? " panel--tilt" : "") + '"><svg viewBox="0 0 800 ' + H + '" role="img" aria-label="Placeholder manga panel ' + (k + 1) + ' (sample art)" xmlns="http://www.w3.org/2000/svg">' +
        '<rect width="800" height="' + H + '" fill="' + cols[k % cols.length] + '"/>' + rays +
        '<rect width="800" height="' + H + '" fill="url(#soft' + k + ')"/><defs><radialGradient id="soft' + k + '" cx="50%" cy="35%" r="75%"><stop offset="0" stop-color="#fff" stop-opacity=".75"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient></defs>' +
        '<circle cx="' + cx + '" cy="' + cy + '" r="' + (H > 600 ? 150 : 95) + '" fill="#fff" opacity=".85"/></svg>' +
        '<figcaption class="say say--' + (k % 2 ? "tl" : "tr") + '">' + lines[k % lines.length] + "</figcaption></figure>";
    }
    return '<div class="panels">' + out + "</div>";
  }

  var p = document.body.getAttribute("data-page");
  if (pages[p]) pages[p]();
})();
