import { useEffect, useRef } from "react";
import kubera_logo from "../../assets/Logo/transperent_logo_image.png";
import "./About.css";

const About = () => {
  const containerRef = useRef(null);
  const stickyRef = useRef(null);
  const boxRef = useRef(null);
  const cardsRef = useRef(null);
  const contentRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      const sticky = stickyRef.current;
      const box = boxRef.current;
      const cards = cardsRef.current;
      const content = contentRef.current;
      const logo = logoRef.current;

      if (
        !container ||
        !sticky ||
        !box ||
        !cards ||
        !content ||
        !logo
      ) {
        return;
      }

      const rect = container.getBoundingClientRect();
      const maxScroll = container.offsetHeight - window.innerHeight;

      let progress = -rect.top / maxScroll;
      progress = Math.max(0, Math.min(progress, 1));

      /* Box animation */
      const shapeProgress = Math.min(progress / 0.45, 1);

      const easedShape =
        shapeProgress * shapeProgress * (3 - 2 * shapeProgress);

      const startWidth = 500;
      const maxWidth = container.clientWidth;

      const width =
        startWidth + (maxWidth - startWidth) * easedShape;

      const startHeight = 500;
      const maxHeight = sticky.clientHeight;

      const desiredHeight =
        startHeight + (maxHeight - startHeight) * easedShape;

      const height = Math.min(desiredHeight, maxHeight);

      const radius = 50 - easedShape * 42;

      box.style.width = `${width}px`;
      box.style.height = `${height}px`;
      box.style.borderRadius = `${radius}%`;

      /* Kubhera logo animation */
      const logoProgress = Math.min(progress / 0.65, 1);

      const logoY =
        (height - logo.offsetHeight - 30) * logoProgress;

      logo.style.transform = `translate(-50%, ${logoY}px)`;

      /* Content animation */
      const contentProgress = Math.min(
        Math.max((progress - 0.25) / 0.25, 0),
        1
      );

      content.style.opacity = contentProgress;

      content.style.transform = `translateY(
        ${40 - contentProgress * 40}px
      )`;

      /* Cards horizontal animation */
      const cardProgress = Math.min(
        Math.max((progress - 0.5) / 0.5, 0),
        1
      );

      const maxCardMovement = Math.max(
        0,
        cards.scrollWidth - box.clientWidth + 100
      );

      cards.style.transform = `translateX(
        ${-maxCardMovement * cardProgress}px
      )`;
    };

    let ticking = false;

    const scrollHandler = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener("scroll", scrollHandler, {
      passive: true,
    });

    window.addEventListener("resize", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", scrollHandler);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <>
      <section
        className="about-container"
        ref={containerRef}
      >
        <div
          className="about-sticky"
          ref={stickyRef}
        >
          <div
            className="about-section"
            ref={boxRef}
          >
            {/* Kubhera Logo */}
            <img
              ref={logoRef}
              className="about-logo"
              src={kubera_logo}
              alt="Kubhera"
            />

            <div
              className="about-content"
              ref={contentRef}
            >
              <div className="about-heading">
                <h1>ABOUT</h1>

                <span>KUBHERA DIGITAL BANKING</span>

                <p>
                  Kubhera is a modern digital banking platform
                  designed to make managing money simple, secure
                  and accessible. From everyday transactions to
                  smarter financial management, Kubhera brings
                  essential banking services together in one
                  connected experience.
                </p>
              </div>

              <div className="cards-wrapper">
                <div
                  className="about-cards"
                  ref={cardsRef}
                >
                  {/* Card 01 */}
                  <div className="about-card">
                    <div className="card-number">
                      01
                    </div>

                    <h3>Digital Banking</h3>

                    <p>
                      A seamless digital banking experience
                      that lets customers manage their money
                      anytime, anywhere.
                    </p>
                  </div>

                  {/* Card 02 */}
                  <div className="about-card">
                    <div className="card-number">
                      02
                    </div>

                    <h3>Secure Payments</h3>

                    <p>
                      Fast and secure money transfers and
                      digital payments designed for everyday
                      transactions.
                    </p>
                  </div>

                  {/* Card 03 */}
                  <div className="about-card">
                    <div className="card-number">
                      03
                    </div>

                    <h3>Smart Finance</h3>

                    <p>
                      Clear financial insights that help
                      customers understand, manage and plan
                      their finances.
                    </p>
                  </div>

                  {/* Card 04 */}
                  <div className="about-card">
                    <div className="card-number">
                      04
                    </div>

                    <h3>Customer First</h3>

                    <p>
                      Banking experiences built around
                      simplicity, transparency and the needs
                      of modern customers.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;