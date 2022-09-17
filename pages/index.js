import React from "react";
import Head from "next/head";
import Image from "next/image";
import reactImageSize from "react-image-size";
import * as htmlToImage from "html-to-image";
import download from "downloadjs";
import { isMobile } from "../components/Agent";
import styles from "../styles/home.module.scss";

import Spinner from "../components/Spinner";

export default function Home() {
  const [image, setImage] = React.useState(null);
  const [imageData, setImageData] = React.useState(null);
  const [uploading, setUploading] = React.useState(false);
  const [done, setDone] = React.useState(false);
  const [hasTouched, setHasTouched] = React.useState(false);
  const [finalRender, setFinalRender] = React.useState(false);
  const [mobile, setMobile] = React.useState(false);
  // drag state
  const [dragActive, setDragActive] = React.useState(null);
  // Create a reference to the hidden file input element
  const hiddenFileInput = React.useRef(null);
  const container = React.useRef(null);
  const check = React.useRef(null);

  React.useEffect(() => {
    setMobile(isMobile());
  }, []);

  // Programatically click the hidden file input element
  // when the Button component is clicked
  const handleClick = (event) => {
    event.preventDefault();
    hiddenFileInput.current.click();
  };

  // triggers when file is selected with click
  const handleChange = function (e) {
    e.preventDefault();

    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  // handle drag events
  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // triggers when file is dropped
  const handleDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setImage(e.dataTransfer.files[0]);
    }
  };

  const loadImage = async () => {
    try {
      const src = URL.createObjectURL(image);
      const { width, height } = await reactImageSize(src);
      setImageData({ src, width, height });
    } catch {
      console.log("could not load image");
    }
  };

  const uploadImage = () => {
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      setDone(true);
    }, 2000);
  };

  const saveAsImage = () => {
    var node = document.getElementById("capture");

    if (mobile) {
      htmlToImage.toSvg(node).then(async function (dataUrl) {
        if (mobile) {
          const { width, height } = await reactImageSize(dataUrl);
          setFinalRender({ src: dataUrl, width, height });
        } else download(dataUrl, "linkedinfluencer.png");
      });
    } else {
      htmlToImage.toPng(node).then(async function (dataUrl) {
        if (mobile) {
          const { width, height } = await reactImageSize(dataUrl);
          setFinalRender({ src: dataUrl, width, height });
        } else download(dataUrl, "linkedinfluencer.png");
      });
    }
  };

  function dragMove(event) {
    let mouseX, mouseY;
    event.preventDefault();

    if (event.type == "touchstart") {
      mouseX = event.touches[0].pageX;
      mouseY = event.touches[0].pageY;
    } else {
      mouseX = event.screenX;
      mouseY = event.screenY;
    }

    const onMove = (e) => {
      let x, y;
      if (!hasTouched) setHasTouched(true);

      if (event.type == "touchstart") {
        if (e.touches && e.touches.length > 0) {
          x = e.touches[0].pageX;
          y = e.touches[0].pageY;
        } else {
          x = 0;
          y = 0;
        }
      } else {
        x = e.screenX;
        y = e.screenY;
      }

      let dx = x - mouseX;
      let dy = y - mouseY;

      let style = getComputedStyle(check.current);
      // window bounds
      let left = parseInt(style.left, 10) + dx;
      if (left < 0) left = 0;
      if (left > window.innerWidth - 200) left = window.innerWidth - 200;
      let top = parseInt(style.top, 10) + dy;
      if (top < 0) top = 0;
      if (top > window.innerHeight - 200) top = window.innerHeight - 200;

      check.current.style.left = `${left}px`;
      check.current.style.top = `${top}px`;

      mouseX = x;
      mouseY = y;
    };
    const onUp = () => {
      container.current.removeEventListener("mousemove", onMove);
      container.current.removeEventListener("mouseup", onUp);
      container.current.removeEventListener("touchmove", onMove);
      container.current.removeEventListener("touchend", onUp);
    };
    container.current.addEventListener("mousemove", onMove, {
      passive: false,
    });
    container.current.addEventListener("touchmove", onMove, {
      passive: false,
    });
    container.current.addEventListener("mouseup", onUp, { passive: true });
    container.current.addEventListener("touchend", onUp, { passive: true });
  }

  if (image && !imageData) {
    loadImage();
  }

  return (
    <div className={styles.home}>
      <Head>
        <title>LinkedInfluencer™</title>
        <meta
          name="description"
          content="Impress your connections with LinkedInfluencer™!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <div className={styles.internal}>
          <div className={styles.logo}>
            <Image
              src="/img/logo.png"
              alt="LinkedInfluencer Logo"
              layout={"fill"}
            />
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.column}>
          <div className={`${styles.card} ${styles.extraPadding}`}>
            <h1 className={styles.title}>
              Welcome to{" "}
              <span className={styles.highlight}>LinkedInfluencer™!</span>
            </h1>
            <h4>Upload a screenshot of your tweet</h4>
            <div
              ref={container}
              className={`${styles.container} ${dragActive ? styles.drag : ""}`}
              style={
                imageData && {
                  minHeight:
                    (imageData.height / imageData.width) *
                    container.current?.offsetWidth,
                }
              }
            >
              {imageData ? (
                <div className={styles.preview} id="capture">
                  <Image
                    src={imageData.src}
                    alt="Uploaded Image"
                    width={imageData.width}
                    height={imageData.height}
                  />
                  {uploading && (
                    <div className={styles.uploading}>
                      <Spinner />
                      <h4
                        className={styles.text}
                        style={{ transform: "translate(0, -24px)" }}
                      >
                        Uploading ...
                      </h4>
                    </div>
                  )}
                  {done && (
                    <div className={styles.overlay}>
                      <div
                        ref={check}
                        className={`${styles.check} ${
                          !hasTouched && styles.tutorial
                        }`}
                        onMouseDown={(e) => dragMove(e)}
                        onTouchStart={(e) => dragMove(e)}
                      >
                        <Image
                          src={"/img/check.png"}
                          alt="Twitter Check"
                          layout={"fill"}
                          draggable={false}
                        />
                      </div>

                      <div className={styles.counter}>
                        <Image
                          src={"/img/counter.png"}
                          alt="Twitter Counter"
                          layout={"fill"}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <form
                  className={styles.form}
                  id="form-file-upload"
                  onDragEnter={handleDrag}
                  onSubmit={(e) => e.preventDefault()}
                >
                  <input
                    className={styles.input}
                    type="file"
                    id="input-file-upload"
                    multiple={true}
                    ref={hiddenFileInput}
                    onChange={handleChange}
                  />
                  <label
                    className={styles.label}
                    id="label-file-upload"
                    htmlFor="input-file-upload"
                  >
                    <div className={styles.bird}>
                      <Image
                        src="/img/bird.svg"
                        alt="Twitter Logo"
                        layout={"fill"}
                      />
                    </div>
                    <h4 className={styles.dull}>
                      Drag an image of <br />
                      your tweet here
                    </h4>
                    <h4 className={styles.dull} style={{ margin: "0.5rem 0" }}>
                      -- OR --
                    </h4>
                    <button className={styles.button} onClick={handleClick}>
                      Upload
                    </button>
                  </label>
                  {dragActive && (
                    <div
                      className={styles.dragElement}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                    />
                  )}
                </form>
              )}
            </div>
            {imageData &&
              (done ? (
                <button
                    className={`${styles.button} ${styles.dull}`}
                    disabled={uploading}
                    onClick={saveAsImage}
                  >
                    Save
                  </button>
              ) : (
                <button
                  className={styles.button}
                  onClick={uploadImage}
                  disabled={uploading}
                >
                  Upload Screenshot
                </button>
              ))}
          </div>
        </div>
        <div className={styles.column}>
          <div className={styles.card}>
            <h3>About</h3>
            <p className={styles.description}>
              Are all of your LinkedIn connections doing better than you? Do you
              wish you could one up them?
            </p>
            <h4 className={styles.highlight}>
              Well now you can with LinkedInfluencer™!
            </h4>
          </div>
          <div className={styles.card}>
            <h4>STEP 1 📸</h4>
            <h4>» Take a screenshot of one of your tweets</h4>
            <h4>STEP 2 ✨</h4>
            <h4>» Upload it to LinkedInfluencer™</h4>
            <h4>STEP 3 🚀</h4>
            <h4>» We’ll magically add a blue check mark</h4>
            <h4>STEP 4 👊</h4>
            <h4>» Post that new “screenshot” to LinkedIn</h4>
            <h4>STEP 5 😦</h4>
            <h4>» Impress your connections</h4>
          </div>
          <div className={styles.card}>
            <h3>More Info</h3>
            <p className={styles.description}>
              Who needs to be on Forbes 30 Under 30 when you can trick your
              LinkedIn connections into thinking you’re Twitter famous?
            </p>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://www.linkedin.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by
        </a>
        <Image src="/linkedin.svg" alt="LinkedIn Logo" width={24} height={24} />
      </footer>

      {mobile && finalRender && (
        <div className={styles.finalPreview}>
          <div
            className={styles.final}
            style={
              finalRender && {
                minHeight:
                  (imageData.height / imageData.width) *
                  container.current?.offsetWidth,
              }
            }
          >
            <Image
              src={finalRender.src}
              alt="Uploaded Image"
              width={finalRender.width}
              height={finalRender.height}
            />
          </div>
        </div>
      )}
    </div>
  );
}
