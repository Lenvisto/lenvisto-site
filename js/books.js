/* Lenvisto Books & Comics PREVIEW. Vanilla JS, no network calls, no storage, no accounts, no payments.
   No story text is published yet: every chapter shows "coming soon". Comic episode 1 may show preview art only.
   Token packs show "Coming soon". */
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
      '<span class="cover__sample">COMING SOON</span></span>';
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
            '<span class="sample-tag">Sample title · Coming soon</span></span></a>';
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
      document.title = t.title + " (sample) | Lenvisto Books";
      $("#book-cover").innerHTML = cover(t, true);
      $("#book-title").textContent = t.title;
      $("#book-meta").innerHTML = formatBadge(t) + '<span class="sample-tag">Sample title · Coming soon</span><span class="muted">' + esc(t.author) + " · " + esc(t.genre) + " · " + esc(t.age) + "</span>";
      $("#book-blurb").textContent = t.blurb;
      var start = $("#start-reading");
      if (hasArt(t)) { start.setAttribute("href", "reader.html?id=" + t.id + "&ch=1"); start.textContent = "See the preview art"; }
      else { var lab = document.createElement("span"); lab.className = "soon-label"; lab.textContent = (t.format === "comic" ? "Episode" : "Chapter") + " 1 coming soon"; start.replaceWith(lab); }
      $("#chapters-heading").textContent = t.format === "comic" ? "Episodes" : "Chapters";
      $("#chapter-list").innerHTML = t.chapters.map(function (ch, i) {
        var inner = '<span class="chapter-row__n">' + (i + 1) + '</span><span class="chapter-row__t">' + esc(ch.title) + "</span>";
        if (isFree(ch) && ch.art) return '<li><a class="chapter-row" href="reader.html?id=' + t.id + "&ch=" + (i + 1) + '">' + inner + '<span class="pill pill--free">Preview art</span></a></li>';
        return '<li><span class="chapter-row chapter-row--soon">' + inner + SOON + "</span></li>";
      }).join("");
    },

    reader: function () {
      var t = byId(param("id")) || C.titles[0];
      var n = Math.min(Math.max(parseInt(param("ch"), 10) || 1, 1), t.chapters.length), i = n - 1, ch = t.chapters[i];
      document.title = t.title + ", " + (t.format === "comic" ? "Episode " : "Chapter ") + n + " (sample) | Lenvisto";
      $("#r-book").textContent = t.title; $("#r-book").setAttribute("href", "book.html?id=" + t.id);
      $("#r-chapter").textContent = (t.format === "comic" ? "" : "Chapter " + n + ": ") + ch.title;
      $("#r-count").textContent = n + " of " + t.chapters.length;
      document.querySelectorAll("[data-prev]").forEach(function (a) { if (n > 1) a.setAttribute("href", "reader.html?id=" + t.id + "&ch=" + (n - 1)); else { a.removeAttribute("href"); a.setAttribute("aria-disabled", "true"); } });
      document.querySelectorAll("[data-next]").forEach(function (a) { if (n < t.chapters.length) a.setAttribute("href", "reader.html?id=" + t.id + "&ch=" + (n + 1)); else { a.removeAttribute("href"); a.setAttribute("aria-disabled", "true"); } });
      document.querySelectorAll("[data-toc]").forEach(function (a) { a.setAttribute("href", "book.html?id=" + t.id); });
      var page = $("#reader-page"), unit = t.format === "comic" ? "Episode" : "Chapter";
      if (isFree(ch) && ch.art) {
        page.innerHTML = '<p class="sample-note">Preview art from a sample comic. Episode ' + n + ' coming soon.</p>' + panels(ch);
        return;
      }
      page.innerHTML = '<div class="locked" role="region" aria-labelledby="soon-h"><h2 id="soon-h">' + unit + " " + n + " coming soon</h2>" +
        "<p><strong>" + esc(ch.title) + "</strong> is not available yet. Stories for this sample title are coming soon.</p>" +
        '<p class="locked__soon" aria-hidden="true">Coming soon</p>' +
        '<p><a href="book.html?id=' + t.id + '">Back to ' + esc(t.title) + "</a></p></div>";
    },

    packs: function () {
      $("#pack-grid").innerHTML = C.packs.map(function (p) {
        return '<article class="pack">' + '<h2 class="pack__label">' + esc(p.label) + '</h2><p class="pack__tokens"><span>' + p.tokens + "</span> tokens</p>" +
          '<p class="pack__soon">Coming soon</p></article>';
      }).join("");
    }
  };

  function hasArt(t) { return !!(t.chapters[0] && t.chapters[0].art); }
  function panels(ch) {
    return '<div class="panels">' + ch.art.map(function (pn, k) {
      return '<figure class="panel panel--art' + (k % 2 ? " panel--tilt" : "") + '"><picture><source type="image/webp" srcset="' + pn.src + '-400.webp 400w, ' + pn.src + '.webp ' + pn.w + 'w" sizes="(min-width: 700px) 640px, 92vw">' +
        '<img src="' + pn.src + '-400.jpg" srcset="' + pn.src + '-400.jpg 400w, ' + pn.src + '.jpg ' + pn.w + 'w" sizes="(min-width: 700px) 640px, 92vw" width="' + pn.w + '" height="' + pn.h + '" alt="' + esc(pn.alt) + ' (preview art)"' + (k > 1 ? ' loading="lazy"' : "") + '></picture></figure>';
    }).join("") + "</div>";
  }

  var p = document.body.getAttribute("data-page");
  if (pages[p]) pages[p]();
})();
