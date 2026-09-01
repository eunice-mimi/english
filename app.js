(function () {
  const menu = document.getElementById("lesson-menu");
  const app = document.getElementById("app");
  const lessons = (window.LESSONS || []).slice().sort((a,b) => b.date.localeCompare(a.date));

  function groupByYear(items){
    return items.reduce((acc,item)=>{
      const year = item.date.slice(0,4);
      (acc[year] ||= []).push(item);
      return acc;
    },{});
  }

  function renderMenu(activeDate){
    const groups = groupByYear(lessons);
    menu.innerHTML = Object.keys(groups).sort().reverse().map(year => `
      <div class="menu-year">
        <div class="menu-year-label">${year}</div>
        ${groups[year].map(item => `
          <a class="menu-link ${item.date === activeDate ? "active" : ""}"
             href="?date=${item.date}">
            ${item.label}
          </a>
        `).join("")}
      </div>
    `).join("");
  }

  function loadScript(src){
    return new Promise((resolve,reject)=>{
      delete window.LESSON_DATA;
      const script = document.createElement("script");
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    });
  }

  function cards(items){
    return items.map(([en,ko]) => `
      <div class="card">
        <div class="phrase">${en}</div>
        <div class="ko">${ko}</div>
      </div>
    `).join("");
  }

  function renderLesson(data){
    document.title = `${data.date} · ${data.title} | Mimi English Study`;
    app.innerHTML = `
      <article>
        <section class="hero">
          <div class="eyebrow">${data.day} · ${data.date}</div>
          <h1>${data.title}</h1>
          <p class="hero-copy">${data.description}</p>
          <div class="tags">${data.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}</div>
        </section>

        <section class="lesson-section">
          <h2>01. 오늘의 핵심 교정</h2>
          ${data.corrections.map(item => `
            <div class="card">
              <div class="compare">
                <div class="bad">
                  <div class="label">MY SENTENCE</div>
                  <div class="phrase">${item.mine}</div>
                </div>
                <div class="good">
                  <div class="label">BETTER</div>
                  <div class="phrase">${item.better}</div>
                  <div class="ko">${item.ko}</div>
                </div>
              </div>
            </div>
          `).join("")}
        </section>

        <section class="lesson-section">
          <h2>02. 오늘 꼭 외울 표현</h2>
          ${cards(data.expressions)}
        </section>

        <section class="lesson-section">
          <h2>03. 오늘의 문법</h2>
          ${data.grammar.map(item => `
            <div class="card">
              <div class="pattern">
                <strong>${item.title}</strong>
                <p>${item.body}</p>
              </div>
              ${item.examples.map(ex => `<div class="note">${ex}</div>`).join("")}
            </div>
          `).join("")}
        </section>

        <section class="lesson-section">
          <h2>04. 자주 쓰는 표현 바꿔보기</h2>
          ${cards(data.alternatives)}
        </section>

        <section class="lesson-section">
          <h2>05. 오늘의 단어</h2>
          <div class="word-grid">${cards(data.vocabulary)}</div>
        </section>

        <section class="lesson-section">
          <h2>06. 오늘의 말하기 패턴</h2>
          <div class="practice">
            ${data.practice.map(([pattern,example],i)=>`
              <div class="practice-item">
                <strong>${i+1}. ${pattern}</strong><br />
                ${example}
              </div>
            `).join("")}
          </div>
        </section>

        <section class="lesson-section">
          <h2>07. 오늘의 복습 체크</h2>
          <div class="card checklist">
            ${data.checklist.map(item => `<label><input type="checkbox" /> ${item}</label>`).join("")}
          </div>
        </section>
      </article>
    `;
  }

  async function init(){
    if(!lessons.length){
      renderMenu();
      app.innerHTML = `<section class="empty-state">아직 등록된 수업이 없습니다.</section>`;
      return;
    }

    const params = new URLSearchParams(location.search);
    const requested = params.get("date");
    const current = lessons.find(item => item.date === requested) || lessons[0];

    renderMenu(current.date);

    try{
      await loadScript(current.file);
      renderLesson(window.LESSON_DATA);
    }catch(err){
      app.innerHTML = `<section class="empty-state">수업 파일을 불러오지 못했습니다.</section>`;
      console.error(err);
    }
  }

  init();
})();