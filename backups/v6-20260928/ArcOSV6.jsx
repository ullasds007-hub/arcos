<motion.div
  className="v6-command-core v6-core-premium"
  initial={{ opacity: 0, y: 16 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    duration: 0.65,
    ease: [0.16, 1, 0.3, 1],
  }}
>
  {/* GOLD TOP EDGE */}
  <div className="v6-core-premium-edge" />

  {/* =====================================================
      TOP / MAIN AREA
  ===================================================== */}
  <div className="v6-core-premium-main">

    {/* LEFT — SCORE */}
    <div className="v6-core-score-column">

      <div className="v6-core-brand-row">
        <div className="v6-core-mini-logo">
          <span />
          <span />
        </div>

        <div className="v6-core-brand-divider" />

        <span>ARC CORE</span>
      </div>

      <div className="v6-core-big-score">
        84.2
      </div>

      <div className="v6-core-state-mark">
        <i />
        <i />
        <i />
        <i />
        <i />
      </div>

      <p>
        Your system is
        <br />
        in a strong state.
      </p>
    </div>


    {/* CENTER — MECHANICAL OBJECT */}
    <div className="v6-core-sculpture">

      <div className="v6-core-sculpture-glow" />

      <div className="v6-core-sculpture-scene">
        <ArcScene />
      </div>

      <span className="v6-core-orbit-dot dot-one" />
      <span className="v6-core-orbit-dot dot-two" />
      <span className="v6-core-orbit-dot dot-three" />

    </div>


    {/* RIGHT — SYSTEM DOMAINS */}
    <div className="v6-core-domain-stack">

      <div className="v6-core-live-pill">
        <span />
        LIVE
      </div>


      <article className="v6-core-domain-card">
        <div className="v6-core-domain-icon">
          <Brain size={18} />
        </div>

        <div className="v6-core-domain-info">
          <div className="v6-core-domain-heading">
            <span>ACADEMICS</span>
            <strong>78%</strong>
          </div>

          <div className="v6-core-domain-progress">
            <span style={{ width: "78%" }} />
          </div>
        </div>
      </article>


      <article className="v6-core-domain-card">
        <div className="v6-core-domain-icon">
          <Target size={18} />
        </div>

        <div className="v6-core-domain-info">
          <div className="v6-core-domain-heading">
            <span>CAREER</span>
            <strong>91%</strong>
          </div>

          <div className="v6-core-domain-progress">
            <span style={{ width: "91%" }} />
          </div>
        </div>
      </article>


      <article className="v6-core-domain-card">
        <div className="v6-core-domain-icon">
          <Activity size={18} />
        </div>

        <div className="v6-core-domain-info">
          <div className="v6-core-domain-heading">
            <span>FITNESS</span>
            <strong>67%</strong>
          </div>

          <div className="v6-core-domain-progress">
            <span style={{ width: "67%" }} />
          </div>
        </div>
      </article>

    </div>
  </div>


  {/* =====================================================
      BOTTOM
  ===================================================== */}
  <div className="v6-core-premium-bottom">

    <div className="v6-core-bottom-stat">
      <div className="v6-core-bottom-icon gold">
        <Target size={18} />
      </div>

      <div>
        <span>FOCUS</span>
        <strong>82</strong>
      </div>
    </div>


    <div className="v6-core-bottom-divider" />


    <div className="v6-core-bottom-stat">
      <div className="v6-core-bottom-icon gold">
        <BarChart3 size={18} />
      </div>

      <div>
        <span>CONSISTENCY</span>
        <strong>79</strong>
      </div>
    </div>


    <div className="v6-core-bottom-divider" />


    <div className="v6-core-bottom-stat">
      <div className="v6-core-bottom-icon gold">
        <Zap size={18} />
      </div>

      <div>
        <span>READINESS</span>
        <strong>87</strong>
      </div>
    </div>


    <button
      type="button"
      className="v6-core-explore-button"
    >
      Explore Core
      <ChevronRight size={18} />
    </button>

  </div>
</motion.div>