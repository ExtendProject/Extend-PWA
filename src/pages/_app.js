import "@/styles/globals.css";

import localFont from "next/font/local";

// Font files can be colocated inside of `app`
const myFontsBold = localFont({
  src: "../../public/assets/fonts/AdobeCleanBold.otf",
  display: "swap",
  variable: "--font-bold",
});

const myFontsMedium = localFont({
  src: "../../public/assets/fonts/AdobeCleanMedium.otf",
  display: "swap",
  variable: "--font-medium",
});

const myFontsLight = localFont({
  src: "../../public/assets/fonts/AdobeCleanLight.otf",
  display: "swap",
  variable: "--font-light",
});

const myFontsRegular = localFont({
  src: "../../public/assets/fonts/AdobeCleanRegular.otf",
  display: "swap",
  variable: "--font-regular",
});
export default function App({ Component, pageProps }) {
  return (
    <div
      className={`${myFontsBold.variable} ${myFontsMedium.variable} ${myFontsLight.variable} ${myFontsRegular.variable}`}
    >
      <Component {...pageProps} />
    </div>
  );
}
