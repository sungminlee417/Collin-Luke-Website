import React from "react";
import img1 from "../images/IMG_0017.JPG";

interface Article {
  author: string;
  date: string;
  image: string;
  link: string;
  title: string;
}

const articles: Article[] = [
  {
    author: "Nancy E. McCarthy",
    date: "May 2, 2025",
    image: img1,
    link: "https://www.lifeinthefingerlakes.com/two-of-a-kind-the-muse-duo/",
    title: "Two of a Kind: The Muse Duo",
  },
];

const Press = () => {
  return (
    <section className="press-section py-12 px-4 bg-neutral-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Press</h2>
        <ul className="space-y-12">
          {articles.map((article, index) => (
            <li key={index} className="">
              <h3 className="text-2xl font-semibold mb-2 text-gray-800">
                {article.title}
              </h3>

              {article.date && (
                <p className="text-sm text-gray-500 mb-4">{article.date}</p>
              )}

              {article.author && (
                <p className="text-gray-700 mb-6">by {article.author}</p>
              )}

              {article.image && (
                <div className="overflow-hidden h-48 rounded-lg mb-6 relative">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover"
                    style={{
                      objectPosition: "top",
                      WebkitMaskImage:
                        "linear-gradient(to bottom, black 0%, black 50%, transparent 100%)",
                      maskImage:
                        "linear-gradient(to bottom, black 0%, black 50%, transparent 100%)",
                    }}
                  />
                </div>
              )}

              <div className="text-center">
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-2 border border-gray-800 rounded-full text-gray-800 font-medium hover:bg-gray-800 hover:text-white transition"
                >
                  Read Article
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Press;
