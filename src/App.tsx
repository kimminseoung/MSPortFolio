import { useRecoilValue } from "recoil";
import DarkMode from "./components/DarkMode";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Modal from "./components/Modal";
import Router from "./components/Router";
import { DarkModeValue } from "./etc/atom";
import { createGlobalStyle, ThemeProvider } from "styled-components";

import { DarkTheme, LightTheme } from "./etc/theme";
const GlobalStyle = createGlobalStyle`
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
  padding:0 70px;
	background-color: ${props=>props.theme.bgColor};
	font-family: 'Open Sans', sans-serif;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
a {
	text-decoration: none;
	color:inherit;

}
* {
	user-select: none;
	box-sizing: border-box;
	-ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
}
`;
function App() {
  const isDark = useRecoilValue(DarkModeValue);

  return (
    <ThemeProvider theme={isDark ? DarkTheme : LightTheme}>
      <Header />
      <Router />
      <Footer />
      <Modal />
      <GlobalStyle />

      <DarkMode />
    </ThemeProvider>
  );
}

export default App;
