import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/da54aa7f-977e-4157-8e2d-ca5f0a75e470/files/731b6bef-1f80-4a01-b881-b6ef0353a75e.jpg";

const NAV_ITEMS = [
  { label: "Главная", href: "#hero" },
  { label: "О студии", href: "#about" },
  { label: "Услуги", href: "#services" },
  { label: "Расписание", href: "#schedule" },
  { label: "Новости", href: "#news" },
  { label: "Акции", href: "#promo" },
  { label: "Конкурсы", href: "#contests" },
  { label: "Контакты", href: "#contacts" },
];

const SERVICES = [
  { icon: "Sparkles", title: "Классический балет", desc: "Фундаментальная техника, изящество линий и постановка корпуса для всех уровней подготовки", price: "от 2 500 ₽" },
  { icon: "Music", title: "Современная хореография", desc: "Contemporary и джаз-модерн — язык тела без ограничений, выражение через движение", price: "от 2 000 ₽" },
  { icon: "Heart", title: "Стретчинг и пластика", desc: "Развитие гибкости, растяжки и координации. Подходит для начинающих", price: "от 1 800 ₽" },
  { icon: "Star", title: "Детские группы", desc: "Ритмика, хореография и танцы для детей от 4 лет. Игровой формат, любящие педагоги", price: "от 1 500 ₽" },
  { icon: "Users", title: "Парные танцы", desc: "Вальс, танго, фокстрот и латина — искусство двигаться в унисон с партнёром", price: "от 3 000 ₽" },
  { icon: "Award", title: "Индивидуальные занятия", desc: "Персональный подход, работа с педагогом один на один, быстрый прогресс", price: "от 4 500 ₽" },
];

const SCHEDULE = [
  { day: "Понедельник", classes: [{ time: "10:00", name: "Стретчинг", level: "Начинающие" }, { time: "18:00", name: "Классический балет", level: "Средний" }, { time: "20:00", name: "Contemporary", level: "Продвинутый" }] },
  { day: "Вторник", classes: [{ time: "11:00", name: "Детская ритмика", level: "Дети 4–7 лет" }, { time: "19:00", name: "Парные танцы", level: "Все уровни" }, { time: "21:00", name: "Джаз-модерн", level: "Средний" }] },
  { day: "Среда", classes: [{ time: "10:00", name: "Пластика", level: "Все уровни" }, { time: "18:30", name: "Классический балет", level: "Начинающие" }, { time: "20:00", name: "Индивидуально", level: "По записи" }] },
  { day: "Четверг", classes: [{ time: "11:00", name: "Детская хореография", level: "Дети 8–12 лет" }, { time: "18:00", name: "Contemporary", level: "Начинающие" }, { time: "20:00", name: "Парные танцы", level: "Продвинутый" }] },
  { day: "Пятница", classes: [{ time: "10:00", name: "Стретчинг", level: "Все уровни" }, { time: "19:00", name: "Классический балет", level: "Продвинутый" }, { time: "21:00", name: "Джаз-модерн", level: "Начинающие" }] },
  { day: "Суббота", classes: [{ time: "10:00", name: "Детские группы", level: "Все возраста" }, { time: "13:00", name: "Открытый урок", level: "Все уровни" }, { time: "16:00", name: "Парные танцы", level: "Все уровни" }] },
];

const NEWS = [
  { date: "15 апреля 2026", tag: "Событие", title: "Весенний гала-концерт студии", desc: "Ежегодный отчётный концерт наших учеников. Два часа красоты, эмоций и профессионального мастерства на главной сцене города." },
  { date: "8 апреля 2026", tag: "Педагоги", title: "Мастер-класс от Анны Соловьёвой", desc: "Заслуженная артистка балета проведёт интенсив по классической технике. Ограниченное количество мест — успейте записаться." },
  { date: "1 апреля 2026", tag: "Студия", title: "Открытие нового зала", desc: "С радостью сообщаем об открытии второго репетиционного зала с профессиональным покрытием и зеркалами во всю стену." },
];

const PROMOS = [
  { icon: "Gift", title: "Первое занятие бесплатно", desc: "Приходите и попробуйте любой курс без обязательств. Мы уверены — вам понравится.", badge: "Новым" },
  { icon: "Users", title: "Приведи друга — 20% скидка", desc: "Запишитесь вместе с другом и получите скидку 20% на первый месяц для обоих.", badge: "Акция" },
  { icon: "Calendar", title: "Абонемент на 3 месяца", desc: "Купите абонемент на квартал и получите 4-й месяц занятий в подарок.", badge: "Выгодно" },
];

const CONTESTS = [
  { date: "12 мая 2026", title: "Городской конкурс хореографии", place: "Театр «Арена»", desc: "Принимаем заявки от учеников всех уровней. Возрастные категории: дети, юниоры, взрослые.", status: "Приём заявок" },
  { date: "20 июня 2026", title: "Летний открытый турнир", place: "Парк «Победы»", desc: "Открытые соревнования по спортивным бальным танцам под открытым небом.", status: "Скоро" },
  { date: "15 сентября 2026", title: "Региональный чемпионат", place: "ДКЖ", desc: "Ежегодный чемпионат по современной хореографии. Призовой фонд — 150 000 ₽.", status: "Планируется" },
];

function useScrollAnimation() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".animate-on-scroll").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDay, setActiveDay] = useState(0);

  useScrollAnimation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--color-pearl)", color: "var(--color-charcoal)" }}>

      {/* NAVIGATION */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "py-3" : "py-6"}`}
        style={{ backgroundColor: scrolled ? "rgba(26,23,20,0.96)" : "transparent", backdropFilter: scrolled ? "blur(12px)" : "none" }}
      >
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
          <div>
            <div className="font-display text-xl font-light tracking-widest" style={{ color: "var(--color-pearl)" }}>
              РИТМ
            </div>
            <div className="section-label" style={{ color: "var(--color-gold)", fontSize: "0.55rem", letterSpacing: "0.3em" }}>студия танцев</div>
          </div>

          <div className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <a key={item.href} href={item.href} className="nav-link" style={{ color: "rgba(245,241,236,0.85)" }}>
                {item.label}
              </a>
            ))}
          </div>

          <button className="hidden lg:block btn-gold text-xs">Записаться</button>

          <button className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)} style={{ color: "var(--color-pearl)" }}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {menuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 py-6 px-8" style={{ backgroundColor: "rgba(26,23,20,0.98)" }}>
            {NAV_ITEMS.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="block py-3 nav-link" style={{ color: "rgba(245,241,236,0.8)" }}>
                {item.label}
              </a>
            ))}
            <button className="btn-gold mt-6 w-full">Записаться</button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMAGE} alt="Студия танцев Ритм" className="w-full h-full object-cover" style={{ filter: "brightness(0.45)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(26,23,20,0.6) 0%, rgba(26,23,20,0.2) 50%, rgba(26,23,20,0.7) 100%)" }} />
        </div>

        <div className="relative z-10 text-center max-w-5xl mx-auto px-8">
          <div className="section-label mb-8" style={{ animationDelay: "0.2s" }}>
            — студия классической и современной хореографии —
          </div>
          <h1 className="font-display font-light mb-6 text-shadow-gold"
            style={{ fontSize: "clamp(3.5rem, 10vw, 8rem)", lineHeight: 1, color: "var(--color-pearl)", letterSpacing: "0.05em" }}>
            Ритм
          </h1>
          <p className="font-body font-light mb-12 max-w-lg mx-auto"
            style={{ color: "rgba(245,241,236,0.7)", fontSize: "1.05rem", lineHeight: 1.8, letterSpacing: "0.02em" }}>
            Место, где рождается искусство движения. Профессиональные педагоги, уютная атмосфера и путь к совершенству для каждого.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-gold">Записаться на пробный урок</button>
            <button className="btn-outline-light">Узнать о студии</button>
          </div>

          <div className="mt-20 flex justify-center gap-16">
            {[["12+", "лет опыта"], ["20+", "педагогов"]].map(([num, label]) => (
              <div key={label} className="text-center">
                <div className="font-display font-light" style={{ fontSize: "2.5rem", color: "var(--color-gold-light)" }}>{num}</div>
                <div className="section-label mt-1" style={{ color: "rgba(245,241,236,0.5)" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ color: "rgba(245,241,236,0.4)" }}>
          <span className="section-label">Прокрутите</span>
          <Icon name="ChevronDown" size={16} />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-32 px-8" style={{ backgroundColor: "var(--color-pearl)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="animate-on-scroll">
              <div className="section-label mb-6">О студии</div>
              <h2 className="font-display font-light mb-8 gold-line"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1.1, color: "var(--color-charcoal)" }}>
                Искусство движения как образ жизни
              </h2>
              <p className="font-body font-light mb-6" style={{ color: "#4A4540", lineHeight: 2, fontSize: "0.95rem" }}>
                Студия Ритм была основана в 2012 году с одной целью — создать пространство, где каждый может открыть в себе танцора. Мы убеждены, что танец — это не привилегия избранных, а язык, доступный каждому.
              </p>
              <p className="font-body font-light mb-10" style={{ color: "#4A4540", lineHeight: 2, fontSize: "0.95rem" }}>
                Наши педагоги — действующие артисты и хореографы с международным опытом. Небольшие группы, индивидуальный подход и профессиональные залы создают идеальную среду для роста.
              </p>
              <div className="space-y-3">
                {["Классический балет", "Современная хореография", "Детские программы"].map(s => (
                  <div key={s} className="flex items-center gap-3">
                    <div className="w-1 h-4 shrink-0" style={{ backgroundColor: "var(--color-gold)" }} />
                    <span className="font-body font-light text-sm" style={{ color: "#4A4540" }}>{s}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="animate-on-scroll relative" style={{ animationDelay: "0.2s" }}>
              <div className="relative">
                <div className="absolute -top-4 -right-4 w-full h-full border" style={{ borderColor: "var(--color-gold)", opacity: 0.3 }} />
                <img src={HERO_IMAGE} alt="О студии" className="w-full h-96 object-cover relative z-10" />
                <div className="absolute -bottom-6 -left-6 p-8 z-20" style={{ backgroundColor: "var(--color-charcoal)", maxWidth: "240px" }}>
                  <div className="font-display font-light text-4xl mb-1" style={{ color: "var(--color-gold)" }}>12</div>
                  <div className="section-label" style={{ color: "rgba(245,241,236,0.6)" }}>лет создаём<br />красоту движения</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DIVIDER */}
      <div className="py-16 flex justify-center">
        <div className="divider-gold" />
      </div>

      {/* SERVICES */}
      <section id="services" className="py-20 px-8" style={{ backgroundColor: "var(--color-champagne)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-on-scroll">
            <div className="section-label mb-4">Что мы предлагаем</div>
            <h2 className="font-display font-light gold-line-center" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "var(--color-charcoal)" }}>
              Наши направления
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s, i) => (
              <div
                key={s.title}
                className="animate-on-scroll card-hover p-8 group"
                style={{ animationDelay: `${i * 0.1}s`, backgroundColor: "var(--color-pearl)", borderTop: "2px solid transparent", transition: "border-top-color 0.3s ease, transform 0.4s ease, box-shadow 0.4s ease" }}
                onMouseEnter={e => (e.currentTarget.style.borderTopColor = "var(--color-gold)")}
                onMouseLeave={e => (e.currentTarget.style.borderTopColor = "transparent")}
              >
                <div className="mb-6 w-12 h-12 flex items-center justify-center" style={{ border: "1px solid var(--color-gold)", color: "var(--color-gold)" }}>
                  <Icon name={s.icon as "Sparkles"} size={20} />
                </div>
                <h3 className="font-display font-light text-xl mb-3" style={{ color: "var(--color-charcoal)" }}>{s.title}</h3>
                <p className="font-body font-light text-sm mb-6" style={{ color: "#4A4540", lineHeight: 1.8 }}>{s.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="font-display text-lg" style={{ color: "var(--color-gold)" }}>{s.price}</span>
                  <span className="section-label hover-gold cursor-pointer">Подробнее →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SCHEDULE */}
      <section id="schedule" className="py-32 px-8" style={{ backgroundColor: "var(--color-charcoal)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-on-scroll">
            <div className="section-label mb-4" style={{ color: "var(--color-gold)" }}>Расписание занятий</div>
            <h2 className="font-display font-light" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "var(--color-pearl)" }}>
              Выберите удобное время
            </h2>
            <div className="divider-gold mt-6" />
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {SCHEDULE.map((d, i) => (
              <button
                key={d.day}
                onClick={() => setActiveDay(i)}
                className="px-6 py-3 font-body font-light text-sm transition-all duration-300"
                style={{
                  letterSpacing: "0.08em",
                  backgroundColor: activeDay === i ? "var(--color-gold)" : "transparent",
                  color: activeDay === i ? "var(--color-pearl)" : "rgba(245,241,236,0.5)",
                  border: `1px solid ${activeDay === i ? "var(--color-gold)" : "rgba(245,241,236,0.15)"}`,
                }}
              >
                {d.day}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {SCHEDULE[activeDay].classes.map((cls, i) => (
              <div key={i} className="p-6" style={{ border: "1px solid rgba(245,241,236,0.08)", backgroundColor: "rgba(245,241,236,0.03)" }}>
                <div className="font-display text-3xl mb-1" style={{ color: "var(--color-gold)" }}>{cls.time}</div>
                <div className="font-body font-light text-lg mb-2" style={{ color: "var(--color-pearl)" }}>{cls.name}</div>
                <div className="section-label" style={{ color: "rgba(245,241,236,0.4)" }}>{cls.level}</div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="btn-outline-gold">Полное расписание</button>
          </div>
        </div>
      </section>

      {/* NEWS */}
      <section id="news" className="py-32 px-8" style={{ backgroundColor: "var(--color-pearl)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-16">
            <div className="animate-on-scroll">
              <div className="section-label mb-4">Последние события</div>
              <h2 className="font-display font-light gold-line" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "var(--color-charcoal)" }}>
                Новости студии
              </h2>
            </div>
            <button className="hidden md:block btn-outline-gold animate-on-scroll">Все новости</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {NEWS.map((n, i) => (
              <article key={n.title} className="animate-on-scroll card-hover group cursor-pointer" style={{ animationDelay: `${i * 0.15}s` }}>
                <div className="overflow-hidden mb-6">
                  <img src={HERO_IMAGE} alt={n.title} className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <span className="section-label px-3 py-1" style={{ border: "1px solid var(--color-gold)", color: "var(--color-gold)" }}>{n.tag}</span>
                  <span className="section-label" style={{ color: "#9A9490" }}>{n.date}</span>
                </div>
                <h3 className="font-display font-light text-xl mb-3 hover-gold transition-colors" style={{ color: "var(--color-charcoal)", lineHeight: 1.3 }}>{n.title}</h3>
                <p className="font-body font-light text-sm" style={{ color: "#4A4540", lineHeight: 1.8 }}>{n.desc}</p>
                <div className="mt-4 section-label hover-gold cursor-pointer">Читать далее →</div>
              </article>
            ))}
          </div>

          <div className="text-center mt-10 md:hidden">
            <button className="btn-outline-gold">Все новости</button>
          </div>
        </div>
      </section>

      {/* PROMOS */}
      <section id="promo" className="py-32 px-8" style={{ backgroundColor: "var(--color-champagne)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-on-scroll">
            <div className="section-label mb-4">Специальные предложения</div>
            <h2 className="font-display font-light gold-line-center" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "var(--color-charcoal)" }}>
              Акции
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PROMOS.map((p, i) => (
              <div
                key={p.title}
                className="animate-on-scroll p-10 text-center card-hover relative overflow-hidden"
                style={{ animationDelay: `${i * 0.1}s`, backgroundColor: "var(--color-pearl)", border: "1px solid rgba(184,146,74,0.2)" }}
              >
                <div className="absolute top-4 right-4">
                  <span className="section-label px-3 py-1" style={{ backgroundColor: "var(--color-gold)", color: "var(--color-pearl)" }}>{p.badge}</span>
                </div>
                <div className="mx-auto mb-6 w-16 h-16 flex items-center justify-center" style={{ border: "1px solid var(--color-gold)", color: "var(--color-gold)" }}>
                  <Icon name={p.icon as "Gift"} size={24} />
                </div>
                <h3 className="font-display font-light text-xl mb-4" style={{ color: "var(--color-charcoal)" }}>{p.title}</h3>
                <p className="font-body font-light text-sm mb-8" style={{ color: "#4A4540", lineHeight: 1.8 }}>{p.desc}</p>
                <button className="btn-gold">Воспользоваться</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTESTS */}
      <section id="contests" className="py-32 px-8" style={{ backgroundColor: "var(--color-charcoal)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-on-scroll">
            <div className="section-label mb-4" style={{ color: "var(--color-gold)" }}>Соревнования и выступления</div>
            <h2 className="font-display font-light" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "var(--color-pearl)" }}>
              Конкурсы
            </h2>
            <div className="divider-gold mt-6" />
          </div>

          <div className="space-y-6">
            {CONTESTS.map((c, i) => (
              <div
                key={c.title}
                className="animate-on-scroll p-8 flex flex-col md:flex-row md:items-center gap-6 cursor-pointer"
                style={{ animationDelay: `${i * 0.15}s`, border: "1px solid rgba(245,241,236,0.08)", backgroundColor: "rgba(245,241,236,0.02)", transition: "border-color 0.3s ease" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(184,146,74,0.3)")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(245,241,236,0.08)")}
              >
                <div className="md:w-40 shrink-0">
                  <div className="font-display text-lg" style={{ color: "var(--color-gold)" }}>{c.date}</div>
                  <div className="section-label mt-1" style={{ color: "rgba(245,241,236,0.3)" }}>{c.place}</div>
                </div>
                <div className="flex-1">
                  <h3 className="font-display font-light text-xl mb-2" style={{ color: "var(--color-pearl)" }}>{c.title}</h3>
                  <p className="font-body font-light text-sm" style={{ color: "rgba(245,241,236,0.5)", lineHeight: 1.8 }}>{c.desc}</p>
                </div>
                <div className="shrink-0">
                  <span className="section-label px-4 py-2" style={{ border: "1px solid rgba(184,146,74,0.4)", color: "var(--color-gold)" }}>
                    {c.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-32 px-8" style={{ backgroundColor: "var(--color-gold)" }}>
        <div className="relative z-10 text-center max-w-3xl mx-auto animate-on-scroll">
          <div className="section-label mb-6" style={{ color: "rgba(26,23,20,0.6)" }}>начните сегодня</div>
          <h2 className="font-display font-light mb-6"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)", color: "var(--color-charcoal)", lineHeight: 1.1 }}>
            Первый шаг к совершенству — самый важный
          </h2>
          <p className="font-body font-light mb-10" style={{ color: "rgba(26,23,20,0.7)", fontSize: "1rem", lineHeight: 1.8 }}>
            Запишитесь на бесплатное пробное занятие и убедитесь, что танцы — это для вас.
          </p>
          <button
            className="px-12 py-4 font-body font-light text-xs tracking-widest uppercase transition-all duration-300"
            style={{ backgroundColor: "var(--color-charcoal)", color: "var(--color-pearl)", border: "1px solid var(--color-charcoal)" }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "var(--color-charcoal)"; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = "var(--color-charcoal)"; e.currentTarget.style.color = "var(--color-pearl)"; }}
          >
            Записаться на пробный урок
          </button>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-32 px-8" style={{ backgroundColor: "var(--color-pearl)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-on-scroll">
            <div className="section-label mb-4">Как нас найти</div>
            <h2 className="font-display font-light gold-line-center" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "var(--color-charcoal)" }}>
              Контакты
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="animate-on-scroll space-y-10">
              {[
                { icon: "MapPin", label: "Адрес", value: "Проспект Ленина, 55А", sub: "" },
                { icon: "Phone", label: "Телефон", value: "+7 (922) 717-22-49", sub: "Ежедневно с 9:00 до 21:00" },
                { icon: "Mail", label: "Email", value: "dariaivashina@internet.ru", sub: "Ответим в течение часа" },
                { icon: "Clock", label: "Часы работы", value: "Пн–Пт: 10:00–22:00", sub: "Сб–Вс: 10:00–20:00" },
              ].map(({ icon, label, value, sub }) => (
                <div key={label} className="flex items-start gap-6">
                  <div className="w-12 h-12 flex items-center justify-center shrink-0" style={{ border: "1px solid var(--color-gold)", color: "var(--color-gold)" }}>
                    <Icon name={icon as "MapPin"} size={18} />
                  </div>
                  <div>
                    <div className="section-label mb-1" style={{ color: "var(--color-gold)" }}>{label}</div>
                    <div className="font-display font-light text-xl" style={{ color: "var(--color-charcoal)" }}>{value}</div>
                    <div className="font-body font-light text-sm mt-1" style={{ color: "#9A9490" }}>{sub}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="animate-on-scroll" style={{ animationDelay: "0.2s" }}>
              <div className="p-10" style={{ backgroundColor: "var(--color-champagne)", border: "1px solid rgba(184,146,74,0.2)" }}>
                <h3 className="font-display font-light text-2xl mb-8" style={{ color: "var(--color-charcoal)" }}>
                  Задайте вопрос
                </h3>
                <div className="space-y-4">
                  {[
                    { placeholder: "Ваше имя", type: "text" },
                    { placeholder: "Телефон или Email", type: "text" },
                  ].map((f) => (
                    <input
                      key={f.placeholder}
                      type={f.type}
                      placeholder={f.placeholder}
                      className="w-full px-0 py-4 font-body font-light text-sm bg-transparent outline-none"
                      style={{ borderBottom: "1px solid rgba(26,23,20,0.2)", color: "var(--color-charcoal)", letterSpacing: "0.02em" }}
                    />
                  ))}
                  <textarea
                    placeholder="Ваш вопрос или пожелание"
                    rows={4}
                    className="w-full px-0 py-4 font-body font-light text-sm bg-transparent outline-none resize-none"
                    style={{ borderBottom: "1px solid rgba(26,23,20,0.2)", color: "var(--color-charcoal)", letterSpacing: "0.02em" }}
                  />
                  <div className="pt-4">
                    <button className="btn-gold w-full">Отправить сообщение</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-8" style={{ backgroundColor: "var(--color-charcoal)", borderTop: "1px solid rgba(184,146,74,0.2)" }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="font-display text-xl font-light tracking-widest" style={{ color: "var(--color-pearl)" }}>РИТМ</div>
            <div className="section-label mt-1" style={{ color: "rgba(245,241,236,0.3)" }}>студия танцев © 2026</div>
          </div>

          <div className="flex flex-wrap gap-6 justify-center">
            {NAV_ITEMS.slice(0, 5).map(item => (
              <a
                key={item.href}
                href={item.href}
                className="font-body font-light text-xs uppercase hover-gold transition-colors duration-300"
                style={{ color: "rgba(245,241,236,0.4)", letterSpacing: "0.1em" }}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex gap-4">
            <a
              href="https://t.me/ddstudio_dance"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center transition-all duration-300"
              style={{ border: "1px solid rgba(245,241,236,0.15)", color: "rgba(245,241,236,0.4)" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--color-gold)"; e.currentTarget.style.color = "var(--color-gold)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(245,241,236,0.15)"; e.currentTarget.style.color = "rgba(245,241,236,0.4)"; }}
            >
              <Icon name="Send" size={14} />
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}