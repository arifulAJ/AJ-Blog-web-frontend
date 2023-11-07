// // import React from "react";

// // function splitParagraphIntoMultipleParagraphs(text, wordsPerParagraph) {
// //   const words = text.split(" ");
// //   const paragraphs = [];
// //   let currentParagraph = "";

// //   for (let i = 0; i < words.length; i++) {
// //     if (i > 0 && i % wordsPerParagraph === 0) {
// //       paragraphs.push(<p key={i}>{currentParagraph}</p>);
// //       currentParagraph = "";
// //     }
// //     currentParagraph += words[i] + " ";
// //   }

// //   if (currentParagraph.trim() !== "") {
// //     paragraphs.push(<p key={words.length}>{currentParagraph}</p>);
// //   }

// //   return paragraphs;
// // }

// // function Article({ findArticleById }) {
// //   const wordsPerParagraph = 80;
// //   const paragraphs = splitParagraphIntoMultipleParagraphs(
// //     findArticleById.body,
// //     wordsPerParagraph
// //   );

// //   return <div className="sm:text-2xl text-slate-700">{paragraphs}</div>;
// // }

// // export default Article;
// import React from "react";

// function splitParagraphIntoMultipleParagraphs(
//   text,
//   wordsPerParagraph,
//   advertisementFrequency
// ) {
//   const words = text.split(" ");
//   const paragraphs = [];
//   let currentParagraph = "";

//   for (let i = 0; i < words.length; i++) {
//     if (i > 0 && i % wordsPerParagraph === 0) {
//       paragraphs.push(<p key={i}>{currentParagraph}</p>);
//       currentParagraph = "";

//       // Add an advertisement paragraph every 'advertisementFrequency' paragraphs
//       if (i % (wordsPerParagraph * advertisementFrequency) === 0) {
//         paragraphs.push(
//           <p key={`ad-${i}`} className="advertisement-paragraph text-center py-8">
//             <iframe
//               width="560"
//               height="315"
//               src="https://www.youtube.com/embed/0Laxwahtsww?si=DOArrJDCPhryF-k6"
//               title="YouTube video player"
//               frameborder="0"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//               allowfullscreen
//             ></iframe>
//           </p>
//         );
//       }
//     }
//     currentParagraph += words[i] + " ";
//   }

//   if (currentParagraph.trim() !== "") {
//     paragraphs.push(<p key={words.length}>{currentParagraph}</p>);
//   }

//   return paragraphs;
// }

// function Article({ findArticleById }) {
//   const wordsPerParagraph = 80;
//   const advertisementFrequency = 2; // Show an advertisement every 2 paragraphs
//   const paragraphs = splitParagraphIntoMultipleParagraphs(
//     findArticleById.body,
//     wordsPerParagraph,
//     advertisementFrequency
//   );

//   return <div className="sm:text-2xl text-slate-700">{paragraphs}</div>;
// }

// export default Article;
import React from "react";

function splitParagraphIntoMultipleParagraphs(
  text,
  wordsPerParagraph,
  advertisementFrequency
) {
  const words = text.split(" ");
  const paragraphs = [];
  let currentParagraph = "";

  for (let i = 0; i < words.length; i++) {
    if (i > 0 && i % wordsPerParagraph === 0) {
      paragraphs.push(<p key={i}>{currentParagraph}</p>);
      currentParagraph = "";

      // Add an advertisement paragraph every 'advertisementFrequency' paragraphs
      if (i % (wordsPerParagraph * advertisementFrequency) === 0) {
        paragraphs.push(
          <p
            key={`ad-${i}`}
            className="advertisement-paragraph text-center pt-6 "
          >
            <h1 className="py-2 text-salt-700 italic sm:text-xl">
              Watch our advertisement you might be like it
            </h1>
            <div
              style={{
                position: "relative",
                paddingBottom: "56.25%",
                height: 0,
              }}
            >
              <iframe
                src="https://www.youtube.com/embed/0Laxwahtsww?rel=0"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "80%",
                }}
              ></iframe>
            </div>
          </p>
        );
      }
    }
    currentParagraph += words[i] + " ";
  }

  if (currentParagraph.trim() !== "") {
    paragraphs.push(<p key={words.length}>{currentParagraph}</p>);
  }

  return paragraphs;
}

function Article({ findArticleById }) {
  const wordsPerParagraph = 80;
  const advertisementFrequency = 2; // Show an advertisement every 2 paragraphs
  const paragraphs = splitParagraphIntoMultipleParagraphs(
    findArticleById.body,
    wordsPerParagraph,
    advertisementFrequency
  );

  return <div className="sm:text-2xl text-slate-700">{paragraphs}</div>;
}

export default Article;
