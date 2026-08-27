// Vertex AI — animation & interaction engine (vanilla JS)
(function () {
    'use strict';
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function ready(fn) {
        if (document.readyState !== 'loading') fn();
        else document.addEventListener('DOMContentLoaded', fn);
    }

    ready(function () {

        /* ============ PRELOADER ============ */
        var loader = document.getElementById('preloader');
        var hideLoader = function () {
            if (loader) {
                loader.classList.add('hidden');
                setTimeout(function () {
                    loader.style.display = 'none';
                }, 550);
            }
        };

        // ---------- SCROLL PROGRESS + NAVBAR + BACK-TO-TOP ----------
        var progress = document.getElementById('scroll-progress');
        var navbar = document.getElementById('navbar');
        var toTop = document.getElementById('back-to-top');

        var onScroll = function () {
            var y = window.scrollY || window.pageYOffset;
            var h = document.documentElement.scrollHeight - window.innerHeight;
            var pct = h > 0 ? (y / h) * 100 : 0;
            if (progress) progress.style.width = pct + '%';
            if (navbar) navbar.classList.toggle('scrolled', y > 10);
            if (toTop) toTop.classList.toggle('show', y > 600);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();

        if (toTop) {
            toTop.addEventListener('click', function () {
                window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
            });
        }

        // hide preloader once page settled
        window.addEventListener('load', hideLoader);
        setTimeout(hideLoader, 2200); // fallback

        // ============ MOBILE NAV ============
        var navToggle = document.getElementById('nav-toggle');
        var navLinks = document.getElementById('nav-links');
        if (navToggle && navLinks) {
            navToggle.addEventListener('click', function () {
                var open = navLinks.classList.toggle('open');
                this.classList.toggle('open', open);
                this.setAttribute('aria-expanded', String(open));
            });
        }

        // ============ SMOOTH SCROLL (anchor links) ============
        document.querySelectorAll('a[href^="#"]').forEach(function (a) {
            a.addEventListener('click', function (e) {
                var href = this.getAttribute('href');
                if (href && href.length > 1) {
                    var target = document.querySelector(href);
                    if (target) {
                        e.preventDefault();
                        var pos = target.getBoundingClientRect().top + window.scrollY - 70;
                        window.scrollTo({ top: pos, behavior: reduceMotion ? 'auto' : 'smooth' });
                        if (navLinks) navLinks.classList.remove('open');
                        if (navToggle) { navToggle.classList.remove('open'); navToggle.setAttribute('aria-expanded', 'false'); }
                    }
                }
            });
        });

        // ============ TYPEWRITER / ROTATOR ============
        var rotator = document.querySelector('.rotator');
        if (rotator) {
            var words = [];
            try { words = JSON.parse(rotator.getAttribute('data-words') || '[]'); }
            catch (err) { words = []; }
            var w = 0, c = 0, del = false;
            var type = function () {
                if (!words.length) return;
                var word = words[w];
                if (!del) {
                    c++;
                    rotator.textContent = word.slice(0, c);
                    if (c === word.length) { del = true; setTimeout(type, 1600); return; }
                    setTimeout(type, 70);
                } else {
                    c--;
                    rotator.textContent = word.slice(0, c);
                    if (c === 0) { del = false; w = (w + 1) % words.length; }
                    setTimeout(type, 35);
                }
            };
            if (reduceMotion) rotator.textContent = words[0];
            else setTimeout(type, 900);
        }

        // ============ TILT (3D pointer effect) ============
        if (!reduceMotion && window.matchMedia('(hover: hover)').matches) {
            document.querySelectorAll('[data-tilt]').forEach(function (el) {
                var max = 7;
                el.addEventListener('mousemove', function (e) {
                    var r = el.getBoundingClientRect();
                    var px = (e.clientX - r.left) / r.width;
                    var py = (e.clientY - r.top) / r.height;
                    var rx = (0.5 - py) * max * 2;
                    var ry = (px - 0.5) * max * 2;
                    el.style.transform = 'perspective(900px) rotateX(' + rx.toFixed(1) + 'deg) rotateY(' + ry.toFixed(1) + 'deg) translateY(-3px)';
                });
                el.addEventListener('mouseleave', function () {
                    el.style.transform = '';
                });
            });
        }

        // ============ CARD GLOW (mouse-follow radial) ============
        document.querySelectorAll('.feature-card').forEach(function (card) {
            card.addEventListener('mousemove', function (e) {
                var r = card.getBoundingClientRect();
                card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
            });
        });

        // ============ FAQ ACCORDION ============
        document.querySelectorAll('.faq-question').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var item = this.parentElement;
                var isOpen = item.classList.contains('open');
                document.querySelectorAll('.faq-item.open').forEach(function (el) {
                    el.classList.remove('open');
                    var q = el.querySelector('.faq-question');
                    if (q) q.setAttribute('aria-expanded', 'false');
                });
                if (!isOpen) {
                    item.classList.add('open');
                    this.setAttribute('aria-expanded', 'true');
                }
            });
        });

        // ============ SCROLL REVEAL ============
        var revealEls = document.querySelectorAll('.reveal-up, .reveal');
        if (revealEls.length) {
            if ('IntersectionObserver' in window && !reduceMotion) {
                var obs = new IntersectionObserver(function (entries) {
                    entries.forEach(function (en) {
                        if (en.isIntersecting) {
                            en.target.classList.add('in');
                            obs.unobserve(en.target);
                        }
                    });
                }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
                revealEls.forEach(function (el) { obs.observe(el); });
            } else {
                revealEls.forEach(function (el) { el.classList.add('in'); });
            }
        }

        // ============ ANIMATED COUNTERS ============
        var counters = document.querySelectorAll('[data-count]');
        if (counters.length) {
            var animateCounter = function (el) {
                var target = parseInt(el.getAttribute('data-count'), 10);
                var suffix = el.getAttribute('data-suffix') || '';
                var duration = 1600;
                var startT = null;
                var step = function (ts) {
                    if (startT === null) startT = ts;
                    var prog = Math.min((ts - startT) / duration, 1);
                    var eased = 1 - Math.pow(1 - prog, 3);
                    el.textContent = Math.floor(eased * target) + suffix;
                    if (prog < 1) requestAnimationFrame(step);
                    else el.textContent = target + suffix;
                };
                requestAnimationFrame(step);
            };
            if ('IntersectionObserver' in window) {
                var cObs = new IntersectionObserver(function (entries) {
                    entries.forEach(function (en) {
                        if (en.isIntersecting) { animateCounter(en.target); cObs.unobserve(en.target); }
                    });
                }, { threshold: 0.4 });
                counters.forEach(function (c) { cObs.observe(c); });
            } else {
                counters.forEach(animateCounter);
            }
        }

        // ============ DYNAMIC YEAR ============
        var yearEl = document.getElementById('year');
        if (yearEl) yearEl.textContent = new Date().getFullYear();
    });
})();