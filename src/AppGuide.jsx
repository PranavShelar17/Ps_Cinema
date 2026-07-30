import React from "react";

export default function AppGuide() {
  const tabs = [
    {
      title: "🏠 Home (PS Cinema)",
      badge: "Discovery",
      badgeColor: "bg-primary",
      description:
        "The central landing page. Explore trending movies for the week, along with categorized sliders for Horror, Bollywood, Kids, Military & War, Drama, and highly-rated popular hits. Simply hover over any poster to see details and click to open the full media view.",
    },
    {
      title: "📺 Web Series",
      badge: "TV Shows",
      badgeColor: "bg-info",
      description:
        "A dedicated page for TV Shows and Web Series. Features extensive lists divided by 16 genres (Action, Comedy, Crime, Documentary, Mystery, Sci-Fi, Soap, and more) streaming popular Hindi and international shows.",
    },
    {
      title: "🔍 Search",
      badge: "Instant Finder",
      badgeColor: "bg-success",
      description:
        "Looking for something specific? Use the search bar in the navigation header. Type in keywords (e.g. 'Batman' or 'Marvel') and hit Enter or click search. It queries TMDB's entire global library to return exact matches.",
    },
    {
      title: "❤️ Wishlist",
      badge: "Personal Saves",
      badgeColor: "bg-danger",
      description:
        "Your private watchlist repository. Inside any movie or TV show detail page, click the red heart icon to add it to your Wishlist. Click the Wishlist tab in the Navbar anytime to browse all your bookmarked favorites.",
    },
    {
      title: "🤖 AI Recommendation",
      badge: "AI Powered",
      badgeColor: "bg-warning text-dark",
      description:
        "Our personalized movie helper. Enter prompts describing what you want to watch (e.g., 'a space thriller like Interstellar' or 'scary movies with comedy') or select preset mood tags. The engine automatically matches your prompt to recommend top films.",
    },
    {
      title: "📖 App Guide",
      badge: "User Manual",
      badgeColor: "bg-secondary",
      description:
        "This navigation guide itself. Designed to orient new and existing users, providing a structured breakdown of each functional area and how to access its features.",
    },
  ];

  return (
    <>
      <div className="my-lg-0 my-5 p-lg-0 p-4">f</div>
      <div
        className="p-4 p-md-5 my-md-5 text-white"
        style={{
          background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
          minHeight: "95vh",
        }}
      >
        <div className="container">
          <div className="text-center mb-5">
            <h1 className="display-4 font-weight-bold" style={{ textShadow: "0 4px 8px rgba(0,0,0,0.5)" }}>
              📖 Features & Tabs Guide
            </h1>
            <p className="lead text-white-50">
              Welcome to PS Cinema! Here is an overview of all the main tabs and sections designed to help you navigate and find the perfect movie.
            </p>
          </div>

          <div className="row g-4 justify-content-center">
            {tabs.map((tab, index) => (
              <div key={index} className="col-md-6 col-lg-4">
                <div
                  className="card h-100 border-0 p-4 shadow-lg text-white"
                  style={{
                    background: "rgba(255, 255, 255, 0.08)",
                    backdropFilter: "blur(10px)",
                    borderRadius: "20px",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    transition: "all 0.3s ease-in-out",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px)";
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.13)";
                    e.currentTarget.style.boxShadow = "0 15px 30px rgba(0,0,0,0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="m-0 font-weight-bold" style={{ fontSize: "1.25rem" }}>
                      {tab.title}
                    </h4>
                    <span className={`badge ${tab.badgeColor} px-3 py-2 rounded-pill`} style={{ fontSize: "0.75rem", fontWeight: "600" }}>
                      {tab.badge}
                    </span>
                  </div>
                  <p className="card-text text-white-50" style={{ fontSize: "0.95rem", lineHeight: "1.6" }}>
                    {tab.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 text-center p-4 rounded-4 shadow" style={{ background: "rgba(255,255,255,0.05)" }}>
            <h5 className="text-warning mb-2" style={{ fontWeight: "600" }}>💡 Quick Tip</h5>
            <p className="m-0 text-white-50" style={{ fontSize: "0.95rem" }}>
              You can click the <strong>🎬 PS Cinema logo</strong> in the top left corner from any page to quickly return to the Home screen catalog.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
