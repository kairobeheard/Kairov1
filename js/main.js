/* ── SUPABASE CONFIG ── */
const SUPABASE_URL = 'https://iyyaplcpcxzhbmdijeat.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5eWFwbGNwY3h6aGJtZGlqZWF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwNTQyMTYsImV4cCI6MjA4ODYzMDIxNn0.DKXII1egU1Y1vsV7NndNx1UvEd0UxUUsPP1rFInXyIw';
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/* ── CURSOR ── */
(() => {
  const c = document.getElementById('cur'), r = document.getElementById('curR');
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY });
  function tick() {
    c.style.transform = `translate(${mx - 5}px,${my - 5}px)`;
    rx += (mx - rx) * .13; ry += (my - ry) * .13;
    r.style.transform = `translate(${rx - 19}px,${ry - 19}px)`;
    requestAnimationFrame(tick);
  }
  tick();
  document.querySelectorAll('a,button').forEach(el => {
    el.addEventListener('mouseenter', () => { c.style.width = '6px'; c.style.height = '6px'; r.style.width = '52px'; r.style.height = '52px'; r.style.borderColor = 'rgba(59,130,246,.65)' });
    el.addEventListener('mouseleave', () => { c.style.width = '10px'; c.style.height = '10px'; r.style.width = '38px'; r.style.height = '38px'; r.style.borderColor = 'rgba(59,130,246,.35)' });
  });
})();

/* ── PARTICLES ── */
(() => {
  const cv = document.getElementById('pc'), ctx = cv.getContext('2d');
  let W, H, pts = [];
  const resize = () => { W = cv.width = window.innerWidth; H = cv.height = window.innerHeight };
  resize(); window.addEventListener('resize', resize);
  for (let i = 0; i < 120; i++)pts.push({
    x: Math.random() * 1920, y: Math.random() * 1080,
    vx: (Math.random() - .5) * .16, vy: (Math.random() - .5) * .16,
    r: Math.random() * 1.4 + .3, o: Math.random() * .32 + .04, ph: Math.random() * Math.PI * 2
  });
  let t = 0;
  function draw() {
    ctx.clearRect(0, 0, W, H); t += .01;
    pts.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.ph += .018;
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
      const a = p.o * (.65 + .35 * Math.sin(p.ph));
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(59,130,246,${a})`; ctx.fill();
    });
    for (let i = 0; i < pts.length; i++)for (let j = i + 1; j < pts.length; j++) {
      const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y, d = Math.sqrt(dx * dx + dy * dy);
      if (d < 90) {
        ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y);
        ctx.strokeStyle = `rgba(59,130,246,${.035 * (1 - d / 90)})`; ctx.lineWidth = .5; ctx.stroke();
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ── HERO WAVE BARS ── */
(() => {
  const w = document.getElementById('hWave');
  for (let i = 0; i < 64; i++) {
    const b = document.createElement('div'); b.className = 'hw';
    b.style.height = (8 + Math.random() * 85) + 'px';
    b.style.animationDuration = (.75 + Math.random() * .85) + 's';
    b.style.animationDelay = (Math.random() * 1.6) + 's';
    w.appendChild(b);
  }
})();

/* ── COUNTER ── */
(() => {
  let n = 58; const el = document.getElementById('vCount');
  function tween(target) {
    const from = n, diff = target - from, dur = 1300, st = performance.now();
    function s(now) {
      const p = Math.min((now - st) / dur, 1), e = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(from + diff * e);
      if (p < 1) requestAnimationFrame(s); else n = target;
    }
    requestAnimationFrame(s);
  }
  setInterval(() => tween(n + Math.floor(1 + Math.random() * 3)), 3800 + Math.random() * 3000);
  window.bump = () => tween(n + 1);
})();

/* ── SCROLL REVEALS ── */
(() => {
  // Feature cards
  const io = new IntersectionObserver(es => {
    es.forEach(e => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('vis'), +(e.target.dataset.d || 0));
        io.unobserve(e.target);
      }
    });
  }, { threshold: .15 });
  document.querySelectorAll('.fCard').forEach(c => io.observe(c));

  // Final
  ['fQ', 'fS'].forEach(id => {
    const el = document.getElementById(id);
    const io2 = new IntersectionObserver(es => {
      es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('vis'); io2.unobserve(e.target) } });
    }, { threshold: .3 });
    io2.observe(el);
  });
})();

/* ── STORY SCROLL ── */
(() => {
  const lines = document.querySelectorAll('.sLine');
  const io = new IntersectionObserver(es => {
    es.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = +entry.target.dataset.i;
        lines.forEach((l, i) => {
          const base = 'sLine' + (l.classList.contains('last') ? ' last' : '');
          if (i < idx) l.className = base + ' dim';
          else if (i === idx) l.className = base + ' active';
          else l.className = base;
        });
      }
    });
  }, { threshold: .7, rootMargin: '-10% 0px -10% 0px' });
  lines.forEach(l => io.observe(l));
})();

/* ── RECORDER ── */
(() => {
  const mBtn = document.getElementById('mBtn');
  const viz = document.getElementById('lViz');
  const tEl = document.getElementById('rTimer');
  const sStat = document.getElementById('rStat');
  const subBtn = document.getElementById('subVoice');
  const disBtn = document.getElementById('disVoice');
  const conf = document.getElementById('rConf');
  const vGrid = document.getElementById('vGrid');
  const vEmp = document.getElementById('vEmp');
  let mr = null, chunks = [], tInt = null, secs = 0, blob = null, isRec = false, vc = 0;
  const pad = n => n < 10 ? '0' + n : n, fmt = s => Math.floor(s / 60) + ':' + pad(s % 60);

  function startTimer() {
    secs = 0; tEl.textContent = '0:00';
    tInt = setInterval(() => { secs++; tEl.textContent = fmt(secs); if (secs >= 30) stopRec() }, 1000);
  }
  function stopTimer() { clearInterval(tInt) }

  async function startRec() {
    try {
      // 1. Request high-quality audio
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: 48000
        }
      });

      // 2. Volume Boost: Use Web Audio API
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const source = audioContext.createMediaStreamSource(stream);
      const gainNode = audioContext.createGain();
      gainNode.gain.value = 3.0; // Boost volume by 3x

      const destination = audioContext.createMediaStreamDestination();
      source.connect(gainNode);
      gainNode.connect(destination);

      chunks = [];
      const options = {
        audioBitsPerSecond: 128000,
        mimeType: 'audio/webm;codecs=opus'
      };

      mr = new MediaRecorder(destination.stream, options);
      mr.ondataavailable = e => { if (e.data.size > 0) chunks.push(e.data) };
      mr.onstop = () => {
        blob = new Blob(chunks, { type: 'audio/webm' });
        stream.getTracks().forEach(t => t.stop());
        audioContext.close();
        showPrev();
      };
      mr.start(); isRec = true;
      mBtn.classList.add('rec'); mBtn.textContent = '⏹';
      viz.classList.add('on'); sStat.classList.add('active');
      startTimer();
    } catch (e) { alert('Microphone access needed. Please allow mic and try again.') }
  }

  function stopRec() {
    if (mr && isRec) { mr.stop(); isRec = false; mBtn.classList.remove('rec'); mBtn.textContent = '🎙️'; viz.classList.remove('on'); sStat.classList.remove('active'); stopTimer() }
  }

  function showPrev() {
    subBtn.style.display = 'inline-flex'; disBtn.style.display = 'inline-flex';
    sStat.innerHTML = `<span>Ready to share &nbsp;·&nbsp; </span><span class="t">${fmt(secs)}</span>`;
    mBtn.disabled = true; mBtn.style.opacity = '.38';
  }

  function resetRec() {
    blob = null; subBtn.style.display = 'none'; disBtn.style.display = 'none';
    sStat.innerHTML = `<span>Press to speak &nbsp;·&nbsp; </span><span class="t">0:00</span><span> / 0:30</span>`;
    mBtn.disabled = false; mBtn.style.opacity = '1'; conf.classList.remove('show');
  }

  mBtn.addEventListener('click', () => isRec ? stopRec() : startRec());
  disBtn.addEventListener('click', resetRec);

  subBtn.addEventListener('click', async () => {
    if (!blob) return;

    subBtn.disabled = true;
    subBtn.textContent = 'Uploading...';

    try {
      const fileName = `voice_${Date.now()}.webm`;
      const { data: uploadData, error: uploadError } = await supabaseClient.storage
        .from('voices')
        .upload(fileName, blob);

      if (uploadError) throw uploadError;

      const { error: dbError } = await supabaseClient
        .from('voices')
        .insert([{ storage_path: fileName, duration: secs }]);

      if (dbError) throw dbError;

      vc++;
      const { data: publicUrlData } = supabaseClient.storage.from('voices').getPublicUrl(fileName);
      addCard(publicUrlData.publicUrl, secs, vc);

      conf.classList.add('show');
      subBtn.style.display = 'none'; disBtn.style.display = 'none';
      mBtn.disabled = false; mBtn.style.opacity = '1';
      sStat.innerHTML = `<span>Press to speak &nbsp;·&nbsp; </span><span class="t">0:00</span><span> / 0:30</span>`;
      if (window.bump) window.bump();
      setTimeout(() => conf.classList.remove('show'), 4500);
      setTimeout(() => document.getElementById('voicewall').scrollIntoView({ behavior: 'smooth' }), 400);
    } catch (err) {
      console.error('SUPABASE STORAGE ERROR:', err);
      alert(`Failed to save voice: ${err.message || 'Unknown error'}`);
    } finally {
      subBtn.textContent = '✦ Add to Voice Wall';
      subBtn.disabled = false;
    }
  });

  function addCard(url, dur, num) {
    if (vEmp) vEmp.style.display = 'none';
    const card = document.createElement('div'); card.className = 'vCard';
    const bars = Array.from({ length: 18 }, (_, i) => `<div class="mWB" style="height:${15 + Math.random() * 75}%;animation-delay:${(i * .045).toFixed(2)}s"></div>`).join('');
    card.innerHTML = `<div class="vTop"><span class="vLbl">Voice #${num}</span><span class="vDur">${fmt(dur)}</span></div><div class="vMid"><button class="vPlay">▶</button><div class="mWave">${bars}</div></div>`;
    let audio = null;
    const pb = card.querySelector('.vPlay');
    pb.addEventListener('click', () => {
      document.querySelectorAll('.vCard.playing').forEach(c => {
        if (c !== card) { c.classList.remove('playing'); c.querySelector('.vPlay').textContent = '▶'; if (c._a) { c._a.pause(); c._a.currentTime = 0 } }
      });
      if (!audio) { audio = new Audio(url); card._a = audio }
      if (card.classList.contains('playing')) { audio.pause(); audio.currentTime = 0; card.classList.remove('playing'); pb.textContent = '▶' }
      else { audio.play(); card.classList.add('playing'); pb.textContent = '■'; audio.onended = () => { card.classList.remove('playing'); pb.textContent = '▶' } }
    });
    vGrid.prepend(card);
  }

  /* ── LOAD VOICES ── */
  async function loadVoices() {
    try {
      const { data, error } = await supabaseClient
        .from('voices')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data && data.length > 0) {
        if (vEmp) vEmp.style.display = 'none';
        data.forEach((v, i) => {
          const { data: publicUrlData } = supabaseClient.storage.from('voices').getPublicUrl(v.storage_path);
          addCard(publicUrlData.publicUrl, v.duration, data.length - i);
        });
        vc = data.length;
      }
    } catch (err) {
      console.error('Error loading voices:', err);
    }
  }

  window.addEventListener('load', loadVoices);
})();

/* ── WAITLIST ── */
(() => {
  const form = document.getElementById('wlForm'), btn = document.getElementById('wlBtn');
  const inp = document.getElementById('wlEmail'), conf = document.getElementById('wlConf');
  async function go() {
    const v = inp.value.trim();
    if (!v || !v.includes('@')) {
      inp.style.borderColor = '#ef4444'; inp.style.boxShadow = '0 0 0 2px rgba(239,68,68,.15)';
      setTimeout(() => { inp.style.borderColor = ''; inp.style.boxShadow = '' }, 1800); return;
    }

    btn.disabled = true;
    btn.textContent = 'Reserving...';

    try {
      // Use insert instead of upsert for better compatibility with simplified RLS policies
      const { error } = await supabaseClient
        .from('waitlist')
        .insert([{ email: v }]);

      if (error) throw error;

      form.style.display = 'none'; conf.classList.add('show');
      if (window.bump) window.bump();
    } catch (err) {
      console.error('SUPABASE WAITLIST ERROR:', err);
      // If it's a duplicate email error (23505), we can still show success
      if (err.code === '23505') {
        form.style.display = 'none'; conf.classList.add('show');
      } else {
        alert(`Something went wrong: ${err.message || 'Check your database connection'}`);
      }
    } finally {
      btn.disabled = false;
      btn.textContent = 'Reserve Your Spot';
    }
  }
  btn.addEventListener('click', go); inp.addEventListener('keydown', e => { if (e.key === 'Enter') go() });
})();

/* ── AMBIENT TONE ── */
(() => {
  let ok = false;
  function init() {
    if (ok) return; ok = true;
    try {
      const ac = new (window.AudioContext || window.webkitAudioContext)();
      const g = ac.createGain(); const f = ac.createBiquadFilter();
      f.type = 'lowpass'; f.frequency.value = 180;
      g.gain.value = 0;
      [55, 82.4, 110].forEach((freq, i) => {
        const o = ac.createOscillator(); o.type = 'sine'; o.frequency.value = freq;
        o.connect(f); o.start();
      });
      f.connect(g); g.connect(ac.destination);
      g.gain.linearRampToValueAtTime(0.009, ac.currentTime + 5);
    } catch (e) { }
  }
  ['click', 'scroll', 'touchstart'].forEach(ev => document.addEventListener(ev, init, { once: true }));
})();
