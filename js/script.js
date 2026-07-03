/* =========================================================
   UPSC 2026 Guide — shared behaviour
   - Active nav-link highlighting
   - Q&A accordion open/close
   - Live search/filter across Q&A blocks
   - Back-to-top button
   - Contact form (demo, client-side only)
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ---- 1. Highlight active nav link based on current page ---- */
  var path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-upsc .nav-link').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === path) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  /* ---- 2. Q&A accordion ---- */
  document.querySelectorAll('.qa-question').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.qa-item');
      item.classList.toggle('open');
      btn.setAttribute('aria-expanded', item.classList.contains('open'));
    });
  });

  /* Expand / Collapse all controls */
  var expandAllBtn = document.getElementById('expandAll');
  var collapseAllBtn = document.getElementById('collapseAll');
  if (expandAllBtn) {
    expandAllBtn.addEventListener('click', function () {
      document.querySelectorAll('.qa-item').forEach(function (item) {
        item.classList.add('open');
        item.querySelector('.qa-question').setAttribute('aria-expanded', 'true');
      });
    });
  }
  if (collapseAllBtn) {
    collapseAllBtn.addEventListener('click', function () {
      document.querySelectorAll('.qa-item').forEach(function (item) {
        item.classList.remove('open');
        item.querySelector('.qa-question').setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---- 3. Live search filter ---- */
  var searchBox = document.getElementById('qaSearch');
  var qaCount = document.getElementById('qaCount');
  var noMatch = document.getElementById('qaNoMatch');
  var allItems = document.querySelectorAll('.qa-item');
  var totalCount = allItems.length;

  function updateCount(visible) {
    if (qaCount) qaCount.textContent = visible + ' of ' + totalCount + ' questions';
  }
  updateCount(totalCount);

  if (searchBox) {
    searchBox.addEventListener('input', function () {
      var term = searchBox.value.trim().toLowerCase();
      var visibleCount = 0;
      allItems.forEach(function (item) {
        var text = item.textContent.toLowerCase();
        var matches = text.indexOf(term) !== -1;
        item.hidden = !matches;
        if (matches) visibleCount++;
      });
      updateCount(visibleCount);
      if (noMatch) noMatch.style.display = visibleCount === 0 ? 'block' : 'none';
    });
  }

  /* ---- 4. Back to top button ---- */
  var btt = document.getElementById('bttBtn');
  if (btt) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 500) {
        btt.classList.add('show');
      } else {
        btt.classList.remove('show');
      }
    });
    btt.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---- 5. Contact form demo submit ---- */
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var successBox = document.getElementById('formSuccess');
      if (successBox) {
        successBox.style.display = 'block';
        successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      contactForm.reset();
    });
  }

  /* ---- 6. Mock test scorer (mock-test.html) ---- */
  var mockForm = document.getElementById('mockTestForm');
  if (mockForm) {
    mockForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var correctAnswers = {
        mt1: 'b', mt2: 'c', mt3: 'a', mt4: 'd', mt5: 'b',
        mt6: 'a', mt7: 'c', mt8: 'b', mt9: 'd', mt10: 'a'
      };
      var score = 0;
      var total = Object.keys(correctAnswers).length;
      Object.keys(correctAnswers).forEach(function (name) {
        var selected = mockForm.querySelector('input[name="' + name + '"]:checked');
        var label = mockForm.querySelector('#result-' + name);
        if (selected) {
          if (selected.value === correctAnswers[name]) {
            score++;
            if (label) { label.textContent = 'Correct'; label.className = 'badge bg-success ms-2'; }
          } else {
            if (label) { label.textContent = 'Incorrect (Correct: ' + correctAnswers[name].toUpperCase() + ')'; label.className = 'badge bg-danger ms-2'; }
          }
        } else {
          if (label) { label.textContent = 'Not answered'; label.className = 'badge bg-secondary ms-2'; }
        }
      });
      var scoreBox = document.getElementById('mockScore');
      if (scoreBox) {
        scoreBox.style.display = 'block';
        scoreBox.innerHTML = '<strong>Your Score: ' + score + ' / ' + total + '</strong> — ' +
          (score >= 7 ? 'Excellent work, keep it up!' : score >= 4 ? 'Good attempt, revise weak areas.' : 'Needs more practice — review the syllabus.');
        scoreBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

});
